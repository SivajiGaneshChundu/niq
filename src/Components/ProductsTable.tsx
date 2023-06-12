import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductsContext } from "../Context/ProductsContext";
import { ProductType } from '../Types/types';

const CustomTableCell = styled(TableCell)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 100,
}));

export default function ProductsTable() {
  const data: ProductType[] = useContext(ProductsContext);

  return data && data?.length ? (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{'TITLE'}</TableCell>
            <TableCell>{'PRICE'}</TableCell>
            <TableCell>{'DESCRIPTION'}</TableCell>
            <TableCell>{'RATING'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d: ProductType, i: number) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <CustomTableCell>{d.title}</CustomTableCell>
              <TableCell>{d.price}</TableCell>
              <CustomTableCell>{d.description}</CustomTableCell>
              <TableCell>{d.rating.rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>
      <CircularProgress sx={{ marginTop: "62px" }} />
    </div>
  );
}
