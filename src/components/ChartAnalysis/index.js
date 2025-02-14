import { Select, Slider } from "antd";
import { useEffect, useState } from "react";
import { getJWT } from "../../utils/request";

import { Column, Line } from '@ant-design/plots';

function ChartAnalysis(){
  const monthArr=[1,2,3,4,5,6,7,8,9,10,11,12];
  const [data,setData]=useState([]);
  const [month,setMonth]=useState(1);
  const [revenue,setRevenue]=useState(0);
  const options=monthArr.map(item=>{
    return{
      value:item,
      label:`Tháng ${item}`
    }
  });
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const result = await getJWT(`admin/statics?month=${month}`);
        console.log(result);
        if(result.status==200){
          setData(result.data.revenueDay);
          setRevenue(revenue);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[month])
  const handleChange=async(e)=>{
    setMonth(e);
  }

  const config = {
    data,
    xField: 'day',
    yField: 'revenue',
    smooth:true,
    point:true,
    slider:{
      start:0,
      end:1
    },

  };
  return(
    <>
      <h2>Thống kê kinh doanh theo tháng</h2>
      <Select
        options={options}
        defaultValue={1}
        onChange={handleChange}
        style={{width:120}}
      />
      <div className="" style={{marginTop:"40px",backgroundColor:"white",borderRadius:"20px",padding:"10px"}}>
      {data && data.length > 0 ? <Column {...config} /> : null} 
      </div>
      </>
  )
}
export default ChartAnalysis;