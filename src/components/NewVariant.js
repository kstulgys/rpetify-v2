import React, { useState, useEffect } from "react";
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

export default function NewVariant() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [main, setMain] = useState("");
  const [percent, setPercent] = useState(0);
  const [newOneRM, setNewOneRM] = useState(null);
  const [fieldsValid, setValid] = useState(false);
  const [isNameValid, setNameValid] = useState(true);
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);

  function handleAddVariant() {
    dispatch(addVariant({ name, main, percent, oneRM: newOneRM }));
    setName("");
    setMain("");
    setPercent("");
    setNewOneRM("");
    dispatch(setActiveFalse());
    setValid(false);
  }
  useEffect(() => {
    if (fieldsValid) {
      const mainOneRM = oneRepMax.find(({ shortName }) => shortName === main)
        .oneRM;
      const weight = Math.round(mainOneRM * (percent / 100));
      setNewOneRM(weight);
    }
  }, [oneRepMax, main, percent, fieldsValid]);

  useEffect(() => {
    const nameExist = !!variants.find(
      v => v.name.toLowerCase() === name.toLowerCase()
    );
    setNameValid(!nameExist);

    if (
      name &&
      main &&
      percent &&
      !nameExist &&
      main !== "-" &&
      percent !== "-"
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, main, percent, variants]);

  const getLiftNames = () => {
    let names = oneRepMax.map(({ shortName }) => shortName);
    names.unshift("-");
    return names;
  };

  return (
    <Grid my="2" gridGap="2" gridTemplateColumns="1.25fr 1fr 1fr 0.8fr 0.5fr">
      <Input
        color="gray.800"
        fontWeight="bold"
        textAlign="center"
        focusBorderColor={isNameValid ? "yellow" : "red"}
        _hover={{ borderColor: isNameValid ? "black" : "red.300" }}
        borderColor={isNameValid ? "black" : "red.300"}
        defaultValue={name}
        onChange={e => setName(e.target.value)}
      />
      <Select
        defaultValue="-"
        items={getLiftNames()}
        onChange={e => setMain(e.target.value)}
      />
      <Select
        defaultValue="-"
        items={getPercentages()}
        onChange={e => setPercent(Number(e.target.value))}
      />
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Text>{newOneRM || "-"}</Text>
      </Flex>
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Flex align="center">
          {fieldsValid ? (
            <Icon onClick={handleAddVariant} name="check-circle" size="6" />
          ) : (
            <Icon
              name="small-close"
              size="6"
              onClick={() => dispatch(setActiveFalse())}
            />
          )}
        </Flex>
      </Flex>
    </Grid>
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
