import { Locale } from "../types";
import { Dictionary } from "../types";
import { hu } from "./hu";
import { en } from "./en";
import { de } from "./de";
import { zh } from "./zh";
import { he } from "./he";
import { vi } from "./vi";
import { ru } from "./ru";

export { hu, en, de, zh, he, vi, ru };
export const dictionaries: Record<Locale, Dictionary> = { hu, en, de, zh, he, vi, ru };
