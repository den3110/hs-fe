import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import ChartNew from "../../components/ChartNew";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import getDataApi from "../../api/get_data";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import GoogleMapReact from "google-map-react";

const Dashboard = () => {
  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627,
  //   },
  //   zoom: 11,
  // };
  const ref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data2, setData2] = useState({ data: { data: [] } });
  const data = [
    {
      id: "rsrp",
      color: tokens("dark").greenAccent[500],
      data: data2?.data?.data?.map((item) => ({
        x: moment(item?.createdDate).format("mm:ss"),
        y: item?.rsrp,
      })),
    },
    {
      id: "rsrq",
      color: tokens("dark").blueAccent[300],
      data: data2?.data?.data?.map((item) => ({
        x: moment(item?.createdDate).format("mm:ss"),
        y: item?.rsrq,
      })),
    },
    {
      id: "sinr",
      color: tokens("dark").redAccent[200],
      data: data2?.data?.data?.map((item) => ({
        x: moment(item?.createdDate).format("HH:mm"),
        y: item?.sinr,
      })),
    },
  ];
  useEffect(() => {
    if (data2?.data?.data?.[0]?.latitude) {
      ref.current.innerHTML = `<iframe
      title={"s"}
      src="https://maps.google.com/maps?q=${data2?.data?.data?.[0]?.latitude},${data2?.data?.data?.[0]?.longitude}&hl=es;z=14&amp;output=embed"
      width="100%"
      height="250px"
      style="border: 0"
      allowFullScreen
      loading="lazy"
      referrer-policy="no-referrer-when-downgrade"
    />`;
    }
  }, [data2?.data?.data]);
  useEffect(() => {
    if (location.state?.deviceId) {
    } else {
      swal(
        "Thông báo",
        "Bạn cần phải có id device để truy cập trang này",
        "error"
      ).then(() => navigate("/team", { replace: true }));
    }
  }, [location.state]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getDataApi();
        setData2(result);
        const intervalId = setInterval(async () => {
          const result = await getDataApi();
          setData2(result);
        }, 60000);
      } catch (error) {
        navigate("/login", {replace: true})        
      }
    })();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box></Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={data} />
            {/* <ChartNew /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Lịch sử gần đây
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box color={colors.grey[100]} style={{ flex: 1 }}>
              {"Pci"}
            </Box>
            <Box color={colors.grey[100]} style={{ flex: 1 }}>
              {"Rsrp"}
            </Box>
            <Box color={colors.grey[100]} style={{ flex: 1 }}>
              {"Rsrq"}
            </Box>
            <Box color={colors.grey[100]} style={{ flex: 1 }}>
              {"Sinr"}
            </Box>
            <Box color={colors.grey[100]} style={{ flex: 1 }}>
              {"Longitude"}
            </Box>
            <Box color={colors.grey[100]} style={{ flex: 1 }}>
              {"Latitude"}
            </Box>
          </Box>
          {data2?.data?.data.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box color={colors.grey[100]} style={{ flex: 1 }}>
                {transaction.pci}
              </Box>
              <Box color={colors.grey[100]} style={{ flex: 1 }}>
                {transaction.rsrp}
              </Box>
              <Box color={colors.grey[100]} style={{ flex: 1 }}>
                {transaction.rsrq}
              </Box>
              <Box color={colors.grey[100]} style={{ flex: 1 }}>
                {transaction.sinr}
              </Box>
              <Box color={colors.grey[100]} style={{ flex: 1 }}>
                {transaction.longitude}
              </Box>
              <Box color={colors.grey[100]} style={{ flex: 1 }}>
                {transaction.latitude}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            cellid
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Typography
              variant="h3"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {data2?.data?.data?.[0]?.cellId} Unit
            </Typography>
            <Typography
              variant="h5"
              // color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {moment(data2?.data?.data?.[0]?.createdDate).format(
                "DD-MM-YYYY HH:mm"
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            pci
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Typography
              variant="h3"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {data2?.data?.data?.[0]?.pci} Unit
            </Typography>
            <Typography
              variant="h5"
              // color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {moment(data2?.data?.data?.[0]?.createdDate).format(
                "DD-MM-YYYY HH:mm"
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Box height="100%">
            <div ref={ref} className="wpb_map_wraper"></div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
