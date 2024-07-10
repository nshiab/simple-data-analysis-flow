import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Handle,
  NodeResizer,
  Position,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate, formatNumber } from "journalism";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function LogTable() {
  const [data, setData] = useState<
    { [key: string]: string | number | Date | boolean | null }[] | null
  >(null);
  const [columns, setColumns] = useState<string[] | null>(null);
  const [types, setTypes] = useState<string[] | null>(null);
  const [nbRows, setNbRows] = useState<number | null>(null);
  const [nbRowsToLog, setNbRowsToLog] = useState<number>(10);

  const targetConnection = useHandleConnections({ type: "target" });
  const source = useNodesData(targetConnection[0]?.source);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable) {
        setData(await table.getTop(nbRowsToLog));
        const columns = await table.getColumns();
        const typesObj = await table.getTypes();
        const types = columns.map((d) => typesObj[d]);
        const nbRows = await table.getNbRows();
        setColumns(columns);
        setTypes(types);
        setNbRows(nbRows);
      } else {
        setData(null);
        setColumns(null);
        setTypes(null);
        setNbRows(null);
      }
    }

    run();
  }, [source, nbRowsToLog]);

  return (
    <div>
      <NodeResizer isVisible={false} />
      <Handle type="target" position={Position.Top} />
      <Card>
        <CardHeader>
          <CardTitle>Log table</CardTitle>
          {data === null && <CardDescription>No data.</CardDescription>}
        </CardHeader>
        {Array.isArray(data) &&
          Array.isArray(columns) &&
          Array.isArray(types) && (
            <CardContent>
              <div className="flex items-center space-x-2 mb-6">
                <Label>Number of rows to show:</Label>
                <Input
                  type="number"
                  className="w-20"
                  value={nbRowsToLog}
                  onChange={(e) => setNbRowsToLog(parseInt(e.target.value))}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((d, i) => (
                      <TableHead key={i} className="pb-4">
                        <div>{d}</div>
                        <div>{types[i]}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((d, i) => (
                    <TableRow key={i}>
                      {columns.map((c, i) => {
                        if (d[c] instanceof Date) {
                          return (
                            <TableCell key={i}>
                              {formatDate(
                                d[c],
                                "Month DD, YYYY, at HH:MM period TZ",
                                { utc: true, abbreviations: true }
                              )}
                            </TableCell>
                          );
                        } else if (typeof d[c] === "number") {
                          return (
                            <TableCell key={i}>{formatNumber(d[c])}</TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={i}>{d[c]?.toString()}</TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
                {nbRows && (
                  <TableFooter>
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-right"
                      >
                        {formatNumber(nbRows)} rows in total in the table
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </CardContent>
          )}
      </Card>
    </div>
  );
}
