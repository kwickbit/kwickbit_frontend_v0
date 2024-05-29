import Link from "next/link";
import { reportTypes } from "@/lib/report-types";

export const ReportsView = (): React.JSX.Element => {
  return <div className="max-w-7xl mx-auto mt-6 px-4 pb-12">
    <h2>Available reports:</h2>
    <ul>
      {reportTypes.map(type =>
        <li key={type.title}>
          <p><Link className="font-bold underline" href={type.link}>
            {type.title}
          </Link> - {type.description}</p>
        </li>
      )}
    </ul>
  </div>;
};
