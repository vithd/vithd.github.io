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
            this.sloganFlipContainer = document.querySelector('.flip-container')
            this.sloganFlipTexts = document.querySelector('.flip-container > span')
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

        init() {
            this.introVideo.oncanplay = () => {
                this.introVideo.classList.add("fade-in")
                // console.log('video ready sir')
            }

            this.show()
        }

        show() {
            // Wait for video intro
            this.show()
        }

        show() {
            this.header.classList.add("active")
            setTimeout(() => {
                this.header.classList.add("active")
            }, 1000)

            new Perspective('#whoweare .slogan', -0.05, 0.1)
            new Perspective('#whoweare .column:nth-child(1) .context', 0.8)
            new Perspective('#whoweare .column:nth-child(2) .context', 0.5)

            new Perspective('#whoweare .column:nth-child(3) .context', 0.5)
            new Perspective('#whoweare .column:nth-child(4) .context', 0.8)

            new Perspective('#whoweare .column:nth-child(5) .context', 0.4)
            new Perspective('#whoweare .column:nth-child(6) .context', 0.6)
            new Perspective('#whoweare .column:nth-child(7) .context', 0.5)

            new Perspective('#whoweare .column:nth-child(8) .context', 0.8)
            new Perspective('#whoweare .column:nth-child(9) .context', 0.5)

            new Perspective('#whoweare .slogan-2', -1, 0.1)

            this.sloganFlipper()

        }

        sloganFlipper() {
            setInterval(() => {
                // Last becomes first
                let texts = document.querySelectorAll('.flip-container > span')
                texts[0].classList.remove('flip')
                texts[0].before(texts[ texts.length - 1 ])
                setTimeout(() => {
                    texts[ texts.length - 1 ].classList.add('flip')
                }, 50)
            }, 3000)
        }
    }

    new GearInc();
})(); 