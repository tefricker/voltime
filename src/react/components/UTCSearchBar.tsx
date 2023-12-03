import React from "react";
import Select from "react-select";

const UTCSearchBar = ({
  options,
  onChange,
}: {
  options: { value: string; label: string }[];
  onChange: (newValue: { value: string; label: string }) => void;
}) => {
  return (
    <Select
      options={options}
      isSearchable
      placeholder="Timezone"
      onChange={onChange}
    />
  );
};

export default UTCSearchBar;
