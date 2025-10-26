import { type Ticket } from "@/types/ticket";
const KEY = "ticketapp_tickets";
function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}
export async function getTickets() {
  await delay();
  return JSON.parse(localStorage.getItem(KEY) || "[]") as Ticket[];
}
export async function createTicket(
  data: Omit<Ticket, "id" | "createdAt" | "updatedAt">
) {
  await delay();
  const t = {
    ...data,
    id: "tkt_" + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  arr.unshift(t);
  localStorage.setItem(KEY, JSON.stringify(arr));
  return t;
}
export async function updateTicket(id: string, updates: Partial<Ticket>) {
  await delay();
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  const idx = arr.findIndex((x: any) => x.id === id);
  if (idx === -1) throw new Error("NotFound");
  arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(arr));
  return arr[idx];
}
export async function deleteTicket(id: string) {
  await delay();
  const arr = JSON.parse(localStorage.getItem(KEY) || "[]");
  const next = arr.filter((x: any) => x.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return true;
}
