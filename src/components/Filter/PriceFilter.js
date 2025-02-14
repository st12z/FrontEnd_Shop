import { useState } from "react";
import { Button, Col, Row } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { toObject } from "../../utils/convert";
import { filterPriceArray } from "../../utils/filterArray";
function PriceFilter(props) {
  const { topic } = props;
  const [isExpand, setIsExpand] = useState(false);
  const currentUrl = new URL(window.location.href);
  const filterString = currentUrl.searchParams.get("filter");
  const filter = filterString ? toObject(filterString) : {};
  const handleExpand = () => {
    setIsExpand(true);
  };
  const handleCollapse = () => {
    setIsExpand(false);
  };
  const handleFilter = (key, value) => {
    const filters = filterString ? filterString.split(",") : [];
    const filterIndex = filters.findIndex((f) => f.startsWith(`${key}`));
    if (filterIndex != -1) {
      if (filters[filterIndex] === `${key}:${value}`)
        filters.splice(filterIndex, 1);
        if(filters.length==0){
          currentUrl.searchParams.delete("filter");
        }
      else {
        filters[filterIndex] = `${key}:${value}`;
      }
    } else {
      filters.push(`${key}:${value}`);
    }
    currentUrl.searchParams.set("filter", filters.join(","));

    console.log(currentUrl);
    window.location.href = currentUrl;
  };
  return (
    <>
      <Col span={24}>
        <h2>Mức giá</h2>
      </Col>
      {filterPriceArray.map(
        (item, index) =>
          index < 4 && (
            <Col span={24} key={index}>
              <Button
                style={{ width: "100%", color: "", marginBottom: "5px" }}
                onClick={() => handleFilter(topic, item.value)}
                className={filter.price == item.value ? "selected" : ""}
              >
                {item.title}
              </Button>
            </Col>
          )
      )}

      {isExpand && (
        <>
          {filterPriceArray.map(
            (item, index) =>
              index > 4 &&
              index < filterPriceArray.length && (
                <Col span={24} key={index}>
                  <Button
                    style={{ width: "100%", color: "", marginBottom: "5px" }}
                    onClick={() => handleFilter(topic, item.value)}
                    className={filter.price == item.value ? "selected" : ""}
                  >
                    {item.title}
                  </Button>
                </Col>
              )
          )}
        </>
      )}
      {isExpand ? (
        <>
          <Col span={24}>
            <Button
              style={{ width: "100%", color: "", marginBottom: "5px" }}
              onClick={handleCollapse}
            >
              <p>Thu gọn</p>
              <UpOutlined />
            </Button>
          </Col>
        </>
      ) : (
        <>
          <Col span={24}>
            <Button
              style={{ width: "100%", color: "", marginBottom: "5px" }}
              onClick={handleExpand}
            >
              <p>Xem thêm</p>
              <DownOutlined />
            </Button>
          </Col>
        </>
      )}
    </>
  );
}
export default PriceFilter;
