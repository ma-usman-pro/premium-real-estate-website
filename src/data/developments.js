import { img, exteriors, livingRooms } from './images';

export const developments = [
  {
    id: 'the-arches',
    name: 'The Arches',
    area: 'Kensington',
    developer: 'Hartlow Capital',
    completion: 'Q2 2027',
    startingPrice: 1650000,
    residences: 34,
    image: img(exteriors[0], 1800),
    description:
      'A collection of 34 apartments and duplexes set behind a restored Victorian brick facade, arranged around a private landscaped courtyard.',
  },
  {
    id: 'riverside-house',
    name: 'Riverside House',
    area: 'Chelsea',
    developer: 'Thameswater Developments',
    completion: 'Q4 2026',
    startingPrice: 2100000,
    residences: 21,
    image: img(exteriors[3], 1800),
    description:
      'Twenty-one riverfront residences with private terraces overlooking the Thames, designed around a resident wellness floor and private mooring.',
  },
  {
    id: 'the-regent-collection',
    name: 'The Regent Collection',
    area: 'Mayfair',
    developer: 'Grosvenor & Pyne',
    completion: 'Q1 2028',
    startingPrice: 3200000,
    residences: 16,
    image: img(exteriors[2], 1800),
    description:
      'A discreet collection of sixteen residences behind a listed Mayfair facade, with interiors by an award-winning London design studio.',
  },
];

export const testimonials = [
  {
    id: 't1',
    quote:
      'VERA handled every detail with professionalism. We felt supported from the first viewing to completion.',
    name: 'Charlotte H.',
    propertyType: 'Chelsea Garden House',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      "Their understanding of the London market made the entire process incredibly smooth.",
    name: 'David & Ruth M.',
    propertyType: 'Hampstead Modern',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'Professional, responsive and genuinely focused on finding the right property for us.',
    name: 'Alexander P.',
    propertyType: 'Riverlight Apartment',
    rating: 5,
  },
  {
    id: 't4',
    quote:
      "We viewed a dozen agencies before choosing VERA. The difference in care and discretion was obvious immediately.",
    name: 'Isabelle F.',
    propertyType: 'The Mayfair Penthouse',
    rating: 5,
  },
  {
    id: 't5',
    quote:
      'A genuinely considered service — from the valuation through to marketing, nothing felt generic.',
    name: 'Marcus T.',
    propertyType: 'Notting Hill Townhouse',
    rating: 5,
  },
];

export const categories = [
  { id: 'apartments', name: 'Apartments', count: 42, image: img(livingRooms[0], 1400) },
  { id: 'houses', name: 'Houses', count: 27, image: img(exteriors[4], 1400) },
  { id: 'penthouses', name: 'Penthouses', count: 9, image: img(exteriors[2], 1400) },
  { id: 'townhouses', name: 'Townhouses', count: 18, image: img(exteriors[5], 1400) },
  { id: 'new-developments', name: 'New Developments', count: 12, image: img(exteriors[0], 1400) },
];

export const mapLocations = [
  { id: 'kensington', name: 'Kensington', x: 32, y: 46, properties: 9 },
  { id: 'chelsea', name: 'Chelsea', x: 34, y: 58, properties: 7 },
  { id: 'mayfair', name: 'Mayfair', x: 46, y: 42, properties: 5 },
  { id: 'hampstead', name: 'Hampstead', x: 40, y: 12, properties: 6 },
  { id: 'notting-hill', name: 'Notting Hill', x: 24, y: 38, properties: 8 },
  { id: 'canary-wharf', name: 'Canary Wharf', x: 84, y: 52, properties: 4 },
];
