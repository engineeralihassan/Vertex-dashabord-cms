export function formatDateAccordingToTimeZone(createdAt: string): string {
    // Convert the createdAt string to a Date object
    const date = new Date(createdAt);
  
    // Format the date using the user's local time zone
    const formattedDate = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  
    return formattedDate;
  }
  