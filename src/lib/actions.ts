export async function register(data: FormData) {
  try {
    const name = data.get('nameInput')
    const email = data.get('emailInput')
    const password = data.get('passwordInput')
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    return res.json()

  } catch (error) {
    throw new Error("Failed to register User")
  }
}


export async function login(data: FormData) {
  // const res = await signIn("credentials", {
  //   email: data.get('email'),
  //   password: data.get('password'),
  //   redirect: false,
  // })
  // return { success: true }
  const response = await fetch('localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.get('emailInput'),
      password: data.get('passwordInput')
    })

  })

  return response

  //return { error: "Error 500" }
}

