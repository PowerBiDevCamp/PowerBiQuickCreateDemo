import * as powerbi from "powerbi-client";
import { IDatasetCreateConfiguration, IDatasourceConnectionConfiguration, IDataTable, ITableSchema}  from "powerbi-models";

export interface DatasetCreateConfigurationSet {
  value: DatasetCreateConfiguration[]
}
export interface DatasetCreateConfiguration {
  name: string
  locale: string
  tableSchemaList?: ITableSchema[]
  data?: IDataTable[]
  mashupDocument?: string
  datasourceConnectionConfig?: IDatasourceConnectionConfiguration
}