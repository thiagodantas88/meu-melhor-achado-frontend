type LogoProps = {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-10 w-[78px]',
  md: 'h-14 w-[109px]',
  lg: 'h-24 w-[187px]',
}

export default function Logo({ size = 'md' }: LogoProps) {
  return (
    <picture className={`block shrink-0 ${sizeClasses[size]}`}>
      <source srcSet="/brand/meu-melhor-achado-logo-horizontal-transparente.webp" type="image/webp" />
      <img
        src="/brand/meu-melhor-achado-logo-horizontal-transparente.png"
        alt="Meu Melhor Achado"
        className="h-full w-full object-contain"
      />
    </picture>
  )
}
