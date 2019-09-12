import React from "react";
import AntModal from "Modal";
import { useApp } from "context";
import { getRoundedLbs, getPlatesOnBar, getWorksetWeight } from "utils";

export default function WarksetModal({ liftName, worksets }) {
  const { state: { lifts = [] } = {} } = useApp();
  const getOneRM = () => lifts.find(({ name }) => name === liftName).oneRM;

  const getRoundedWeight = (_rpe, _reps, _oneRM) => {
    return getRoundedLbs(Math.round(getWorksetWeight(_rpe, _reps, _oneRM)));
  };
  return (
    <AntModal trigger={<p className="uppercase">Work</p>}>
      <div className="table text-center w-full ">
        <div className="table-row text-center uppercase font-black leading-wider text-lg">
          <div className="pb-2 table-cell uppercase">Volume</div>

          <div className="pb-2 table-cell ">Plates</div>
        </div>
        {worksets.map(({ id, reps, rpe, sets }, i) => {
          return (
            <div key={id} className="table-row font-medium text-xl">
              {/* <div className="table-cell p-1 text-left ">{i + 1}.</div> */}
              <div className="table-cell p-1 ">
                <div className=" flex items-baseline justify-center">
                  <span className="">
                    {reps} @{rpe}% x {sets}
                  </span>
                  <span className="ml-1 text-xs">
                    {getRoundedWeight(rpe, reps, getOneRM())}
                  </span>
                </div>
              </div>

              <div className="table-cell p-1 ">
                <div className="flex justify-center">
                  {getPlatesOnBar(getRoundedWeight(rpe, reps, getOneRM()))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AntModal>
  );
}
