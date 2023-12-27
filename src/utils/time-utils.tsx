export function getLocaleDateString(date: Date): string {
    // Define options for day, month, year, hour, minute, second
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
  
    // Create an Intl.DateTimeFormat instance for date and time
    const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
    const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  
    // Format the date and time parts separately
    const datePart = dateFormatter.format(date);
    const timePart = timeFormatter.format(date);
  
    // Combine and return the formatted string
    return `${datePart}\n${timePart}`;
  }
  