'use client';

import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaStar, FaCrown, FaGem, FaFire, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaExpand } from 'react-icons/fa';
import { Streamer } from '@/data/streamers';
import DonateButton from './DonateButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from 'react-hot-toast';
import { database } from '@/lib/firebase';
import { ref, onValue, push, set, serverTimestamp, query, orderByChild, startAt, Database, get } from 'firebase/database';
import { moderateMessage } from '@/utils/chatModeration';
import { getAutomatedResponse, isCommand, handleCommand } from '@/utils/chatAutomation';

interface ChatMessage {
  user: string;
  message: string;
  timestamp: number;
  publicKey?: string;
  isSystem?: boolean;
  key?: string;
}

interface StreamPageProps {
  streamer: Streamer;
}

export default function StreamPage({ streamer }: StreamPageProps) {
  const { connected, publicKey } = useWallet();
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTipAmount, setSelectedTipAmount] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [tempUsername, setTempUsername] = useState('');
  const [hasCheckedUsername, setHasCheckedUsername] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Debug username state
  useEffect(() => {
    console.log('🔄 Username State:', {
      connected,
      publicKey: publicKey?.toString(),
      username,
      tempUsername,
      hasCheckedUsername,
      timestamp: new Date().toISOString()
    });
  }, [connected, publicKey, username, tempUsername, hasCheckedUsername]);

  // Check username when wallet connects
  useEffect(() => {
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
          const userData = snapshot.val();
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

    // Reset states when wallet disconnects
    if (!connected || !publicKey) {
      console.log('🔌 Wallet disconnected - resetting states');
      setUsername('');
      setTempUsername('');
      setHasCheckedUsername(false);
      return;
    }

    // Check username immediately when wallet connects
    console.log('🎯 Wallet connected - checking username');
    checkUsername();
  }, [connected, publicKey]);

  // Debug modal visibility
  useEffect(() => {
    console.log('🎭 Modal Visibility Check:', {
      connected,
      username,
      hasCheckedUsername,
      shouldShow: connected && !username && hasCheckedUsername,
      timestamp: new Date().toISOString()
    });
  }, [connected, username, hasCheckedUsername]);

  // Determine if we should show the username modal - simplified logic
  const shouldShowUsernameModal = connected && !username;

  // Username submission handler
  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 Username submit triggered:', { tempUsername });
    
    if (!connected || !publicKey || !database) {
      console.error('❌ Missing requirements:', { connected, publicKey, database });
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
      await set(userRef, {
        username: tempUsername.trim(),
        createdAt: Date.now()
      });
      
      console.log('✅ Username saved successfully');
      setUsername(tempUsername.trim());
      setTempUsername('');
      toast.success('Username set successfully!');
    } catch (error) {
      console.error('⚠️ Error saving username:', error);
      toast.error('Failed to save username. Please try again.');
    }
  };

  // Explicit button click handler
  const handleSetUsernameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('🖱️ Set Username button clicked');
    handleUsernameSubmit(e as any);
  };

  // Initialize video volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = false;
    }
  }, [volume]);

  // Auto-scroll chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Initialize Firebase listeners for chat
  useEffect(() => {
    if (!database) {
      console.error('Firebase database not initialized');
      return;
    }

    const chatRef = ref(database as Database, `chats/${streamer.id}`);
    const chatQuery = query(chatRef, orderByChild('timestamp'), startAt(Date.now() - 300 * 1000)); // Last 300 seconds

    const unsubscribe = onValue(chatQuery, (snapshot) => {
      if (!database) return;
      
      const messages: ChatMessage[] = [];
      const now = Date.now();
      
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        const messageAge = now - message.timestamp;
        
        // Only include messages less than 300 seconds old
        if (messageAge < 300 * 1000) {
          messages.push({
            ...message,
            key: childSnapshot.key
          });
        } else {
          // Delete old messages
          const messageRef = ref(database as Database, `chats/${streamer.id}/${childSnapshot.key}`);
          set(messageRef, null).catch(console.error);
        }
      });
      
      // Sort messages by timestamp in ascending order
      const sortedMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
      setChatMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, [streamer.id]);

  const tipLevels = [
    { amount: 0.5, icon: <FaHeart className="text-pink-500" />, reward: 'Shoutout' },
    { amount: 2, icon: <FaStar className="text-yellow-500" />, reward: 'Special Dance' },
    { amount: 5, icon: <FaCrown className="text-purple-500" />, reward: 'Private Message' },
    { amount: 10, icon: <FaGem className="text-blue-500" />, reward: '1-on-1 Call' },
    { amount: 20, icon: <FaFire className="text-red-500" />, reward: 'VIP Status' }
  ];

  const handleTipClick = (amount: number) => {
    setSelectedTipAmount(amount);
    setIsModalOpen(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    if (!database) {
      console.error('Firebase database not initialized');
      toast.error('Chat service is currently unavailable');
      return;
    }

    // Check message length
    if (chatMessage.length > 100) {
      toast.error('Message is too long (max 100 characters)');
      return;
    }

    try {
      const moderationResult = moderateMessage(chatMessage);
      if (!moderationResult.isAllowed) {
        toast.error(moderationResult.reason || 'Message not allowed');
        return;
      }
      
      // Check for commands
      if (isCommand(moderationResult.moderatedMessage)) {
        const response = await handleCommand(moderationResult.moderatedMessage);
        if (response) {
          const systemMessage = {
            user: 'Mod',
            message: response,
            timestamp: Date.now(),
            isSystem: true
          };
          await push(ref(database, `chats/${streamer.id}`), systemMessage);
          setChatMessage('');
          return;
        }
      }

      // Check for automated responses
      const autoResponse = getAutomatedResponse(moderationResult.moderatedMessage);
      if (autoResponse) {
        const systemMessage = {
          user: 'Mod',
          message: autoResponse,
          timestamp: Date.now(),
          isSystem: true
        };
        await push(ref(database, `chats/${streamer.id}`), systemMessage);
      }

      // Create a new message with moderated content and username
      const newMessage = {
        user: username,
        message: moderationResult.moderatedMessage,
        timestamp: Date.now(),
        publicKey: publicKey?.toString()
      };

      // Reference to this streamer's chat messages
      const chatRef = ref(database, `chats/${streamer.id}`);
      
      // Push the new message to the database
      await push(chatRef, newMessage);
      
      // Clear the input field
      setChatMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          await (videoContainerRef.current as any).webkitRequestFullscreen();
        } else if ((videoContainerRef.current as any).msRequestFullscreen) {
          await (videoContainerRef.current as any).msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error attempting to toggle fullscreen:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-2 sm:p-4">
      {/* Username Modal */}
      {shouldShowUsernameModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
          <div className="bg-gray-900 p-6 rounded-lg border border-pink-500/20 w-96" onClick={e => e.stopPropagation()}>
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
                onClick={handleSetUsernameClick}
                className="w-full bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors active:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                Set Username
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        {/* Main Stream Section */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-6">
          {/* Video Section */}
          <div 
            ref={videoContainerRef}
            className="aspect-video bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg overflow-hidden relative group"
            onTouchStart={() => setShowControls(true)}
            onTouchEnd={() => setTimeout(() => setShowControls(false), 3000)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={streamer.videoUrl}
              className="w-full h-full object-contain bg-black"
              autoPlay
              loop
              playsInline
              muted={volume === 0}
            />
            
            {/* Custom Controls Overlay */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              } pointer-events-none`}
            >
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Volume Control */}
                  <div className="flex items-center gap-2 min-w-[100px] sm:min-w-[120px]">
                    <button 
                      onClick={() => {
                        const newVolume = volume === 0 ? 0.5 : 0;
                        setVolume(newVolume);
                        if (videoRef.current) {
                          videoRef.current.volume = newVolume;
                          videoRef.current.muted = newVolume === 0;
                        }
                      }}
                      className="text-white hover:text-white/80 transition-colors p-2 sm:p-1"
                    >
                      {volume === 0 ? (
                        <FaVolumeMute size={20} />
                      ) : volume < 0.5 ? (
                        <FaVolumeDown size={20} />
                      ) : (
                        <FaVolumeUp size={20} />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>

                  {/* Quality Selector */}
                  <select 
                    className="bg-black/40 border border-white/30 rounded px-2 py-1 text-white text-sm"
                    onChange={(e) => console.log('Quality changed to:', e.target.value)}
                    defaultValue="1080"
                  >
                    <option value="1080">1080p</option>
                    <option value="720">720p</option>
                    <option value="480">480p</option>
                  </select>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-white/80 transition-colors p-2"
                >
                  <FaExpand size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tip Levels */}
          <div className="bg-black/40 p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 sm:mb-4 text-white">Tip Levels</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              {tipLevels.map((level) => (
                <button
                  key={level.amount}
                  onClick={() => handleTipClick(level.amount)}
                  className="bg-black/40 p-3 sm:p-4 rounded-lg text-center hover:bg-pink-500/20 active:bg-pink-600/20 transition-colors cursor-pointer touch-manipulation"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{level.icon}</div>
                  <div className="font-bold text-base sm:text-lg">{level.amount} SOL</div>
                  <div className="text-xs sm:text-sm text-gray-300">{level.reward}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-black/40 p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 sm:mb-4 text-white">Quick Tips</h3>
            <div className="flex gap-3 sm:gap-4">
              <DonateButton 
                recipientAddress={streamer.solanaAddress} 
                streamerName={streamer.displayName}
                presetAmount={selectedTipAmount}
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedTipAmount(null);
                }}
              />
            </div>
          </div>
        </div>

        {/* Side Section */}
        <div className="space-y-3 sm:space-y-6">
          {/* Chat */}
          <div className="bg-black/40 p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 sm:mb-4">Chat</h3>
            <div className="h-[300px] sm:h-[400px] flex flex-col">
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 mb-3 sm:mb-4 scroll-smooth"
              >
                {chatMessages.map((msg, i) => (
                  <div 
                    key={msg.key || i} 
                    className="bg-black/40 p-2 rounded-lg text-sm sm:text-base break-words"
                  >
                    <span className={`font-bold ${
                      msg.isSystem ? 'text-green-400' : 
                      msg.publicKey === publicKey?.toString() ? 'text-pink-400' : 'text-white'
                    }`}>
                      {msg.user}:
                    </span>
                    <span className="ml-2">{msg.message}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {Math.floor((300 * 1000 - (Date.now() - msg.timestamp)) / 1000)}s
                    </span>
                  </div>
                ))}
              </div>
              {connected ? (
                <form onSubmit={handleSendMessage} className="mt-auto">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder={username ? "Type a message (max 100 chars)..." : "Set a username first"}
                      disabled={!username}
                      maxLength={100}
                      className="flex-1 bg-black/40 p-2 rounded-lg text-base disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!username}
                      className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-4 py-2 rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Send
                    </button>
                  </div>
                  {connected && !username && (
                    <p className="text-pink-400 text-sm mt-2">Please set a username to chat</p>
                  )}
                </form>
              ) : (
                <div className="mt-auto text-center p-4 bg-black/20 rounded-lg">
                  <p className="text-gray-400 mb-3">Connect your wallet to join the chat</p>
                  <WalletMultiButton className="!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700 !py-2 !text-base !rounded-lg" />
                </div>
              )}
            </div>
          </div>

          {/* Streamer Profile */}
          <div className="bg-black/40 p-4 sm:p-6 rounded-lg">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img
                src={streamer.avatar}
                alt={streamer.displayName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{streamer.displayName}</h2>
                <p className="text-sm sm:text-base text-gray-300">{streamer.bio}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="bg-black/40 p-2 rounded-lg">
                <div className="font-bold text-base sm:text-lg">{streamer.totalDonations.toFixed(2)} SOL</div>
                <div className="text-xs sm:text-sm text-gray-300">Total Tips</div>
              </div>
              <div className="bg-black/40 p-2 rounded-lg">
                <div className="font-bold text-base sm:text-lg">{streamer.topDonation.toFixed(2)} SOL</div>
                <div className="text-xs sm:text-sm text-gray-300">Top Tip</div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-black/40 p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 sm:mb-4">Schedule</h3>
            {Object.entries(streamer.schedule).map(([day, time]) => (
              time && (
                <div key={day} className="flex justify-between py-2 border-b border-gray-700 last:border-0 text-sm sm:text-base">
                  <span className="capitalize">{day}</span>
                  <span>{time}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 