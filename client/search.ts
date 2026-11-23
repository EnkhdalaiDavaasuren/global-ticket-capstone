// client/search.ts
import type { EventView } from './api';

export function filterEvents(
  events: EventView[], keyword: string
): EventView[] {
  const normalized = keyword.trim().toLocaleLowerCase();
  return events.filter(event =>
    event.title.toLocaleLowerCase().includes(normalized)
  );
}
