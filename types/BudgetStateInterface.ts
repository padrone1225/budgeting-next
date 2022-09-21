import Expense from "./Expense";

interface BudgetStateInterface {
  individualExpenses: Expense[];
  category: string;
  budget: number;
  overSpend: boolean;
}

export default BudgetStateInterface;
