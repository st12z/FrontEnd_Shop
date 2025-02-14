import { Checkbox, Col, Row } from "antd";
import { filterMemoryArray } from "../../utils/filterArray";
import { useState } from "react";
import { toObject } from "../../utils/convert";

function MemoryFilter(props){
  const {topic}=props;
  const currentUrl=new URL(window.location.href);
  const filterArray =currentUrl.searchParams.get("filter") ? currentUrl.searchParams.get("filter").split(","):[];
  const findIndex=filterArray.findIndex(item=>item.startsWith(topic));
  let filterCheck=[];
  if(findIndex!=-1){
    let filterCheckString=filterArray[findIndex];
    filterCheck=filterCheckString.split(":")[1].split("-");
  }
  
  const handleChange=(e)=>{
    const key=e.target.name;
    const value=e.target.value;
    if(e.target.checked){
      filterCheck.push(value);
    }
    else{
      filterCheck = filterCheck.filter(item => item !== value);
    }
    if(filterCheck.length>0){
      if (findIndex !== -1) {
        filterArray[findIndex] = `${key}:${filterCheck.join("-")}`;
      } else {
        filterArray.push(`${key}:${filterCheck.join("-")}`);
      }
    }
    else if(findIndex!=-1){
      filterArray.splice(findIndex,1);
    }
    currentUrl.searchParams.set("filter",filterArray.join(","));
    window.location.href=currentUrl;
  }
  return(
    <>
      <Row>
        <h2>Bộ nhớ trong</h2>
        {filterMemoryArray.map((item,index)=>(
          <Col span={24} key={index}>
            <Checkbox value={item.value} onChange={handleChange} name={topic} checked={filterCheck.includes(item.value)} >{item.title}</Checkbox>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MemoryFilter;