"use client";
import React, { useState } from 'react'

interface Message {
  type: string;
  content: string;
}

const Register = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<Message>({
    type: '',
    content: ''
  })

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        setMessage({
          type: 'error',
          content: data.error || 'Something went wrong'
        })
        return
      }

      setMessage({
        type: 'success',
        content: data.message || 'Registered successfully'
      })
      setEmail("")
      setPassword("")

    } catch (error) {
      console.error("Registration error:", error);
      setMessage({
        type: 'error',
        content: error instanceof Error ? error.message : 'Unable to register'
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div>
        <div className='p-8 bg-zinc-800 rounded-xl w-[500px]'>
          <h2 className='font-bold text-2xl text-center'>Register</h2>

          <form onSubmit={handleRegister} className='flex flex-col gap-4 mt-6'>
            <input
              type="email"
              placeholder='Enter Email'
              className='bg-transparent p-4 border rounded-lg'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Enter Password'
              className='bg-transparent p-4 border rounded-lg'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className='bg-zinc-900 hover:bg-zinc-950 rounded-lg p-4'
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {message.content && (
          <div className={`mt-4 p-3 rounded-lg ${message.type === 'error' ? 'bg-red-700' : 'bg-green-700'}`}>
            {message.content}
          </div>
        )}
      </div>
    </div>
  )
}

export default Register