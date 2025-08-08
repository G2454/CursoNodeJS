//import Product from '../models/Product.js'

class ProductController{
    static showProducts(req, res){
        res.render('products/all')
    }
}

export default ProductController