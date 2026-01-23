import Image from "next/image";
import heroImage from "../media/mulholland-drive.jpg";

export default function Home() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="w-full max-w-2xl mx-auto flex flex-col">
          <Image src={heroImage} alt="Featured collection" priority sizes="(max-width: 768px) 100vw, 768px" style={{ width: "100%", height: "auto" }} />
          <h2 className="mt-2 text-xs font-thin text-black text-left">
            Shop the New Collection
          </h2>
        </div>
      </div>
    </main>
  );
}
