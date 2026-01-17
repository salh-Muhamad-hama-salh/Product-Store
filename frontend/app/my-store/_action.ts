'use server';
import { EndPointApi } from '@/lib/EndPointApi';
import axios from 'axios';
import { redirect } from 'next/dist/client/components/navigation';

export async function GetAllProducts() {
    try {
        const response = await axios.get(EndPointApi.GetAllProducts);
        return response?.data || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function AddNewProduct(data: { name: string; price: string; imageURL?: string }) {
    try {
        const response = await axios.post(EndPointApi.CreateProduct, data);
        redirect('/my-store');
        return response?.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
}

export async function UpdateProduct(id: string, data: { name: string; price: string; imageURL?: string }) {
    try {
        const response = await axios.put(`${EndPointApi.UpdateProduct(id)}`, data);
        return response?.data;
    } catch (error) {
        console.error("Error updating product:", error);
    }
}


export async function deleteProductApi(id: string) {
    return axios.delete(EndPointApi.DeleteProduct(id));
}