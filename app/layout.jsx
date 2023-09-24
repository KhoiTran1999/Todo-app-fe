import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './GlobalRedux/provider';
import { MainWrapper } from '@/components/MainWrapper/MainWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fast Note - Free your mind',
  description: 'Free your mind',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <body className={inter.className}>
        <Providers>
          <MainWrapper>{children}</MainWrapper>
        </Providers>
      </body>
    </html>
  );
}
