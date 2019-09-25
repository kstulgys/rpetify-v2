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
import Select from "./Select";
import Modal from "./Modal";
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

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <Flex
      align="center"
      justify="space-evenly"
      position="sticky"
      bottom="0"
      h="16"
      bg="gray.900"
    >
      <Modal trigger={<IconContainer type="settings" />}>
        <SettingsContent />
      </Modal>
      <IconContainer type="add" onClick={() => dispatch(addWorkout())} />
    </Flex>
  );
}

function SettingsContent() {
  const oneRepMax = useSelector(state => state.oneRepMax);
  return (
    <Box width="full" fontWeight="bold" color="gray.300">
      <Flex align="center" justify="center" mb="4">
        <Text fontSize="xs" fontWeight="black" textTransform="uppercase">
          estimated one rep max
        </Text>
        <Text ml="2" fontSize="xs" fontWeight="black" textTransform="uppercase">
          (lbs)
        </Text>
        <Switch ml="3" color="yellow" />
      </Flex>
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

      {oneRepMax.map(props => {
        return <OneRMRow key={props.id} {...props} />;
      })}
      <Variants />
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
            <Box as="span">for lifting by</Box>
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

function Variants() {
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

function VariantRow({ id, name, main, percent, oneRM }) {
  const dispatch = useDispatch();
  const oneRepMax = useSelector(state => state.oneRepMax);

  function handleRemoveVariant() {
    dispatch(removeVariant({ id }));
  }

  useEffect(() => {
    const mainOneRM = oneRepMax.find(({ shortName }) => shortName === main)
      .oneRM;
    const weight = Math.round(mainOneRM * (percent / 100));
    dispatch(changeVariantOneRepMax({ id, name: "oneRM", value: weight }));
  }, [percent, main, id, dispatch, oneRM, oneRepMax]);

  function handleChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    if (value === "-") return;
    const currentValue = name === "percent" ? Number(value) : value;
    dispatch(changeVariantOneRepMax({ id, name, value: currentValue }));
  }

  const getLiftNames = () => {
    let names = oneRepMax.map(({ shortName }) => shortName);
    names.unshift("-");
    return names;
  };

  return (
    <Grid my="2" gridGap="2" gridTemplateColumns="1.25fr 1fr 1fr 0.8fr 0.5fr">
      <Flex flexDir="column" justifyContent="center">
        <Editable
          // focusBorderColor="yellow.500"
          defaultValue={name}
          name="name"
          onChange={value => {
            dispatch(changeVariantOneRepMax({ id, name: "name", value }));
          }}
          textAlign="center"
          lineHeight="none"
        >
          <EditablePreview />
          <EditableInput h="10" />
        </Editable>
      </Flex>

      <Select
        name="main"
        onChange={handleChange}
        defaultValue={main}
        items={getLiftNames()}
      />
      <Select
        name="percent"
        onChange={handleChange}
        defaultValue={percent}
        items={getPercentages()}
      />
      <Flex flexDir="column" justifyContent="center">
        <Text textAlign="center">{oneRM}</Text>
      </Flex>
      <Flex flexDir="column" justify="center" align="center">
        <Flex align="center">
          <Icon name="small-close" size="6" onClick={handleRemoveVariant} />
        </Flex>
      </Flex>
    </Grid>
  );
}

function IconContainer({ type, onClick }) {
  return (
    <Icon
      name={type}
      color="yellow.500"
      size="10"
      onClick={onClick}
      cursor="pointer"
    />
  );
}

function getPercentages() {
  let arr = Array.from({ length: 200 }, (x, i) => {
    if (i + 1 > 9) {
      return i + 1;
    }
    return null;
  }).filter(Boolean);

  arr.unshift("-");
  return arr;
}
