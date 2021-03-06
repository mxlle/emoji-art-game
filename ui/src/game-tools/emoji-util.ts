import { randomArrayValue } from './random-util';

export function splitEmojis(string: string): string[] {
  const list = [];
  while (string.length) {
    // @ts-ignore
    const [char] = string.match(
      /^[\u{1F1E6}-\u{1F1FF}]{2}|.[\ufe0e\ufe0f]?[\u{1F3FB}-\u{1F3FF}]?(\u200d\p{Emoji}[\ufe0e\ufe0f]?|[\u{E0020}-\u{E007F}])*[\ufe0e\ufe0f]?/u
    );
    if (isCharacterEmoji(char)) {
      list.push(char);
    }
    string = string.slice(char.length);
  }
  return list;
}

export function isCharacterEmoji(char: string): boolean {
  const regexExp = /\p{Emoji}/u;

  return regexExp.test(char);
}

export function generateEmojiId(): string {
  const e1 = randomArrayValue(splitEmojis(positiveSmileys1 + positiveSmileys2 + catSmileys));
  const e2 = randomArrayValue(splitEmojis(animals));
  const e3 = randomArrayValue(splitEmojis(foodAndDrink));
  const e4 = randomArrayValue(splitEmojis(travelAndPlaces + vehicles));

  return e1 + e2 + e3 + e4;
}

// copied from https://getemoji.com/
export const positiveSmileys1 = '๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ ๐ฅฒ โบ๏ธ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐ ๐ค ๐คญ ';
export const positiveSmileys2 = '๐ ๐ ๐ ๐ฅฐ ๐ ๐ค ๐ ๐คฉ ๐ฅณ ๐คค ๐ค ๐ค ';
export const negativeSmileys1 =
  '๐คจ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ๐ฅบ ๐ข ๐ญ ๐ค ๐  ๐ก ๐คฌ ๐ณ ๐จ ๐ฐ ๐ฅ ๐ ๐ค ๐คญ ๐คซ ๐คฅ ๐ถ ๐ ๐ ๐ฌ ๐ ๐ฏ ๐ฆ ๐ง ๐ฎ ๐ฒ ๐ช ๐ต ๐ค ๐ฅด ๐คข ';
export const negativeSmileys2 = '๐ง ๐คฏ ๐ฅต ๐ฅถ ๐ฑ ๐ฒ ๐ฅฑ ๐ด ๐คฎ ๐คง ๐ท ๐ค ๐ค ๐คก ';
export const smileys = positiveSmileys1 + positiveSmileys1 + negativeSmileys1 + negativeSmileys2;
export const smileysForGame = positiveSmileys2 + negativeSmileys2;
export const catSmileys = '๐บ ๐ธ ๐น ๐ป ๐ผ ๐ฝ ๐ ๐ฟ ๐พ';
export const monkeySmileys = '๐ ๐ ๐';
export const gestures = '๐ ๐ค ๐ โ ๐ ๐ ๐ค ๐ค โ๏ธ ๐ค ๐ค ๐ค ๐ค ๐ ๐ ๐ ๐ ๐ โ๏ธ ๐ ๐ โ ๐ ๐ค ๐ค ๐ ๐ ๐ ๐คฒ ๐ค ๐';
export const bodyParts = '๐ ๐คณ โ ๐ช ๐ฆพ ๐ฆต ๐ฆฟ ๐ฆถ ๐ฃ ๐ ๐ฆป ๐ ๐ซ ๐ซ ๐ง  ๐ฆท ๐ฆด ๐ ๐ ๐ ๐ ๐';
export const clothing = '๐ฅผ ๐ฆบ ๐ ๐ ๐ ๐งฃ ๐งค ๐งฅ ๐งฆ ๐ ๐ ๐ฅป ๐ฉด ๐ฉฑ ๐ฉณ ๐ ๐ ๐ ๐ฅพ ๐  ๐ฉฐ ๐ข';
export const accessories = '๐งณ ๐ โ๏ธ ๐งต ๐ชก ๐ชข ๐งถ ๐ ๐ถ ๐ฅฝ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฉ ๐ ๐งข ๐ช ๐ ๐ ๐ผ';
export const waterReptileAnimals = '๐ ๐ฆ ๐ฆ ๐ก ๐ ๐ฌ ๐ณ ๐ฆ ๐ ๐ฆซ ๐ฆฆ ๐ธ ๐ข ๐ ๐ฆ ๐ฆ ๐ฆ ๐ ';
export const birdAnimals = '๐ฃ ๐ฆ ๐ฆ ๐ฆ ๐ฆ โ๐ชถ ๐ ๐ฆค ๐ฆ ๐ฆ ๐ฆข ๐ฆฉ ๐ ๐ ๐ง ๐ฆ ๐ค ';
export const insectAnimals = '๐ ๐ชฑ ๐ ๐ฆ ๐ ๐ ๐ ๐ชฐ ๐ชฒ ๐ชณ ๐ฆ ๐ฆ ๐ท ๐ธ ๐ฆ ';
export const domesticAnimals = '๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฉ ๐ ๐ ๐ ๐ถ ๐ฑ ๐ญ ๐น ๐ฐ ๐ฎ ๐ท ๐ด ';
export const bigAnimals = '๐ ๐ฆ ๐ฆ ๐ฆง ๐ฆฃ ๐ ๐ฆ ๐ฆ ๐ช ๐ซ ๐ฆ ๐ฆ ๐ฆฌ ๐ฆ ๐ป ๐ผ ๐ปโโ๏ธ ';
export const otherAnimals = '๐ต ๐ ๐ ๐ฆก ๐ฆ ๐ฆฅ ๐ฆ ๐จ ๐ฏ ๐ฆ ๐บ ๐ ๐ฆ ๐ฆ ๐ฆจ ๐ฟ ๐ฆ ';
export const animals = waterReptileAnimals + birdAnimals + insectAnimals + domesticAnimals + bigAnimals + otherAnimals;
export const nature = '๐ต ๐ ๐ฒ ๐ณ ๐ด ๐ชต ๐ฑ ๐ฟ โ๏ธ ๐ ๐ชด ๐ ๐ ๐ ๐ ๐ ๐ ๐ชจ ๐พ ๐ ๐ท ๐น ๐ฅ ๐บ ๐ธ ๐ผ ๐ป';
export const weatherAndEarth = '๐ ๐ ๐ ๐ ๐ช ๐ซ โญ๏ธ โจ โก๏ธ โ๏ธ ๐ฅ ๐ฅ ๐ช ๐ โ๏ธ โ๏ธ โ๏ธ ๐ฆ ๐ง โ๏ธ ๐จ โ๏ธ โ๏ธ ๐จ ๐ง ๐ฆ โ๏ธ ๐ ';
export const freshFood = '๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ซ ๐ ๐ ๐ ๐ฅญ ๐ ๐ฅฅ ๐ฅ ๐ ๐ ๐ฅ ๐ฅฆ ๐ฅฌ ๐ฅ ๐ถ ๐ซ ๐ฝ ๐ฅ ๐ซ ๐ง ๐ง ๐ฅ ๐  ๐ฅ ';
export const processedFood = '๐ฅฏ ๐ ๐ฅ ๐ฅจ ๐ง ๐ฅ ๐ณ ๐ง ๐ฅ ๐ญ ๐ ๐ ๐ ๐ซ ๐ฅช ๐ฅ ๐ง ๐ฎ ๐ฏ ๐ฅ ๐ฅ ๐ซ ๐ฅซ ๐ ๐ ๐ฃ ๐ฑ ๐ค ๐ ';
export const sweets = '๐ฅ ๐ฅ ๐ง ๐ฅ  ๐ก ๐จ ๐ฆ ๐ง ๐ฐ ๐ ๐ฎ ๐ญ ๐ฌ ๐ซ ๐ฟ ๐ฉ ๐ช ๐ฏ ';
export const drinksAndFoodObjects = '๐ฅ ๐ผ ๐ซ โ๏ธ ๐ง ๐ฅค ๐บ ๐ฅ ๐ท ๐ฅ ๐ธ ๐พ ๐ง ๐ฅ ๐ด ๐ฝ ๐ฅก ๐ง';
export const foodAndDrink = freshFood + processedFood + sweets + drinksAndFoodObjects;
export const sport = 'โฝ๏ธ ๐ ๐ โพ๏ธ ๐พ ๐ ๐ช ๐ ๐ธ ๐ ๐ฅ โณ๏ธ ๐น ๐ฅ ๐ฅ ๐ฝ ๐น ๐ผ โธ๏ธ ๐ฅ ๐ฟ ๐ ๐ฅ ๐';
export const activity = '๐ช ๐ช ๐ฃ ๐คฟ ๐ซ ๐ ๐ช ๐ญ ๐ฉฐ ๐จ ๐ฌ ๐ฒ โ๏ธ ๐ฏ ๐ฅ ๐ฑ ๐ณ ๐ฎ ๐ฐ ๐งฉ ๐ท';
export const music = '๐ป ๐ ๐ค ๐ง ๐ผ ๐น ๐ฅ ๐ช ๐ท ๐บ ๐ช ๐ธ ๐ช ๐ป';
export const activityPersons = 'โท ๐ ๐ช  ๐๏ธ  ๐คผ  ๐คธ โน๏ธ  ๐คบ  ๐คพ  ๐๏ธ  ๐  ๐ง  ๐  ๐ ๐คฝ  ๐ฃ ๐ง ๐ด ๐คน ๐';
export const vehicles = '๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ป ๐ ๐ ๐ ๐ฆฝ ๐ฆผ ๐ด ๐ฒ ๐ต ๐ ๐บ ๐ ๐ ๐ ๐ ๐  ๐ ๐ ๐ ๐ โ๏ธ ๐ ๐ธ ๐ ๐ถ โต๏ธ ๐ค ๐ฅ ๐ข ';
export const travelAndPlaces = '๐ฆฏ ๐จ ๐บ ๐ฐ โ๏ธ ๐ช โฝ๏ธ ๐ง ๐ฆ ๐ ๐บ ๐ฟ ๐ฝ ๐ผ ๐ฐ ๐ฏ ๐ ๐ก ๐ข ๐  โฒ๏ธ ๐ ๐ ๐ ๐ โฐ๏ธ ๐ โบ๏ธ ๐ ๐  ๐';
export const objects1 = 'โ๏ธ ๐ฑ ๐ป โจ๏ธ ๐ฅ ๐จ ๐ฑ ๐น ๐พ ๐ฟ ๐ผ ๐ธ ๐ฅ ๐ฝ ๐ ๐ โ๏ธ ๐บ ๐งญ โฑ๏ธ โฒ๏ธ โฐ ๐ก ๐ ๐ ๐ก ๐ฆ ';
export const objects2 = '๐ฏ ๐งฏ ๐ข ๐ต ๐ถ ๐ช ๐ฐ ๐ณ ๐ โ๏ธ ๐ช ๐งฐ ๐ช ๐ง ๐จ ๐ช ๐ฉ โ๏ธ ๐ชค ๐งฑ โ ๐งฒ ๐ซ ๐ฃ ๐งจ ๐ช ๐ก โ๏ธ ๐ก';
export const objects3 = '๐บ ๐ฎ ๐ฟ ๐ ๐ญ ๐ฌ ๐ณ ๐ฉน ๐ฉบ ๐ ๐ ๐ฉธ ๐งฌ ๐ฆ  ๐งช ๐ก ๐งน ๐ช  ๐งบ ๐งป ๐ฝ ๐ฉ ๐ฐ ๐ฟ ๐ ๐ชฅ ๐ช ๐งฝ ๐ชฃ ๐งด';
export const objects4 = '๐ ๐ ๐ ๐ช ๐ช ๐ ๐ ๐งธ ๐ช ๐ผ ๐ช ๐ช ๐ ๐ ๐ ๐ ๐ ๐ช ๐ ๐ โ๏ธ ๐ป โ ๏ธ ๐ฝ ๐ค ๐';

export const jobs = ' ๐ฎ ๐ท ๐ ๐ต๏ธ ๐งโโ๏ธ ๐งโ๐พ ๐งโ๐ณ ๐งโ๐ ๐งโ๐ค ๐งโ๐ซ ๐งโ๐ญ ๐งโ๐ป ๐งโ๐ผ ๐งโ๐ง ๐งโ๐ฌ ๐งโ๐จ ๐งโ๐ ๐งโโ๏ธ ๐งโ๐  ๐งโโ๏ธ ๐ ๐บ ';
export const phantasy = '๐ธ ๐คด ๐ฅท๏ธ ๐ฆธ ๐ฆน ๐ ๐ง ๐ง ๐ง๏ธ ๐ง ๐ง ๐ง ๐ผ ';
