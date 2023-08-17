let input_contents = document.getElementById('input_contents');
let cursor = input_contents.getElementsByClassName('cursor');
let math_container = input_contents.getElementsByClassName('math_container');

cursor[0].setAttribute('id', 'active');

function new_math(content){
    let span = document.createElement('span');
    span.id = 'math';
    span.className = 'math_container';

    let html = MathJax.tex2chtml(content, {});

    span.innerHTML = html.outerHTML;
    active.parentNode.insertBefore(span, active.nextSibling);

    let math = document.getElementById('math');
    let span_cursor = document.createElement('span');
    span_cursor.id = 'active';
    span_cursor.className = 'cursor';
    span_cursor.innerHTML = '';
    span_cursor.style.display = 'inline-flex';

    for (i = 0; i < cursor.length; i++){
        cursor[i].setAttribute('id', '');
    }

    math.parentNode.insertBefore(span_cursor, math.nextSibling);
    math.setAttribute('id', '');
        
    MathJax.typeset();
}

window.onkeypress = function(e){
    if(
        e.key != '`' && e.key != '~' && e.key != '@' && e.key != '#' && e.key != '$' && e.key != '%' && e.key != '^' && e.key != '&' && e.key != '*' && e.key != '(' && e.key != ')' && e.key != '_' && e.key != '{' && e.key != '}' && e.key != '|' && e.key != '[' && e.key != ']' && e.key != '\\' && e.key != "'" && e.key != " "
    ){
        new_math(String.fromCharCode(e.keyCode));
    }

    for (let i = 0; i < cursor.length; i++){
        cursor[i].onmousedown = function(){
            for (let j = 0; j < cursor.length; j++){
                cursor[j].setAttribute('id', '');
            }
            this.setAttribute('id', 'active');
        }
    };
    for (let i = 0; i < math_container.length; i++){
        math_container[i].onmousedown = function(){
            for (let j = 0; j < cursor.length; j++){
                cursor[j].setAttribute('id', '');
            }
            cursor[i+1].setAttribute('id', 'active');
        }
    };
};

window.onkeydown = function(e){
    if (e.key === 'Backspace' || e.key === 'Delete'){
        for (let i = 0; i < cursor.length; i++){
            if (cursor[i].id == 'active'){
                cursor[i - 1].setAttribute('id', 'active');
                cursor[i].parentNode.removeChild(cursor[i].previousSibling);
                cursor[i].remove();
            }
        }
    };

    if (e.key === 'ArrowLeft'){
        for (let i = 0; i < cursor.length; i++){
            if (cursor[i].id == 'active' && i > 0){
                cursor[i].setAttribute('id', '');
                cursor[i - 1].setAttribute('id', 'active');
                break;
            }
        }
    };

    if (e.key === 'ArrowRight'){
        for (let i = 0; i < cursor.length; i++){
            if (cursor[i].id == 'active' && i < cursor.length - 1){
                cursor[i].setAttribute('id', '');
                cursor[i + 1].setAttribute('id', 'active');
                break;
            }
        }
    };
}