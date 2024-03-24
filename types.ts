import {Dues, Resident, Sticker} from "@prisma/client";

export type ResidentWithOptions = Resident & {
  stickers: Sticker[];
  dues: Dues[];
};
