import { FaGraduationCap, FaCertificate } from "react-icons/fa"

export default function WhatWeOffer() {
    return (
        <section className="w-full px-6 py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* header */}
                <div className="text-center mb-14">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                        What We Offer
                    </h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Our programs are designed to equip learners with practical
                        technology skills, real-world experience, and industry-relevant
                        knowledge to thrive in today&apos;s digital world.
                    </p>
                </div>

                {/* cards */}
                <div className="grid gap-8 md:grid-cols-2">

                    <div className="bg-white rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="text-orange-500 text-4xl mb-5">
                            <FaGraduationCap />
                        </div>

                        <h4 className="text-xl font-semibold mb-3 text-gray-900">
                            Hands-on and Real-World Curriculum
                        </h4>

                        <p className="text-gray-600 leading-relaxed">
                            At Glitec Advanced School of Technology, courses are crafted by
                            experienced professionals who have worked directly in these
                            fields, providing students with real-world knowledge that can
                            immediately apply to their current jobs or everyday life.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 transition duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="text-orange-500 text-4xl mb-5">
                            <FaCertificate />
                        </div>

                        <h4 className="text-xl font-semibold mb-3 text-gray-900">
                            Diploma and Certificate
                        </h4>

                        <p className="text-gray-600 leading-relaxed">
                            Upon completing the program, you will receive a personalized
                            career diploma as recognition of your hard work and commitment to
                            advancing your education. The Glitec Advanced School of Technology
                            diploma affirms successful completion of a vocational training
                            program, though it does not award college credits.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    )
}