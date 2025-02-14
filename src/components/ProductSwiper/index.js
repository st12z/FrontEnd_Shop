import { useEffect, useRef, useState } from 'react';
import {Virtual, Navigation, Pagination, Autoplay} from 'swiper/modules';
import {Swiper,SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./ProductSwiper.scss"
import { getAllProductsBySearch } from '../../service/productService';
import ProductItem from '../CardItemProduct';
import { del } from '../../utils/request';
import { getCategoryById } from '../../service/categoryService';
function ProductSwiper(){
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  const [products,setProducts]=useState([]);
  const [slides, setSlides] = useState(
    Array.from({ length: 1 }).map((_, index) => `Slide ${index + 1}`)
  );
  
  useEffect(()=>{
    const fetchApi =async ()=>{
      try{
        const result = await getAllProductsBySearch("");
        if(result.status==200){
          const products=result.data;
          if (products.length > 0) {
              products.forEach(product=>{
                product["price_new"]=product.price*(1-product.discount/100)
              })
              setProducts(products);
              setSlides(
                Array.from({ length: products.length }).map((_, index) => `Slide ${index + 1}`)
              );
            }
          }
          else{
            console.error("fail");
          }
      }catch(error){
          console.log(error);
      }
    }
    fetchApi();
  },[]);
  


  return (
    <>
      <div className="swipper__product" style={{marginTop:"20px"}}>
        <Swiper 
          modules={[Virtual, Navigation, Pagination,Autoplay]}
          onSwiper={setSwiperRef}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            type: 'fraction',
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          
          navigation={true}
          virtual
          style={{padding:"30px"}}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id} virtualIndex={index} >
              <ProductItem item={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </>
  );
}
export default ProductSwiper;