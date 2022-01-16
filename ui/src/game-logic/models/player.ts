import { Role } from './role';
import { Picture } from './picture';
import { Game } from './game';

export interface Player {
  id: string;
  name: string;
  color?: string;
  role?: Role;
  pictures?: Picture[];
}

export function playerToString(player: Player): string {
  return player.id + player.name + player.color + player.role;
}

export function playersToString(players: Player[]): string {
  return players.reduce((stringVal, player) => stringVal.concat(playerToString(player)), '');
}

export function getPlayerColors(players: Player[]): string[] {
  return players.map((p) => p.color ?? '').filter((c) => !!c);
}

export function getPlayerInGame(game: { players: Player[] }, playerId?: string): Player | undefined {
  return game.players.find((player: Player) => player.id === playerId);
}

export function getPlayersWithRequiredAction(_game: Game): Player[] {
  return []; // todo
}

export function mapToPublicPlayer({ id, name, color, role }: Player): Player {
  // without pictures
  return { id, name, color, role };
}
