'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1,
};

const useEmblaControls = emblaApi => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [nextDisabled, setNextDisabled] = React.useState(true);

  const onDotClick = React.useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);

  const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateSelectionState = (api) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  };

  const onInit = React.useCallback((api) => {
    setScrollSnaps(api.scrollSnapList());
    updateSelectionState(api);
  }, []);

  const onSelect = React.useCallback((api) => {
    updateSelectionState(api);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    emblaApi.on('reInit', onInit).on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit).off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  };
};

function MotionCarousel(props) {
  const { slides, options, renderItem, className, onEdgeScroll } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi);

  // Store latest callback in a ref so the wheel handler always sees the current version
  const onEdgeScrollRef = React.useRef(onEdgeScroll);
  React.useEffect(() => { onEdgeScrollRef.current = onEdgeScroll; }, [onEdgeScroll]);

  // Vertical wheel → horizontal scroll conversion
  React.useEffect(() => {
    if (!emblaApi) return;
    const rootNode = emblaApi.rootNode();
    const parentSection = rootNode.closest('section') || rootNode.closest('[id]');
    const targetNode = parentSection || rootNode;
    
    let isTransitioning = false;
    let inertiaTimeout;
    let isSettled = true; // true = no recent wheel activity, safe for new gesture

    const handleWheel = (e) => {
      // Only intercept vertical scrolls
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      // ALWAYS intercept and stop propagation so App.jsx handler never fires
      e.preventDefault();
      e.stopPropagation();

      // Track inertia: mark as unsettled, reset timer on each event
      const wasSettled = isSettled;
      isSettled = false;
      clearTimeout(inertiaTimeout);
      inertiaTimeout = setTimeout(() => { isSettled = true; }, 400);

      // Don't do anything while a transition is animating
      if (isTransitioning) return;

      const canPrev = emblaApi.canScrollPrev();
      const canNext = emblaApi.canScrollNext();

      // Can scroll within carousel → do it
      if ((e.deltaY > 0 && canNext) || (e.deltaY < 0 && canPrev)) {
        isTransitioning = true;
        if (e.deltaY > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        setTimeout(() => { isTransitioning = false; }, 700);
        return;
      }

      // At edge: only trigger section change on a FRESH gesture (inertia had fully settled)
      if (wasSettled && onEdgeScrollRef.current) {
        onEdgeScrollRef.current(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    targetNode.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      targetNode.removeEventListener('wheel', handleWheel);
      clearTimeout(inertiaTimeout);
    };
  }, [emblaApi]);

  return (
    <div
      className={`w-full space-y-6 ${className || '[--slide-height:9rem] sm:[--slide-height:13rem] md:[--slide-height:18rem] [--slide-spacing:1.5rem] [--slide-size:55%]'}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom" style={{ marginLeft: 'calc(var(--slide-spacing) * -1)' }}>
          {slides.map((item, index) => {
            const isActive = index === selectedIndex;
            const isPast = index < selectedIndex;

            return (
              <motion.div
                key={index}
                className="flex-none flex min-w-0"
                style={{
                  height: 'var(--slide-height)',
                  paddingLeft: 'var(--slide-spacing)',
                  flexBasis: 'var(--slide-size)',
                }}
              >
                <motion.div
                  className="size-full flex items-center justify-center select-none overflow-hidden relative"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : isPast ? 0.3 : 0.15,
                  }}
                  transition={transition}>
                  {renderItem ? renderItem(item, index, isActive) : (
                    <div className="size-full flex justify-center items-center text-3xl md:text-5xl font-semibold">
                      {index + 1}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6">
        <Button
          size="icon"
          onClick={onPrev}
          disabled={prevDisabled}
          className="rounded-full w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all"
        >
          <ChevronLeft className="size-5 text-white/70" />
        </Button>

        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              label={index + 1}
              selected={index === selectedIndex}
              onClick={() => onDotClick(index)} />
          ))}
        </div>

        <Button
          size="icon"
          onClick={onNext}
          disabled={nextDisabled}
          className="rounded-full w-10 h-10 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20 transition-all"
        >
          <ChevronRight className="size-5 text-white/70" />
        </Button>
      </div>
    </div>
  );
}

function DotButton({
  selected = false,
  label,
  onClick
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={false}
      className="flex cursor-pointer select-none items-center justify-center rounded-full border-none bg-white/80 text-black text-xs font-medium"
      animate={{
        width: selected ? 36 : 10,
        height: selected ? 36 : 10,
        opacity: selected ? 1 : 0.3,
      }}
      transition={transition}>
      <motion.span
        layout
        initial={false}
        className="block whitespace-nowrap"
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0,
        }}
        transition={transition}>
        {label}
      </motion.span>
    </motion.button>
  );
}

export { MotionCarousel };
