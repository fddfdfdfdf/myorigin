app.filter('formatNickname', function () {
        return function (nickname) {
            return nickname;
        }
    });
app.filter('localTime', function () {
        return function (nS) {
            var format = function (time, format) {
                var t = new Date(time);
                var tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                };
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                        case'yyyy':
                            return tf(t.getUTCFullYear());
                            break;
                        case'MM':
                            return tf(t.getUTCMonth() + 1);
                            break;
                        case'mm':
                            return tf(t.getUTCMinutes());
                            break;
                        case'dd':
                            return tf(t.getUTCDate());
                            break;
                        case'HH':
                            return tf(t.getUTCHours());
                            break;
                        case'ss':
                            return tf(t.getUTCSeconds());
                            break;
                    }
                    ;
                });
            };
            return format(parseInt(nS) * 1000, 'yyyy-MM-dd HH:mm:ss');
        }
    });
app.filter('trustHtml', ['$sce', '$injector', '$log', function ($sce, $injector, $log) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    }]);