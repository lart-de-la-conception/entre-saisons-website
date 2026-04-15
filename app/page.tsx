import Link from "next/link";
import HomeHeroSlideshow from "./components/HomeHeroSlideshow";
import ScratchRevealText from "./components/ScratchRevealText";

export default function Home() {
  return (
    <main className="min-h-[calc(100svh-68px)] overflow-x-hidden bg-white md:h-[calc(100svh-68px)] md:overflow-hidden">
      <div className="home-stage relative h-full w-full px-4 pt-4 pb-20 sm:px-6 sm:pt-2">
        <div className="home-stage-content relative mx-auto h-full max-w-6xl">
          <ScratchRevealText
            text="I BECAME A PAINTER BECAUSE I WANTED TO RAISE PAINTING TO THE LEVEL OF POIGNANCY, OF MUSIC, AND POETRY"
            attribution="MARK ROTHKO"
            className="home-quote-left relative z-0 max-md:mb-12 md:absolute md:left-0 md:top-8 md:w-[456px] lg:-left-2 lg:w-[552px]"
            textClassName="font-thin leading-[1.42] text-[15px] sm:text-[18px] md:text-[22px]"
            attributionClassName="font-thin text-[12px] sm:text-[14px] md:text-[16px]"
          />
          <div className="home-hero-frame relative z-10 mx-auto w-full max-w-2xl">
            <HomeHeroSlideshow />
            <Link
              href="/products"
              className="home-shop-link mt-4 inline-block rounded-sm text-[11px] font-thin text-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20 md:absolute md:left-full md:top-1/2 md:mt-0 md:-translate-y-1/2 md:pl-12"
            >
              Shop the New Collection
            </Link>
          </div>
          <ScratchRevealText
            text="TRAGEDY, ECSTASY, DOOM"
            className="home-quote-right relative z-0 mt-12 ml-auto max-w-[480px] pr-[10px] md:absolute md:bottom-16 md:right-12 md:mt-0 md:w-[540px] lg:right-16"
            textClassName="text-right font-thin leading-[1.08] text-[24px] sm:text-[28px] md:text-[33px]"
          />
        </div>
      </div>
    </main>
  );
}
