let closebtn = document.getElementById('close-btn');
let mobile_menu_btn = document.getElementById('menu-moile-btn');
let mobile_menu= document.getElementById('mobile-btn');

mobile_menu_btn.addEventListener('click', function(){
        mobile_menu.style.display = 'block';
        mobile_menu_btn.style.display = 'hidden';
});

closebtn.addEventListener('click',function(){
            mobile_menu.style.display = 'none';
            closebtn.style.display = 'none';
});

