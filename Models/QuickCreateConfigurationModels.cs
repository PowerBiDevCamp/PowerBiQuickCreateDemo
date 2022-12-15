namespace PowerBiQuickCreateDemo.Models {

  public class DatasetCreateConfigurationSet {
    public DatasetCreateConfiguration[] Value { get; set; }
  }

  public class DatasetCreateConfiguration {
    public string name { get; set; }
    public string mashupDocument { get; set; }
    public string locale { get; set; }
    public DatasourceConnectionConfig datasourceConnectionConfig { get; set; }
    public TableSchema[] tableSchemaList { get; set; }
    public DataTable[] data { get; set; }
  }

  
  public class DataColumn {
    public string name { get; set; }
    public string dataType { get; set; }
  }

  public class TableSchema {
    public string name { get; set; }
    public List<DataColumn> columns { get; set; }
  }

  public class DataTable {
    public string name { get; set; }
    public string[][] rows { get; set; }
  }

  public class DatasourceCredentials {
    public CredentialType credentialType { get; set; }
  }

  public class DatasourceConnectionConfig {
    public DataCacheMode dataCacheMode { get; set; }
    public DatasourceCredentials credentials { get; set; }
    public string path { get; set; }
    public string kind { get; set; }
  }

  public enum CredentialType {
    NoConnection = 0,
    OnBehalfOf = 1,
    Anonymous = 2
  }

  public enum DataCacheMode {
    Import = 0,
    DirectQuery = 1
  }

  public class DataType {
    public const string Number = "Number";
    public const string Currency = "Currency";
    public const string Int32 = "Int32";
    public const string Int64 = "Int64";
    public const string Percentage = "Percentage";
    public const string DateTime = "DateTime";
    public const string DateTimeZone = "DateTimeZone";
    public const string Date = "Date";
    public const string Time = "Time";
    public const string Duration = "Duration";
    public const string Text = "Text";
    public const string Logical = "Logical";
    public const string Binary = "Binary";
  }

}
