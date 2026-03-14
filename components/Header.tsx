import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
      <div className="md:flex-1 flex items-center gap-4 sm:gap-6">
        <Link href='/' className="flex items-center gap-2 group">
          <Image
            src="/assets/icons/logo-icon.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <p className="hidden md:block text-2xl font-bold text-white tracking-widest">
            EASES
          </p>
        </Link>
        <Link href='/tasks' className="text-blue-100 hover:text-white hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base">
          Tasks
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Header