'use client'

import { usePathname } from 'next/navigation'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavFooter = pathname === '/preregister'

  return (
    <>
      {!hideNavFooter && <Nav />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
      <CookieBanner />
    </>
  )
}
