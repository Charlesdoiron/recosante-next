'use client';

import { Fragment, useEffect, useId, useRef, useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import {
  AnimatePresence,
  type MotionProps,
  type Variant,
  type Variants,
  motion,
} from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';

import { AppScreen } from '@/components/AppScreen';
import { CircleBackground } from '@/components/CircleBackground';
import { Container } from '@/components/Container';
import { PhoneFrame } from '@/components/PhoneFrame';
import {
  DiageoLogo,
  LaravelLogo,
  MirageLogo,
  ReversableLogo,
  StatamicLogo,
  StaticKitLogo,
  TransistorLogo,
  TupleLogo,
} from '@/components/StockLogos';
import { UvLogo } from '@/images/logos/uv';
import { WaterLogo } from '@/images/logos/water';
import { WeatherLogo } from '@/images/logos/weather';
import { PollenLogo } from '@/images/logos/pollen';
import { AirLogo } from '@/images/logos/air';

const MotionAppScreenHeader = motion(AppScreen.Header);
const MotionAppScreenBody = motion(AppScreen.Body);

interface CustomAnimationProps {
  isForwards: boolean;
  changeCount: number;
}

const features = [
  {
    name: "Risque d'allergie aux pollens",
    description:
      'En connaissant le niveau de pollen dans votre environnement, vous pouvez anticiper les périodes à risque et prendre les mesures nécessaires pour éviter les allergies saisonnières.',
    icon: PollenLogo,
    screen: InviteScreen,
  },
  {
    name: "Qualité de l'air",
    description:
      'Cet indicateur vous informe sur la pollution atmosphérique dans votre région, vous aidant ainsi à prendre des précautions pour protéger votre santé respiratoire.',
    icon: AirLogo,
    screen: StocksScreen,
  },
  {
    name: 'Indice UV',
    description:
      'Cet indicateur vous informe sur la pollution atmosphérique dans votre région, vous aidant ainsi à prendre des précautions pour protéger votre santé respiratoire.',
    icon: UvLogo,
    screen: InvestScreen,
  },
  {
    name: 'Vigilance météorologique',
    description:
      'En étant informé des conditions météorologiques prévues, vous pouvez planifier vos activités en conséquence et vous prémunir contre les intempéries et les conditions climatiques extrêmes.',
    icon: WeatherLogo,
    screen: InvestScreen,
  },
  {
    name: 'Qualité des eaux de baignade',
    description:
      'Qualité microbiologique des eaux de baignade dans les zones de baignade désignées, vous permettant de prendre des décisions éclairées concernant la sécurité de la baignade et votre santé lors de vos activités aquatiques.',
    icon: WaterLogo,
    screen: InvestScreen,
  },
];

const headerAnimation: Variants = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const maxZIndex = 2147483647;

const bodyVariantBackwards: Variant = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
};

const bodyVariantForwards: Variant = (custom: CustomAnimationProps) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
});

const bodyAnimation: MotionProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom: CustomAnimationProps) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
  },
};

type ScreenProps =
  | {
      animated: true;
      custom: CustomAnimationProps;
    }
  | { animated?: false };

function InviteScreen(props: ScreenProps) {
  return (
    <AppScreen className='w-full'>
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Invite people</AppScreen.Title>
        <AppScreen.Subtitle>
          Get tips <span className='text-white'>5s sooner</span> for every
          invite.
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className='px-4 py-6'>
          <div className='space-y-6'>
            {[
              { label: 'Full name', value: 'Albert H. Wiggin' },
              { label: 'Email address', value: 'awiggin@chase.com' },
            ].map((field) => (
              <div key={field.label}>
                <div className='text-sm text-gray-500'>{field.label}</div>
                <div className='mt-2 border-b border-gray-200 pb-2 text-sm text-gray-900'>
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white'>
            Invite person
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  );
}

function StocksScreen(props: ScreenProps) {
  return (
    <AppScreen className='w-full'>
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Stocks</AppScreen.Title>
        <AppScreen.Subtitle>March 9, 2022</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className='divide-y divide-gray-100'>
          {[
            {
              name: 'Laravel',
              price: '4,098.01',
              change: '+4.98%',
              color: '#F9322C',
              logo: LaravelLogo,
            },
            {
              name: 'Tuple',
              price: '5,451.10',
              change: '-3.38%',
              color: '#5A67D8',
              logo: TupleLogo,
            },
            {
              name: 'Transistor',
              price: '4,098.41',
              change: '+6.25%',
              color: '#2A5B94',
              logo: TransistorLogo,
            },
            {
              name: 'Diageo',
              price: '250.65',
              change: '+1.25%',
              color: '#3320A7',
              logo: DiageoLogo,
            },
            {
              name: 'StaticKit',
              price: '250.65',
              change: '-3.38%',
              color: '#2A3034',
              logo: StaticKitLogo,
            },
            {
              name: 'Statamic',
              price: '5,040.85',
              change: '-3.11%',
              color: '#0EA5E9',
              logo: StatamicLogo,
            },
            {
              name: 'Mirage',
              price: '140.44',
              change: '+9.09%',
              color: '#16A34A',
              logo: MirageLogo,
            },
            {
              name: 'Reversable',
              price: '550.60',
              change: '-1.25%',
              color: '#8D8D8D',
              logo: ReversableLogo,
            },
          ].map((stock) => (
            <div key={stock.name} className='flex items-center gap-4 px-4 py-3'>
              <div
                className='flex-none rounded-full'
                style={{ backgroundColor: stock.color }}
              >
                <stock.logo className='h-10 w-10' />
              </div>
              <div className='flex-auto text-sm text-gray-900'>
                {stock.name}
              </div>
              <div className='flex-none text-right'>
                <div className='text-sm font-medium text-gray-900'>
                  {stock.price}
                </div>
                <div
                  className={clsx(
                    'text-xs leading-5',
                    stock.change.startsWith('+')
                      ? 'text-cyan-500'
                      : 'text-gray-500',
                  )}
                >
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  );
}

function InvestScreen(props: ScreenProps) {
  return (
    <AppScreen className='w-full'>
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Buy $LA</AppScreen.Title>
        <AppScreen.Subtitle>
          <span className='text-white'>$34.28</span> per share
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className='px-4 py-6'>
          <div className='space-y-4'>
            {[
              { label: 'Number of shares', value: '100' },
              {
                label: 'Current market price',
                value: (
                  <div className='flex'>
                    $34.28
                    <svg viewBox='0 0 24 24' fill='none' className='h-6 w-6'>
                      <path
                        d='M17 15V7H9M17 7 7 17'
                        stroke='#06B6D4'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                ),
              },
              { label: 'Estimated cost', value: '$3,428.00' },
            ].map((item) => (
              <div
                key={item.label}
                className='flex justify-between border-b border-gray-100 pb-4'
              >
                <div className='text-sm text-gray-500'>{item.label}</div>
                <div className='text-sm font-semibold text-gray-900'>
                  {item.value}
                </div>
              </div>
            ))}
            <div className='rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white'>
              Buy shares
            </div>
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  );
}

function usePrevious<T>(value: T) {
  let ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0);
  let [selectedIndex, setSelectedIndex] = useState(0);
  let prevIndex = usePrevious(selectedIndex);
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex;

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex);
      setChangeCount((changeCount) => changeCount + 1);
    },
    100,
    { leading: true },
  );

  return (
    <Tab.Group
      as='div'
      className='grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24'
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className='relative z-10 order-last col-span-6 space-y-8'>
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className='relative rounded-2xl transition-colors hover:bg-gray-800/30'
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId='activeBackground'
                className='absolute inset-0 bg-[#263394]'
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className='relative z-10 px-8 py-4'>
              <div className=' flex items-center space-x-4'>
                <feature.icon />
                <h3 className='text-lg font-semibold text-white'>
                  <Tab className='text-left ui-not-focus-visible:outline-none'>
                    <span className='absolute inset-0 rounded-2xl' />
                    {feature.name}
                  </Tab>
                </h3>
              </div>
              {featureIndex === selectedIndex && (
                <p className='mt-2 text-sm text-gray-400'>
                  {feature.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </Tab.List>
      <div className='relative col-span-6'>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <CircleBackground color='#13B5C8' className='animate-spin-slower' />
        </div>
        <PhoneFrame className='z-10 mx-auto w-full max-w-[366px]'>
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className='col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none'
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null,
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  );
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0);
  let slideContainerRef = useRef<React.ElementRef<'div'>>(null);
  let slideRefs = useRef<Array<React.ElementRef<'div'>>>([]);

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target));
            break;
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    );

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [slideContainerRef, slideRefs]);

  return (
    <>
      <div
        ref={slideContainerRef}
        className='-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden'
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
            className='w-full flex-none snap-center px-4 sm:px-6'
          >
            <div className='relative transform overflow-hidden rounded-2xl bg-[#263394] px-5 py-6'>
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <CircleBackground
                  color='#13B5C8'
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className='relative mx-auto w-full max-w-[366px]'>
                <feature.screen />
              </PhoneFrame>
              <div className='absolute inset-x-0 bottom-0 bg-[#263394] p-6 backdrop-blur sm:p-10'>
                <feature.icon className='h-8 w-8' />
                <h3 className='mt-6 text-sm font-semibold text-white sm:text-lg'>
                  {feature.name}
                </h3>
                <p className='mt-2 text-sm text-gray-400'>
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 flex justify-center gap-3'>
        {features.map((_, featureIndex) => (
          <button
            type='button'
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              });
            }}
          >
            <span className='absolute -inset-x-1.5 -inset-y-3' />
          </button>
        ))}
      </div>
    </>
  );
}

export function PrimaryFeatures() {
  return (
    <section
      id='features'
      aria-label='Features for investing all your money'
      className='bg-app-primary py-20 sm:py-32'
    >
      <Container>
        <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl'>
          <h2 className='text-4xl font-medium tracking-tight text-white font-marianneBold'>
            Un suivi personnalisé.
          </h2>
          <p className='mt-2 text-lg text-gray-200'>
            Adaptée à vos besoins et à votre localisation, l’application va vous
            fournir des recommandations personnalisées en fonction de votre
            profil et de vos besoins.
          </p>
        </div>
      </Container>
      <div className='mt-16 md:hidden'>
        <FeaturesMobile />
      </div>
      <Container className='hidden md:mt-20 md:block'>
        <FeaturesDesktop />
      </Container>
    </section>
  );
}
