var app = angular.module('KANBAN');

app.directive('dragAndDrop', function() {
      return {
        restrict: 'A',
        link: function($scope, elem, attr) {
          elem.bind('dragover', function (e) {
            e.stopPropagation();
            e.preventDefault();
            //debugger;
            e.originalEvent.dataTransfer.dropEffect = 'move'
          });
          elem.bind('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $scope.$apply(function() {
              $scope.divClass = 'on-drag-enter';
            });
          });
          elem.bind('dragleave', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $scope.$apply(function() {
              $scope.divClass = '';
            });
          });
        board.ondragstart = function(e) {
            hideMe = e.target;
            e.dataTransfer.setData('card', e.target.id);
            e.dataTransfer.effectAllowed = 'move';
        };
        elem.bind('drop', function(e, ui) {
            var section = closestWithClass(e.target, 'section');
            var id = e.originalEvent.dataTransfer.getData('card')
            if (id) {
                var card = document.getElementById(id);
                // Might be a card from another window.
                if (card) {
                    if (section !== card.parentNode) {
                        section.appendChild(card);
                    }
                } else {
                    alert('couldn\'t find card #' + id);
                }
            }
            e.preventDefault();
          });
        }
      };
    });

function closestWithClass(target, className) {
    while (target) {
        if (target.nodeType === 1 &&
            target.classList.contains(className)) {
            return target;
        }
        target = target.parentNode;
    }
    return null;
}
