
const apiUrlStats = import.meta.env.VITE_API_URL + '/statistics';

export async function getStatistics(): Promise<string> {
  try {
    const response = await fetch(`${apiUrlStats}`);

    if (!response.ok) {
        throw new Error(`Failed to get statistics. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
      throw new Error('Error obtaining statistics');
  }
}