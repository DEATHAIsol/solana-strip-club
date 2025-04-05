'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) return;

    // Create a single style element for cursor hiding
    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      .wallet-adapter-button,
      .wallet-adapter-modal-container * {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (rafId) cancelAnimationFrame(rafId);
      
      // Schedule the new update
      rafId = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const isWalletElement = target.closest('.wallet-adapter-button, .wallet-adapter-modal-container');
        
        if (!isWalletElement) {
          const isClickable = target.closest('a, button, [role="button"]');
          // Use translate3d for hardware acceleration
          cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(${isClickable ? 1.5 : 1})`;
          cursor.style.opacity = '1';
        } else {
          cursor.style.opacity = '0';
        }
      });
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      style.remove();
    };
  }, [pathname]);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="custom-cursor-heart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
} 