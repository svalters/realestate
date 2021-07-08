import React from "react"
import Link from "next/link"

const Nav = () => {
  return (
    <nav className='flex flex-wrap p-6'>
      <h1 className='pr-6 flex-grow !mb-0'>
        <Link href='/'>
          <a className='!no-underline'>Real Estate STATS</a>
        </Link>
      </h1>
      <div className='flex items-end pt-2'>
        <Link href='/'>
          <a className='mr-4'>Trend</a>
        </Link>
        <Link href='/prices'>
          <a className='mr-4'>Prices</a>
        </Link>
        <Link href='/properties'>
          <a>Properties</a>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
