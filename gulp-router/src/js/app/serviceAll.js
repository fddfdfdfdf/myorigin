app.factory('ConfigModel', ConfigModel);
ConfigModel.$inject = ['API', '$cookies'];
function ConfigModel(API, $cookies) {
    var service = {};
    try {
        service.config = $cookies.getObject('c');
    }
    catch (e) {
        $cookies.remove('c');
    }
    service.fetch = _fetch;
    service.getConfig = _getConfig;
    return service;
    function _fetch() {
        var _this = this;
        return API.config.get().then(function (data) {
            _this.config = data.config;
            _saveConfig(data.config);
            return data.config;
        });
    }

    function _saveConfig(config) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 7);
        $cookies.putObject('c', config, {'expires': exdate});
    }

    function _getConfig() {
        if (this.config) {
            return this.config;
        }
        else {
            try {
                this.config = $cookies.getObject('c');
            }
            catch (e) {
                $cookies.remove('c');
            }
            return this.config;
        }
    }
}
app.factory('WeixinService', WeixinService);
WeixinService.$inject = ['$http', '$location', '$q', 'CONSTANTS', 'APIPaymentService', '$rootScope', 'AppAuthenticationService'];
function WeixinService($http, $location, $q, CONSTANTS, APIPaymentService, $rootScope, AppAuthenticationService) {
    var service = {};
    service.pay = pay;
    return service;
    function obj2string(o) {
        var r = [];
        if (typeof o == "string") {
            return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        }
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o) {
                    r.push(i + ":" + obj2string(o[i]));
                }
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}";
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(obj2string(o[i]))
                }
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString();
    }

    function pay(order) {
        var openid = AppAuthenticationService.getOpenId();
        console.log("openid:" + openid);
        var param = {order: order, code: "wxpay.wap", openid: openid};
        return APIPaymentService.pay(param).then(function (res) {
            if (res && res.data && res.data.wxpay) {
                var result = res.data;
                if (GLOBAL_CONFIG.DEBUG) {
                    $rootScope.toast(JSON.stringify(result));
                }
                return wx.chooseWXPay({
                    timestamp: result.wxpay.timestamp.toString(),
                    nonceStr: result.wxpay.nonce_str,
                    package: result.wxpay.packages,
                    signType: 'MD5',
                    paySign: result.wxpay.sign,
                    success: function (res) {
                        if (GLOBAL_CONFIG.DEBUG) {
                            var err_msg = obj2string(res);
                            $rootScope.toast(err_msg);
                        }
                        if (res.errMsg == "chooseWXPay:ok") {
                            $rootScope.$emit('onPaySuccess', res.errMsg);
                        }
                        else {
                            $rootScope.$emit('onPayFailed', res.errMsg);
                        }
                        return true;
                    },
                    cancel: function (res) {
                        if (GLOBAL_CONFIG.DEBUG) {
                            $rootScope.toast(JSON.stringify(res));
                        }
                        $rootScope.$emit('onPayFailed', res.errMsg);
                    },
                    fail: function (res) {
                        $rootScope.$emit('onPayFailed', res.errMsg);
                        if (GLOBAL_CONFIG.DEBUG) {
                            $rootScope.toast(JSON.stringify(res));
                        }
                    }
                });
            }
            else {
                return false;
            }
        });
    }
}
