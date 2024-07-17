import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { formatDate, formatNumber } from "journalism"

export default function DataTable({
  data,
  columns,
  types,
  nbRows,
}: {
  data: { [key: string]: string | number | Date | boolean | null }[]
  columns: string[]
  types: string[]
  nbRows: number
}) {
  return (
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
                    {formatDate(d[c], "Month DD, YYYY, at HH:MM period TZ", {
                      utc: true,
                      abbreviations: true,
                    })}
                  </TableCell>
                )
              } else if (typeof d[c] === "number") {
                return <TableCell key={i}>{formatNumber(d[c])}</TableCell>
              } else if (ArrayBuffer.isView(d[c])) {
                return <TableCell key={i}>{`<Geometry>`}</TableCell>
              } else {
                return <TableCell key={i}>{d[c]?.toString()}</TableCell>
              }
            })}
          </TableRow>
        ))}
      </TableBody>
      {nbRows && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} className="text-right">
              {formatNumber(nbRows)} rows in total in the table
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}
