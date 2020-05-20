import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  brand: {
    flexGrow: 1,
    fontFamily: "Courgette, cursive",
  },
}));

export default function AppHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.brand}>
            Jira Task Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
