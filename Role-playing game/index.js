import {characterData} from './characterData'
import Character from './character'


function render(data) {
   for (let character of data) {
      const characterElement = new Character(character)
      document.getElementById(characterElement.elementId).innerHTML = characterElement.getCharacterHtml()
   }
}

render(characterData)

