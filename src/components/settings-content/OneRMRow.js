import React, { useState, useEffect } from "react";
import { changeOneRepMax } from "features/one-rep-max/slice";
import Select from "components/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  getRoundedWeight,
  getOneRepMax,
  getRoundedWeightKg,
  getKgWithDecimal,
  getOneRMByUnit
} from "utils";
import { Grid, Text, Flex } from "@chakra-ui/core";

export default function OneRMRow(props) {
  const { name, id, rpe, reps, shortName, weight, oneRM } = props;
  const units = useSelector(state => state.units);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(changeOneRepMax({ id, name, value: Number(value) }));
  };

  useEffect(() => {
    const value = getOneRepMax({ rpe, reps, weight });
    dispatch(changeOneRepMax({ id, name: "oneRM", value: Number(value) }));
  }, [id, rpe, reps, weight, dispatch]);

  const getDefaultWeight = () => {
    return units === "lbs"
      ? getRoundedWeight(weight)
      : getRoundedWeightKg(weight);
  };

  return (
    <Grid my="2" gridGap="2" gridTemplateColumns="1fr 1fr 1fr 1fr 1fr">
      <Flex align="center" justify="center">
        <Text textAlign="center">{shortName}</Text>
      </Flex>
      <Select
        name="weight"
        // defaultValue={defaultWeight}
        selected={getDefaultWeight()}
        onChange={handleChange}
        useWeights
      />
      <Select name="reps" onChange={handleChange} defaultValue={reps} useReps />
      <Select name="rpe" onChange={handleChange} defaultValue={rpe} useRpe />
      <Flex align="center" justify="center">
        <Text textAlign="center">{getOneRMByUnit(units, oneRM)}</Text>
      </Flex>
    </Grid>
  );
}
