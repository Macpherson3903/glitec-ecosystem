import AutocareHeader from "@/components/AutocareHeader"
import Hero from "./components/Hero"
import Services from "./components/Services"
import CallToAction from "./components/CallToAction"
import Footer from "@/components/Footer"
import WhatsAppFloating from "@/components/WhatsAppFloating"


export default function AutoCare() {
    return (
        <>
        <AutocareHeader />
        <Hero />
        <Services />
        <CallToAction />
        <Footer />
        <WhatsAppFloating />
        </>
    )
}