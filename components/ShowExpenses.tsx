import Expense from "../types/Expense";
import { currencyFormatter } from "../lib/budgetCardFunctions";
import { BiXCircle } from "react-icons/bi";

interface Props {
  expenses: Expense[];
  handleDelete?: Function;
}

function ShowExpenses({ expenses, handleDelete }: Props) {
  const getDate = (expenseId: number) => {
    const idToDate = new Date(expenseId);
    const options: {} = { month: "numeric", day: "numeric" };
    const expenseDate = idToDate.toLocaleDateString("de-DE", options);
    const expenseWeekday = idToDate.toLocaleDateString("de-DE", {
      weekday: "long",
    });

    return expenseDate + " " + expenseWeekday;
  };

  return (
    <>
      <h3 className="mt-4 mb-2 border-b-2 dark:border-slate-500">Expenses</h3>
      <ul className="mt-4">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex items-center gap-4 w-full mb-1 border-b dark:border-slate-600"
          >
            <span className="basis-2/12 text-sm font-thin">
              {getDate(expense.id)}
            </span>
            <span className="basis-5/12 text-sm ">{expense.title}</span>
            <span className="basis-4/12 text-right ">
              {currencyFormatter.format(Number(expense.expense))}
            </span>
            {handleDelete && (
              <div className="flex basis-1/12  justify-end">
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="mb-1text-2xl "
                >
                  <BiXCircle />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ShowExpenses;
