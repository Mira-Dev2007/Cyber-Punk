// import axios from "axios";
// console.log("hello")
// const imageBarEls = document.getElementById("image-bar");

// export default  getMainImageBar = async ()=>{
//     try{
//         const res1 = await axios.get(`http://localhost:3000/Main-Img`)
//         const data = res1.data
//         renderMainImageBar(data)
//     }
//     catch(e){
//         console.log(e)
//         renderError(e)
//     }
// }
// const renderMainImageBar = data=>{
//     let html = ""
//     data.forEach(elem => {
//         html += `
//             <div data-name="macbook" class="image-bar-child">
//                 <img class="image lazy-load" src="" data-src="${elem.image}" title="${elem.title}" alt="this is macbook">
//                 <div class="triangle"></div>
//             </div>
//         `
//     });
//     imageBarEls.insertAdjacentHTML("afterend" , html)
// }

// export{imageBarEls , getMainImageBar , renderMainImageBar}
const RenderDiv = document.querySelector(".image-bar");
const fetchData = async()=> {
    try {
        const res = await fetch("http://localhost:3000/Main-Img");
        const data = await res.json();
        let html = '';
        data.forEach(item => {
            html = `
            <div data-name="CyberPunk2077" class="image-bar-child">
            <div class="lazy"></div>
            <img class="lazy-load image" src=${item.image} data-src=${item.image}  alt="CyberPunk2077" title=${item.title}>
            
            <div class="triangle"></div>
            </div>
            `
            RenderDiv.insertAdjacentHTML("beforeend" , html)
        })
    } catch (error) {
        console.warn(error);
    }
}
fetchData()