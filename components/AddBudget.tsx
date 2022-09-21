import React, { FormEvent, useState } from "react";
import BudgetStateInterface from "../types/BudgetStateInterface";
import Button from "./Button";

interface Props {
  onCloseAddBudget: Function;
  onHandleStateChange: Function;
  state: BudgetStateInterface[];
}

function AddBudget({ onCloseAddBudget, onHandleStateChange, state }: Props) {
  const initialBudget: BudgetStateInterface = {
    individualExpenses: [],
    category: "",
    budget: 0,
    overSpend: false,
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    let inputValue = event.currentTarget.value;
    setNewBudget({ ...newBudget, [event.currentTarget.name]: inputValue });
  };

  const [newBudget, setNewBudget] = useState(initialBudget);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onHandleStateChange([...state, newBudget]);
    onCloseAddBudget();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={() => onCloseAddBudget()}
      ></div>
      <div className="w-11/12 md:container absolute flex justify-center align-middle top-32">
        <div className="gap-8 relative z-20 bg-white dark:bg-slate-600 rounded-2xl py-8 px-10 shadow-xl dark:ring-slate-600 ring-slate-200 flex flex-col sm:w-10/12 md:w-6/12">
          {" "}
          <h2 className="text-2xl font-bold">New Budget</h2>
          <div>
            <label htmlFor="category" className="block">
              Name
            </label>
            <input
              id="category"
              name="category"
              value={newBudget.category}
              type="text"
              className="border-black border rounded-2xl border-solid p-1 w-full dark:text-slate-700"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="budget" className="block">
              Max Spending
            </label>
            <input
              id="budget"
              name="budget"
              value={newBudget.budget}
              type="number"
              className="border-black border rounded-2xl border-solid p-1 w-full dark:text-slate-700"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" primary>
              Add
            </Button>
            <Button onClick={() => onCloseAddBudget()}>Close</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddBudget;
