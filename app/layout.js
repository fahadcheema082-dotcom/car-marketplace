import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'CarYard — Premium UK Car Marketplace',
  description: 'Buy and sell cars directly — no fees, no middlemen. A premium marketplace built for UK buyers and sellers.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}