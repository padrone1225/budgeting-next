import { MouseEventHandler, useState } from "react";
import Expense from "../types/Expense";
import Button from "./Button";
import ShowExpenses from "./ShowExpenses";
import Fade from "./Fade";

import {
  currencyFormatter,
  getTotalExpenses,
} from "../lib/budgetCardFunctions";

interface Props {
  onShowAddExpense: MouseEventHandler;
  uncategorized: Expense[];
  onHandleUncategorizedDelete: Function;
}

function UncategorizedBudgetCard({
  onShowAddExpense,
  uncategorized,
  onHandleUncategorizedDelete,
}: Props) {
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  function onShowExpenses() {
    setShowExpenses(!showExpenses);
  }

  const totalExpenses = getTotalExpenses(uncategorized);

  return (
    <div
      className={`rounded-2xl p-4 shadow-lg ring-1 dark:ring-slate-600 ring-slate-200 mt-12 transition-[height] h-min duration-2000 ease-in-out 
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h2>Uncategorized</h2>
        <div>
          <span>{currencyFormatter.format(totalExpenses)}</span>
        </div>
      </div>
      <div className="flex justify-center md:justify-end items-center">
        <Button primary onClick={onShowAddExpense}>
          Add expense
        </Button>
        <Button onClick={onShowExpenses} disabled={uncategorized.length === 0}>
          {showExpenses ? "Hide expenses" : "View expenses"}
        </Button>
      </div>
      <Fade show={showExpenses}>
        <ShowExpenses
          expenses={uncategorized}
          handleDelete={onHandleUncategorizedDelete}
        />
      </Fade>
    </div>
  );
}

export default UncategorizedBudgetCard;
