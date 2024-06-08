import prisma from '@/prisma/client';
import {format} from 'date-fns';

export async function getStickerSales(retryCount = 3): Promise<number> {
  try {
    const stickerSales = await prisma.sticker.findMany({});

    return stickerSales.reduce(
      (total: any, sticker: {amount: any}) => total + Number(sticker.amount),
      0
    );
  } catch (error) {
    if (retryCount > 0) {
      const errorMessage = (error as Error).message || 'Unknown error';
      console.warn(`Retrying getStickerSales due to error: ${errorMessage}`);
      await prisma.$disconnect();
      return getStickerSales(retryCount - 1);
    } else {
      const errorMessage = (error as Error).message || 'Unknown error';
      console.error("Failed to fetch sticker sales after retries:", errorMessage);
      await prisma.$disconnect();
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }

}

export async function getStickerCount(retryCount = 3): Promise<number> {
  try {
    return prisma.sticker.count({});
  } catch (error) {
    if (retryCount > 0) {
      const errorMessage = (error as Error).message || 'Unknown error';
      console.warn(`Retrying getStickerCount due to error: ${errorMessage}`);
      await prisma.$disconnect();
      return getStickerSales(retryCount - 1);
    } else {
      const errorMessage = (error as Error).message || 'Unknown error';
      console.error("Failed to fetch sticker count after retries:", errorMessage);
      await prisma.$disconnect();
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStickerPercentage(retryCount = 3): Promise<any> {
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
    if (retryCount > 0) {
      const errorMessage = (error as Error).message || 'Unknown error';
      console.warn(`Retrying getStickerPercentage due to error: ${errorMessage}`);
      await prisma.$disconnect();
      return getStickerSales(retryCount - 1);
    } else {
      const errorMessage = (error as Error).message || 'Unknown error';
      console.error("Failed to fetch sticker percentage after retries:", errorMessage);
      await prisma.$disconnect();
      throw error;
    }
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
