import {
  accessories,
  activity,
  activityPersons,
  bigAnimals,
  birdAnimals,
  bodyParts,
  clothing,
  domesticAnimals,
  drinksAndFoodObjects,
  freshFood,
  insectAnimals,
  jobs,
  music,
  nature,
  objects1,
  objects2,
  objects3,
  objects4,
  otherAnimals,
  phantasy,
  processedFood,
  smileysForGame,
  splitEmojis,
  sport,
  sweets,
  travelAndPlaces,
  vehicles,
  waterReptileAnimals,
  weatherAndEarth,
} from '../game-tools/emoji-util';
import { shuffleArray } from '../game-tools/random-util';

export enum EmojiType {
  Activity,
  Animals,
  BodyAndFace,
  Clothing,
  Food,
  Nature,
  Objects,
  Persons,
  Travel,
}

export enum EmojiCategoryId {
  Sport,
  Activity,
  Music,
  ActivePersons,
  WaterAnimals,
  Birds,
  Insects,
  DomesticAnimals,
  BigAnimals,
  OtherAnimals,
  BodyParts,
  Smileys,
  Clothing,
  Accessories,
  FreshFood,
  ProcessedFood,
  Sweets,
  Drinks,
  Nature,
  Weather,
  Objects1,
  Objects2,
  Objects3,
  Objects4,
  Jobs,
  Phantasy,
  Vehicles,
  Travel,
}

export interface EmojiCategory {
  id: EmojiCategoryId;
  label: string;
  type: EmojiType;
  emojis: string[];
}

export const emojiCategories: EmojiCategory[] = [
  { id: EmojiCategoryId.Sport, label: 'Sport Objects', type: EmojiType.Activity, emojis: splitEmojis(sport) },
  { id: EmojiCategoryId.Activity, label: 'Activity Objects', type: EmojiType.Activity, emojis: splitEmojis(activity) },
  { id: EmojiCategoryId.Music, label: 'Music Objects', type: EmojiType.Activity, emojis: splitEmojis(music) },
  { id: EmojiCategoryId.ActivePersons, label: 'Activity Persons', type: EmojiType.Activity, emojis: splitEmojis(activityPersons) },
  {
    id: EmojiCategoryId.WaterAnimals,
    label: 'Water Animals and reptiles',
    type: EmojiType.Animals,
    emojis: splitEmojis(waterReptileAnimals),
  },
  { id: EmojiCategoryId.Birds, label: 'Birds and air', type: EmojiType.Animals, emojis: splitEmojis(birdAnimals) },
  { id: EmojiCategoryId.Insects, label: 'Insects', type: EmojiType.Animals, emojis: splitEmojis(insectAnimals) },
  { id: EmojiCategoryId.DomesticAnimals, label: 'Domestic Animals', type: EmojiType.Animals, emojis: splitEmojis(domesticAnimals) },
  { id: EmojiCategoryId.BigAnimals, label: 'Big Animals', type: EmojiType.Animals, emojis: splitEmojis(bigAnimals) },
  { id: EmojiCategoryId.OtherAnimals, label: 'Other Wild Animals', type: EmojiType.Animals, emojis: splitEmojis(otherAnimals) },
  { id: EmojiCategoryId.BodyParts, label: 'Body parts', type: EmojiType.BodyAndFace, emojis: splitEmojis(bodyParts) },
  { id: EmojiCategoryId.Smileys, label: 'Smileys', type: EmojiType.BodyAndFace, emojis: splitEmojis(smileysForGame) },
  { id: EmojiCategoryId.Clothing, label: 'Clothing', type: EmojiType.Clothing, emojis: splitEmojis(clothing) },
  { id: EmojiCategoryId.Accessories, label: 'Accessories', type: EmojiType.Clothing, emojis: splitEmojis(accessories) },
  { id: EmojiCategoryId.FreshFood, label: 'Fresh Food', type: EmojiType.Food, emojis: splitEmojis(freshFood) },
  { id: EmojiCategoryId.ProcessedFood, label: 'Processed Food', type: EmojiType.Food, emojis: splitEmojis(processedFood) },
  { id: EmojiCategoryId.Sweets, label: 'Sweets', type: EmojiType.Food, emojis: splitEmojis(sweets) },
  { id: EmojiCategoryId.Drinks, label: 'Drinks and food objects', type: EmojiType.Food, emojis: splitEmojis(drinksAndFoodObjects) },
  { id: EmojiCategoryId.Nature, label: 'Nature', type: EmojiType.Nature, emojis: splitEmojis(nature) },
  { id: EmojiCategoryId.Weather, label: 'Weather', type: EmojiType.Nature, emojis: splitEmojis(weatherAndEarth) },
  { id: EmojiCategoryId.Objects1, label: 'Objects 1', type: EmojiType.Objects, emojis: splitEmojis(objects1) },
  { id: EmojiCategoryId.Objects2, label: 'Objects 2', type: EmojiType.Objects, emojis: splitEmojis(objects2) },
  { id: EmojiCategoryId.Objects3, label: 'Objects 3', type: EmojiType.Objects, emojis: splitEmojis(objects3) },
  { id: EmojiCategoryId.Objects4, label: 'Objects 4', type: EmojiType.Objects, emojis: splitEmojis(objects4) },
  { id: EmojiCategoryId.Jobs, label: 'Jobs', type: EmojiType.Persons, emojis: splitEmojis(jobs) },
  { id: EmojiCategoryId.Phantasy, label: 'Phantasy', type: EmojiType.Persons, emojis: splitEmojis(phantasy) },
  { id: EmojiCategoryId.Vehicles, label: 'Vehicles', type: EmojiType.Travel, emojis: splitEmojis(vehicles) },
  { id: EmojiCategoryId.Travel, label: 'Travel', type: EmojiType.Travel, emojis: splitEmojis(travelAndPlaces) },
];

export function createDeck(categories: EmojiCategoryId[], limitPerCategory: number): string[] {
  return shuffleArray(
    emojiCategories
      .filter((category: EmojiCategory) => categories.includes(category.id))
      .reduce((deck: string[], category: EmojiCategory) => {
        const shuffledEmojis = shuffleArray([...category.emojis]);
        return [...deck, ...shuffledEmojis.slice(0, limitPerCategory)];
      }, [])
  );
}
