import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWorkout } from "features/workouts/slice";
import { Box, Flex } from "@chakra-ui/core";
import WorkoutCard from "components/WorkoutCard";
import Footer from "components/Footer";

export default function App() {
  const state = useSelector(state => state);
  const { workouts } = useSelector(state => state);

  // useEffect(() => {
  //   console.log("app loaded");
  //   const stateFromLocalStorage =
  //     JSON.parse(window.localStorage.getItem("state")) || {};
  //   console.log("all state", state);
  //   console.log("stateFromLocalStorage", stateFromLocalStorage);
  //   //  dispatch(getStateFromLocalStorage(stateFromLocalStorage))
  // }, []);

  // useEffect(() => {
  //   console.log("state changed");
  //   //  dispatch(saveStateToLocalStorage(state))
  //   window.localStorage.setItem("state", JSON.stringify(state));
  // }, [state]);

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
