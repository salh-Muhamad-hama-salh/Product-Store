"use client";

import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AddformSchema } from "@/components/add-form";
import { AddNewProduct } from "../_action";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Page() {
  const form = useForm<z.infer<typeof AddformSchema>>({
    resolver: zodResolver(AddformSchema),
    defaultValues: {
      name: "",
      price: "",
      imageURL: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AddformSchema>) {
    const result = await AddNewProduct(values);

    if (result?.success) {
      toast.success(`${result.data.name} added successfully!`);
      form.reset();
    } else {
      toast.error("Failed to add product.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen max-w-xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-12 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Product name"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Product price"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Image URL" className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12">
            Add Product
          </Button>
        </form>
      </Form>
    </div>
  );
}
