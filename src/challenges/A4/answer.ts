/**
 * In this challenge, you have to regroup messages into an array of day based on their
 * sentAt property.
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ...
 * instead of setHouts, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [{ message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" }, { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" }, { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" }]
 * Output: [
 *      {
 *          day: "2020-11-17T00:00:00.000Z",
 *          messages: [
 *              { message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" },
 *              { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 *      {
 *          day: "2020-11-18T00:00:00.000Z",
 *          messages: [
 *              { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" },
 *          ]
 *      },
 * ]
 *
 * @param messages List of messages, unsorted and not grouped in days
 * @returns Sorted list of days (only days with messages!) with a list of sorted messages of the day
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ messages }: { messages: Message[] }): DayMessages[] {
    const sortDate = (a,b)=>{
        return new Date(a) < new Date(b) ? -1 : 1
    }
    
    
    const dayMessages: DayMessages[] = [];
    
    messages.forEach((message: Message) => {
      const day = new Date(new Date(message.sentAt).toISOString().substring(0, 10)).toJSON();
      const existingDayMessage = dayMessages.find(dayMessage => dayMessage.day === day);
      
      if (existingDayMessage) {
        existingDayMessage.messages.push(message);
      } else {
        dayMessages.push({ day, messages: [message] });
      }
    });
    
    return dayMessages.map(dayMessage => (
        { ...dayMessage, 
            messages: dayMessage.messages
            .sort((a, b) => sortDate(a.sentAt,b.sentAt)) }))
            .sort((a, b) => sortDate(a.day,b.day));
  }
// used interfaces, do not touch
export interface Message {
  author: string;
  sentAt: string;
  message: string;
}

export interface DayMessages {
  day: string;
  messages: Message[];
}
