import Image from 'next/image'

const Loader = () => {
  <div className="loader flex-col gap-5">
    <Image
      src="/assets/icons/loader.svg"
      alt="loader"
      width={40}
      height={40}
      priority
      className="animate-spin opacity-80"
    />
    <div className="flex items-center gap-1 font-medium tracking-widest text-blue-100/80">
      <span className="animate-pulse">Loading</span>
      <span className="animate-pulse delay-75">.</span>
      <span className="animate-pulse delay-150">.</span>
      <span className="animate-pulse delay-300">.</span>
    </div>
  </div>
}

export default Loader