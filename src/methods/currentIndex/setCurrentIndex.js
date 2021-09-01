import { storage } from '../storage'

export const setCurrentIndex = (index) => {
  return storage.setItem('currentIndex', index)
}