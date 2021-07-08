import React, { HTMLAttributes, HTMLProps } from "react"

const Select: React.FC<
  HTMLAttributes<HTMLSelectElement> & HTMLProps<HTMLSelectElement>
> = ({ children, ...rest }) => (
  <div className='w-full mx-6 my-1 sm:w-auto sm:ml-0 sm:mr-6'>
    <select className='w-full text-gray-500 rounded' {...rest}>
      {children}
    </select>
  </div>
)

export default Select
