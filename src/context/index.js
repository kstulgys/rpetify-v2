import React, { useEffect, useRef } from "react";
// import debounce from "lodash.debounce";
import uuid from "uuid/v4";
import produce from "immer";
// import register from "../services/register"
// import generateRecaptchaToken from "../services/recaptcha"
// import useWindowSize from "hooks/useWindowSize"
import { getRoundedLbs, getOneRM, getWorksetWeight } from "utils";

const AppContext = React.createContext();

const actions = {
  ADD_SET: "ADD_SET",
  REMOVE_SET: "REMOVE_SET",
  ADD_LIFT: "ADD_LIFT",
  REMOVE_LIFT: "REMOVE_LIFT",
  WARMUP_CHANGED: "WARMUP_CHANGED",
  SET_STATE_FROM_STORAGE: "SET_STATE_FROM_STORAGE",
  ONE_RM_CHANGED: "ONE_RM_CHANGED",
  WORKSET_CHANGED: "WORKSET_CHANGED",
  LIFT_NAME_CHANGED: "LIFT_NAME_CHANGED"
};

let initialState = {
  kg: false,
  warmupSets: [
    {
      id: uuid(),
      percentOfFirstWorksetLoad: 50,
      reps: 5,
      sets: 3
    },
    {
      id: uuid(),
      percentOfFirstWorksetLoad: 65,
      reps: 4,
      sets: 1
    },
    {
      id: uuid(),
      percentOfFirstWorksetLoad: 80,
      reps: 3,
      sets: 1
    },
    {
      id: uuid(),
      percentOfFirstWorksetLoad: 95,
      reps: 1,
      sets: 1
    }
  ],

  lifts: [
    {
      id: uuid(),
      name: "Squat",
      shortName: "SQ",
      weight: 300,
      reps: 5,
      rpe: 10
      // oneRM: getOneRM(10, 5, 300)
    },
    {
      id: uuid(),
      name: "Deadlift",
      shortName: "DL",
      weight: 335,
      reps: 5,
      rpe: 8
      // oneRM: getOneRM(8, 5, 335)
    },
    {
      id: uuid(),
      name: "B-Press",
      shortName: "BP",
      weight: 185,
      reps: 5,
      rpe: 7
      // oneRM: getOneRM(7, 5, 185)
    },
    {
      id: uuid(),
      name: "O-Press",
      shortName: "OP",
      weight: 140,
      reps: 5,
      rpe: 9
      // oneRM: getOneRM(9, 5, 140)
    }
  ],

  currentLifts: []
};

const appReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actions.LIFT_NAME_CHANGED: {
      let currentLifts = [...state.currentLifts];
      currentLifts.find(l => l.id === action.liftId).name = action.value;
      return { ...state, currentLifts };
    }
    case actions.WORKSET_CHANGED: {
      let currentLifts = [...state.currentLifts];
      currentLifts
        .find(l => l.id === action.liftId)
        .sets.find(s => s.id === action.setId)[action.name] = action.value;
      return { ...state, currentLifts };
    }
    case actions.ONE_RM_CHANGED: {
      let lifts = [...state.lifts];
      lifts.find(s => s.id === action.id)[action.name] = action.value;
      return { ...state, lifts };
    }
    case actions.SET_STATE_FROM_STORAGE: {
      return action.state;
    }
    case actions.WARMUP_CHANGED: {
      let warmupSets = [...state.warmupSets];
      warmupSets.find(s => s.id === action.id)[action.name] = action.value;
      return { ...state, warmupSets };
    }

    case actions.ADD_LIFT: {
      const newLift = {
        id: uuid(),
        name: "Squat",
        sets: [
          {
            id: uuid(),
            reps: 6,
            rpe: 6.5,
            sets: 1
          },
          {
            id: uuid(),
            reps: 6,
            rpe: 7,
            sets: 1
          },
          {
            id: uuid(),
            reps: 6,
            rpe: 8,
            sets: 3
          }
        ]
      };
      return {
        ...state,
        currentLifts: [...state.currentLifts, newLift]
      };
    }
    case actions.REMOVE_LIFT: {
      return {
        ...state,
        currentLifts: state.currentLifts.filter(l => l.id !== action.id)
      };
    }
    case actions.ADD_SET: {
      const newSet = { id: uuid(), reps: 6, rpe: 8, sets: 1 };
      state.currentLifts.find(c => c.id === action.id).sets.push(newSet);
      return { ...state, currentLifts: state.currentLifts };
    }
    case actions.REMOVE_SET: {
      let liftIdx = [...state.currentLifts].findIndex(
        l => l.id === action.liftId
      );
      let lift = state.currentLifts.find(l => l.id === action.liftId);
      let sets = lift.sets.filter(s => s.id !== action.setId);
      let updatedLift = { ...lift, sets };
      state.currentLifts.splice(liftIdx, 1, updatedLift);
      return { ...state, currentLifts: state.currentLifts };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export default function AppProvider(props) {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);

  useEffect(() => {
    const state =
      JSON.parse(window.localStorage.getItem("state")) || initialState;
    dispatch({
      type: actions.SET_STATE_FROM_STORAGE,
      state
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={value} {...props} />;
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(`useSignupForm must be used within a FormProvider`);
  }
  const [state, dispatch] = context;

  function handleAddSet(id) {
    dispatch({
      type: actions.ADD_SET,
      id
    });
  }

  function handleRemoveSet(liftId, setId) {
    dispatch({
      type: actions.REMOVE_SET,
      liftId,
      setId
    });
  }

  function handleAddLift() {
    dispatch({
      type: actions.ADD_LIFT
    });
  }

  function handleRemoveLift(id) {
    dispatch({
      type: actions.REMOVE_LIFT,
      id
    });
  }

  function handleWarmupChange(id, e) {
    dispatch({
      type: actions.WARMUP_CHANGED,
      id,
      value: Number(e.target.value),
      name: e.target.name
    });
  }

  function handleOneRMChange(id, e) {
    dispatch({
      type: actions.ONE_RM_CHANGED,
      id,
      value: Number(e.target.value),
      name: e.target.name
    });
  }

  function handleWorksetChange(liftId, setId, e) {
    dispatch({
      type: actions.WORKSET_CHANGED,
      liftId,
      setId,
      value: Number(e.target.value),
      name: e.target.name
    });
  }

  function handleLIftNameChanged(liftId, e) {
    dispatch({
      type: actions.LIFT_NAME_CHANGED,
      liftId,
      value: e.target.value
    });
  }

  return {
    handleAddSet,
    handleRemoveSet,
    handleAddLift,
    handleRemoveLift,
    handleWarmupChange,
    handleOneRMChange,
    handleWorksetChange,
    handleLIftNameChanged,
    state,
    dispatch
  };
}

// function wait(ms) {
//   return new Promise((r, j) => setTimeout(r, ms))
// }

// function saveStateToStorage(state) {
//   window.localStorage.setItem("state", JSON.stringify(state));
// }

// function setInitialStateFromStorage() {
//   const state = JSON.parse(window.localStorage.getItem("state"));
// }
