import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import '@polymer/paper-slider/paper-slider.js';

class EyeChartDirection extends LitElement {
    constructor() {
        super();
        this.displaySize = 'true';
        this.length = 10;
        this.type = 'character';
    }

    static get properties() {
        return {
          displaySize: String,
          length: Number,
          type: String
        }
    }

    _getRandomSymbol() {
      let symbols = {};
      symbols.character = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      symbols.arrow = [
        html`&larr;`,
        html`&uarr;`,
        html`&rarr;`,
        html`&darr;`
      ]

      let items = symbols[this.type];

      var item = items[Math.floor(Math.random()*items.length)];
      
      return item;
    }

    _renderDisplaySize({index, displaySize}) {
      console.log(this.displaySize);
      if(displaySize == 'true') {
        return html`(${(index+1)/10} in.)`
      }
    }

    _renderOptions({length, type, displaySize}) {
      return html`
        Length: ${length}
        <paper-slider value="${length}" on-value-changed="${(e) => this.length = e.target.value}"></paper-slider>
        Type: ${type}
        <select on-change="${(e) => this.type = e.target.value}">
          <option value="character">Character</option>
          <option value="arrow">Arrow</option>
        </select>
        Display size: ${displaySize}
        <select on-change="${(e) => this.displaySize = e.target.value}">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      `;
    }

    _render({length, type, displaySize}) {
        return html`
        <style>
          ul {
            list-style-type: none;
          }
          li {
            text-align: center;
          }
        </style>
        ${this._renderOptions({length, type, displaySize})}
        <ul>
            ${repeat(Array.from(Array(length)), (line, index) => {
              return html`
                <li style="font-size: ${(index+1)/10}in">
                ${this._renderDisplaySize({index, displaySize})}
                  ${repeat(Array.from(Array(index+1)), (letter) => {
                    return html`
                      ${this._getRandomSymbol()}
                    `
                  })}
                </li>
                `
            })}
        </ul>
    `
    }
}

window.customElements.define('eye-chart-direction', EyeChartDirection);