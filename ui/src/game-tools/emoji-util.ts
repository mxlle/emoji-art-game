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
export const positiveSmileys1 = '😀 😃 😄 😁 😆 😅 🤣 🥲 ☺️ 😊 🙂 🙃 😉 😌 😘 😗 😙 😚 😛 😝 😜 🤪 😏 🤗 🤭 ';
export const positiveSmileys2 = '😂 😇 😍 🥰 😋 🤓 😎 🤩 🥳 🤤 🤑 🤠';
export const negativeSmileys1 =
  '🤨 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 😳 😨 😰 😥 😓 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 😪 😵 🤐 🥴 🤢 ';
export const negativeSmileys2 = '🧐 🤯 🥵 🥶 😱 😲 🥱 😴 🤮 🤧 😷 🤒 🤕 🤡 ';
export const smileys = positiveSmileys1 + positiveSmileys1 + negativeSmileys1 + negativeSmileys2;
export const smileysForGame = positiveSmileys2 + negativeSmileys2;
export const catSmileys = '😺 😸 😹 😻 😼 😽 🙀 😿 😾';
export const monkeySmileys = '🙈 🙉 🙊';
export const gestures = '👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏';
export const bodyParts = '💅 🤳 ✋ 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃 🫀 🫁 🧠 🦷 🦴 👀 👁 👅 👄 💋';
export const clothing = '🥼 🦺 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 🥻 🩴 🩱 🩳 👙 👚 👟 🥾 👠 🩰 👢';
export const accessories = '🧳 🌂 ☂️ 🧵 🪡 🪢 🧶 👓 🕶 🥽 👛 👜 👝 🎒 👑 👒 🎩 🎓 🧢 🪖 💄 💍 💼';
export const waterReptileAnimals = '🐙 🦞 🦀 🐡 🐟 🐬 🐳 🦈 🐊 🦫 🦦 🐸 🐢 🐍 🦎 🦖 🦕 🐉 ';
export const birdAnimals = '🐣 🦆 🦅 🦉 🦇 ‍🪶 🐓 🦤 🦚 🦜 🦢 🦩 🕊 🐔 🐧 🐦 🐤 ';
export const insectAnimals = '🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷 🕸 🦂 ';
export const domesticAnimals = '🐂 🐄 🐎 🐖 🐑 🐐 🐕 🐩 🐈 🐇 🐁 🐶 🐱 🐭 🐹 🐰 🐮 🐷 🐴 ';
export const bigAnimals = '🐅 🦓 🦍 🦧 🦣 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🦬 🦄 🐻 🐼 🐻‍❄️ ';
export const otherAnimals = '🐵 🐒 🐆 🦡 🦙 🦥 🦊 🐨 🐯 🦁 🐺 🐗 🦌 🦝 🦨 🐿 🦔 ';
export const animals = waterReptileAnimals + birdAnimals + insectAnimals + domesticAnimals + bigAnimals + otherAnimals;
export const nature = '🌵 🎄 🌲 🌳 🌴 🪵 🌱 🌿 ☘️ 🍀 🪴 🎋 🍃 🍂 🍁 🍄 🐚 🪨 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻';
export const weatherAndEarth = '🌙 🌎 🌍 🌏 🪐 💫 ⭐️ ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 ☀️ ⛅️ ☁️ 🌦 🌧 ⛈️ 🌨 ❄️ ⛄️ 💨 💧 💦 ☔️ 🌊 ';
export const freshFood = '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥜 ';
export const processedFood = '🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥓 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🫕 🥫 🍝 🍛 🍣 🍱 🍤 🍚 ';
export const sweets = '🥐 🥞 🧇 🥠 🍡 🍨 🍦 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🍯 ';
export const drinksAndFoodObjects = '🥛 🍼 🫖 ☕️ 🧃 🥤 🍺 🥂 🍷 🥃 🍸 🍾 🧊 🥄 🍴 🍽 🥡 🧂';
export const foodAndDrink = freshFood + processedFood + sweets + drinksAndFoodObjects;
export const sport = '⚽️ 🏀 🏈 ⚾️ 🎾 🏐 🪀 🏓 🏸 🏒 🥅 ⛳️ 🏹 🥊 🥋 🎽 🛹 🛼 ⛸️ 🥌 🎿 🏆 🥇 🎖';
export const activity = '🪁 🪃 🎣 🤿 🎫 🎟 🎪 🎭 🩰 🎨 🎬 🎲 ♟️ 🎯 🥏 🎱 🎳 🎮 🎰 🧩 🛷';
export const music = '📻 🎙 🎤 🎧 🎼 🎹 🥁 🪘 🎷 🎺 🪗 🎸 🪕 🎻';
export const activityPersons = '⛷ 🏂 🪂  🏋️  🤼  🤸 ⛹️  🤺  🤾  🏌️  🏇  🧘  🏄  🏊 🤽  🚣 🧗 🚴 🤹 🏃';
export const vehicles = '🚗 🚕 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🦽 🦼 🛴 🚲 🛵 🏍 🛺 🚔 🚍 🚘 🚖 🚠 🚋 🚄 🚂 🚉 ✈️ 🚀 🛸 🚁 🛶 ⛵️ 🚤 🛥 🚢 ';
export const travelAndPlaces = '🦯 🚨 💺 🛰 ⚓️ 🪝 ⛽️ 🚧 🚦 🚥 🚏 🗺 🗿 🗽 🗼 🏰 🏯 🏟 🎡 🎢 🎠 ⛲️ 🏖 🏝 🏜 🌋 ⛰️ 🏔 ⛺️ 🛖 🏠 🏗';
export const objects1 = '⌚️ 📱 💻 ⌨️ 🖥 🖨 🖱 🕹 💾 💿 📼 📸 🎥 📽 🎞 📞 ☎️ 📺 🧭 ⏱️ ⏲️ ⏰ 📡 🔋 🔌 💡 🔦 ';
export const objects2 = '🕯 🧯 🛢 💵 💶 🪙 💰 💳 💎 ⚖️ 🪜 🧰 🪛 🔧 🔨 🪚 🔩 ⚙️ 🪤 🧱 ⛓ 🧲 🔫 💣 🧨 🪓 🗡 ⚔️ 🛡';
export const objects3 = '🏺 🔮 📿 💈 🔭 🔬 🕳 🩹 🩺 💊 💉 🩸 🧬 🦠 🧪 🌡 🧹 🪠 🧺 🧻 🚽 💩 🚰 🚿 🛁 🪥 🪒 🧽 🪣 🧴';
export const objects4 = '🛎 🔑 🗝 🚪 🪑 🛋 🛏 🧸 🪆 🖼 🪞 🪟 🛍 🛒 🎁 🎈 🎀 🪄 🎊 🎉 ✉️ 👻 ☠️ 👽 🤖 🎃';

export const jobs = ' 👮 👷 💂 🕵️ 🧑‍⚕️ 🧑‍🌾 🧑‍🍳 🧑‍🎓 🧑‍🎤 🧑‍🏫 🧑‍🏭 🧑‍💻 🧑‍💼 🧑‍🔧 🧑‍🔬 🧑‍🎨 🧑‍🚒 🧑‍✈️ 🧑‍🚀  🧑‍⚖️ 💃 🕺 ';
export const phantasy = '👸 🤴 🥷️ 🦸 🦹 🎅 🧙 🧝 🧛️ 🧟 🧞 🧜 👼 ';
