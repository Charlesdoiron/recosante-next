import { CallToAction } from '@/components/CallToAction';
import { Hero } from '@/components/hero';
import { PrimaryFeatures } from '@/components/primary-features';
import { Reviews } from '@/components/Reviews';
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
