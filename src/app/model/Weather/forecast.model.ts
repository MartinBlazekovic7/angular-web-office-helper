export class Forecast {
  DailyForecasts: DailyForecast[];
  Headline: Headline;
}

class DailyForecast {
  Date: String;
  Day: DayNight;
  Night: DayNight;
  Temperature: Temperature;
  Link: String
}

class DayNight {
  Icon: Number;
  IconPhrase: String;
  PrecipitationIntensity: String;
  PrecipitationType: String;
}

class Temperature {
  Maximum: TemperatureExtreme;
  Minimum: TemperatureExtreme;
}

class TemperatureExtreme {
  Unit: String;
  Value: number;
}

class Headline {
  Category: String;
  Text: String;
}
