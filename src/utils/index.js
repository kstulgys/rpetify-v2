export function getOneRepMax({ rpe, reps, weight }) {
  const p = lookupTable[rpe][reps];
  return Math.round(weight / p);
}
export function getWorksetWeight({ rpe, reps, oneRM }) {
  // console.log(oneRM);
  const p = lookupTable[rpe][reps];
  return Math.round(oneRM * p);
}

export function getPlatesOnBar({ weight, units, barbellWeight }) {
  // console.log(weight, units, barbellWeight);
  const roundedWeight = getRoundedWeight(weight);

  const lbsPlates = [45, 35, 25, 10, 5, 2.5];
  const kgPlates = [25, 20, 15, 10, 5, 2.5, 1.5];

  const platesArray = units === "lbs" ? lbsPlates : kgPlates;
  let oneSideWeight = (roundedWeight - barbellWeight) / 2;

  let res = platesArray.reduce((acc, next) => {
    const platesQuantity = oneSideWeight / next;
    const isWholePlates = platesQuantity >= 1 && platesQuantity % 1 === 0;
    const isAtLeastOneWholePlate =
      platesQuantity >= 1 && platesQuantity % 1 !== 0;

    if (isWholePlates) {
      oneSideWeight -= next * platesQuantity;
      return (acc += getString(next, platesQuantity));
    } else if (isAtLeastOneWholePlate) {
      oneSideWeight -= next * Math.floor(platesQuantity);
      return (acc += getString(next, platesQuantity));
    }
    return acc;
  }, "");

  return res.slice(0, -1); //e.g 45x3/25/10/2.5
}

function getString(next, platesQuantity) {
  return `${next}${
    Math.floor(platesQuantity) > 1 ? `x${Math.floor(platesQuantity)}` : ""
  }/`;
}

export function getRoundedWeight(weight) {
  let weightRounded = Math.round(weight);

  const weightLastDigit = weightRounded % 10;
  if (weightLastDigit !== 0 || weightLastDigit !== 5) {
    if (weightLastDigit === 1 || weightLastDigit === 6) {
      weightRounded -= 1;
    }
    if (weightLastDigit === 2 || weightLastDigit === 7) {
      weightRounded -= 2;
    }
    if (weightLastDigit === 3 || weightLastDigit === 8) {
      weightRounded += 2;
    }
    if (weightLastDigit === 4 || weightLastDigit === 9) {
      weightRounded += 1;
    }
  }

  return weightRounded;
}

const lookupTable = {
  10: [
    null,
    1,
    0.955,
    0.922,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68
  ],
  9.5: [
    null,
    0.978,
    0.939,
    0.907,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667
  ],
  9: [
    null,
    0.955,
    0.922,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653
  ],
  8.5: [
    null,
    0.939,
    0.907,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667,
    0.64
  ],
  8: [
    null,
    0.922,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653,
    0.626
  ],
  7.5: [
    null,
    0.907,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667,
    0.64,
    0.613
  ],
  7: [
    null,
    0.892,
    0.863,
    0.837,
    0.811,
    0.786,
    0.762,
    0.739,
    0.707,
    0.68,
    0.653,
    0.626,
    0.599
  ],
  6.5: [
    null,
    0.878,
    0.85,
    0.824,
    0.799,
    0.774,
    0.751,
    0.723,
    0.694,
    0.667,
    0.64,
    0.613,
    0.586
  ]
  // 6: [
  //   null,
  //   0.863,
  //   0.837,
  //   0.811,
  //   0.786,
  //   0.762,
  //   0.739,
  //   0.707,
  //   0.68,
  //   0.653,
  //   0.626,
  //   0.599,
  //   0.599,
  //   0.572
  // ]
};
