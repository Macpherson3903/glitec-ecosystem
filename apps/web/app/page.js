import EventBanner from "@/components/EventBanner"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FlexSection from "@/components/FlexSection"
import WhoWe from "@/components/WhoWe"
import CourseSection from "@/components/CourseSection"
import CallToAction from "@/components/CallToAction"
import Footer from "@/components/Footer"
import WhatsAppFloating from "@/components/WhatsAppFloating"




export default function Home() {
  return (
    <>
    <EventBanner />
    <Header />
    <Hero />
    <FlexSection />
    <WhoWe />
    <CourseSection />
    <CallToAction />
    <Footer />
    <WhatsAppFloating />
    </>
  )
}