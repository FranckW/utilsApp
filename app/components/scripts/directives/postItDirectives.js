'use strict';
angular.module('utilsApp').directive('contenteditable', function ($http, postItServices) {
    return {
        restrict: "A",
        scope: { ngModel: "=" },
        link: function (scope, element, attr) {

            if (attr.id === "titleedit") {
                element.html(scope.ngModel.title);
            }
            else if (attr.id === "contentedit") {
                element.html(scope.ngModel.content);
            }
            element.on('blur', function () {
                var editedText = element.html();
                var replacement = editedText.trim()
                    .replace(/<br(\s*)\/*>/ig, '\n')
                    .replace(/<[p|div]\s/ig, '\n$0')
                    .replace(/(<([^>]+)>)/ig, "");
                if (attr.id === "titleedit") {
                    postItServices.updatePostitTitle(scope.ngModel.id, editedText);
                }
                else if (attr.id === "contentedit") {
                    postItServices.updatePostitContent(scope.ngModel.id, editedText);
                }
                scope.$apply();
                return element;
            });

        }
    };
});