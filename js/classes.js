
class Menu extends HTMLElement {
    constructor () {
        super()
        this.build()
    }
    build() {
        $(()=>{
            $(this).load("menu.html"); 
        });
    }
}