
// --------------
const scrollToTop = () => {
    try {
        // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, 0)
    }
}

// --------------
const scrollToBottom = () => {
    try {
        // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth',
        })
    } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, document.body.scrollHeight)
    }
}


export {
    scrollToTop,
    scrollToBottom,
}
