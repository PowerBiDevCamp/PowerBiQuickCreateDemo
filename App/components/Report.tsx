import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { DatasetCreateConfiguration } from '../models/PowerBiQuickCreateModels'
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";


import * as powerbi from "powerbi-client";
import * as models from "powerbi-models";

// ensure Power BI JavaScript API has loaded
require('powerbi-models');
require('powerbi-client');

import QuickCreateSDK from './../services/QuickCreateSDK'

import { Box } from '@mui/system';

interface IReportProps {
  currentDatasetCreateConfiguration: DatasetCreateConfiguration;
}

const Report = ({ currentDatasetCreateConfiguration }: IReportProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const embedContainer = useRef();

  const setReportContainerHeight = () => {
    var reportContainer: HTMLElement = embedContainer.current;
    var reportContainerTopPosition = reportContainer.getBoundingClientRect().top;
    reportContainer.style.height = (window.innerHeight - reportContainerTopPosition - 5) + "px";
  };

  useLayoutEffect(() => {
    if (isAuthenticated && embedContainer.current != null) {
      setReportContainerHeight();
      window.addEventListener("resize", setReportContainerHeight);
    }
  }, [isAuthenticated, embedContainer, currentDatasetCreateConfiguration]);

  const embedQuickCreateReport = async (CreateConfig: DatasetCreateConfiguration) => {

    console.log("Calling embedQuickCreateReport", CreateConfig);

    const quickCreateConfig: models.IQuickCreateConfiguration = {
      type: "quickCreate",
      accessToken: await QuickCreateSDK.GetAccessToken(),
      tokenType: models.TokenType.Aad, // Aad token only
      embedUrl: "https://app.powerbi.com/quickcreate", // see below for generating the embed url
      datasetCreateConfig: CreateConfig,
      reportCreationMode: models.ReportCreationMode.QuickExplore, // QuickExplore for auto-generated visual,   
      settings: {
        localeSettings: {
          language: "en-US" // this should match the current locale of your window/product. It will be used to localize the UI.
        }
      }
    };

    const quickCreateReport = window.powerbi.quickCreate(embedContainer.current, quickCreateConfig);
  };

  useEffect(() => {
    if (embedContainer != null && currentDatasetCreateConfiguration != null) {
      embedQuickCreateReport(currentDatasetCreateConfiguration);
    }
  }, [currentDatasetCreateConfiguration]);

  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: "center", width: 1 }} >
        <h1>Welcome to the Quick Create SDK Demo</h1>
        <div>Click the <strong>Login</strong> link above to proceed with the demo.</div>
      </Box>
    );
  }

  if (isAuthenticated && currentDatasetCreateConfiguration == null) {
    return (
      <Box sx={{ textAlign: "center", width: 1 }} >
        <h1>Welcome {account?.name}</h1>
        <div>Click the demo links in the LeftNav menu to test out the Quick Create experience.</div>
      </Box>
    );
  }
  return (
    <Box ref={embedContainer} sx={{ width: 1, height: "600px", border: 1 }} />
  );

}

export default Report;