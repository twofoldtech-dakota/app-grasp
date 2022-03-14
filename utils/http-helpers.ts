import axios from 'axios'

export async function postData<T>(url: string, body: unknown, token?: string): Promise<{
  data: T | null,
  error: unknown | null,
}> {
  try {
    const response = await axios.post(url, body, {
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    })

    return {
      data: response?.data ?? null,
      error: null,
    }
  }
  catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
