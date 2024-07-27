const LazyImageEls = document.querySelectorAll(".lazy-load")
const CallBack = (entries, observer)=>{
    entries.forEach(elem => {
        if(elem.isIntersecting){
            elem.target.src = elem.target.dataset.src
            elem.target.addEventListener("load", function() {
                this.previousElementSibling.remove()
                this.classList.remove("lazy-load")
                delete this.dataset.src
            })
            observer.unobserve(elem.target)
        }
    });
}
const options = {
    root: null, 
    threshold: 0.15,
}
const observer = new IntersectionObserver(CallBack, options)
LazyImageEls.forEach(elem=> {
    observer.observe(elem)
})
export{LazyImageEls , CallBack , options , observer}