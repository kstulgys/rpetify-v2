import React, { useState, useEffect } from "react";

import AppProvider, { useApp } from "context";
import { percentageLookup } from "utils";
import WarmupModal from "WarmupModal";
import WarksetModal from "WorksetModal";
import { getOneRM } from "utils";
import Select from "./Select";
import Modal from "./Modal";
import { getRoundedLbs, getPlatesOnBar, getWorksetWeight } from "../utils";
import { Box, Text, Flex, Stack, Icon, Grid } from "@chakra-ui/core";

export default function WorkoutCard({
  id = "",
  sets = [],
  name: liftName = ""
}) {
  const {
    state: { lifts = [] } = {},
    handleAddSet,
    handleRemoveLift,
    handleLIftNameChanged
  } = useApp();
  return (
    <Stack
      w="full"
      maxW={["2xl"]}
      rounded="lg"
      shadow="lg"
      p="5"
      my="1"
      mb="3"
      fontSize="lg"
      fontWeight="semibold"
      color="gray.800"
      bg="gray.100"
    >
      <Flex alignItems="center" justifyContent="space-between" pb="2">
        <Box p="1">
          <Icon name="minus" onClick={() => handleRemoveLift(id)} />
        </Box>
        <Box w="50%">
          <Select
            items={["Squat", "Deadlift"]}
            onChange={e => handleLIftNameChanged(id, e)}
          />
        </Box>
        <Box p="1">
          <Icon name="add" onClick={() => handleAddSet(id)} />
        </Box>
      </Flex>
      <Flex fontWeight="black" color="teal.500" justify="space-around">
        <Text>REPS</Text>
        <Text>RPE</Text>
        <Text>SETS</Text>
      </Flex>
      {sets.map((props, i) => {
        return (
          <Grid my="1" gridGap="3" gridTemplateColumns="1fr 1fr 1fr">
            <Select items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
            <Select items={[6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]} />
            <Select items={[1, 2, 3, 4, 5]} />
          </Grid>
          // <WorksetRow
          //   i={i}
          //   key={props.id}
          //   liftId={id}
          //   liftName={liftName}
          //   {...props}
          // />
        );
      })}

      <Flex
        fontWeight="black"
        color="teal.500"
        mt="2"
        justifyContent="space-evenly"
      >
        <Modal trigger="warmup">
          <WarmupContent liftName={liftName} workset={sets[0]} />
        </Modal>
        <Modal trigger="work">
          <WorkContent liftName={liftName} worksets={sets} />
        </Modal>
      </Flex>
    </Stack>
  );
}

function WarmupContent({ type, liftName, workset: { rpe, reps } }) {
  const { state: { lifts = [], warmupSets = [] } = {} } = useApp();
  const getOneRM = () => lifts.find(({ name }) => name === liftName).oneRM;
  const getWeight = () => getWorksetWeight(rpe, reps, getOneRM());
  const getRoundedWeight = percent => {
    return getRoundedLbs(Math.round(getWeight() * (percent / 100)));
  };
  return (
    <Box py="3" fontSize="xl" fontWeight="semibold">
      <Grid
        my="2"
        fontSize="md"
        fontWeight="black"
        letterSpacing="wider"
        color="teal.500"
        gap={2}
        gridTemplateColumns="1fr 3fr 5fr"
      >
        <Text textAlign="center">NO</Text>
        <Text textAlign="center">1st SET %</Text>
        <Text textAlign="center">PLATES</Text>
      </Grid>

      {warmupSets.map(({ id, percentOfFirstWorksetLoad, reps, sets }, i) => {
        return (
          <Grid my="2" gap={2} gridTemplateColumns="1fr 3fr 5fr">
            <Text textAlign="center">{i + 1}</Text>
            <Text textAlign="center">
              {sets} x {reps} @{percentOfFirstWorksetLoad}%
            </Text>
            <Text textAlign="center">
              {getRoundedWeight(percentOfFirstWorksetLoad)}
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}

function WorkContent({ liftName, worksets }) {
  // const { state: { lifts = [], warmupSets = [] } = {} } = useApp();
  // const getOneRM = () => lifts.find(({ name }) => name === liftName).oneRM;
  // const getWeight = () => getWorksetWeight(rpe, reps, getOneRM());
  // const getRoundedWeight = percent => {
  //   return getRoundedLbs(Math.round(getWeight() * (percent / 100)));
  // };
  const { state: { lifts = [] } = {} } = useApp();
  const getOneRM = () => lifts.find(({ name }) => name === liftName).oneRM;

  const getRoundedWeight = (_rpe, _reps, _oneRM) => {
    return getRoundedLbs(Math.round(getWorksetWeight(_rpe, _reps, _oneRM)));
  };
  return (
    <Box py="3" fontSize="xl" fontWeight="semibold">
      <Grid
        my="2"
        fontSize="md"
        fontWeight="black"
        letterSpacing="wider"
        color="teal.500"
        gap={2}
        gridTemplateColumns="1fr 3fr 5fr"
      >
        <Text textAlign="center">NO</Text>
        <Text textAlign="center">VOLUME</Text>
        <Text textAlign="center">PLATES</Text>
      </Grid>

      {worksets.map(({ id, reps, rpe, sets }, i) => {
        return (
          <Grid my="2" gap={2} gridTemplateColumns="1fr 3fr 5fr">
            <Text textAlign="center">{i + 1}</Text>
            <Text textAlign="center">
              {reps} @{rpe}% x {sets}
            </Text>
            <Text textAlign="center">
              {getRoundedWeight(rpe, reps, getOneRM())}
            </Text>
            <Text textAlign="center">
              {getPlatesOnBar(getRoundedWeight(rpe, reps, getOneRM()))}
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}

// {worksets.map(({ id, reps, rpe, sets }, i) => {
//   return (
//     <div key={id} className="table-row font-medium text-xl">
//       {/* <div className="table-cell p-1 text-left ">{i + 1}.</div> */}
//       <div className="table-cell p-1 ">
//         <div className=" flex items-baseline justify-center">
//           <span className="">
//             {reps} @{rpe}% x {sets}
//           </span>
//           <span className="ml-1 text-xs">
//             {getRoundedWeight(rpe, reps, getOneRM())}
//           </span>
//         </div>
//       </div>

//       <div className="table-cell p-1 ">
//         <div className="flex justify-center">
//           {getPlatesOnBar(getRoundedWeight(rpe, reps, getOneRM()))}
//         </div>
//       </div>
//     </div>
//   );
// })}
