import React from 'react';
import { useState, useContext } from 'react';
import { useIsAuthenticated } from "@azure/msal-react";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

import { DatasetCreateConfiguration } from '../models/PowerBiQuickCreateModels'

import MenuIcon from '@mui/icons-material/Menu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchemaIcon from '@mui/icons-material/Schema';

import DataLoading from './DataLoading';
import { CssVarsProviderConfig } from '@mui/system';

interface ILeftNavProps {
  datasetCreateConfigurations: DatasetCreateConfiguration[];
  currentDatasetCreateConfiguration: DatasetCreateConfiguration;
  setCurrentDatasetCreateConfiguration: (datasetCreateConfiguration: DatasetCreateConfiguration) => void;
}

const LeftNav = ({ datasetCreateConfigurations, currentDatasetCreateConfiguration, setCurrentDatasetCreateConfiguration } : ILeftNavProps) => {
  const isAuthenticated = useIsAuthenticated();
  
  const expandedLeftNavWidth = 240;
  const colapsedLeftNavWidth = 48;
  const [leftNavWidth, setLeftNavWidth] = useState(expandedLeftNavWidth);
  const [leftNavExpanded, setLeftNavExpanded] = useState(true);

  const leftNavTopBoxProps: SxProps = { width: 1, color: "#000000", backgroundColor: "#F3F2F1", mt: "46px" };

  const leftNavOuterBoxProps: SxProps = { width: 1, display: "flex" };

  const leftNavInnerBoxLeftProps: SxProps = {
    width: "48px",
    minWidth: "48px",
    textAlign: "center",
    p: 0,
    pt: "4px",
    color: "#444444"
  };

  const avatarProps: SxProps = { width: "22px", height: "22px", m: 0, mt: "2px" };

  const leftNavInnerBoxTenantNameProps: SxProps = {
    pt: "2px",
    pl: "4px",
    width: leftNavExpanded ? 1 : 0,
    maxHeight: "28px;"
  };

  const leftNavTenantNameProps: SxProps = {
    fontSize: "18px", width: 1, color: "#111111", pt: "4px"
  };

  const leftNavInnerBoxRightProps: SxProps = {
    py: 0,
    pl: "4px",
    width: leftNavExpanded ? 1 : 0, color: "black"
  };

  const leftNavHeaderProps: SxProps = {
    fontSize: "18px", width: 1, color: "#444444", pl: 0, mb: 0, my: 0, pt: "2px"
  };

  const leftNavListProps: SxProps = {
    m: 0, p: 0, pb: "8px", width: 1
  };

  const toggleLeftNavWidth = () => {
    if (leftNavExpanded) {
      setLeftNavExpanded(false);
      setLeftNavWidth(colapsedLeftNavWidth);
    }
    else {
      setLeftNavExpanded(true);
      setLeftNavWidth(expandedLeftNavWidth);
    }
  };

  return (
    <Drawer variant='permanent' anchor='left'
    sx={{ width: leftNavWidth, display: isAuthenticated ? "flex" : "none", zIndex: 1, pb: 3, overflow:"hidden", height:"100%"}}
    PaperProps={{ sx: { width: leftNavWidth, backgroundColor: "#EEEEEE", overflow:"hidden", height:"100%" } }}  >

      <Box sx={leftNavTopBoxProps} >

        <Box sx={leftNavOuterBoxProps} >
          <Box sx={leftNavInnerBoxLeftProps} >
            <MenuIcon sx={avatarProps} onClick={toggleLeftNavWidth} />
          </Box>
          <Box sx={leftNavInnerBoxTenantNameProps} >
            <Typography sx={leftNavTenantNameProps} variant='h5' fontSize={20} >{"Quick Create Demos"}</Typography>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: "#CCCCCC" }} />

        <Box sx={leftNavOuterBoxProps} >
          <Box sx={leftNavInnerBoxLeftProps} >
            <AssessmentIcon sx={avatarProps} />
          </Box>
          {leftNavExpanded &&
            <Box sx={leftNavInnerBoxRightProps}>
              <Typography sx={leftNavHeaderProps} variant='subtitle1' >Reports</Typography>
                <List disablePadding dense sx={leftNavListProps}>
                  {datasetCreateConfigurations && datasetCreateConfigurations.map((config: DatasetCreateConfiguration) => (
                    <ListItem button key={config.name}
                      sx={{
                        py: "4px", pl: "6px", width: 1,
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "$222222",
                        backgroundColor: ( config.name == currentDatasetCreateConfiguration?.name ) ? "#DDDDDD" : "#F3F2F1",
                        borderLeft: ( ( config.name == currentDatasetCreateConfiguration?.name ) ) ? "4px solid #607D8B" : ""
                      }}
                      onClick={(eventArgs) => {
                        setCurrentDatasetCreateConfiguration(config);
                    }} >{config.name}</ListItem>
                  ))}
                </List>
            </Box>
          }
        </Box>

      </Box>
    </Drawer >
  )
}

export default LeftNav