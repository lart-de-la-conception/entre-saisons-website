import Link from "next/link";
import HomeHeroSlideshow from "./components/HomeHeroSlideshow";
import ScratchRevealText from "./components/ScratchRevealText";

export default function Home() {
  return (
    <main className="min-h-[calc(100svh-68px)] overflow-x-hidden bg-white lg:overflow-hidden">
      <div className="home-stage relative h-full w-full px-4 pt-4 pb-14 sm:px-6 sm:pt-3 sm:pb-16 md:pb-20">
        <div className="home-stage-content relative mx-auto flex h-full max-w-6xl flex-col lg:block">
          <ScratchRevealText
            text="I BECAME A PAINTER BECAUSE I WANTED TO RAISE PAINTING TO THE LEVEL OF POIGNANCY, OF MUSIC, AND POETRY"
            attribution="MARK ROTHKO"
            className="home-quote-left relative z-0 mb-8 md:mb-10 lg:absolute lg:left-0 lg:top-8 lg:mb-0 lg:w-[456px] xl:-left-2 xl:w-[552px]"
            textClassName="font-thin leading-[1.42] text-[15px] sm:text-[18px] lg:text-[22px]"
            attributionClassName="font-thin text-[12px] sm:text-[14px] lg:text-[16px]"
          />
          <div className="home-hero-frame relative z-10 mx-auto w-full max-w-[34rem] sm:max-w-2xl">
            <HomeHeroSlideshow />
            <Link
              href="/products"
              className="home-shop-link mt-4 inline-block rounded-sm text-[11px] font-thin text-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20 lg:absolute lg:left-full lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:pl-12"
            >
              Shop the New Collection
            </Link>
          </div>
          <ScratchRevealText
            text="TRAGEDY, ECSTASY, DOOM"
            className="home-quote-right relative z-0 mt-10 ml-auto w-full max-w-[360px] sm:mt-12 sm:max-w-[480px] sm:pr-[10px] lg:absolute lg:right-12 lg:bottom-16 lg:mt-0 lg:w-[540px] xl:right-16"
            textClassName="text-right font-thin leading-[1.08] text-[22px] sm:text-[28px] lg:text-[33px]"
          />
        </div>
      </div>
    </main>
  );
}
