const fs = require('fs').promises



class ProductMng {
    constructor() {
        this.path = './src/models/products.json'
    }

    creationId = async () => {
        try {


            let productRandomNumber = Math.floor(Math.random() * 100) + 1
            let productRanString = productRandomNumber.toString()
            return productRanString

        } catch {
            throw new Error("Error,Id no generado")
        }
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) => {

        await fs.writeFile(this.path, JSON.stringify(product))

    }

    addedProducts = async (product) => {
        let productsDesact = await this.readProducts();
        product.id = await this.creationId(product);
        let productsAdd = [...productsDesact, product];

        try {
            await this.writeProducts(productsAdd);
        } catch {
            throw new Error("El producto no pudo ser añadido");
        }
        return "Producto agregado de manera exitosa";
    }

    getProducts = async () => {

        try {
            return await this.readProducts()
        } catch {
            throw new Error("No se pudieron obtener los productos")
        }

    }

    existProduct = async (id) => {
        let products = await this.readProducts()
        return products.find((prod) => prod.id === id)

    }



    getProductsById = async (id) => {
        let productsId = await this.existProduct(id);

        if (!productsId) return "Product Not Found"
        return productsId;
    }

    updateProduct = async (id, product) => {

        let productsId = await this.existProduct(id)
        if (!productsId) return "Producto no encontrado para actualizar"
        await this.deleteById(id)
        let productsDesact = await this.readProducts();
        let productUpdate = [{ ...product, id: id},...productsDesact]
        await this.writeProducts(productUpdate)

        return "El producto fue actualizado"

    }

    deleteById = async (id) => {

        let products = await this.readProducts()
        let productSome = products.some((prod) => prod.id === id)
        if (productSome) {

            let productsFilter = products.filter((prod => prod.id != id))
            await this.writeProducts(productsFilter)
            return "El producto fue eliminado"
        } else {
            return "El id proporcionado no existe"
        }


    }
}

module.exports = ProductMng
