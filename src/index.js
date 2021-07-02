import { createStore, applyMiddleware } from "redux";

const balance = document.getElementById("balance");
const deposit5 = document.getElementById("deposit5");
const deposit25 = document.getElementById("deposit25");
const withdraw5 = document.getElementById("withdraw5");
const withdraw25 = document.getElementById("withdraw25");

deposit5.onclick = () => store.dispatch({ type: "deposit", amount: 5 });
deposit25.onclick = () => store.dispatch({ type: "deposit", amount: 25 });
withdraw5.onclick = () => store.dispatch({ type: "withdraw", amount: 5 });
withdraw25.onclick = () => store.dispatch({ type: "withdraw", amount: 25 });

const reducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case "deposit":
      return { balance: state.balance + action.amount };
    case "withdraw":
      return { balance: state.balance - action.amount };
    default:
      return state;
  }
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state: ", store.getState());
  console.groupEnd(action.type);
  return result;
};

const store = createStore(reducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(
    "The state has changed. Here is the new state:",
    store.getState()
  );
  const state = store.getState();
  balance.innerHTML = state.balance;
});
