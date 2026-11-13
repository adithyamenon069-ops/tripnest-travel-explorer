import { useEffect, useId, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const navigate = useNavigate();
  const listId = useId();
  const [q, setQ] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [minDate, setMinDate] = useState<string>();

  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/destinations",
      search: {
        q: q.trim() || undefined,
        date: date || undefined,
        travellers: Number(travellers) || undefined,
      },
    });
  };

  const field = "flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors focus-within:bg-secondary hover:bg-muted";
  const label = "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground";
  const input = "w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search destinations"
      className="grid gap-1 rounded-[1.75rem] border border-border/60 bg-background p-2 shadow-card md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center"
    >
      <label className={field}>
        <MapPin className="size-5 shrink-0 text-primary" />
        <span className="flex-1">
          <span className={label}>Destination</span>
          <input
            className={input}
            placeholder="Where to? e.g. Bali"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            list={listId}
            maxLength={60}
          />
          <datalist id={listId}>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name} />
            ))}
          </datalist>
        </span>
      </label>
      <label className={`${field} md:border-l md:border-border/60`}>
        <CalendarDays className="size-5 shrink-0 text-ocean" />
        <span className="flex-1">
          <span className={label}>Travel date</span>
          <input type="date" className={input} value={date} min={minDate} onChange={(e) => setDate(e.target.value)} />
        </span>
      </label>
      <label className={`${field} md:border-l md:border-border/60`}>
        <Users className="size-5 shrink-0 text-sun" />
        <span className="flex-1">
          <span className={label}>Travellers</span>
          <select className={`${input} cursor-pointer`} value={travellers} onChange={(e) => setTravellers(e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "traveller" : "travellers"}
              </option>
            ))}
          </select>
        </span>
      </label>
      <Button type="submit" size="lg" className="h-14 rounded-2xl px-7 text-base font-bold shadow-glow md:h-16">
        <Search className="!size-5" /> Search
      </Button>
    </form>
  );
}
