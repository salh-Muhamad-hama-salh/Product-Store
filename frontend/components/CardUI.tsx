"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductApi, GetAllProducts } from "@/app/my-store/_action";
import Link from "next/link";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

export interface CardUIProps {
  _id?: string;
  name?: string;
  price?: number;
  imageURL?: string[];
}

function CardUI() {
  const queryClient = useQueryClient();

  /* ===============================
     GET ALL PRODUCTS
  ================================ */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: GetAllProducts,
  });

  const products: CardUIProps[] = data?.data ?? [];

  /* ===============================
     DELETE PRODUCT
  ================================ */
  const deleteMutation = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  /* ===============================
     STATES
  ================================ */
  if (isLoading) {
    return <p className="text-center mt-20">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-20 text-red-500">Error loading products</p>
    );
  }

  /* ===============================
     UI
  ================================ */
  return (
    <div className="max-w-7xl mx-auto my-24 p-4">
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products available. Please add some products.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden shadow-lg">
              <CardHeader>
                {product.imageURL?.length ? (
                  <Image
                    src={product.imageURL[0]}
                    alt={product.name || "Product Image"}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                ) : null}
                <CardTitle className="mt-4 text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <p className="text-xl font-semibold">$ {product.price ?? 0}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(product._id!)}
                  >
                    <Trash size={18} />
                  </Button>
                  <Button variant="outline">
                    <Link href={`/my-store/${product._id}`}>Edit Product</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardUI;
