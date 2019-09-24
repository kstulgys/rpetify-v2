import React, { useState, useEffect } from "react";
import { changeOneRepMax } from "features/one-rep-max/slice";
import Select from "./Select";
import { useSelector, useDispatch } from "react-redux";
import { getRoundedLbs, getOneRepMax, getWorksetWeight } from "../utils";
import { Grid, Text } from "@chakra-ui/core";

export default function OneRMRow(props) {
  const { name, id, rpe, reps, shortName, weight, oneRM } = props;
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(changeOneRepMax({ id, name, value }));
  };

  useEffect(() => {
    const value = getOneRepMax({ rpe, reps, weight });
    dispatch(changeOneRepMax({ id, name: "oneRM", value }));
  }, [id, rpe, reps, weight, dispatch]);

  const kg = false;
  const weightsArray = () => {
    return Array.from({ length: kg ? 400 : 800 }, (_, i) => {
      if (i + 1 >= 100 && ((i + 1) % 10 === 5 || (i + 1) % 10 === 0)) {
        return i + 1;
      }
      return null;
    }).filter(Boolean);
  };
  const repsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const rpeArray = [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

  return (
    <Grid my="2" gridGap="2" gridTemplateColumns="1fr 1fr 1fr 1fr 1fr">
      <Text textAlign="center">{shortName}</Text>
      <Select
        name="weight"
        defaultValue={weight}
        onChange={handleChange}
        items={weightsArray()}
      />
      <Select
        name="reps"
        onChange={handleChange}
        defaultValue={reps}
        items={repsArray}
      />
      <Select
        name="rpe"
        onChange={handleChange}
        defaultValue={rpe}
        items={rpeArray}
      />
      <Text textAlign="center">{oneRM}</Text>
    </Grid>
  );
}
