import React, { useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Spellcheck";
import GenerateIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { checkInput, parse } from "../utils/parser";
import { post } from "../utils/httpClient";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
  },
  storyIdField: {
    width: "30%",
  },
  textField: {
    width: "80%",
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  example: {
    backgroundColor: "#FFF7D0",
  },
  success: {
    color: "green",
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
}));

export default function Home() {
  const [storyId, setStoryId] = useState("");
  const [inputData, setInputData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setError] = useState(false);
  const [isValidInput, setValidInput] = useState(false);
  const [withDefaultTasks, setDefaultTasks] = useState(false);
  const classes = useStyles();

  function resetState() {
    setStoryId("");
    setInputData("");
    setErrorMsg("");
    setError(false);
    setValidInput(false);
    setDefaultTasks(false);
  }

  function clearValidation() {
    setValidInput(false);
    setError(false);
  }

  function handleStoryIdChange(event) {
    setStoryId(event.target.value);
  }

  function handleInputDataChange(event) {
    setInputData(event.target.value);
  }

  function handleDefaultTasks(event) {
    setDefaultTasks(event.target.checked);
  }

  function handleClear() {
    resetState();
  }

  function handleCheck(input) {
    clearValidation();
    try {
      if (storyId === "") {
        throw new Error("You need to provide the ID of the story.");
      }
      checkInput(input);
      setValidInput(true);
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
    }
  }

  async function handleGenerate(storyId, input, defaultTasks) {
    clearValidation();
    const json = parse(storyId, input, defaultTasks);
    const isOk = await post("/", json);
    if (isOk) {
      alert("Generated tasks successfully! :)");
    } else {
      alert("The response is not ok :( Check if the tasks are generated...");
    }
  }

  function renderError(isError, errorMsg) {
    if (isError)
      return (
        <Typography variant="subtitle1" color="error">
          <span role="img" aria-label="alert">
            ⚠️
          </span>{" "}
          {errorMsg}
        </Typography>
      );

    return null;
  }

  function renderSuccess(isValidInput, classes) {
    if (isValidInput)
      return (
        <Typography variant="subtitle1" className={classes.success}>
          <span role="img" aria-label="alert">
            ✔️
          </span>{" "}
          Input data is valid.
        </Typography>
      );

    return null;
  }

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h5">Write Your Tasks</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.storyIdField}
          label="Write your Story-ID here"
          value={storyId}
          onChange={handleStoryIdChange}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.textField}
          label="Write your Tasks here"
          multiline
          rowsMax={Infinity}
          value={inputData}
          onChange={handleInputDataChange}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={withDefaultTasks}
              onChange={handleDefaultTasks}
              value="withDefaultTasks"
            />
          }
          label="With default tasks"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleClear}
        >
          <ClearIcon className={classes.icon} />
          Clear Input
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleCheck(inputData)}
        >
          <CheckIcon className={classes.icon} />
          Check Input
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => handleGenerate(storyId, inputData, withDefaultTasks)}
        >
          <GenerateIcon className={classes.icon} />
          Generate Tasks
        </Button>
        {renderError(isError, errorMsg)}
        {renderSuccess(isValidInput, classes)}
      </Grid>
      <Grid item xs={4}>
        <strong>Example Input:</strong>
        <br />
        <div className={classes.example}>
          <p>
            TI Here is your test idea <br />
            T First task for test idea <br />
            T Second task for test idea <br />
            T Third task for test idea <br /> <br />
            TI Here is another test idea <br />
            T First task for another test idea <br />
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
