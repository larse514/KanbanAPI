/**
 * Created by andrew.larsen on 4/3/2016.
 */
(function()
{
    var angularApp = angular.module("KANBAN", []);
    //Controller class for login functionality
    var CardsController = function ($scope, $http) {
        //why do we need this hideMe variable?
        var hideMe;
        //also why do we need this?  Original implementation had
        //this spelled wrong anway....
        var lastEntered;
        var board = document.getElementById('board');
        $scope.onselectstart = function() {
            event.preventDefault();
        }
        $scope.ondragstart = function() {
            hideMe = event.target;
            event.dataTransfer.setData('card', event.target.id);
            event.dataTransfer.effectAllowed = 'move';
        };
        $scope.ondragend = function(e) {
            e.target.style.visibility = 'visible';
        };
        $scope.ondragenter = function(e) {
            if (hideMe) {
                hideMe.style.visibility = 'hidden';
                hideMe = null;
            }
            // Save this to check in dragleave.
            lastEntered = e.target;
            var section = closestWithClass(e.target, 'section');
            // TODO: Check that it's not the original section.
            if (section) {
                section.classList.add('droppable');
                e.preventDefault(); // Not sure if these needs to be here. Maybe for IE?
                return false;
            }
        };
        $scope.ondragover = function(e) {
            // TODO: Check data type.
            // TODO: Check that it's not the original section.
            if (closestWithClass(e.target, 'section')) {
                e.preventDefault();
            }
        };
        $scope.ondragleave = function(e) {
            // FF is raising this event on text nodes so only check elements.
            if (e.target.nodeType === 1) {
                // dragleave for outer elements can trigger after dragenter for inner elements
                // so make sure we're really leaving by checking what we just entered.
                // relatedTarget is missing in WebKit: https://bugs.webkit.org/show_bug.cgi?id=66547
                var section = closestWithClass(e.target, 'section');
                if (section && !section.contains(lastEntered)) {
                    section.classList.remove('droppable');
                }
            }
            lastEntered = null; // No need to keep this around.
        };
        $scope.ondrop = function(e) {
            var section = closestWithClass(e.target, 'section');
            var id = e.dataTransfer.getData('card');
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
            //probably want to make POST call to update baord in db
            section.classList.remove('droppable');
            e.preventDefault();
        };
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

    };

    angularApp.controller("CardsController", ["$scope","$http",CardsController])
}());





















