import Link from 'next/link'
import { useRouter } from 'next/router';

const menuLinks = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Shop',
    link: '/products/all'
  },
  {
    name: 'Vision',
    link: '/about'
  },
  {
    name: 'Produktion',
    link: '/about'
  },
  {
    name: 'Kontakt',
    link: '/about'
  }
];


export default function Navigation() {
  const router = useRouter();

  return (<nav className="flex flex-row flex-wrap items-center justify-start gap-2 max-w-sm" aria-label="Sidebar">
    {menuLinks.map((value, index) => {
      return <Link
        passHref href={value.link} key={index} className={router.pathname == value.link
          ? 'flex items-center px-3 py-2 text-xs md:text-md lg:text-lg font-medium rounded-md bg-gray-100 text-gray-900'
          : 'flex items-center px-3 py-2 text-xs md:text-md lg:text-lg font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
      >
        {value.name}
      </Link>
    })}
  </nav>)
}