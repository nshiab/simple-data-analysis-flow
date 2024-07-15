import SDB from "./SDA/SDB";
import ST from "./SDA/ST";
import FetchData from "./SDA/FetchData";
import LogTable from "./SDA/LogTable";
import FetchGeoData from "./SDA/FetchGeoData";
import Points from "./SDA/Points";
import JoinGeo from "./SDA/JoinGeo";
import Summarize from "./SDA/Summarize";
import RenameColumns from "./SDA/RenameColumns";
import Sort from "./SDA/Sort";

const nodeTypes = {
  SDB: SDB,
  ST: ST,
  FetchData: FetchData,
  FetchGeoData: FetchGeoData,
  LogTable: LogTable,
  Points: Points,
  JoinGeo: JoinGeo,
  Summarize: Summarize,
  RenameColumns: RenameColumns,
  Sort: Sort,
};

export default nodeTypes;
