import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "./plus.svg";
import { ReactComponent as ExitIcon } from "./minus.svg";
import { ReactComponent as SettingsIcon } from "./settings.svg";
import AppProvider, { useApp } from "context";
import { percentageLookup } from "utils";
// import AntSelect from "Select";
// import AntModal from "Modal";
import { Switch } from "antd";
import WarmupModal from "WarmupModal";
import WarksetModal from "WorksetModal";
import { getOneRM } from "utils";
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  Box,
  Flex,
  Stack,
  useTheme
} from "@chakra-ui/core";
import { motion } from "framer-motion";
import WorkoutCard from "components/WorkoutCard";
import Footer from "components/Footer";
import "./styles.css";

function Root() {
  return (
    <ThemeProvider>
      <CSSReset />
      <AppProvider>
        <Box>
          <App />
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
}

function App() {
  const { state: { currentLifts = [] } = {} } = useApp();
  return (
    <Flex style={{ minHeight: "100vh" }} flexDirection="column" bg="gray.800">
      <Flex flexDir="column" flex="1" align="center" px="2" mt="1">
        {currentLifts.map(props => {
          return <WorkoutCard key={props.id} {...props} />;
        })}
      </Flex>
      <Footer />
    </Flex>
  );
}

function Card({ id = "", sets = [], name: liftName = "" }) {
  const {
    state: { lifts = [] } = {},
    handleAddSet,
    handleRemoveLift,
    handleLIftNameChanged
  } = useApp();

  return (
    <div className="my-4 p-4 rounded-lg mx-auto flex flex-col bg-white shadow-lg">
      <div className="flex justify-between items-center">
        <div className="">
          <PlusIcon className="w-8 h-8" onClick={() => handleAddSet(id)} />
        </div>
        <div className="">
          <Select
            defaultValue={liftName}
            onChange={e => handleLIftNameChanged(id, e)}
          >
            {lifts.map(({ name, id }) => {
              return (
                <option key={id} value={name}>
                  {name}
                </option>
              );
            })}
          </Select>
        </div>
        <div>
          <ExitIcon className="w-8 h-8" onClick={() => handleRemoveLift(id)} />
        </div>
      </div>
      <div className="table my-5">
        <div className="table-row  text-center ">
          <div className="table-cell ">reps</div>
          <div className="table-cell ">rpe</div>
          <div className="table-cell ">sets</div>
        </div>

        {sets.map((props, i) => {
          return (
            <WorksetRow
              i={i}
              key={props.id}
              liftId={id}
              liftName={liftName}
              {...props}
            />
          );
        })}
      </div>

      <div className="flex items-center">
        <div className="w-1/2 text-center  ">
          <WarmupModal liftName={liftName} workset={sets[0]} />
        </div>
        <div className="w-1/2 text-center ">
          <WarksetModal liftName={liftName} worksets={sets} />
        </div>
      </div>
    </div>
  );
}

function WorksetRow({ id: setId, reps, sets, rpe, liftId, i }) {
  const {
    state,
    handleRemoveSet,
    handleWorksetChange,
    handleRemoveLift
  } = useApp();

  // useEffect(() => {
  //   const oneRM = lifts.find(({ name }) => name === liftName).oneRM;
  //   const percent = percentageLookup[rpe][reps];
  //   const workWeight = Math.round(oneRM * percent);
  //   const e = { target: { name: "weight", value: workWeight } };
  //   handleWorksetChange(liftId, setId, e);
  // }, [reps, rpe]);

  return (
    <div className="table-row flex">
      <div className="table-cell px-1">
        <Select
          defaultValue={reps}
          name="reps"
          onChange={e => handleWorksetChange(liftId, setId, e)}
        >
          {Array.from({ length: 20 }, (_, i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </Select>
      </div>
      <div className="table-cell px-1">
        <Select
          defaultValue={rpe}
          name="rpe"
          onChange={e => handleWorksetChange(liftId, setId, e)}
        >
          {Array.from({ length: 11 }, (_, i) => {
            if (i > 5) {
              return (
                <>
                  {i !== 6 && <option value={i}>{i}</option>}
                  {i + 0.5 !== 10.5 && (
                    <option value={i + 0.5}>{i + 0.5}</option>
                  )}
                </>
              );
            }
            return null;
          })}
        </Select>
      </div>
      <div className="table-cell px-1">
        <Select
          defaultValue={sets}
          name="sets"
          onChange={e => {
            if (i === 0 && e.target.value === "0") {
              handleRemoveLift(liftId);
            } else if (e.target.value === "0") {
              handleRemoveSet(liftId, setId);
            } else {
              handleWorksetChange(liftId, setId, e);
            }
          }}
        >
          <option value="0">-</option>
          {Array.from({ length: 5 }, (_, i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </Select>
      </div>
    </div>
  );
}

// const Select = styled.select.attrs({
//   className: `font-semibold uppercase tracking-wider w-full my-1 p-2 rounded-lg focus:outline-none focus:shadow-outline`
// })`
//   text-align-last: center;
// `;

function SettingsModal() {
  const { state: { lifts = [], warmupSets = [] } = {} } = useApp();
  // const entries = Object.entries([key, object]);
  // console.log({ entries });
  return (
    <AntModal trigger={<SettingsIcon />}>
      <div className="">
        <p className="mb-4 text-lg text-center uppercase font-black leading-wider">
          estimated 1 rep max
        </p>
      </div>
      <hr className="my-2 " />

      <div className="table w-full text-lg">
        <div className="table-row uppercase font-black leading-wider text-base text-center">
          <div className="pb-2 table-cell">Lift</div>
          <div className="pb-2 table-cell ">weight</div>
          <div className="pb-2 table-cell ">reps</div>
          <div className="pb-2 table-cell ">rpe</div>
          <div className="pb-2 table-cell ">e1RM</div>
        </div>
        {lifts.map((props, i) => {
          return <OneRMRow id={props.id} {...props} />;
        })}
      </div>
      <div className="">
        <hr className="my-2 mt-6" />

        <p className="my-4 text-lg text-center uppercase font-black leading-wider">
          Warm-up sets
        </p>
        <hr className="my-2 " />
      </div>

      <div className="table w-full text-lg">
        <div className="table-row text-center uppercase font-black leading-wider text-base">
          <div className="pb-2 table-cell">no</div>
          <div className="pb-2 table-cell lowercase">
            1st <span className="uppercase">SET</span> %
          </div>
          <div className="pb-2 table-cell ">Reps</div>
          <div className="pb-2 table-cell ">Sets</div>
        </div>
        {warmupSets.map((props, i) => {
          return <WarmupSetsRow {...props} i={i + 1} />;
        })}
      </div>
      <hr className="my-2 mt-6" />
      <div className="flex items-center">
        <div>
          <p className="my-3 text-lg text-center uppercase font-black leading-wider">
            Units
          </p>
        </div>
        <div>
          <Switch
            className=" ml-4 bg-yellow-600 "
            checkedChildren="LBS"
            unCheckedChildren="KG"
          />
        </div>
      </div>
    </AntModal>
  );
}

function OneRMRow({ id, shortName, weight, reps, rpe, oneRM }) {
  const { state: { kg } = {}, handleOneRMChange } = useApp();

  useEffect(() => {
    const oneRM = getOneRM(rpe, reps, weight);
    const e = { target: { name: "oneRM", value: oneRM } };
    handleOneRMChange(id, e);
  }, [reps, rpe, weight, id]);

  return (
    <div className="table-row text-center font-medium">
      <div className="table-cell pr-1 text-left">{shortName}</div>
      <div className="table-cell p-1">
        <Select
          defaultValue={weight}
          name="weight"
          onChange={e => handleOneRMChange(id, e)}
        >
          {Array.from({ length: kg ? 400 : 800 }, (_, i) => {
            if (i + 1 >= 100 && ((i + 1) % 10 === 5 || (i + 1) % 10 === 0)) {
              return <option value={i + 1}>{i + 1}</option>;
            }
            return null;
          })}
        </Select>
      </div>
      <div className="table-cell p-1">
        <Select
          defaultValue={reps}
          name="reps"
          onChange={e => handleOneRMChange(id, e)}
        >
          {Array.from({ length: 12 }, (_, i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </Select>
      </div>
      <div className="table-cell p-1">
        <Select
          defaultValue={rpe}
          name="rpe"
          onChange={e => handleOneRMChange(id, e)}
        >
          {Array.from({ length: 11 }, (_, i) => {
            if (i > 5) {
              return (
                <>
                  {i !== 6 && <option value={i}>{i}</option>}
                  {i + 0.5 !== 10.5 && (
                    <option value={i + 0.5}>{i + 0.5}</option>
                  )}
                </>
              );
            }
            return null;
          })}
        </Select>
      </div>
      <div className="table-cell pl-1 text-right">{oneRM || ""}</div>
    </div>
  );
}

function WarmupSetsRow({ id, percentOfFirstWorksetLoad, reps, sets, i }) {
  const { handleWarmupChange } = useApp();
  return (
    <div className="table-row text-center">
      <div className="table-cell p-1">{i}</div>
      <div className="table-cell p-1">
        <Select
          defaultValue={percentOfFirstWorksetLoad}
          name="percentOfFirstWorksetLoad"
          onChange={e => handleWarmupChange(id, e)}
        >
          {Array.from({ length: 151 }, (_, i) => {
            if (i !== 0 && (i % 10 === 0 || i % 10 === 5)) {
              return <option value={i}>{i}</option>;
            }
            return null;
          })}
        </Select>
      </div>
      <div className="table-cell p-1">
        <Select
          defaultValue={reps}
          name="reps"
          onChange={e => handleWarmupChange(id, e)}
        >
          {Array.from({ length: 20 }, (_, i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </Select>
      </div>
      <div className="table-cell p-1">
        <Select
          defaultValue={sets}
          name="sets"
          onChange={e => handleWarmupChange(id, e)}
        >
          {Array.from({ length: 10 }, (_, i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </Select>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
