import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="logo" width={100} height={30} />
      <Button
        variant="outline"
        size="icon"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  )
}
