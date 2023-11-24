interface Props {
  placeholder: string;
}

const SelectQuery = (props: Props):JSX.Element => {
  return (
    <select
      name="date"
      className="rounded-full text-sm text-[#BDC1CA] bg-[#f1f1ef] shadow border pl-3 pr-2 lx:pr-4 py-2 after:right-1 focus-visible:ring-0 focus-visible:ring-blue-200"
    >
      <option hidden>{props.placeholder}</option>
    </select>
  );
};

export default SelectQuery;
