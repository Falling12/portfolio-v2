'use client'

import { useRef, useState } from 'react'

export function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollToIndex(index: number) {
    const track = trackRef.current
    const slide = track?.children[index]
    if (slide instanceof HTMLElement) slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  function handleScroll() {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  if (images.length === 0) return null

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <div key={image.src} className="w-full shrink-0 snap-start">
            <img src={image.src} alt={image.alt} className="h-auto w-full border border-rule object-contain" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            aria-label="Previous image"
            disabled={activeIndex === 0}
            className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-rule bg-paper/80 backdrop-blur-sm transition-opacity duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-0"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            aria-label="Next image"
            disabled={activeIndex === images.length - 1}
            className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-rule bg-paper/80 backdrop-blur-sm transition-opacity duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-0"
          >
            <span aria-hidden="true">→</span>
          </button>

          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to image ${i + 1} of ${images.length}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-[var(--accent)]' : 'w-1.5 bg-rule'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
