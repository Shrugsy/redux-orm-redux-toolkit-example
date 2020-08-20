import { createSelector } from "redux-orm";
import orm from "../orm";

// =====SELECTORS=====

// returns all users
export const usersSelector = createSelector(orm.User);
