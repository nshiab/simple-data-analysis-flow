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
import Note from "./SDA/Note"
import SelectColumns from "./SDA/SelectColumns"
import Longer from "./SDA/Longer"
import Wider from "./SDA/Wider"
import CleanColumnNames from "./SDA/CleanColumnNames"
import Describe from "./SDA/Describe"
import ProportionsVertical from "./SDA/ProportionsVertical"

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
  Note: Note,
  SelectColumns: SelectColumns,
  Longer: Longer,
  Wider: Wider,
  CleanColumnNames: CleanColumnNames,
  Describe: Describe,
  ProportionsVertical: ProportionsVertical,
}

export default nodeTypes
