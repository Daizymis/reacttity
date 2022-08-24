import React from "react";
import ReactDOM from "react-dom";

let stateArray = [];
let cursor = 0;
function useMyState(initialState) {
  let currentCursot = cursor;
  stateArray[currentCursot] = stateArray[currentCursot] || initialState;
  function setState(newState) {
    stateArray[currentCursot] = newState;
    render();
  }

  let state = stateArray[currentCursot];
  ++cursor;
  return [state, setState];
}

function Counter() {
  cursor = 0;
  let [count, setCount] = useMyState(0);
  let [name, setName] = useMyState("hello");
  console.log(setCount);
  const onClick = () => {
    setCount(++count);
  };
  const clickName = () => {
    setName(name + "s");
  };
  return (
    <div>
      <div>{count}</div>
      <button onClick={onClick}>点击</button>
      <div>{name}</div>
      <button onClick={clickName}>点击</button>
    </div>
  );
}
export function render() {
  ReactDOM.render(
    <React.StrictMode>
      <div>hello world</div>
      <Counter />
    </React.StrictMode>,
    document.getElementById("root")
  );
  //Todo
  cursor = 0;
}
