import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="w-full px-4 md:px-6 py-10">
      <div className="relative max-w-[1080px] mx-auto h-[320px] md:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden flex items-center justify-center text-center">

        {/* Background Image */}
        <Image
          src="/assets/aboutImg.png"
          alt="Solar installation training taking place on the roof of the institute"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-[720px] text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            About Glitec Advanced School of Technology
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200">
            We equip individuals with practical, industry-ready skills through hands-on training in technology and modern technical trades.
          </p>
        </div>

      </div>
    </section>
  );
}