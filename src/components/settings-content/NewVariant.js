import React, { useState, useEffect } from "react";
import { addVariant, setActiveFalse } from "features/variants/slice";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import { Text, Flex, Grid, Input, Icon } from "@chakra-ui/core";

export default function NewVariant() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [main, setMain] = useState("SQ");
  const [percent, setPercent] = useState(80);
  const [newOneRM, setNewOneRM] = useState(null);
  const [fieldsValid, setValid] = useState(false);
  const [isNameValid, setNameValid] = useState(true);
  const oneRepMax = useSelector(state => state.oneRepMax);
  const { variants } = useSelector(state => state.variants);
  const units = useSelector(state => state.units);

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

    if (name && main && percent && !nameExist && main !== "-" && !!percent) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, main, percent, variants]);

  let liftNamesArray = oneRepMax.map(({ shortName }) => ({
    value: shortName,
    text: shortName
  }));

  const oneRMByUnit =
    units === "lbs" ? newOneRM : Math.round(newOneRM * 0.453592);

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
        defaultValue={main}
        customArray={liftNamesArray}
        onChange={e => setMain(e.target.value)}
      />
      <Select
        defaultValue={percent}
        usePercentages
        onChange={e => {
          setPercent(Number(e.target.value));
        }}
      />
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Text>{oneRMByUnit || "-"}</Text>
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
