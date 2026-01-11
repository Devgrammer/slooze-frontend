import { Plus } from 'lucide-react';
import { Link } from 'react-router';


interface TitlePrppType{
    title:string;
    path:string;
    buttonTitle:string
}
const PageTitleBar = ({title, path, buttonTitle}:TitlePrppType) => {
  return (
    <div className="page-header flex w-full justify-between items-center my-8">
      <p className="text-3xl">{title || "Page Title"}</p>
      <div className="header-action">
        <Link
          to={path || "/add-product"}
          className="gap-x-1 bg-white dark:bg-neutral-900 dark:text-white text-neutral-900 border rounded-md w-fit px-4 h-10  text-sm flex items-center justify-evenly"
        >
          <Plus size={16} />
          {buttonTitle || "Add Product"}
        </Link>
      </div>
    </div>
  );
}

export default PageTitleBar