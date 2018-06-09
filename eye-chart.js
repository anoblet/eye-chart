import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class EyeChart extends LitElement {
  constructor() {
    super();
    this.scale = 100;
  }

  static get properties() {
    return {
      scale: Number,
      line: Number
    }
  }

  _getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  _getLine(numberOfChars) {
    let line = []
    for (let i = 0; i < numberOfChars; i++) {
      line.push(this._getRandom(characters).toUpperCase());
    }
    return line;
  }

  _getChart(firstLine = 1, lastLine = 10) {
    let chart = [];
    for (let i = firstLine; i <= lastLine; i++) {
      chart.push(this._getLine(i))
    }
    return chart;
  }

  _styles() {
    return html`
      <style>
        :host {
          display: block
        }
        li {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
          list-style-type: none;
          text-align: center;
        }
      
        li>span {}
      </style>
    `
  }

  _renderLine(line) {
    return html`
      ${repeat(line, (letter) => html`
        <span>${letter}</span>
      `)}
    `
  }

  _renderChart(chart) {
    return html`
      <ul>
        ${repeat(chart, (line) => html`
          <li style$="font-size: ${this.scale / line.length}vmin">
            ${this._renderLine(line)}
          </li>
        `)}
      </ul>
    `
  }

  _render({ scale }) {
    let chart = this._getChart(this.line, this.line, scale);
    return html`
      ${this._styles()}
      ${this._renderChart(chart)}
    `
  }
}

window.customElements.define('eye-chart', EyeChart);