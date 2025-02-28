import { Dispatch, JSX, SetStateAction } from "react";

type HeadProps = {
  className: string;
  saveID: string;
  setSaveID: Dispatch<SetStateAction<string>>;
};

export default function Head({ className }: HeadProps): JSX.Element {
  return (
    <header className={`${className} p-4`}>
      <h1 className="text-2xl">Auckland Library Tracker</h1>
    </header>
  );
}
