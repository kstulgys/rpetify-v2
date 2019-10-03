import React from "react";
import { getRoundedWeight, getPlatesOnBar, getWorksetWeight } from "utils";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, Flex, Grid } from "@chakra-ui/core";

export default function WorkContent({ liftName, sets }) {
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);
  const units = useSelector(state => state.units);
  // const barbellWeight = useSelector(state => state.barbellWeight);
  const barbellWeight = units === "lbs" ? 44 : 20;

  let oneRM;
  let oneRMExist = oneRepMax.find(({ name }) => name === liftName);
  if (oneRMExist) {
    oneRM = oneRMExist.oneRM;
  } else {
    oneRM = variants.find(({ name }) => name === liftName).oneRM;
  }

  return (
    <Box px="2" py="3" fontSize="xl" fontWeight="semibold" color="gray.200">
      <Grid
        my="2"
        fontSize="md"
        fontWeight="black"
        letterSpacing="wider"
        color="yellow.500"
        gap={2}
        gridTemplateColumns="1fr 3fr 5fr"
      >
        <Text textAlign="center">NO</Text>
        <Text textAlign="center">VOLUME</Text>
        <Text textAlign="center">PLATES</Text>
      </Grid>

      {sets.map(({ id, reps, rpe, sets, percent }, i) => {
        const weight = getWorksetWeight({ rpe, reps, oneRM });

        const workWeightByUnit =
          units === "lbs" ? weight : Math.round(weight * 0.453592);

        return (
          <Grid key={id} my="4" gap={2} gridTemplateColumns="1fr 3fr 5fr">
            <Text textAlign="center">{i + 1}</Text>
            <Text textAlign="center">
              <Flex flexDirection="column">
                <Box as="span" lineHeight="0" fontSize="xs">
                  {getRoundedWeight(workWeightByUnit)}
                </Box>
                <Box as="span">
                  {reps}@{rpe} x {sets}
                </Box>
              </Flex>
            </Text>
            <Text textAlign="center">
              {getPlatesOnBar({
                weight: workWeightByUnit,
                units,
                barbellWeight
              })}
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}
