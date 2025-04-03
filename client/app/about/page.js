import { Navbar } from "../(home)/_components/navbar"
import { AboutHeader } from "./_components/header"
import { WelcomeSection } from "./_components/welcome"
import { ProcessSection } from "./_components/process"
import { WhyChooseUs } from "./_components/choose"
import { AppDownloadSection } from "../(home)/_components/appDownload"
import { Footer } from "../(home)/_components/footer"
import { Testimonials } from "../(home)/_components/testimonial"

export default function About() {
  return (
    <>
      <AboutHeader />
      <WelcomeSection />
      <ProcessSection />
      <WhyChooseUs />
      <AppDownloadSection />
      <Testimonials/>
      <Footer />
    </>
  )
}
