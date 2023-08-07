const express=require('express')

const ProductsRouter=require('./router/product.router.js')
const CartRouter=require('./router/carts.router.js')



const app=express()
const PORT=8040

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products",ProductsRouter)
app.use("/api/cart",CartRouter)



app.listen(PORT,()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})