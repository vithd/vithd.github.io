/**
 * Perspective.js
 * 
 * Version 0.0.1
 * Copyright (c) 2020 https://github.com/ducviet321/Perspective.js
 * Licensed under MIT
 */

class Perspective {
  constructor(_containerSelector, _params) {
    // Init DOM elements
    this.$containers = document.querySelectorAll(_containerSelector)

    // Init params
    if (typeof (_params) === "number") {
      _params = { amount: _params }
    }

    this.params = {
      amount: _params.amount || 100, // percentage
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
      // this.$containers[i].dataset.offset = 
    }
  }

  _handleScroll(_event) {
    for (let i = 0; i < this.$containers.length; i++) {
      // Only run when Y position is in viewport
      let bounding = this.$containers[i].getBoundingClientRect()
      let winHeight = (window.innerHeight || document.documentElement.clientHeight)
      if (
        bounding.top >= 0 &&
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
        let scrollPercent = ((bounding.top) / winHeight * 80) * this.params.amount / 100
        let newY = -scrollPercent
        this.$containers[i].style.transform = `translateY(${newY}px)`
      } else {
        this.$containers[i].style.transform = `translateY(0px)`
      }
    }
  }

  _isInViewport = function (elem) {
    
    return (
      bounding.top >= 0 &&
      bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };
}
