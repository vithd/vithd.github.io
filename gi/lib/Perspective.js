/**
 * Perspective.js
 * 
 * Version 0.0.1
 * Copyright (c) 2020 https://github.com/ducviet321/Perspective.js
 * Licensed under MIT
 */

class Perspective {
  constructor(_containerSelector, _params = 1) {
    // Init DOM elements
    this.$containers = document.querySelectorAll(_containerSelector)

    // Init params
    if (typeof (_params) === "number") {
      _params = { amount: _params }
    }

    this.params = {
      amount: _params.amount || 1, // percentage
      duration: _params.duration || 1000,
      timingFunction: _params.timingFunction || 'cubic-bezier(0.23, 1, 0.32, 1)',
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
      // Only run when Y position is in viewport
      let winHeight = (window.innerHeight || document.documentElement.clientHeight)
      let bounding = this.$containers[i].getBoundingClientRect()
      let boundingTopOffset = this.$containers[i].dataset.boundingTopOffset
      boundingTopOffset = boundingTopOffset ? parseFloat(boundingTopOffset) : 0
      let boundingTop = bounding.top - boundingTopOffset // Get correct Top position before Transform
      let boundingMiddle = boundingTop + bounding.height / 2 // Element's Middle position

        // debugger
      if (
        boundingTop >= 0 &&
        boundingTop <= winHeight + bounding.height &&
        boundingMiddle > winHeight / 2
        ) {
        let scrollPercent = ((boundingTop - winHeight) / winHeight * 100)
        let newY = -scrollPercent
        this.$containers[i].style.transform = `translateY(${newY}px)`
        this.$containers[i].dataset.boundingTopOffset = newY
      } else {
        this.$containers[i].style.transform = `translateY(0)`
      }
    }
  }
}
