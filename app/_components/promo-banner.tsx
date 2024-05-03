import Image, { ImageProps } from 'next/image'

export default function PromoBanner(props: ImageProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      width={0}
      height={0}
      className="h-auto w-full object-contain"
      sizes="( max-width: 768px ) 100vw, 768px"
      quality={100}
      priority={true}
      {...props}
    />
  )
}
