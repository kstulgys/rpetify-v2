import React from "react";
import AntModal from "Modal";
import { useApp } from "context";
import { getRoundedLbs, getPlatesOnBar, getWorksetWeight } from "utils";
// weight: getWorksetWeight(6.5, 6, oneRM)

export default function WarmupModal({ liftName, workset: { rpe, reps } }) {
  const { state: { lifts = [], warmupSets = [] } = {} } = useApp();
  const getOneRM = () => lifts.find(({ name }) => name === liftName).oneRM;
  const getWeight = () => getWorksetWeight(rpe, reps, getOneRM());
  const getRoundedWeight = percent => {
    return getRoundedLbs(Math.round(getWeight() * (percent / 100)));
  };
  return (
    <AntModal trigger={<p className="uppercase">Warmup</p>}>
      <div className="table text-center w-full ">
        <div className="table-row text-center uppercase font-black leading-wider text-lg">
          {/* <div className="pb-2 table-cell text-left">no</div> */}
          <div className="pb-2 table-cell lowercase">
            1st <span className="uppercase">SET</span> %
          </div>

          <div className="pb-2 table-cell ">Plates</div>
        </div>
        {warmupSets.map(({ id, percentOfFirstWorksetLoad, reps, sets }, i) => {
          return (
            <div key={id} className="table-row font-medium text-xl">
              {/* <div className="table-cell p-1 text-left ">{i + 1}.</div> */}
              <div className="table-cell p-1 ">
                <div className=" flex items-baseline justify-center">
                  <span className="">
                    {sets} x {reps} @{percentOfFirstWorksetLoad}%
                  </span>
                  <span className="ml-1 text-xs">
                    {getRoundedWeight(percentOfFirstWorksetLoad)}
                  </span>
                </div>
              </div>

              <div className="table-cell p-1 ">
                <div className="flex justify-center">
                  {getPlatesOnBar(getRoundedWeight(percentOfFirstWorksetLoad))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AntModal>
  );
}
