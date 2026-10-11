import { createContext, useEffect, useRef, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext


export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState('')
  const timeoutId = useRef(null)

  const showNotification = (message, duration) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    setMessage(message)

    timeoutId.current = setTimeout(() => {
      setMessage('')
      timeoutId.current = null
    }, duration * 1000)
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}