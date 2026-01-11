import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Save, Trash, UploadIcon } from "lucide-react";
import PageTitleBar from "../../components/pagetitlebar/PageTitleBar";
import year from "../../data/year.json"

const AddProduct = () => {

  const handleChange = () => {};
  return (
    <div className="add-product-container space-y-12">
      <PageTitleBar
        title="Add Product"
        path="/add-product"
        buttonTitle="Add Product"
      />
      <form action="" className="ml-8">
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
            <Button className="space-x-1  text-sm flex items-center justify-evenly">
              <Save />
              Save
            </Button>
          </div>
        </div>
        <div className="form-container  grid grid-cols-12 space-x-16">
          <div className="left-pane col-span-8 space-y-6">
            <Label className="text-xl">General Information</Label>
            <div className="form-field grid gap-y-2">
              <Label className="!text-neutral-500  ">Product Name</Label>
              <Input
                type="text"
                name="productName"
                placeholder="Product Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-field grid gap-y-2">
              <Label className="!text-neutral-500  ">Product Category</Label>
              <Select >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Product Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {year.map((item, index) => {
                      return (
                        <SelectItem key={`yr-${index}`} value={item.label}>
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
                name="description"
                onChange={handleChange}
                className="!h-24"
                placeholder="Description"
              />
            </div>
            <div className="form-field grid gap-y-2">
              <Label className="!text-neutral-500  ">Tag Keyword</Label>
              <Textarea
                name="tag"
                className="!h-24"
                onChange={handleChange}
                placeholder="Tag Keyword"
              />
            </div>
            <Label>Pricing</Label>
            <div className="form-field grid gap-y-2">
              <Label className="!text-neutral-500 ">Price</Label>
              <Input
                type="number"
                name="Price"
                placeholder="Price"
                onChange={handleChange}
              />
            </div>
            <div className="form-field grid grid-cols-12 gap-x-4">
              <div className="form-field col-span-6 space-y-2">
                <Label className="!text-neutral-500">Discount</Label>
                <Input
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  onChange={handleChange}
                />
              </div>
              <div className="form-field col-span-6 space-y-2">
                <Label className="!text-neutral-500">Discount Category</Label>
                <Select>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Discount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {year.map((item, index) => {
                        return (
                          <SelectItem key={`yr-${index}`} value={item.label}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* RIGHT PANE */}
          <div className="right-pane col-span-4 space-y-6">
            <div className="form-field grid gap-y-2">
              <div className="label-header space-y-1">
                <Label className="!text-neutral-500">Product View</Label>
                <Label className="!text-neutral-500 text-xs">
                  Drag and drop you image here
                </Label>
              </div>
              <div className="image-uploader relative flex justify-center items-center h-48  rounded-lg border ">
                <Input
                  type="file"
                  id="file-input"
                  className="h-48 absolute w-full border-none opacity-0"
                  multiple
                  accept="image/*"
                />
                <div className="upload place-items-center space-y-2 text-neutral-500">
                  <UploadIcon />{" "}
                  <span className="text-sm ">Drag and drop Here</span>
                </div>
              </div>
            </div>
            <div className="form-field grid gap-y-2">
              <div className="label-header space-y-1">
                <Label className="!text-neutral-500">Thumbnail Product</Label>
                <Label className="!text-neutral-500 text-xs">
                  Drag and drop you image here
                </Label>
              </div>
              <div className="image-uploader relative flex justify-center items-center h-48  rounded-lg border ">
                <Input
                  type="file"
                  id="file-input"
                  className="h-48 absolute w-full border-none opacity-0"
                  accept="image/*"
                />
                <div className="upload place-items-center space-y-2 text-neutral-500">
                  <UploadIcon />{" "}
                  <span className="text-sm ">Drag and drop Here</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
