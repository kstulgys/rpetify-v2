import React, { useState, useEffect } from "react";
import { addWorkout, removeWorkout } from "features/workouts/slice";
import {
  changeVariantOneRepMax,
  addVariant,
  removeVariant,
  setActiveTrue,
  setActiveFalse
} from "features/variants/slice";
import { useSelector, useDispatch } from "react-redux";
import { getOneRepMax, getRoundedLbs } from "utils";
import Select from "components/Select";
import Modal from "components/Modal";
import {
  Box,
  Text,
  Flex,
  Stack,
  IconButton,
  Grid,
  Switch,
  Button,
  Link,
  Input,
  Icon,
  Editable,
  EditableInput,
  EditablePreview
} from "@chakra-ui/core";
import OneRMRow from "./OneRMRow";
import NewVariant from "./NewVariant";
import VariantRow from "./VariantRow";

export default function Variants() {
  const dispatch = useDispatch();
  const { isActive, variants } = useSelector(state => state.variants);

  return (
    <>
      <Flex mt="8" mb="4" align="center">
        <Text
          mx="auto"
          fontWeight="black"
          fontSize="xs"
          textTransform="uppercase"
        >
          variants
        </Text>
      </Flex>

      <Grid
        fontSize="md"
        fontWeight="black"
        letterSpacing="wider"
        color="yellow.500"
        // mb="2"
        gridGap="2"
        gridTemplateColumns="1.25fr 1fr 1fr 0.8fr 0.5fr"
      >
        <Text textAlign="center">LIFT</Text>
        <Text textAlign="center">MAIN</Text>
        <Text textAlign="center">%</Text>
        <Text textAlign="center">oneRM</Text>
        <Box textAlign="center" />
      </Grid>
      {variants.map(props => {
        return <VariantRow key={props.id} {...props} />;
      })}
      {isActive && <NewVariant />}

      <Button
        mt="1"
        h="12"
        variant="outline"
        variantColor="yellow"
        w="full"
        leftIcon="add"
        _hover={{ bg: "yellow.500", color: "gray.800" }}
        disabled={isActive}
        onClick={() => dispatch(setActiveTrue())}
      >
        Add Variant
      </Button>
    </>
  );
}
