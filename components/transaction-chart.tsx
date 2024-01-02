"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TransactionChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={500} style={{ marginLeft: -20 }}>
      <LineChart data={data}>
        <XAxis dataKey={"Date"} stroke="#1a401d" style={{ fontSize: 9 }} />
        <YAxis style={{ fontSize: 9 }} />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <Line
          type="natural"
          dataKey={"IncomeTotal"}
          stroke="#1a401d"
          activeDot={{ r: 8 }}
        />
        <Line type="natural" dataKey={"ExpenseTotal"} stroke="#d32f2f" />
      </LineChart>
    </ResponsiveContainer>
  );
}
