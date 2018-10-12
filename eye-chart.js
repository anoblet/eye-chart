import { html, LitElement } from '@polymer/lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import '../../@polymer/paper-slider/paper-slider.js';

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class EyeChart extends LitElement {
  constructor() {
    super();
    this.scale = 100;
    this.chart = [];
    // this._boundListener = this._scaleChanged.bind(this);
  }

  static get properties() {
    return {
      scale: Number,
      line: Number
    }
  }

  // Helpers

  _getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  // Models

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

  // Events

  _scaleChanged(e) {
    this.scale = e.target.value;
  }

  // Template

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

  _renderOptions(scale) {
    return html`
      <paper-slider value="${scale}" on-value-changed="${(e) => this.scale = e.target.value}"></paper-slider>
      Scale: ${scale}
    `
  }

  _renderChart(chart, scale) {
    return html`
      <ul>
        ${repeat(chart, (line) => html`
        <li style$="font-size: ${scale / line.length}vmin">
          ${this._renderLine(line)}
        </li>
        `)}
      </ul>
    `
  }

  _render({ scale, line }) {
    let chart = this._getChart(line, line, scale);
    return html`
       ${this._styles()} 
       ${this._renderOptions(scale)} 
       ${this._renderChart(chart, scale)}
    `
  }
}

window.customElements.define('eye-chart', EyeChart);