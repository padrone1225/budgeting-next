import { MouseEventHandler, useState } from "react";
import Button from "./Button";
import BudgetStateInterface from "../types/BudgetStateInterface";
import ShowExpenses from "./ShowExpenses";
import Fade from "./Fade";

import {
  currencyFormatter,
  getTotalExpenses,
  getWidth,
} from "../lib/budgetCardFunctions";

interface Props {
  onShowAddExpense: MouseEventHandler;
  budgets: BudgetStateInterface[];
}

function TotalBudgetCard({ onShowAddExpense, budgets }: Props) {
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  function onShowExpenses() {
    setShowExpenses(!showExpenses);
  }

  const expenses = budgets.map((budget) => budget.individualExpenses).flat();

  const totalExpenses = Number(getTotalExpenses(expenses));

  const totalBudgets = budgets.reduce((a, b) => a + Number(b.budget), 0);

  const budgetWarning = (100 * totalExpenses) / totalBudgets > 90;
  const isBudgetEmpty = () =>
    budgetWarning
      ? "bg-gradient-to-r from-violet-500 to-red-500 dark:bg--gtradient-to-r dark:from-teal-200 dark:to-fuchsia-600"
      : "bg-violet-500 dark:bg-teal-200";

  return (
    <div
      className={`${
        budgetWarning
          ? "shadow-fuchsia-800 dark:shadow-fuchsia-400/70"
          : "shadow-lg"
      } rounded-2xl p-4 shadow-lg ring-1 dark:ring-slate-600 ring-slate-200 mt-12 transition-[height] h-min duration-2000 ease-in-out`}
    >
      <div
        className={`flex justify-between items-center relative ${
          budgetWarning
            ? "text-fuchsia-800 dark:text-fuchsia-400"
            : "text-black dark:text-white"
        }`}
      >
        <h2>Total Budget</h2>
        <div>
          <span>{currencyFormatter.format(totalExpenses)} / </span>
          <span>{currencyFormatter.format(totalBudgets)}</span>
        </div>
      </div>
      <div className="w-full bg-violet-200 dark:bg-teal-600 rounded-full h-4 my-8">
        <div
          className={`${isBudgetEmpty()} h-4 rounded-full transition-[width] duration-1000 ease-in-out `}
          style={{
            width: `${getWidth(totalExpenses, totalBudgets)}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-center md:justify-end items-center">
        <Button primary onClick={onShowAddExpense}>
          Add expense
        </Button>
        <Button onClick={onShowExpenses} disabled={expenses.length === 0}>
          {showExpenses ? "Hide expenses" : "View expenses"}
        </Button>
      </div>
      <Fade show={showExpenses}>
        <ShowExpenses expenses={expenses} />
      </Fade>
    </div>
  );
}

export default TotalBudgetCard;
