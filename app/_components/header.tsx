'use client'
import {
  ChefHatIcon,
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export default function Header() {
  const { data } = useSession()

  const HandleSignIn = () => {
    signIn()
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[500px] ">
        <Link href="/">
          <div className="flex items-center gap-2  text-xs font-semibold text-primary">
            <TypeAnimation
              speed={50}
              sequence={[
                'Best', // Types 'One'
                2000, // Waits 1s
                'Best Food', // Deletes 'One' and types 'Two'
                2000, // Waits 2s
                'Best',
                1000, // Waits 2s
                'Best Delivery',
                2000, // Waits 2s

                () => {
                  console.log('Sequence completed')
                },
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: '2em', display: 'inline-block' }}
            />
            <ChefHatIcon className="hover:fill-primary" />
          </div>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex items-center pt-6">
            {data?.user ? (
              <div className="flex w-full justify-between">
                <div className="item-center flex gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user?.image || ''} />
                    <AvatarFallback className="uppercase">
                      {data?.user?.name?.split(' ')[0][0]}
                      {data?.user?.name?.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <h2 className="font-semibold">Faça seu login</h2>
                <Button onClick={HandleSignIn} size={'icon'}>
                  <LogInIcon />
                </Button>
              </div>
            )}
          </div>

          {data?.user && (
            <>
              <div className="py-6">
                <Separator />
              </div>
              <div className="space-y-2">
                <Button
                  variant={'ghost'}
                  className="w-full justify-start space-x-3 rounded-full text-left text-sm font-normal"
                >
                  <HomeIcon size={16} />
                  <span className="block">Início</span>
                </Button>
                <Button
                  variant={'ghost'}
                  className="w-full justify-start space-x-3 rounded-full text-left text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={'ghost'}
                  className="w-full justify-start space-x-3 rounded-full text-left text-sm font-normal"
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes favoritos</span>
                  </Link>
                </Button>
              </div>
              <div className="py-6">
                <Separator />
              </div>
            </>
          )}

          {data?.user && (
            <Button
              onClick={handleSignOut}
              variant={'ghost'}
              className="flex w-full justify-start gap-4 rounded-full text-left text-sm font-normal"
            >
              <LogOutIcon size={16} />
              Sair da conta
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
