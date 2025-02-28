import { Dispatch, JSX, SetStateAction } from "react";

type HeadProps = {
  className: string;
  saveID: string;
  setSaveID: Dispatch<SetStateAction<string>>;
};

export default function Head({ className }: HeadProps): JSX.Element {
  return (
    <header className={`${className} bg-gray-800 p-4 text-white shadow-md`}>
      <h1 className="text-2xl font-bold">Auckland Library Tracker</h1>
    </header>
  );
}
