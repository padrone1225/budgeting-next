import { MouseEventHandler } from "react";
import Button from "./Button";
import ModeToggle from "./ModeToggle";

interface Props {
  onShowAddBudget: MouseEventHandler;
  onShowAddExpense: MouseEventHandler;
}

function Header({ onShowAddBudget, onShowAddExpense }: Props) {
  return (
    <>
      <div className="flex md:flex-row flex-col m-4 justify-between items-center">
        <h1>Budgeting-App</h1>
        <ModeToggle />
        <div className="flex m-2">
          <Button primary onClick={onShowAddBudget}>
            Add Budget
          </Button>
          <Button onClick={onShowAddExpense}>Add Expense</Button>
        </div>
      </div>
    </>
  );
}

export default Header;
