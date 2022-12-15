import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { DatasetCreateConfiguration } from './models/PowerBiQuickCreateModels';

import QuickCreateSDK from './services/QuickCreateSDK';

import { Box, CssBaseline } from '@mui/material';

import Banner from './components/Banner';
import LeftNav from './components/LeftNav';
import Report from './components/Report';


const App = () => {

  const [datasetCreateConfigurations, setDatasetCreateConfigurations] = useState<DatasetCreateConfiguration[]>([]);
  const [currentDatasetCreateConfiguration, setCurrentDatasetCreateConfiguration] = useState<DatasetCreateConfiguration>(null);

  useEffect(() => {
    const useEffectAsync = async () => {
      const createConfigurations = await QuickCreateSDK.GetSampleQuickCreateConfigurations();
      setDatasetCreateConfigurations(createConfigurations);
      console.log(createConfigurations);
    };
    useEffectAsync();

  }, []);

  return (
    <Box>
      <CssBaseline />
      <Banner />
      <Box sx={{ display: "flex" }} >
        <LeftNav
          currentDatasetCreateConfiguration={currentDatasetCreateConfiguration}
          datasetCreateConfigurations={datasetCreateConfigurations}
          setCurrentDatasetCreateConfiguration={setCurrentDatasetCreateConfiguration}
        />
        <Report
          currentDatasetCreateConfiguration={currentDatasetCreateConfiguration}
        />
      </Box>
    </Box>
  )
}

export default App;