import { Game, Picture } from './game';

export function getPictureCssClass(game: Game, picture: Picture): string {
  if (game.teamPoints.findIndex((pic) => pic.card === picture.card) > -1) {
    return 'correct';
  } else if (game.neutralCards.findIndex((pic) => pic.card === picture.card) > -1) {
    return 'neutral';
  } else if (game.fakePoints.findIndex((pic) => pic.card === picture.card) > -1) {
    return 'fake';
  } else {
    return '';
  }
}
