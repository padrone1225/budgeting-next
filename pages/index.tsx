import type { NextPage } from "next";
import { SyntheticEvent, useState } from "react";
import Background from "../components/Background";
import BudgetCard from "../components/BudgetCard";
import Header from "../components/Header";
import { ThemeProvider } from "../themes/mode";
import BudgetStateInterface from "../types/BudgetStateInterface";
import Expense from "../types/Expense";

const Home: NextPage = () => {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("Uncategorized");
  const [budgets, setBudgets] = useState<BudgetStateInterface[]>([]);
  const [uncategorizedExpenses, setUncategorizedExpenses] = useState<Expense[]>(
    []
  );

  function handleShowAddBudget() {
    setShowAddBudget(!showAddBudget);
  }

  function handleShowAddExpense(
    _event: SyntheticEvent,
    budgetName?: string
  ): void {
    setShowAddExpense(!showAddExpense);
    budgetName && setSelectedBudget(budgetName);
  }

  function handleStateChange(newState: []) {
    setBudgets(newState);
  }

  function handleBudgetDelete(categoryBudget: BudgetStateInterface) {
    const { category, individualExpenses } = categoryBudget;

    const expenses = individualExpenses.map((expense) => expense);
    setUncategorizedExpenses([...uncategorizedExpenses, ...expenses]);

    const updatedBudgets = budgets.filter(
      (budget) => budget.category !== category
    );
    setBudgets(updatedBudgets);
  }

  return (
    <ThemeProvider>
      <Background>
        <div className="container mx-auto dark:text-white selection:text-violet-500 dark:selection:text-teal-200">
          <Header
            onShowAddBudget={handleShowAddBudget}
            onShowAddExpense={handleShowAddExpense}
          />
          {budgets.map((budget, index) => (
            <BudgetCard
              key={index}
              onShowAddExpense={handleShowAddExpense}
              categoryBudget={budget}
              budgets={budgets}
              handleBudgetsChange={handleStateChange}
              onHandleBudgetDelete={handleBudgetDelete}
            />
          ))}
        </div>
      </Background>
    </ThemeProvider>
  );
};

export default Home;
