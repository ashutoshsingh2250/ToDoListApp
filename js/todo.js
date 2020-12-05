$(document).ready(function() {
    let todoArray =[];

    let getList = ()=>{
        $("#task-list-ol").html('');
        todoArray.forEach( item => {
            $("#task-list-ol").append("<li><span>" + item + "</span>&nbsp;<button class=\"Done\">Done</button>&nbsp;<button class=\"Delete\">Delete</button></li><br>");
        });
    };

    $("#add-item-btn").click(function(){
        let inputTaskValue=document.getElementById("task-input").value;
        document.getElementById("task-input").value='';

        if(inputTaskValue.length === 0) {
            alert("Enter a valid input task!");
        } else {
            if(todoArray.indexOf(inputTaskValue)==-1) {
                todoArray.push(inputTaskValue);
            } else {
                alert("Task already exists!");
            }
            //localStorage.setItem("todoItem", todoArray);
        }
        getList();

    });


    $('#clear-all-btn').click(()=>{
        $("#task-list-ol").html('');
        todoArray=[];
        //localStorage.clear();
    });

    let spanVal;
    let newSpanVal='';
    $("#task-list-ol").on("dblclick", "li span", function () {
        newSpanVal='';
        $(this).after('<input type="text" placeholder="Edit task...">');
        spanVal=$(this).text();
        //$(this).remove();
        
        $("#task-list-ol").on("keypress", "li input", function(e) {
            //alert(e.keyCode);
            if(e.keyCode==13) {
                //alert(newSpanVal);
                newSpanVal=$(this).after().val();
                $(this).parent().children(':first-child').html(newSpanVal);
                $(this).after().remove();
                let index=todoArray.indexOf(spanVal);
                todoArray[index]=newSpanVal;
            } else {
                //newSpanVal+=String.fromCharCode(e.keyCode).toString();
            }
            e.stopPropagation();
            //$(this).text(spanVal);
        });
        
    });
    

    $("#task-list-ol").on("click", "li button", function () {
        if( $(this).attr('class') === "Done") {
            $(this).prev().css("text-decoration", "line-through");
        } else if( $(this).attr('class') === "Delete") {
            let textVal = $(this).prev().prev().text();
            let index = todoArray.indexOf(textVal);
            todoArray.splice(index, 1);

            getList();
        }
    });
    
});