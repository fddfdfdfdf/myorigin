/**
 * Created by Administrator on 2016/6/22.
 */
app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$locationProvider', '$sceDelegateProvider', 'cfpLoadingBarProvider', 'ngToastProvider',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide, $locationProvider, $sceDelegateProvider, cfpLoadingBarProvider, ngToastProvider) {

            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                GLOBAL_CONFIG.API_HOST + '/**'
            ]);

            cfpLoadingBarProvider.includeSpinner = false;

            ngToastProvider.configure({
                horizontalPosition: 'center',
                verticalPosition: 'center',
                maxNumber: 1,
                animation: 'fade' // or 'fade'
            });

        }
    ]);
app.config(function ($httpProvider) {

    $httpProvider.defaults.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded; charser=UTF-8'
    }

});
app.constant('Modules_Config', [
    {
        name: 'treeControl',
        serie: true,
        files: []
    }
]);
app.config(["$ocLazyLoadProvider","Modules_Config",routeFn]);
function routeFn($ocLazyLoadProvider,Modules_Config){
    $ocLazyLoadProvider.config({
        debug:false,
        events:false,
        modules:Modules_Config
    });
};
angular.inherits = function (ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false
        }
    });
};



