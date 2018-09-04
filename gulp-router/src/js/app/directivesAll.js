    app.directive('uiBack', ['$window', function ($window) {
        return {
            restrict: 'EA', link: function (scope, el, attrs) {
                el.click(function () {
                    window.history.go(-1)
                });
            }
        };
    }]);
    app.directive('uiButterbar', ['$rootScope', '$anchorScroll', function ($rootScope, $anchorScroll) {
    return {
        restrict: 'AC', template: '<span class="bar"></span>', link: function (scope, el, attrs) {
            init();
            scope.$on('$stateChangeStart', function (event) {
                show()
            });
            scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                event.targetScope.$watch('$viewContentLoaded', function () {
                    hide()
                })
            });
            scope.$watch('activeCalls', function (newVal, oldVal) {
                if (newVal == 0) {
                    hide()
                } else {
                    show()
                }
            });
            function init() {
                el.addClass('butterbar active');
            }

            function show() {
                el.removeClass('hide').addClass('active');
            }

            function hide() {
                el.addClass('hide').removeClass('active');
            }
        }
    }}]);
    app.directive('uiFocus', function ($timeout, $parse) {
        return {
            link: function (scope, element, attr) {
                var model = $parse(attr.uiFocus);
                scope.$watch(model, function (value) {
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
                element.bind('blur', function () {
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    });
    app.directive('uiScrollTo', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            restrict: 'AC', link: function (scope, el, attr) {
                el.on('click', function (e) {
                    $location.hash(attr.uiScrollTo);
                    $anchorScroll();
                });
            }
        };
    }]);
    app.directive('uiToggleClass', ['$timeout', '$document', function ($timeout, $document) {
        return {
            restrict: 'AC', link: function (scope, el, attr) {
                el.on('click', function (e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','), targets = (attr.target && attr.target.split(',')) || Array(el), key = 0;
                    angular.forEach(classes, function (_class) {
                        var target = targets[(targets.length && key)];
                        (_class.indexOf('*') !== -1) && magic(_class, target);
                        $(target).toggleClass(_class);
                        key++;
                    });
                    $(el).toggleClass('active');
                    function magic(_class, target) {
                        var patt = new RegExp('\\s' +
                            _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
                        var cn = ' ' + $(target)[0].className + ' ';
                        while (patt.test(cn)) {
                            cn = cn.replace(patt, ' ');
                        }
                        $(target)[0].className = $.trim(cn);
                    }
                });
            }
        };
    }]);
    app.directive('uiValidInput', [function () {
        return {
            restrict: 'A', require: '?ngModel', link: function (scope, element, attrs, ngModel) {
                if (!ngModel)return;
                var options = scope.$eval(attrs.uiValidInput)
                var regex = options.pattern
                if (angular.isString(regex) && regex.length > 0) {
                    regex = new RegExp('^' + regex + '$');
                }
                var cpLock = null;
                element.bind('compositionstart', function () {
                    cpLock = true;
                })
                element.bind('compositionend', function () {
                    cpLock = false;
                })
                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    if (cpLock == null || cpLock == false) {
                        check(newVal);
                    }
                });
                function check(input) {
                    if (!angular.isString(input))return;
                    var valid = true;
                    if (valid && options.max) {
                        valid = input.length <= options.max
                    }
                    if (valid && options.min) {
                        valid = input.length >= options.min
                    }
                    if (valid && regex) {
                        valid = regex.test(input);
                    }
                    ngModel.$setValidity(attrs.name, valid)
                }
            }
        }
    }]);
    app.directive('uiValidLink', ['LinksService', function (LinksService) {
        return {
            restrict: 'A', require: '?ngModel', link: function (scope, element, attrs, ngModel) {
                if (!ngModel)return;
                scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                    check(newVal);
                });
                function check(newVal) {
                    if (!newVal)return;
                    var result = LinksService.parseLink(newVal);
                    scope.$evalAsync(function () {
                        ngModel.$setValidity(attrs.name, result.valid)
                    })
                }
            }
        };
    }])