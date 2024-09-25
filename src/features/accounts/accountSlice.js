import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//takes some options
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    //looks like we are mutating the state directly but not really(Immer js makes it immutable behind the scenes)
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;

      state.balance += action.payload.amount;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
    },
    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
  },
});

//action creators?
export const {deposit, withdraw, requestLoan, payLoan} = accountSlice.actions

console.log(accountSlice)
export default accountSlice.reducer

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//       case "account/convertingCurrency":
//       return {
//         ...state, isLoading: true
//       }
//     default:
//       return state;
//   }
// }

// //action creators
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency",});
//     //const host = 'api.frankfurter.app';
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();

//     const convertedAmount = data.rates.USD;
//     //console.log(getState);
//     dispatch({ type: "account/deposit", payload: convertedAmount });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
