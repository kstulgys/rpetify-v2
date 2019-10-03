import React, { useState, useEffect } from "react";
import { changeVariantOneRepMax, removeVariant } from "features/variants/slice";
import { useSelector, useDispatch } from "react-redux";
import { getOneRepMax, getRoundedLbs } from "utils";
import Select from "components/Select";
import {
  Text,
  Flex,
  Grid,
  Icon,
  Editable,
  EditableInput,
  EditablePreview
} from "@chakra-ui/core";

export default function VariantRow({ id, name, main, percent, oneRM }) {
  const dispatch = useDispatch();
  const oneRepMax = useSelector(state => state.oneRepMax);
  const units = useSelector(state => state.units);

  function handleRemoveVariant() {
    dispatch(removeVariant({ id }));
  }

  useEffect(() => {
    const mainOneRM = oneRepMax.find(({ shortName }) => shortName === main)
      .oneRM;
    const weight = Math.round(mainOneRM * (percent / 100));
    dispatch(
      changeVariantOneRepMax({ id, name: "oneRM", value: Number(weight) })
    );
  }, [percent, main, id, dispatch, oneRM, oneRepMax]);

  function handleChange(e) {
    // console.log(e.target.value);
    const { name, value } = e.target;
    if (value === "-") return;
    const currentValue = name === "percent" ? Number(value) : value;
    dispatch(changeVariantOneRepMax({ id, name, value: currentValue }));
  }

  let liftNamesArray = oneRepMax.map(({ shortName }) => ({
    value: shortName,
    text: shortName
  }));

  const oneRMByUnit = units === "lbs" ? oneRM : Math.round(oneRM * 0.453592);

  return (
    <Grid my="2" gridGap="2" gridTemplateColumns="1.25fr 1fr 1fr 0.8fr 0.5fr">
      <Flex flexDir="column" justifyContent="center">
        <Editable
          // focusBorderColor="yellow.500"
          defaultValue={name}
          name="name"
          onChange={value => {
            dispatch(
              changeVariantOneRepMax({ id, name: "name", value: Number(value) })
            );
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
        customArray={liftNamesArray}
      />
      <Select
        name="percent"
        onChange={handleChange}
        defaultValue={percent}
        usePercentages
      />
      <Flex flexDir="column" justifyContent="center">
        <Text textAlign="center">{oneRMByUnit}</Text>
      </Flex>
      <Flex flexDir="column" justify="center" align="center">
        <Flex align="center">
          <Icon name="small-close" size="6" onClick={handleRemoveVariant} />
        </Flex>
      </Flex>
    </Grid>
  );
}
