import React from 'react'
import Product from './Product'

class ProductContainer extends React.Component {


    render() {
        const itemId = this.props.match.params.id
        return (
            <Product itemId={itemId} />
        )
    }
}


export default ProductContainer