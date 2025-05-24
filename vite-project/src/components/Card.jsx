import React from 'react'

const Card = ({ children, background='bg-gray-100' }) => {
  return (
    <div className={`w-[600px] h-[200px] container ${background} rounded-md p-4 shadow-md flex flex-col gap-4 relative`}>
        {children}
    </div>
  )
}

export default Card