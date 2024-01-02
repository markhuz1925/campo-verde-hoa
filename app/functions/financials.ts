import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";

export async function getTransactionHistory(): Promise<Transaction[]> {
  const transactionHistory = await prisma.transaction.findMany({
    include: {
      sticker: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return transactionHistory;
}

export async function getIncome(): Promise<number> {
  const income = await prisma.transaction.findMany({
    where: {
      type: "income",
    },
  });

  const totalIncome = income.reduce(
    (total: any, transaction: any) => total + Number(transaction.amount),
    0
  );

  return totalIncome;
}

export async function getExpense(): Promise<number> {
  const expense = await prisma.transaction.findMany({
    where: {
      type: "expense",
    },
  });

  const totalExpense = expense.reduce(
    (total: any, transaction: any) => total + Number(transaction.amount),
    0
  );

  return totalExpense;
}

export async function getHoaFunds(): Promise<number> {
  const transactions = await prisma.transaction.findMany();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const totalHoaFunds = totalIncome - totalExpense;

  return totalHoaFunds;
}

export async function getTransactionChartData() {
  const data = await prisma.transaction.findMany({
    orderBy: {
      date: "asc",
    },
  });

  type AggregatedData = Record<
    string,
    {
      count: number;
      totalAmount: number;
      incomeTotal: number;
      expenseTotal: number;
    }
  >;

  const aggregatedData: AggregatedData = data.reduce(
    (result: AggregatedData, item) => {
      const date = format(new Date(item.date), "MM/dd/yyyy");
      if (!result[date]) {
        result[date] = {
          count: 0,
          totalAmount: 0,
          incomeTotal: 0,
          expenseTotal: 0,
        };
      }

      result[date].count += 1;
      result[date].totalAmount += Number(item.amount);

      if (item.type === "income") {
        result[date].incomeTotal += Number(item.amount);
      } else if (item.type === "expense") {
        result[date].expenseTotal += Number(item.amount);
      }

      return result;
    },
    {}
  );

  const formattedData = Object.keys(aggregatedData).map((date) => ({
    Date: date,
    ExpenseTotal: aggregatedData[date].expenseTotal,
    IncomeTotal: aggregatedData[date].incomeTotal,
    TotalAmount: aggregatedData[date].totalAmount,
  }));

  return formattedData;
}
