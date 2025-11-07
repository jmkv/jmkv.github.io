import { useState, useEffect, useCallback } from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumbsButton';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

export default (props: PropType) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex items-center h-svh text-[rgb(12,114,59)] bg-[#c6f6d5] bubble-text">
      <div className="max-w-[48rem] p-2 w-full">
        <div className="overflow-hidden" ref={emblaMainRef}>
          <div className="flex touch-pinch-zoom touch-pan-x">
            {slides.map((text, index) => (
              <div
                key={index}
                className="indent-[2rem] translate-x-0 translate-y-0 translate-z-0 flex-[0_0_100%] min-w-0"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[.8rem]">
          <div className="flex items-center gap-1 justify-bt">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <div
              className="overflow-hidden flex-1 pr-1 pl-1"
              ref={emblaThumbsRef}
            >
              <div className="flex flex-row gap-1">
                {slides.map((_, index) => (
                  <Thumb
                    key={index}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    index={index}
                  />
                ))}
              </div>
            </div>
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
