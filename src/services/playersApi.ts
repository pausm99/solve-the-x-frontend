import { Player } from "../types/Player";

export async function getPlayers(): Promise<Player[] | []> {
    try {
      const response = await fetch('http://localhost:3000/players');
      return await response.json();
    } catch (error) {
      console.error('Error obtaining players', error);
      return [];
    }
}
  