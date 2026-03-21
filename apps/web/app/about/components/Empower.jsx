import Image from "next/image"

export default function Empower() {
    return (
        <section className="w-full py-16 px-6 flex justify-center">
            <div className="max-w-6xl w-full flex flex-col items-center text-center gap-10">

                <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Empowering Minds, Inspiring Futures
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        At Glitec, we believe learning should be accessible, engaging, and empowering
                        no matter where you are in the world. Our passionate team of educators,
                        innovators, and lifelong learners is committed to helping you unlock your
                        full potential through flexible, high-quality online and in-person programs.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full justify-center">

                    <div className="group relative w-full md:w-1/3 h-[260px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/assets/ictImg.jpeg"
                            alt="ICT students in the lab"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    <div className="group relative w-full md:w-1/3 h-[260px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/assets/autocare.jpeg"
                            alt="Autocare training session"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    <div className="group relative w-full md:w-1/3 h-[260px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src="/assets/aboutImg.png"
                            alt="Students learning at Glitec"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}