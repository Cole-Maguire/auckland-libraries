"use client";

import { Suspense } from "react";
import Page from "./components/Page";

export default function Home() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
