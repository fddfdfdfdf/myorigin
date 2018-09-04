app.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/main");
    $stateProvider
        .state("main",{
            url:"/main",
            templateUrl:"/html/main.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/main.js");
                }]
            }
        })
        .state("admin",{
            url:"/admin",
            templateUrl:"/html/admin.html",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("../js/controller/admin.js");
                }]
            }
        })
};