

import type { ColumnDef } from "@tanstack/react-table";
import type React from "react";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  product:{
    name:string;
    img:string;
  }
  view:string;
  pricing:string;
  revenue: string;
};

export const columns: ColumnDef<Payment>[] = [
  { id:"product",
    accessorKey: "product",
    header: "Product Name",
    cell: ({ row }) => {
      console.log("ee", row.original.product);
      const { product } = row.original;
      return (
        <div className="product-colomn flex gap-x-2 items-center">
          <Checkbox id="terms" />
          <img
            className="w-6 rounded-sm"
            src={product.img}
            alt={`${product.name}`}
          />
          <p>{product.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pricing",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pricing
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "manage",
    header: "Manage",
    cell: () => {
      return (
        <div className="manage-action">
          <Button onClick={() => alert(`Editing user `)}>edit</Button>
          <Button onClick={() => alert(`Editing user `)}>delete</Button>
        </div>
      );
    },
  },
];
