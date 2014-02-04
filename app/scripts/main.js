//Templates:
var createNewTaskTemplate = _.template($('.new-task-template').text());

var taskListTemplate = _.template($('.task-list-template').text());

function CreateTask(taskInfo) {
  taskInfo = taskInfo || {};
  this.newTask = taskInfo.newTask || 'What? No task!';
  this.newDueDate = taskInfo.newDueDate;
  this.newNotes = taskInfo.newNotes || 'Where are your task details?!';
  this.uniqueId = _.uniqueId('task_');
};

var taskArray = [];

$(document).ready(function(){
  
  $('.make-new-btn').click(function(){
    $('.full-screen-shadow').addClass('active');
    $('body').append(createNewTaskTemplate());
    $('#new-task').focus();

    //Get today's date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    $('#new-due-date').val(today);

    $('.create-btn').click(function(){
      $('.full-screen-shadow').removeClass('active');

      var input = {
        newTask: $('#new-task').val(),
        newNotes: $('#new-task-notes').val(),
        newDueDate: $('#new-due-date').val()
      };

      taskArray.push(new CreateTask(input));

      var sortedArray = taskArray.sort(function (a,b){
        if (a.newDueDate > b.newDueDate)
          return 1;
        if (a.newDueDate < b.newDueDate)
          return -1;
        else  
          return 0;
      });

      $('.new-task-box').remove();

      $('.task-list').html('');

      _.each(sortedArray, function(task, index){
        $('.task-list').append(taskListTemplate(task));
      });
    });

    $('.cancel-btn').click(function(){
      $('.full-screen-shadow').removeClass('active');
      $('.new-task-box').remove();  
    });
  });

  //Task functions
  $('.task-list').on('click', '.expand-btn', function(){
    $(this).closest('.task-btns').toggleClass('expand');
    $(this).closest('.task-list-container').toggleClass('expand');
    $(this).closest('.task-list-container').find('.task-details').toggleClass('expand');
  });

  $('.task-list').on('click', '.complete-btn', function(){
    $(this).closest('.task-list-container').toggleClass('complete');
    $(this).closest('.task-list-container').find('.done').toggleClass('show-done');
  });

  $('.task-list').on('click', '.delete-btn', function(){
    if (window.confirm("Are you sure you want to delete this task?")) {
      $(this).closest('.task-list-container').remove();
      var deletedTask = _.findWhere(taskArray, {uniqueId: $(this).closest('.task-list-container').attr('data-uniqueid')});
      _.each(taskArray, function(task, index){
        if(task.uniqueId == deletedTask.uniqueId){
          taskArray.splice(index, 1);
        }
      });   
    }
  });



});
