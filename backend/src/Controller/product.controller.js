import { ProductStore } from "../Model/productstore.model.js";

export async function GetAllProducts(_, res) {
  try {
    const response = await ProductStore.find();
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function GetProductById(req, res) {
  try {
    const { id } = req.params;
    const detailProduct = await ProductStore.findById(id);
    if (!detailProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: detailProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function CreateProduct(req, res) {
  try {
    const { name, price, imageURL } = new ProductStore(req.body);

    const newProduct = new ProductStore({
      name,
      price,
      imageURL,
    });

    if (!name || !price || !imageURL) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const saveProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function UpdateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, imageURL } = req.body;
    const updateProduct = await ProductStore.findByIdAndUpdate(
      id,
      {
        name,
        price,
        imageURL,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (!name || !price || !imageURL) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const saveProduct = await updateProduct.save();
    res.status(200).json({
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function DeleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deleteProduct = await ProductStore.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
