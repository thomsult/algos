/**
 * In this challenge, you should compute a week planning split in 1 hour slots
 * and including existing events. To keep it simple, don't work with Dates!
 * Be carefull with leading 0!
 *
 * Example:
 * Input: [{ day: "Monday", startTime: "09:00", endTime: "11:00", name: "First work day!" }]
 * Output: [
 *     { day: "Monday", startTime: "00:00", "endTime": "01:00"},
 *     { day: "Monday", startTime: "01:00", "endTime": "02:00"},
 *     ...,
 *     { day: "Monday", startTime: "09:00", "endTime": "10:00", event: [Object] },
 *     { day: "Monday", startTime: "10:00", "endTime": "11:00", event: [Object] },
 *     { day: "Monday", startTime: "11:00", "endTime": "12:00" },
 *     ...,
 *     { day: "Sunday", startTime: "23:00", "endTime": "00:00" },
 * ]
 *
 * @param events List of event to add on the planning
 * @returns List of planning slots, from Monday 00:00 to Sunday 00:00, 1 hour each slot
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ events }: { events: Event[] }): PlanningSlot[] {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekPlanning = Array(24 * daysOfWeek.length)
    .fill(null)
    .map((_, index) => {
      const dayIndex = Math.floor(index / 24);
      const hourIndex = Math.floor(index % 24);
      return {
        day: daysOfWeek[dayIndex],
        startTime: `${hourIndex.toString().padStart(2, "0")}:00`,
        endTime: `${(hourIndex + 1).toString().padStart(2, "0")}:00`,
        event: undefined,
      };
    }) as PlanningSlot[];

  // Add events to week planning
  for (const event of events) {
    const eventStartSlot = parseInt(event.startTime.split(":")[0]);
    const eventEndSlot = parseInt(
      event.endTime.split(":")[0] !== "00" ? event.endTime.split(":")[0] : "24"
    );

    for (let i = eventStartSlot; i < eventEndSlot; i++) {
      weekPlanning[daysOfWeek.indexOf(event.day) * 24 + i].event = event;
    }
  }

  return weekPlanning.map((slot:PlanningSlot) => {
    slot.endTime === "24:00"
      ? (slot.endTime = "00:00")
      : (slot.endTime = slot.endTime);
    return slot;
  });
}

// used interfaces, do not touch
export interface Event {
  day: string;
  startTime: string;
  endTime: string;
  name: string;
}

export interface PlanningSlot {
  day: string;
  startTime: string;
  endTime: string;
  event?: Event;
}
