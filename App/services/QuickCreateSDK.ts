import * as powerbi from "powerbi-client";
import * as models from "powerbi-models";

import { IDatasetCreateConfiguration, IDatasourceConnectionConfiguration, IDataTable, ITableSchema } from "powerbi-models";

import { DatasetCreateConfiguration, DatasetCreateConfigurationSet } from './../models/PowerBiQuickCreateModels';

require('powerbi-models');
require('powerbi-client');

import { msalInstance } from '../index';
import { PowerBiPermissionScopes } from "../AuthConfig";

export default class QuickCreateSDK {

  static GetAccessToken = async (): Promise<string> => {

    const account = msalInstance?.getActiveAccount();
    if (account) {
      const response = await msalInstance.acquireTokenSilent({
        scopes: PowerBiPermissionScopes,
        account: account
      });

      return response.accessToken;
    }
    else {
      return "";
    }
  };

  static CreateQuickCreateReportSample1 = async () => {

    let datasetCreateConfig: IDatasetCreateConfiguration = {
      locale: "en-US",
      tableSchemaList: [{
        name: "Table",
        columns: [
          { name: "Product", dataType: models.DataType.Text },
          { name: "Sales", dataType: models.DataType.Currency }
        ]
      }],
      data: [{
        name: "Table",
        rows: [
          ["Apples", "124000"],
          ["Bannanas", "98000"],
          ["Carrots", "64000"],
          ["Donuts", "133000"]]
      }]
    };

    var quickCreateConfig: models.IQuickCreateConfiguration = {
      type: 'quickCreate',
      tokenType: models.TokenType.Aad,
      accessToken: await this.GetAccessToken(),
      embedUrl: "https://app.powerbi.com/quickCreate?unmin=1",
      datasetCreateConfig: datasetCreateConfig,
      reportCreationMode: models.ReportCreationMode.QuickExplore
    };

    let embedContainer = document.getElementById("embed-container");
    let report = window.powerbi.quickCreate(embedContainer!, quickCreateConfig);

    report.on("error", async function (error) {
      console.log("error:", error.detail, "session id:", (await report.getCorrelationId()));  
    });

    report.on("loaded", function () {
      console.log("loaded event fired");
    });

    report.on("rendered", function () {
      console.log("rendered event fired");
    });

  }

  static CreateQuickCreateReportSample2 = async () => {

    var reportEmbedURL = "https://app.powerbi.com/quickCreate?unmin=1";

    var token = await this.GetAccessToken();

    let datasetCreateConfig: IDatasetCreateConfiguration = {
      mashupDocument: "section Section1;  shared Table = let\r\n  Source = Csv.Document(Web.Contents(\"https://github.com/PowerBiDevCamp/PowerBiQuickCreateDemo/raw/main/Data/Countries.csv\"),[Delimiter=\",\", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.None]),\r\n    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),\r\n    ChangedType = Table.TransformColumnTypes(PromotedHeaders,{{\"Population\", Int64.Type}, {\"Urban Population\", Percentage.Type}, {\"Land Size\", Int64.Type}, {\"Poupulation Density\", type number}, {\"Yearly GNP\", Currency.Type}})\r\n in\r\n ChangedType;",
      locale: "en-US",
      datasourceConnectionConfig: {
        dataCacheMode: 0,
        credentials: {
          credentialType: 2
        }
      }
    };

    var quickCreateConfig: models.IQuickCreateConfiguration = {
      type: 'quickCreate',
      tokenType: models.TokenType.Aad,
      accessToken: token,
      embedUrl: reportEmbedURL,
      datasetCreateConfig: datasetCreateConfig,
      reportCreationMode: models.ReportCreationMode.QuickExplore
    };

    let embedContainer = document.getElementById("embed-container");
    let report = window.powerbi.quickCreate(embedContainer!, quickCreateConfig);

    report.on("error", async function (error) {
      console.log("error:", error.detail, "session id:", (await report.getCorrelationId()));
    });

    report.on("loaded", function () {
      console.log("loaded event fired");
    });

    report.on("rendered", function () {
      console.log("rendered event fired");
    });

  }

  static getDatasetCreateConfigSample1 = (): IDatasetCreateConfiguration => {

    let createConfiguration: IDatasetCreateConfiguration = {

      locale: "en-US",

      tableSchemaList: [{
        name: "Table",
        columns: [
          { name: "Product", dataType: models.DataType.Text },
          { name: "Sales", dataType: models.DataType.Currency }
        ]
      }
      ],

      data: [{
        name: "Table",
        rows: [
          ["Apples", "124000"],
          ["Bannanas", "98000"],
          ["Carrots", "64000"],
          ["Donoughts", "133000"]]
      }]
    };

    return createConfiguration;

  }

  static getDatasetCreateConfigSample2 = (): IDatasetCreateConfiguration => {
    return {
      mashupDocument: "section Section1; \r\nshared Table = let\r\n    Source = Csv.Document(Web.Contents(\"https://github.com/PowerBiDevCamp/PowerBiQuickCreateDemo/raw/main/Data/Countries.csv\"),[Delimiter=\",\", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.None]),\r\n    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),\r\n    ChangedType = Table.TransformColumnTypes(PromotedHeaders,{{\"Population\", Int64.Type}, {\"Urban Population\", Percentage.Type}, {\"Land Size\", Int64.Type}, {\"Poupulation Density\", type number}, {\"Yearly GNP\", Currency.Type}})\r\nin\r\n    ChangedType;",
      locale: "en-US",
      datasourceConnectionConfig: {
        dataCacheMode: 0,
        credentials: {
          credentialType: 2
        }
      }
    }
  }

  static GetSampleQuickCreateConfigurations = async (): Promise<DatasetCreateConfiguration[]> => {

    let ceateConfig1 = QuickCreateSDK.getDatasetCreateConfigSample1();
    let ceateConfig2 = QuickCreateSDK.getDatasetCreateConfigSample2();

    let clientSideConfigs: DatasetCreateConfiguration[] = [{
      name: "Simple Sample 1",
      locale: "en-US",
      data: ceateConfig1.data,
      datasourceConnectionConfig: ceateConfig1.datasourceConnectionConfig,
      mashupDocument: ceateConfig1.mashupDocument,
      tableSchemaList: ceateConfig1.tableSchemaList
    },
    {
      name: "Simple Sample 2",
      locale: "en-US",
      data: ceateConfig2.data,
      datasourceConnectionConfig: ceateConfig2.datasourceConnectionConfig,
      mashupDocument: ceateConfig2.mashupDocument,
      tableSchemaList: ceateConfig2.tableSchemaList
    }];

    let serverSideConfigs = await this.GetCreateConfigurationsFromWebApi();

    return clientSideConfigs.concat(serverSideConfigs);
  }

  static GetCreateConfigurationsFromWebApi = async (): Promise<DatasetCreateConfiguration[]> => {
    var restUrl = "./api/QuickCreateOptions/";
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json"
      }
    }).then(response => response.json());
  }
}