import React from "react";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

const cellStyle = { fontSize: "10px", padding: "5px" }

export default function T({ keys, data }: {
  keys: string[];
  data: { [key: string]: any }[];
}) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {keys.map((d) => (
              <TableCell key={d} sx={{ ...cellStyle, fontWeight: "bold" }}>{d}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => (
            <TableRow key={"tb-" + i}>
              {keys.map((key, j) => (
                <TableCell key={"tc-" + i + "-" + j} sx={cellStyle}>{String(d[key])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
