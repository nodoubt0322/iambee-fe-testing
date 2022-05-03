export function debounce (callback, delay = 300) {
    let timer = null;

    return function(){
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(context, args), delay)
    }
}