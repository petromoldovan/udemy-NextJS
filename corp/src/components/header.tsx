import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full text-white absolute z-10">
      <nav className="container relative flex flex-wrap justify-between mx-auto items-center p-8">
      <Link href="/" className="font-bond text-3xl">Home</Link>
      <div className="text-xl space-x-4">
        <Link href="/performance">performance</Link>
        <Link href="/reliability">reliability</Link>
        <Link href="/scale">scale</Link>
      </div>
      </nav>
    </div>
  )
}

export default Header;