angular.module('colorApp').directive("drag", ["$rootScope", function ($rootScope) {

        function dragStart(evt, element, dragStyle) {
            evt.dataTransfer = evt.originalEvent.dataTransfer;
            element.addClass(dragStyle);
            evt.dataTransfer.setData("id", evt.target.id);
            evt.dataTransfer.effectAllowed = 'move';
        }
        ;

        function dragEnd(evt, element, dragStyle) {
            element.removeClass(dragStyle);
        }
        ;

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$set('draggable', 'true');
                scope.dragStyle = attrs["dragstyle"];
                element.bind('dragstart', function (evt) {
                    $rootScope.draggedElement = scope[attrs["drag"]];
                    dragStart(evt, element, scope.dragStyle);
                });
                element.bind('dragend', function (evt) {
                    dragEnd(evt, element, scope.dragStyle);
                });
            }
        };
    }]);


