"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Library } from "./models/Library";
import { List } from "./components/List";

const libraries: Library[] = [
  {
    lat: "-36.725662099999994",
    lon: "174.69448255852353",
    name: "Albany Village Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5.30pm",
      Sunday: "9.30am - 4.30pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "9.30am - 4.30pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 538452707,
    address: "Kell Drive, Albany",
    visited: true,
    libraryId: 1,
  },
  {
    lat: "-36.8942579",
    lon: "174.6952637",
    name: "Avondale Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 320850907,
    address: "93 Rosebank Rd, Avondale",
    visited: true,
    libraryId: 2,
  },
  {
    lat: "-36.81300875",
    lon: "174.72660888409703",
    name: "Birkenhead Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "10am - 4.30pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4.30pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 266759657,
    address: "Nell Fisher Reserve, Hinemoa St, Birkenhead",
    visited: true,
    libraryId: 3,
  },
  {
    lat: "-36.92422415",
    lon: "174.70198339999706",
    name: "Blockhouse Bay Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 174551221,
    address: "578 Blockhouse Bay Rd, Blockhouse Bay",
    visited: true,
    libraryId: 4,
  },
  {
    lat: "-36.9345406",
    lon: "174.9132896",
    name: "Botany Library",
    hours: {
      Friday: "9.30am - 8pm",
      Monday: "9.30am - 5.30pm",
      Sunday: "10am - 5.30pm",
      Tuesday: "9.30am - 5.30pm",
      Saturday: "9.30am - 5.30pm",
      Thursday: "9.30am - 8pm",
      Wednesday: "9.30am - 5.30pm",
    },
    osm_id: 10236459061,
    address: "Level 1, Botany Town Centre, Sunset Terrace, East Tāmaki",
    visited: true,
    libraryId: 5,
  },
  {
    lat: "-36.85169875",
    lon: "174.76541462612",
    name: "Central City Library",
    hours: {
      Friday: "9am - 8pm",
      Monday: "9am - 6pm",
      Sunday: "10am - 5pm",
      Tuesday: "9am - 8pm",
      Saturday: "10am - 5pm",
      Thursday: "9am - 8pm",
      Wednesday: "9am - 8pm",
    },
    osm_id: 23906761,
    address: "44-46 Lorne St, Auckland",
    visited: true,
    libraryId: 6,
  },
  {
    lat: "-36.83142635",
    lon: "174.79768922622733",
    name: "Devonport Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 6pm",
      Sunday: "9.30am - 5pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "9.30am - 5pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 339843067,
    address: "2 Victoria Rd, Devonport",
    visited: true,
    libraryId: 7,
  },
  {
    lat: "-36.7149881",
    lon: "174.74691000751062",
    name: "East Coast Bays Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "9.30am - 4.30pm",
      Tuesday: "9am - 5pm",
      Saturday: "9.30am - 4.30pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 337148515,
    address: "8 Bute Rd, Browns Bay",
    visited: true,
    libraryId: 8,
  },
  {
    lat: "-36.8818604",
    lon: "174.7753275",
    name: "Epsom Library",
    hours: {
      Friday: "9.30am - 5.30pm",
      Monday: "9.30am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9.30am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9.30am - 6pm",
      Wednesday: "9.30am - 6pm",
    },
    osm_id: 1484417975,
    address: "195 Manukau Rd, Epsom",
    visited: true,
    libraryId: 9,
  },
  {
    lat: "-36.9108169",
    lon: "174.6502432420486",
    name: "Glen Eden Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 6pm",
      Saturday: "9.30am - 4.30pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 140630487,
    address: "12-32 Glendale Rd, Glen Eden",
    visited: true,
    libraryId: 10,
  },
  {
    lat: "-36.8792563",
    lon: "174.85670759683893",
    name: "Glen Innes Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 6pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 155749089,
    address: "108 Line Rd, Glen Innes",
    visited: true,
    libraryId: 11,
  },
  {
    lat: "-36.7808043",
    lon: "174.72273675191437",
    name: "Glenfield Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "10am - 4.30pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4.30pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 329615292,
    address: "90 Bentley Ave, Glenfield",
    visited: true,
    libraryId: 12,
  },
  {
    lat: "-36.243691999999996",
    lon: "175.46748800274725",
    name: "Great Barrier Library",
    hours: {
      Friday: "8.30am - 4.30pm",
      Monday: "8.30am - 4.30pm",
      Sunday: "Closed",
      Tuesday: "8.30am - 4.30pm",
      Saturday: "Closed",
      Thursday: "8.30am - 4.30pm",
      Wednesday: "8.30am - 4.30pm",
    },
    osm_id: 338565435,
    address: "75 Hector Sanderson Rd, Claris, Great Barrier Island",
    visited: false,
    libraryId: 13,
  },
  {
    lat: "-36.8673212",
    lon: "174.7388822",
    name: "Grey Lynn Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "Closed",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 660043817,
    address: "474 Great North Rd, Grey Lynn",
    visited: true,
    libraryId: 14,
  },
  {
    lat: "-36.6763808",
    lon: "174.4509838",
    name: "Helensville Library",
    hours: {
      Friday: "9.30am - 5pm",
      Monday: "9.30am - 5pm",
      Sunday: "Closed",
      Tuesday: "9.30am - 5pm",
      Saturday: "9.30am - 4pm",
      Thursday: "9.30am - 5pm",
      Wednesday: "9.30am - 5pm",
    },
    osm_id: 1956070027,
    address: "49 Commercial Rd, Helensville",
    visited: false,
    libraryId: 15,
  },
  {
    lat: "-36.9000006",
    lon: "174.9083597",
    name: "Highland Park Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 6pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 3736691327,
    address: "16 Highland Park Drive, Highland Park",
    visited: true,
    libraryId: 16,
  },
  {
    lat: "-36.8943316",
    lon: "174.9334456",
    name: "Howick Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 6pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 3013702640,
    address: "25 Uxbridge Rd, Howick",
    visited: true,
    libraryId: 17,
  },
  {
    lat: "-36.77220495",
    lon: "174.54751334129958",
    name: "Kumeū Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 5pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 338891028,
    address: "296 Main Rd, Huapai",
    visited: false,
    libraryId: 18,
  },
  {
    lat: "-36.4211395",
    lon: "174.7227555",
    name: "Mahurangi East Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 1pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 3397509381,
    address: "21 Hamatana Rd, Snells Beach",
    visited: false,
    libraryId: 20,
  },
  {
    lat: "-36.94207295",
    lon: "174.7861672",
    name: "Māngere Bridge Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "9am - 1pm",
      Tuesday: "9am - 5pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 114372295,
    address: "5-7 Church Rd, Māngere Bridge",
    visited: true,
    libraryId: 21,
  },
  {
    lat: "-36.9665778",
    lon: "174.8257466",
    name: "Māngere East Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 7pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 5pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 978589799,
    address: "370 Massey Rd, Māngere East",
    visited: true,
    libraryId: 22,
  },
  {
    lat: "-36.9697481",
    lon: "174.7988684",
    name: "Māngere Town Centre Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9.30am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 2542919946,
    address: "121 Bader Drive, Māngere",
    visited: true,
    libraryId: 23,
  },
  {
    lat: "-36.9919307",
    lon: "174.87969206427016",
    name: "Manukau Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 5pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 114661396,
    address: "3 Osterley Way, Manukau",
    visited: true,
    libraryId: 24,
  },
  {
    lat: "-37.0208429",
    lon: "174.8973476",
    name: "Manurewa Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 7pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 5pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 467025275,
    address: "7 Hill Rd, Manurewa",
    visited: true,
    libraryId: 25,
  },
  {
    lat: "-36.88383975",
    lon: "174.73505924429014",
    name: "Mt Albert Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 62004195,
    address: "84 St Lukes Rd, Mt Albert",
    visited: true,
    libraryId: 27,
  },
  {
    lat: "-36.9083368",
    lon: "174.7566825",
    name: "Mt Roskill Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 1827167988,
    address: "546 Mt Albert Rd, Mt Roskill",
    visited: true,
    libraryId: 28,
  },
  {
    lat: "-36.9086019",
    lon: "174.68338321482457",
    name: "New Lynn War Memorial Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 100521156,
    address: "3 Memorial Drive, New Lynn",
    visited: true,
    libraryId: 29,
  },
  {
    lat: "-36.800793299999995",
    lon: "174.74703409139073",
    name: "Northcote Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "10am - 4.30pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4.30pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 324695357,
    address: "Norman King Square, 2 Ernie Mays St, Northcote",
    visited: true,
    libraryId: 30,
  },
  {
    lat: "-36.9235302",
    lon: "174.7844342",
    name: "Onehunga Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5.30pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 3736669707,
    address: "85 Church St, Onehunga",
    visited: true,
    libraryId: 31,
  },
  {
    lat: "-36.586920500000005",
    lon: "174.69444404610624",
    name: "Ōrewa Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "9.30am - 3.30pm",
      Tuesday: "9am - 5pm",
      Saturday: "9.30am - 3.30pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 339633347,
    address: "12 Moana Ave, Ōrewa",
    visited: true,
    libraryId: 32,
  },
  {
    lat: "-36.94510495",
    lon: "174.8408367940081",
    name: "Ōtāhuhu Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 6pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 364712053,
    address: "28-30 Mason Ave, Ōtāhuhu",
    visited: true,
    libraryId: 33,
  },
  {
    lat: "-36.960164",
    lon: "174.87313793455382",
    name: "Ōtara Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "Closed",
      Tuesday: "9am - 5.30pm",
      Saturday: "8am - 1.30pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 329253435,
    address: "Ōtara Town Centre, 46 Fair Mall, Ōtara",
    visited: true,
    libraryId: 34,
  },
  {
    lat: "-36.9130831",
    lon: "174.8727512",
    name: "Pakuranga Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 6pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 2946817851,
    address: "7 Aylesbury St, Pakuranga",
    visited: true,
    libraryId: 35,
  },
  {
    lat: "-36.898696",
    lon: "174.8546370671971",
    name: "Panmure Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 7pm",
    },
    osm_id: 301789353,
    address: "7-13 Pilkington Rd, Panmure",
    visited: true,
    libraryId: 36,
  },
  {
    lat: "-36.98035",
    lon: "174.85506",
    name: "Papatoetoe War Memorial Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 7pm",
    },
    osm_id: "53202830",
    address: "30 Wallace Rd, Papatoetoe",
    visited: true,
    libraryId: 37,
  },
  {
    lat: "-36.86332",
    lon: "174.78015",
    name: "Parnell Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 6pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: "",
    address: "Jubilee Building, 545 Parnell Road, Parnell",
    visited: true,
    libraryId: 38,
  },
  {
    lat: "-36.87046",
    lon: "174.71004",
    name: "Pt Chevalier Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 6pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: "",
    address:
      "Annex at Point Chevalier Community Centre, 18 Huia Road, Pt Chevalier",
    visited: false,
    libraryId: 39,
  },
  {
    lat: "-37.2024714",
    lon: "174.9045161",
    name: "Pukekohe Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 7pm",
      Saturday: "9am - 3pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 967763822,
    address: "12 Massey Ave, Pukekohe",
    visited: true,
    libraryId: 40,
  },
  {
    lat: "-36.86332",
    lon: "174.60235",
    name: "Rānui Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 10779442430,
    address: "Cnr Swanson Rd and Armada Drive, Rānui",
    visited: false,
    libraryId: 41,
  },
  {
    lat: "-36.8811706",
    lon: "174.8001811",
    name: "Remuera Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 1668408125,
    address: "429 Remuera Rd, Remuera",
    visited: true,
    libraryId: 42,
  },
  {
    lat: "-37.063771149999994",
    lon: "174.94266202091654",
    name: "Sir Edmund Hillary Library (Papakura)",
    hours: {
      Friday: "9am - 7pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 7pm",
    },
    osm_id: 329838411,
    address: "209 Great South Rd, Papakura",
    visited: true,
    libraryId: 43,
  },
  {
    lat: "-36.8511708",
    lon: "174.8579488",
    name: "St Heliers Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 352833230,
    address: "32 St Heliers Bay Road, St Heliers",
    visited: false,
    libraryId: 44,
  },
  {
    lat: "-36.78906805",
    lon: "174.7739506533252",
    name: "Takapuna Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "9.30am - 4.30pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "9.30am - 4.30pm",
      Thursday: "9am - 7.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 298972814,
    address: "9 The Strand, Takapuna",
    visited: true,
    libraryId: 45,
  },
  {
    lat: "-36.8418093",
    lon: "174.6521439",
    name: "Te Atatū Peninsula Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 3pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 726516297,
    address: "595 Te Atatū Rd, Te Atatū Peninsula",
    visited: false,
    libraryId: 46,
  },
  {
    lat: "-37.0340162",
    lon: "174.8670672",
    name: "Te Matariki Clendon Library",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "Closed",
      Tuesday: "9am - 6.30pm",
      Saturday: "9am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 3736722744,
    address: "17 Palmers Rd, Manukau",
    visited: true,
    libraryId: 47,
  },
  {
    lat: "-36.9390076",
    lon: "174.6555569",
    name: "Titirangi Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "Closed",
      Tuesday: "9am - 6pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 3800529871,
    address: "500 South Titirangi Rd, Titirangi",
    visited: true,
    libraryId: 48,
  },
  {
    lat: "-36.9761005",
    lon: "174.89514358758643",
    name: "Tupu Youth Library",
    hours: {
      Friday: "9.30am - 6.30pm",
      Monday: "9.30am - 6.30pm",
      Sunday: "12pm - 4pm",
      Tuesday: "9.30am - 6.30pm",
      Saturday: "9.30am - 4.30pm",
      Thursday: "9.30am - 6.30pm",
      Wednesday: "9.30am - 6.30pm",
    },
    osm_id: 329253465,
    address: "102 Dawson Rd, Ōtara",
    visited: true,
    libraryId: 49,
  },
  {
    lat: "-36.78132395",
    lon: "175.00734415839082",
    name: "Waiheke Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 6pm",
      Sunday: "10.30am - 4pm",
      Tuesday: "9am - 6pm",
      Saturday: "10.30am - 4pm",
      Thursday: "9am - 6pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 729263470,
    address: "131-133 Ocean View Rd, Oneroa, Waiheke Island",
    visited: false,
    libraryId: 50,
  },
  {
    lat: "-36.87900775",
    lon: "174.63336076788016",
    name: "Waitākere Central Library (Henderson)",
    hours: {
      Friday: "9am - 5.30pm",
      Monday: "9am - 5.30pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 5.30pm",
      Saturday: "10am - 4pm",
      Thursday: "9am - 7pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: 76354615,
    address: "3 Ratanui St, Henderson",
    visited: true,
    libraryId: 51,
  },
  {
    lat: "-37.24804",
    lon: "174.72875",
    name: "Waiuku Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5.30pm",
      Sunday: "Closed",
      Tuesday: "9am - 5.30pm",
      Saturday: "9am - 3pm",
      Thursday: "9am - 5.30pm",
      Wednesday: "9am - 5.30pm",
    },
    osm_id: "",
    address: "Civic Centre, 10 King Street, Waiuku",
    visited: true,
    libraryId: 52,
  },
  {
    lat: "-36.3976094",
    lon: "174.6665057",
    name: "Warkworth Library",
    hours: {
      Friday: "9am - 6pm",
      Monday: "9am - 5pm",
      Sunday: "10am - 3pm",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 3pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 1316019870,
    address: "2 Baxter St, Warkworth",
    visited: false,
    libraryId: 53,
  },
  {
    lat: "-36.2974883",
    lon: "174.5227258",
    name: "Wellsford War Memorial Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "Closed",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 1pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 3735228024,
    address: "13 Port Albert Rd, Wellsford",
    visited: false,
    libraryId: 54,
  },
  {
    lat: "-36.635645499999995",
    lon: "174.7471360253623",
    name: "Whangaparāoa Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "9.30am - 3.30pm",
      Tuesday: "9am - 5pm",
      Saturday: "9.30am - 3.30pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 339512001,
    address: "9 Main St, Whangaparāoa",
    visited: true,
    libraryId: 55,
  },
  {
    lat: "-36.8187082",
    lon: "174.6095749",
    name: "Te Manawa (Westgate)",
    hours: {
      Friday: "9am - 7pm",
      Monday: "9am - 6pm",
      Sunday: "9am - 6pm",
      Tuesday: "9am - 6pm",
      Saturday: "9am - 6pm",
      Thursday: "9am - 9pm",
      Wednesday: "9am - 6pm",
    },
    osm_id: 724812016,
    address: "11 Kohuhu Lane, Massey",
    visited: true,
    libraryId: 69,
  },
  {
    lat: "-37.0462555",
    lon: "174.9307402",
    name: "Takaanini Community Hub and Library",
    hours: {
      Friday: "9am - 5pm",
      Monday: "9am - 5pm",
      Sunday: "10am - 4pm",
      Tuesday: "9am - 5pm",
      Saturday: "9am - 5pm",
      Thursday: "9am - 5pm",
      Wednesday: "9am - 5pm",
    },
    osm_id: 826116088,
    address: "30 Walters Road, Takanini",
    visited: true,
    libraryId: 73,
  },
] as const;

export default function Home() {
  // imported like this, as leaflet needs to be all client side
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: !!false,
      }),
    [],
  );

  const [highlightedLibrary, setHighlightedLibrary] = useState<Library | null>(
    null,
  );

  return (
    <div className="flex h-screen w-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="p-4">
        <h1 className="text-2xl">Auckland Library Tracker</h1>
      </header>
      <main className="flex h-4/5 grow flex-row items-center gap-0 sm:items-start">
        <div className="h-full grow">
          <List
            libraries={libraries}
            highlightedLibrary={highlightedLibrary}
            setHighlightedLibrary={setHighlightedLibrary}
          />
        </div>
        <div className="h-full w-full grow">
          <Map
            startPosition={[-36.8977, 174.9188]}
            zoom={11}
            libraries={libraries}
            highlightedLibrary={highlightedLibrary}
            setHighlightedLibrary={setHighlightedLibrary}
          />
        </div>
      </main>
      <footer className="h-1/10 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Cole-Maguire"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github-mark.svg"
            alt="GitHub logo"
            width={16}
            height={16}
          />
          Visit me on Github!
        </a>
      </footer>
    </div>
  );
}
