import React, { useState } from "react";
import ReactDOM from "react-dom";
let allDeps = [];
let effectCursor = 0;
function useEffect(callback, depArray = []){
    if (!depArray.length) {
        callback();
        allDeps[effectCursor] = depArray;
        effectCursor++;
        return;
    }
    const deps = allDeps[effectCursor];
    // allDeps[effectCursor] = depArray;

    const hasChanged = deps ? depArray.some((el,i) => el !== deps[i]) : true;
    if (hasChanged) {
        callback();
        allDeps[effectCursor] = depArray;
    }
    effectCursor++;
}
function Counter() {
    let [count, setCount] = useState(0);
    let [name, setName] = useState("hello");
    useEffect(()=>{
        console.log('count');
    }, [])
    useEffect(()=>{
       console.log('name changed');
    }, [name])
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
  }