import Image from "next/image"

export default function Mission() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-100 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-md group">
            <Image
              src="/assets/mission.jpeg"
              alt="Group picture of Glitec students and staff"
              fill
              priority
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900">
            Our Mission
          </h3>

          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            At Glitec, we are dedicated to empowering individuals with the
            technical skills, innovative mindset, and professional expertise
            needed to excel in today’s dynamic workforce. Through hands-on
            training, state-of-the-art facilities, and industry-aligned
            curricula, we prepare students for rewarding careers, promote
            lifelong learning, and provide students the freedom to learn from
            the convenience of their home.
          </p>
        </div>

      </div>
    </section>
  )
}