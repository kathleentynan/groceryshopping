    var canvas;
    var ctx;
    var elemX, elemY;
    var dx = 15;
    var dy = 15;
    var x = 930;
    var y = 500;
    var r = 85;
    var WIDTH = 1100;
    var HEIGHT = 600;
    var selectedColor = "red";
    var normalColor = "#daa671";
    var cartDirection = "left";
    
    var isleWidth = 80;
    var isleHeight = 300;
    var checkoutWidth = 175;
    var checkoutHeight = 55;

    var AISLEENUM = {
        DAIRY: 0,
        CANNEDBOXED: 1,
        MEAT: 2,
        BREAD: 3,
        PRODUCE: 4
    };
  
    var dairy = {
        selected: false,
        x: 0,
        y: 0,
        color: normalColor,
        value: AISLEENUM.DAIRY,
        label: "Dairy",
    };
    var cannedBoxed = {
        selected: false,
        x: 250,
        y: 300,
        color: normalColor,
        value: AISLEENUM.CANNEDBOXED,
        label: "Canned & Boxed Food",
        
    };
    var meat = {
        selected: false,
        x: 500,
        y: 0,
        color: normalColor,
        value: AISLEENUM.MEAT,
        label: "Meat",
        
    };
    var bread = {
        selected: false,
        x: 750,
        y: 300,
        color: normalColor,
        value: AISLEENUM.BREAD,
        label: "Bread",
        
    };
    var produce = {
        selected: false,
        x: 1000,
        y: 0,
        color: normalColor,
        value: AISLEENUM.PRODUCE,
        label: "Produce",
        
    };
    var checkout = {
        selected: false,
        x: 0,
        y: 545,
        color: normalColor,
        
    };

    var aisles = [];
    aisles.push(dairy, cannedBoxed, meat, bread, produce);

    var img = new Image();
    img.src = "images/cart/cartLeft.png";

    //create cart
    var cart = (function(){
      return {
         circle : function(x,y,r, direction) {
             if (direction == "left"){
                 img.src = "images/cart/cartLeft.png";
             } else if (direction == "right") {
                img.src = "images/cart/cartRight.png";
             } else if (direction == "up") {
                 img.src = "images/cart/cartUp.png";
             } else if (direction == "down"){
                 img.src = "images/cart/cartDown.png";
             }
             ctx.drawImage(img, x, y, r, r);
        }
    }

    }());

    //isle rectangle
    var isles = (function(){
      return {
          rect : function(x,y,w,h,color) {
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.rect(x,y,w,h);
              ctx.closePath();
              ctx.fill();
            }     
    }

    }());

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function main() {
        canvas = document.getElementById("canvas");
        elemX = canvas.offsetLeft,
        elemY = canvas.offsetTop,
        ctx = canvas.getContext("2d");
        return setInterval(draw, 10);
    }

    

    function doKeyDown(evt){
        switch (evt.keyCode) {
            case 38:  /* Up arrow was pressed */
            if (y - dy > 0){
                if (y - dy <= produce.y + isleHeight && y - dy >= produce.y && x + r > produce.x && x < produce.x + isleWidth) {
                    //produce
                    produce.selected = true;
                    produce.color = selectedColor;
                } else if (y - dy <= bread.y + isleHeight && y - dy >= bread.y && x + r > bread.x && x < bread.x + isleWidth) {
                    //bread
                    bread.selected = true;
                    bread.color = selectedColor;
                } else if (y - dy <= meat.y + isleHeight && y - dy >= meat.y && x + r > meat.x && x < meat.x + isleWidth) {
                    //meat
                    meat.selected = true;
                    meat.color = selectedColor;
                } else if (y - dy <= cannedBoxed.y + isleHeight && y - dy >= cannedBoxed.y && x + r > cannedBoxed.x && x < cannedBoxed.x + isleWidth) {
                    //cannedBoxed
                    cannedBoxed.selected = true;
                    cannedBoxed.color = selectedColor;
                } else if (y - dy <= dairy.y + isleHeight && y - dy >= dairy.y && x + r > dairy.x && x < dairy.x + isleWidth) {
                    //dairy
                    dairy.selected = true;
                    dairy.color = selectedColor;
                } else {
                    y -= dy;
                    
                    aisles.forEach(function(element){
                        element.selected = false;
                        element.color = normalColor;
                    });
                    
                    cartDirection = "up";
                }
            }
            break;

            case 40:  /* Down arrow was pressed */
            if (y + dy < HEIGHT){
                if (y + r + dy >= produce.y && y + r + dy <= produce.y + isleHeight && x + r > produce.x && x < produce.x + isleWidth) {
                    //produce
                    produce.selected = true;
                    produce.color = selectedColor;
                } else if (y + r + dy >= bread.y && y + r + dy <= bread.y + isleHeight && x + r > bread.x && x < bread.x + isleWidth) {
                    //bread
                    bread.selected = true;
                    bread.color = selectedColor;
                } else if (y + r + dy >= meat.y && y + r + dy <= meat.y + isleHeight && x + r > meat.x && x < meat.x + isleWidth) {
                    //meat
                    meat.selected = true;
                    meat.color = selectedColor;
                } else if (y + r + dy >= cannedBoxed.y && y + r + dy <= cannedBoxed.y + isleHeight && x + r > cannedBoxed.x && x < cannedBoxed.x + isleWidth) {
                    //cannedBoxed
                    cannedBoxed.selected = true;
                    cannedBoxed.color = selectedColor;
                } else if (y + r + dy >= dairy.y && y + r + dy <= dairy.y + isleHeight && x + r > dairy.x && x < dairy.x + isleWidth) { 
                    //dairy
                    dairy.selected = true;
                    dairy.color = selectedColor;
                } else {
                    y += dy;
                    
                    aisles.forEach(function(element){
                        element.selected = false;
                        element.color = normalColor;
                    });
                    
                    cartDirection = "down";
                }
            }
            break;

            case 37:  /* Left arrow was pressed */
            if (x - dx > 0){
                if (x <= produce.x + isleWidth && x >= produce.x && y + r > produce.y && y < produce.y + isleHeight){
                    //produce
                    produce.selected = true;
                    produce.color = selectedColor;
                } else if (x-dx <= bread.x + isleWidth && x-dx >= bread.x && y + r > bread.y && y < bread.y + isleHeight) {
                    //bread
                    bread.selected = true;
                    bread.color = selectedColor;
                } else if (x-dx <= meat.x + isleWidth && x-dx >= meat.x && y + r > meat.y && y < meat.y + isleHeight) {
                    //meat
                    meat.selected = true;
                    meat.color = selectedColor;
                } else if (x-dx <= cannedBoxed.x + isleWidth && x-dx >= cannedBoxed.x && y + r > cannedBoxed.y && y < cannedBoxed.y + isleHeight) {
                    //cannedBoxed
                    cannedBoxed.selected = true;
                    cannedBoxed.color = selectedColor;
                } else if (x-dx <= dairy.x + isleWidth && x-dx >= dairy.x && y + r > dairy.y && y < dairy.y + isleHeight) {
                    //dairy
                    dairy.selected = true;
                    dairy.color = selectedColor;
                } else {
                    x -= dx;
                    
                    aisles.forEach(function(element){
                        element.selected = false;
                        element.color = normalColor;
                    });
                    
                    cartDirection = "left";
                }
            }         
            break;

            case 39:  /* Right arrow was pressed */
            if (x + r + dx < WIDTH){
                if (x + r + dx >= produce.x && x + r + dx <= produce.x + isleWidth && y + r > produce.y && y < produce.y + isleHeight) {
                    //produce
                    produce.selected = true;
                    produce.color = selectedColor;
                } else if (x + r + dx >= bread.x && x + r + dx <= bread.x + isleWidth && y + r > bread.y && y < bread.y + isleHeight) {
                    //bread
                    bread.selected = true;
                    bread.color = selectedColor;
                } else if (x + r + dx >= meat.x && x + r + dx <= meat.x + isleWidth && y + r > meat.y && y < meat.y + isleHeight) {
                    //meat
                    meat.selected = true;
                    meat.color = selectedColor;
                } else if (x + r + dx >= cannedBoxed.x && x + r + dx <= cannedBoxed.x + isleWidth && y + r > cannedBoxed.y && y < cannedBoxed.y + isleHeight) {
                    //cannedBoxed
                    cannedBoxed.selected = true;
                    cannedBoxed.color = selectedColor;
                } else if (x + r + dx >= dairy.x && x + r + dx <= dairy.x + isleWidth && y + r > dairy.y && y < dairy.y + isleHeight) {
                    //dairy
                    dairy.selected = true;
                    dairy.color = selectedColor;
                } else {
                    x+=dx;
                    
                    
                    aisles.forEach(function(element){
                        element.selected = false;
                        element.color = normalColor;
                    });
                    
                    cartDirection = "right";
                }
            }
            break;
        }     
    }

    function draw () {
        clear();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";

        cart.circle(x, y, r, cartDirection);
        
        aisles.forEach(function(element){
            isles.rect(element.x, element.y, isleWidth, isleHeight, element.color);
        });
        isles.rect(checkout.x, checkout.y, checkoutWidth, checkoutHeight, checkout.color);
    }


    

    main();
    canvas.addEventListener('click', function (event) {
        var x = event.pageX - elemX,
            y = event.pageY - elemY;
        console.log(x, y);
        aisles.forEach(function(element){
            if (element.selected && (y > element.y && y < element.y + isleHeight && x > element.x && x <  element.x + isleWidth)) {
                window.location.href = 'dragdrop.html';
            }
        });
    });
    window.addEventListener('keydown',doKeyDown,true);