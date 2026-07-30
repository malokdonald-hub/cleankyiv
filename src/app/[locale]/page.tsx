import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Advantages } from '@/components/sections/Advantages';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Calculator } from '@/components/sections/Calculator';
import { Reviews } from '@/components/sections/Reviews';
import { FAQ } from '@/components/sections/FAQ';
import { LeadForm } from '@/components/sections/LeadForm';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Advantages />
      <BeforeAfter />
      <Calculator />
      <Reviews />
      <FAQ />
      <LeadForm />
    </>
  );
}
