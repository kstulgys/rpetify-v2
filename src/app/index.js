import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWorkout } from "features/workouts/slice";
import { Box, Flex } from "@chakra-ui/core";
import WorkoutCard from "components/workout-card";
import Footer from "components/footer";

export default function App() {
  const { workouts } = useSelector(state => state);
  const  {variants}  = useSelector(state => state.variants);

  // const workoutsWithName = workouts.filter(w=>w.name !== "")
console.log({workouts})
console.log({variants})

  return (
    <Flex style={{ minHeight: "100vh" }} flexDirection="column" bg="gray.800">
      <Flex flexDir="column" flex="1" align="center" px="2" mt="1">
        {workouts.map(props => {
          return <WorkoutCard key={props.id} {...props} />;
        })}
      </Flex>
      <Footer />
    </Flex>
  );
}
