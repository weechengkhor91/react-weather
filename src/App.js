//App.js

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./components/theme/theme";
import {
  Switch,
  Container,
  Grid,
  Typography,
  Stack,
  Box,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import IconWeather from "./assets/images/iconWeather.png";

//icons
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

//css
import "./App.css";
import Form from "./components/form/Form";

const App = () => {
  // state
  const [themeMode, setThemeMode] = useState(true);

  // function to handle toggle the dark mode
  const handleToggleTheme = () => {
    setThemeMode(!themeMode);
  };

  const [searchMessage, setSearchMessage] = useState(""); //
  const [locationWeather, setLocationWeather] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [searchRecord, setSearchRecord] = useState([]);

  const fetchData = async (data) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&APPID=d490880fd6515631aa72b5122eac260b`
      );
      if (!response.ok) {
        setSearchMessage("Not found");
        throw new Error("Not found");
      }
      const result = await response.json();

      const resultData = {
        id: uuidv4(),
        locationName: result.name,
        temperature: result.main.temp,
        lowTemperature: result.main.temp_min,
        highTemperature: result.main.temp_max,
        humidity: result.main.humidity,
        weatherStatus: result.weather[0].main,
        weatherIcon: result.weather[0].icon,
        currentDateTime: currentDateTime,
      };
      setLocationWeather(resultData);
      if (resultData) {
        setSearchRecord([...searchRecord, resultData]);
      }
    } catch (err) {
      console.log(err.message);
      setSearchMessage("The location did not found.");
    }
  };

  // Runs only once after initial render
  useEffect(() => {
    const date = new Date();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${(date.getHours() % 12 || 12)
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}${
      date.getHours() < 12 ? "am" : "pm"
    }`;
    setCurrentDateTime(`${formattedDate} ${formattedTime}`);
  }, []);

  // Format the date according to the specified format
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Using 24-hour format
  };
  const formattedDateTime = currentDateTime.toLocaleString("en-US", options);

  // function search location
  const handleSearchLocation = (location) => {
    const data = location;
    //fetch API
    fetchData(data);
  };

  // function delete location
  const handleDeleteLocation = (id) => {
    //console.log("delete location name", id);
    setSearchRecord((prevItems) => {
      const updatedData = prevItems.filter((item) => item.id !== id);
      return updatedData;
    });
  };

  return (
    <ThemeProvider theme={themeMode ? lightTheme : darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" className="py-5">
        <Box className="text-center pb-3 d-flex align-items-center justify-content-end">
          <Typography variant="body1" color="primary">
            Theme Mode
          </Typography>
          <Switch
            checked={themeMode}
            onChange={handleToggleTheme}
            data-testid="button-toggle"
          />
        </Box>
        {/* Search Form */}
        <Form onFetchData={fetchData} message={searchMessage} />

        <div className="height-70"></div>

        {/* Card */}
        <Card className="overflow-visible">
          <CardContent>
            {/* Location Weather Detail  */}
            {locationWeather ? (
              <Box className="p-relative">
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" color="secondary">
                      Today's Weather
                    </Typography>

                    {/* Location Weather Wrapper Desktop*/}
                    <Box
                      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                    >
                      <Typography variant="h3" color="primary">
                        {locationWeather.temperature} °
                      </Typography>
                      <Box className="d-flex">
                        <Typography variant="subtitle1" color="secondary">
                          H: {locationWeather.highTemperature}°
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography variant="subtitle1" color="secondary">
                          L: {locationWeather.lowTemperature}°
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "700" }}
                        >
                          {locationWeather.locationName}
                        </Typography>
                        <Typography variant="subtitle2">
                          {formattedDateTime}
                        </Typography>
                        <Typography variant="subtitle2">
                          Humidity: {locationWeather.humidity} %
                        </Typography>
                        <Typography variant="subtitle2">
                          {locationWeather.weatherStatus}
                        </Typography>
                      </Stack>
                    </Box>
                    {/* Location Weather Wrapper Desktop - End*/}
                    {/* Location Weather Wrapper Mobile*/}
                    <Box
                      sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={6} sm={6}>
                          <Typography variant="h3" color="primary">
                            {locationWeather.temperature}°
                          </Typography>
                          <Box className="d-flex">
                            <Typography variant="subtitle1" color="secondary">
                              H: {locationWeather.highTemperature}°
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography variant="subtitle1" color="secondary">
                              L: {locationWeather.lowTemperature}°
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "700" }}
                          >
                            {locationWeather.locationName}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} alignSelf="end">
                          <Stack
                            direction="column-reverse"
                            justifyContent="flex-end"
                            alignItems="end"
                            spacing={2}
                          >
                            <Typography variant="subtitle2" className="mb-1">
                              {formattedDateTime}
                            </Typography>
                            <Typography variant="subtitle2" className="mb-1">
                              Humidity: {locationWeather.humidity}%
                            </Typography>
                            <Typography variant="subtitle2" className="mb-1">
                              {locationWeather.weatherStatus}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* Location Weather Wrapper Mobile - End */}
                  </Grid>

                  {/* Display Weather Icon Desktop  */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                    className="weather-icon"
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${locationWeather.weatherIcon}@4x.png`}
                      alt="Weather"
                    />
                  </Grid>
                  {/* Display Weather Icon Desktop - End */}

                  {/* Display Weather Icon Mobile */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                    className="weather-icon"
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${locationWeather.weatherIcon}@4x.png`}
                      alt="Weather"
                    />
                  </Grid>
                  {/* Display Weather Icon Mobile - End */}
                </Grid>
              </Box>
            ) : (
              <Box className="p-relative">
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" color="secondary">
                      Today's Weather
                    </Typography>

                    {/* Location Weather Wrapper Desktop*/}
                    <Box
                      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                    >
                      <Typography variant="h3" color="primary">
                        - °
                      </Typography>
                      <Box className="d-flex">
                        <Typography variant="subtitle1" color="secondary">
                          {" "}
                          H: -{" "}
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography variant="subtitle1" color="secondary">
                          {" "}
                          L: -{" "}
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "700" }}
                        >
                          City, Country
                        </Typography>
                        <Typography variant="subtitle2">
                          {formattedDateTime}
                        </Typography>
                        <Typography variant="subtitle2">
                          {" "}
                          Humidity: -{" "}
                        </Typography>
                        <Typography variant="subtitle2">Weather</Typography>
                      </Stack>
                    </Box>
                    {/* Location Weather Wrapper Desktop - End*/}
                    {/* Location Weather Wrapper Mobile*/}
                    <Box
                      sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={6} sm={6}>
                          <Typography variant="h3" color="primary">
                            - °
                          </Typography>
                          <Box className="d-flex">
                            <Typography variant="subtitle1" color="secondary">
                              {" "}
                              H: -{" "}
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography variant="subtitle1" color="secondary">
                              {" "}
                              L: -{" "}
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "700" }}
                          >
                            City, Country
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} alignSelf="end">
                          <Stack
                            direction="column-reverse"
                            justifyContent="flex-end"
                            alignItems="end"
                            spacing={2}
                          >
                            <Typography variant="subtitle2" className="mb-1">
                              {formattedDateTime}
                            </Typography>
                            <Typography variant="subtitle2" className="mb-1">
                              {" "}
                              Humidity: -{" "}
                            </Typography>
                            <Typography variant="subtitle2" className="mb-1">
                              Weather
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* Location Weather Wrapper Mobile - End */}
                  </Grid>

                  {/* Display Weather Icon Desktop  */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                    className="weather-icon"
                  >
                    <img src={IconWeather} alt="Weather" />
                  </Grid>
                  {/* Display Weather Icon Desktop  - End */}

                  {/* Display Weather Icon Mobile  */}
                  <Grid
                    item
                    xs={12}
                    sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                    className="weather-icon"
                  >
                    <img
                      src={IconWeather}
                      alt="Weather"
                      className="weather-icon"
                    />
                  </Grid>
                  {/* Display Weather Icon Mobile - End  */}
                </Grid>
              </Box>
            )}
            {/* Location Weather Detail - End  */}

            <div className="height-20"></div>

            {/* Search History Record */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="secondary">
                      Search History
                    </Typography>

                    {searchRecord.length > 0 ? (
                      searchRecord.map((item, index) => (
                        <div key={item.id}>
                          <Box
                            sx={{
                              // backgroundColor: "rgb(0 0 0 / 10%)",
                              backgroundColor: "secondary.light",
                              padding: "8px",
                              borderRadius: "10px",
                              marginBottom: "15px",
                              alignItems: "center",
                            }}
                          >
                            {/* Desktop only */}
                            <Box
                              sx={{
                                display: {
                                  xs: "none",
                                  sm: "none",
                                  md: "block",
                                },
                              }}
                            >
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={12} md={4}>
                                  <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                  >
                                    {item.locationName}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={1}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      color="secondary"
                                    >
                                      {item.currentDateTime}
                                    </Typography>

                                    <IconButton
                                      type="submit"
                                      onClick={() =>
                                        handleSearchLocation(
                                          `${item.locationName}`
                                        )
                                      }
                                    >
                                      <SearchIcon
                                        sx={{
                                          backgroundColor: "#fff",
                                          padding: "3px",
                                          borderRadius: "50%",
                                          fontSize: "26px",
                                        }}
                                      />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteLocation(item.id)
                                      }
                                    >
                                      <DeleteIcon
                                        sx={{
                                          backgroundColor: "#fff",
                                          padding: "3px",
                                          borderRadius: "50%",
                                          fontSize: "26px",
                                        }}
                                      />
                                    </IconButton>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Box>
                            {/* Desktop only */}
                            {/* Mobile only */}
                            <Box
                              sx={{
                                display: {
                                  xs: "block",
                                  sm: "block",
                                  md: "none",
                                },
                              }}
                            >
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8} sm={8} md={4}>
                                  <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                  >
                                    {item.locationName}
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    color="secondary"
                                  >
                                    {item.currentDateTime}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={8}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={1}
                                  >
                                    <IconButton
                                      type="submit"
                                      data-testid="button-submit"
                                      onClick={() =>
                                        handleSearchLocation(
                                          `${item.locationName}`
                                        )
                                      }
                                    >
                                      <SearchIcon
                                        className="btn-search-icon002"
                                        sx={{
                                          backgroundColor: "#fff",
                                          padding: "3px",
                                          borderRadius: "50%",
                                          fontSize: "26px",
                                        }}
                                      />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteLocation(item.id)
                                      }
                                    >
                                      <DeleteIcon
                                        sx={{
                                          backgroundColor: "#fff",
                                          padding: "3px",
                                          borderRadius: "50%",
                                          fontSize: "26px",
                                        }}
                                      />
                                    </IconButton>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Box>
                            {/* Mobile only */}
                          </Box>
                        </div>
                      ))
                    ) : (
                      <>
                        <Typography variant="body1">No Record </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* Search History Record - End */}
          </CardContent>
        </Card>
      </Container>

      {/* 
      <Notification />
      <Fetch /> */}
    </ThemeProvider>
  );
};

export default App;
