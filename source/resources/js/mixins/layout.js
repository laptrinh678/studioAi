import { nextTick } from "vue";

const styleSidebar = () => {
    nextTick(() => {
        const navbar = document.querySelector('#navbar');
        const sidebar = document.querySelector('#sidebar');
        const mainContent = document.querySelector('.main-content');
        // const navbarHeight = navbar.offsetHeight;
        // sidebar.style.top = `${navbarHeight}px`;
        // mainContent.style.paddingTop = `${navbarHeight}px`;
    });
}
const styleMain = () =>{
    nextTick(
        () =>{
            const navbar = document.querySelector('#navbar');
            const mainContent = document.querySelector('.main-content');
            // const navbarHeight = navbar.offsetHeight;
            // mainContent.style.paddingTop = `${navbarHeight}px`;
        }
    )
}


export {
    styleSidebar,
    styleMain
}
