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
                    this.menu.classList.remove('active')
                } else {
                    this.btnMenu.classList.add('is-active')
                    this.menu.classList.add('active')
                }
            })
        }

        init = () => {
            this.introVideo.oncanplay = () => {
                this.introVideo.classList.add("fade-in")
                // console.log('video ready sir')
            }

            // Wait for video intro
            this.show()
        }

        show() {
            this.header.classList.add("active")
            setTimeout(() => {
                this.header.classList.add("active")
            }, 3000)

            // new Perspective('.first-header', 3)
            new Perspective('.column:nth-child(1) .context', 1)
        }
    }

    new GearInc();
})(); 