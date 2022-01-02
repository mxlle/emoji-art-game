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
  const e1 = randomArrayValue(splitEmojis(positiveSmileys));
  const e2 = randomArrayValue(splitEmojis(animals));
  const e3 = randomArrayValue(splitEmojis(foodAndDrink));
  const e4 = randomArrayValue(splitEmojis(travelAndPlaces));

  return e1 + e2 + e3 + e4;
}

// copied from https://getemoji.com/
export const positiveSmileys =
  '😀 😃 😄 😁 😆 😅 😂 🤣 🥲 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤓 😎 🥸 🤩 🥳 😏 🤗 🤤 🤑 🤠';
export const negativeSmileys =
  '🤨 🧐 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕';
export const smileys = positiveSmileys + negativeSmileys;
export const additionalSmileys = '🤡 💩 👻 ☠️ 👽 🤖 🎃';
export const catSmileys = '😺 😸 😹 😻 😼 😽 🙀 😿 😾';
export const monkeySmileys = '🙈 🙉 🙊';
export const gestures = '👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏';
export const bodyParts = '💅 🤳 ✋ 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃 🫀 🫁 🧠 🦷 🦴 👀 👁 👅 👄 💋 🩸';
export const clothingAndAccessories =
  '🧳 🌂 ☂️ 🧵 🪡 🪢 🧶 👓 🕶 🥽 🥼 🦺 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 🥻 🩴 🩱 🩳 👙 👚 👛 👜 👝 🎒 👟 🥾 👠 🩰 👢 👑 👒 🎩 🎓 🧢 🪖 💄 💍 💼';
export const animalFaces = '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🐤 🐺 🐗 🐴 🦄';
export const animals =
  '🐒 🐣 🦆 🦅 🦉 🦇 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷 🕸 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦞 🦀 🐡 🐟 🐬 🐳 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🦣 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🦬 🐂 🐄 🐎 🐖 🐑 🦙 🐐 🦌 🐕 🐩 🐈 ‍🪶 🐓 🦤 🦚 🦜 🦢 🦩 🕊 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁 🐿 🦔 🐉';
export const nature = '🌵 🎄 🌲 🌳 🌴 🪵 🌱 🌿 ☘️ 🍀 🪴 🎋 🍃 🍂 🍁 🍄 🐚 🪨 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻';
export const weatherAndEarth = '🌙 🌎 🌍 🌏 🪐 💫 ⭐️ ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 ☀️ ⛅️ ☁️ 🌦 🌧 ⛈️ 🌨 ❄️ ⛄️ 💨 💧 💦 ☔️ 🌊 ';
export const foodAndDrink =
  '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🫕 🥫 🍝 🍛 🍣 🍱 🍤 🍚 🥠 🍡 🍨 🍦 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🥜 🍯 🥛 🍼 🫖 ☕️ 🧃 🥤 🍺 🥂 🍷 🥃 🍸 🍾 🧊 🥄 🍴 🍽 🥡 🧂';
export const activityAndSport =
  '⚽️ 🏀 🏈 ⚾️ 🎾 🏐 🥏 🎱 🪀 🏓 🏸 🏒 🪃 🥅 ⛳️ 🪁 🏹 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸️ 🥌 🎿 🏆 🥇 🎖 🎫 🎟 🎪 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🪘 🎷 🎺 🪗 🎸 🪕 🎻 🎲 ♟️ 🎯 🎳 🎮 🎰 🧩';
export const activityPersons = '⛷ 🏂 🪂  🏋️  🤼  🤸 ⛹️  🤺  🤾  🏌️  🏇  🧘  🏄  🏊 🤽  🚣 🧗 🚴 🤹 🏃';
export const travelAndPlaces =
  '🚗 🚕 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🦯 🦽 🦼 🛴 🚲 🛵 🏍 🛺 🚨 🚔 🚍 🚘 🚖 🚠 🚋 🚄 🚂 🚉 ✈️ 💺 🛰 🚀 🛸 🚁 🛶 ⛵️ 🚤 🛥 🚢 ⚓️ 🪝 ⛽️ 🚧 🚦 🚥 🚏 🗺 🗿 🗽 🗼 🏰 🏯 🏟 🎡 🎢 🎠 ⛲️ 🏖 🏝 🏜 🌋 ⛰️ 🏔 ⛺️ 🛖 🏠 🏗';
export const objects1 = '⌚️ 📱 💻 ⌨️ 🖥 🖨 🖱 🕹 💾 💿 📼 📸 🎥 📽 🎞 📞 ☎️ 📺 📻 🎙 🧭 ⏱️ ⏲️ ⏰ ';
export const objects2 = '📡 🔋 🔌 💡 🔦 🕯 🧯 🛢 💵 💶 🪙 💰 💳 💎 ⚖️ 🪜 🧰 🪛 🔧 🔨 🪚 🔩 ⚙️ 🪤 🧱 ⛓ 🧲 🔫 💣 🧨 🪓 🗡 ⚔️ 🛡';
export const objects3 = '🏺 🔮 📿 💈 🔭 🔬 🕳 🩹 🩺 💊 💉 🩸 🧬 🦠 🧪 🌡 🧹 🪠 🧺 🧻 🚽 🚰 🚿 🛁 🪥 🪒 🧽 🪣 🧴';
export const objects4 = '🛎 🔑 🗝 🚪 🪑 🛋 🛏 🧸 🪆 🖼 🪞 🪟 🛍 🛒 🎁 🎈 🎀 🪄 🎊 🎉 ✉️ ';

export const jobs = ' 👮 👷 💂 🕵️ 🧑‍⚕️ 🧑‍🌾 🧑‍🍳 🧑‍🎓 🧑‍🎤 🧑‍🏫 🧑‍🏭 🧑‍💻 🧑‍💼 🧑‍🔧 🧑‍🔬 🧑‍🎨 🧑‍🚒 🧑‍✈️ 🧑‍🚀  🧑‍⚖️ 💃 🕺 ';
export const phantasy = '👸 🤴 🥷️ 🦸 🦹 🎅 🧙 🧝 🧛️ 🧟 🧞 🧜 👼 ';
