export default function ApplyDetails() {
    return (
        <section className="max-w-4xl mx-auto bg-gray-50 p-6 sm:p-8 rounded-lg text-gray-800 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-3">Apply for Admission</h1>
                <p>
                    Please fill out the form below if you are ready to begin your online
                    Admissions Application. The application takes about 10 minutes to
                    complete.
                </p>
            </div>

            <div>
                <p>
                    If you have questions or wish to speak with an Admissions
                    Representative prior to completing your application, please call us at{" "}
                    <a
                        href="tel:+2348167375717"
                        className="text-blue-600 underline"
                    >
                        +234 707 811 6598
                    </a>{" "}
                    or email us at{" "}
                    <a
                        href="mailto:admission@glitecast.com"
                        className="text-blue-600 underline"
                    >
                        admission@glitecast.com
                    </a>
                    .
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-3">
                    Upcoming Term Dates & Enrollment Deadlines
                </h2>

                <ul className="space-y-4">
                    <li>
                        <p className="font-semibold">Winter (January – April)</p>
                        <p>Start Date: January 12</p>
                        <p>Enrollment Deadline: December 30</p>
                    </li>

                    <li>
                        <p className="font-semibold">Spring (May – August)</p>
                        <p>Start Date: May 11</p>
                        <p>Enrollment Deadline: April 30</p>
                    </li>

                    <li>
                        <p className="font-semibold">Fall (September – December)</p>
                        <p>Start Date: September 7</p>
                        <p>Enrollment Deadline: August 31</p>
                    </li>
                    <li>
                        <p className="font-semibold">Boot Camp - 7 Weeks(June - August)</p>
                        <p>Start Date: June 2</p>
                        <p>Enrollment Deadline: May 30</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}