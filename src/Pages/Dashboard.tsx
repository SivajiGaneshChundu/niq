import { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  AppBar,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import BarChart from "../Components/BarChart";
import ProductsTable from "../Components/ProductsTable";
import ProductDetails from "../Components/ProductDetails";
import useFetch from "../Hooks/useFetch";
import { ProductsContext } from "../Context/ProductsContext";
import { ProductType } from '../Types/types';

const defaultTheme = createTheme();
const BASE_URL = "https://fakestoreapi.com";

const CustomAppBar = styled(AppBar)(() => ({
  backgroundColor: "#000",
}));

const CustomPaper = styled(Paper)(() => ({
  p: 2,
  display: "flex",
  flexDirection: "column",
  minHeight: 180,
  marginTop: '15px',
  padding: '20px'
}));

const DropdownContainer = styled(Box)(() => ({
  minWidth: 120,
  marginTop: "20px",
  display: "flex",
  gap: "10px",
}));

const HelperText = styled("p")(() => ({
  fontWeight: 700,
}));

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const { data: categoriesData } = useFetch({
    url: `${BASE_URL}/products/categories`,
  });

  const { data: productsData, fetch: fetchProducts } = useFetch({
    url: `${BASE_URL}/products/category/${encodeURIComponent(
      selectedCategory
    )}`,
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategory]);

  return (
    <ProductsContext.Provider value={productsData}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CustomAppBar position="absolute">
            <Toolbar>
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {`My Fabulous Store`}
              </Typography>
            </Toolbar>
          </CustomAppBar>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              marginTop: "60px",
            }}
          >
            <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Left Section*/}
                <Grid item xs={12} md={8} lg={3}>
                  <CustomPaper>
                    <DropdownContainer>
                      <FormControl fullWidth>
                        <InputLabel id="categories-label">Category</InputLabel>
                        <Select
                          labelId="categories-label"
                          id="categories-select"
                          value={selectedCategory}
                          label="Category"
                          onChange={(e) => setSelectedCategory(e.target?.value)}
                        >
                          {categoriesData?.map((d: string, i: number) => (
                            <MenuItem key={i} value={d}>
                              {d}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        disabled={!selectedCategory}
                        onClick={() => {
                          setSelectedCategory("");
                          setSelectedProduct(null);
                        }}
                      >
                        <ClearIcon />
                      </Button>
                    </DropdownContainer>
                    <DropdownContainer>
                      <FormControl fullWidth>
                        <InputLabel id="products-label">Products</InputLabel>
                        <Select
                          labelId="products-label"
                          id="products-select"
                          value={selectedProduct || ""}
                          disabled={!selectedCategory}
                          label="Products"
                          onChange={(e) =>
                            setSelectedProduct(
                              parseInt(e.target?.value as string)
                            )
                          }
                        >
                          {productsData &&
                            productsData?.length &&
                            productsData?.map((d: ProductType, i: number) => (
                              <MenuItem key={i} value={d.id}>
                                {d.title}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        disabled={!selectedProduct}
                        onClick={() => setSelectedProduct(null)}
                      >
                        <ClearIcon />
                      </Button>
                    </DropdownContainer>
                  </CustomPaper>
                </Grid>
                {/* Main Section*/}
                <Grid item xs={12} md={4} lg={9}>
                  <CustomPaper>
                    {!selectedCategory ? (
                      <HelperText>{'Please select a category'}</HelperText>
                    ) : !selectedProduct ? (
                      <BarChart />
                    ) : (
                      <ProductDetails selectedProduct={selectedProduct} />
                    )}
                  </CustomPaper>
                  {selectedCategory && !selectedProduct ? (
                    <CustomPaper>
                      <ProductsTable />
                    </CustomPaper>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </ProductsContext.Provider>
  );
}
