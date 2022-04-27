import '../styles/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import mm from '../public/mm.png';
function MyApp({ Component, pageProps }) {
  return(<div className='bg-pink-900'>
   

      <nav className='border-b bg-white'>
        
        <Image src={mm} width={100} height={80} />
        <marquee direction="right" className='flex justify-center font-mono text-2xl hover:italic text-orange-400'>
        Welcome to Ministry of magic
         </marquee>
        
        
        <div>
        <Link href="/">
          <a className='p-6 text-orange-700'>Home</a>
        </Link>
        <Link href="/candidate">
          <a className='p-6 text-orange-700'>Candidate</a>
        </Link>
        </div>
      </nav>
      
    
    <Component {...pageProps} />
  </div>)
   
}

export default MyApp