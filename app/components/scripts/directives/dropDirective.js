angular.module('colorApp').directive("drop", ['$rootScope', function ($rootScope) {

        function dragEnter(evt, element, dropStyle) {
            evt.preventDefault();
            element.addClass(dropStyle);
        }
        ;

        function dragLeave(evt, element, dropStyle) {
            element.removeClass(dropStyle);
        }
        ;

        function dragOver(evt) {
            evt.preventDefault();
        }
        ;

        function drop(evt, element, dropStyle) {
            evt.preventDefault();
            element.removeClass(dropStyle);
        }
        ;

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.dropStyle = attrs["dropstyle"];
                element.bind('dragenter', function (evt) {
                    dragEnter(evt, element, scope.dropStyle);
                });
                element.bind('dragleave', function (evt) {
                    dragLeave(evt, element, scope.dropStyle);
                });
                element.bind('dragover', dragOver);
                element.bind('drop', function (evt) {
                    drop(evt, element, scope.dropStyle);
                    var dropData = scope[attrs["drop"]];
                    $rootScope.$broadcast('dropEvent', $rootScope.draggedElement, dropData);
                });
            }
        };
    }]);