import prisma from "@/prisma/client";

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
