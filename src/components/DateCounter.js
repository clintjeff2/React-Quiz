import { useReducer, useState } from "react";

function reducer(state, action) {

  // console.log(state, action); -- would always help in this case

  // if(action.type === "inc") return {count: state.count + state.step, step:state.step};
  // if(action.type === "dec") return {count: state.count - state.step, step:state.step};
  // if(action.type === "setCount") return {count: action.payload, step: state.step};
  // if(action.type === "setStep") return {count: state.count, step: action.payload};
  
  switch(action.type){
    case "inc":
      return {...state, count: state.count + state.step, step:state.step};
    case "dec":
      return {...state, count: state.count - state.step, step:state.step};
    case "setCount":
      return {...state, count: action.payload, step: state.step};
    case "setStep":
      return {...state, count: state.count, step: action.payload};
    case "reset":
      return {count: 0, step: 1};
    default: 
      throw new Error('Unkown action');
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState = {
    count: 0, 
    step: 1
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const {count, step} = state;
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec"})
  };

  const inc = function () {
    dispatch({ type: "inc"});
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: e.target.value * 1})
  };
  
  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: e.target.value * 1})
  };

  const reset = function () {
    dispatch({ type: "reset"} );
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
