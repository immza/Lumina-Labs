import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true //createdAt, updatedAt
});

const Product = mongoose.model("Product", productSchema);
//create a model or a collection called Product and this is the Schema that you should take a look at
//mongoose will change it to "products"
export default Product;