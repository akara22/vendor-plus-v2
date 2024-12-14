import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Link href="/" className="text-2xl font-bold">Vendor+</Link>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/help">Help</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="space-x-2">
        <Button asChild variant="outline"><Link href="/login">Log In</Link></Button>
        <Button asChild><Link href="/signup">Sign Up</Link></Button>
      </div>
    </header>
  )
}

