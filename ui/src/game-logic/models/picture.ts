import { Game } from './game';
import { GamePhase } from './gamePhase';
import { Player } from './player';

export interface Picture {
  card: string;
  painterTheme?: string;
  buyerTheme?: string;
  buyerSelection?: BuyerSelection[];
  isFake?: boolean;
  fakeStatusKnown?: boolean;
  painterId?: string;
}

export interface BuyerSelection {
  // playerIds per theme
  theme: string;
  playerIds: string[];
}

export function isPictureSelectedFromPainter(pic: Picture): boolean {
  return !!pic.painterTheme;
}

export function isPictureSelectedFromBuyer(pic: Picture): boolean {
  return !!pic.buyerTheme;
}

export function getOfferedPictures(game: Game): Picture[] {
  return game.players.reduce(
    (currentArr: Picture[], player: Player) =>
      currentArr.concat(
        (player.pictures ?? []).filter(isPictureSelectedFromPainter).map((pic) => {
          pic.painterId = player.id;
          return pic;
        })
      ),
    []
  );
}

export function getBuyerSelection(game: Game): Picture[] {
  return game && GamePhase.Choose === game.phase
    ? game.rounds[game.currentRound].pictures.filter(
        (pic) => !!pic.buyerTheme || (pic.buyerSelection && !!Object.keys(pic.buyerSelection).length)
      )
    : [];
}
