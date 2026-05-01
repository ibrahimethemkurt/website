import React, { useRef, useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LightRays from './components/LightRays';
import ScrollVelocity from './component/ScrollVelocity';
import GooeyNav from './component/GooeyNav';
import { ErrorBoundary } from './component/ErrorBoundary';
import profilePic from './assets/ibrahimethemkurtpp.svg';

const About = lazy(() => import('./component/About'));
const Experiences = lazy(() => import('./component/Experiences'));
const Projects = lazy(() => import('./component/Projects'));
const Contact = lazy(() => import('./component/Contact'));

const navItems = [
  { label: 'Anasayfa', href: '#hero' },
  { label: 'Hakkında', href: '#hakkinda' },
  { label: 'Deneyimler', href: '#deneyimler' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'İletişim', href: '#iletisim' }
];

const SECTION_IDS = ['hero', 'hakkinda', 'deneyimler', 'projeler', 'iletisim'];

function App() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const isScrolling = useRef(false);

  // Sayfa yüklendiğinde URL'deki hash'e göre git
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const index = SECTION_IDS.indexOf(hash);
    if (index !== -1) {
      setCurrentSection(index);
      setTimeout(() => {
        const target = document.getElementById(SECTION_IDS[index]);
        if (target && mainRef.current) {
          mainRef.current.scrollTop = target.offsetTop;
        }
      }, 100);
    }
  }, []);

  // currentSection değiştikçe URL'i temiz tut/güncelle
  useEffect(() => {
    const hash = currentSection === 0 ? window.location.pathname : `#${SECTION_IDS[currentSection]}`;
    window.history.replaceState(null, null, hash);
  }, [currentSection]);

  // Yavaş, kontrollü bölüm geçişi
  const scrollToSection = useCallback((index) => {
    if (isScrolling.current || !mainRef.current) return;
    const clamped = Math.max(0, Math.min(index, SECTION_IDS.length - 1));
    if (clamped === currentSection) return;

    isScrolling.current = true;
    setCurrentSection(clamped);

    const target = document.getElementById(SECTION_IDS[clamped]);
    if (target) {
      const start = mainRef.current.scrollTop;
      const end = target.offsetTop;
      const distance = end - start;
      const duration = 1000; // Daha tatlı ve akıcı bir animasyon süresi
      let startTime = null;

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        mainRef.current.scrollTop = start + distance * eased;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isScrolling.current = false;
        }
      };
      requestAnimationFrame(animate);
    }
  }, [currentSection]);

  // Carousel kenarına ulaşıldığında bölüm değiştir
  const handleCarouselEdge = useCallback((direction) => {
    if (isScrolling.current) return;
    if (direction === 'down') scrollToSection(currentSection + 1);
    else if (direction === 'up') scrollToSection(currentSection - 1);
  }, [currentSection, scrollToSection]);

  // Wheel olayını yakala
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    let lockTimeout;
    let localLock = false;

    const handleWheel = (e) => {
      // Deneyimler section'ında carousel kendi yönetiyor, App karışmasın
      if (currentSection === 2) return;

      e.preventDefault();

      const wasLocked = localLock;

      // Her wheel event'inde kilidi tazele
      localLock = true;
      clearTimeout(lockTimeout);
      lockTimeout = setTimeout(() => {
        localLock = false;
      }, 500);

      if (isScrolling.current || wasLocked) return;

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0) {
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(lockTimeout);
    };
  }, [currentSection, scrollToSection]);

  // Hero scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    container: mainRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.96]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.6], [0, 14]);

  return (
    <ErrorBoundary>
      <main
        ref={mainRef}
        className="relative w-full h-[100dvh] overflow-y-auto overflow-x-hidden bg-background text-foreground font-sans selection:bg-white/20"
        style={{ scrollBehavior: 'auto' }}
      >

        {/* Floating Navigation */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-2 py-1 bg-black/10 backdrop-blur-xl border border-white/10 drop-shadow-2xl">
          <GooeyNav 
            items={navItems} 
            externalActiveIndex={currentSection}
            onNavClick={scrollToSection}
          />
        </div>

        {/* Global Scroll Indicator (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSection === SECTION_IDS.length - 1 ? 0 : 1 }}
          transition={{ duration: 1, delay: currentSection === 0 ? 1.5 : 0 }}
          className="fixed bottom-10 right-8 md:right-16 z-50 flex flex-row items-center gap-4 pointer-events-none"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] md:text-xs font-light uppercase tracking-[0.3em] text-white/80 select-none text-right"
          >
            Keşfetmek İçin Kaydırın
          </motion.span>
          <div className="w-[20px] h-[34px] rounded-[10px] border-[1.5px] border-white/40 flex justify-center pt-[4px]">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-[6px] bg-white rounded-full"
            />
          </div>
        </motion.div>

        {/* Dynamic Light Rays Background (Fixed) */}
        <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#666666"
            raysSpeed={0.5}
            lightSpread={1.5}
            fadeDistance={0.8}
            followMouse={true}
            noiseAmount={0.2}
          />
        </div>

        {/* ==================== HERO SECTION ==================== */}
        <section
          ref={heroRef}
          id="hero"
          className="snap-start relative min-h-[100dvh] w-full flex flex-col items-center justify-end overflow-hidden"
        >
          <motion.div
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
            }}
            className="absolute inset-0 flex flex-col items-center justify-end"
          >
            {/* Scrolling Background Text */}
            <div className="absolute top-[52%] left-0 w-full -translate-y-1/2 z-10 select-none overflow-hidden flex flex-col items-center justify-center whitespace-nowrap space-y-2">
              <ScrollVelocity
                texts={[
                  "İbrahim Ethem Kurt  •  İbrahim Ethem Kurt  •  İbrahim Ethem Kurt  •  İbrahim Ethem Kurt  •",
                  "Digital Marketing • Community Management • Project Management  •"
                ]}
                velocity={30}
                numCopies={6}
                parallaxClassName="relative overflow-hidden w-full"
                scrollerClassName="flex whitespace-nowrap text-center drop-shadow-sm"
                className="noto-serif-dives-akuru-regular text-[40px] tracking-normal leading-normal pointer-events-none opacity-40 shrink-0"
              />
            </div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
              className="relative z-20 flex justify-center items-end"
            >
              <img
                src={profilePic}
                alt="İbrahim Ethem Kurt"
                className="h-[75vh] w-auto object-contain object-bottom drop-shadow-2xl grayscale"
                draggable="false"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <Suspense fallback={<div className="h-[100dvh] w-full bg-background" />}>
          <About />
        </Suspense>

        {/* ==================== EXPERIENCES SECTION ==================== */}
        <Suspense fallback={<div className="h-[100dvh] w-full bg-background" />}>
          <Experiences onScrollPastEdge={handleCarouselEdge} />
        </Suspense>

        {/* ==================== PROJECTS SECTION ==================== */}
        <Suspense fallback={<div className="h-[100dvh] w-full bg-background" />}>
          <Projects />
        </Suspense>

        {/* ==================== CONTACT SECTION ==================== */}
        <Suspense fallback={<div className="h-[100dvh] w-full bg-background" />}>
          <Contact />
        </Suspense>

      </main>
    </ErrorBoundary>
  );
}

export default App;
