import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EditProductModal from "../editproductmodal/EditProductModal";
import { toast } from "sonner";
import { API_URLS } from "@/constant/api";
import axios from "axios";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export interface PDataType {
  productName: string;
  productCategory: string;
  productDescription: string;
  productKeyword: string[];
  productPrice: number;
  productDiscount: number;
  productDiscountCategory: string;
  productThumbnail: string;
  productPreview: string[];
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export function ProductDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [pData, setPData] = useState<PDataType>();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const token = sessionStorage.getItem("token");
  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await axios.delete(
        API_URLS.PRODUCTS.DELETE.replace(":id", productId),
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Product Deleted Succesfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    defaultColumn: {
      size: 150, // Default width for all columns
      minSize: 50,
      maxSize: 500,
    },
    meta: {
      isOpenModal,
      setIsOpenModal,
      pData,
      setPData,
      handleDeleteProduct,
    },
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center p-4 ">
        <Input
          placeholder="Filter products"
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("productName")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pData && (
        <EditProductModal
          prodData={pData}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      )}
      <div className="flex items-center justify-end space-x-2 p-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
