import React, { useEffect } from "react";
import { changeVariantOneRepMax, removeVariant } from "features/variants/slice";
import { removeWorkoutByName } from "features/workouts/slice";
import { useSelector, useDispatch } from "react-redux";
import { getOneRMByUnit } from "utils";

import Select from "components/Select";
import { Text, Flex, Grid, Icon } from "@chakra-ui/core";

export default function VariantRow({ id, name, main, percent, oneRM }) {
  const dispatch = useDispatch();
  const oneRepMax = useSelector(state => state.oneRepMax);
  const units = useSelector(state => state.units);

  function handleRemoveVariant() {
    dispatch(removeWorkoutByName({ name }));
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
    const { name, value } = e.target;
    const currentValue = name === "percent" ? Number(value) : value;
    dispatch(changeVariantOneRepMax({ id, name, value: currentValue }));
  }

  let liftNamesArray = oneRepMax.map(({ shortName }) => ({
    value: shortName,
    text: shortName
  }));

  return (
    <Grid my="2" gridGap="2" gridTemplateColumns="1.25fr 1fr 1fr 0.8fr 0.5fr">
      <Flex flexDir="column" justifyContent="center">
        <Text textAlign="center">{name}</Text>
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
        <Text textAlign="center">{getOneRMByUnit(units, oneRM)}</Text>
      </Flex>
      <Flex flexDir="column" justify="center" align="center">
        <Flex align="center">
          <Icon
            name="small-close"
            size="6"
            onClick={() => {
              var conf = window.confirm(
                "Are you sure You want to delete this item ?"
              );
              if (conf === true) {
                handleRemoveVariant();
              }
            }}
          />
        </Flex>
      </Flex>
    </Grid>
  );
}
