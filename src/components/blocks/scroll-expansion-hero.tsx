'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  onExpanded?: () => void;
  onScrolledBack?: () => void;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  onExpanded,
  onScrolledBack,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const overScrollBackRef = useRef(0);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        // Accumulate over-scroll; once threshold hit, go straight back to hero
        overScrollBackRef.current += Math.abs(e.deltaY);
        e.preventDefault();
        if (overScrollBackRef.current > 80) {
          overScrollBackRef.current = 0;
          setMediaFullyExpanded(false);
          setShowContent(false);
          onScrolledBack?.();
        }
      } else if (!mediaFullyExpanded) {
        e.preventDefault();

        // Scroll back to hero when at start and scrolling up
        if (scrollProgress <= 0 && e.deltaY < 0) {
          overScrollBackRef.current += Math.abs(e.deltaY);
          if (overScrollBackRef.current > 100) {
            overScrollBackRef.current = 0;
            onScrolledBack?.();
          }
          return;
        }

        overScrollBackRef.current = 0;
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          onExpanded?.();
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      } else {
        // fully expanded, scrolling down or not at top — reset over-scroll counter
        overScrollBackRef.current = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < 0 && window.scrollY <= 5) {
        overScrollBackRef.current += Math.abs(deltaY);
        e.preventDefault();
        if (overScrollBackRef.current > 60) {
          overScrollBackRef.current = 0;
          setMediaFullyExpanded(false);
          setShowContent(false);
          onScrolledBack?.();
        }
      } else if (!mediaFullyExpanded) {
        e.preventDefault();

        if (scrollProgress <= 0 && deltaY < 0) {
          overScrollBackRef.current += Math.abs(deltaY);
          if (overScrollBackRef.current > 80) {
            overScrollBackRef.current = 0;
            onScrolledBack?.();
          }
          setTouchStartY(touchY);
          return;
        }

        overScrollBackRef.current = 0;
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          onExpanded?.();
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      } else {
        // fully expanded, scrolling down or not at top
        overScrollBackRef.current = 0;
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
      overScrollBackRef.current = 0;
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, onExpanded, onScrolledBack]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
      style={{ backgroundColor: "#ffffff" }}
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.15)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className='absolute inset-0 bg-black/20 rounded-xl'
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0.4 - scrollProgress * 0.25 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Title + meta overlay — always on the dark video surface */}
                <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4 transition-none'>
                  {title && (
                    <>
                      <motion.h2
                        className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight transition-none'
                        style={{ transform: `translateX(-${textTranslateX}vw)`, opacity: 1 - scrollProgress * 2 }}
                      >
                        {firstWord}
                      </motion.h2>
                      <motion.h2
                        className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight transition-none'
                        style={{ transform: `translateX(${textTranslateX}vw)`, opacity: 1 - scrollProgress * 2 }}
                      >
                        {restOfTitle}
                      </motion.h2>
                    </>
                  )}
                  <div className='flex flex-col items-center mt-4 gap-1'>
                    {date && (
                      <p
                        className='text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 transition-none'
                        style={{ transform: `translateX(-${textTranslateX}vw)`, opacity: 1 - scrollProgress * 2 }}
                      >
                        {date}
                      </p>
                    )}
                    {scrollToExpand && (
                      <p
                        className='text-white/35 font-medium text-[11px] transition-none'
                        style={{ transform: `translateX(${textTranslateX}vw)`, opacity: 1 - scrollProgress * 2 }}
                      >
                        {scrollToExpand}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
