import { storage } from '../storage'

export const getCurrentIndex = () => {
  return Number(storage.getItem('currentIndex'))
}