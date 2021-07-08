export enum MEASURMENT_TYPES {
  PRICE = "Price",
  PRICE_M2 = "PriceM2",
}

export enum REAL_ESTATE_TYPES {
  HOMES = "homes",
  FLATS = "flats",
  PLOTS_AND_LANDS = "plots_and_lands",
}

export enum REAL_ESTATE_LOCATIONS {
  RIGA = "riga",
  RIGA_REGION = "riga_region",
  JURMALA = "jurmala",
  VALMIERA_REGION = "valmiera_region",
}

export const DEFAULT_SUB_LOCATIONS = {
  [REAL_ESTATE_LOCATIONS.RIGA]: "centre",
  [REAL_ESTATE_LOCATIONS.RIGA_REGION]: "sigulda",
  [REAL_ESTATE_LOCATIONS.JURMALA]: "dzintari",
  [REAL_ESTATE_LOCATIONS.VALMIERA_REGION]: "valmiera",
}

export const DEFAULT_REAL_ESTATE_TYPE = REAL_ESTATE_TYPES.HOMES
export const DEFAULT_REAL_ESTATE_LOCATION = REAL_ESTATE_LOCATIONS.RIGA
export const DEFAULT_SUB_LOCATION =
  DEFAULT_SUB_LOCATIONS[DEFAULT_REAL_ESTATE_LOCATION]

export enum COLORS {
  PRIMARY = "#413B68",
  SECONDARY = "#14A0C1",
  TERTIARY = "#02CC9A",
  QUATERNARY = "#F296E5",
}

export const M2_FORMAT = "m²"
export const DATE_FORMAT = "dd-MM-yyyy"
export const CHART_SPACER = 20

export const TICK = { fill: "#ffffff" }
