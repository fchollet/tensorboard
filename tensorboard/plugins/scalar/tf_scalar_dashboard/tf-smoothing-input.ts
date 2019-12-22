/* Copyright 2016 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
import {PolymerElement, html} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';
import '@polymer/paper-checkbox';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-slider';
import * as _ from 'lodash';

@customElement('tf-smoothing-input')
class TfSmoothingInput extends PolymerElement {
  static readonly template = html`
    <h3 class="title">Smoothing</h3>
    <div class="smoothing-block">
      <paper-slider
        id="slider"
        immediate-value="{{_immediateWeightNumberForPaperSlider}}"
        max="[[max]]"
        min="[[min]]"
        pin=""
        step="[[step]]"
        type="number"
        value="{{weight}}"
      ></paper-slider>
      <paper-input
        id="input"
        label="weight"
        no-label-float=""
        value="{{_inputWeightStringForPaperInput}}"
        type="number"
        step="[[step]]"
        min="[[min]]"
        max="[[max]]"
      ></paper-input>
    </div>
    <style>
      .title {
        color: var(--paper-grey-800);
        margin: 0;
        font-weight: normal;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .smoothing-block {
        display: flex;
      }

      paper-slider {
        --paper-slider-active-color: var(--tb-orange-strong);
        --paper-slider-knob-color: var(--tb-orange-strong);
        --paper-slider-knob-start-border-color: var(--tb-orange-strong);
        --paper-slider-knob-start-color: var(--tb-orange-strong);
        --paper-slider-markers-color: var(--tb-orange-strong);
        --paper-slider-pin-color: var(--tb-orange-strong);
        --paper-slider-pin-start-color: var(--tb-orange-strong);
        flex-grow: 2;
      }

      paper-input {
        --paper-input-container-focus-color: var(--tb-orange-strong);
        --paper-input-container-input: {
          font-size: 14px;
        }
        --paper-input-container-label: {
          font-size: 14px;
        }
        width: 60px;
      }
    </style>
  `;

  @property({type: Number})
  step?: number;

  @property({type: Number})
  max?: number;

  @property({type: Number})
  min?: number;

  @property({
    type: Number,
    notify: true,
  })
  weight: number = 0.6;

  @property({
    type: Number,
    notify: true,
    observer: '_immediateWeightNumberForPaperSliderChanged',
  })
  _immediateWeightNumberForPaperSlider: number | null = null;

  @property({
    type: String,
    notify: true,
    observer: '_inputWeightStringForPaperInputChanged',
  })
  _inputWeightStringForPaperInput: string | null = null;

  _updateWeight = _.debounce((val) => {
    this.weight = val;
  }, 250);

  _immediateWeightNumberForPaperSliderChanged() {
    this._inputWeightStringForPaperInput = this._immediateWeightNumberForPaperSlider!.toString();
    this._updateWeight(this._immediateWeightNumberForPaperSlider);
  }
  _inputWeightStringForPaperInputChanged() {
    if (Number(this._inputWeightStringForPaperInput) < 0) {
      this._inputWeightStringForPaperInput = '0';
    } else if (Number(this._inputWeightStringForPaperInput) > 1) {
      this._inputWeightStringForPaperInput = '1';
    }
    const d = Number(this._inputWeightStringForPaperInput);
    if (!isNaN(d)) {
      this._updateWeight(d);
    }
  }
}