import { useRef, useState, useContext } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductsContext } from "../Context/ProductsContext";
import { ProductType } from '../Types/types';

const dropdownData: string[] = ["Price", "Rating"];

const DropdownContainer = styled(Box)(() => ({
  minWidth: 285,
  margin: "20px 0px",
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
}));

export default function BarChart() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [selectedView, setSelectedView] = useState<string>(dropdownData[0]);
  const data: ProductType[] = useContext(ProductsContext);

  let preparedData: number[] = [];

  if (data && data.length) {
    if (selectedView === "Price") {
      preparedData = data?.map((d: ProductType) => d?.price);
    } else {
      preparedData = data?.map((d: ProductType) => d?.rating?.rate);
    }
  }

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      height: "400",
    },
    title: {
      text: "Price Comparision",
    },
    xAxis: {
      categories: data && data?.length ? data?.map((d: ProductType) => d.title) : [],
    },
    yAxis: {
      min: 0,
      title: {
        text: `${selectedView}`,
      },
    },
    series: [
      {
        name: "Product",
        type: "column",
        data: preparedData,
      },
    ],
  };

  return (
    <>
      <DropdownContainer>
        <FormControl fullWidth>
          <InputLabel id="categories-label">View</InputLabel>
          <Select
            labelId="view-label"
            id="view-select"
            value={selectedView}
            label="View"
            onChange={(e) => setSelectedView(e.target.value)}
          >
            {dropdownData?.map((d: string, i: number) => (
              <MenuItem key={i} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DropdownContainer>

      {preparedData?.length ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      ) : (
        <div>
          <CircularProgress sx={{ marginTop: "10px" }} />
        </div>
      )}
    </>
  );
}
