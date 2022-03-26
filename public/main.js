let closebtn = document.getElementById('close-btn');
let mobile_menu_btn = document.getElementById('mobile-menu');
let mobile_menu= document.getElementById('menu-mobile-btn');

mobile_menu.addEventListener('click', () =>{
    // mobile_menu.classList.toggle('hidden');
        // mobile_menu.style.display = 'block';
        // mobile_menu_btn.style.display = 'hidden';
        // console.log('hello');
        mobile_menu.display= "block";

});

closebtn.addEventListener('click',function(){
            mobile_menu.classList.toggle('hidden');
            // closebtn.style.display = 'none';
});

