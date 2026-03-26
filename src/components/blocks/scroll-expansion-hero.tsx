'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { motion, useInView } from 'framer-motion';

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
  children,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='overflow-x-hidden'
      style={{ backgroundColor: "#ffffff" }}
    >
      <section className='relative flex flex-col items-center justify-start'>
        <div className='relative w-full flex flex-col items-center'>
          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>

            {/* Video / Media — full width with rounded corners */}
            <div className='w-full px-4 sm:px-8 pt-8 sm:pt-12'>
              <motion.div
                className='relative w-full rounded-2xl overflow-hidden'
                style={{
                  maxWidth: isMobileState ? '100%' : '1200px',
                  margin: '0 auto',
                  aspectRatio: isMobileState ? '16/10' : '16/9',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)',
                }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
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
                    </div>
                  ) : (
                    <div className='relative w-full h-full'>
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
                      <div className='absolute inset-0 bg-black/10 rounded-xl' />
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
                  </div>
                )}

                {/* Title overlay on media */}
                <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4'>
                  {title && (
                    <>
                      <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight'>
                        {firstWord}
                      </h2>
                      <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight'>
                        {restOfTitle}
                      </h2>
                    </>
                  )}
                  {date && (
                    <p className='text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mt-3'>
                      {date}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Content below video */}
            <section className='flex flex-col w-full px-4 sm:px-8 md:px-16 py-10 lg:py-20'>
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
