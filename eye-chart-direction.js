import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
// import 'web-animations-js/web-animations-next-lite.min.js';
import '@polymer/neon-animation/neon-animations.js';

class EyeChartDirection extends LitElement {
  constructor() {
    super();
    this.displaySize = 'true';
    this.length = 10;
    this.type = 'symbol';
    this.isUpper = 'true';
    this.distanceFromScreen = 10;
  }

  static get properties() {
    return {
      displaySize: String,
      length: Number,
      type: String,
      isUpper: String,
      distanceFromScreen: Number
    }
  }

  _getRandomSymbol({type, isUpper}) {
    let symbols = {};
    symbols.character = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    symbols.symbol = [html`&larr;`, html`&uarr;`, html`&rarr;`, html`&darr;`]

    let items = symbols[type];
    var item = items[Math.floor(Math.random()*items.length)];
    
    if(type == 'character' & isUpper == 'true') item = item.toUpperCase();

    return item;
  }

  _renderDisplaySize({index, displaySize}) {
    if(displaySize == 'true') {
      return html`(${(index+1)/10} in.)`
    }
  }

  _renderOptions({length, type, displaySize, isUpper, distanceFromScreen}) {
    return html`
    <ul>
      <li>
      Length: ${length}
      <paper-slider value="${length}" on-value-changed="${(e) => this.length = e.target.value}"></paper-slider>
      </li>
      <li>
      Type: ${type}
      <paper-dropdown-menu label="Type">
        <paper-listbox slot="dropdown-content" selected="1">
          <paper-item>Character</paper-item>
          <paper-item>Symbol</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <select on-change="${(e) => this.type = e.target.value}">
        <option value="character" selected?="${type == 'character'}">Character</option>
        <option value="symbol" selected?="${type == 'symbol'}">Symbol</option>
      </select>
      ${type == 'character' ? html`
      <ul>
      <li>
        Uppercase: ${isUpper}
        <select on-change="${(e) => this.isUpper = e.target.value}">
          <option value="true" selected?="${isUpper == 'true'}">True</option>
          <option value="false" selected?="${isUpper == 'false'}">False</option>
        </select>
        </li></ul>
      ` : ''}
      </li>
      <li>
      Display size: ${displaySize}
      <select on-change="${(e) => this.displaySize = e.target.value}">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      </li>
      <li>
      Distance from screen: ${distanceFromScreen} (ft.)
      <paper-slider value="${distanceFromScreen}" step="0.1" max="20" on-value-changed="${(e) => this.distanceFromScreen = e.target.value}"></paper-slider>
      </li>
      </ul>
    `;
  }

  _render({length, type, isUpper, displaySize, distanceFromScreen}) {
    return html`
      <style>
        ul {
          list-style-type: none;
        }
        li {
          text-align: center;
        }

        #options {
          /* float: left; */
        }

        #options ul {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }

        #options li {
          text-align: initial;
        }
      </style>
      <div id="options">
        ${this._renderOptions({length, type, displaySize, isUpper, distanceFromScreen})}
      </div>
      <ul>
          ${repeat(Array.from(Array(length)), (line, index) => {
            return html`
              <li style="font-size: ${(index+1)/10}in">
              ${this._renderDisplaySize({index, displaySize})}
                ${repeat(Array.from(Array(index+1)), (letter) => {
                  return html`
                    ${this._getRandomSymbol({type, isUpper})}
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