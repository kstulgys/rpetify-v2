import React from "react";
import { getRoundedLbs, getPlatesOnBar, getWorksetWeight } from "utils";
import {
  removeWorkout,
  addSet,
  changeWorkoutName
} from "features/workouts/slice";
import { useSelector, useDispatch } from "react-redux";
import Select from "./Select";
import Modal from "./Modal";
import {
  Box,
  Text,
  Flex,
  Stack,
  Grid,
  Badge,
  IconButton
} from "@chakra-ui/core";
import SetRow from "./SetRow";

export default function WorkoutCard({ id: workoutId, sets, name: liftName }) {
  return (
    <Stack
      w="full"
      maxW={["md"]}
      rounded="lg"
      shadow="lg"
      p="5"
      my="1"
      mb="3"
      fontSize="lg"
      fontWeight="bold"
      bg="gray.700"
    >
      <WorkoutHeader workoutId={workoutId} liftName={liftName} />
      <WorkoutBody sets={sets} workoutId={workoutId} />
      <WorkoutFooter liftName={liftName} sets={sets} />
    </Stack>
  );
}

function WorkoutHeader({ workoutId, liftName }) {
  const dispatch = useDispatch();
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);

  const mainLiftNames = oneRepMax.map(({ name }) => name);
  const variantsNames = variants.map(({ name }) => name);
  const liftNames = [...mainLiftNames, ...variantsNames];

  return (
    <Flex align="center" justify="space-between">
      <Box>
        <IconButton
          icon="close"
          size="md"
          bg="gray.200"
          onClick={() => dispatch(removeWorkout({ id: workoutId }))}
        />
      </Box>
      <Box w="50%">
        <Select
          items={liftNames}
          defaultValue={liftName}
          onChange={e =>
            dispatch(changeWorkoutName({ workoutId, value: e.target.value }))
          }
        />
      </Box>
      <Box>
        <IconButton
          icon="add"
          size="md"
          bg="gray.200"
          onClick={() => dispatch(addSet({ id: workoutId }))}
        />
      </Box>
    </Flex>
  );
}

function WorkoutBody({ sets, workoutId }) {
  return (
    <Box mt="6">
      <Flex mb="2" fontWeight="black" color="gray.300" justify="space-around">
        <Text>REPS</Text>
        <Text>RPE</Text>
        <Text>SETS</Text>
      </Flex>
      {sets.map((props, setIdx, arr) => {
        return (
          <SetRow
            key={props.id}
            {...props}
            workoutId={workoutId}
            setIdx={setIdx}
            arr={arr}
          />
        );
      })}
    </Box>
  );
}

function WorkoutFooter({ liftName, sets }) {
  return (
    <Flex
      mt="3"
      fontWeight="black"
      color="yellow.500"
      justifyContent="space-evenly"
    >
      <Modal trigger="warmup">
        <WarmupContent liftName={liftName} sets={sets} />
      </Modal>
      <Modal trigger="work">
        <WorkContent liftName={liftName} sets={sets} />
      </Modal>
    </Flex>
  );
}

function WarmupContent({ sets, liftName }) {
  // const { rpe: worksetRpe, reps: worksetReps } = sets[0];
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);
  const warmups = useSelector(state => state.warmups);
  const warmupSets = warmups.list[warmups.current].sets;

  let oneRM;
  let oneRMExist = oneRepMax.find(({ name }) => name === liftName);
  if (oneRMExist) {
    oneRM = oneRMExist.oneRM;
  } else {
    oneRM = variants.find(({ name }) => name === liftName).oneRM;
  }
  const warmupWeight = getWorksetWeight({
    rpe: sets[0].rpe,
    reps: sets[0].reps,
    oneRM
  });

  return (
    <Box px="2" py="3" fontSize="xl" fontWeight="semibold">
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

      <Box as="hr" my="2" />
      <Grid
        fontSize="md"
        fontWeight="black"
        letterSpacing="wider"
        color="gray.900"
        gap={2}
        gridTemplateColumns="1fr 5fr 6fr"
      >
        <Text textAlign="center">NO</Text>
        <Text textAlign="center">1st SET %</Text>
        <Text textAlign="center">PLATES</Text>
      </Grid>

      {warmupSets.map(({ id, percent, reps, sets }, i) => {
        const weight = Math.round(warmupWeight * percent);
        console.log({ weight });
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
                  {getRoundedLbs(weight)}
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
              {getPlatesOnBar({ weight: getRoundedLbs(weight) })}
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}

function WorkContent({ liftName, sets }) {
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);

  let oneRM;
  let oneRMExist = oneRepMax.find(({ name }) => name === liftName);
  if (oneRMExist) {
    oneRM = oneRMExist.oneRM;
  } else {
    oneRM = variants.find(({ name }) => name === liftName).oneRM;
  }

  return (
    <Box px="2" py="3" fontSize="xl" fontWeight="semibold">
      <Grid
        my="2"
        fontSize="md"
        fontWeight="black"
        letterSpacing="wider"
        color="gray.900"
        gap={2}
        gridTemplateColumns="1fr 3fr 5fr"
      >
        <Text textAlign="center">NO</Text>
        <Text textAlign="center">VOLUME</Text>
        <Text textAlign="center">PLATES</Text>
      </Grid>

      {sets.map(({ id, reps, rpe, sets }, i) => {
        const worksetWeight = getWorksetWeight({ rpe, reps, oneRM });

        return (
          <Grid key={id} my="4" gap={2} gridTemplateColumns="1fr 3fr 5fr">
            <Text textAlign="center">{i + 1}</Text>
            <Text textAlign="center">
              <Flex flexDirection="column">
                <Box as="span" lineHeight="0" fontSize="xs">
                  {getRoundedLbs(worksetWeight)}
                </Box>
                <Box as="span">
                  {reps}@{rpe}% x {sets}
                </Box>
              </Flex>
            </Text>
            <Text textAlign="center">
              {getPlatesOnBar({ weight: getRoundedLbs(worksetWeight) })}
            </Text>
          </Grid>
        );
      })}
    </Box>
  );
}
