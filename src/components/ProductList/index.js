
import { useParams } from "react-router-dom";
import "./ProductList.scss";
import Laptop from "./laptop";
import Phone from "./phone";
import SearchList from "../SearchList";
function ProductList() {
  const url = new URL(window.location.href);
  const search=url.searchParams.get("search");
  return (
    <>
      {!search ?(
        <>
        <Phone/>
        <Laptop/>
        </>
      ):(
        <SearchList/>
      )}
    </>
  );
}
export default ProductList;