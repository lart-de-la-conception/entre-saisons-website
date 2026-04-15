import Link from "next/link";
import HomeHeroSlideshow from "./components/HomeHeroSlideshow";
import ScratchRevealText from "./components/ScratchRevealText";

export default function Home() {
  return (
    <main className="h-[calc(100svh-68px)] overflow-hidden bg-white">
      <div className="relative h-full w-full px-6 pt-2 pb-20">
        <div className="mx-auto max-w-6xl">
          <ScratchRevealText
            text="I BECAME A PAINTER BECAUSE I WANTED TO RAISE PAINTING TO THE LEVEL OF POIGNANCY, OF MUSIC, AND POETRY"
            attribution="MARK ROTHKO"
            className="relative z-0 max-md:mb-12 md:absolute md:left-0 md:top-8 md:w-[456px] lg:-left-2 lg:w-[552px]"
            textClassName="font-thin leading-[1.42] text-[22px]"
            attributionClassName="font-thin text-[16px]"
          />
          <div className="relative z-10 mx-auto w-full max-w-2xl">
            <HomeHeroSlideshow />
            <Link
              href="/products"
              className="mt-4 inline-block text-xs font-thin text-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20 rounded-sm md:absolute md:left-full md:top-1/2 md:mt-0 md:-translate-y-1/2 md:pl-12"
            >
              Shop the New Collection
            </Link>
          </div>
          <ScratchRevealText
            text="TRAGEDY, ECSTASY, DOOM"
            className="relative z-0 mt-12 ml-auto max-w-[480px] pr-[10px] md:absolute md:bottom-16 md:right-12 md:mt-0 md:w-[540px] lg:right-16"
            textClassName="text-right font-thin leading-[1.08] text-[33px]"
          />
        </div>
      </div>
    </main>
  );
}
