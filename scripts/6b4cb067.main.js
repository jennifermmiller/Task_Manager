function CreateTask(a){a=a||{},this.newTask=a.newTask||"What? No task!",this.newDueDate=a.newDueDate,this.newNotes=a.newNotes||"Where are your task details?!",this.uniqueId=_.uniqueId("task_")}var createNewTaskTemplate=_.template($(".new-task-template").text()),taskListTemplate=_.template($(".task-list-template").text()),taskArray=[];$(document).ready(function(){$(".make-new-btn").click(function(){$(".full-screen-shadow").addClass("active"),$("body").append(createNewTaskTemplate()),$("#new-task").focus();var a=new Date,b=a.getDate(),c=a.getMonth()+1,d=a.getFullYear();10>c&&(c="0"+c),10>b&&(b="0"+b);var e=d+"-"+c+"-"+b;$("#new-due-date").val(e),$(".create-btn").click(function(){$(".full-screen-shadow").removeClass("active");var a={newTask:$("#new-task").val(),newNotes:$("#new-task-notes").val(),newDueDate:$("#new-due-date").val()};taskArray.push(new CreateTask(a));var b=taskArray.sort(function(a,b){return a.newDueDate>b.newDueDate?1:a.newDueDate<b.newDueDate?-1:0});$(".new-task-box").remove(),$(".task-list").html(""),_.each(b,function(a){$(".task-list").append(taskListTemplate(a))})}),$(".cancel-btn").click(function(){$(".full-screen-shadow").removeClass("active"),$(".new-task-box").remove()})}),$(".task-list").on("click",".expand-btn",function(){$(this).closest(".task-btns").toggleClass("expand"),$(this).closest(".task-list-container").toggleClass("expand"),$(this).closest(".task-list-container").find(".task-details").toggleClass("expand")}),$(".task-list").on("click",".complete-btn",function(){$(this).closest(".task-list-container").toggleClass("complete"),$(this).closest(".task-list-container").find(".done").toggleClass("show-done")}),$(".task-list").on("click",".delete-btn",function(){if(window.confirm("Are you sure you want to delete this task?")){$(this).closest(".task-list-container").remove();var a=_.findWhere(taskArray,{uniqueId:$(this).closest(".task-list-container").attr("data-uniqueid")});_.each(taskArray,function(b,c){b.uniqueId==a.uniqueId&&taskArray.splice(c,1)})}})});