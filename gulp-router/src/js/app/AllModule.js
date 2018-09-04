/**
 * Created by Administrator on 2017/10/31.
 */
var app = angular.module('MyApp', ['ngToast', 'infinite-scroll', 'ngStorage', 'angular-loading-bar', 'angular-cache', 'angularLazyImg', 'ngSanitize', 'ngResource', 'ngMessages', 'ngCookies', 'ngAria', 'ngAnimate', "ui.router", "oc.lazyLoad"]);

//'CONSTANTS'
app.constant('CONSTANTS', {
    'APP_NAME': GLOBAL_CONFIG.APP_NAME,
    'API_HOST': GLOBAL_CONFIG.API_HOST,
    'FOR_WEIXIN': GLOBAL_CONFIG.FOR_WEIXIN,
    'ENCRYPTED': GLOBAL_CONFIG.ENCRYPTED,
    'APP_CONFIG': {}
})
    .run(['$rootScope', 'CONSTANTS', function ($rootScope, CONSTANTS) {
        $rootScope.CONSTANTS = CONSTANTS;
    }]);
//'API'
  app
    .factory('APIAccessService', APIAccessService);
    APIAccessService.$inject = ['$http'];
    function APIAccessService($http) {
        var service = {};
        return service;
    }
  app.factory('APIAreacodeService', APIAreacodeService);
    APIAreacodeService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
    function APIAreacodeService($http, $q, $timeout, CacheFactory, ENUM) {
    var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIAreacodeService');
    service.list = _list;
    return service;
    function _list(params) {
        return this.fetch('/v2/ecapi.areacode.list', params, false, function (res) {
            return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.area_code : null;
        });
    }};
  app.factory('APIArticleService', APIArticleService);
        APIArticleService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIArticleService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIArticleService');
            service.list = _list;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.article.list', params, false, function (res) {
                    return (res.data && (ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data : null;
                });
            }
        }
  app
     .factory('AppAuthenticationService', AppAuthenticationService);

    AppAuthenticationService.$inject = ['$rootScope', '$localStorage', '$cookies'];

    function AppAuthenticationService($rootScope, $localStorage, $cookies) {

        // keep user logged in after page refresh
        try{
            $rootScope.user = $cookies.getObject( 'u' );
            $rootScope.token = $cookies.get( 't' );
            $rootScope.openId = $cookies.get( 'o' );
            $rootScope.references = $cookies.get( 'r' );
        }
        catch(e){

        }

        var service = {};
        service.signin = _signin;
        service.signout = _signout;
        service.kickout = _kickout;
        service.setCredentials = _setCredentials;
        service.clearCredentials = _clearCredentials;
        service.setUser = _setUser;
        service.getUser = _getUser;
        service.getToken = _getToken;
        service.setToken = _setToken;
        service.setReferences = _setReferences;
        service.getReferences = _getReferences;

        service.setOpenId = _setOpenId;
        service.getOpenId = _getOpenId;

        var EXPIRED_DAY = 7;
        var EXPIRED_MINUTE = 1;

        return service;

        function _signin( token, user ) {
            _setCredentials( token, user );
            $timeout(function(){
                $rootScope.goHome();
            }, 1);
        }

        function _signout() {
            _clearCredentials();
            $timeout(function(){
                $rootScope.goHome();
            }, 1);
        }

        function _kickout() {
            _clearCredentials();
            $rootScope.goSignin();
        }

        function _setCredentials( token, user ) {
            $rootScope.user = user;
            $rootScope.token = token;
            try{
                // save to cookie storage
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);

                $cookies.putObject( 'u', user , {'expires': exdate});
                $cookies.put( 't', token ,{'expires': exdate});
            }
            catch(e){

            }
        }

        function _setReferences(references){
            $rootScope.references = references;

            try{
                // save to cookie storage
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                $cookies.put( 'r', references ,{'expires': exdate});
            }
            catch(e){

            }


        }

        function _getReferences(){
            return $rootScope.references ;
        }

        function _clearCredentials() {

            $rootScope.user = null;
            $rootScope.token = null;
            $rootScope.openId = null;

            // delete from cookie storage

            $cookies.remove( 'u' );
            $cookies.remove( 't' );
            $cookies.remove( 'o' );
        }

        function _getUser() {
            return $rootScope.user;
        }
        function _setUser(user) {
            $rootScope.user = user;

            try{
                var options = {};
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                options.expires =  exdate;
                $cookies.putObject( 'u', user ,options);
            }
            catch(e){

            }

        }

        function _setToken( token ) {
            $rootScope.token = token;

            try{
                // save to cookie storage
                var options = {};
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                options.expires =  exdate;
                $cookies.put( 't', token ,options);
            }
            catch(e){

            }
        }

        function _getToken() {
            return $rootScope.token;
        }

        function _setOpenId(openId){

            $rootScope.openId = openId;

            try{
                // save to cookie storage
                var options = {};
                var exdate = new Date();
                exdate.setDate(exdate.getDate()+EXPIRED_DAY);
                exdate.setMinutes(exdate.getMinutes()+EXPIRED_MINUTE);
                options.expires =  exdate;
                $cookies.put( 'o', openId,options);
            }
            catch(e){

            }
        }
        //获取id
        function _getOpenId(){
            return $rootScope.openId;
        }

    }

  app.factory('APIAuthBaseService', APIAuthBaseService);
        APIAuthBaseService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'AppAuthenticationService', 'ENUM'];
        function APIAuthBaseService($http, $q, $timeout, CacheFactory, AppAuthenticationService, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIAuthBaseService');
            service.signin = _signin;
            service.signout = _signout;
            return service;
            function _signin(params) {
                return this.fetch('/v2/ecapi.auth.signin', params, false, function (res) {
                    if (res.data && ENUM.ERROR_CODE.OK == res.data.error_code) {
                        if (res.data.token && res.data.user) {
                            AppAuthenticationService.setCredentials(res.data.token, res.data.user);
                            return true;
                        }
                    }
                    return false;
                });
            }

            function _signout() {
                var deferred = this.$q.defer();
                $timeout(function () {
                    AppAuthenticationService.clearCredentials();
                    deferred.resolve(true);
                }, 1);
                return deferred.promise;
            }
        }
  app.factory('APIAuthDefaultService', APIAuthDefaultService);
        APIAuthDefaultService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'AppAuthenticationService', 'ENUM'];
        function APIAuthDefaultService($http, $q, $timeout, CacheFactory, AppAuthenticationService, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIAuthDefaultService');
            service.signup = _signup;
            service.reset = _reset;
            return service;
            function _signup(params) {
                return this.fetch('/v2/ecapi.auth.default.signup', params, false, function (res) {
                    if (res.data && ENUM.ERROR_CODE.OK == res.data.error_code) {
                        if (res.data.token && res.data.user) {
                            AppAuthenticationService.setCredentials(res.data.token, res.data.user);
                            return res;
                        }
                    }
                    return res;
                });
            }

            function _reset(params) {
                return this.fetch('/v2/ecapi.auth.default.reset', params, false, function (res) {
                    return res;
                });
            }
        }
  app.factory('APIAuthMobileService', APIAuthMobileService);
        APIAuthMobileService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'AppAuthenticationService', 'ENUM'];
        function APIAuthMobileService($http, $q, $timeout, CacheFactory, AppAuthenticationService, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIAuthMobileService');
            service.send = _send;
            service.verify = _verify;
            service.signup = _signup;
            service.reset = _reset;
            return service;
            function _send(params) {
                return this.fetch('/v2/ecapi.auth.mobile.send', params, false, function (res) {
                    return res;
                });
            }

            function _verify(params) {
                return this.fetch('/v2/ecapi.auth.mobile.verify', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _signup(params) {
                return this.fetch('/v2/ecapi.auth.mobile.signup', params, false, function (res) {
                    if (res.data && ENUM.ERROR_CODE.OK == res.data.error_code) {
                        if (res.data.token && res.data.user) {
                            AppAuthenticationService.setCredentials(res.data.token, res.data.user);
                        }
                    }
                    return res;
                });
            }

            function _reset(params) {
                return this.fetch('/v2/ecapi.auth.mobile.reset', params, false, function (res) {
                    return res;
                });
            }
        }
  app.factory('APIAuthSocialService', APIAuthSocialService);
        APIAuthSocialService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'AppAuthenticationService', 'ENUM'];
        function APIAuthSocialService($http, $q, $timeout, CacheFactory, AppAuthenticationService, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIAuthSocialService');
            service.social = _social;
            return service;
            function _social(params) {
                return this.fetch('/v2/ecapi.auth.social', params, false, function (res) {
                    if (res.data && ENUM.ERROR_CODE.OK == res.data.error_code) {
                        if (res.data.token && res.data.user) {
                            AppAuthenticationService.setCredentials(res.data.token, res.data.user);
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
  app.factory('APIAuthWebService', APIAuthWebService);
        APIAuthWebService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'AppAuthenticationService', 'ENUM'];
        function APIAuthWebService($http, $q, $timeout, CacheFactory, AppAuthenticationService, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIAuthWebService');
            service.web = _web;
            return service;
            function _web(params) {
            }
        }
  app.factory('APIBalanceService', APIBalanceService);
        APIBalanceService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIBalanceService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIBalanceService');
            service.get = _get;
            service.list = _list;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.balance.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.amount : null;
                });
            }

            function _list(params) {
                return this.fetch('/v2/ecapi.balance.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.balances : null;
                });
            }
        }
  app.factory('APIBannerService', APIBannerService);
        APIBannerService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIBannerService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIBannerService');
            service.list = _list;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.banner.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.banners : null;
                });
            }
        }
  app.factory('APIBonusService', APIBonusService);
        APIBonusService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIBonusService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIBonusService');
            service.get = _get;
            service.list = _list;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.recommend.bonus.info', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.bonus_info : null;
                });
            }

            function _list(params) {
                return this.fetch('/v2/ecapi.recommend.bonus.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.bonues : null;
                });
            }
        }
  app.factory('APIBrandService', APIBrandService);
        APIBrandService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIBrandService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIBrandService');
            service.list = _list;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.brand.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.brands : null;
                });
            }
        }
  app.factory('APICardpageService', APICardpageService);
        APICardpageService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APICardpageService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIBrandService');
            service.preview = _preview;
            service.get = _get;
            return service;
            function _preview(params) {
                return this.fetch('/v2/ecapi.cardpage.preview', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.cardpage : null;
                });
            }

            function _get(params) {
                return this.fetch('/v2/ecapi.cardpage.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.cardpage : null;
                });
            }
        }
  app.factory('APICartService', APICartService);
        APICartService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APICartService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APICartService');
            service.get = _get;
            service.add = _add;
            service.delete = _delete;
            service.update = _update;
            service.clear = _clear;
            service.promos = _promos;
            service.checkout = _checkout;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.cart.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.goods_groups : null;
                });
            }

            function _add(params) {
                return this.fetch('/v2/ecapi.cart.add', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _delete(params) {
                return this.fetch('/v2/ecapi.cart.delete', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _update(params) {
                return this.fetch('/v2/ecapi.cart.update', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _clear(params) {
                return this.fetch('/v2/ecapi.cart.clear', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _promos(params) {
                return this.fetch('/v2/ecapi.cart.promos', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.cart_product_promos : null;
                });
            }

            function _checkout(params) {
                return this.fetch('/v2/ecapi.cart.checkout', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
                });
            }
        }
  app.factory('APICashgiftService', APICashgiftService);
        APICashgiftService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APICashgiftService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APICashgiftService');
            service.list = _list;
            service.available = _available;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.cashgift.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.cashgifts : null;
                });
            }

            function _available(params) {
                return this.fetch('/v2/ecapi.cashgift.available', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.cashgifts : null;
                });
            }
        }
  app.factory('APICategoryService', APICategoryService);
        APICategoryService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APICategoryService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APICategoryService');
            service.list = _list;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.category.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.categories : null;
                });
            }
        }
  app.factory('APIConfigService', APIConfigService);
        APIConfigService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIConfigService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIConfigService');
            service.get = _get;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.config.get', params, false, function (res) {
                    if (ENUM.ERROR_CODE.OK == res.data.error_code) {
                        if (GLOBAL_CONFIG.ENCRYPTED) {
                            return res.data;
                        }
                        else {
                            var key = "getprogname()";
                            var data = res.data.data;
                            return JSON.parse(XXTEA.decryptFromBase64(data, key));
                        }
                    }
                    return null;
                });
            }
        }
  app.factory('APIConsigneeService', APIConsigneeService);
        APIConsigneeService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIConsigneeService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIConsigneeService');
            service.list = _list;
            service.add = _add;
            service.delete = _delete;
            service.update = _update;
            service.setDefault = _setDefault;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.consignee.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.consignees : null;
                });
            }

            function _add(params) {
                return this.fetch('/v2/ecapi.consignee.add', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.consignee : null;
                });
            }

            function _delete(params) {
                return this.fetch('/v2/ecapi.consignee.delete', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _update(params) {
                return this.fetch('/v2/ecapi.consignee.update', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _setDefault(params) {
                return this.fetch('/v2/ecapi.consignee.setDefault', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }
        }
  app.factory('APICouponService', APICouponService);
        APICouponService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APICouponService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APICouponService');
            service.list = _list;
            service.available = _available;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.coupon.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.coupons : null;
                });
            }

            function _available(params) {
                return this.fetch('/v2/ecapi.coupon.available', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.coupons : null;
                });
            }
        }
  app.factory('APIInvoiceService', APIInvoiceService);
        APIInvoiceService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIInvoiceService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIInvoiceService');
            service.typeList = _typeList;
            service.contentList = _contentList;
            service.statusGet = _statusGet;
            return service;
            function _typeList(params) {
                return this.fetch('/v2/ecapi.invoice.type.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.types : null;
                });
            }

            function _contentList(params) {
                return this.fetch('/v2/ecapi.invoice.content.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.contents : null;
                });
            }

            function _statusGet(param) {
                return this.fetch('/v2/ecapi.invoice.status.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }
        }
  app.factory('APIMessageService', APIMessageService);
        APIMessageService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIMessageService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIMessageService');
            service.systemList = _systemList;
            service.orderList = _orderList;
            service.count = _count;
            return service;
            function _systemList(params) {
                return this.fetch('/v2/ecapi.message.system.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.messages : null;
                });
            }

            function _orderList(params) {
                return this.fetch('/v2/ecapi.message.order.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.messages : null;
                });
            }

            function _count(params) {
                return this.fetch('/v2/ecapi.message.count', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.count : 0;
                });
            }
        }
  app.factory('APINoticeService', APINoticeService);
        APINoticeService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APINoticeService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APINoticeService');
            service.list = _list;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.notice.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.notices : null;
                });
            }
        }
  app.factory('APIOrderService', APIOrderService);
        APIOrderService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIOrderService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIOrderService');
            service.get = _get;
            service.list = _list;
            service.confirm = _confirm;
            service.reasonList = _reasonList;
            service.cancel = _cancel;
            service.review = _review;
            service.subtotal = _subtotal;
            service.price = _price;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.order.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
                });
            }

            function _list(params) {
                return this.fetch('/v2/ecapi.order.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.orders : null;
                });
            }

            function _confirm(params) {
                return this.fetch('/v2/ecapi.order.confirm', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
                });
            }

            function _reasonList(params) {
                return this.fetch('/v2/ecapi.order.reason.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.reasons : null;
                });
            }

            function _cancel(params) {
                return this.fetch('/v2/ecapi.order.cancel', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
                });
            }

            function _review(params) {
                return this.fetch('/v2/ecapi.order.review', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? true : false;
                });
            }

            function _subtotal(params) {
                return this.fetch('/v2/ecapi.order.subtotal', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.subtotal : null;
                });
            }

            function _price(params) {
                return this.fetch('/v2/ecapi.order.price', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order_price : null;
                });
            }
        }
  app.factory('APIPaymentService', APIPaymentService);
        APIPaymentService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIPaymentService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIPaymentService');
            service.pay = _pay;
            service.typeList = _typeList;
            return service;
            function _pay(params) {
                return this.fetch('/v2/ecapi.payment.pay', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res : null;
                });
            }

            function _typeList(params) {
                return this.fetch('/v2/ecapi.payment.types.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.payment_types : null;
                });
            }
        }
  app.factory('APIProductService', APIProductService);
        APIProductService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIProductService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIProductService');
            service.list = _list;
            service.accessoryList = _accessoryList;
            service.get = _get;
            service.like = _like;
            service.unlike = _unlike;
            service.likedList = _likedList;
            service.validate = _validate;
            service.purchase = _purchase;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.product.list', params, false, function (res) {
                    return (res.data && (ENUM.ERROR_CODE.OK == res.data.error_code)) ? res.data.products : null;
                });
            }

            function _accessoryList(params) {
                return this.fetch('/v2/ecapi.product.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.products : null;
                });
            }

            function _get(params) {
                return this.fetch('/v2/ecapi.product.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.product : null;
                });
            }

            function _like(params) {
                return this.fetch('/v2/ecapi.product.like', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.is_liked : true;
                });
            }

            function _unlike(params) {
                return this.fetch('/v2/ecapi.product.unlike', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.is_liked : false;
                });
            }

            function _likedList(params) {
                return this.fetch('/v2/ecapi.product.liked.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.products : null;
                });
            }

            function _validate(params) {
                return this.fetch('/v2/ecapi.product.validate', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.is_valid : false;
                });
            }

            function _purchase(params) {
                return this.fetch('/v2/ecapi.product.purchase', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.order : null;
                });
            }
        }
  app.factory('APIPushService', APIPushService);
        APIPushService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIPushService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIPushService');
            service.update = _update;
            return service;
            function _update(params) {
                return this.fetch('/v2/ecapi.push.update', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res : null;
                });
            }
        }
  app.factory('APIRecommendService', APIRecommendService);
        APIRecommendService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIRecommendService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIRecommendService');
            service.categoryList = _categoryList;
            service.productList = _productList;
            service.brandList = _brandList;
            service.shopList = _shopList;
            service.bonusInfo = _bonusInfo;
            return service;
            function _categoryList(params) {
                return this.fetch('/v2/ecapi.recommend.category.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.categories : null;
                });
            }

            function _productList(params) {
                return this.fetch('/v2/ecapi.recommend.product.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.products : null;
                });
            }

            function _brandList(params) {
                return this.fetch('/v2/ecapi.recommend.brand.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.brands : null;
                });
            }

            function _shopList(params) {
                return this.fetch('/v2/ecapi.recommend.shop.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.shops : null;
                });
            }

            function _bonusInfo(params) {
                return this.fetch('/v2/ecapi.recommend.bonus.info', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.bonus_info : null;
                });
            }
        }
  app.factory('APIRegionService', APIRegionService);
        APIRegionService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIRegionService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIRegionService');
            service.list = _list;
            return service;
            function _list(params) {
                return this.fetch('/v2/ecapi.region.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.regions : null;
                });
            }
        }
  app.factory('APIReviewService', APIReviewService);
        APIReviewService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIReviewService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIReviewService');
            service.productSubtotal = _productSubtotal;
            service.productList = _productList;
            return service;
            function _productSubtotal(params) {
                return this.fetch('/v2/ecapi.review.product.subtotal', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.subtotal : null;
                });
            }

            function _productList(params) {
                return this.fetch('/v2/ecapi.review.product.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.reviews : null;
                });
            }
        }
  app.factory('APIScoreService', APIScoreService);
        APIScoreService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIScoreService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIScoreService');
            service.get = _get;
            service.historyList = _historyList;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.score.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : null;
                });
            }

            function _historyList(params) {
                return this.fetch('/v2/ecapi.score.history.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.history : null;
                });
            }
        }
  app.factory('APISearchService', APISearchService);
        APISearchService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APISearchService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APISearchService');
            service.keywordList = _keywordList;
            service.shopList = _shopList;
            service.productList = _productList;
            service.categoryList = _categoryList;
            return service;
            function _keywordList(params) {
                return this.fetch('/v2/ecapi.search.keyword.list', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.keywords : null;
                });
            }

            function _shopList(params) {
                return this.fetch('/v2/ecapi.search.shop.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.shops : null;
                });
            }

            function _productList(params) {
                return this.fetch('/v2/ecapi.search.product.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.products : null;
                });
            }

            function _categoryList(params) {
                return this.fetch('/v2/ecapi.search.category.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res : null;
                });
            }
        }
  app.factory('APIShippingService', APIShippingService);
        APIShippingService.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'ENUM'];
        function APIShippingService($http, $q, $timeout, $rootScope, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIShippingService');
            service.vendorList = _vendorList;
            service.statusGet = _statusGet;
            return service;
            function _vendorList(params) {
                return this.fetch('/v2/ecapi.shipping.vendor.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.vendors : null;
                });
            }

            function _statusGet(params) {
                return this.fetch('/v2/ecapi.shipping.status.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data : null;
                });
            }
        }
  app.factory('APIShopService', APIShopService);
        APIShopService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIShopService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIShopService');
            return service;
        }
  app.factory('APISiteService', APISiteService);
        APISiteService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APISiteService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APISiteService');
            service.get = _get;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.site.get', params, false, function (res) {
                    return res.data && res.data.site_info ? res.data.site_info : null;
                });
            }
        }
  app.factory('APISplashService', APISplashService);
        APISplashService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APISplashService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APISplashService');
            service.preview = _preview;
            service.list = _list;
            return service;
            function _preview(params) {
                return this.fetch('/v2/ecapi.splash.preview', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.splash : null;
                });
            }

            function _list(params) {
                return this.fetch('/v2/ecapi.splash.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.splashes : null;
                });
            }
        }
  app.factory('APIThemeService', APIThemeService);
        APIThemeService.$inject = ['$http'];
        function APIThemeService($http) {
            var service = {};
            return service;
        }
  app.factory('APIUserService', APIUserService);
        APIUserService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIUserService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIUserService');
            service.profileGet = _profileGet;
            service.profileFields = _profileFields;
            service.profileUpdate = _profileUpdate;
            service.passwordUpdate = _passwordUpdate;
            return service;
            function _profileGet(params) {
                return this.fetch('/v2/ecapi.user.profile.get', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.user : null;
                });
            }

            function _profileFields(params) {
                return this.fetch('/v2/ecapi.user.profile.fields', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.signup_field : null;
                });
            }

            function _profileUpdate(params) {
                return this.fetch('/v2/ecapi.user.profile.update', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.user : null;
                });
            }

            function _passwordUpdate(params) {
                return this.fetch('/v2/ecapi.user.password.update', params, false, function (res) {
                    return res;
                });
            }
        }
  app.factory('APIVersionService', APIVersionService);
        APIVersionService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIVersionService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIVersionService');
            service.check = _check;
            return service;
            function _check(params) {
                return this.fetch('/v2/ecapi.version.check', params, true, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.version_info : null;
                });
            }
        }
  app.factory('APIWithDrawService', APIWithDrawService);
        APIWithDrawService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM'];
        function APIWithDrawService($http, $q, $timeout, CacheFactory, ENUM) {
            var service = new APIEndpoint($http, $q, $timeout, CacheFactory, 'APIWithDrawService');
            service.get = _get;
            service.list = _list;
            service.cancel = _cancel;
            service.submit = _submit;
            return service;
            function _get(params) {
                return this.fetch('/v2/ecapi.withdraw.info', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.withdraw : null;
                });
            }

            function _cancel(params) {
                return this.fetch('/v2/ecapi.withdraw.cancel', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.withdraw : null;
                });
            }

            function _submit(params) {
                return this.fetch('/v2/ecapi.withdraw.submit', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.withdraw : null;
                });
            }

            function _list(params) {
                return this.fetch('/v2/ecapi.withdraw.list', params, false, function (res) {
                    return ENUM.ERROR_CODE.OK == res.data.error_code ? res.data.withdraws : null;
                });
            }
        }
   app.factory('API', API);
        API.$inject = ['APIAccessService', 'APIAreacodeService', 'APIArticleService', 'APIAuthBaseService', 'APIAuthDefaultService', 'APIAuthMobileService', 'APIAuthSocialService', 'APIAuthWebService', 'APIBannerService', 'APIBrandService', 'APICardpageService', 'APICartService', 'APICashgiftService', 'APICategoryService', 'APIConfigService', 'APIConsigneeService', 'APICouponService', 'APIInvoiceService', 'APIMessageService', 'APINoticeService', 'APIOrderService', 'APIPaymentService', 'APIProductService', 'APIPushService', 'APIRecommendService', 'APIRegionService', 'APIReviewService', 'APIScoreService', 'APISearchService', 'APIShippingService', 'APIShopService', 'APISiteService', 'APISplashService', 'APIThemeService', 'APIUserService', 'APIVersionService', 'APIBonusService', 'APIBalanceService', 'APIWithDrawService'];
        function API(APIAccessService, APIAreacodeService, APIArticleService, APIAuthBaseService, APIAuthDefaultService, APIAuthMobileService, APIAuthSocialService, APIAuthWebService, APIBannerService, APIBrandService, APICardpageService, APICartService, APICashgiftService, APICategoryService, APIConfigService, APIConsigneeService, APICouponService, APIInvoiceService, APIMessageService, APINoticeService, APIOrderService, APIPaymentService, APIProductService, APIPushService, APIRecommendService, APIRegionService, APIReviewService, APIScoreService, APISearchService, APIShippingService, APIShopService, APISiteService, APISplashService, APIThemeService, APIUserService, APIVersionService, APIBonusService, APIBalanceService, APIWithDrawService) {
            return {
                access: APIAccessService,
                areacode: APIAreacodeService,
                article: APIArticleService,
                auth: {
                    base: APIAuthBaseService,
                    default: APIAuthDefaultService,
                    mobile: APIAuthMobileService,
                    social: APIAuthSocialService,
                    web: APIAuthWebService
                },
                banner: APIBannerService,
                brand: APIBrandService,
                cardpage: APICardpageService,
                cart: APICartService,
                cashgift: APICashgiftService,
                category: APICategoryService,
                config: APIConfigService,
                consignee: APIConsigneeService,
                coupon: APICouponService,
                invoice: APIInvoiceService,
                message: APIMessageService,
                notice: APINoticeService,
                order: APIOrderService,
                payment: APIPaymentService,
                product: APIProductService,
                push: APIPushService,
                recommend: APIRecommendService,
                region: APIRegionService,
                review: APIReviewService,
                score: APIScoreService,
                search: APISearchService,
                shipping: APIShippingService,
                shop: APIShopService,
                site: APISiteService,
                splash: APISplashService,
                theme: APIThemeService,
                user: APIUserService,
                version: APIVersionService,
                bonus: APIBonusService,
                balance: APIBalanceService,
                withdraw: APIWithDrawService
            };
        }

   app.constant('ENUM', {
            "ERROR_CODE": {
                "OK": 0,
                "UNKNOWN_ERROR": 10000,
                "TOKEN_INVALID": 10001,
                "TOKEN_EXPIRED": 10002,
                "SIGN_INVALID": 10003,
                "SIGN_EXPIRED": 10004,
            },
            "SORT_KEY": {"DEFAULT": 0, "PRICE": 1, "POPULAR": 2, "CREDIT": 3, "SALE": 4, "DATE": 5},
            "SORT_VALUE": {"DEFAULT": 0, "ASC": 1, "DESC": 2},
            "SOCIAL_VENDOR": {"UNKNOWN": 0, "WEIXIN": 1, "WEIBO": 2, "QQ": 3, "TAOBAO": 4},
            "CARDGROUP_LAYOUT": {
                "A1H": "A1H",
                "A1S": "A1S",
                "A2H": "A2H",
                "A2S": "A2S",
                "A2XS": "A2XS",
                "A2XH": "A2XH",
                "A2XXH": "A2XXH",
                "A3XH": "A3XH",
                "A3H": "A3H",
                "A3S": "A3S",
                "A4H": "A4H",
                "A4S": "A4S",
                "A5H": "A5H",
                "A5S": "A5S",
                "B1L": "B1L",
                "B1R": "B1R",
                "B2L": "B2L",
                "B2R": "B2R",
                "B3L": "B3L",
                "B3R": "B3R",
                "B4L": "B4L",
                "B4R": "B4R",
                "B5L": "B5L",
                "B5R": "B5R",
                "C1H": "C1H",
                "C1S": "C1S",
                "C2": "C2",
                "C3": "C3",
            },
            "CARD_STYLE": {
                "V1T": "V1T",
                "V1B": "V1B",
                "V2T": "V2T",
                "V2B": "V2B",
                "H1L": "H1L",
                "H1R": "H1R",
                "H2L": "H2L",
                "H2R": "H2R",
                "Z1": "Z1",
                "Z2": "Z2",
                "Z3": "Z3",
                "V3T": "V3T",
                "V3B": "V3B",
                "V4T": "V4T",
                "V4B": "V4B",
                "Z2P": "Z2P",
                "Z2L": "Z2L",
            },
            "CASHGIFT_STATUS": {"AVAILABLE": 0, "EXPIRED": 1, "USED": 2},
            "PLATFORM_TYPE": {"B2C": 0, "B2B2C": 1},
            "PLATFORM_VENDOR": {"UNKNOWN": 0, "ECSHOP": 1, "ECSTORE": 2, "ECMALL": 3, "MAGENTO": 4},
            "COUPON_STATUS": {"AVAILABLE": 0, "EXPIRED": 1, "USED": 2},
            "MESSAGE_TYPE": {"SYSTEM": 1, "ORDER": 2},
            "ORDER_STATUS": {"CREATED": 0, "PAID": 1, "DELIVERING": 2, "DELIVERIED": 3, "FINISHED": 4, "CANCELLED": 5},
            "ORDER_GRADE": {"BAD": 1, "MEDIUM": 2, "GOOD": 3},
            "PRODUCT_ACTIVITY_STATUS": {"PREPARING": 0, "ONGOING": 1, "FINISHED": 2},
            "REVIEW_GRADE": {"ALL": 0, "BAD": 1, "MEDIUM": 2, "GOOD": 3},
            "SCORE_STATUS": {"INCOME": 1, "EXPENDITURE": 2},
            "KEYWORD_TYPE": {"PRODUCT": 1, "SHOP": 2},
            "PROFILE_GENDER": {"UNKNOWN": 0, "MALE": 1, "FEMALE": 2},
            "BONUS_STATUS": {"WAIT": 0, "FINISH": 1, "CANCEL": 2, "REVOKE": 3},
            "BONUS_TYPE": {"SIGNUP": 0, "ORDER": 1},
            "WITHDRAW_STATUS": {"WAIT": 0, "FINISH": 1, "CANCEL": 2, "FAILED": 3},
            "BALANCE_STATUS": {"IN": 1, "OUT": 2}
        }).run(['$rootScope', 'ENUM', function ($rootScope, ENUM) {
            $rootScope.ENUM = ENUM;
        }]);
        function APIEndpoint($http, $q, $timeout, CacheFactory, name) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.CacheFactory = CacheFactory;
            this.name = name;
            this.cache = this.CacheFactory.get(this.name);
            if (!this.cache) {
                this.cache = this.CacheFactory.createCache(name, {
                    deleteOnExpire: 'aggressive',
                    recycleFreq: 60 * 1000,
                    maxAge: 10 * 60 * 1000
                });
            }
        }

        APIEndpoint.prototype.readCache = function (key) {
            if (!this.cache)
                return null;
            var cacheKey = key;
            var cacheData = this.cache.get(cacheKey);
            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Read '" + this.name + "'");
            }
            return cacheData;
        }
        APIEndpoint.prototype.writeCache = function (key, data) {
            if (!this.cache)
                return;
            var cacheKey = key;
            var cacheData = data;
            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Write '" + this.name + "'");
            }
            this.cache.put(cacheKey, cacheData);
        }
        APIEndpoint.prototype.deleteCache = function (key) {
            if (!this.cache)
                return;
            var cacheKey = key;
            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Delete '" + this.name + "'");
            }
            this.cache.remove(cacheKey);
        }
        APIEndpoint.prototype.clearCache = function () {
            if (!this.cache)
                return;
            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Clear all");
            }
            this.cache.removeAll();
        }
        APIEndpoint.prototype.fetch = function (endpoint, params, useCache, transform) {
            if (!endpoint)
                return;
            var api = this;
            var cacheKey = endpoint;
            if (params) {
                for (var paramKey in params) {
                    cacheKey += '|' + paramKey + ':' + params[paramKey];
                }
            }
            if (useCache) {
                var cacheData = this.readCache(cacheKey);
                if (cacheData && cacheData.length) {
                    var deferred = this.$q.defer();
                    this.$timeout(function () {
                        deferred.resolve(cacheData);
                    }, 1);
                    return deferred.promise;
                }
            }
            return this.$http.post(endpoint, params).then(function (res) {
                var result = typeof transform === 'function' ? transform(res) : res;
                if (useCache) {
                    api.writeCache(cacheKey, result);
                }
                return result;
            });
        }
        window.APIEndpoint = APIEndpoint;
        app
            .factory('API', API);

        API.$inject = [
            'APIAccessService',
            'APIAreacodeService',
            'APIArticleService',
            'APIAuthBaseService',
            'APIAuthDefaultService',
            'APIAuthMobileService',
            'APIAuthSocialService',
            'APIAuthWebService',
            'APIBannerService',
            'APIBrandService',
            'APICardpageService',
            'APICartService',
            'APICashgiftService',
            'APICategoryService',
            'APIConfigService',
            'APIConsigneeService',
            'APICouponService',
            'APIInvoiceService',
            'APIMessageService',
            'APINoticeService',
            'APIOrderService',
            'APIPaymentService',
            'APIProductService',
            'APIPushService',
            'APIRecommendService',
            'APIRegionService',
            'APIReviewService',
            'APIScoreService',
            'APISearchService',
            'APIShippingService',
            'APIShopService',
            'APISiteService',
            'APISplashService',
            'APIThemeService',
            'APIUserService',
            'APIVersionService',
            'APIBonusService',
            'APIBalanceService',
            'APIWithDrawService'
        ];

        function API(APIAccessService,
                     APIAreacodeService,
                     APIArticleService,
                     APIAuthBaseService,
                     APIAuthDefaultService,
                     APIAuthMobileService,
                     APIAuthSocialService,
                     APIAuthWebService,
                     APIBannerService,
                     APIBrandService,
                     APICardpageService,
                     APICartService,
                     APICashgiftService,
                     APICategoryService,
                     APIConfigService,
                     APIConsigneeService,
                     APICouponService,
                     APIInvoiceService,
                     APIMessageService,
                     APINoticeService,
                     APIOrderService,
                     APIPaymentService,
                     APIProductService,
                     APIPushService,
                     APIRecommendService,
                     APIRegionService,
                     APIReviewService,
                     APIScoreService,
                     APISearchService,
                     APIShippingService,
                     APIShopService,
                     APISiteService,
                     APISplashService,
                     APIThemeService,
                     APIUserService,
                     APIVersionService,
                     APIBonusService,
                     APIBalanceService,
                     APIWithDrawService) {

            return {
                access: APIAccessService,
                areacode: APIAreacodeService,
                article: APIArticleService,
                auth: {
                    base: APIAuthBaseService,
                    default: APIAuthDefaultService,
                    mobile: APIAuthMobileService,
                    social: APIAuthSocialService,
                    web: APIAuthWebService
                },
                banner: APIBannerService,
                brand: APIBrandService,
                cardpage: APICardpageService,
                cart: APICartService,
                cashgift: APICashgiftService,
                category: APICategoryService,
                config: APIConfigService,
                consignee: APIConsigneeService,
                coupon: APICouponService,
                invoice: APIInvoiceService,
                message: APIMessageService,
                notice: APINoticeService,
                order: APIOrderService,
                payment: APIPaymentService,
                product: APIProductService,
                push: APIPushService,
                recommend: APIRecommendService,
                region: APIRegionService,
                review: APIReviewService,
                score: APIScoreService,
                search: APISearchService,
                shipping: APIShippingService,
                shop: APIShopService,
                site: APISiteService,
                splash: APISplashService,
                theme: APIThemeService,
                user: APIUserService,
                version: APIVersionService,
                bonus: APIBonusService,
                balance: APIBalanceService,
                withdraw: APIWithDrawService
            };
        }

        app.constant('ENUM', {

                // 错误代码
                "ERROR_CODE": {
                    "OK": 0, // 正常
                    "UNKNOWN_ERROR": 10000, // 内部错误
                    "TOKEN_INVALID": 10001, // Token 无效
                    "TOKEN_EXPIRED": 10002, // Token 过期
                    "SIGN_INVALID": 10003, // Sign 无效
                    "SIGN_EXPIRED": 10004, // Sign 过期
                },

                // 排序键
                "SORT_KEY": {
                    "DEFAULT": 0, // 默认
                    "PRICE": 1, // 价格从低到高
                    "POPULAR": 2, // 人气
                    "CREDIT": 3, // 信用
                    "SALE": 4, // 销量
                    "DATE": 5 // 上架时间
                },

                // 排序值
                "SORT_VALUE": {
                    "DEFAULT": 0, // 默认排序
                    "ASC": 1, // 升序
                    "DESC": 2 // 降序
                },

                // 帐号类型
                "SOCIAL_VENDOR": {
                    "UNKNOWN": 0, // 未知
                    "WEIXIN": 1, // 微信
                    "WEIBO": 2, // 微博
                    "QQ": 3, // QQ
                    "TAOBAO": 4 // 淘宝
                },

                // 卡片组类型
                "CARDGROUP_LAYOUT": {
                    // + 规则布局（A类）
                    "A1H": "A1H", //通栏（高）
                    "A1S": "A1S", //通栏（矮）
                    "A2H": "A2H", //垂直二等分（高）
                    "A2S": "A2S", //垂直二等分（矮）

                    // ＋ 规则布局（A类） 新增卡片组
                    "A2XS": "A2XS", // 垂直二等分（更矮）
                    "A2XH": "A2XH", // 垂直二等分（更高）
                    "A2XXH": "A2XXH", // 垂直二等分（更更高）
                    "A3XH": "A3XH", // 垂直三等分（更高）

                    "A3H": "A3H", //垂直三等分（高）
                    "A3S": "A3S", //垂直三等分（矮）
                    "A4H": "A4H", //垂直四等分（高）
                    "A4S": "A4S", //垂直四等分（矮）
                    "A5H": "A5H", //垂直五等分（高）
                    "A5S": "A5S", //垂直五等分（矮）

                    // + 不规则布局（B类）
                    "B1L": "B1L", //左一右二
                    "B1R": "B1R", //左二右一（镜像）
                    "B2L": "B2L", //左一右三
                    "B2R": "B2R", //左三右一（镜像）
                    "B3L": "B3L", //左一右四
                    "B3R": "B3R", //左四右一（镜像）

                    // ＋ 不规则布局（B类）新增卡片组
                    "B4L": "B4L", //左一右一
                    "B4R": "B4R", //左一右一（镜像）
                    "B5L": "B5L", //左一右二
                    "B5R": "B5R", //左二右一（镜像）

                    // + 自定义布局（C类）
                    "C1H": "C1H", //滚动横幅（高）
                    "C1S": "C1S", //滚动横幅（矮）
                    "C2": "C2", // 宫格横幅
                    "C3": "C3", // 公告横幅
                },

                // 卡片类型
                "CARD_STYLE": {
                    "V1T": "V1T", // 垂直样式1（从上到下）
                    "V1B": "V1B", // 垂直样式1（从下到上）
                    "V2T": "V2T", // 垂直样式2（从上到下）
                    "V2B": "V2B", // 垂直样式2（从下到上）
                    "H1L": "H1L", // 水平样式1（从左到右）
                    "H1R": "H1R", // 水平样式1（从右到左）
                    "H2L": "H2L", // 水平样式1（从左到右）
                    "H2R": "H2R", // 水平样式1（从右到左）
                    "Z1": "Z1", // 其他样式1
                    "Z2": "Z2", // 其他样式2（大图）
                    "Z3": "Z3", // 其他样式3

                    // 新增卡片样式
                    "V3T": "V3T", // 垂直样式3（从上到下）
                    "V3B": "V3B", // 垂直样式3（从下到上）
                    "V4T": "V4T", // 垂直样式4（从上到下）
                    "V4B": "V4B", // 垂直样式4（从下到上）
                    "Z2P": "Z2P", // 其他样式2 (大图)
                    "Z2L": "Z2L", // 其他样式2 (带标签大图)
                },

                // 红包状态
                "CASHGIFT_STATUS": {
                    "AVAILABLE": 0, // 未过期
                    "EXPIRED": 1, // 过期
                    "USED": 2 // 已使用
                },

                // 平台类型，ECN 1.2.3
                "PLATFORM_TYPE": {
                    "B2C": 0, // 单店
                    "B2B2C": 1 // 多店
                },

                // 平台厂商，ECN 1.2.3
                "PLATFORM_VENDOR": {
                    "UNKNOWN": 0, // 未知
                    "ECSHOP": 1,
                    "ECSTORE": 2,
                    "ECMALL": 3,
                    "MAGENTO": 4
                },

                // 优惠券状态
                "COUPON_STATUS": {
                    "AVAILABLE": 0, // 未过期
                    "EXPIRED": 1, // 过期
                    "USED": 2 // 已使用
                },

                // 积分类型
                "MESSAGE_TYPE": {
                    "SYSTEM": 1, // 系统
                    "ORDER": 2 // 订单
                },

                // 订单状态
                "ORDER_STATUS": {
                    "CREATED": 0, // 待付款
                    "PAID": 1, // 待发货
                    "DELIVERING": 2, // 发货中
                    "DELIVERIED": 3, // 已收货，待评价
                    "FINISHED": 4, // 已完成
                    "CANCELLED": 5  // 已取消
                },

                // 订单评价
                "ORDER_GRADE": {
                    "BAD": 1, // 差评
                    "MEDIUM": 2, // 中评
                    "GOOD": 3  // 好评
                },

                // 促销状态
                "PRODUCT_ACTIVITY_STATUS": {
                    "PREPARING": 0, // 未开始
                    "ONGOING": 1, // 已开始
                    "FINISHED": 2  // 已结束
                },

                // 评价类型
                "REVIEW_GRADE": {
                    "ALL": 0, // 全部
                    "BAD": 1, // 差评
                    "MEDIUM": 2, // 中评
                    "GOOD": 3  // 好评
                },

                // 积分状态
                "SCORE_STATUS": {
                    "INCOME": 1, // 收入
                    "EXPENDITURE": 2  // 支出
                },

                // 关键词
                "KEYWORD_TYPE": {
                    "PRODUCT": 1,    // 商品
                    "SHOP": 2     // 店铺
                },

                // 用户性别
                "PROFILE_GENDER": {
                    "UNKNOWN": 0,    // 保密
                    "MALE": 1,    // 男
                    "FEMALE": 2     // 女
                },

                // 用户性别
                "BONUS_STATUS": {
                    "WAIT": 0,    // 等待处理
                    "FINISH": 1,    // 已分成
                    "CANCEL": 2,     // 已取消
                    "REVOKE": 3     // 已撤销
                },

                "BONUS_TYPE": {
                    "SIGNUP": 0, 	//  注册分成
                    "ORDER": 1 	//  订单分成
                },

                "WITHDRAW_STATUS": {
                    "WAIT": 0, 	//  待处理     待处理的时候  可以做取消操作
                    "FINISH": 1, 	//  已完成
                    "CANCEL": 2, 	//  已取消	  (目前ecshop后台没有已取消的状态)
                    "FAILED": 3 	//  已失败
                },

                "BALANCE_STATUS": {
                    "IN": 1,         // 收入
                    "OUT": 2         // 支出
                }
            })
            .run(['$rootScope', 'ENUM', function ($rootScope, ENUM) {
                $rootScope.ENUM = ENUM;
            }]);

        function APIEndpoint($http, $q, $timeout, CacheFactory, name) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.CacheFactory = CacheFactory;

            this.name = name;
            this.cache = this.CacheFactory.get(this.name);

            if (!this.cache) {
                this.cache = this.CacheFactory.createCache(name, {
                    deleteOnExpire: 'aggressive',
                    recycleFreq: 60 * 1000,
                    maxAge: 10 * 60 * 1000
                });
            }
        }

        APIEndpoint.prototype.readCache = function (key) {
            if (!this.cache)
                return null;

            var cacheKey = key;
            var cacheData = this.cache.get(cacheKey);

            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Read '" + this.name + "'");
            }

            return cacheData;
        }

        APIEndpoint.prototype.writeCache = function (key, data) {
            if (!this.cache)
                return;

            var cacheKey = key;
            var cacheData = data;

            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Write '" + this.name + "'");
            }

            this.cache.put(cacheKey, cacheData);
        }

        APIEndpoint.prototype.deleteCache = function (key) {
            if (!this.cache)
                return;

            var cacheKey = key;

            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Delete '" + this.name + "'");
            }

            this.cache.remove(cacheKey);
        }

        APIEndpoint.prototype.clearCache = function () {
            if (!this.cache)
                return;

            if (GLOBAL_CONFIG.DEBUG) {
                console.log("[Cache] Clear all");
            }

            this.cache.removeAll();
        }

        APIEndpoint.prototype.fetch = function (endpoint, params, useCache, transform) {
            if (!endpoint)
                return;

            var api = this;
            var cacheKey = endpoint;

            if (params) {
                for (var paramKey in params) {
                    cacheKey += '|' + paramKey + ':' + params[paramKey];
                }
            }

            if (useCache) {
                var cacheData = this.readCache(cacheKey);
                if (cacheData && cacheData.length) {
                    var deferred = this.$q.defer();
                    this.$timeout(function () {
                        deferred.resolve(cacheData);
                    }, 1);
                    return deferred.promise;
                }
            }

            return this.$http.post(endpoint, params).then(function (res) {
                var result = typeof transform === 'function' ? transform(res) : res;
                if (useCache) {
                    api.writeCache(cacheKey, result);
                }
                return result;
            });
        }

        window.APIEndpoint = APIEndpoint;
       app
        .factory('ConfigModel', ConfigModel);

    ConfigModel.$inject = ['API','$cookies'];

    function ConfigModel( API,$cookies) {

        var service = {};

        try{
            service.config = $cookies.getObject( 'c' );
        }
        catch(e)
        {
            $cookies.remove( 'c' );
        }

        service.fetch = _fetch;
        service.getConfig = _getConfig;
        return service;

        function _fetch() {
            var _this = this;
            return API.config.get()
                .then(function (data) {
                    _this.config = data.config;
                    _saveConfig(data.config);
                    return data.config;
                });
        }

        function _saveConfig(config){

            // save to cookie storage
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+7);
            $cookies.putObject( 'c', config , {'expires': exdate});
        }

        function _getConfig(){
            if(this.config){
                return this.config;
            }
            else{

                try{
                    this.config = $cookies.getObject( 'c' );
                }
                catch(e)
                {
                    $cookies.remove( 'c' );
                }
                return this.config;
            }

        }

    }
app.factory('CartModel', CartModel);

    CartModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function CartModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.total = 0;
        service.subtotal = {};
        service.groups = null;
        service.count = _count;
        service.add = _add;
        service.delete = _delete;
        service.update = _update;
        service.reload = _reload;
        service.reloadIfNeeded = _reloadIfNeeded;
        return service;

        function _count() {
            var count = 0;
            if (this.groups) {
                var groups = this.groups;
                for (var i = 0; i < groups.length; ++i) {
                    var group = groups[i];
                    for (var j = 0; j < group.goods.length; ++j) {
                        count += group.goods[j].amount;
                    }
                }
            }
            this.total = count;
        }

        function _add(product, attrs, amount) {
            if (!AppAuthenticationService.getToken())
                return;

            var _this = this;
            return API.cart.add({
                product: product,
                property: JSON.stringify(attrs),
                amount: amount
            })
                .then(function (succeed) {
                    if (succeed) {
                        _this.reload();
                    }
                    return succeed;
                });
        }

        function _delete(goodsId) {
            if (!AppAuthenticationService.getToken())
                return;

            var _this = this;
            return API.cart.delete({
                good: goodsId
            })
                .then(function (succeed) {
                    if (succeed) {
                        var groups = _this.groups;
                        for (var i = 0; i < groups.length; ++i) {
                            var group = groups[i];
                            for (var j = 0; j < group.goods.length; ++j) {
                                var goods = group.goods[j];
                                if (goods.id == goodsId) {
                                    group.goods.splice(j, 1);
                                    break;
                                }
                            }
                        }
                        _this.isEmpty = (_this.groups && _this.groups.length) ? false : true;
                        _this.count();
                    }
                    return succeed;
                });
        }

        function _update(goodsId, amount) {
            if (!AppAuthenticationService.getToken())
                return;

            var _this = this;
            return API.cart.update({
                good: goodsId,
                amount: amount
            }).then(function (succeed) {
                if (succeed) {
                    var groups = _this.groups;
                    for (var i = 0; i < groups.length; ++i) {
                        var group = groups[i];
                        for (var j = 0; j < group.goods.length; ++j) {
                            var goods = group.goods[j];
                            if (goods.id == goodsId) {
                                goods.amount = amount;
                                break;
                            }
                        }
                    }
                    _this.isEmpty = (_this.groups && _this.groups.length) ? false : true;
                    _this.count();
                }
                return succeed;
            });
        }

        function _reload() {
            if (!AppAuthenticationService.getToken()) {
                // 置空
                this.total = 0;
                service.total = 0;
                return;
            }

            var _this = this;
            return API.cart.get({})
                .then(function (groups) {
                    if (groups) {
                        _this.groups = groups;
                        _this.isEmpty = (_this.groups && _this.groups.length) ? false : true;
                        _this.isLoaded = true;
                        _this.isLoading = false;
                        _this.count();
                    }

                    API.order
                        .subtotal().then(function (subtotal) {
                        _this.subtotal = subtotal;
                    });

                    return groups ? true : false;
                });
        }

        function _reloadIfNeeded() {
            // if (!this.isLoaded) {
            this.reload();
            // }
        }
    }

    //search.service
app.factory('SearchService', SearchService);

    SearchService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM', '$rootScope'];

    function SearchService($http, $q, $timeout, CacheFactory, ENUM, $rootScope) {

        var service = {};

        service.history = null;
        service.clear = _clear;

        $rootScope.$on('searchChanged', function (event, keyword) {
            if (!keyword || !keyword.length)
                return;

            var index = service.history ? service.history.indexOf(keyword) : -1;
            if (-1 == index) {
                service.history = service.history || [];
                service.history.push(keyword);
            }
        });

        return service;

        function _clear() {
            this.history = null;
        }
    }

    // express-select
app.factory('ExpressSelectService', ExpressSelectService);

    ExpressSelectService.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'ENUM'];

    function ExpressSelectService($http, $q, $timeout, $rootScope, CacheFactory, ENUM) {

        var service = {};
        service.expressId = null;
        service.goodsIds = null;
        service.goodsNumbers = null;
        service.region = null;
        service.clear = _clear;
        return service;

        function _clear() {
            this.expressId = null;
            this.goodsIds = null;
            this.goodsNumbers = null;
            this.region = null;
        }
    }
app.factory('ConfirmCartService', ConfirmCartService);

    ConfirmCartService.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'ENUM'];

    function ConfirmCartService($http, $q, $timeout, $rootScope, CacheFactory, ENUM) {

        var service = {};

        service.goods = [];
        service.invoiceType = null;
        service.invoiceTitle = null;
        service.invoiceContent = null;
        service.express = null;
        service.cashgift = null;
        service.consignee = null;
        service.coupon = null;
        service.clear = _clear;
        service.input = {
            score: 0,
            comment: ""
        };


        $rootScope.$on('consigneeChanged', function (event, consignee) {
            service.consignee = consignee;
        });

        $rootScope.$on('expressChanged', function (event, vendor) {
            service.express = vendor;
        });

        $rootScope.$on('invoiceChanged', function (event, invoice) {
            service.invoiceTitle = invoice.title;
            service.invoiceType = invoice.type;
            service.invoiceContent = invoice.content;
        });

        $rootScope.$on('cashgiftChanged', function (event, cashgift) {
            service.cashgift = cashgift;
        });

        return service;

        function _clear() {
            this.goods = [];
            this.invoiceType = null;
            this.invoiceTitle = null;
            this.invoiceContent = null;
            this.express = null;
            this.cashgift = null;
            this.consignee = null;
            this.coupon = null;
            this.input = {
                score: 0,
                comment: ""
            };
        }
    }

    //confirm-product
app.factory('ConfirmProductService', ConfirmProductService);

    ConfirmProductService.$inject = ['$http', '$q', '$timeout', 'CacheFactory', 'ENUM', '$rootScope'];

    function ConfirmProductService($http, $q, $timeout, CacheFactory, ENUM, $rootScope) {

        var service = {};

        service.product = null;
        service.properties = null;
        service.amount = null;
        service.invoiceType = null;
        service.invoiceTitle = null;
        service.invoiceContent = null;
        service.shippingVendor = null;
        service.cashgift = null;
        service.consignee = null;
        service.coupon = null;
        service.express = null;
        service.clear = _clear;
        service.input = {
            score: 0,
            comment: ""
        };

        $rootScope.$on('consigneeChanged', function( event, consignee ) {
            service.consignee = consignee;
        });

        $rootScope.$on('expressChanged', function( event, vendor ) {
            service.express = vendor;
        });

        $rootScope.$on('invoiceChanged', function( event, invoice ) {
            service.invoiceTitle = invoice.title;
            service.invoiceType = invoice.type;
            service.invoiceContent = invoice.content;
        });

        $rootScope.$on('cashgiftChanged', function( event, cashgift ) {
            service.cashgift = cashgift;
        });

        return service;

        function _clear() {
            this.product = null;
            this.properties = null;
            this.amount = null;
            this.invoiceType = null;
            this.invoiceTitle = null;
            this.invoiceContent = null;
            this.express = null;
            this.cashgift = null;
            this.consignee = null;
            this.coupon = null;
            this.input = {
                score: 0,
                comment: ""
            };
        }
    }

    //payment
app.factory('PaymentModel', PaymentModel);

    PaymentModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function PaymentModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.types = null;
        service.order = null;
        service.reload = _reload;
        service.clear = _clear;
        return service;

        function _clear() {
            // this.isEmpty = false;
            // this.isLoaded = false;
            // this.isLoading = false;
            // this.types = null;
            this.order = null;
        }

        function _reload() {
            if ( !AppAuthenticationService.getToken() )
                return;

            var _this = this;
            return API.payment.typeList({

            })
                .then(function(types) {
                    if ( types ) {
                        _this.types = types;
                        _this.isEmpty = (_this.groups && _this.groups.length) ? false : true;
                        _this.isLoaded = true;
                        _this.isLoading = false;
                    }

                    return types ? true : false;
                });
        }
    }

    //invoice-select
app.factory('InvoiceSelectService', InvoiceSelectService);

    InvoiceSelectService.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'ENUM'];

    function InvoiceSelectService($http, $q, $timeout, $rootScope, CacheFactory, ENUM) {

        var service = {};
        service.title = null;
        service.type = null;
        service.content = null;
        service.clear = _clear;
        return service;

        function _clear() {
            this.title = null;
            this.type = null;
            this.content = null;
        }
    }

    //cashgift-select
 app.factory('CashgiftSelectModel', CashgiftSelectModel);

    CashgiftSelectModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'API', 'ENUM', 'AppAuthenticationService'];

    function CashgiftSelectModel($http, $q, $timeout, $rootScope, CacheFactory, API, ENUM, AppAuthenticationService) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.cashgifts = null;
        service.goods = null;
        service.totalPrice = 0;
        service.clear = _clear;
        service.fetch = _fetch;
        service.reload = _reload;
        service.loadMore = _loadMore;

        return service;

        function _clear() {
            this.cashgifts = null;
            this.totalPrice = 0;
        }

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.cashgifts = null;
            this.isEmpty = false;
            this.isLoaded = false;

            this.fetch(1, PER_PAGE);
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.cashgifts && this.cashgifts.length) {
                this.fetch((this.cashgifts.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var _this = this;
            API.cashgift.available({
                total_price: this.totalPrice,
                page: page,
                per_page: perPage,
                goods: this.goods
            }).then(function (cashgifts) {
                _this.cashgifts = _this.cashgifts ? _this.cashgifts.concat(cashgifts) : cashgifts;
                _this.isEmpty = (_this.cashgifts && _this.cashgifts.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (cashgifts && cashgifts.length < perPage) ? !_this.isEmpty : false;
            });
        }
    }


//address-select
   app.factory('AddressSelectModel', AddressSelectModel);

    AddressSelectModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'API', 'ENUM'];

    function AddressSelectModel($http, $q, $timeout, $rootScope, CacheFactory, API, ENUM) {

        var service = {};
        service.isLoading = false;
        service.isLoaded = false;
        service.consignees = null;
        service.clear = _clear;
        service.reload = _reload;
        return service;

        function _clear() {
            this.consignees = null;
        }

        function _reload() {
            this.isLoading = false;
            this.isLoaded = false;

            var _this = this;
            return API.consignee.list({

            })
                .then(function (consignees) {
                    _this.consignees = consignees;
                    _this.isLoading = false;
                    _this.isLoaded = true;
                })
        }
    }

    //address-edit
    app.factory('AddressEditModel', AddressEditModel);

    AddressEditModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'API', 'ENUM', 'AppAuthenticationService'];

    function AddressEditModel($http, $q, $timeout, $rootScope, CacheFactory, API, ENUM, AppAuthenticationService) {

        var service = {};
        service.isLoaded = false;
        service.isLoading = false;
        service.consignee = null;
        service.regions = null;
        service.save = _save;
        service.clear = _clear;
        service.reload = _reload;
        service.reload = _reload;
        service.reloadIfNeeded = _reloadIfNeeded;
        return service;

        function _clear() {
            this.consignee = null;
        }

        function _save(name, mobile, region, address) {
            if (!AppAuthenticationService.getToken())
                return;

            if (!this.consignee || !this.consignee.id) {
                var _this = this;
                return API.consignee.add({
                    name: name,
                    mobile: mobile,
                    tel: '',
                    zip_code: '',
                    region: region,
                    address: address
                })
                    .then(function (consignee) {
                        _this.consignee = consignee;
                        return consignee ? true : false;
                    });
            } else {
                var _this = this;
                return API.consignee.update({
                    consignee: this.consignee.id,
                    name: name,
                    mobile: mobile,
                    tel: '',
                    zip_code: '',
                    region: region,
                    address: address
                })
                    .then(function (consignee) {
                        _this.consignee = consignee;
                        return consignee ? true : false;
                    });
            }
        }

        function _reload() {
            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.isLoading = true;

            var _this = this;
            return API.region.list({})
                .then(function (regions) {
                    if (regions && regions.length) {
                        _this.isLoading = false;
                        _this.isLoaded = true;
                        _this.regions = regions;
                    } else {
                        $scope.toast('没有可选地址');
                    }
                    return regions ? true : false;
                });
        }

        function _reloadIfNeeded() {
            if (!AppAuthenticationService.getToken())
                return;

            if (!this.isLoaded) {
                return this.reload();
            } else {
                var deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(true);
                }, 1);
                return deferred.promise;
            }
        }

    }

//my-order
    app.factory('MyOrderModel', MyOrderModel);

    MyOrderModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function MyOrderModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.status = null;
        service.orders = null;
        service.fetch = _fetch;
        service.reload = _reload;
        service.loadMore = _loadMore;
        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.orders = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.orders && this.orders.length) {
                this.fetch((this.orders.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var params = {
                page: page,
                per_page: perPage
            };

            if (null != this.status) {
                params.status = this.status;
            }

            var _this = this;
            API.order.list(params).then(function (orders) {
                _this.orders = _this.orders ? _this.orders.concat(orders) : orders;
                _this.isEmpty = (_this.orders && _this.orders.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (orders && orders.length < perPage) ? !_this.isEmpty : false;
            });
        }

    }

//order-express
   app.factory('OrderExpressModel', OrderExpressModel);

    OrderExpressModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function OrderExpressModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var service = {};
        service.order = null;
        service.info = null;
        service.clear = _clear;
        service.reload = _reload;
        return service;

        function _clear() {
            this.order = null;
            this.info = null;
        }

        function _reload() {
            var _this = this;
            return API.shipping.statusGet({
                order_id: this.order.id,
                tracking_no: null
            })
                .then(function (info) {
                    _this.info = info;
                    return info ? true : false;
                });
        }
    }


//my-address
     app.factory('MyAddressModel', MyAddressModel);

    MyAddressModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function MyAddressModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.consignees = null;
        service.reload = _reload;
        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.consignees = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            var _this = this;
            API.consignee
                .list({})
                .then(function (consignees) {
                    _this.consignees = consignees;
                    _this.isEmpty = (_this.consignees && _this.consignees.length) ? false : true;
                    _this.isLoaded = true;
                    _this.isLoading = false;
                    _this.isLastPage = true;
                });
        }

    }

    //my-favorite
    app.factory('MyFavoriteModel', MyFavoriteModel);

    MyFavoriteModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function MyFavoriteModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.products = null;
        service.fetch = _fetch;
        service.reload = _reload;
        service.loadMore = _loadMore;
        service.delete = _delete;
        return service;

        function _delete(productId) {
            if (!AppAuthenticationService.getToken())
                return;

            var _this = this;
            API.product.unlike({
                product: productId
            })
                .then(function(success) {
                    _this.reload();
                });
        }

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.products = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
        }

        function _loadMore() {

            if ( this.isLoading )
                return;
            if ( this.isLastPage )
                return;

            if (this.products && this.products.length) {
                this.fetch( (this.products.length / PER_PAGE) + 1, PER_PAGE );
            } else {
                this.fetch( 1, PER_PAGE );
            }
        }

        function _fetch( page, perPage ) {

            this.isLoading = true;

            var _this = this;
            API.product
                .likedList({
                    page: page,
                    per_page: perPage
                }).then(function(products) {
                _this.products = _this.products ? _this.products.concat(products) : products;
                _this.isEmpty = (_this.products && _this.products.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (products && products.length < perPage) ? !_this.isEmpty : false;
            });
        }

    }

    //my-cashgift
     app.factory('MyCashgiftModel', MyCashgiftModel);

    MyCashgiftModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function MyCashgiftModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.status = null;
        service.cashgifts = null;
        service.fetch = _fetch;
        service.reload = _reload;
        service.loadMore = _loadMore;
        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.cashgifts = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.cashgifts && this.cashgifts.length) {
                this.fetch((this.cashgifts.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var params = {
                page: page,
                per_page: perPage
            };


            params.status = this.status;

            var _this = this;
            API.cashgift.list(params).then(function (cashgifts) {
                _this.cashgifts = _this.cashgifts ? _this.cashgifts.concat(cashgifts) : cashgifts;
                _this.isEmpty = (_this.cashgifts && _this.cashgifts.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (cashgifts && cashgifts.length < perPage) ? !_this.isEmpty : false;
            });
        }

    }

    //my-score
    app.factory('MyScoreModel', MyScoreModel);

    MyScoreModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function MyScoreModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.score = null;
        service.rule = null;
        service.history = null;
        service.count = _count;
        service.fetch = _fetch;
        service.reload = _reload;
        service.loadMore = _loadMore;
        return service;

        function _count() {

            if (!AppAuthenticationService.getToken())
                return;

            var _this = this;

            API.score
                .get({})
                .then(function (data) {
                    _this.score = data.score;
                    _this.rule = data.rule;
                });
        }

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.history = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.history && this.history.length) {
                this.fetch((this.history.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            this.isLoading = true;

            var _this = this;

            var params = {
                page: page,
                per_page: perPage
            };

            if (this.status) {
                params.status = this.status;
            }

            API.score.historyList(params).then(function (history) {
                _this.history = _this.history ? _this.history.concat(history) : history;
                _this.isEmpty = (_this.history && _this.history.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (history && history.length < perPage) ? !_this.isEmpty : false;
            });
        }

    }

//bonus
     app.factory('BonusModel', BonusModel);

    BonusModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function BonusModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};

        service.isEmpty     = false;
        service.isLoaded    = false;
        service.isLoading   = false;
        service.isLastPage  = false;
        service.fetch       = _fetch;
        service.getInfo     = _getInfo;
        service.reload      = _reload;
        service.loadMore    = _loadMore;

        service.bonuses = [];

        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.bonuses = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
            return this.getInfo();
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.bonuses && this.bonuses.length) {
                this.fetch((this.bonuses.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var params = {
                page: page,
                per_page: perPage
            };

            if (null != this.status) {
                params.status = this.status;
            }

            var _this = this;

            API.bonus.list(params).then(function (bonuses) {
                _this.bonuses = _this.bonuses ? _this.bonuses.concat(bonuses) : bonuses;
                _this.isEmpty = (_this.bonuses && _this.bonuses.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (bonuses && bonuses.length < perPage) ? !_this.isEmpty : false;
                return true;
            });
        }

        function _getInfo() {

            if (!AppAuthenticationService.getToken())
                return;

            var params = {};

            var _this = this;

            API.bonus.get(params).then(function (bonus_info) {
                _this.bonus_info = bonus_info;
                return true;

            });
        }

    }

//my-balance
    app.factory('BalanceModel', BalanceModel);

    BalanceModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function BalanceModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty     = false;
        service.isLoaded    = false;
        service.isLoading   = false;
        service.isLastPage  = false;
        service.fetch       = _fetch;
        service.reload      = _reload;
        service.get         = _get;
        service.loadMore    = _loadMore;

        service.balances    = [];
        service.balanceAmount = 0;

        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.balances = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
            this.get();
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.balances && this.balances.length) {
                this.fetch((this.balances.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var params = {
                page: page,
                per_page: perPage
            };

            if (null != this.status) {
                params.status = this.status;
            }

            var _this = this;

            API.balance.list(params).then(function (balances) {
                _this.balances = _this.balances ? _this.balances.concat(balances) : balances;
                _this.isEmpty = (_this.balances && _this.balances.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (balances && balances.length < perPage) ? !_this.isEmpty : false;
            });
        }

        function _get() {

            if (!AppAuthenticationService.getToken())
                return;


            var params = {
            };


            var _this = this;

            API.balance.get(params).then(function (amount) {
                _this.balanceAmount = amount;
            });
        }

    }

//withdraw-history
    app.factory('WithDrawHistoryModel', WithDrawHistoryModel);

    WithDrawHistoryModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function WithDrawHistoryModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var PER_PAGE = 10;

        var service = {};
        service.isEmpty = false;
        service.isLoaded = false;
        service.isLoading = false;
        service.isLastPage = false;
        service.status = null;
        service.withdraws = [];
        service.fetch = _fetch;
        service.reload = _reload;
        service.loadMore = _loadMore;

        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;

            this.withdraws = null;
            this.isEmpty = false;
            this.isLoaded = false;
            this.isLastPage = false;

            this.fetch(1, PER_PAGE);
        }

        function _loadMore() {

            if (!AppAuthenticationService.getToken())
                return;

            if (this.isLoading)
                return;
            if (this.isLastPage)
                return;

            if (this.withdraws && this.withdraws.length) {
                this.fetch((this.withdraws.length / PER_PAGE) + 1, PER_PAGE);
            } else {
                this.fetch(1, PER_PAGE);
            }
        }

        function _fetch(page, perPage) {

            if (!AppAuthenticationService.getToken())
                return;

            this.isLoading = true;

            var params = {
                page: page,
                per_page: perPage
            };

            if (null != this.status) {
                params.status = this.status;
            }

            var _this = this;
            API.withdraw.list(params).then(function (withdraws) {
                _this.withdraws = _this.withdraws ? _this.withdraws.concat(withdraws) : withdraws;
                _this.isEmpty = (_this.withdraws && _this.withdraws.length) ? false : true;
                _this.isLoaded = true;
                _this.isLoading = false;
                _this.isLastPage = (withdraws && withdraws.length < perPage) ? !_this.isEmpty : false;
            });
        }

    }

//my-recommend
     app.factory('MyRecommendModel', MyRecommendModel);

    MyRecommendModel.$inject = ['$http', '$q', '$timeout', '$rootScope', 'CacheFactory', 'AppAuthenticationService', 'API', 'ENUM'];

    function MyRecommendModel($http, $q, $timeout, $rootScope, CacheFactory, AppAuthenticationService, API, ENUM) {

        var service = {};
        service.reload = _reload;
        service.fetch = _fetch;

        return service;

        function _reload() {

            if (!AppAuthenticationService.getToken())
                return;

            this.fetch();
        }



        function _fetch() {

            if (!AppAuthenticationService.getToken())
                return;

            var _this = this;
            var params = {
            };

            API.recommend.bonusInfo(params).then(function (bonus_info) {
                _this.bonus_info = bonus_info;
            });

        }

    }



