import { getCurrentIndex } from "./getCurrentIndex"
import { setCurrentIndex } from "./setCurrentIndex"

export const incrementCurrentIndex = () => {
  const newIndex = getCurrentIndex() + 1
  setCurrentIndex(newIndex)
}