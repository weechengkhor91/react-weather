import { useEffect, useRef, useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";

//icons
import SearchIcon from "@mui/icons-material/Search";

const Form = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const searchRef = useRef();

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();

    const data = searchRef.current.value;
    //fetch API
    props.onFetchData(data);
    // Clear the search term after form submission
    setSearchTerm("");
  };

  useEffect(() => {
    setSearchMessage(props.message);
  }, [props.message]);

  return (
    <>
      <Grid container spacing={3} sx={{ marginBottom: "30px" }}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmitForm}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  label="Search"
                  variant="filled"
                  value={searchTerm}
                  onChange={handleChangeInput}
                  fullWidth
                  size="small"
                  helperText={
                    searchMessage && (
                      <Box>
                        <Typography variant="body2">{searchMessage}</Typography>
                      </Box>
                    )
                  }
                  inputRef={searchRef}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="info"
                  className="btn-search"
                  data-testid="button-submit"
                >
                  <SearchIcon className="btn-search-icon" />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Form;
