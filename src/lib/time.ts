export function isValidHHMM(timeString: string): boolean {
  if (!timeString || typeof timeString !== 'string') {
    return false;
  }
  
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
}

export function compareHHMM(timeA: string, timeB: string): number {
  const [hoursA, minutesA] = timeA.split(':').map(Number);
  const [hoursB, minutesB] = timeB.split(':').map(Number);
  
  const totalMinutesA = hoursA * 60 + minutesA;
  const totalMinutesB = hoursB * 60 + minutesB;
  
  return totalMinutesA - totalMinutesB;
}

export function formatHHMM(timeString: string): string {
  if (!isValidHHMM(timeString)) {
    return timeString;
  }
  
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}