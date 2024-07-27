const SliderEl = document.querySelector(".slider");
const SliderSlideEls = SliderEl.querySelectorAll(".slider-slide");
const SliderPrevBtnEl = SliderEl.querySelector(".slider-prev-button");
const SliderNextBtnEl = SliderEl.querySelector(".slider-next-button");
const SliderPaginationEl = SliderEl.querySelector(".slider-pagination");
let Current = 0;
let AutoPlay;

function TranslateSlideEls(c){
    if (AutoPlay)SetAutoPlay()
    SliderSlideEls.forEach((elem ,i)=> elem.style.transform=`translateX(${(i - c) * 100}%)`)
}

function Handler() {
    if (Current === this.x) Current=this.y;
    Current+=this.z;
    TranslateSlideEls(Current);
    ActivePagination(Current)
}

function ArrowHandler (e) {
    const Key = e.key
    e.key==="ArrowLeft" && Handler.bind({x:0 , y:SliderSlideEls.length , z:-1})()
    e.key==="ArrowRight" && Handler.bind({x:SliderSlideEls.length - 1, y:-1 , z:1})()
}

function CreatPagination(c) {
    for (let i = 0; i < SliderSlideEls.length ; i++) {
    SliderPaginationEl.insertAdjacentHTML("beforeend" , (`<div class="pagination-bullet ${i===c && "active"}" data-id="${i}"></div>`))
    }
}

function ActivePagination(c) {
    document.querySelectorAll(".pagination-bullet").forEach(elem=>elem.classList.remove("active"))
    document.querySelector(`.pagination-bullet[data-id="${c}"]`).classList.add("active")
}

function AutoPlayInit() {
    if (Current===SliderSlideEls.length-1)Current=-1
    Current++
    TranslateSlideEls(Current)
    ActivePagination(Current)
}

function SetAutoPlay() {
   clearInterval(AutoPlay)
    AutoPlay = setInterval(AutoPlayInit,5000)
}

SetAutoPlay()

TranslateSlideEls(Current)

CreatPagination(Current)

SliderPrevBtnEl.addEventListener("click" , Handler.bind({x:0 , y:SliderSlideEls.length , z:-1}))

SliderNextBtnEl.addEventListener("click" , Handler.bind({x:SliderSlideEls.length - 1, y:-1 , z:1}))

window.addEventListener("keydown", ArrowHandler)

const CallBack = (Entries , Observer)=>{
    const Entry = Entries[0]
    if (!Entry.isIntersecting) window.removeEventListener("keydown", ArrowHandler)
    else window.addEventListener("keydown", ArrowHandler)
}

const Options={
    root:null,
    threshold:0
}

const Observer = new IntersectionObserver(CallBack, Options)

Observer.observe(SliderEl)

export{SliderEl,SliderSlideEls, SliderPrevBtnEl, SliderNextBtnEl,  SliderPaginationEl,  Current, AutoPlay, TranslateSlideEls, Handler,ArrowHandler, CreatPagination, ActivePagination, AutoPlayInit, SetAutoPlay, CallBack, Options, Observer}