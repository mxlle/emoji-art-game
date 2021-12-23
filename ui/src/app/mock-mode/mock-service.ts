import {map, Subject} from 'rxjs';
import {Game} from "../../game-logic/game";
import {masterFaker} from "../../game-logic/gameConsts";

export const mockGameId = `testGame${masterFaker}`

const _game$ = new Subject<Game>();
export const game$ = _game$.asObservable().pipe(
    // deep copy to trigger change detection
    map((game) => JSON.stringify(game)),
    map((gameString) => JSON.parse(gameString) as Game)
);

export function updateMockGame(game: Game) {
    _game$.next(game);
}
