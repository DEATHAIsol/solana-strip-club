'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      // Check if user has already verified their age and if the verification is still valid
      const verificationData = localStorage.getItem('ageVerified');
      if (verificationData) {
        const { timestamp } = JSON.parse(verificationData);
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
        
        // If more than 10 minutes have passed, show modal again
        if (now - timestamp > tenMinutes) {
          localStorage.removeItem('ageVerified');
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      } else {
        setShowModal(true);
      }
    }
  }, []);

  const handleAgree = () => {
    if (typeof window !== 'undefined') {
      // Store verification time
      localStorage.setItem('ageVerified', JSON.stringify({
        verified: true,
        timestamp: Date.now()
      }));
    }
    setShowModal(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full p-8 text-center border border-pink-500">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Solana Strip Club
        </h1>
        
        <div className="text-red-500 font-bold text-xl mb-4">
          WARNING: This Website Contains Adult Content
        </div>
        
        <div className="text-white text-lg mb-6">
          You Must Be 18 Years' of Age or Older to Access.
        </div>

        <div className="text-gray-300 mb-8">
          By clicking "I AGREE AND ENTER" below, you confirm you are 18 years of age or older 
          and you have read and accepted our{' '}
          <Link href="/terms" className="text-pink-500 hover:text-pink-400 underline">
            Terms and Conditions
          </Link>
          .
        </div>

        <div className="text-gray-300 mb-8">
          <span className="font-semibold text-purple-400">PARENTAL WARNING:</span>{' '}
          If you are a parent, please{' '}
          <Link href="/safety" className="text-pink-500 hover:text-pink-400 underline">
            click here
          </Link>{' '}
          to read the eSafety Commissioner's Online Safety Guide before registering as a member.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDecline}
            className="px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            DECLINE
          </button>
          <button
            onClick={handleAgree}
            className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            AGREE AND ENTER
          </button>
        </div>
      </div>
    </div>
  );
} 