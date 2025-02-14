import ProductSwiper from "../../components/ProductSwiper";
import ProductList from "../../components/ProductList";

function Home() {
 
  return(
    <>
      <div className="home" style={{marginTop:"20px"}}>
          <ProductSwiper style={{marginTop:"50px"}}/>
          <ProductList/>
      </div>
    </>
  )
}
export default Home;