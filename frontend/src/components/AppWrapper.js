import React from "react";

import AppHeader from "./AppHeader";

export default function AppWrapper(props) {
  return (
    <div>
      <AppHeader />
      {props.children}
    </div>
  );
}
