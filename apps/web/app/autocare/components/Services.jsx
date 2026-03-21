"use client";

import { autocareServices } from "@/data/autocareServices";
import Link from "next/link";
import { Calendar, Settings } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
    return (
        <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our AutoCare Services</h2>
                <p className="text-gray-600">
                    Explore our comprehensive car maintenance services to keep your vehicle running smoothly.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {autocareServices.map((service) => (
                    <motion.div
                        key={service.id}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl flex flex-col justify-between group"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-700 line-clamp-4">{service.description}</p>
                        </div>

                        <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={`/autocare/services/${service.slug}`}
                                    className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                                >
                                    View details <Settings size={16} />
                                </Link>
                                <Link
                                    href={`/autocare/book?service=${service.slug}`}
                                    className="text-slate-700 font-medium hover:text-blue-600 flex items-center gap-1"
                                >
                                    <Calendar size={16} />
                                    Book
                                </Link>
                            </div>

                            {/* Icon spins continuously while the card is hovered */}
                            <motion.div
                                className="text-gray-300"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 1,
                                    ease: "linear",
                                }}
                                whileHover={{ rotate: [0, 360] }}
                            >
                                <Settings size={24} />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}