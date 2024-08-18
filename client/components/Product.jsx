import React from 'react'

const Product = ({data , handleClick}) => {


  const {title , price, quantity, discountPercentage, thumbnail} = data;

  return (
    <div className='bg-[#ffffffd8] shadow-2xl  shadow-black rounded-lg overflow-hidden '>
      <img className=' bg-black  w-full rounded-b-lg' src={thumbnail} alt="image" />
        {/* Product detail */}
        <div className='flex gap-3 justify-between p-2'>
          {/* title and price */}
          <div className='flex flex-col justify-between'>
            <h1 className=' text-sm font-semibold'>{title}</h1>
            <p className='font-bold text-sm'>${price}</p>
          </div>
          {/* discount and quantity */}
          <div className='text-right flex flex-col justify-between'>
            <p className='text-green-600 font-bold'>{discountPercentage}%</p>
            <p className='font-semibold'>Qty : {quantity}</p>
            <p className='text-red-600 text-lg font-bold'>BUY
            </p>
            <button onClick={handleClick} className='bg-green-950 text-white rounded-md font-semibold p-1' >Remove</button>
          </div>
        </div>
    </div>
  )
}

export default Product