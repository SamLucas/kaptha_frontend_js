import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "src/components/Header";

import PolyphenolGene from "src/pages/Search/Pages/PolyphenolGene";
import PolyphenolCancer from "src/pages/Search/Pages/PolyphenolCancer";
import Cancer from "src/pages/Search/Pages/Cancer";
import Polyphenol from "src/pages/Search/Pages/Polyphenol";
import Gene from "src/pages/Search/Pages/Gene";

import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
});

export default function CenteredTabs() {
  const params = useParams();

  const classes = useStyles();
  const [value, setValue] = React.useState(params.tp === "0" ? 0 : params.tp === "1" ? 4 : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  console.log(params)


  return (
    <Header>

      <h1>Search</h1>
      <p style={{
        marginBottom: 20
      }}>
        Select a search type and then select the entities to perform the search.
      </p>

      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Polyphenol - Cancer" />
          <Tab label="Cancer" />
          <Tab label="Polyphenol" />
          <Tab label="Gene" />
          <Tab label="Polyphenol - Gene" />
        </Tabs>
      </Paper>

      <PolyphenolCancer
        ative={value === 0}
        dataSearch={
          params &&
          params.cancergene &&
          params.polifenol &&
          params.tp === "0" &&
          params
        }
      />
      <Cancer ative={value === 1} />
      <Polyphenol ative={value === 2} />
      <Gene ative={value === 3} />
      <PolyphenolGene
        ative={value === 4}
        dataSearch={
          params &&
          params.cancergene &&
          params.polifenol &&
          params.tp === "1" &&
          params
        }
      />
    </Header>
  );
}
