import Image from "next/image";
import Link from "next/link";
import HeroImg from "../public/assets/heroImg.jpeg";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-6 mt-8">
            <div className="relative overflow-hidden rounded-2xl min-h-[70vh] flex items-center">

                {/* Background Image */}
                <Image
                    src={HeroImg}
                    alt="Auto care training workshop"
                    fill
                    priority
                    className="object-cover position-fixed"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>

                {/* Content */}
                <div className="relative z-10 max-w-2xl px-8 md:px-16 text-white">

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Start Your Career. Learn Real-World Skills.
                    </h1>

                    <p className="mt-4 text-lg text-gray-200">
                        Learn practical automotive skills from experienced instructors and
                        start building a real career in auto care and diagnostics.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">

                        <Link
                            href="/instructors"
                            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                        >
                            Become an Instructor
                        </Link>

                        <Link
                            href="/apply"
                            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
                        >
                            Apply Online
                        </Link>

                    </div>

                </div>
            </div>
        </section>
    );
}