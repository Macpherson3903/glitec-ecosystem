"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ApplicationDetails() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <motion.div
                    className="flex-1 grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src="/assets/graduationCap-2.jpg"
                        alt="Graduation Cap"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover w-full h-full"
                    />
                    <Image
                        src="/assets/persons.jpg"
                        alt="Students"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover w-full h-full"
                    />
                    <Image
                        src="/assets/female.jpg"
                        alt="Female Student"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover w-full h-full col-span-2"
                    />
                </motion.div>

                <motion.div
                    className="flex-1 space-y-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold">Rise Dawn Talents Scholarship Program</h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            <strong>Program Overview:</strong> The Rise Dawn Talents Scholarship is designed to support
                            individuals pursuing advanced career training and professional development.
                        </p>
                        <p>
                            <strong>Strategic Partnership:</strong> In partnership with Glitec Advanced School of
                            Technology, this scholarship empowers students with the technical skills, innovative
                            thinking, and professional expertise required to thrive in today’s competitive workforce.
                        </p>
                        <p>
                            <strong>Selection Process:</strong> Scholarship awards are determined on a case-by-case
                            basis by our scholarship selection committee, based on specific eligibility criteria.
                        </p>
                        <p>
                            <strong>Funding Structure:</strong> All funds are paid directly to the school and must be
                            applied toward approved programs through Glitec Advanced School of Technology.
                        </p>
                        <p>
                            <strong>Post-Program Opportunity:</strong> Upon successful completion of the program,
                            recipients may be considered for full-time employment with Rise Dawn Talents.
                        </p>
                        <p>
                            <strong>Employment Commitment:</strong> If hired, awardees are expected to commit to a
                            minimum of 24 months (2 years) of service with the organization.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}