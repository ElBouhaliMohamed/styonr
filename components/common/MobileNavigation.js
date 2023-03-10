import { useState } from 'react';
import Link from 'next/link'

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


export default function MobileNavigation() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className='absolute bottom-0 h-32 w-full bg-black text-white z-50'>
        MENU
      </div>
      <div
        className="hidden absolute top-0 inset-x-0 z-50 overflow-hidden w-full"
        style={{
          // Prevent gap being shown at bottom of mobile menu
          top: '1em'
        }}
      >
        <div
          className="fixed inset-0"
          onClick={() => toggleMobileMenu()}
        />
        <div
          className="fixed inset-x-0 bg-white border-b flex flex-col gap-4 py-2"
          style={{
            // Prevent mobile menu items (e.g. Home) being hidden behind navbar on small screen heights (e.g. iPhone4 landscape of 320px height)
            top: '4em'
          }}
        >
          <button
            className="bg-transparent pr-6 flex justify-end"
            onClick={() => toggleMobileMenu()}
          >
            <img src="/icon/cross.svg" title="Close menu" alt="Close menu" />
          </button>
          {menuLinks.map((item, i) => (
            <Link className="
          block font-bold text-3xl text-center py-1
          text-secondary-500 hover:bg-primary-400
            hover:text-secondary-600
          " key={i} href={item.link}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}