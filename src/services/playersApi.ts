import { Player } from "../types/Player";

const apiURL = import.meta.env.VITE_API_URL;

export async function getPlayers(): Promise<Player[] | []> {
  try {
    const response = await fetch(`${apiURL}/players`);
    if (!response.ok) {
        throw new Error(`Failed to get players. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
      console.error('Error obtaining players', error);
      throw error;
  }
}

  