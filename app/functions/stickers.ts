import prisma from "@/prisma/client";
import { format } from "date-fns";

export async function getStickerSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany();

  return stickerSales.reduce(
    (total: any, sticker: any) => total + Number(sticker.amount),
    0
  );
}

export async function getStickerCount(): Promise<number> {
  return prisma.sticker.count();
}

export async function getStickerPercentage() {
  const soldCount = await prisma.sticker.count();

  const totalQty = await prisma.stickerPrice.aggregate({
    _sum: {
      quantity: true,
    },
  });

  if (!totalQty || totalQty._sum?.quantity === null) {
    // throw new Error("Quantity not available.");
    return 0;
  }

  const totalQuantity = totalQty._sum.quantity;

  return (soldCount / totalQuantity) * 100;
}

export async function getGreenCount(): Promise<number> {
  return prisma.sticker.count({
    where: {
      stickerColor: "green",
    },
  });
}

export async function getGreenSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "green",
    },
  });

  return stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );
}

export async function getYellowCount(): Promise<number> {
  return prisma.sticker.count({
    where: {
      stickerColor: "yellow",
    },
  });
}

export async function getYellowSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "yellow",
    },
  });

  return stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );
}

export async function getWhiteCount(): Promise<number> {
  return prisma.sticker.count({
    where: {
      stickerColor: "white",
    },
  });
}

export async function getWhiteSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "white",
    },
  });

  return stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );
}

export async function getRedCount(): Promise<number> {
  return prisma.sticker.count({
    where: {
      stickerColor: "red",
    },
  });
}

export async function getRedSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "red",
    },
  });

  return stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );
}

export async function getSilverCount(): Promise<number> {
  return prisma.sticker.count({
    where: {
      stickerColor: "silver",
    },
  });
}

export async function getSilverSales(): Promise<number> {
  const stickerSales = await prisma.sticker.findMany({
    where: {
      stickerColor: "silver",
    },
  });

  return stickerSales.reduce(
    (total: any, current: any) => total + Number(current.amount),
    0
  );
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
    // throw new Error("Quantity not available for silver color.");
    return 0;
  }

  return (soldCount / totalQty.quantity) * 100;
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
    // throw new Error("Quantity not available for green color.");
    return 0;
  }

  return (soldCount / totalQty.quantity) * 100;
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
    // throw new Error("Quantity not available for yellow color.");
    return 0;
  }

  return (soldCount / totalQty.quantity) * 100;
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
    // throw new Error("Quantity not available for white color.");
    return 0;
  }

  return (soldCount / totalQty.quantity) * 100;
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
    // throw new Error("Quantity not available for red color.");
    return 0;
  }

  return (soldCount / totalQty.quantity) * 100;
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

  return Object.keys(aggregatedData).map((date) => ({
    Date: date,
    Sticker: aggregatedData[date],
  }));
}
