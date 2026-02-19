export interface LocationData {
  id: string;
  name: string;
  aqi: number;
  temperature: number;
  humidity: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  status: 'Good' | 'Satisfactory' | 'Moderately Polluted' | 'Poor' | 'Very Poor' | 'Severe';
}

export interface TimeSeriesData {
  time: string;
  aqi: number;
  temperature: number;
  humidity: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
}

export interface AnalyticsData {
  locations: LocationData[];
  aqiTrend: TimeSeriesData[];
  pollutantData: {
    name: string;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
  }[];
}

function getAQIStatus(aqi: number): LocationData['status'] {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderately Polluted';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

function getRandomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLocationData(name: string, id: string, aqiVariation: number = 0): LocationData {
  const baseAQI = getRandomInRange(20, 400);
  const aqi = Math.max(0, Math.min(500, baseAQI + aqiVariation));
  
  return {
    id,
    name,
    aqi,
    temperature: getRandomInRange(15, 45),
    humidity: getRandomInRange(20, 80),
    pm25: getRandomInRange(5, 300),
    pm10: getRandomInRange(10, 500),
    o3: getRandomInRange(10, 300),
    no2: getRandomInRange(20, 200),
    status: getAQIStatus(aqi),
  };
}

function generateTimeSeries(): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    const baseAQI = getRandomInRange(30, 350);
    
    data.push({
      time: time.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      aqi: baseAQI,
      temperature: getRandomInRange(15, 45),
      humidity: getRandomInRange(20, 80),
      pm25: getRandomInRange(5, 250),
      pm10: getRandomInRange(15, 450),
      o3: getRandomInRange(10, 250),
      no2: getRandomInRange(20, 180),
    });
  }
  
  return data;
}

export function generateAllData(): AnalyticsData {
  const locations = [
    generateLocationData('Connaught Place', 'cp', 0),
    generateLocationData('India Gate', 'ig', -30),
    generateLocationData('Dwarka', 'dwarka', 50),
    generateLocationData('Gurgaon', 'gurgaon', 40),
  ];

  const aqiTrend = generateTimeSeries();

  const pollutantData = locations.map((loc) => ({
    name: loc.name,
    pm25: loc.pm25,
    pm10: loc.pm10,
    o3: loc.o3,
    no2: loc.no2,
  }));

  return {
    locations,
    aqiTrend,
    pollutantData,
  };
}

export function getAQIColor(aqi: number): string {
  if (aqi <= 50) return '#00E400'; // Good - Green
  if (aqi <= 100) return '#FFFF00'; // Satisfactory - Yellow
  if (aqi <= 200) return '#FF7E00'; // Moderately Polluted - Orange
  if (aqi <= 300) return '#FF0000'; // Poor - Red
  if (aqi <= 400) return '#99004C'; // Very Poor - Purple
  return '#7E0023'; // Severe - Maroon
}

export function getAQIColorClassName(aqi: number): string {
  if (aqi <= 50) return 'aqi-good';
  if (aqi <= 100) return 'aqi-satisfactory';
  if (aqi <= 200) return 'aqi-moderate';
  if (aqi <= 300) return 'aqi-poor';
  if (aqi <= 400) return 'aqi-very-poor';
  return 'aqi-severe';
}
