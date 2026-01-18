import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, LucideTrash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { LiaEditSolid } from "react-icons/lia";
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
  _id?: string | undefined;
};

type MetaData = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPData: React.Dispatch<React.SetStateAction<TData>>;
  handleDeleteProduct: (productId: string) => Promise<void>;
};

export const columns: ColumnDef<TData>[] = [
  {
    id: "productName",
    accessorKey: "productName",
    header: "Product Name",

    cell: ({ row }) => {
      const { productName, productThumbnail } = row.original;
      return (
        <div className="product-colomn flex flex-1 gap-x-2 items-center w-64">
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
      const { setIsOpenModal, setPData, handleDeleteProduct } =
        meta as MetaData;
      const productId = row?.original?._id;

      const handleEdit = () => {
        setIsOpenModal(true);
        setPData(row.original);
      };

      return (
        <div className="manage-action space-x-4 flex items-center">
          <Button onClick={handleEdit} role={"danger"}>
            <LiaEditSolid size={16} />
          </Button>
          {productId && (
            <Button
              onClick={async () => {
                await handleDeleteProduct(productId);
              }}
            >
              <LucideTrash2 size={16} />
            </Button>
          )}
        </div>
      );
    },
  },
];
