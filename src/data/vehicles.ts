import type { GradeName } from './grades'

/**
 * Vehicle application database backing the oil finder.
 *
 * IMPORTANT — this is a curated reference set, not a licensed application
 * database. It covers the makes, models and engines an Ontario shop sees most
 * often, mapped to the seven grades Mileage Master sells. Before this site is
 * used to advise retail customers it should be replaced with a licensed data
 * feed (Mitchell, ALLDATA, MOTOR, or the blender's own application guide).
 *
 * The rest of the app talks to this file only through `src/lib/lookup.ts`, so
 * swapping it for a lookup endpoint means reimplementing that module and
 * nothing else.
 *
 * Applications whose factory fill falls outside our range (heavy-duty diesel
 * 15W-40, 5W-50 performance fills, and so on) are deliberately absent — those
 * customers are routed to the "Vehicle not listed?" contact bar.
 */

export interface Application {
  /** Engine label, shown verbatim in the ENGINE select. */
  engine: string
  /** First and last model year this application covers, inclusive. */
  from: number
  to: number
  grade: GradeName
  /** Sump capacity in litres, with a filter change. */
  capacityL: number
  /** Licence and OEM specification string. */
  spec: string
  /** Overrides the grade's default drain guidance where the OEM differs. */
  drain?: string
}

export interface VehicleModel {
  name: string
  applications: Application[]
}

export interface VehicleMake {
  name: string
  models: VehicleModel[]
}

/** Oldest and newest model years offered in the YEAR select. */
export const YEAR_RANGE = { first: 2005, last: 2026 } as const

/** Shared specification strings, so a licence change is a one-line edit. */
const SPEC = {
  gf6a: 'API SP · ILSAC GF-6A',
  gf6b: 'API SP · ILSAC GF-6B',
  gf5: 'API SN PLUS · ILSAC GF-5',
  dexos: 'API SP · GM dexos1 Gen 3',
  dexos2: 'API SP · GM dexos1 Gen 2',
  gm6094: 'API SP · GM 6094M',
  ford947: 'API SP · Ford WSS-M2C947-A',
  ford961: 'API SP · Ford WSS-M2C961-A1',
  ford962: 'API SP · Ford WSS-M2C962-A1',
  ford946: 'API SP · Ford WSS-M2C946-B1',
  mopar: 'API SP · Chrysler MS-6395',
  mopar12633: 'API SP · Chrysler MS-12633',
  vw50800: 'API SP · VW 508 00',
  vw50200: 'ACEA A3/B4 · VW 502 00',
  vw50400: 'ACEA C3 · VW 504 00',
  bmwll01: 'ACEA A3/B4 · BMW LL-01',
  bmwll01fe: 'ACEA A5/B5 · BMW LL-01 FE',
  bmwll17: 'ACEA C3 · BMW LL-17 FE+',
  mb2295: 'ACEA A3/B4 · MB 229.5',
  mb22971: 'ACEA C5 · MB 229.71',
  volvo: 'ACEA A5/B5 · Volvo VCC RBS0-2AE',
  aceaA5: 'ACEA A5/B5',
} as const

export const VEHICLES: VehicleMake[] = [
  {
    name: 'Acura',
    models: [
      {
        name: 'ILX',
        applications: [
          { engine: '2.4L L4 GAS FI', from: 2016, to: 2022, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf6a },
          { engine: '2.0L L4 GAS FI', from: 2013, to: 2015, grade: '0W-20', capacityL: 3.9, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'MDX',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2014, to: 2020, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
          { engine: '3.0L V6 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 6.0, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'RDX',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.0, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2013, to: 2018, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'TLX',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 5.0, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2015, to: 2020, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Audi',
    models: [
      {
        name: 'A4',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2017, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2009, to: 2016, grade: '5W-40', capacityL: 4.6, spec: SPEC.vw50200, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'A5 Quattro',
        applications: [
          { engine: '2.0L L4 (DPAA) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2022, grade: '0W-20', capacityL: 5.4, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'Q5',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
          { engine: '3.0L V6 (C) Supercharged GAS FI', from: 2013, to: 2017, grade: '5W-40', capacityL: 6.5, spec: SPEC.vw50200, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'Q7',
        applications: [
          { engine: '3.0L V6 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 7.7, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
          { engine: '3.0L V6 (C) Supercharged GAS FI', from: 2017, to: 2019, grade: '5W-40', capacityL: 6.9, spec: SPEC.vw50200, drain: 'Up to 15,000 km' },
        ],
      },
    ],
  },
  {
    name: 'BMW',
    models: [
      {
        name: '330i',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-30', capacityL: 5.2, spec: SPEC.bmwll17, drain: 'Up to 15,000 km' },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2012, to: 2018, grade: '0W-30', capacityL: 5.2, spec: SPEC.bmwll01fe, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: '540i',
        applications: [
          { engine: '3.0L L6 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2021, to: 2026, grade: '0W-30', capacityL: 6.5, spec: SPEC.bmwll17, drain: 'Up to 15,000 km' },
          { engine: '3.0L L6 (C) Turbocharged GAS FI', from: 2017, to: 2020, grade: '5W-30', capacityL: 6.5, spec: SPEC.bmwll01, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'X3',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '5W-40', capacityL: 5.5, spec: SPEC.bmwll01, drain: 'Up to 15,000 km' },
          { engine: '3.0L L6 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '5W-40', capacityL: 6.5, spec: SPEC.bmwll01, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'X5',
        applications: [
          { engine: '3.0L L6 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2020, to: 2026, grade: '0W-30', capacityL: 6.5, spec: SPEC.bmwll17, drain: 'Up to 15,000 km' },
          { engine: '4.4L V8 (C) Turbocharged GAS FI', from: 2014, to: 2026, grade: '5W-40', capacityL: 8.5, spec: SPEC.bmwll01, drain: 'Up to 15,000 km' },
        ],
      },
    ],
  },
  {
    name: 'Buick',
    models: [
      {
        name: 'Enclave',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2018, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
          { engine: '3.6L V6 GAS FI', from: 2008, to: 2017, grade: '5W-30', capacityL: 5.7, spec: SPEC.gm6094 },
        ],
      },
      {
        name: 'Encore GX',
        applications: [
          { engine: '1.3L L3 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 4.0, spec: SPEC.dexos },
          { engine: '1.2L L3 (C) Turbocharged GAS FI', from: 2020, to: 2023, grade: '0W-20', capacityL: 4.0, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Envision',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 5.2, spec: SPEC.dexos },
        ],
      },
    ],
  },
  {
    name: 'Cadillac',
    models: [
      {
        name: 'Escalade',
        applications: [
          { engine: '6.2L V8 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
          { engine: '6.2L V8 GAS FI', from: 2015, to: 2020, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos2 },
        ],
      },
      {
        name: 'XT5',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2017, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 5.2, spec: SPEC.dexos },
        ],
      },
    ],
  },
  {
    name: 'Chevrolet',
    models: [
            {
        name: 'Equinox',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 4, spec: SPEC.dexos },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2020, grade: '5W-30', capacityL: 5, spec: SPEC.dexos },
          { engine: '2.4L L4 GAS FI', from: 2010, to: 2017, grade: '5W-30', capacityL: 4.7, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Traverse',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2009, to: 2023, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
          { engine: '2.5L L4 (C) Turbocharged GAS FI', from: 2024, to: 2026, grade: '0W-20', capacityL: 5, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Tahoe',
        applications: [
          { engine: '5.3L V8 GAS FI', from: 2015, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
          { engine: '6.2L V8 GAS FI', from: 2015, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Suburban',
        applications: [
          { engine: '5.3L V8 GAS FI', from: 2015, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Colorado',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2015, to: 2022, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
          { engine: '2.7L L4 (C) Turbocharged GAS FI', from: 2023, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Malibu',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2016, to: 2025, grade: '0W-20', capacityL: 4, spec: SPEC.dexos },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2016, to: 2023, grade: '5W-30', capacityL: 5, spec: SPEC.dexos },
        ],
      },
{
        name: 'Blazer',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.2, spec: SPEC.dexos },
          { engine: '3.6L V6 GAS FI', from: 2019, to: 2024, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Equinox',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.dexos },
          { engine: '2.4L L4 GAS FI', from: 2010, to: 2017, grade: '5W-30', capacityL: 4.7, spec: SPEC.gm6094 },
        ],
      },
      {
        name: 'Malibu',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2016, to: 2024, grade: '0W-20', capacityL: 4.2, spec: SPEC.dexos },
          { engine: '2.5L L4 GAS FI', from: 2013, to: 2018, grade: '5W-30', capacityL: 4.7, spec: SPEC.dexos2 },
        ],
      },
      {
        name: 'Silverado 1500',
        applications: [
          { engine: '5.3L V8 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
          { engine: '6.2L V8 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
          { engine: '2.7L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.dexos },
          { engine: '5.3L V8 GAS FI', from: 2007, to: 2018, grade: '5W-30', capacityL: 5.7, spec: SPEC.gm6094 },
        ],
      },
      {
        name: 'Trax',
        applications: [
          { engine: '1.2L L3 (C) Turbocharged GAS FI', from: 2024, to: 2026, grade: '0W-20', capacityL: 4.0, spec: SPEC.dexos },
          { engine: '1.4L L4 (C) Turbocharged GAS FI', from: 2015, to: 2022, grade: '5W-30', capacityL: 4.2, spec: SPEC.dexos2 },
        ],
      },
    ],
  },
  {
    name: 'Chrysler',
    models: [
      {
        name: 'Pacifica',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2017, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
        ],
      },
      {
        name: '300',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2011, to: 2023, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
        ],
      },
    ],
  },
  {
    name: 'Dodge',
    models: [
      {
        name: 'Charger',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2011, to: 2023, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
          { engine: '5.7L V8 GAS FI', from: 2011, to: 2023, grade: '5W-20', capacityL: 6.6, spec: SPEC.mopar },
        ],
      },
      {
        name: 'Durango',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2011, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
          { engine: '5.7L V8 GAS FI', from: 2011, to: 2026, grade: '5W-20', capacityL: 6.6, spec: SPEC.mopar },
        ],
      },
      {
        name: 'Grand Caravan',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2011, to: 2020, grade: '5W-20', capacityL: 5.7, spec: SPEC.mopar },
        ],
      },
    ],
  },
  {
    name: 'Ford',
    models: [
            {
        name: 'Bronco',
        applications: [
          { engine: '2.3L L4 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
          { engine: '2.7L V6 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '5W-30', capacityL: 6.6, spec: SPEC.ford961 },
        ],
      },
      {
        name: 'Ranger',
        applications: [
          { engine: '2.3L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '5W-30', capacityL: 5.9, spec: SPEC.ford961 },
          { engine: '2.7L V6 (C) Turbocharged GAS FI', from: 2024, to: 2026, grade: '5W-30', capacityL: 6.6, spec: SPEC.ford961 },
        ],
      },
      {
        name: 'Mustang',
        applications: [
          { engine: '2.3L L4 (C) Turbocharged GAS FI', from: 2015, to: 2026, grade: '5W-30', capacityL: 5.4, spec: SPEC.ford961 },
          { engine: '5.0L V8 GAS FI', from: 2011, to: 2026, grade: '5W-20', capacityL: 9.5, spec: SPEC.ford947 },
        ],
      },
      {
        name: 'Edge',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2012, to: 2024, grade: '5W-30', capacityL: 5.4, spec: SPEC.ford961 },
          { engine: '2.7L V6 (C) Turbocharged GAS FI', from: 2015, to: 2024, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
        ],
      },
      {
        name: 'Expedition',
        applications: [
          { engine: '3.5L V6 (C) Turbocharged GAS FI', from: 2015, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
        ],
      },
{
        name: 'Bronco Sport',
        applications: [
          { engine: '1.5L L3 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '5W-20', capacityL: 4.3, spec: SPEC.ford947 },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
        ],
      },
      {
        name: 'Escape',
        applications: [
          { engine: '1.5L L3 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '5W-20', capacityL: 4.3, spec: SPEC.ford947 },
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 4.3, spec: SPEC.ford962 },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2013, to: 2019, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford946 },
        ],
      },
      {
        name: 'Explorer',
        applications: [
          { engine: '2.3L L4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
          { engine: '3.0L V6 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '5W-30', capacityL: 6.6, spec: SPEC.ford961 },
          { engine: '3.5L V6 GAS FI', from: 2011, to: 2019, grade: '5W-20', capacityL: 5.7, spec: SPEC.ford946 },
        ],
      },
      {
        name: 'F-150',
        applications: [
          { engine: '2.7L V6 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
          { engine: '3.5L V6 (C) Turbocharged GAS FI', from: 2017, to: 2026, grade: '5W-30', capacityL: 6.6, spec: SPEC.ford961 },
          { engine: '5.0L V8 GAS FI', from: 2018, to: 2026, grade: '5W-30', capacityL: 8.0, spec: SPEC.ford961 },
          { engine: '5.0L V8 GAS FI', from: 2011, to: 2017, grade: '5W-20', capacityL: 7.6, spec: SPEC.ford946 },
        ],
      },
      {
        name: 'Maverick',
        applications: [
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 4.3, spec: SPEC.ford962 },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
        ],
      },
    ],
  },
  {
    name: 'GMC',
    models: [
      {
        name: 'Acadia',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2017, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.dexos },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 5.2, spec: SPEC.dexos },
        ],
      },
      {
        name: 'Sierra 1500',
        applications: [
          { engine: '5.3L V8 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
          { engine: '6.2L V8 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 7.6, spec: SPEC.dexos },
          { engine: '5.3L V8 GAS FI', from: 2007, to: 2018, grade: '5W-30', capacityL: 5.7, spec: SPEC.gm6094 },
        ],
      },
      {
        name: 'Terrain',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.dexos },
        ],
      },
    ],
  },
  {
    name: 'Honda',
    models: [
            {
        name: 'HR-V',
        applications: [
          { engine: '1.8L L4 GAS FI', from: 2016, to: 2022, grade: '0W-20', capacityL: 3.7, spec: SPEC.gf6a },
          { engine: '2.0L L4 GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Ridgeline',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2017, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Passport',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
        ],
      },
{
        name: 'Accord',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 3.7, spec: SPEC.gf6a },
          { engine: '2.0L L4 HYBRID EV-GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 4.0, spec: SPEC.gf6a },
          { engine: '2.4L L4 GAS FI', from: 2013, to: 2017, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Civic',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2016, to: 2026, grade: '0W-20', capacityL: 3.7, spec: SPEC.gf6a },
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2016, to: 2026, grade: '0W-20', capacityL: 3.4, spec: SPEC.gf6a },
          { engine: '1.8L L4 GAS FI', from: 2006, to: 2015, grade: '0W-20', capacityL: 3.9, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'CR-V',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2017, to: 2026, grade: '0W-20', capacityL: 3.7, spec: SPEC.gf6a },
          { engine: '2.0L L4 HYBRID EV-GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
          { engine: '2.4L L4 GAS FI', from: 2007, to: 2019, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Odyssey',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2011, to: 2026, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Pilot',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2016, to: 2022, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Hyundai',
    models: [
      {
        name: 'Elantra',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 4.0, spec: SPEC.gf6a },
          { engine: '1.6L L4 HYBRID EV-GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 3.8, spec: SPEC.gf6a },
          { engine: '1.8L L4 GAS FI', from: 2011, to: 2016, grade: '5W-20', capacityL: 4.0, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Kona',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 4.0, spec: SPEC.gf6a },
          { engine: '1.6L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Santa Fe',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
          { engine: '1.6L L4 HYBRID EV-GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
          { engine: '2.4L L4 GAS FI', from: 2013, to: 2020, grade: '5W-20', capacityL: 4.8, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Tucson',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
          { engine: '1.6L L4 HYBRID EV-GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Infiniti',
    models: [
      {
        name: 'QX50',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.1, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'QX60',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2014, to: 2026, grade: '0W-20', capacityL: 4.9, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Jeep',
    models: [
            {
        name: 'Wrangler',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2012, to: 2026, grade: '0W-20', capacityL: 4.7, spec: SPEC.mopar },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '5W-30', capacityL: 4.7, spec: SPEC.mopar },
        ],
      },
      {
        name: 'Cherokee',
        applications: [
          { engine: '2.4L L4 GAS FI', from: 2014, to: 2022, grade: '0W-20', capacityL: 5.2, spec: SPEC.mopar },
          { engine: '3.2L V6 GAS FI', from: 2014, to: 2023, grade: '5W-20', capacityL: 5.6, spec: SPEC.mopar },
        ],
      },
      {
        name: 'Compass',
        applications: [
          { engine: '2.4L L4 GAS FI', from: 2017, to: 2022, grade: '0W-20', capacityL: 5.2, spec: SPEC.mopar },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2023, to: 2026, grade: '5W-30', capacityL: 4.7, spec: SPEC.mopar },
        ],
      },
{
        name: 'Cherokee',
        applications: [
          { engine: '2.4L L4 GAS FI', from: 2014, to: 2023, grade: '0W-20', capacityL: 5.2, spec: SPEC.mopar },
          { engine: '3.2L V6 GAS FI', from: 2014, to: 2023, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
        ],
      },
      {
        name: 'Grand Cherokee',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2011, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
          { engine: '5.7L V8 GAS FI', from: 2011, to: 2024, grade: '5W-20', capacityL: 6.6, spec: SPEC.mopar },
        ],
      },
      {
        name: 'Wrangler',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2012, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '0W-20', capacityL: 5.2, spec: SPEC.mopar12633 },
        ],
      },
    ],
  },
  {
    name: 'Kia',
    models: [
      {
        name: 'Forte',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2019, to: 2024, grade: '0W-20', capacityL: 4.0, spec: SPEC.gf6a },
          { engine: '1.6L L4 (C) Turbocharged GAS FI', from: 2019, to: 2024, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'K4',
        applications: [
          { engine: '1.6L L4 (C) Turbocharged GAS FI', from: 2025, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
          { engine: '2.0L L4 (E) GAS FI', from: 2025, to: 2026, grade: '0W-20', capacityL: 4.6, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Seltos',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 4.0, spec: SPEC.gf6a },
          { engine: '1.6L L4 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Sorento',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
          { engine: '1.6L L4 HYBRID EV-GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Sportage',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 5.4, spec: SPEC.gf6a },
          { engine: '2.4L L4 GAS FI', from: 2017, to: 2022, grade: '5W-20', capacityL: 4.8, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Telluride',
        applications: [
          { engine: '3.8L V6 GAS FI', from: 2020, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Lexus',
    models: [
      {
        name: 'ES',
        applications: [
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2019, to: 2026, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
          { engine: '3.5L V6 GAS FI', from: 2013, to: 2024, grade: '0W-20', capacityL: 6.1, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'NX',
        applications: [
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2022, to: 2026, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
          { engine: '2.4L L4 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'RX',
        applications: [
          { engine: '2.4L L4 (C) Turbocharged GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2016, to: 2022, grade: '0W-20', capacityL: 6.1, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Lincoln',
    models: [
      {
        name: 'Corsair',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
        ],
      },
      {
        name: 'Nautilus',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '5W-30', capacityL: 5.7, spec: SPEC.ford961 },
        ],
      },
    ],
  },
  {
    name: 'Mazda',
    models: [
      {
        name: 'CX-5',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2017, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.5L L4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '5W-30', capacityL: 5.1, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'CX-50',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.5L L4 (C) Turbocharged GAS FI', from: 2023, to: 2026, grade: '5W-30', capacityL: 5.1, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Mazda3',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.0L L4 GAS FI', from: 2014, to: 2021, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf5 },
        ],
      },
    ],
  },
  {
    name: 'Mercedes-Benz',
    models: [
      {
        name: 'C 300',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2022, to: 2026, grade: '0W-30', capacityL: 6.5, spec: SPEC.mb22971, drain: 'Up to 15,000 km' },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2015, to: 2021, grade: '5W-40', capacityL: 6.5, spec: SPEC.mb2295, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'GLC 300',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2023, to: 2026, grade: '0W-30', capacityL: 6.5, spec: SPEC.mb22971, drain: 'Up to 15,000 km' },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2016, to: 2022, grade: '5W-40', capacityL: 6.5, spec: SPEC.mb2295, drain: 'Up to 15,000 km' },
        ],
      },
    ],
  },
  {
    name: 'Mitsubishi',
    models: [
      {
        name: 'Outlander',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.4L L4 GAS FI', from: 2014, to: 2021, grade: '0W-20', capacityL: 4.3, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'RVR',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2011, to: 2024, grade: '0W-20', capacityL: 4.3, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Nissan',
    models: [
            {
        name: 'Pathfinder',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2013, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Frontier',
        applications: [
          { engine: '4.0L V6 GAS FI', from: 2005, to: 2019, grade: '5W-30', capacityL: 5.1, spec: SPEC.gf6a },
          { engine: '3.8L V6 GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 5, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Murano',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2015, to: 2024, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Sentra',
        applications: [
          { engine: '1.8L L4 GAS FI', from: 2013, to: 2019, grade: '0W-20', capacityL: 4, spec: SPEC.gf6a },
          { engine: '2.0L L4 GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Versa',
        applications: [
          { engine: '1.6L L4 GAS FI', from: 2012, to: 2026, grade: '0W-20', capacityL: 3.5, spec: SPEC.gf6a },
        ],
      },
{
        name: 'Altima',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.5L L4 GAS FI', from: 2013, to: 2018, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Kicks',
        applications: [
          { engine: '1.6L L4 GAS FI', from: 2018, to: 2024, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
          { engine: '2.0L L4 GAS FI', from: 2025, to: 2026, grade: '0W-20', capacityL: 4.6, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Rogue',
        applications: [
          { engine: '1.5L L3 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 4.6, spec: SPEC.gf6a },
          { engine: '2.5L L4 GAS FI', from: 2014, to: 2022, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Sentra',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 4.3, spec: SPEC.gf6a },
          { engine: '1.8L L4 GAS FI', from: 2013, to: 2019, grade: '0W-20', capacityL: 4.3, spec: SPEC.gf5 },
        ],
      },
    ],
  },
  {
    name: 'Ram',
    models: [
      {
        name: '1500',
        applications: [
          { engine: '3.6L V6 MILD HYBRID EV-GAS (MHEV) FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
          { engine: '5.7L V8 GAS FI', from: 2011, to: 2024, grade: '5W-20', capacityL: 6.6, spec: SPEC.mopar },
        ],
      },
      {
        name: 'ProMaster',
        applications: [
          { engine: '3.6L V6 GAS FI', from: 2014, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.mopar },
        ],
      },
    ],
  },
  {
    name: 'Subaru',
    models: [
            {
        name: 'Outback',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2013, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '3.6L H6 GAS FI', from: 2010, to: 2019, grade: '0W-20', capacityL: 6.5, spec: SPEC.gf6a },
          { engine: '2.4L H4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Crosstrek',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2013, to: 2026, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf6a },
          { engine: '2.5L L4 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Ascent',
        applications: [
          { engine: '2.4L H4 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 4.5, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Impreza',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2012, to: 2026, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf6a },
          { engine: '2.5L L4 GAS FI', from: 2024, to: 2026, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf6a },
        ],
      },
{
        name: 'Crosstrek',
        applications: [
          { engine: '2.0L H4 GAS FI', from: 2013, to: 2023, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.5L H4 GAS FI', from: 2021, to: 2026, grade: '0W-20', capacityL: 5.1, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Forester',
        applications: [
          { engine: '2.5L H4 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 5.1, spec: SPEC.gf6a },
          { engine: '2.5L H4 GAS FI', from: 2011, to: 2018, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Outback',
        applications: [
          { engine: '2.5L H4 GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 5.1, spec: SPEC.gf6a },
          { engine: '2.4L H4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 5.2, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Toyota',
    models: [
            {
        name: '4Runner',
        applications: [
          { engine: '4.0L V6 GAS FI', from: 2010, to: 2024, grade: '0W-20', capacityL: 6.2, spec: SPEC.gf6a },
          { engine: '2.4L L4 (C) Turbocharged GAS FI', from: 2025, to: 2026, grade: '0W-20', capacityL: 5.3, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Sienna',
        applications: [
          { engine: '3.5L V6 GAS FI', from: 2007, to: 2020, grade: '0W-20', capacityL: 5.5, spec: SPEC.gf6a },
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2021, to: 2026, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
        ],
      },
      {
        name: 'Tundra',
        applications: [
          { engine: '5.7L V8 GAS FI', from: 2007, to: 2021, grade: '0W-20', capacityL: 7.5, spec: SPEC.gf6a },
          { engine: '3.4L V6 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 7.3, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Sequoia',
        applications: [
          { engine: '5.7L V8 GAS FI', from: 2008, to: 2022, grade: '0W-20', capacityL: 7.5, spec: SPEC.gf6a },
          { engine: '3.4L V6 (C) Turbo HYBRID EV-GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 7.3, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Prius',
        applications: [
          { engine: '1.8L L4 HYBRID EV-GAS FI', from: 2010, to: 2022, grade: '0W-20', capacityL: 4.2, spec: SPEC.gf6a },
          { engine: '2.0L L4 HYBRID EV-GAS FI', from: 2023, to: 2026, grade: '0W-16', capacityL: 4.2, spec: SPEC.gf6b },
        ],
      },
      {
        name: 'Venza',
        applications: [
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2021, to: 2025, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
        ],
      },
{
        name: 'Camry',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2018, to: 2024, grade: '0W-20', capacityL: 4.6, spec: SPEC.gf6a },
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2025, to: 2026, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
          { engine: '3.5L V6 GAS FI', from: 2018, to: 2024, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Corolla',
        applications: [
          { engine: '2.0L L4 GAS FI', from: 2019, to: 2026, grade: '0W-16', capacityL: 4.4, spec: SPEC.gf6b },
          { engine: '1.8L L4 HYBRID EV-GAS FI', from: 2020, to: 2026, grade: '0W-16', capacityL: 4.2, spec: SPEC.gf6b },
          { engine: '1.8L L4 GAS FI', from: 2009, to: 2019, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Highlander',
        applications: [
          { engine: '2.4L L4 (C) Turbocharged GAS FI', from: 2023, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2017, to: 2023, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2020, to: 2026, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
        ],
      },
      {
        name: 'RAV4',
        applications: [
          { engine: '2.5L L4 GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 4.8, spec: SPEC.gf6a },
          { engine: '2.5L L4 HYBRID EV-GAS FI', from: 2019, to: 2026, grade: '0W-16', capacityL: 4.5, spec: SPEC.gf6b },
          { engine: '2.5L L4 GAS FI', from: 2013, to: 2018, grade: '0W-20', capacityL: 4.4, spec: SPEC.gf5 },
        ],
      },
      {
        name: 'Tacoma',
        applications: [
          { engine: '2.4L L4 (C) Turbocharged GAS FI', from: 2024, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.gf6a },
          { engine: '3.5L V6 GAS FI', from: 2016, to: 2023, grade: '0W-20', capacityL: 6.2, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Tundra',
        applications: [
          { engine: '3.4L V6 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 6.6, spec: SPEC.gf6a },
          { engine: '5.7L V8 GAS FI', from: 2007, to: 2021, grade: '0W-20', capacityL: 7.4, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Volkswagen',
    models: [
      {
        name: 'Atlas',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2024, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
          { engine: '3.6L V6 GAS FI', from: 2018, to: 2023, grade: '5W-40', capacityL: 6.0, spec: SPEC.vw50200, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'Golf GTI',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2015, to: 2026, grade: '5W-40', capacityL: 5.7, spec: SPEC.vw50200, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'Jetta',
        applications: [
          { engine: '1.5L L4 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-20', capacityL: 5.7, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
          { engine: '1.4L L4 (C) Turbocharged GAS FI', from: 2019, to: 2021, grade: '0W-20', capacityL: 4.6, spec: SPEC.vw50800, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'Tiguan',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2026, grade: '5W-40', capacityL: 6.6, spec: SPEC.vw50200, drain: 'Up to 15,000 km' },
        ],
      },
    ],
  },
  {
    name: 'Volvo',
    models: [
      {
        name: 'XC60',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 6.0, spec: SPEC.volvo, drain: 'Up to 15,000 km' },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2015, to: 2019, grade: '0W-30', capacityL: 5.9, spec: SPEC.aceaA5, drain: 'Up to 15,000 km' },
        ],
      },
      {
        name: 'XC90',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged MILD HYBRID EV-GAS (MHEV) FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 6.0, spec: SPEC.volvo, drain: 'Up to 15,000 km' },
        ],
      },
    ],
  },
  {
    name: 'Genesis',
    models: [
      {
        name: 'G70',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2019, to: 2023, grade: '5W-30', capacityL: 5.7, spec: SPEC.gf6a },
          { engine: '3.3L V6 (C) Turbocharged GAS FI', from: 2019, to: 2025, grade: '5W-30', capacityL: 6.9, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'GV70',
        applications: [
          { engine: '2.5L L4 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-30', capacityL: 6.2, spec: SPEC.gf6a },
          { engine: '3.5L V6 (C) Turbocharged GAS FI', from: 2022, to: 2026, grade: '0W-30', capacityL: 7, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'GV80',
        applications: [
          { engine: '2.5L L4 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '0W-30', capacityL: 6.2, spec: SPEC.gf6a },
          { engine: '3.5L V6 (C) Turbocharged GAS FI', from: 2021, to: 2026, grade: '0W-30', capacityL: 7, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Porsche',
    models: [
      {
        name: 'Macan',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2017, to: 2024, grade: '0W-20', capacityL: 5.2, spec: SPEC.vw50800 },
          { engine: '3.0L V6 (C) Turbocharged GAS FI', from: 2015, to: 2021, grade: '0W-20', capacityL: 7.5, spec: SPEC.vw50800 },
        ],
      },
      {
        name: 'Cayenne',
        applications: [
          { engine: '3.0L V6 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '0W-20', capacityL: 7.5, spec: SPEC.vw50800 },
          { engine: '4.0L V8 (C) Turbocharged GAS FI', from: 2019, to: 2026, grade: '5W-40', capacityL: 9.5, spec: SPEC.vw50400 },
        ],
      },
    ],
  },
  {
    name: 'Land Rover',
    models: [
      {
        name: 'Range Rover Sport',
        applications: [
          { engine: '3.0L V6 (C) Supercharged GAS FI', from: 2014, to: 2020, grade: '0W-20', capacityL: 8, spec: SPEC.gf6a },
          { engine: '3.0L L6 (C) Turbocharged MHEV GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 8.8, spec: SPEC.gf6a },
        ],
      },
      {
        name: 'Defender 110',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 7, spec: SPEC.gf6a },
          { engine: '3.0L L6 (C) Turbocharged MHEV GAS FI', from: 2020, to: 2026, grade: '0W-20', capacityL: 8.8, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Jaguar',
    models: [
      {
        name: 'F-PACE',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2017, to: 2025, grade: '0W-20', capacityL: 7, spec: SPEC.gf6a },
          { engine: '3.0L V6 (C) Supercharged GAS FI', from: 2017, to: 2020, grade: '0W-20', capacityL: 7.2, spec: SPEC.gf6a },
        ],
      },
    ],
  },
  {
    name: 'Mini',
    models: [
      {
        name: 'Cooper',
        applications: [
          { engine: '1.5L L3 (C) Turbocharged GAS FI', from: 2014, to: 2026, grade: '0W-20', capacityL: 4.25, spec: SPEC.bmwll17 },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2014, to: 2026, grade: '0W-20', capacityL: 5.25, spec: SPEC.bmwll17 },
        ],
      },
      {
        name: 'Countryman',
        applications: [
          { engine: '1.5L L3 (C) Turbocharged GAS FI', from: 2017, to: 2024, grade: '0W-20', capacityL: 4.25, spec: SPEC.bmwll17 },
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2017, to: 2025, grade: '0W-20', capacityL: 5.25, spec: SPEC.bmwll17 },
        ],
      },
    ],
  },
  {
    name: 'Fiat',
    models: [
      {
        name: '500',
        applications: [
          { engine: '1.4L L4 GAS FI', from: 2012, to: 2019, grade: '5W-30', capacityL: 3.8, spec: SPEC.mopar },
          { engine: '1.4L L4 (C) Turbocharged GAS FI', from: 2013, to: 2019, grade: '5W-40', capacityL: 3.8, spec: SPEC.mopar },
        ],
      },
    ],
  },
  {
    name: 'Alfa Romeo',
    models: [
      {
        name: 'Stelvio',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2018, to: 2025, grade: '0W-30', capacityL: 5.2, spec: SPEC.mopar12633 },
          { engine: '2.9L V6 (C) Turbocharged GAS FI', from: 2018, to: 2025, grade: '5W-40', capacityL: 7, spec: SPEC.mopar12633 },
        ],
      },
      {
        name: 'Giulia',
        applications: [
          { engine: '2.0L L4 (C) Turbocharged GAS FI', from: 2017, to: 2025, grade: '0W-30', capacityL: 5.2, spec: SPEC.mopar12633 },
          { engine: '2.9L V6 (C) Turbocharged GAS FI', from: 2017, to: 2025, grade: '5W-40', capacityL: 7, spec: SPEC.mopar12633 },
        ],
      },
    ],
  },

]
