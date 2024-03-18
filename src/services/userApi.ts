const apiUrlUsers = import.meta.env.VITE_API_URL + '/users';

export async function register(username: string, password: string) {
    try {
      const response = await fetch(`${apiUrlUsers}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      return response;

    } catch (error) {
      console.error('Error during register process:', error);
    }
};

export async function login(username: string, password: string) {
  try {
    const response = await fetch(`${apiUrlUsers}/login`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
    });

    return response;
    
  } catch (error) {
    console.error('Error during login process:', error);
  }
}