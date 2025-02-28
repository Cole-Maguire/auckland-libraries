import { JSX } from "react";

type HeadProps = {
  className?: string;
};

export default function Head({ className = "" }: HeadProps): JSX.Element {
  return (
    <header className={`${className} bg-gray-800 p-4 text-white shadow-md`}>
      <h1 className="text-2xl font-bold">Auckland Library Tracker</h1>
      {/* eslint-disable-next-line @next/next/no-page-custom-font*/}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=share&display=optional"
      />
    </header>
  );
}
