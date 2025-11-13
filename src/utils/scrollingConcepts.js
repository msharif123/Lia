
export const ScrollingConcepts = {
    scrollIntoView: {
        purpose: "Automatically scrolls container so element is visible",
        options: {
            block: "nearest",
            behavior: "smooth"
        }
    },

    containerCSS: {
        "overflow-y": "auto",
        "max-height": "400px",
        "scroll-behavior": "smooth",
    }
    ,
    keyboardHandling: {
        preventDefault: "Prevents default page scroll when navigating",
        purpose: "Allows custom navigation without page interference"
    }
}