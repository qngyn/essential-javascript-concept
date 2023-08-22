import { getDiceRollArray } from './utils';
export default function Character(data) {
    Object.assign(this, data)
 
    this.getCharacterHtml = function () {
        const { name, avatar, health, diceCount } = this;
        const diceHtml = this.getDiceHtml(diceCount)
        const htmlInfo =
            `<div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            <div class="dice-container">    
                ${diceHtml}
            </div>
        </div>`;
 
        return htmlInfo;
 
    }
 
    this.getDiceHtml = function(diceCount) {
       return getDiceRollArray(diceCount).map(function(num){ 
          return  `<div class="dice">${num}</div>`
      }).join('')
    }
 
 }