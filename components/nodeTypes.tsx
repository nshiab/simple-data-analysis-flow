import SDB from "./SDA/SDB"
import ST from "./SDA/ST"
import FetchData from "./SDA/FetchData"
import LogTable from "./SDA/LogTable"
import FetchGeoData from "./SDA/FetchGeoData"
import Points from "./SDA/Points"
import JoinGeo from "./SDA/JoinGeo"
import Summarize from "./SDA/Summarize"
import RenameColumns from "./SDA/RenameColumns"
import Sort from "./SDA/Sort"
import AddColumn from "./SDA/AddColumn"
import Filter from "./SDA/Filter"
import Join from "./SDA/Join"
import LinearRegressions from "./SDA/LinearRegressions"
import LoadFile from "./SDA/LoadFile"
import LoadGeoFile from "./SDA/LoadGeoFile"

const nodeTypes = {
  SDB: SDB,
  ST: ST,
  FetchData: FetchData,
  LoadFile: LoadFile,
  LoadGeoFile: LoadGeoFile,
  FetchGeoData: FetchGeoData,
  LogTable: LogTable,
  Points: Points,
  JoinGeo: JoinGeo,
  Summarize: Summarize,
  RenameColumns: RenameColumns,
  Sort: Sort,
  AddColumn: AddColumn,
  Filter: Filter,
  Join: Join,
  LinearRegressions: LinearRegressions,
}

export default nodeTypes