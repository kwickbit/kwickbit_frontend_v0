import SelectQuery from "./SelectQuery";

const TransactionSelectSection = ():JSX.Element => {
  return (
    <div className="grid grid-cols-[36px,150px,108px,60px,120px,100px,400px,125px,100px,143px] xl:grid-cols-[36px,150fr,110fr,60px,160fr,132fr,577fr,168fr,102fr,143px] px-4">
      <div />
      <div className="flex justify-center">
        <SelectQuery placeholder="Date range" />
      </div>
      <div className="flex justify-center pl-2">
        <SelectQuery placeholder="From" />
      </div>
      <div />
      <div className="flex justify-center">
        <SelectQuery placeholder="To" />
      </div>
      <div className="flex justify-center">
        <SelectQuery placeholder="Type" />
      </div>
      <div />
      <div className="flex justify-center">
        <SelectQuery placeholder="Status" />
      </div>
      <div className="flex justify-center">
        <SelectQuery placeholder="Labels" />
      </div>
      <div />
    </div>
  );
};

export default TransactionSelectSection;
