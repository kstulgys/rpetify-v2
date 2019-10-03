import React from "react";
import {
  removeWorkout,
  addSet,
  changeWorkoutName
} from "features/workouts/slice";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import Modal from "components/Modal";
import { Box, Text, Flex, Stack, IconButton } from "@chakra-ui/core";
import SetRow from "./SetRow";
import WarmupContent from "./WarmupContent";
import WorkContent from "./WorkContent";

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

  const mainLiftNames = oneRepMax
    .map(({ name }) => ({ value: name, text: name }))
    .filter(Boolean);
  const variantsNames = variants
    .map(({ name }) => ({ value: name, text: name }))
    .filter(Boolean);

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
          customArray={liftNames}
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
