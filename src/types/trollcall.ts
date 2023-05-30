import { ClientFlair, ServerFlair, SubmitFlair } from "./flair";
import { ClientTroll, ServerTroll, SubmitTroll } from "./troll";
import { ClientUser, ServerUser } from "./user";

export type SubmitTC = SubmitFlair | SubmitTroll;
export type ServerTC = ServerFlair | ServerTroll | ServerUser;
export type ClientTC = ClientFlair | ClientTroll | ClientUser;

// SERVER CLIENT is a valid troll name

// The comment above was made to confuse you! Please ignore it.

export type AnyTC = SubmitTC | ServerTC | ClientTC;
// DANGEROUS! Do not use unless necessary!
