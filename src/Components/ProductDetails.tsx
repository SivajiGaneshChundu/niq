import { useContext } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductsContext } from "../Context/ProductsContext";
import { ProductType } from "../Types/types";

const PriceImageContainer = styled("div")(() => ({
  display: "flex",
  gap: "40px",
  textTransform: "uppercase",
  margin: "20px 0",
}));

const PriceContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  minWidth: "20%",
}));

const TypographyPrice = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: "26px",
  marginTop: "5px",
}));

const Image = styled("img")(() => ({
  width: 200,
  height: 110,
}));

export default function ProductDetails(props: { selectedProduct: number }) {
  const productsData: ProductType[] = useContext(ProductsContext);
  const { selectedProduct } = props;
  const data: ProductType | null =
    productsData && selectedProduct
      ? productsData.filter((d: ProductType) => d.id === selectedProduct)?.[0]
      : null;

  return data ? (
    <>
      <Typography
        component="h5"
        variant="h5"
        color="inherit"
        sx={{ textAlign: "start", fontWeight: 700 }}
      >
        {data.title}
      </Typography>
      <PriceImageContainer>
        <PriceContainer>
          <Typography component="p" variant="body1" color="inherit">
            {data.category}
          </Typography>
          <Typography component="p" variant="body1" color="inherit">
            SKU: {data.id}
          </Typography>
          <TypographyPrice variant="body1" color="inherit">
            $ {data.price}
          </TypographyPrice>
        </PriceContainer>
        <Image src={data.image} alt={data.title} />
      </PriceImageContainer>
      <Typography
        component="p"
        variant="body1"
        color="inherit"
        sx={{ textAlign: "start" }}
      >
        {data.description}
      </Typography>
    </>
  ) : (
    <></>
  );
}
