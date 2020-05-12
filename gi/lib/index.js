(() => {
    let header = document.querySelector('header')

    let init = () => {
        setTimeout(() => {
            header.className = "show"
        }, 1000)
    }

    init()
})(); 