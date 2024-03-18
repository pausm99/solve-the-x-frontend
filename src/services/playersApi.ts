import { Player } from "../types/Player";

const apiUrlPlayers = import.meta.env.VITE_API_URL + '/players';

export async function getPlayers(): Promise<Player[] | []> {
  try {
    const response = await fetch(`${apiUrlPlayers}`);

    if (!response.ok) {
        throw new Error(`Failed to get players. Status: ${response.status}`);
    }

    if (response.status === 204) return [];

    return await response.json();
  } catch (error) {
      console.error('Error obtaining players', error);
      return [];
  }
}

  
export async function deletePlayerById(id: number) {
    try {
      const response = await fetch(`${apiUrlPlayers}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Failed to delete player. Status: ${response.status}`);
    }
      return response.ok;
    } catch (error) {
      console.error('Error deleting player', error);
      return false;
    }
}

export async function createPlayer(player: Player): Promise<Player | null> {
  try {
      const response = await fetch(`${apiUrlPlayers}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(player)
      });

      if (!response.ok) {
          throw new Error('Failed to create player');
      }

      return await response.json();
  } catch (error) {
      console.error('Error creating player', error);
      return null;
  }
}

export async function updatePlayerById(id: number, updatedPlayerData: any) {
  try {
    const response = await fetch(`${apiUrlPlayers}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayerData),
    });
    if (!response.ok) {
      throw new Error('Failed to update player');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error updating player');
  }
}

