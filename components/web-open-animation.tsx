'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWebOpenAnimation } from '@/context/animation-context';

export function WebOpenAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { setIsWebOpenAnimating } = useWebOpenAnimation();

  const handleEnter = () => {
    setIsAnimating(true);
    setIsWebOpenAnimating(true);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Responsive sizing - same size for mobile and desktop
  const buttonWidth = '56px';
  const expandedWidth = isHovering ? '220px' : '190px';
  const buttonHeight = 'h-[52px]';
  const circleSize = 'w-9 h-9';
  const arrowSize = 'w-6 h-6';
  const textSize = 'text-[16px]';
  const gap = 'gap-2';

  return (
    <AnimatePresence mode="wait">
      {!isAnimating && (
        <>
          {/* Black overlay background - full viewport cover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-black"
            style={{ zIndex: 9998 }}
          />

          {/* Top slice that moves up on exit */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100vh' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 h-1/2 bg-black/70 backdrop-blur-sm border-b border-white"
            style={{ zIndex: 9997 }}
          />

          {/* Bottom slice that moves down on exit */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-black/70 backdrop-blur-sm border-t border-white"
            style={{ zIndex: 9997 }}
          />

          {/* CTA Button Container */}
          <div className="fixed inset-0 flex items-center justify-center px-4" style={{ zIndex: 9999 }}>
            <motion.button
              initial={{ width: buttonWidth }}
              animate={{ width: isVisible ? expandedWidth : buttonWidth }}
              exit={{ x: '150vw', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onHoverStart={() => !isMobile && setIsHovering(true)}
              onHoverEnd={() => !isMobile && setIsHovering(false)}
              onClick={handleEnter}
              className={`relative ${buttonHeight} bg-transparent border-l-2 border-r-2 border-white rounded-full flex items-center justify-between px-1.5 ${gap} overflow-hidden cursor-pointer focus:outline-none`}
            >
              {/* Left text - fades in after button expands */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className={`text-white font-medium ${textSize} whitespace-nowrap`}
              >
                {isMobile ? 'Open Website' : 'Open Website'}
              </motion.span>

              {/* Arrow circle - static background */}
              <div className={`${circleSize} rounded-full bg-white flex items-center justify-center overflow-hidden relative flex-shrink-0`}>
                {/* Main arrow - exits right on hover */}
                <motion.div
                  animate={{
                    x: !isMobile && isHovering ? 40 : 0,
                    opacity: !isMobile && isHovering ? 0 : 1
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute"
                >
                  <ArrowRight className={`${arrowSize} text-black`} strokeWidth={2} />
                </motion.div>

                {/* Secondary arrow - enters from left on hover */}
                <motion.div
                  animate={{
                    x: !isMobile && isHovering ? 0 : -40,
                    opacity: !isMobile && isHovering ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute"
                >
                  <ArrowRight className={`${arrowSize} text-black`} strokeWidth={2} />
                </motion.div>
              </div>
            </motion.button>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
