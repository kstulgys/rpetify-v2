import React from "react";

import { Select } from "antd";

const { Option } = Select;

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }
export default function AntSelect({ options = [] }) {
  return (
    <Select
      dialog
      className="w-full text-xl text-center"
      defaultValue={options[0]}
      // style={{ width: 120 }}
      // defaultValue="lucy"
      // style={{ width: 120 }}
      // onChange={handleChange}
    >
      {options.map(o => {
        return (
          <Option className="text-xl" value={o}>
            {o}
          </Option>
        );
      })}
    </Select>
  );
}
