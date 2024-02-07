'use client';

import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true' {...props}>
      <path
        d='M5 6h14M5 18h14M5 12h14'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden='true' {...props}>
      <path
        d='M17 14l-5-5-5 5'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <Popover.Button
      as={Link}
      className='block text-base leading-7 tracking-tight text-gray-700'
      {...props}
    />
  );
}

export function Header() {
  return (
    <header>
      <nav>
        <Container className='relative z-50 flex justify-between py-8'>
          <div className='relative z-10 flex items-center gap-16'>
            <Link href='/' aria-label='Home'>
              <Logo className='h-10 w-auto' />
            </Link>
          </div>
        </Container>
      </nav>
    </header>
  );
}
