/**
 * Perspective.js
 * 
 * Version 0.0.1
 * Copyright (c) 2020 https://github.com/ducviet321/Perspective.js
 * Licensed under MIT
 */

class Perspective {
  constructor(_containerSelector, _params = 0.5, returnAt = 0.6) {
    // Init DOM elements
    this.$containers = document.querySelectorAll(_containerSelector)
    this._params = {..._params}

    // Init params
    if (typeof (_params) === "number") {
      this._params.amount = _params
    }

    if (typeof (returnAt) === "number") {
      this._params.returnAt = returnAt
    }

    this.params = {
      // direction: _params.direction == 'down' ? -1 : 1, // up or down
      returnAt: this._params.returnAt || 0.5, // 0 -> 1 When element returns to its origin. 0 mean top most of window
      amount: this._params.amount || 1, // 0 -> 1 Amount of displacement

      duration: this._params.duration || 1000, // miliseconds
      timingFunction: this._params.timingFunction || 'cubic-bezier(0.23, 1, 0.32, 1)',
    }

    this._init()
  }

  _init() {
    this._handleScroll()
    window.addEventListener('scroll', (event) => { this._handleScroll(event) })

    for (let i = 0; i < this.$containers.length; i++) {
      this.$containers[i].style.transition = `transform ${this.params.duration}ms ${this.params.timingFunction}`
    }
  }

  _handleScroll(_event) {
    for (let i = 0; i < this.$containers.length; i++) {
      let newY = 0
      let bounding = this.$containers[i].getBoundingClientRect()
      let translateY = parseInt(this.$containers[i].dataset.translateY) || 0
      let boundingTop = bounding.top - translateY // Top position before Translate
      let winHeight = (window.innerHeight || document.documentElement.clientHeight)
      let boundingOffset = boundingTop - this.params.returnAt * winHeight
      
      // Only run when the element is in viewport
      if (
        boundingTop >= 0 &&
        boundingTop <= winHeight + bounding.height &&
        boundingOffset >= 0
      ) {
        newY = boundingOffset * this.params.amount
        this.$containers[i].dataset.translateY = newY
      }

      this.$containers[i].style.transform = `translateY(${newY}px)`
    }
  }
}
