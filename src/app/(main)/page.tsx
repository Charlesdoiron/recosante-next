import { CallToAction } from '@/components/CallToAction';
import { Faqs } from '@/components/Faqs';
import { Hero } from '@/components/hero';
import { Pricing } from '@/components/Pricing';
import { PrimaryFeatures } from '@/components/primary-features';
import { Reviews } from '@/components/Reviews';
import { SecondaryFeatures } from '@/components/SecondaryFeatures';
import { Notification } from '@/components/notifications';
import { Incentive } from '@/components/incentive';

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <Notification />
      <CallToAction />
      <Incentive />
      <Reviews />
    </>
  );
}
