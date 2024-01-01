import { Dues, Resident, Sticker, Transaction } from "@prisma/client";

export type ResidentWithOptions = Resident & {
  stickers: Sticker[];
  dues: Dues[];
};
