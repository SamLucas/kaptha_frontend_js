import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "src/components/Header";

import Cross from "src/pages/Search/Pages/CrossSearch";
import Cancer from "src/pages/Search/Pages/CancerSearch";
import Polyphenol from "src/pages/Search/Pages/PolyphenolSearch";

import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();

  return (
    <Header>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Cross" />
          <Tab label="Polyphenol" />
          <Tab label="Cancer" />
        </Tabs>
      </Paper>

      <Polyphenol ative={value === 1} />
      <Cancer ative={value === 2} />
      <Cross
        ative={value === 0}
        dataSearch={params && params.cancer && params.polifenol && params}
      />
    </Header>
  );
}
