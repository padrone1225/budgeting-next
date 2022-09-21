import { MouseEvent, useState } from "react";
import BudgetStateInterface from "../types/BudgetStateInterface";
import Button from "./Button";
import ShowExpenses from "./ShowExpenses";
import Fade from "./Fade";
import { BiTrash } from "react-icons/bi";

import {
  currencyFormatter,
  getTotalExpenses,
  getWidth,
  hasExpenses,
} from "../lib/budgetCardFunctions";

interface Props {
  onShowAddExpense: (event: MouseEvent, budgetName: string) => void;
  categoryBudget: BudgetStateInterface;
  budgets: BudgetStateInterface[];
  handleBudgetsChange: Function;
  onHandleBudgetDelete: Function;
}

function BudgetCard({
  onShowAddExpense,
  categoryBudget,
  budgets,
  handleBudgetsChange,
  onHandleBudgetDelete,
}: Props) {
  const [showExpenses, setShowExpenses] = useState<boolean>(false);

  function onShowExpenses() {
    setShowExpenses(!showExpenses);
  }

  function handleExpenseDelete(expenseId: number) {
    const updatedBudgets = budgets.map((budget) => {
      if (budget.category === categoryBudget.category) {
        const updatedExpenses = categoryBudget.individualExpenses.filter(
          (expense) => expense.id !== expenseId
        );
        budget.individualExpenses = updatedExpenses;
      }
      return budget;
    });
    handleBudgetsChange(updatedBudgets);
  }

  const totalExpenses = getTotalExpenses(categoryBudget.individualExpenses);

  const totalBudget = Number(categoryBudget.budget);

  const budgetWarning = (100 * totalExpenses) / totalBudget > 90;
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
      } rounded-2xl p-4 shadow-lg ring-1 dark:ring-slate-600 ring-slate-200 mt-12 transition-[height] h-min duration-2000 ease-in-out 
      `}
    >
      <div
        className={`flex justify-between items-center relative ${
          budgetWarning
            ? "text-fuchsia-800 dark:text-fuchsia-400"
            : "text-black dark:text-white"
        }`}
      >
        <h2>{categoryBudget.category}</h2>
        <button
          className="absolute right-0 -mr-2 -mt-16 z-10 p-2 scale-125"
          onClick={() => onHandleBudgetDelete(categoryBudget)}
        >
          <BiTrash className="text-black dark:text-white" />
        </button>
        <div className="flex flex-wrap justify-center">
          <span>{currencyFormatter.format(totalExpenses)} / </span>
          <span> {currencyFormatter.format(totalBudget)}</span>
        </div>
      </div>
      <div className="w-full bg-violet-200 dark:bg-teal-600 rounded-full h-4 my-8">
        <div
          className={`${isBudgetEmpty()} h-4 rounded-full transition-[width] duration-1000 ease-in-out `}
          style={{
            width: `${getWidth(totalExpenses, totalBudget)}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-center md:justify-end items-center">
        <Button
          primary
          onClick={(event) => onShowAddExpense(event, categoryBudget.category)}
        >
          Add expense
        </Button>
        <Button
          onClick={onShowExpenses}
          disabled={!hasExpenses(categoryBudget)}
        >
          {showExpenses ? "Hide expenses" : "View expenses"}
        </Button>
      </div>
      <Fade show={showExpenses}>
        <ShowExpenses
          expenses={categoryBudget.individualExpenses}
          handleDelete={handleExpenseDelete}
        />
      </Fade>
    </div>
  );
}

export default BudgetCard;
