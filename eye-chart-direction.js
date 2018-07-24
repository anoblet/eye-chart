import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import '@polymer/paper-slider/paper-slider.js';
import '../../@anoblet/component-ruler/component-ruler.js';

class EyeChartDirection extends LitElement {
  constructor() {
    super();
    this.displaySize = true;
    this.type = 'arrow';
    this.isUpper = true;
    this.distanceFromScreen = 10;
    this.showRuler = false;
    this.lineCount = 10;
    this.startingSize = 1;
    this.step = .2;
    this.sizeX = 'left';
    this.unit = 'in';
  }

  static get properties() {
    return {
      displaySize: {
        type: Boolean,
        inputType: 'checkbox',
        inputLabel: 'Display size'
      },
      type: {
        type: String,
        inputType: 'select',
        inputLabel: 'Symbol type',
        inputValues: [
          {
            label: 'Character',
            value: 'character'
          },
          {
            label: 'Arrow',
            value: 'arrow'
          }
        ]
      },
      isUpper: {
        type: Boolean,
        inputType: 'checkbox',
        inputLabel: 'Is uppercase',
        depends: [
          {
            property: 'type',
            value: 'character',
            /* type: 'character' */
          }
        ]
      },
      /*
      distanceFromScreen: {
        type: Number,
        inputType: 'slider',
        inputLabel: "Distance from screen"
      },
      */
      showRuler: {
        type: Boolean,
        inputType: 'checkbox',
        inputLabel: 'Show ruler'
      },
      lineCount: {
        type: Number,
        inputType: 'counter',
        inputLabel: 'Number of lines'
      },
      startingSize: {
        type: Number,
        inputType: 'text',
        inputLabel: 'Starting size'
      },
      step: {
        type: Number,
        inputType: 'text',
        inputLabel: 'Step'
      },
      sizeX: {        
        type: String,
        inputType: 'select',
        inputLabel: 'Position of size',
        inputValues: [
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          }
        ]
      },
      unit: {
        type: String,
        inputType: 'text',
        inputLabel: 'Unit'
      }
    }
  }

  _getRandomSymbol(props) {
    let symbols = {};
    symbols.character = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    symbols.arrow = [html`&larr;`, html`&uarr;`, html`&rarr;`, html`&darr;`]

    let items = symbols[props.type];
    var item = items[Math.floor(Math.random()*items.length)];
    
    if(props.type == 'character' & props.isUpper) item = item.toUpperCase();

    return item;
  }

  _renderOptions(props) {
    const properties = this.constructor.properties;
    const keys = Object.keys(properties);
    const values = Object.values(properties);

    return html`
    <ul>
      ${repeat(keys, (property, index) => {
        if(properties[property].depends) {
          for(let depend in properties[property].depends) {
            if(this[properties[property].depends[depend].property] !== properties[property].depends[depend].value) return;
          }
        }
        return html`
        <li>
          <label>${values[index].inputLabel}</label>
          ${values[index].inputType === 'text' ? html`
            <input value$="${props[property]}" on-change="${(e) => this[property] = e.target.value}" / >
          ` : ''}
          <!-- Deals with booleans -->
          ${values[index].inputType === 'checkbox' ? html`
            <input type="checkbox" checked?="${this[property]}" on-change="${(e) => this[property] = e.target.checked}" / >
          ` : ''}
          ${values[index].inputType === 'counter' ? html`
            <button on-click="${(e) => this[property]--}">-</button>
            ${props[property]}
            <button on-click="${(e) => this[property]++}">+</button>
          ` : ''}
          ${values[index].inputType === 'select' ? html`
          <select on-change="${(e) => this[property] = e.target.value}">
            ${repeat(values[index].inputValues, (option) => {
              return html`
                <option value="${option.value}" selected?="${option.value === props[property]}">${option.label}</option>
              `
            })}
          </select>
          ` : ''}
          ${values[index].inputType === 'slider' ? html`
            <paper-slider on-change="${(e) => this[property] = e.target.checked}"></paper-slider>
          ` : ''}
        </li>
      `})}
    </ul>
    `
  }

  _renderOption(prop) {
    return html`
      
    `;
  }

  _doesDepend() {

  }

  _render(props) {
    return html`
      <style>
        :host {
          position: relative;
          overflow-x: hidden;
          max-width: 100%;
        }
        ul {
          list-style-type: none;
        }
        li {
          text-align: center;
        }

        #options {
          /* float: left; */
          background: #fff;
        }

        #options ul {

        }

        #options li {
          text-align: initial;
        }
      </style>
      <div id="options">
        ${this._renderOptions(props)}
      </div>
      ${props.showRuler ? html`
        <component-ruler direction="vertical" style="float: left"></component-ruler><component-ruler direction="horizontal">
      ` : ''}
      <ul>
          ${repeat(Array.from(Array(props.lineCount)), (line, index) => {
            return html`
              <li style="font-size: ${Number(props.startingSize) + (index * Number(props.step))}in">
                ${props.displaySize ? html`
                  ${props.sizeX === 'left' ? html`
                    (${Number(props.startingSize) + (index * Number(props.step))} in.)
                  ` : ''}
                ` : ''}
                ${repeat(Array.from(Array(index+1)), (letter) => {
                  return html`
                    ${this._getRandomSymbol(props)}
                  `
                })}
                ${props.displaySize ? html`
                  ${props.sizeX === 'right' ? html`
                    (${Number(props.startingSize) + (index * Number(props.step))} in.)
                  ` : ''}
                ` : ''}
              </li>
              `
          })}
      </ul>
    `
  }
}

window.customElements.define('eye-chart-direction', EyeChartDirection);