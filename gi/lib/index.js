(() => {
    let header = document.querySelector('header')
    let introVideo = document.querySelector('#introVideo')

    let init = () => {
        introVideo.oncanplay = () => {
            console.log('video ready sir')
        }

        // Wait for video intro
        setTimeout(() => {
            header.className = "show"
        }, 5000)
    }

    init()
})(); 