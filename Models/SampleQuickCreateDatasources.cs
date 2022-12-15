using PowerBiQuickCreateDemo.Models;

namespace PowerBiQuickCreateDemo.Models {

  public class SampleQuickCreateDatasources {

    private const string BaseUrlToCsvFiles = "https://github.com/PowerBiDevCamp/PowerBiQuickCreateDemo/raw/main/Data/";

    public static DatasetCreateConfiguration[] GetDatasourceCreateConfigurations() {
      return new DatasetCreateConfiguration[] {
        ProductsListWithDataTable(),
        GetCreateConfigForCountries(),
        GetCreateConfigForExpenses(),
        GetCreateConfigForWikipedia(),
        GetCreateConfigForNFLRoster("NY Giants", "http://www.giants.com/team/roster.html"),
        GetCreateConfigForNFLRoster("TB Buccaneers", "http://www.giants.com/team/roster.html"),
        GetCreateConfigForNFLRoster("Phil Eagles", "http://www.philadelphiaeagles.com/team/roster.html"),
        GetCreateConfigForNFLRoster("Dallas Cowboys", "http://www.dallascowboys.com/team/roster")
      };
    }

    public static DatasetCreateConfiguration ProductsListWithDataTable() {

      return new DatasetCreateConfiguration {
        name = "Products List (DataTable)",
        locale = "en-US",
        tableSchemaList = new TableSchema[]{
          new TableSchema {
            name= "Table",
            columns= new List<DataColumn> {
              new DataColumn{name="Product", dataType = DataType.Text},
              new DataColumn{name="Category", dataType = DataType.Text},
              new DataColumn{name="Sales Revenue", dataType = DataType.Currency},
              new DataColumn{name="Units Sold", dataType = DataType.Number}
            }
          }
        },
        data = new DataTable[]{
          new DataTable{
            name = "Table" ,
            rows =  new string[][] {
              new string[] { "Apples","Fruit", "125000", "600" },
              new string[] { "Bananas","Fruit", "225000", "1200" },
              new string[] { "Carrots","Vegetable", "175000", "775" },
              new string[] { "Dounuts","Bread", "325000", "1200" },
            }
          }
        }

      };
    }

    public static DatasetCreateConfiguration GetCreateConfigForWikipedia() {

      string mashupDocument = Properties.Resources.WikipediaQuery_m;

      return new DatasetCreateConfiguration {
        name = "Wikipedia",
        mashupDocument = mashupDocument,
        locale = "en-US",
        datasourceConnectionConfig = new DatasourceConnectionConfig {
          credentials = new DatasourceCredentials {
            credentialType = CredentialType.Anonymous
          }
        }
      };
    }


    public static DatasetCreateConfiguration GetCreateConfigForCountries() {

      string mashupDocument = Properties.Resources.CountriesQuery_m;

      return new DatasetCreateConfiguration {
        name = "Countries",
        mashupDocument = mashupDocument,
        locale = "en-US",
        datasourceConnectionConfig = new DatasourceConnectionConfig {
          credentials = new DatasourceCredentials {
            credentialType = CredentialType.Anonymous
          }
        }
      };
    }

    public static DatasetCreateConfiguration GetCreateConfigForExpenses() {

      string mashupDocument = Properties.Resources.ExpensesQuery_m;

      return new DatasetCreateConfiguration {
        name = "Expenses",
        mashupDocument = mashupDocument,
        locale = "en-US",
        datasourceConnectionConfig = new DatasourceConnectionConfig {
          credentials = new DatasourceCredentials {
            credentialType = CredentialType.Anonymous
          }
        }
      };
    }


    public static DatasetCreateConfiguration GetCreateConfigForNFLRoster(string Team, string RosterUrl) {

      string mashupDocument = Properties.Resources.NFLRosterQuery_m;
      mashupDocument = mashupDocument.Replace("[NFL_ROSTER_URL]", RosterUrl);

      return new DatasetCreateConfiguration {
        name = Team + " Roster",
        mashupDocument = mashupDocument,
        locale = "en-US",
        datasourceConnectionConfig = new DatasourceConnectionConfig {         
          credentials = new DatasourceCredentials {
            credentialType = CredentialType.Anonymous
          },
          path = RosterUrl,
          kind = "Web"
        }
      };

    }
   
  
  }

}
