import clsx from 'clsx';

import '@/styles/tailwind.css';
import { type Metadata } from 'next';
import { marianneFont } from '@/assets/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s - Recosanté',
    default: 'Reconsanté - Invest at the perfect time.',
  },
  description:
    'By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='fr'
      className={clsx('h-full bg-gray-50 antialiased', marianneFont.variable)}
    >
      <body className='flex h-full flex-col font-app font-medium'>
        <div className='flex min-h-full flex-col'>{children}</div>
      </body>
    </html>
  );
}
