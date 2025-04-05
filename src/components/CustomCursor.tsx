'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
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
    <div className="custom-cursor">
      <div
        ref={cursorRef}
        className="custom-cursor-heart"
        style={{
          position: 'fixed',
          top: -10,
          left: -10,
          fontSize: '24px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 2147483647,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      >
        ❤️
      </div>
    </div>
  );
} 