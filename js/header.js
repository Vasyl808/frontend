window.addEventListener("load", function(event) {
    const headerOptionsElement = document.querySelector('.header');
    const header__badge = document.querySelector('.header__badge');
    if(localStorage.getItem('token') === null){
        headerOptionsElement.insertAdjacentHTML("beforeend",
    '<div class="header__user">'+
        '<a href="Login.html"><i class="fa-regular fa-user"></i></a>'+
    '</div>');
    } else {
        headerOptionsElement.insertAdjacentHTML("beforeend",
    '<div class="header__user">'+
        '<a href="User.html"><i class="fa-regular fa-user"></i></a>'+
    '</div>');
    }

    //const card = JSON.parse(localStorage.getItem("cardItems"));
    //if (card === null){
    //    header__badge.insertAdjacentHTML("beforeend",
    //    0
    //    );
   // }
    //else{
    //    header__badge.insertAdjacentHTML("beforeend",
    //    Number(card.length)
    //    );
    //}
});