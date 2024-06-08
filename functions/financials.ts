import prisma from '@/prisma/client';
import {Transaction} from '@prisma/client';
import {format} from 'date-fns';

export async function getTransactionHistory(): Promise<Transaction[]> {
  try {
    const transactionHistory = await prisma.transaction.findMany({
      include: {
        sticker: true
      },
      orderBy: { createdAt: "desc" },
    });
    return transactionHistory;
  } catch (error) {
    const errorMessage = error as Error;
    throw new Error(`Fetch transaction history failed: ${errorMessage.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getIncome(): Promise<number> {
  try {
    const incomeTransactions = await prisma.transaction.findMany({
      where: {
        type: "income",
      },
    });

    const totalIncome = incomeTransactions.reduce(
      (total: any, transaction: { amount: any }) => total + Number(transaction.amount),
      0
    );

    return totalIncome;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getExpense(): Promise<number> {
  try {
    const expense = await prisma.transaction.findMany({
      where: {
        type: "expense",
      },
    });

    const totalExpense = expense.reduce(
      (total: any, transaction: { amount: any}) => total + Number(transaction.amount),
      0
    );

    return totalExpense;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getHoaFunds(): Promise<number> {
  try {
    const transactions = await prisma.transaction.findMany({});

    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const totalExpense = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const totalHoaFunds = totalIncome - totalExpense;

    return totalHoaFunds;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTransactionChartData() {
  try {
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
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
