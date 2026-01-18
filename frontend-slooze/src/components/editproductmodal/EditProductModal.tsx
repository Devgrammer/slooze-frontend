import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LiaEditSolid } from "react-icons/lia";
import ImageUploader from "../imageuploader/ImageUploader";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { ProductType } from "@/pages/product/AddProduct";
import { Save, Trash } from "lucide-react";
import productCategory from "../../data/productcategory.json";
import discountCategory from "../../data/discountcategory.json";
import { SelectItem } from "@radix-ui/react-select";
import { API_URLS } from "@/constant/api";

export type PDataType = {
  pData: ProductType & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProductModal = ({ pData, isOpen, setIsOpen }: PDataType) => {
  const { user } = useAuth();
  const token = sessionStorage.getItem("token");
  const isProcessingRef = useRef(false);

  const [formData, setFormData] = useState<ProductType>({
    productName: "",
    productCategory: "",
    productDescription: "",
    productKeyword: [],
    productPrice: 0,
    productDiscount: 0,
    productDiscountCategory: "",
    productThumbnail: "",
    productPreview: [],
    user: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, user: user?._id });
    toast.success("Hello World");
    const productId = pData._id;

    try {
      const { createdAt, updatedAt, _id, __v, ...productData } = formData;
      const response = await axios.put(
        API_URLS.PRODUCTS.UPDATE.replace(":id", productId),
        productData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Product Updated Succesfully");
        setIsOpen(false);
        window.location.reload();
        setFormData({
          productName: "",
          productCategory: "",
          productDescription: "",
          productKeyword: [],
          productPrice: 0,
          productDiscount: 0,
          productDiscountCategory: "",
          productThumbnail: "",
          productPreview: [],
          user: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(e.target.value) || 0 : e.target.value,
    });
  };
  const handleKeywordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const handleValueChange = (value: string, name: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setFormData({ ...formData, [name]: value });
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 100);
  };

  useEffect(() => {
    setFormData(pData);
  }, [pData]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="w-[400px] sm:w-[540px] overflow-y-auto max-h-screen"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
          <SheetDescription>Edit your profile data here</SheetDescription>
        </SheetHeader>

        {/* PRODUCT FORM */}
        <div className="edit-product-container grid flex-1 auto-rows-min gap-6 px-4">
          <form onSubmit={handleSubmit} className="p-2">
            <div className="form-header flex w-full justify-between items-center mb-8">
              <p className="text-xl">Add New Product</p>
              <div className="form-action flex gap-x-2">
                <Button
                  variant={"outline"}
                  className="space-x-1 text-sm flex items-center justify-evenly"
                >
                  <Trash />
                  Discard
                </Button>
                <Button
                  type="submit"
                  className="space-x-1  text-sm flex items-center justify-evenly"
                >
                  <Save />
                  Save
                </Button>
              </div>
            </div>
            <div className="form-container  grid grid-cols-12 space-y-6">
              <div className="left-pane col-span-12 space-y-6">
                <Label className="text-xl">General Information</Label>
                <div className="form-field grid gap-y-2">
                  <Label className="!text-neutral-500  ">Product Name</Label>
                  <Input
                    type="text"
                    value={formData.productName || ""}
                    name="productName"
                    placeholder="Product Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field grid gap-y-2">
                  <Label className="!text-neutral-500  ">
                    Product Category
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      handleValueChange(value, "productCategory");
                    }}
                    value={formData.productCategory || ""}
                    name="productCategory"
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue>
                        {formData.productCategory
                          ? productCategory.find(
                              (c) => c.value === formData.productCategory
                            )?.label
                          : "Product Category"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {productCategory.map((item, index) => {
                          return (
                            <SelectItem key={`yr-${index}`} value={item.value}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="form-field grid gap-y-2">
                  <Label className="!text-neutral-500  ">Descriptions</Label>
                  <Textarea
                    value={formData.productDescription || ""}
                    name="productDescription"
                    onChange={handleChange}
                    className="!h-24"
                    placeholder="Description"
                  />
                </div>
                <div className="form-field grid gap-y-2">
                  <Label className="!text-neutral-500  ">Tag Keyword</Label>
                  <Textarea
                    value={formData.productKeyword || ""}
                    name="productKeyword"
                    className="!h-24"
                    onChange={handleKeywordChange}
                    placeholder="Tag Keyword"
                  />
                </div>
                <Label>Pricing</Label>
                <div className="form-field grid gap-y-2">
                  <Label className="!text-neutral-500 ">Price</Label>
                  <Input
                    value={formData.productPrice || ""}
                    type="number"
                    min={1}
                    name="productPrice"
                    placeholder="Price"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field col-span-12 space-y-2">
                  <Label className="!text-neutral-500">Discount</Label>
                  <Input
                    value={formData.productDiscount || ""}
                    type="number"
                    name="productDiscount"
                    placeholder="Discount"
                    min={0}
                    max={100}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field col-span-12 space-y-2">
                  <Label className="!text-neutral-500">Discount Category</Label>
                  <Select
                    onValueChange={(value) =>
                      handleValueChange(value, "productDiscountCategory")
                    }
                    value={formData.productDiscountCategory || ""}
                    name="productDiscountCategory"
                  >
                    <SelectTrigger className="w-full bg-white">
                      {formData.productDiscountCategory
                        ? discountCategory.find(
                            (c) => c.value === formData.productDiscountCategory
                          )?.label
                        : "Product Discount Category"}
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {discountCategory.map((item, index) => {
                          return (
                            <SelectItem key={`yr-${index}`} value={item.value}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* RIGHT PANE */}
              <div className="right-pane col-span-12 space-y-6">
                <div className="form-field grid gap-y-2">
                  <div className="label-header space-y-1">
                    <Label className="!text-neutral-500">Product View</Label>
                    <Label className="!text-neutral-500 text-xs">
                      Drag and drop you image here
                    </Label>
                  </div>
                  <ImageUploader
                    name={"productPreview"}
                    value={formData.productPreview[0]}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <div className="form-field grid gap-y-2">
                  <div className="label-header space-y-1">
                    <Label className="!text-neutral-500">
                      Thumbnail Product
                    </Label>
                    <Label className="!text-neutral-500 text-xs">
                      Drag and drop you image here
                    </Label>
                  </div>

                  <ImageUploader
                    name={"productThumbnail"}
                    formData={formData}
                    value={formData.productThumbnail}
                    setFormData={setFormData}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditProductModal;
