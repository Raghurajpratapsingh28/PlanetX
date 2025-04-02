import { Header } from "./_components/header";
import { LandingPage } from "./_components/landingPage";
import { Navbar } from "./_components/navbar";
import { ExploreProperty } from "./_components/explorePropertyPage";
import { PropertyGuide } from "./_components/propertyGuide";
import { PropertyUpload } from "./_components/propertyUpload";
import { FAQSection } from "./_components/faq";
import { AppDownloadSection } from "./_components/appDownload";
import { Testimonials } from "./_components/testimonial";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <LandingPage />
      <ExploreProperty />
      <PropertyGuide />
      <PropertyUpload />
      <FAQSection />
      <AppDownloadSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
