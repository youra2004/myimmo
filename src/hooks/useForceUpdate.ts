import { useState } from "react";

function useForceUpdate() {
  const [_, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
}

export default useForceUpdate;
