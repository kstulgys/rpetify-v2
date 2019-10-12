import React from "react";
import {
  getRoundedWeight,
  getPlatesOnBar,
  getWorksetWeight,
  getRoundedWeightKg
} from "utils";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Text,
  Flex,
  Stack,
  Grid,
  Badge,
  IconButton
} from "@chakra-ui/core";

export default function WarmupContent({ sets, liftName }) {
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);
  const warmups = useSelector(state => state.warmups);
  const units = useSelector(state => state.units);
  const warmupSets = warmups.list[warmups.current].sets;
  // console.log("liftnameFromWarmup", liftName);

  const foundOneRM = () => {
    let mainOneRM = oneRepMax.find(({ name }) => name === liftName);
    if (mainOneRM) {
      return mainOneRM.oneRM;
    }
    let variantOneRM = variants.find(({ name }) => name === liftName);
    if (variantOneRM) {
      return variantOneRM.oneRM;
    }
  };

  const warmupWeight = getWorksetWeight({
    rpe: sets[0].rpe,
    reps: sets[0].reps,
    oneRM: foundOneRM()
  });

  const warmupWeightByUnit =
    units === "lbs" ? warmupWeight : Math.round(warmupWeight * 0.453592);

  return (
    <Box px="2" py="3" fontSize="xl" fontWeight="semibold" color="gray.200">
      {/* <Header /> */}
      {/* <Box as="hr" my="2" /> */}
      <WarmupSetsHead />
      {warmupSets.map((props, i) => {
        const weight = Math.round(warmupWeightByUnit * props.percent);
        return <WarmupSetRow key={props.id} weight={weight} {...props} i={i} />;
      })}
    </Box>
  );
}

function Header() {
  return (
    <Flex alignItems="baseline" justifyContent="space-between">
      <Text fontSize="xs" fontWeight="black" textTransform="uppercase">
        option
      </Text>
      <Stack isInline>
        <Badge>1st</Badge>
        <Badge>2nd</Badge>
        <Badge variantColor="red">3rd</Badge>
      </Stack>
    </Flex>
  );
}

function WarmupSetsHead() {
  return (
    <Grid
      my="2"
      fontSize="md"
      fontWeight="black"
      letterSpacing="wider"
      color="yellow.500"
      gap={2}
      gridTemplateColumns="1fr 5fr 6fr"
    >
      <Text textAlign="center">NO</Text>
      <Text textAlign="center">1st SET %</Text>
      <Text textAlign="center">PLATES</Text>
    </Grid>
  );
}

function WarmupSetRow({ weight, id, percent, reps, sets, i }) {
  const units = useSelector(state => state.units);
  // const barbellWeight = useSelector(state => state.barbellWeight);
  const barbellWeight = units === "lbs" ? 44 : 20;

  const workWeightByUnit =
    units === "lbs" ? getRoundedWeight(weight) : getRoundedWeightKg(weight);

  return (
    <Grid key={id} my="4" gap={2} gridTemplateColumns="1fr 5fr 6fr">
      <Text
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {i + 1}
      </Text>
      <Text textAlign="center">
        <Flex flexDirection="column">
          <Text fontSize="xs" lineHeight="0" fontWeight="bold">
            {workWeightByUnit}
          </Text>
          <Text>
            {sets} x {reps} @{Math.round(percent * 100)}%
          </Text>
        </Flex>
      </Text>
      <Text
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {getPlatesOnBar({ weight, units, barbellWeight })}
      </Text>
    </Grid>
  );
}
