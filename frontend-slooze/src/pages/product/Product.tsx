import React from 'react'
import { Button } from '../../components/ui/button'

const Product = () => {
  return (
    <div>
      <div className="page-title-box flex justify-between">
        <p className="page-title">Product</p>
        <Button>Add Product</Button>
      </div>
    </div>
  )
}

export default Product