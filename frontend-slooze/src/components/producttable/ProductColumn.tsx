import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, LucideTrash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType } from "@/pages/product/AddProduct";
import { LiaEditSolid } from "react-icons/lia";
import EditProductModal from "../editproductmodal/EditProductModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TData = {
  productName: string;
  productCategory: string;
  productDescription: string;
  productKeyword: string[];
  productPrice: number;
  productDiscount: number;
  productDiscountCategory: string;
  productThumbnail: string;
  productPreview: string[];
  user: string | undefined;
};

type MetaData = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPData: TData & {
    createdAt: string;
    __v: number;
    uploadedAt: string;
    _id: string;
  };
};

export const columns: ColumnDef<TData>[] = [
  {
    id: "productName",
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      const { productName, productThumbnail } = row.original;
      return (
        <div className="product-colomn flex gap-x-2 items-center">
          <Checkbox id="terms" />
          <img
            className="w-6 rounded-sm"
            src={productThumbnail}
            alt={`${productName}`}
          />
          <p>{productName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "productPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "productCategory",
    accessorKey: "productCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        row.original.productCategory.charAt(0).toUpperCase() +
        row.original.productCategory.slice(1)
      );
    },
  },
  {
    accessorKey: "productDiscount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "productDiscountCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { productDiscountCategory } = row.original;
      const discountCat = productDiscountCategory.replace("_", " ");
      return discountCat.charAt(0).toUpperCase() + discountCat.slice(1);
    },
  },
  {
    accessorKey: "manage",
    header: "Manage",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const { setIsOpenModal, setPData } = meta as MetaData;
      const handleEdit = () => {
        setIsOpenModal(true);
        setPData(row.original);
      };

      return (
        <div className="manage-action space-x-4 flex items-center">
          <Button onClick={handleEdit} role={"danger"}>
            <LiaEditSolid size={16} />
          </Button>
          <Button onClick={() => alert(`Deleting user `)}>
            <LucideTrash2 size={16} />
          </Button>
        </div>
      );
    },
  },
];
