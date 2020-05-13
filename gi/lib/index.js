(() => {
    class GearInc {
        constructor() {
            this.cache()
            this.bind()
            this.init()
        }

        cache() {
            this.menu = document.querySelector('#menu')
            this.btnMenu = document.querySelector('#btnMenu')
            this.header = document.querySelector('header')
            this.introVideo = document.querySelector('#introVideo')
        }

        bind() {
            this.btnMenu.addEventListener('click', () => {
                if (this.btnMenu.classList.contains('is-active')) {
                    this.btnMenu.classList.remove('is-active')
                } else {
                    this.btnMenu.classList.add('is-active')
                }
            })
        }

        init = () => {
            this.introVideo.oncanplay = () => {
                this.introVideo.className = "fade-in"
                // console.log('video ready sir')
            }

            // Wait for video intro
            setTimeout(() => {
                this.header.className = "show"
            }, 5000)
        }
    }

    new GearInc();
})(); 