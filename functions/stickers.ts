import prisma from '@/prisma/client';
import {format} from 'date-fns';

export async function getStickerSales(): Promise<number> {
  try {
    const stickerSales = await prisma.sticker.findMany();

    return stickerSales.reduce(
      (total: any, sticker: {amount: any}) => total + Number(sticker.amount),
      0
    );
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }

}

export async function getStickerCount(): Promise<number> {
  try {
    return prisma.sticker.count({});
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStickerPercentage(): Promise<any> {
  try {
    const soldCount = await prisma.sticker.count({});

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
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStickerStatistics(color: any, type: string): Promise<any> {
  try {
    const whereClause = color ? { stickerColor: color } : {};
    switch (type) {
      case "count":
        return prisma.sticker.count({ where: whereClause });
      case "sum":
        const sales = await prisma.sticker.findMany({ where: whereClause });
        return sales.reduce(
          (total, sticker) => total + Number(sticker.amount),
          0
        );
      case "percentage":
        const soldCount = await prisma.sticker.count({ where: whereClause });
        const totalQty = await prisma.stickerPrice.findFirst({
          where: { color: color.toUpperCase() },
          select: { quantity: true },
        });
        if (!totalQty || totalQty.quantity === undefined) return 0;
        return (soldCount / totalQty.quantity) * 100;
      default:
        return null;
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStickerChartData() {
  try {
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
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
