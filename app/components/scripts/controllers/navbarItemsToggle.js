$(function () {

    $('.toggleTodo').click(function (event) {
        event.preventDefault();
        $("#todoContent").addClass('show');
        $("#todoNavBarLi").addClass('active');
        $("#todoContent").removeClass('hidden');
        $("#clochetteContent").removeClass('show');
        $("#clochetteNavBarLi").removeClass('active');
        $("#clochetteContent").addClass('hidden');

    });

    $('.toggleClochette').click(function (event) {
        event.preventDefault();
        $("#clochetteContent").addClass('show');
        $("#clochetteNavBarLi").addClass('active');
        $("#clochetteContent").removeClass('hidden');
        $("#todoContent").removeClass('show');
        $("#todoNavBarLi").removeClass('active');
        $("#todoContent").addClass('hidden');
    });

});