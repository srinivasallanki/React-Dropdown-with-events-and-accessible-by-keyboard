import { useState } from 'react'

function App() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)
  let timeOutId = null

  const optionsList = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ]

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index)
    setIsOptionsOpen(false)
  }

  const handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault()
        setSelectedThenCloseDropdown(index)
        break
      default:
        break
    }
  }

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOptionsOpen(false)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
        )
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedOption(
          selectedOption == optionsList.length - 1 ? 0 : selectedOption + 1
        )
        break
      default:
        break
    }
  }

  const handlerBlue = () => {
    timeOutId = setTimeout(() => {
      setIsOptionsOpen(false)
    })
  }

  const handlerFocus = () => {
    clearTimeout(timeOutId)
  }
  return (
    <div className='wrapper'>
      <div className='container' onFocus={handlerFocus} onBlur={handlerBlue}>
        <button
          type='button'
          aria-haspopup='listbox'
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? 'expanded' : ''}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}
        >
          {optionsList[selectedOption]}
        </button>
        <ul
          className={`options ${isOptionsOpen ? 'show' : ''}`}
          role='listbox'
          aria-activedescendant={optionsList[selectedOption]}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {optionsList.map((option, index) => (
            <li
              id={option}
              role='option'
              aria-selected={selectedOption == index}
              tabIndex={0}
              onKeyDown={handleKeyDown(index)}
              onClick={() => {
                setSelectedThenCloseDropdown(index)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
