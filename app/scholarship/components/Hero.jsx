import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full mt-16 mb-16">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl max-w-7xl mx-auto" style={{ height: '600px' }}>
        <Image
          src="/assets/graduationCap.jpg"
          alt="Flying Graduation Cap"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6" style={{ height: '600px' }}>
        <div className="flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Scholarship Opportunities
          </h1>
          <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
            Empowering your future with world-class education
          </p>
        </div>
      </div>
    </section>
  )
}