import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import {useEffect, useState } from "react"
import getDeviceApi from "../../api/get_device";
import {useNavigate } from "react-router-dom"

const Team = () => {
  const navigate= useNavigate()
  const [data, setData]= useState({data: {devices: []}})
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "deviceName",
      headerName: "Device",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params)=> {
        return <Button onClick={()=> navigate("/dashboard", {state: {deviceId: params.row._id}})} type={"button"} color={"primary"} variant={"contained"}>Truy cập thiết bị</Button>
      }
    }
  ];

  useEffect(()=> {
    (async ()=> {
      const result= await getDeviceApi()
      setData(result)
    })()
  }, [])

  return (
    <Box m="20px">
      <Header title="Device" subtitle="Managing the Device" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid getRowId={(row) => row._id} rows={data?.data?.devices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
