import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeToKg, changeToLbs } from "features/weight-units/slice";
import { Box, Text, Flex, Grid, Switch, Link } from "@chakra-ui/core";
import OneRMRow from "./OneRMRow";
import Variants from "./Variants";

export default function SettingsContent() {
  const oneRepMax = useSelector(state => state.oneRepMax);
  return (
    <Box width="full" fontWeight="bold" color="gray.300">
      <SettingsHeader />
      <OneRMHeader />
      {oneRepMax.map(props => {
        return <OneRMRow key={props.id} {...props} />;
      })}
      <Variants />
      <SettingsFooter />
    </Box>
  );
}

function SettingsHeader() {
  const dispatch = useDispatch();
  const units = useSelector(state => state.units);

  return (
    <Box mb="4" mt="1">
      <Flex mx="auto" align="center" justify="center">
        <Text fontSize="xs" fontWeight="black" textTransform="uppercase">
          estimated one rep max
        </Text>
        <Text mx="2" fontSize="xs" fontWeight="black" textTransform="uppercase">
          ({units})
        </Text>
        <Switch
          isChecked={units === "lbs" ? true : false}
          color="yellow"
          onChange={() => {
            units === "lbs" ? dispatch(changeToKg()) : dispatch(changeToLbs());
          }}
        />
      </Flex>
    </Box>
  );
}

function OneRMHeader() {
  return (
    <Grid
      fontWeight="black"
      letterSpacing="wider"
      color="yellow.500"
      gap={2}
      gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
    >
      <Text textAlign="center">LIFT</Text>
      <Text textAlign="center">WEIGHT</Text>
      <Text textAlign="center">REPS</Text>
      <Text textAlign="center">RPE</Text>
      <Text textAlign="center">oneRM</Text>
    </Grid>
  );
}

function SettingsFooter() {
  return (
    <Box mt="6">
      <Box
        fontWeight="normal"
        fontSize="xs"
        color="gray.300"
        textAlign="center"
      >
        <Text mx="auto">
          Make sure you take screenshots of your one rep max weights. This app
          is improving and there might be some breaking changes in the future.
        </Text>
        <Text mx="auto">
          If you find any bugs or have feature request e.g. custom plates on the
          bar, or custom warmup sets, please send me an email at
          <Link color="yellow.500" ml="1" textDecoration="underline">
            karolis.stulgys@gmail.com
          </Link>
        </Text>
      </Box>
      <Flex mt="6">
        <Text mx="auto" fontSize="xs" color="gray.300">
          <Flex align="center">
            <Box as="span">Made with</Box>
            <Box
              h="4"
              mx="1"
              as="img"
              src="https://img.icons8.com/material/24/f6ad55/like--v1.png"
            />{" "}
            <Box as="span">by</Box>
            <Link
              color="yellow.500"
              ml="1"
              fontWeight="black"
              textDecoration="underline"
              href="https://imkarolis.com/"
              target="_blank"
            >
              imkarolis
            </Link>
          </Flex>
        </Text>
      </Flex>
    </Box>
  );
}
