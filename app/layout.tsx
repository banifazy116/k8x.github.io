import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://k8x.io'),
  title: 'K8X — пул для стабильного и выгодного майнинга',
  description: 'Больше принятого хешрейта — больше учтённого дохода. Без обрывов соединения и скрытых потерь.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'K8X',
    title: 'K8X — пул для стабильного и выгодного майнинга',
    description: 'Без обрывов соединения и скрытых потерь.',
    images: [{ url: '/og.png', width: 1731, height: 907, alt: 'K8X — пул для стабильного и выгодного майнинга' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K8X — пул для стабильного и выгодного майнинга',
    description: 'Без обрывов соединения и скрытых потерь.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
