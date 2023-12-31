import prisma from "@/prisma/client";
import { Transaction } from "@prisma/client";

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
