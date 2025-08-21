import type { Timetable } from '../types';
import { isValidHHMM } from './time';

export async function fetchCsv(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}

export function parseCsv(csvText: string): string[][] {
  const lines = csvText.split('\n').filter(line => line.trim());
  return lines.map(line => {
    const cells: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cells.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    cells.push(current.trim());
    return cells;
  });
}

export function csvToTimetable(csvText: string): Timetable {
  const rows = parseCsv(csvText);
  
  if (rows.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }
  
  const stops = rows[0];
  const departures: (string | null)[][] = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const departureRow: (string | null)[] = [];
    
    for (let j = 0; j < stops.length; j++) {
      const cell = row[j] || '';
      const trimmed = cell.trim();
      
      if (!trimmed) {
        departureRow.push(null);
      } else if (isValidHHMM(trimmed)) {
        departureRow.push(trimmed);
      } else {
        console.warn(`Invalid time format: "${trimmed}" at row ${i + 1}, column ${j + 1}`);
        departureRow.push(null);
      }
    }
    
    departures.push(departureRow);
  }
  
  return { stops, departures };
}

export function validateTimetable(timetable: Timetable): boolean {
  if (timetable.stops.length < 2) {
    console.error('Timetable must have at least 2 stops');
    return false;
  }
  
  if (timetable.departures.length === 0) {
    console.error('Timetable must have at least one departure');
    return false;
  }
  
  for (const departure of timetable.departures) {
    if (departure.length !== timetable.stops.length) {
      console.error('All departure rows must have the same number of columns as stops');
      return false;
    }
  }
  
  return true;
}

export async function fetchAndParseTimetable(csvUrl: string): Promise<Timetable> {
  const csvText = await fetchCsv(csvUrl);
  const timetable = csvToTimetable(csvText);
  
  if (!validateTimetable(timetable)) {
    throw new Error('Invalid timetable data');
  }
  
  return timetable;
}