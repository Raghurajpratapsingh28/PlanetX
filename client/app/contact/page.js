import { Navbar } from "../(home)/_components/navbar"
import {ContactHeader} from "./_components/header.jsx"
import { AppDownloadSection } from "../(home)/_components/appDownload"
import { Footer } from "../(home)/_components/footer"
import { Testimonials } from "../(home)/_components/testimonial"
import { ContactForm } from "./_components/contact-form"
import { FAQSection } from "../(home)/_components/faq"

export default function Contact() {
  return (
    <>
      <ContactHeader />
      <ContactForm />
      <FAQSection />
      <AppDownloadSection />
      <Testimonials />
      <Footer />
    </>
  )
}
