import { State as Auth } from "../features/auth/types";
import { State as Stocks } from "../features/stocks/types";
import { State as Notes } from "../features/notes/types";
import { State as Profile } from "../features/profile/types";

export type States = {
  auth: Auth;
  stocks: Stocks;
  notes: Notes;
  profile: Profile;
};
