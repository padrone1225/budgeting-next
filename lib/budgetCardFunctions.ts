import BudgetStateInterface from "../types/BudgetStateInterface";
import Expense from "../types/Expense";

const currencyFormatter = new Intl.NumberFormat("de-DE", {
  currency: "eur",
  style: "currency",
  minimumFractionDigits: 0,
});

const getTotalExpenses = (expenses: Expense[]) => {
  const result = expenses.reduce((a, b) => a + b.expense, 0);
  return result;
};

const getWidth = (totalExpenses: number, totalBudget: number) => {
  if (totalExpenses > totalBudget) {
    return 100;
  } else if (totalBudget > 0) {
    const result = (100 * totalExpenses) / totalBudget;
    return result;
  } else {
    return 0;
  }
};

const hasExpenses = (budget: BudgetStateInterface) =>
  budget.individualExpenses.length > 0;

export { currencyFormatter, getTotalExpenses, getWidth, hasExpenses };
