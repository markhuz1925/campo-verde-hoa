import prisma from "@/prisma/client";
import { format } from "date-fns";

export async function getStickerSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany();

  const totalSales = stickerSales.reduce(
    (total: any, sticker: any) => total + Number(sticker.amount),
    0
  );

  return totalSales;
}

export async function getStickerCount(): Promise<number> {
  const stickerCount = await prisma.sticker.count();
  return stickerCount;
}

export async function getStickerPercentage() {
  const soldCount = await prisma.sticker.count();

  const totalQty = await prisma.stickerPrice.aggregate({
    _sum: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty._sum?.quantity === null) {
    throw new Error("Quantity not available.");
  }

  const totalQuantity = totalQty._sum.quantity;

  const percentage = (soldCount / totalQuantity) * 100;

  return percentage;
}

export async function getGreenCount(): Promise<number> {
  const stickerGreenCount = await prisma.sticker.count({
    where: {
      stickerColor: "green",
    },
  });

  return stickerGreenCount;
}

export async function getGreenSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "green",
    },
  });

  const totalSales = stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  return totalSales;
}

export async function getYellowCount(): Promise<number> {
  const stickerCount = await prisma.sticker.count({
    where: {
      stickerColor: "yellow",
    },
  });

  return stickerCount;
}

export async function getYellowSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "yellow",
    },
  });

  const totalSales = stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  return totalSales;
}

export async function getWhiteCount(): Promise<number> {
  const stickerCount = await prisma.sticker.count({
    where: {
      stickerColor: "white",
    },
  });

  return stickerCount;
}

export async function getWhiteSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "white",
    },
  });

  const totalSales = stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  return totalSales;
}

export async function getRedCount(): Promise<number> {
  const stickerCount = await prisma.sticker.count({
    where: {
      stickerColor: "red",
    },
  });

  return stickerCount;
}

export async function getRedSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "red",
    },
  });

  const totalSales = stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  return totalSales;
}

export async function getSilverCount(): Promise<number> {
  const stickerCount = await prisma.sticker.count({
    where: {
      stickerColor: "silver",
    },
  });

  return stickerCount;
}

export async function getSilverSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "silver",
    },
  });

  const totalSales = stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );

  return totalSales;
}

export async function getSilverPercentage() {
  const soldCount = await prisma.sticker.count({
    where: {
      stickerColor: "silver",
    },
  });

  const totalQty = await prisma.stickerPrice.findFirst({
    where: {
      color: "SILVER",
    },
    select: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty.quantity === undefined) {
    throw new Error("Quantity not available for silver color.");
  }

  const percentage = (soldCount / totalQty.quantity) * 100;

  return percentage;
}

export async function getGreenPercentage() {
  const soldCount = await prisma.sticker.count({
    where: {
      stickerColor: "green",
    },
  });

  const totalQty = await prisma.stickerPrice.findFirst({
    where: {
      color: "GREEN",
    },
    select: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty.quantity === undefined) {
    throw new Error("Quantity not available for green color.");
  }

  const percentage = (soldCount / totalQty.quantity) * 100;

  return percentage;
}

export async function getYellowPercentage() {
  const soldCount = await prisma.sticker.count({
    where: {
      stickerColor: "yellow",
    },
  });

  const totalQty = await prisma.stickerPrice.findFirst({
    where: {
      color: "YELLOW",
    },
    select: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty.quantity === undefined) {
    throw new Error("Quantity not available for yellow color.");
  }

  const percentage = (soldCount / totalQty.quantity) * 100;

  return percentage;
}

export async function getWhitePercentage() {
  const soldCount = await prisma.sticker.count({
    where: {
      stickerColor: "white",
    },
  });

  const totalQty = await prisma.stickerPrice.findFirst({
    where: {
      color: "WHITE",
    },
    select: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty.quantity === undefined) {
    throw new Error("Quantity not available for white color.");
  }

  const percentage = (soldCount / totalQty.quantity) * 100;

  return percentage;
}

export async function getRedPercentage() {
  const soldCount = await prisma.sticker.count({
    where: {
      stickerColor: "red",
    },
  });

  const totalQty = await prisma.stickerPrice.findFirst({
    where: {
      color: "RED",
    },
    select: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty.quantity === undefined) {
    throw new Error("Quantity not available for red color.");
  }

  const percentage = (soldCount / totalQty.quantity) * 100;

  return percentage;
}

export async function getStickerChartData() {
  const stickerData = await prisma.sticker.findMany({
    orderBy: {
      stickerDate: "asc",
    },
  });

  type AggregatedData = Record<string, number>;

  const aggregatedData: AggregatedData = stickerData.reduce(
    (result: AggregatedData, item) => {
      const date = format(new Date(item.stickerDate), "MM/dd/yyyy");
      result[date] = (result[date] || 0) + 1;
      return result;
    },
    {}
  );

  const formattedData = Object.keys(aggregatedData).map((date) => ({
    Date: date,
    Sticker: aggregatedData[date],
  }));

  return formattedData;
}
