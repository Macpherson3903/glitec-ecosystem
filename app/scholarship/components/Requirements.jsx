"use client";

import { motion } from "framer-motion";

export default function Requirements() {
    const requirements = [
        "A completed application Form",
        "Photocopy of Government Issued ID Card",
        "Resume",
        "Commitment Letter",
        "Short essay on the course of interest (250-300 words)",
        "Letter of Guarantor 1",
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <motion.h2
                className="text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Requirements for Scholarship
            </motion.h2>

            <motion.div
                className="overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <table className="w-full table-auto border-collapse shadow-md">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-4 text-left">#</th>
                            <th className="p-4 text-left">Requirement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requirements.map((req, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                                <td className="p-4 font-medium">{index + 1}</td>
                                <td className="p-4">{req}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <motion.div
                className="mt-8 text-gray-700 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <p>
                    To be considered for the upcoming course, your complete scholarship
                    application must be received at least <strong>two months</strong> prior
                    to the course start date. Applications submitted after this deadline
                    will automatically be considered for the next available session.
                </p>
                <p>
                    Our Scholarship Committee looks forward to reviewing your
                    application. For questions about the scholarship or the application
                    process, feel free to contact us:
                </p>
                <p>
                    <strong>Call:</strong>{" "}
                    <a
                        href="tel:+2347078116598"
                        className="text-blue-600 hover:underline"
                    >
                       +234 707 811 6598
                    </a>
                    <br />
                    <strong>Email:</strong>{" "}
                    <a
                        href="mailto:admission@glitecast.com"
                        className="text-blue-600 hover:underline"
                    >
                        admission@glitecast.com
                    </a>
                </p>
            </motion.div>
        </section>
    );
}