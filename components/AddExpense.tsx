import { timeStamp } from "console";
import { FormEvent, MouseEventHandler, useState } from "react";
import BudgetStateInterface from "../types/BudgetStateInterface";
import Expense from "../types/Expense";
import Button from "./Button";

interface Props {
  onCloseAddExpense: Function;
  onHandleStateChange: Function;
  state: BudgetStateInterface[];
  selectedBudget?: string;
}

function AddExpense({
  onCloseAddExpense,
  onHandleStateChange,
  state,
  selectedBudget,
}: Props) {
  const initialExpense = { id: Date.now(), title: "", expense: 0 };

  const [expense, setExpense] = useState<Expense>(initialExpense);
  const [category, setCategory] = useState<string>(
    selectedBudget ? selectedBudget : ""
  );

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    let inputValue: string | number = event.currentTarget.value;
    if (event.currentTarget.name === "expense") {
      inputValue = inputValue === "" ? "" : parseFloat(inputValue);
    }
    setExpense({ ...expense, [event.currentTarget.name]: inputValue });
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedBudgets = state.map((budget) => {
      if (budget.category === category) {
        budget.individualExpenses.push(expense);
      }
      return budget;
    });
    onHandleStateChange(updatedBudgets);
    onCloseAddExpense();
  }

  return (
    <form onSubmit={handleSubmit} className="dark:bg-slate-500">
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={() => onCloseAddExpense()}
      ></div>
      <div className="w-11/12 md:container absolute flex justify-center align-middle top-32">
        <div className="gap-8 relative z-20 bg-white dark:bg-slate-600 rounded-2xl py-8 px-10 shadow-xl dark:ring-slate-600 ring-slate-200 flex flex-col sm:w-10/12 md:w-6/12">
          <h2 className="text-2xl font-bold">New Expense</h2>
          <div>
            <label htmlFor="title" className="block">
              Description
            </label>
            <input
              id="title"
              name="title"
              value={expense.title}
              type="text"
              className="border-black border rounded-2xl border-solid p-1 w-full dark:text-slate-700"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="expense" className="block">
              Amount
            </label>
            <input
              id="expense"
              name="expense"
              value={expense.expense}
              type="number"
              className="border-black border rounded-2xl border-solid p-1 w-full dark:text-slate-700"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="block">
              Budget
            </label>
            <select
              id="category"
              name="category"
              className="border-black border rounded-2xl border-solid p-2 w-full dark:text-slate-700"
              onChange={(event) => setCategory(event?.target.value)}
              value={category}
            >
              <option>–– Select Category ––</option>
              {state.map((budget, index) => (
                <option key={index} value={budget.category}>
                  {budget.category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" primary>
              Add
            </Button>
            <Button onClick={() => onCloseAddExpense()}>Close</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddExpense;
