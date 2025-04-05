'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { database } from '@/lib/firebase';
import { ref, push, onValue, off, set, get } from 'firebase/database';
import toast from 'react-hot-toast';

interface ChatProps {
  streamerName: string;
}

interface Message {
  text: string;
  timestamp: number;
  username: string;
}

interface UserData {
  username: string;
  createdAt: number;
}

export default function Chat({ streamerName }: ChatProps) {
  const { connected, publicKey } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [hasCheckedUsername, setHasCheckedUsername] = useState(false);
  const chatRef = database ? ref(database, `chats/${streamerName}`) : null;

  // Debug render - More verbose
  useEffect(() => {
    console.log('🔄 Component State Updated:', {
      connected,
      publicKey: publicKey?.toString(),
      username,
      tempUsername,
      hasCheckedUsername,
      database: !!database,
      timestamp: new Date().toISOString()
    });
  }, [connected, publicKey, username, tempUsername, hasCheckedUsername]);

  // Force check username when wallet connects
  useEffect(() => {
    console.log('👉 Wallet connection effect triggered:', {
      connected,
      publicKey: publicKey?.toString(),
      hasCheckedUsername
    });

    const checkUsername = async () => {
      if (!connected || !publicKey || !database) {
        console.log('❌ Missing requirements:', { 
          connected, 
          hasPublicKey: !!publicKey, 
          hasDatabase: !!database,
          timestamp: new Date().toISOString()
        });
        setUsername('');
        setHasCheckedUsername(true);
        return;
      }

      try {
        console.log('🔍 Checking username for wallet:', publicKey.toString());
        const userRef = ref(database, `users/${publicKey.toString()}`);
        const snapshot = await get(userRef);

        console.log('📥 Firebase response:', {
          exists: snapshot.exists(),
          data: snapshot.val(),
          timestamp: new Date().toISOString()
        });

        if (snapshot.exists()) {
          const userData = snapshot.val() as UserData;
          console.log('✅ Found existing username:', userData.username);
          if (userData.username && typeof userData.username === 'string' && userData.username.length >= 3) {
            setUsername(userData.username);
          } else {
            console.log('❌ Invalid username in database, forcing prompt');
            setUsername('');
          }
        } else {
          console.log('❌ No username found - user must create one');
          setUsername('');
        }
      } catch (error) {
        console.error('⚠️ Error checking username:', error);
        setUsername('');
      } finally {
        setHasCheckedUsername(true);
      }
    };

    if (connected && publicKey) {
      console.log('🎯 Wallet connected - checking username');
      setHasCheckedUsername(false);
      checkUsername();
    } else {
      console.log('🔌 Wallet disconnected - resetting states');
      setUsername('');
      setTempUsername('');
      setHasCheckedUsername(false);
    }
  }, [connected, publicKey, database]);

  // Chat messages listener
  useEffect(() => {
    if (!chatRef) return;

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data) as Message[];
        setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMessages([]);
      }
    }, (error) => {
      console.error('Database error:', error);
      toast.error('Error loading messages');
    });

    return () => {
      if (chatRef) off(chatRef);
    };
  }, [chatRef]);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !publicKey || !database) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!tempUsername.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    
    if (tempUsername.length < 3 || tempUsername.length > 15) {
      toast.error('Username must be between 3-15 characters');
      return;
    }

    // Don't allow wallet addresses as usernames
    if (tempUsername.match(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)) {
      toast.error('Cannot use wallet address as username');
      return;
    }

    try {
      console.log('💾 Saving username:', tempUsername);
      
      // Check if username is taken
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      const users = snapshot.val() || {};
      
      const isUsernameTaken = Object.values(users).some(
        (user: any) => user.username?.toLowerCase() === tempUsername.toLowerCase()
      );

      if (isUsernameTaken) {
        toast.error('Username is already taken');
        return;
      }

      // Now save the user data
      const userRef = ref(database, `users/${publicKey.toString()}`);
      const userData: UserData = {
        username: tempUsername.trim(),
        createdAt: Date.now()
      };

      await set(userRef, userData);
      console.log('✅ Username saved successfully');
      
      setUsername(tempUsername.trim());
      setTempUsername('');
      toast.success('Username set successfully!');
    } catch (error) {
      console.error('⚠️ Error saving username:', error);
      toast.error('Failed to save username. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet to chat');
      return;
    }

    if (!username) {
      toast.error('Please set a username first');
      return;
    }
    
    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    if (!chatRef) {
      toast.error('Chat system is not available');
      return;
    }

    setIsSending(true);
    
    try {
      const message: Message = {
        text: newMessage.trim(),
        timestamp: Date.now(),
        username: username
      };

      await push(chatRef, message);
      setNewMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Determine if we should show the username modal
  const shouldShowUsernameModal = connected && !username && hasCheckedUsername;
  
  // Debug modal state
  useEffect(() => {
    console.log('🎭 Modal State:', {
      shouldShowUsernameModal,
      connected,
      username,
      hasCheckedUsername,
      timestamp: new Date().toISOString()
    });
  }, [shouldShowUsernameModal, connected, username, hasCheckedUsername]);

  // Debug UI indicator - Enhanced
  const debugInfo = (
    <div className="fixed top-0 left-0 bg-black/80 text-white p-4 text-xs font-mono z-[10000]">
      <pre>
        {JSON.stringify({
          connected,
          hasPublicKey: !!publicKey,
          username,
          hasCheckedUsername,
          shouldShowModal: shouldShowUsernameModal,
          timestamp: new Date().toISOString()
        }, null, 2)}
      </pre>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-900/95 rounded-lg border border-pink-500/20">
      {process.env.NODE_ENV === 'development' && debugInfo}
      
      {/* Username Modal - Always show when conditions are met */}
      {shouldShowUsernameModal ? (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]" style={{ pointerEvents: 'auto' }}>
          <div className="bg-gray-900 p-6 rounded-lg border border-pink-500/20 w-96">
            <h3 className="text-lg font-semibold text-pink-400 mb-4">Create your chat username</h3>
            <form onSubmit={handleUsernameSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  placeholder="Enter username (3-15 characters)"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 border border-pink-500/20"
                  maxLength={15}
                  autoFocus
                />
                <p className="text-gray-400 text-xs mt-1">This will be your permanent chat name</p>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Set Username
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <div className="p-4 border-b border-pink-500/20 bg-gray-900/90">
        <h2 className="text-lg font-semibold text-pink-400">
          Chat with {streamerName} 💕 ({messages.length} messages)
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/95 to-gray-900/90">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            <p>Be the first to chat! 💖</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-white bg-gray-800/50 rounded-lg p-2 text-sm">
                <span className="text-pink-300/80 font-mono">{msg.username}</span>
                <span className="mx-2 text-gray-400">:</span>
                <span className="text-white">{msg.text}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {connected ? (
        <form onSubmit={handleSubmit} className="p-4 border-t border-pink-500/20 bg-gray-900/90">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={username ? "Type a message..." : "Set a username first"}
              disabled={isSending || !username}
              className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 border border-pink-500/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSending || !username}
              className="bg-pink-500 text-white text-sm px-6 py-2 rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
          {connected && !username && (
            <p className="text-pink-400 text-sm mt-2">Please set a username to chat</p>
          )}
        </form>
      ) : (
        <div className="p-6 border-t border-pink-500/20 text-center bg-gray-900/90">
          <p className="text-gray-400 mb-3 text-sm">Connect your wallet to join the chat</p>
          <WalletMultiButton className="!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700 !py-2 !text-sm !rounded-lg" />
        </div>
      )}
    </div>
  );
} 