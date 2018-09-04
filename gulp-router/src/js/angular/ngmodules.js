/*
 AngularJS v1.4.6
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
 */
(function(F,x,Oa){'use strict';function va(a,b,c){if(!a)throw ngMinErr("areq",b||"?",c||"required");return a}function wa(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;Y(a)&&(a=a.join(" "));Y(b)&&(b=b.join(" "));return a+" "+b}function Fa(a){var b={};a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from);return b}function V(a,b,c){var d="";a=Y(a)?a:a&&M(a)&&a.length?a.split(/\s+/):[];q(a,function(a,y){a&&0<a.length&&(d+=0<y?" ":"",d+=c?b+a:a+b)});return d}function Ga(a){if(a instanceof I)switch(a.length){case 0:return[];
    case 1:if(1===a[0].nodeType)return a;break;default:return I(Z(a))}if(1===a.nodeType)return I(a)}function Z(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(1==c.nodeType)return c}}function Ha(a,b,c){q(b,function(b){a.addClass(b,c)})}function Ia(a,b,c){q(b,function(b){a.removeClass(b,c)})}function Q(a){return function(b,c){c.addClass&&(Ha(a,b,c.addClass),c.addClass=null);c.removeClass&&(Ia(a,b,c.removeClass),c.removeClass=null)}}function ia(a){a=a||{};if(!a.$$prepared){var b=a.domOperation||
    L;a.domOperation=function(){a.$$domOperationFired=!0;b();b=L};a.$$prepared=!0}return a}function ea(a,b){xa(a,b);ya(a,b)}function xa(a,b){b.from&&(a.css(b.from),b.from=null)}function ya(a,b){b.to&&(a.css(b.to),b.to=null)}function R(a,b,c){var d=(b.addClass||"")+" "+(c.addClass||""),e=(b.removeClass||"")+" "+(c.removeClass||"");a=Ja(a.attr("class"),d,e);c.preparationClasses&&(b.preparationClasses=$(c.preparationClasses,b.preparationClasses),delete c.preparationClasses);d=b.domOperation!==L?b.domOperation:
    null;za(b,c);d&&(b.domOperation=d);b.addClass=a.addClass?a.addClass:null;b.removeClass=a.removeClass?a.removeClass:null;return b}function Ja(a,b,c){function d(a){M(a)&&(a=a.split(" "));var b={};q(a,function(a){a.length&&(b[a]=!0)});return b}var e={};a=d(a);b=d(b);q(b,function(a,b){e[b]=1});c=d(c);q(c,function(a,b){e[b]=1===e[b]?null:-1});var y={addClass:"",removeClass:""};q(e,function(b,c){var e,d;1===b?(e="addClass",d=!a[c]):-1===b&&(e="removeClass",d=a[c]);d&&(y[e].length&&(y[e]+=" "),y[e]+=c)});
    return y}function G(a){return a instanceof x.element?a[0]:a}function Ka(a,b,c){var d="";b&&(d=V(b,"ng-",!0));c.addClass&&(d=$(d,V(c.addClass,"-add")));c.removeClass&&(d=$(d,V(c.removeClass,"-remove")));d.length&&(c.preparationClasses=d,a.addClass(d))}function ja(a,b){var c=b?"-"+b+"s":"";fa(a,[ga,c]);return[ga,c]}function ma(a,b){var c=b?"paused":"",d=W+"PlayState";fa(a,[d,c]);return[d,c]}function fa(a,b){a.style[b[0]]=b[1]}function $(a,b){return a?b?a+" "+b:a:b}function Aa(a,b,c){var d=Object.create(null),
    e=a.getComputedStyle(b)||{};q(c,function(a,b){var c=e[a];if(c){var l=c.charAt(0);if("-"===l||"+"===l||0<=l)c=La(c);0===c&&(c=null);d[b]=c}});return d}function La(a){var b=0;a=a.split(/\s*,\s*/);q(a,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));a=parseFloat(a)||0;b=b?Math.max(a,b):a});return b}function na(a){return 0===a||null!=a}function Ba(a,b){var c=N,d=a+"s";b?c+="Duration":d+=" linear all";return[c,d]}function Ca(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},
    count:function(b){return(b=a[b])?b.total:0},get:function(b){return(b=a[b])&&b.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}var L=x.noop,za=x.extend,I=x.element,q=x.forEach,Y=x.isArray,M=x.isString,oa=x.isObject,pa=x.isUndefined,qa=x.isDefined,Da=x.isFunction,ra=x.isElement,N,sa,W,ta;pa(F.ontransitionend)&&qa(F.onwebkittransitionend)?(N="WebkitTransition",sa="webkitTransitionEnd transitionend"):(N="transition",sa="transitionend");pa(F.onanimationend)&&qa(F.onwebkitanimationend)?
    (W="WebkitAnimation",ta="webkitAnimationEnd animationend"):(W="animation",ta="animationend");var ka=W+"Delay",ua=W+"Duration",ga=N+"Delay";F=N+"Duration";var Ma={transitionDuration:F,transitionDelay:ga,transitionProperty:N+"Property",animationDuration:ua,animationDelay:ka,animationIterationCount:W+"IterationCount"},Na={transitionDuration:F,transitionDelay:ga,animationDuration:ua,animationDelay:ka};x.module("ngAnimate",[]).provider("$$body",function(){this.$get=["$document",function(a){return I(a[0].body)}]}).directive("ngAnimateChildren",
    [function(){return function(a,b,c){a=c.ngAnimateChildren;x.isString(a)&&0===a.length?b.data("$$ngAnimateChildren",!0):c.$observe("ngAnimateChildren",function(a){b.data("$$ngAnimateChildren","on"===a||"true"===a)})}}]).factory("$$rAFScheduler",["$$rAF",function(a){function b(a){d=d.concat(a);c()}function c(){if(d.length){for(var b=d.shift(),v=0;v<b.length;v++)b[v]();e||a(function(){e||c()})}}var d,e;d=b.queue=[];b.waitUntilQuiet=function(b){e&&e();e=a(function(){e=null;b();c()})};return b}]).factory("$$AnimateRunner",
    ["$q","$sniffer","$$animateAsyncRun",function(a,b,c){function d(a){this.setHost(a);this._doneCallbacks=[];this._runInAnimationFrame=c();this._state=0}d.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};d.all=function(a,b){function c(v){l=l&&v;++d===a.length&&b(l)}var d=0,l=!0;q(a,function(a){a.done(c)})};d.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:L,getPromise:function(){if(!this.promise){var b=
        this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},
        complete:function(a){var b=this;0===b._state&&(b._state=1,b._runInAnimationFrame(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(q(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return d}]).factory("$$animateAsyncRun",["$$rAF",function(a){function b(b){c.push(b);1<c.length||a(function(){for(var a=0;a<c.length;a++)c[a]();c=[]})}var c=[];return function(){var a=!1;b(function(){a=!0});return function(c){a?c():b(c)}}}]).provider("$$animateQueue",
    ["$animateProvider",function(a){function b(a,b,c,q){return d[a].some(function(a){return a(b,c,q)})}function c(a,b){a=a||{};var c=0<(a.addClass||"").length,d=0<(a.removeClass||"").length;return b?c&&d:c||d}var d=this.rules={skip:[],cancel:[],join:[]};d.join.push(function(a,b,d){return!b.structural&&c(b.options)});d.skip.push(function(a,b,d){return!b.structural&&!c(b.options)});d.skip.push(function(a,b,c){return"leave"==c.event&&b.structural});d.skip.push(function(a,b,c){return c.structural&&2===c.state&&
        !b.structural});d.cancel.push(function(a,b,c){return c.structural&&b.structural});d.cancel.push(function(a,b,c){return 2===c.state&&b.structural});d.cancel.push(function(a,b,c){a=b.options;c=c.options;return a.addClass&&a.addClass===c.removeClass||a.removeClass&&a.removeClass===c.addClass});this.$get=["$$rAF","$rootScope","$rootElement","$document","$$body","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(d,y,v,z,l,s,O,x,t,la,E){function h(a,b){var c=
        G(a),f=[],g=w[b];g&&q(g,function(a){a.node.contains(c)&&f.push(a.callback)});return f}function S(a,b,c,f){d(function(){q(h(b,a),function(a){a(b,c,f)})})}function u(a,g,m){function d(b,c,g,f){S(c,a,g,f);b.progress(c,g,f)}function w(b){var c=a,g=m;g.preparationClasses&&(c.removeClass(g.preparationClasses),g.preparationClasses=null);g.activeClasses&&(c.removeClass(g.activeClasses),g.activeClasses=null);Ea(a,m);ea(a,m);m.domOperation();e.complete(!b)}var B,h;if(a=Ga(a))B=G(a),h=a.parent();m=ia(m);var e=
        new x;Y(m.addClass)&&(m.addClass=m.addClass.join(" "));m.addClass&&!M(m.addClass)&&(m.addClass=null);Y(m.removeClass)&&(m.removeClass=m.removeClass.join(" "));m.removeClass&&!M(m.removeClass)&&(m.removeClass=null);m.from&&!oa(m.from)&&(m.from=null);m.to&&!oa(m.to)&&(m.to=null);if(!B)return w(),e;var k=[B.className,m.addClass,m.removeClass].join(" ");if(!C(k))return w(),e;var l=0<=["enter","move","leave"].indexOf(g),u=!H||U.get(B),k=!u&&A.get(B)||{},v=!!k.state;u||v&&1==k.state||(u=!p(a,h,g));if(u)return w(),
        e;l&&J(a);h={structural:l,element:a,event:g,close:w,options:m,runner:e};if(v){if(b("skip",a,h,k)){if(2===k.state)return w(),e;R(a,k.options,m);return k.runner}if(b("cancel",a,h,k))if(2===k.state)k.runner.end();else if(k.structural)k.close();else return R(a,k.options,h.options),k.runner;else if(b("join",a,h,k))if(2===k.state)R(a,m,{});else return Ka(a,l?g:null,m),g=h.event=k.event,m=R(a,k.options,h.options),k.runner}else R(a,m,{});(v=h.structural)||(v="animate"===h.event&&0<Object.keys(h.options.to||
            {}).length||c(h.options));if(!v)return w(),f(a),e;var t=(k.counter||0)+1;h.counter=t;r(a,1,h);y.$$postDigest(function(){var b=A.get(B),h=!b,b=b||{},J=0<(a.parent()||[]).length&&("animate"===b.event||b.structural||c(b.options));if(h||b.counter!==t||!J){h&&(Ea(a,m),ea(a,m));if(h||l&&b.event!==g)m.domOperation(),e.end();J||f(a)}else g=!b.structural&&c(b.options,!0)?"setClass":b.event,r(a,2),b=O(a,g,b.options),b.done(function(b){w(!b);(b=A.get(B))&&b.counter===t&&f(G(a));d(e,g,"close",{})}),e.setHost(b),
        d(e,g,"start",{})});return e}function J(a){a=G(a).querySelectorAll("[data-ng-animate]");q(a,function(a){var b=parseInt(a.getAttribute("data-ng-animate")),c=A.get(a);switch(b){case 2:c.runner.end();case 1:c&&A.remove(a)}})}function f(a){a=G(a);a.removeAttribute("data-ng-animate");A.remove(a)}function B(a,b){return G(a)===G(b)}function p(a,b,c){c=B(a,l)||"HTML"===a[0].nodeName;var g=B(a,v),f=!1,d;for((a=a.data("$ngAnimatePin"))&&(b=a);b&&b.length;){g||(g=B(b,v));a=b[0];if(1!==a.nodeType)break;var w=
        A.get(a)||{};f||(f=w.structural||U.get(a));if(pa(d)||!0===d)a=b.data("$$ngAnimateChildren"),qa(a)&&(d=a);if(f&&!1===d)break;g||(g=B(b,v),g||(a=b.data("$ngAnimatePin"))&&(b=a));c||(c=B(b,l));b=b.parent()}return(!f||d)&&g&&c}function r(a,b,c){c=c||{};c.state=b;a=G(a);a.setAttribute("data-ng-animate",b);c=(b=A.get(a))?za(b,c):c;A.put(a,c)}var A=new s,U=new s,H=null,g=y.$watch(function(){return 0===t.totalPendingRequests},function(a){a&&(g(),y.$$postDigest(function(){y.$$postDigest(function(){null===
    H&&(H=!0)})}))}),w={},k=a.classNameFilter(),C=k?function(a){return k.test(a)}:function(){return!0},Ea=Q(la);return{on:function(a,b,c){b=Z(b);w[a]=w[a]||[];w[a].push({node:b,callback:c})},off:function(a,b,c){function g(a,b,c){var f=Z(b);return a.filter(function(a){return!(a.node===f&&(!c||a.callback===c))})}var f=w[a];f&&(w[a]=1===arguments.length?null:g(f,b,c))},pin:function(a,b){va(ra(a),"element","not an element");va(ra(b),"parentElement","not an element");a.data("$ngAnimatePin",b)},push:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            b,c,g){c=c||{};c.domOperation=g;return u(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!H;else if(ra(a)){var g=G(a),f=U.get(g);1===c?b=!f:(b=!!b)?f&&U.remove(g):U.put(g,!0)}else b=H=!!a;return b}}}]}]).provider("$$animation",["$animateProvider",function(a){function b(a){return a.data("$$animationRunner")}var c=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,e,y,v,z,l){function s(a){function b(a){if(a.processed)return a;
    a.processed=!0;var f=a.domNode,d=f.parentNode;e.put(f,a);for(var h;d;){if(h=e.get(d)){h.processed||(h=b(h));break}d=d.parentNode}(h||c).children.push(a);return a}var c={children:[]},d,e=new z;for(d=0;d<a.length;d++){var l=a[d];e.put(l.domNode,a[d]={domNode:l.domNode,fn:l.fn,children:[]})}for(d=0;d<a.length;d++)b(a[d]);return function(a){var b=[],c=[],d;for(d=0;d<a.children.length;d++)c.push(a.children[d]);a=c.length;var h=0,e=[];for(d=0;d<c.length;d++){var l=c[d];0>=a&&(a=h,h=0,b.push(e),e=[]);e.push(l.fn);
    l.children.forEach(function(a){h++;c.push(a)});a--}e.length&&b.push(e);return b}(c)}var O=[],x=Q(a);return function(t,z,E){function h(a){a=a.hasAttribute("ng-animate-ref")?[a]:a.querySelectorAll("[ng-animate-ref]");var b=[];q(a,function(a){var c=a.getAttribute("ng-animate-ref");c&&c.length&&b.push(a)});return b}function S(a){var b=[],c={};q(a,function(a,g){var d=G(a.element),f=0<=["enter","move"].indexOf(a.event),d=a.structural?h(d):[];if(d.length){var e=f?"to":"from";q(d,function(a){var b=a.getAttribute("ng-animate-ref");
    c[b]=c[b]||{};c[b][e]={animationID:g,element:I(a)}})}else b.push(a)});var d={},f={};q(c,function(c,e){var h=c.from,r=c.to;if(h&&r){var J=a[h.animationID],k=a[r.animationID],B=h.animationID.toString();if(!f[B]){var l=f[B]={structural:!0,beforeStart:function(){J.beforeStart();k.beforeStart()},close:function(){J.close();k.close()},classes:u(J.classes,k.classes),from:J,to:k,anchors:[]};l.classes.length?b.push(l):(b.push(J),b.push(k))}f[B].anchors.push({out:h.element,"in":r.element})}else h=h?h.animationID:
    r.animationID,r=h.toString(),d[r]||(d[r]=!0,b.push(a[h]))});return b}function u(a,b){a=a.split(" ");b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var f=a[d];if("ng-"!==f.substring(0,3))for(var h=0;h<b.length;h++)if(f===b[h]){c.push(f);break}}return c.join(" ")}function J(a){for(var b=c.length-1;0<=b;b--){var d=c[b];if(y.has(d)&&(d=y.get(d)(a)))return d}}function f(a,c){a.from&&a.to?(b(a.from.element).setHost(c),b(a.to.element).setHost(c)):b(a.element).setHost(c)}function B(){var a=b(t);!a||"leave"===
z&&E.$$domOperationFired||a.end()}function p(b){t.off("$destroy",B);t.removeData("$$animationRunner");x(t,E);ea(t,E);E.domOperation();H&&a.removeClass(t,H);t.removeClass("ng-animate");A.complete(!b)}E=ia(E);var r=0<=["enter","move","leave"].indexOf(z),A=new v({end:function(){p()},cancel:function(){p(!0)}});if(!c.length)return p(),A;t.data("$$animationRunner",A);var U=wa(t.attr("class"),wa(E.addClass,E.removeClass)),H=E.tempClasses;H&&(U+=" "+H,E.tempClasses=null);O.push({element:t,classes:U,event:z,
    structural:r,options:E,beforeStart:function(){t.addClass("ng-animate");H&&a.addClass(t,H)},close:p});t.on("$destroy",B);if(1<O.length)return A;e.$$postDigest(function(){var a=[];q(O,function(c){b(c.element)?a.push(c):c.close()});O.length=0;var c=S(a),d=[];q(c,function(a){d.push({domNode:G(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(b(a.anchors?a.from.element||a.to.element:a.element)){var g=J(a);g&&(c=g.start)}c?(c=c(),c.done(function(a){d(!a)}),f(a,c)):d()}})});
    l(s(d))});return A}}]}]).provider("$animateCss",["$animateProvider",function(a){var b=Ca(),c=Ca();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$animate",function(a,e,y,v,z,l,s,O){function x(a,b){var c=a.parentNode;return(c.$$ngAnimateParentKey||(c.$$ngAnimateParentKey=++S))+"-"+a.getAttribute("class")+"-"+b}function t(h,f,l,p){var r;0<b.count(l)&&(r=c.get(l),r||(f=V(f,"-stagger"),e.addClass(h,f),r=Aa(a,h,p),r.animationDuration=Math.max(r.animationDuration,
    0),r.transitionDuration=Math.max(r.transitionDuration,0),e.removeClass(h,f),c.put(l,r)));return r||{}}function la(a){u.push(a);s.waitUntilQuiet(function(){b.flush();c.flush();for(var a=z(),d=0;d<u.length;d++)u[d](a);u.length=0})}function E(c,f,h){f=b.get(h);f||(f=Aa(a,c,Ma),"infinite"===f.animationIterationCount&&(f.animationIterationCount=1));b.put(h,f);c=f;h=c.animationDelay;f=c.transitionDelay;c.maxDelay=h&&f?Math.max(h,f):h||f;c.maxDuration=Math.max(c.animationDuration*c.animationIterationCount,
    c.transitionDuration);return c}var h=Q(e),S=0,u=[];return function(a,c){function d(){r()}function p(){r(!0)}function r(b){if(!(s||S&&z)){s=!0;z=!1;c.$$skipPreparationClasses||e.removeClass(a,aa);e.removeClass(a,$);ma(g,!1);ja(g,!1);q(w,function(a){g.style[a[0]]=""});h(a,c);ea(a,c);if(c.onDone)c.onDone();m&&m.complete(!b)}}function A(a){n.blockTransition&&ja(g,a);n.blockKeyframeAnimation&&ma(g,!!a)}function u(){m=new y({end:d,cancel:p});la(L);r();return{$$willAnimate:!1,start:function(){return m},
    end:d}}function H(){function b(){if(!s){A(!1);q(w,function(a){g.style[a[0]]=a[1]});h(a,c);e.addClass(a,$);if(n.recalculateTimingStyles){ha=g.className+" "+aa;ba=x(g,ha);D=E(g,ha,ba);X=D.maxDelay;I=Math.max(X,0);K=D.maxDuration;if(0===K){r();return}n.hasTransitions=0<D.transitionDuration;n.hasAnimations=0<D.animationDuration}n.applyAnimationDelay&&(X="boolean"!==typeof c.delay&&na(c.delay)?parseFloat(c.delay):X,I=Math.max(X,0),D.animationDelay=X,da=[ka,X+"s"],w.push(da),g.style[da[0]]=da[1]);M=1E3*
    I;Q=1E3*K;if(c.easing){var k,p=c.easing;n.hasTransitions&&(k=N+"TimingFunction",w.push([k,p]),g.style[k]=p);n.hasAnimations&&(k=W+"TimingFunction",w.push([k,p]),g.style[k]=p)}D.transitionDuration&&m.push(sa);D.animationDuration&&m.push(ta);H=Date.now();var u=M+1.5*Q;k=H+u;var p=a.data("$$animateCss")||[],z=!0;if(p.length){var C=p[0];(z=k>C.expectedEndTime)?v.cancel(C.timer):p.push(r)}z&&(u=v(d,u,!1),p[0]={timer:u,expectedEndTime:k},p.push(r),a.data("$$animateCss",p));a.on(m.join(" "),l);ya(a,c)}}
    function d(){var b=a.data("$$animateCss");if(b){for(var c=1;c<b.length;c++)b[c]();a.removeData("$$animateCss")}}function l(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-H,0)>=M&&b>=K&&(S=!0,r())}if(!s)if(g.parentNode){var H,m=[],k=function(a){if(S)z&&a&&(z=!1,r());else if(z=!a,D.animationDuration)if(a=ma(g,z),z)w.push(a);else{var b=w,c=b.indexOf(a);0<=a&&b.splice(c,1)}},p=0<Z&&(D.transitionDuration&&
        0===T.transitionDuration||D.animationDuration&&0===T.animationDuration)&&Math.max(T.animationDelay,T.transitionDelay);p?v(b,Math.floor(p*Z*1E3),!1):b();F.resume=function(){k(!0)};F.pause=function(){k(!1)}}else r()}var g=G(a);if(!g||!g.parentNode||!O.enabled())return u();c=ia(c);var w=[],k=a.attr("class"),C=Fa(c),s,z,S,m,F,I,M,K,Q;if(0===c.duration||!l.animations&&!l.transitions)return u();var ca=c.event&&Y(c.event)?c.event.join(" "):c.event,R="",P="";ca&&c.structural?R=V(ca,"ng-",!0):ca&&(R=ca);c.addClass&&
(P+=V(c.addClass,"-add"));c.removeClass&&(P.length&&(P+=" "),P+=V(c.removeClass,"-remove"));c.applyClassesEarly&&P.length&&h(a,c);var aa=[R,P].join(" ").trim(),ha=k+" "+aa,$=V(aa,"-active"),k=C.to&&0<Object.keys(C.to).length;if(!(0<(c.keyframeStyle||"").length||k||aa))return u();var ba,T;0<c.stagger?(C=parseFloat(c.stagger),T={transitionDelay:C,animationDelay:C,transitionDuration:0,animationDuration:0}):(ba=x(g,ha),T=t(g,aa,ba,Na));c.$$skipPreparationClasses||e.addClass(a,aa);c.transitionStyle&&(C=
    [N,c.transitionStyle],fa(g,C),w.push(C));0<=c.duration&&(C=0<g.style[N].length,C=Ba(c.duration,C),fa(g,C),w.push(C));c.keyframeStyle&&(C=[W,c.keyframeStyle],fa(g,C),w.push(C));var Z=T?0<=c.staggerIndex?c.staggerIndex:b.count(ba):0;(ca=0===Z)&&!c.skipBlocking&&ja(g,9999);var D=E(g,ha,ba),X=D.maxDelay;I=Math.max(X,0);K=D.maxDuration;var n={};n.hasTransitions=0<D.transitionDuration;n.hasAnimations=0<D.animationDuration;n.hasTransitionAll=n.hasTransitions&&"all"==D.transitionProperty;n.applyTransitionDuration=
    k&&(n.hasTransitions&&!n.hasTransitionAll||n.hasAnimations&&!n.hasTransitions);n.applyAnimationDuration=c.duration&&n.hasAnimations;n.applyTransitionDelay=na(c.delay)&&(n.applyTransitionDuration||n.hasTransitions);n.applyAnimationDelay=na(c.delay)&&n.hasAnimations;n.recalculateTimingStyles=0<P.length;if(n.applyTransitionDuration||n.applyAnimationDuration)K=c.duration?parseFloat(c.duration):K,n.applyTransitionDuration&&(n.hasTransitions=!0,D.transitionDuration=K,C=0<g.style[N+"Property"].length,w.push(Ba(K,
    C))),n.applyAnimationDuration&&(n.hasAnimations=!0,D.animationDuration=K,w.push([ua,K+"s"]));if(0===K&&!n.recalculateTimingStyles)return u();if(null!=c.delay){var da=parseFloat(c.delay);n.applyTransitionDelay&&w.push([ga,da+"s"]);n.applyAnimationDelay&&w.push([ka,da+"s"])}null==c.duration&&0<D.transitionDuration&&(n.recalculateTimingStyles=n.recalculateTimingStyles||ca);M=1E3*I;Q=1E3*K;c.skipBlocking||(n.blockTransition=0<D.transitionDuration,n.blockKeyframeAnimation=0<D.animationDuration&&0<T.animationDelay&&
    0===T.animationDuration);xa(a,c);n.blockTransition||n.blockKeyframeAnimation?A(K):c.skipBlocking||ja(g,!1);return{$$willAnimate:!0,end:d,start:function(){if(!s)return F={end:d,cancel:p,resume:null,pause:null},m=new y(F),la(H),m}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(a){a.drivers.push("$$animateCssDriver");this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$$body","$sniffer","$$jqLite",function(a,c,d,e,y,v,z){function l(a){return a.replace(/\bng-\S+\b/g,
    "")}function s(a,b){M(a)&&(a=a.split(" "));M(b)&&(b=b.split(" "));return a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function O(c,e,u){function v(a){var b={},c=G(a).getBoundingClientRect();q(["width","height","top","left"],function(a){var d=c[a];switch(a){case "top":d+=F.scrollTop;break;case "left":d+=F.scrollLeft}b[a]=Math.floor(d)+"px"});return b}function f(){var c=l(u.attr("class")||""),d=s(c,r),c=s(r,c),d=a(p,{to:v(u),addClass:"ng-anchor-in "+d,removeClass:"ng-anchor-out "+c,delay:!0});
    return d.$$willAnimate?d:null}function z(){p.remove();e.removeClass("ng-animate-shim");u.removeClass("ng-animate-shim")}var p=I(G(e).cloneNode(!0)),r=l(p.attr("class")||"");e.addClass("ng-animate-shim");u.addClass("ng-animate-shim");p.addClass("ng-anchor");E.append(p);var A;c=function(){var c=a(p,{addClass:"ng-anchor-out",delay:!0,from:v(e)});return c.$$willAnimate?c:null}();if(!c&&(A=f(),!A))return z();var t=c||A;return{start:function(){function a(){c&&c.end()}var b,c=t.start();c.done(function(){c=
    null;if(!A&&(A=f()))return c=A.start(),c.done(function(){c=null;z();b.complete()}),c;z();b.complete()});return b=new d({end:a,cancel:a})}}}function x(a,b,c,e){var f=t(a,L),l=t(b,L),p=[];q(e,function(a){(a=O(c,a.out,a["in"]))&&p.push(a)});if(f||l||0!==p.length)return{start:function(){function a(){q(b,function(a){a.end()})}var b=[];f&&b.push(f.start());l&&b.push(l.start());q(p,function(a){b.push(a.start())});var c=new d({end:a,cancel:a});d.all(b,function(a){c.complete(a)});return c}}}function t(c){var d=
    c.element,e=c.options||{};c.structural&&(e.event=c.event,e.structural=!0,e.applyClassesEarly=!0,"leave"===c.event&&(e.onDone=e.domOperation));e.preparationClasses&&(e.event=$(e.event,e.preparationClasses));c=a(d,e);return c.$$willAnimate?c:null}if(!v.animations&&!v.transitions)return L;var F=G(y);c=G(e);var E=I(F.parentNode===c?F:c);Q(z);return function(a){return a.from&&a.to?x(a.from,a.to,a.classes,a.anchors):t(a)}}]}]).provider("$$animateJs",["$animateProvider",function(a){this.$get=["$injector",
    "$$AnimateRunner","$$jqLite",function(b,c,d){function e(c){c=Y(c)?c:c.split(" ");for(var d=[],e={},s=0;s<c.length;s++){var q=c[s],y=a.$$registeredAnimations[q];y&&!e[q]&&(d.push(b.get(y)),e[q]=!0)}return d}var y=Q(d);return function(a,b,d,s){function x(){s.domOperation();y(a,s)}function F(a,b,d,e,f){switch(d){case "animate":b=[b,e.from,e.to,f];break;case "setClass":b=[b,E,h,f];break;case "addClass":b=[b,E,f];break;case "removeClass":b=[b,h,f];break;default:b=[b,f]}b.push(e);if(a=a.apply(a,b))if(Da(a.start)&&
        (a=a.start()),a instanceof c)a.done(f);else if(Da(a))return a;return L}function t(a,b,d,e,f){var g=[];q(e,function(e){var h=e[f];h&&g.push(function(){var e,g,f=!1,l=function(a){f||(f=!0,(g||L)(a),e.complete(!a))};e=new c({end:function(){l()},cancel:function(){l(!0)}});g=F(h,a,b,d,function(a){l(!1===a)});return e})});return g}function G(a,b,d,e,f){var g=t(a,b,d,e,f);if(0===g.length){var h,k;"beforeSetClass"===f?(h=t(a,"removeClass",d,e,"beforeRemoveClass"),k=t(a,"addClass",d,e,"beforeAddClass")):"setClass"===
        f&&(h=t(a,"removeClass",d,e,"removeClass"),k=t(a,"addClass",d,e,"addClass"));h&&(g=g.concat(h));k&&(g=g.concat(k))}if(0!==g.length)return function(a){var b=[];g.length&&q(g,function(a){b.push(a())});b.length?c.all(b,a):a();return function(a){q(b,function(b){a?b.cancel():b.end()})}}}3===arguments.length&&oa(d)&&(s=d,d=null);s=ia(s);d||(d=a.attr("class")||"",s.addClass&&(d+=" "+s.addClass),s.removeClass&&(d+=" "+s.removeClass));var E=s.addClass,h=s.removeClass,I=e(d),u,J;if(I.length){var f,B;"leave"==
    b?(B="leave",f="afterLeave"):(B="before"+b.charAt(0).toUpperCase()+b.substr(1),f=b);"enter"!==b&&"move"!==b&&(u=G(a,b,s,I,B));J=G(a,b,s,I,f)}if(u||J)return{start:function(){function b(c){f=!0;x();ea(a,s);h.complete(c)}var d,e=[];u&&e.push(function(a){d=u(a)});e.length?e.push(function(a){x();a(!0)}):x();J&&e.push(function(a){d=J(a)});var f=!1,h=new c({end:function(){f||((d||L)(void 0),b(void 0))},cancel:function(){f||((d||L)(!0),b(!0))}});c.chain(e,b);return h}}}}]}]).provider("$$animateJsDriver",
    ["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver");this.$get=["$$animateJs","$$AnimateRunner",function(a,c){function d(c){return a(c.element,c.event,c.classes,c.options)}return function(a){if(a.from&&a.to){var b=d(a.from),v=d(a.to);if(b||v)return{start:function(){function a(){return function(){q(d,function(a){a.end()})}}var d=[];b&&d.push(b.start());v&&d.push(v.start());c.all(d,function(a){e.complete(a)});var e=new c({end:a(),cancel:a()});return e}}}else return d(a)}}]}])})(window,
    window.angular);
//# sourceMappingURL=angular-animate.min.js.map
/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

    /**
     * @ngdoc module
     * @name ngAria
     * @description
     *
     * The `ngAria` module provides support for common
     * [<abbr title="Accessible Rich Internet Applications">ARIA</abbr>](http://www.w3.org/TR/wai-aria/)
     * attributes that convey state or semantic information about the application for users
     * of assistive technologies, such as screen readers.
     *
     * <div doc-module-components="ngAria"></div>
     *
     * ## Usage
     *
     * For ngAria to do its magic, simply include the module `ngAria` as a dependency. The following
     * directives are supported:
     * `ngModel`, `ngDisabled`, `ngShow`, `ngHide`, `ngClick`, `ngDblClick`, and `ngMessages`.
     *
     * Below is a more detailed breakdown of the attributes handled by ngAria:
     *
     * | Directive                                   | Supported Attributes                                                                   |
     * |---------------------------------------------|----------------------------------------------------------------------------------------|
     * | {@link ng.directive:ngDisabled ngDisabled}  | aria-disabled                                                                          |
     * | {@link ng.directive:ngShow ngShow}          | aria-hidden                                                                            |
     * | {@link ng.directive:ngHide ngHide}          | aria-hidden                                                                            |
     * | {@link ng.directive:ngDblclick ngDblclick}  | tabindex                                                                               |
     * | {@link module:ngMessages ngMessages}        | aria-live                                                                              |
     * | {@link ng.directive:ngModel ngModel}        | aria-checked, aria-valuemin, aria-valuemax, aria-valuenow, aria-invalid, aria-required, input roles |
     * | {@link ng.directive:ngClick ngClick}        | tabindex, keypress event, button role                                                               |
     *
     * Find out more information about each directive by reading the
     * {@link guide/accessibility ngAria Developer Guide}.
     *
     * ##Example
     * Using ngDisabled with ngAria:
     * ```html
     * <md-checkbox ng-disabled="disabled">
     * ```
     * Becomes:
     * ```html
     * <md-checkbox ng-disabled="disabled" aria-disabled="true">
     * ```
     *
     * ##Disabling Attributes
     * It's possible to disable individual attributes added by ngAria with the
     * {@link ngAria.$ariaProvider#config config} method. For more details, see the
     * {@link guide/accessibility Developer Guide}.
     */
    /* global -ngAriaModule */
    var ngAriaModule = angular.module('ngAria', ['ng']).
    provider('$aria', $AriaProvider);

    /**
     * Internal Utilities
     */
    var nodeBlackList = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'DETAILS', 'SUMMARY'];

    var isNodeOneOf = function(elem, nodeTypeArray) {
        if (nodeTypeArray.indexOf(elem[0].nodeName) !== -1) {
            return true;
        }
    };
    /**
     * @ngdoc provider
     * @name $ariaProvider
     *
     * @description
     *
     * Used for configuring the ARIA attributes injected and managed by ngAria.
     *
     * ```js
     * angular.module('myApp', ['ngAria'], function config($ariaProvider) {
 *   $ariaProvider.config({
 *     ariaValue: true,
 *     tabindex: false
 *   });
 * });
     *```
     *
     * ## Dependencies
     * Requires the {@link ngAria} module to be installed.
     *
     */
    function $AriaProvider() {
        var config = {
            ariaHidden: true,
            ariaChecked: true,
            ariaDisabled: true,
            ariaRequired: true,
            ariaInvalid: true,
            ariaMultiline: true,
            ariaValue: true,
            tabindex: true,
            bindKeypress: true,
            bindRoleForClick: true
        };

        /**
         * @ngdoc method
         * @name $ariaProvider#config
         *
         * @param {object} config object to enable/disable specific ARIA attributes
         *
         *  - **ariaHidden** – `{boolean}` – Enables/disables aria-hidden tags
         *  - **ariaChecked** – `{boolean}` – Enables/disables aria-checked tags
         *  - **ariaDisabled** – `{boolean}` – Enables/disables aria-disabled tags
         *  - **ariaRequired** – `{boolean}` – Enables/disables aria-required tags
         *  - **ariaInvalid** – `{boolean}` – Enables/disables aria-invalid tags
         *  - **ariaMultiline** – `{boolean}` – Enables/disables aria-multiline tags
         *  - **ariaValue** – `{boolean}` – Enables/disables aria-valuemin, aria-valuemax and aria-valuenow tags
         *  - **tabindex** – `{boolean}` – Enables/disables tabindex tags
         *  - **bindKeypress** – `{boolean}` – Enables/disables keypress event binding on `&lt;div&gt;` and
         *    `&lt;li&gt;` elements with ng-click
         *  - **bindRoleForClick** – `{boolean}` – Adds role=button to non-interactive elements like `div`
         *    using ng-click, making them more accessible to users of assistive technologies
         *
         * @description
         * Enables/disables various ARIA attributes
         */
        this.config = function(newConfig) {
            config = angular.extend(config, newConfig);
        };

        function watchExpr(attrName, ariaAttr, nodeBlackList, negate) {
            return function(scope, elem, attr) {
                var ariaCamelName = attr.$normalize(ariaAttr);
                if (config[ariaCamelName] && !isNodeOneOf(elem, nodeBlackList) && !attr[ariaCamelName]) {
                    scope.$watch(attr[attrName], function(boolVal) {
                        // ensure boolean value
                        boolVal = negate ? !boolVal : !!boolVal;
                        elem.attr(ariaAttr, boolVal);
                    });
                }
            };
        }
        /**
         * @ngdoc service
         * @name $aria
         *
         * @description
         * @priority 200
         *
         * The $aria service contains helper methods for applying common
         * [ARIA](http://www.w3.org/TR/wai-aria/) attributes to HTML directives.
         *
         * ngAria injects common accessibility attributes that tell assistive technologies when HTML
         * elements are enabled, selected, hidden, and more. To see how this is performed with ngAria,
         * let's review a code snippet from ngAria itself:
         *
         *```js
         * ngAriaModule.directive('ngDisabled', ['$aria', function($aria) {
   *   return $aria.$$watchExpr('ngDisabled', 'aria-disabled');
   * }])
         *```
         * Shown above, the ngAria module creates a directive with the same signature as the
         * traditional `ng-disabled` directive. But this ngAria version is dedicated to
         * solely managing accessibility attributes. The internal `$aria` service is used to watch the
         * boolean attribute `ngDisabled`. If it has not been explicitly set by the developer,
         * `aria-disabled` is injected as an attribute with its value synchronized to the value in
         * `ngDisabled`.
         *
         * Because ngAria hooks into the `ng-disabled` directive, developers do not have to do
         * anything to enable this feature. The `aria-disabled` attribute is automatically managed
         * simply as a silent side-effect of using `ng-disabled` with the ngAria module.
         *
         * The full list of directives that interface with ngAria:
         * * **ngModel**
         * * **ngShow**
         * * **ngHide**
         * * **ngClick**
         * * **ngDblclick**
         * * **ngMessages**
         * * **ngDisabled**
         *
         * Read the {@link guide/accessibility ngAria Developer Guide} for a thorough explanation of each
         * directive.
         *
         *
         * ## Dependencies
         * Requires the {@link ngAria} module to be installed.
         */
        this.$get = function() {
            return {
                config: function(key) {
                    return config[key];
                },
                $$watchExpr: watchExpr
            };
        };
    }


    ngAriaModule.directive('ngShow', ['$aria', function($aria) {
        return $aria.$$watchExpr('ngShow', 'aria-hidden', [], true);
    }])
        .directive('ngHide', ['$aria', function($aria) {
            return $aria.$$watchExpr('ngHide', 'aria-hidden', [], false);
        }])
        .directive('ngModel', ['$aria', function($aria) {

            function shouldAttachAttr(attr, normalizedAttr, elem) {
                return $aria.config(normalizedAttr) && !elem.attr(attr);
            }

            function shouldAttachRole(role, elem) {
                return !elem.attr('role') && (elem.attr('type') === role) && (elem[0].nodeName !== 'INPUT');
            }

            function getShape(attr, elem) {
                var type = attr.type,
                    role = attr.role;

                return ((type || role) === 'checkbox' || role === 'menuitemcheckbox') ? 'checkbox' :
                    ((type || role) === 'radio'    || role === 'menuitemradio') ? 'radio' :
                        (type === 'range'              || role === 'progressbar' || role === 'slider') ? 'range' :
                            (type || role) === 'textbox'   || elem[0].nodeName === 'TEXTAREA' ? 'multiline' : '';
            }

            return {
                restrict: 'A',
                require: '?ngModel',
                priority: 200, //Make sure watches are fired after any other directives that affect the ngModel value
                compile: function(elem, attr) {
                    var shape = getShape(attr, elem);

                    return {
                        pre: function(scope, elem, attr, ngModel) {
                            if (shape === 'checkbox' && attr.type !== 'checkbox') {
                                //Use the input[checkbox] $isEmpty implementation for elements with checkbox roles
                                ngModel.$isEmpty = function(value) {
                                    return value === false;
                                };
                            }
                        },
                        post: function(scope, elem, attr, ngModel) {
                            var needsTabIndex = shouldAttachAttr('tabindex', 'tabindex', elem);

                            function ngAriaWatchModelValue() {
                                return ngModel.$modelValue;
                            }

                            function getRadioReaction() {
                                if (needsTabIndex) {
                                    needsTabIndex = false;
                                    return function ngAriaRadioReaction(newVal) {
                                        var boolVal = (attr.value == ngModel.$viewValue);
                                        elem.attr('aria-checked', boolVal);
                                        elem.attr('tabindex', 0 - !boolVal);
                                    };
                                } else {
                                    return function ngAriaRadioReaction(newVal) {
                                        elem.attr('aria-checked', (attr.value == ngModel.$viewValue));
                                    };
                                }
                            }

                            function ngAriaCheckboxReaction() {
                                elem.attr('aria-checked', !ngModel.$isEmpty(ngModel.$viewValue));
                            }

                            switch (shape) {
                                case 'radio':
                                case 'checkbox':
                                    if (shouldAttachRole(shape, elem)) {
                                        elem.attr('role', shape);
                                    }
                                    if (shouldAttachAttr('aria-checked', 'ariaChecked', elem)) {
                                        scope.$watch(ngAriaWatchModelValue, shape === 'radio' ?
                                            getRadioReaction() : ngAriaCheckboxReaction);
                                    }
                                    if (needsTabIndex) {
                                        elem.attr('tabindex', 0);
                                    }
                                    break;
                                case 'range':
                                    if (shouldAttachRole(shape, elem)) {
                                        elem.attr('role', 'slider');
                                    }
                                    if ($aria.config('ariaValue')) {
                                        var needsAriaValuemin = !elem.attr('aria-valuemin') &&
                                            (attr.hasOwnProperty('min') || attr.hasOwnProperty('ngMin'));
                                        var needsAriaValuemax = !elem.attr('aria-valuemax') &&
                                            (attr.hasOwnProperty('max') || attr.hasOwnProperty('ngMax'));
                                        var needsAriaValuenow = !elem.attr('aria-valuenow');

                                        if (needsAriaValuemin) {
                                            attr.$observe('min', function ngAriaValueMinReaction(newVal) {
                                                elem.attr('aria-valuemin', newVal);
                                            });
                                        }
                                        if (needsAriaValuemax) {
                                            attr.$observe('max', function ngAriaValueMinReaction(newVal) {
                                                elem.attr('aria-valuemax', newVal);
                                            });
                                        }
                                        if (needsAriaValuenow) {
                                            scope.$watch(ngAriaWatchModelValue, function ngAriaValueNowReaction(newVal) {
                                                elem.attr('aria-valuenow', newVal);
                                            });
                                        }
                                    }
                                    if (needsTabIndex) {
                                        elem.attr('tabindex', 0);
                                    }
                                    break;
                                case 'multiline':
                                    if (shouldAttachAttr('aria-multiline', 'ariaMultiline', elem)) {
                                        elem.attr('aria-multiline', true);
                                    }
                                    break;
                            }

                            if (ngModel.$validators.required && shouldAttachAttr('aria-required', 'ariaRequired', elem)) {
                                scope.$watch(function ngAriaRequiredWatch() {
                                    return ngModel.$error.required;
                                }, function ngAriaRequiredReaction(newVal) {
                                    elem.attr('aria-required', !!newVal);
                                });
                            }

                            if (shouldAttachAttr('aria-invalid', 'ariaInvalid', elem)) {
                                scope.$watch(function ngAriaInvalidWatch() {
                                    return ngModel.$invalid;
                                }, function ngAriaInvalidReaction(newVal) {
                                    elem.attr('aria-invalid', !!newVal);
                                });
                            }
                        }
                    };
                }
            };
        }])
        .directive('ngDisabled', ['$aria', function($aria) {
            return $aria.$$watchExpr('ngDisabled', 'aria-disabled', []);
        }])
        .directive('ngMessages', function() {
            return {
                restrict: 'A',
                require: '?ngMessages',
                link: function(scope, elem, attr, ngMessages) {
                    if (!elem.attr('aria-live')) {
                        elem.attr('aria-live', 'assertive');
                    }
                }
            };
        })
        .directive('ngClick',['$aria', '$parse', function($aria, $parse) {
            return {
                restrict: 'A',
                compile: function(elem, attr) {
                    var fn = $parse(attr.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);
                    return function(scope, elem, attr) {

                        if (!isNodeOneOf(elem, nodeBlackList)) {

                            if ($aria.config('bindRoleForClick') && !elem.attr('role')) {
                                elem.attr('role', 'button');
                            }

                            if ($aria.config('tabindex') && !elem.attr('tabindex')) {
                                elem.attr('tabindex', 0);
                            }

                            if ($aria.config('bindKeypress') && !attr.ngKeypress) {
                                elem.on('keypress', function(event) {
                                    var keyCode = event.which || event.keyCode;
                                    if (keyCode === 32 || keyCode === 13) {
                                        scope.$apply(callback);
                                    }

                                    function callback() {
                                        fn(scope, { $event: event });
                                    }
                                });
                            }
                        }
                    };
                }
            };
        }])
        .directive('ngDblclick', ['$aria', function($aria) {
            return function(scope, elem, attr) {
                if ($aria.config('tabindex') && !elem.attr('tabindex') && !isNodeOneOf(elem, nodeBlackList)) {
                    elem.attr('tabindex', 0);
                }
            };
        }]);


})(window, window.angular);

/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

    /**
     * @ngdoc module
     * @name ngCookies
     * @description
     *
     * # ngCookies
     *
     * The `ngCookies` module provides a convenient wrapper for reading and writing browser cookies.
     *
     *
     * <div doc-module-components="ngCookies"></div>
     *
     * See {@link ngCookies.$cookies `$cookies`} for usage.
     */


    angular.module('ngCookies', ['ng']).
    /**
     * @ngdoc provider
     * @name $cookiesProvider
     * @description
     * Use `$cookiesProvider` to change the default behavior of the {@link ngCookies.$cookies $cookies} service.
     * */
    provider('$cookies', [function $CookiesProvider() {
        /**
         * @ngdoc property
         * @name $cookiesProvider#defaults
         * @description
         *
         * Object containing default options to pass when setting cookies.
         *
         * The object may have following properties:
         *
         * - **path** - `{string}` - The cookie will be available only for this path and its
         *   sub-paths. By default, this would be the URL that appears in your base tag.
         * - **domain** - `{string}` - The cookie will be available only for this domain and
         *   its sub-domains. For obvious security reasons the user agent will not accept the
         *   cookie if the current domain is not a sub domain or equals to the requested domain.
         * - **expires** - `{string|Date}` - String of the form "Wdy, DD Mon YYYY HH:MM:SS GMT"
         *   or a Date object indicating the exact date/time this cookie will expire.
         * - **secure** - `{boolean}` - The cookie will be available only in secured connection.
         *
         * Note: by default the address that appears in your `<base>` tag will be used as path.
         * This is important so that cookies will be visible for all routes in case html5mode is enabled
         *
         **/
        var defaults = this.defaults = {};

        function calcOptions(options) {
            return options ? angular.extend({}, defaults, options) : defaults;
        }

        /**
         * @ngdoc service
         * @name $cookies
         *
         * @description
         * Provides read/write access to browser's cookies.
         *
         * <div class="alert alert-info">
         * Up until Angular 1.3, `$cookies` exposed properties that represented the
         * current browser cookie values. In version 1.4, this behavior has changed, and
         * `$cookies` now provides a standard api of getters, setters etc.
         * </div>
         *
         * Requires the {@link ngCookies `ngCookies`} module to be installed.
         *
         * @example
         *
         * ```js
         * angular.module('cookiesExample', ['ngCookies'])
         *   .controller('ExampleController', ['$cookies', function($cookies) {
     *     // Retrieving a cookie
     *     var favoriteCookie = $cookies.get('myFavorite');
     *     // Setting a cookie
     *     $cookies.put('myFavorite', 'oatmeal');
     *   }]);
         * ```
         */
        this.$get = ['$$cookieReader', '$$cookieWriter', function($$cookieReader, $$cookieWriter) {
            return {
                /**
                 * @ngdoc method
                 * @name $cookies#get
                 *
                 * @description
                 * Returns the value of given cookie key
                 *
                 * @param {string} key Id to use for lookup.
                 * @returns {string} Raw cookie value.
                 */
                get: function(key) {
                    return $$cookieReader()[key];
                },

                /**
                 * @ngdoc method
                 * @name $cookies#getObject
                 *
                 * @description
                 * Returns the deserialized value of given cookie key
                 *
                 * @param {string} key Id to use for lookup.
                 * @returns {Object} Deserialized cookie value.
                 */
                getObject: function(key) {
                    var value = this.get(key);
                    return value ? angular.fromJson(value) : value;
                },

                /**
                 * @ngdoc method
                 * @name $cookies#getAll
                 *
                 * @description
                 * Returns a key value object with all the cookies
                 *
                 * @returns {Object} All cookies
                 */
                getAll: function() {
                    return $$cookieReader();
                },

                /**
                 * @ngdoc method
                 * @name $cookies#put
                 *
                 * @description
                 * Sets a value for given cookie key
                 *
                 * @param {string} key Id for the `value`.
                 * @param {string} value Raw value to be stored.
                 * @param {Object=} options Options object.
                 *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
                 */
                put: function(key, value, options) {
                    $$cookieWriter(key, value, calcOptions(options));
                },

                /**
                 * @ngdoc method
                 * @name $cookies#putObject
                 *
                 * @description
                 * Serializes and sets a value for given cookie key
                 *
                 * @param {string} key Id for the `value`.
                 * @param {Object} value Value to be stored.
                 * @param {Object=} options Options object.
                 *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
                 */
                putObject: function(key, value, options) {
                    this.put(key, angular.toJson(value), options);
                },

                /**
                 * @ngdoc method
                 * @name $cookies#remove
                 *
                 * @description
                 * Remove given cookie
                 *
                 * @param {string} key Id of the key-value pair to delete.
                 * @param {Object=} options Options object.
                 *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}
                 */
                remove: function(key, options) {
                    $$cookieWriter(key, undefined, calcOptions(options));
                }
            };
        }];
    }]);

    angular.module('ngCookies').
    /**
     * @ngdoc service
     * @name $cookieStore
     * @deprecated
     * @requires $cookies
     *
     * @description
     * Provides a key-value (string-object) storage, that is backed by session cookies.
     * Objects put or retrieved from this storage are automatically serialized or
     * deserialized by angular's toJson/fromJson.
     *
     * Requires the {@link ngCookies `ngCookies`} module to be installed.
     *
     * <div class="alert alert-danger">
     * **Note:** The $cookieStore service is **deprecated**.
     * Please use the {@link ngCookies.$cookies `$cookies`} service instead.
     * </div>
     *
     * @example
     *
     * ```js
     * angular.module('cookieStoreExample', ['ngCookies'])
     *   .controller('ExampleController', ['$cookieStore', function($cookieStore) {
 *     // Put cookie
 *     $cookieStore.put('myFavorite','oatmeal');
 *     // Get cookie
 *     var favoriteCookie = $cookieStore.get('myFavorite');
 *     // Removing a cookie
 *     $cookieStore.remove('myFavorite');
 *   }]);
     * ```
     */
    factory('$cookieStore', ['$cookies', function($cookies) {

        return {
            /**
             * @ngdoc method
             * @name $cookieStore#get
             *
             * @description
             * Returns the value of given cookie key
             *
             * @param {string} key Id to use for lookup.
             * @returns {Object} Deserialized cookie value, undefined if the cookie does not exist.
             */
            get: function(key) {
                return $cookies.getObject(key);
            },

            /**
             * @ngdoc method
             * @name $cookieStore#put
             *
             * @description
             * Sets a value for given cookie key
             *
             * @param {string} key Id for the `value`.
             * @param {Object} value Value to be stored.
             */
            put: function(key, value) {
                $cookies.putObject(key, value);
            },

            /**
             * @ngdoc method
             * @name $cookieStore#remove
             *
             * @description
             * Remove given cookie
             *
             * @param {string} key Id of the key-value pair to delete.
             */
            remove: function(key) {
                $cookies.remove(key);
            }
        };

    }]);

    /**
     * @name $$cookieWriter
     * @requires $document
     *
     * @description
     * This is a private service for writing cookies
     *
     * @param {string} name Cookie name
     * @param {string=} value Cookie value (if undefined, cookie will be deleted)
     * @param {Object=} options Object with options that need to be stored for the cookie.
     */
    function $$CookieWriter($document, $log, $browser) {
        var cookiePath = $browser.baseHref();
        var rawDocument = $document[0];

        function buildCookieString(name, value, options) {
            var path, expires;
            options = options || {};
            expires = options.expires;
            path = angular.isDefined(options.path) ? options.path : cookiePath;
            if (angular.isUndefined(value)) {
                expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
                value = '';
            }
            if (angular.isString(expires)) {
                expires = new Date(expires);
            }

            var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            str += path ? ';path=' + path : '';
            str += options.domain ? ';domain=' + options.domain : '';
            str += expires ? ';expires=' + expires.toUTCString() : '';
            str += options.secure ? ';secure' : '';

            // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
            // - 300 cookies
            // - 20 cookies per unique domain
            // - 4096 bytes per cookie
            var cookieLength = str.length + 1;
            if (cookieLength > 4096) {
                $log.warn("Cookie '" + name +
                    "' possibly not set or overflowed because it was too large (" +
                    cookieLength + " > 4096 bytes)!");
            }

            return str;
        }

        return function(name, value, options) {
            rawDocument.cookie = buildCookieString(name, value, options);
        };
    }

    $$CookieWriter.$inject = ['$document', '$log', '$browser'];

    angular.module('ngCookies').provider('$$cookieWriter', function $$CookieWriterProvider() {
        this.$get = $$CookieWriter;
    });


})(window, window.angular);

/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

    /* jshint ignore:start */
// this code is in the core, but not in angular-messages.js
    var isArray = angular.isArray;
    var forEach = angular.forEach;
    var isString = angular.isString;
    var jqLite = angular.element;
    /* jshint ignore:end */

    /**
     * @ngdoc module
     * @name ngMessages
     * @description
     *
     * The `ngMessages` module provides enhanced support for displaying messages within templates
     * (typically within forms or when rendering message objects that return key/value data).
     * Instead of relying on JavaScript code and/or complex ng-if statements within your form template to
     * show and hide error messages specific to the state of an input field, the `ngMessages` and
     * `ngMessage` directives are designed to handle the complexity, inheritance and priority
     * sequencing based on the order of how the messages are defined in the template.
     *
     * Currently, the ngMessages module only contains the code for the `ngMessages`, `ngMessagesInclude`
     * `ngMessage` and `ngMessageExp` directives.
     *
     * # Usage
     * The `ngMessages` directive listens on a key/value collection which is set on the ngMessages attribute.
     * Since the {@link ngModel ngModel} directive exposes an `$error` object, this error object can be
     * used with `ngMessages` to display control error messages in an easier way than with just regular angular
     * template directives.
     *
     * ```html
     * <form name="myForm">
     *   <label>
     *     Enter text:
     *     <input type="text" ng-model="field" name="myField" required minlength="5" />
     *   </label>
     *   <div ng-messages="myForm.myField.$error" role="alert">
     *     <div ng-message="required">You did not enter a field</div>
     *     <div ng-message="minlength, maxlength">
     *       Your email must be between 5 and 100 characters long
     *     </div>
     *   </div>
     * </form>
     * ```
     *
     * Now whatever key/value entries are present within the provided object (in this case `$error`) then
     * the ngMessages directive will render the inner first ngMessage directive (depending if the key values
     * match the attribute value present on each ngMessage directive). In other words, if your errors
     * object contains the following data:
     *
     * ```javascript
     * <!-- keep in mind that ngModel automatically sets these error flags -->
     * myField.$error = { minlength : true, required : true };
     * ```
     *
     * Then the `required` message will be displayed first. When required is false then the `minlength` message
     * will be displayed right after (since these messages are ordered this way in the template HTML code).
     * The prioritization of each message is determined by what order they're present in the DOM.
     * Therefore, instead of having custom JavaScript code determine the priority of what errors are
     * present before others, the presentation of the errors are handled within the template.
     *
     * By default, ngMessages will only display one error at a time. However, if you wish to display all
     * messages then the `ng-messages-multiple` attribute flag can be used on the element containing the
     * ngMessages directive to make this happen.
     *
     * ```html
     * <!-- attribute-style usage -->
     * <div ng-messages="myForm.myField.$error" ng-messages-multiple>...</div>
     *
     * <!-- element-style usage -->
     * <ng-messages for="myForm.myField.$error" multiple>...</ng-messages>
     * ```
     *
     * ## Reusing and Overriding Messages
     * In addition to prioritization, ngMessages also allows for including messages from a remote or an inline
     * template. This allows for generic collection of messages to be reused across multiple parts of an
     * application.
     *
     * ```html
     * <script type="text/ng-template" id="error-messages">
     *   <div ng-message="required">This field is required</div>
     *   <div ng-message="minlength">This field is too short</div>
     * </script>
     *
     * <div ng-messages="myForm.myField.$error" role="alert">
     *   <div ng-messages-include="error-messages"></div>
     * </div>
     * ```
     *
     * However, including generic messages may not be useful enough to match all input fields, therefore,
     * `ngMessages` provides the ability to override messages defined in the remote template by redefining
     * them within the directive container.
     *
     * ```html
     * <!-- a generic template of error messages known as "my-custom-messages" -->
     * <script type="text/ng-template" id="my-custom-messages">
     *   <div ng-message="required">This field is required</div>
     *   <div ng-message="minlength">This field is too short</div>
     * </script>
     *
     * <form name="myForm">
     *   <label>
     *     Email address
     *     <input type="email"
     *            id="email"
     *            name="myEmail"
     *            ng-model="email"
     *            minlength="5"
     *            required />
     *   </label>
     *   <!-- any ng-message elements that appear BEFORE the ng-messages-include will
     *        override the messages present in the ng-messages-include template -->
     *   <div ng-messages="myForm.myEmail.$error" role="alert">
     *     <!-- this required message has overridden the template message -->
     *     <div ng-message="required">You did not enter your email address</div>
     *
     *     <!-- this is a brand new message and will appear last in the prioritization -->
     *     <div ng-message="email">Your email address is invalid</div>
     *
     *     <!-- and here are the generic error messages -->
     *     <div ng-messages-include="my-custom-messages"></div>
     *   </div>
     * </form>
     * ```
     *
     * In the example HTML code above the message that is set on required will override the corresponding
     * required message defined within the remote template. Therefore, with particular input fields (such
     * email addresses, date fields, autocomplete inputs, etc...), specialized error messages can be applied
     * while more generic messages can be used to handle other, more general input errors.
     *
     * ## Dynamic Messaging
     * ngMessages also supports using expressions to dynamically change key values. Using arrays and
     * repeaters to list messages is also supported. This means that the code below will be able to
     * fully adapt itself and display the appropriate message when any of the expression data changes:
     *
     * ```html
     * <form name="myForm">
     *   <label>
     *     Email address
     *     <input type="email"
     *            name="myEmail"
     *            ng-model="email"
     *            minlength="5"
     *            required />
     *   </label>
     *   <div ng-messages="myForm.myEmail.$error" role="alert">
     *     <div ng-message="required">You did not enter your email address</div>
     *     <div ng-repeat="errorMessage in errorMessages">
     *       <!-- use ng-message-exp for a message whose key is given by an expression -->
     *       <div ng-message-exp="errorMessage.type">{{ errorMessage.text }}</div>
     *     </div>
     *   </div>
     * </form>
     * ```
     *
     * The `errorMessage.type` expression can be a string value or it can be an array so
     * that multiple errors can be associated with a single error message:
     *
     * ```html
     *   <label>
     *     Email address
     *     <input type="email"
     *            ng-model="data.email"
     *            name="myEmail"
     *            ng-minlength="5"
     *            ng-maxlength="100"
     *            required />
     *   </label>
     *   <div ng-messages="myForm.myEmail.$error" role="alert">
     *     <div ng-message-exp="'required'">You did not enter your email address</div>
     *     <div ng-message-exp="['minlength', 'maxlength']">
     *       Your email must be between 5 and 100 characters long
     *     </div>
     *   </div>
     * ```
     *
     * Feel free to use other structural directives such as ng-if and ng-switch to further control
     * what messages are active and when. Be careful, if you place ng-message on the same element
     * as these structural directives, Angular may not be able to determine if a message is active
     * or not. Therefore it is best to place the ng-message on a child element of the structural
     * directive.
     *
     * ```html
     * <div ng-messages="myForm.myEmail.$error" role="alert">
     *   <div ng-if="showRequiredError">
     *     <div ng-message="required">Please enter something</div>
     *   </div>
     * </div>
     * ```
     *
     * ## Animations
     * If the `ngAnimate` module is active within the application then the `ngMessages`, `ngMessage` and
     * `ngMessageExp` directives will trigger animations whenever any messages are added and removed from
     * the DOM by the `ngMessages` directive.
     *
     * Whenever the `ngMessages` directive contains one or more visible messages then the `.ng-active` CSS
     * class will be added to the element. The `.ng-inactive` CSS class will be applied when there are no
     * messages present. Therefore, CSS transitions and keyframes as well as JavaScript animations can
     * hook into the animations whenever these classes are added/removed.
     *
     * Let's say that our HTML code for our messages container looks like so:
     *
     * ```html
     * <div ng-messages="myMessages" class="my-messages" role="alert">
     *   <div ng-message="alert" class="some-message">...</div>
     *   <div ng-message="fail" class="some-message">...</div>
     * </div>
     * ```
     *
     * Then the CSS animation code for the message container looks like so:
     *
     * ```css
     * .my-messages {
 *   transition:1s linear all;
 * }
     * .my-messages.ng-active {
 *   // messages are visible
 * }
     * .my-messages.ng-inactive {
 *   // messages are hidden
 * }
     * ```
     *
     * Whenever an inner message is attached (becomes visible) or removed (becomes hidden) then the enter
     * and leave animation is triggered for each particular element bound to the `ngMessage` directive.
     *
     * Therefore, the CSS code for the inner messages looks like so:
     *
     * ```css
     * .some-message {
 *   transition:1s linear all;
 * }
     *
     * .some-message.ng-enter {}
     * .some-message.ng-enter.ng-enter-active {}
     *
     * .some-message.ng-leave {}
     * .some-message.ng-leave.ng-leave-active {}
     * ```
     *
     * {@link ngAnimate Click here} to learn how to use JavaScript animations or to learn more about ngAnimate.
     */
    angular.module('ngMessages', [])

    /**
     * @ngdoc directive
     * @module ngMessages
     * @name ngMessages
     * @restrict AE
     *
     * @description
     * `ngMessages` is a directive that is designed to show and hide messages based on the state
     * of a key/value object that it listens on. The directive itself complements error message
     * reporting with the `ngModel` $error object (which stores a key/value state of validation errors).
     *
     * `ngMessages` manages the state of internal messages within its container element. The internal
     * messages use the `ngMessage` directive and will be inserted/removed from the page depending
     * on if they're present within the key/value object. By default, only one message will be displayed
     * at a time and this depends on the prioritization of the messages within the template. (This can
     * be changed by using the `ng-messages-multiple` or `multiple` attribute on the directive container.)
     *
     * A remote template can also be used to promote message reusability and messages can also be
     * overridden.
     *
     * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
     *
     * @usage
     * ```html
     * <!-- using attribute directives -->
     * <ANY ng-messages="expression" role="alert">
     *   <ANY ng-message="stringValue">...</ANY>
     *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>
     *   <ANY ng-message-exp="expressionValue">...</ANY>
     * </ANY>
     *
     * <!-- or by using element directives -->
     * <ng-messages for="expression" role="alert">
     *   <ng-message when="stringValue">...</ng-message>
     *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>
     *   <ng-message when-exp="expressionValue">...</ng-message>
     * </ng-messages>
     * ```
     *
     * @param {string} ngMessages an angular expression evaluating to a key/value object
     *                 (this is typically the $error object on an ngModel instance).
     * @param {string=} ngMessagesMultiple|multiple when set, all messages will be displayed with true
     *
     * @example
     * <example name="ngMessages-directive" module="ngMessagesExample"
     *          deps="angular-messages.js"
     *          animations="true" fixBase="true">
     *   <file name="index.html">
     *     <form name="myForm">
     *       <label>
     *         Enter your name:
     *         <input type="text"
     *                name="myName"
     *                ng-model="name"
     *                ng-minlength="5"
     *                ng-maxlength="20"
     *                required />
     *       </label>
     *       <pre>myForm.myName.$error = {{ myForm.myName.$error | json }}</pre>
     *
     *       <div ng-messages="myForm.myName.$error" style="color:maroon" role="alert">
     *         <div ng-message="required">You did not enter a field</div>
     *         <div ng-message="minlength">Your field is too short</div>
     *         <div ng-message="maxlength">Your field is too long</div>
     *       </div>
     *     </form>
     *   </file>
     *   <file name="script.js">
     *     angular.module('ngMessagesExample', ['ngMessages']);
     *   </file>
     * </example>
     */
        .directive('ngMessages', ['$animate', function($animate) {
            var ACTIVE_CLASS = 'ng-active';
            var INACTIVE_CLASS = 'ng-inactive';

            return {
                require: 'ngMessages',
                restrict: 'AE',
                controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {
                    var ctrl = this;
                    var latestKey = 0;
                    var nextAttachId = 0;

                    this.getAttachId = function getAttachId() { return nextAttachId++; };

                    var messages = this.messages = {};
                    var renderLater, cachedCollection;

                    this.render = function(collection) {
                        collection = collection || {};

                        renderLater = false;
                        cachedCollection = collection;

                        // this is true if the attribute is empty or if the attribute value is truthy
                        var multiple = isAttrTruthy($scope, $attrs.ngMessagesMultiple) ||
                            isAttrTruthy($scope, $attrs.multiple);

                        var unmatchedMessages = [];
                        var matchedKeys = {};
                        var messageItem = ctrl.head;
                        var messageFound = false;
                        var totalMessages = 0;

                        // we use != instead of !== to allow for both undefined and null values
                        while (messageItem != null) {
                            totalMessages++;
                            var messageCtrl = messageItem.message;

                            var messageUsed = false;
                            if (!messageFound) {
                                forEach(collection, function(value, key) {
                                    if (!messageUsed && truthy(value) && messageCtrl.test(key)) {
                                        // this is to prevent the same error name from showing up twice
                                        if (matchedKeys[key]) return;
                                        matchedKeys[key] = true;

                                        messageUsed = true;
                                        messageCtrl.attach();
                                    }
                                });
                            }

                            if (messageUsed) {
                                // unless we want to display multiple messages then we should
                                // set a flag here to avoid displaying the next message in the list
                                messageFound = !multiple;
                            } else {
                                unmatchedMessages.push(messageCtrl);
                            }

                            messageItem = messageItem.next;
                        }

                        forEach(unmatchedMessages, function(messageCtrl) {
                            messageCtrl.detach();
                        });

                        unmatchedMessages.length !== totalMessages
                            ? $animate.setClass($element, ACTIVE_CLASS, INACTIVE_CLASS)
                            : $animate.setClass($element, INACTIVE_CLASS, ACTIVE_CLASS);
                    };

                    $scope.$watchCollection($attrs.ngMessages || $attrs['for'], ctrl.render);

                    this.reRender = function() {
                        if (!renderLater) {
                            renderLater = true;
                            $scope.$evalAsync(function() {
                                if (renderLater) {
                                    cachedCollection && ctrl.render(cachedCollection);
                                }
                            });
                        }
                    };

                    this.register = function(comment, messageCtrl) {
                        var nextKey = latestKey.toString();
                        messages[nextKey] = {
                            message: messageCtrl
                        };
                        insertMessageNode($element[0], comment, nextKey);
                        comment.$$ngMessageNode = nextKey;
                        latestKey++;

                        ctrl.reRender();
                    };

                    this.deregister = function(comment) {
                        var key = comment.$$ngMessageNode;
                        delete comment.$$ngMessageNode;
                        removeMessageNode($element[0], comment, key);
                        delete messages[key];
                        ctrl.reRender();
                    };

                    function findPreviousMessage(parent, comment) {
                        var prevNode = comment;
                        var parentLookup = [];
                        while (prevNode && prevNode !== parent) {
                            var prevKey = prevNode.$$ngMessageNode;
                            if (prevKey && prevKey.length) {
                                return messages[prevKey];
                            }

                            // dive deeper into the DOM and examine its children for any ngMessage
                            // comments that may be in an element that appears deeper in the list
                            if (prevNode.childNodes.length && parentLookup.indexOf(prevNode) == -1) {
                                parentLookup.push(prevNode);
                                prevNode = prevNode.childNodes[prevNode.childNodes.length - 1];
                            } else {
                                prevNode = prevNode.previousSibling || prevNode.parentNode;
                            }
                        }
                    }

                    function insertMessageNode(parent, comment, key) {
                        var messageNode = messages[key];
                        if (!ctrl.head) {
                            ctrl.head = messageNode;
                        } else {
                            var match = findPreviousMessage(parent, comment);
                            if (match) {
                                messageNode.next = match.next;
                                match.next = messageNode;
                            } else {
                                messageNode.next = ctrl.head;
                                ctrl.head = messageNode;
                            }
                        }
                    }

                    function removeMessageNode(parent, comment, key) {
                        var messageNode = messages[key];

                        var match = findPreviousMessage(parent, comment);
                        if (match) {
                            match.next = messageNode.next;
                        } else {
                            ctrl.head = messageNode.next;
                        }
                    }
                }]
            };

            function isAttrTruthy(scope, attr) {
                return (isString(attr) && attr.length === 0) || //empty attribute
                    truthy(scope.$eval(attr));
            }

            function truthy(val) {
                return isString(val) ? val.length : !!val;
            }
        }])

        /**
         * @ngdoc directive
         * @name ngMessagesInclude
         * @restrict AE
         * @scope
         *
         * @description
         * `ngMessagesInclude` is a directive with the purpose to import existing ngMessage template
         * code from a remote template and place the downloaded template code into the exact spot
         * that the ngMessagesInclude directive is placed within the ngMessages container. This allows
         * for a series of pre-defined messages to be reused and also allows for the developer to
         * determine what messages are overridden due to the placement of the ngMessagesInclude directive.
         *
         * @usage
         * ```html
         * <!-- using attribute directives -->
         * <ANY ng-messages="expression" role="alert">
         *   <ANY ng-messages-include="remoteTplString">...</ANY>
         * </ANY>
         *
         * <!-- or by using element directives -->
         * <ng-messages for="expression" role="alert">
         *   <ng-messages-include src="expressionValue1">...</ng-messages-include>
         * </ng-messages>
         * ```
         *
         * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
         *
         * @param {string} ngMessagesInclude|src a string value corresponding to the remote template.
         */
        .directive('ngMessagesInclude',
            ['$templateRequest', '$document', '$compile', function($templateRequest, $document, $compile) {

                return {
                    restrict: 'AE',
                    require: '^^ngMessages', // we only require this for validation sake
                    link: function($scope, element, attrs) {
                        var src = attrs.ngMessagesInclude || attrs.src;
                        $templateRequest(src).then(function(html) {
                            $compile(html)($scope, function(contents) {
                                element.after(contents);

                                // the anchor is placed for debugging purposes
                                var anchor = jqLite($document[0].createComment(' ngMessagesInclude: ' + src + ' '));
                                element.after(anchor);

                                // we don't want to pollute the DOM anymore by keeping an empty directive element
                                element.remove();
                            });
                        });
                    }
                };
            }])

        /**
         * @ngdoc directive
         * @name ngMessage
         * @restrict AE
         * @scope
         *
         * @description
         * `ngMessage` is a directive with the purpose to show and hide a particular message.
         * For `ngMessage` to operate, a parent `ngMessages` directive on a parent DOM element
         * must be situated since it determines which messages are visible based on the state
         * of the provided key/value map that `ngMessages` listens on.
         *
         * More information about using `ngMessage` can be found in the
         * {@link module:ngMessages `ngMessages` module documentation}.
         *
         * @usage
         * ```html
         * <!-- using attribute directives -->
         * <ANY ng-messages="expression" role="alert">
         *   <ANY ng-message="stringValue">...</ANY>
         *   <ANY ng-message="stringValue1, stringValue2, ...">...</ANY>
         * </ANY>
         *
         * <!-- or by using element directives -->
         * <ng-messages for="expression" role="alert">
         *   <ng-message when="stringValue">...</ng-message>
         *   <ng-message when="stringValue1, stringValue2, ...">...</ng-message>
         * </ng-messages>
         * ```
         *
         * @param {expression} ngMessage|when a string value corresponding to the message key.
         */
        .directive('ngMessage', ngMessageDirectiveFactory('AE'))


        /**
         * @ngdoc directive
         * @name ngMessageExp
         * @restrict AE
         * @scope
         *
         * @description
         * `ngMessageExp` is a directive with the purpose to show and hide a particular message.
         * For `ngMessageExp` to operate, a parent `ngMessages` directive on a parent DOM element
         * must be situated since it determines which messages are visible based on the state
         * of the provided key/value map that `ngMessages` listens on.
         *
         * @usage
         * ```html
         * <!-- using attribute directives -->
         * <ANY ng-messages="expression">
         *   <ANY ng-message-exp="expressionValue">...</ANY>
         * </ANY>
         *
         * <!-- or by using element directives -->
         * <ng-messages for="expression">
         *   <ng-message when-exp="expressionValue">...</ng-message>
         * </ng-messages>
         * ```
         *
         * {@link module:ngMessages Click here} to learn more about `ngMessages` and `ngMessage`.
         *
         * @param {expression} ngMessageExp|whenExp an expression value corresponding to the message key.
         */
        .directive('ngMessageExp', ngMessageDirectiveFactory('A'));

    function ngMessageDirectiveFactory(restrict) {
        return ['$animate', function($animate) {
            return {
                restrict: 'AE',
                transclude: 'element',
                terminal: true,
                require: '^^ngMessages',
                link: function(scope, element, attrs, ngMessagesCtrl, $transclude) {
                    var commentNode = element[0];

                    var records;
                    var staticExp = attrs.ngMessage || attrs.when;
                    var dynamicExp = attrs.ngMessageExp || attrs.whenExp;
                    var assignRecords = function(items) {
                        records = items
                            ? (isArray(items)
                                ? items
                                : items.split(/[\s,]+/))
                            : null;
                        ngMessagesCtrl.reRender();
                    };

                    if (dynamicExp) {
                        assignRecords(scope.$eval(dynamicExp));
                        scope.$watchCollection(dynamicExp, assignRecords);
                    } else {
                        assignRecords(staticExp);
                    }

                    var currentElement, messageCtrl;
                    ngMessagesCtrl.register(commentNode, messageCtrl = {
                        test: function(name) {
                            return contains(records, name);
                        },
                        attach: function() {
                            if (!currentElement) {
                                $transclude(scope, function(elm) {
                                    $animate.enter(elm, null, element);
                                    currentElement = elm;

                                    // Each time we attach this node to a message we get a new id that we can match
                                    // when we are destroying the node later.
                                    var $$attachId = currentElement.$$attachId = ngMessagesCtrl.getAttachId();

                                    // in the event that the parent element is destroyed
                                    // by any other structural directive then it's time
                                    // to deregister the message from the controller
                                    currentElement.on('$destroy', function() {
                                        if (currentElement && currentElement.$$attachId === $$attachId) {
                                            ngMessagesCtrl.deregister(commentNode);
                                            messageCtrl.detach();
                                        }
                                    });
                                });
                            }
                        },
                        detach: function() {
                            if (currentElement) {
                                var elm = currentElement;
                                currentElement = null;
                                $animate.leave(elm);
                            }
                        }
                    });
                }
            };
        }];

        function contains(collection, key) {
            if (collection) {
                return isArray(collection)
                    ? collection.indexOf(key) >= 0
                    : collection.hasOwnProperty(key);
            }
        }
    }


})(window, window.angular);
/**
 * @license AngularJS v1.4.7
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';

    var $resourceMinErr = angular.$$minErr('$resource');

// Helper functions and regex to lookup a dotted path on an object
// stopping at undefined/null.  The path must be composed of ASCII
// identifiers (just like $parse)
    var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;

    function isValidDottedPath(path) {
        return (path != null && path !== '' && path !== 'hasOwnProperty' &&
        MEMBER_NAME_REGEX.test('.' + path));
    }

    function lookupDottedPath(obj, path) {
        if (!isValidDottedPath(path)) {
            throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
        }
        var keys = path.split('.');
        for (var i = 0, ii = keys.length; i < ii && angular.isDefined(obj); i++) {
            var key = keys[i];
            obj = (obj !== null) ? obj[key] : undefined;
        }
        return obj;
    }

    /**
     * Create a shallow copy of an object and clear other fields from the destination
     */
    function shallowClearAndCopy(src, dst) {
        dst = dst || {};

        angular.forEach(dst, function(value, key) {
            delete dst[key];
        });

        for (var key in src) {
            if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
                dst[key] = src[key];
            }
        }

        return dst;
    }

    /**
     * @ngdoc module
     * @name ngResource
     * @description
     *
     * # ngResource
     *
     * The `ngResource` module provides interaction support with RESTful services
     * via the $resource service.
     *
     *
     * <div doc-module-components="ngResource"></div>
     *
     * See {@link ngResource.$resource `$resource`} for usage.
     */

    /**
     * @ngdoc service
     * @name $resource
     * @requires $http
     *
     * @description
     * A factory which creates a resource object that lets you interact with
     * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
     *
     * The returned resource object has action methods which provide high-level behaviors without
     * the need to interact with the low level {@link ng.$http $http} service.
     *
     * Requires the {@link ngResource `ngResource`} module to be installed.
     *
     * By default, trailing slashes will be stripped from the calculated URLs,
     * which can pose problems with server backends that do not expect that
     * behavior.  This can be disabled by configuring the `$resourceProvider` like
     * this:
     *
     * ```js
     app.config(['$resourceProvider', function($resourceProvider) {
       // Don't strip trailing slashes from calculated URLs
       $resourceProvider.defaults.stripTrailingSlashes = false;
     }]);
     * ```
     *
     * @param {string} url A parameterized URL template with parameters prefixed by `:` as in
     *   `/user/:username`. If you are using a URL with a port number (e.g.
     *   `http://example.com:8080/api`), it will be respected.
     *
     *   If you are using a url with a suffix, just add the suffix, like this:
     *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
     *   or even `$resource('http://example.com/resource/:resource_id.:format')`
     *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
     *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
     *   can escape it with `/\.`.
     *
     * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
     *   `actions` methods. If any of the parameter value is a function, it will be executed every time
     *   when a param value needs to be obtained for a request (unless the param was overridden).
     *
     *   Each key value in the parameter object is first bound to url template if present and then any
     *   excess keys are appended to the url search query after the `?`.
     *
     *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in
     *   URL `/path/greet?salutation=Hello`.
     *
     *   If the parameter value is prefixed with `@` then the value for that parameter will be extracted
     *   from the corresponding property on the `data` object (provided when calling an action method).  For
     *   example, if the `defaultParam` object is `{someParam: '@someProp'}` then the value of `someParam`
     *   will be `data.someProp`.
     *
     * @param {Object.<Object>=} actions Hash with declaration of custom actions that should extend
     *   the default set of resource actions. The declaration should be created in the format of {@link
        *   ng.$http#usage $http.config}:
     *
     *       {action1: {method:?, params:?, isArray:?, headers:?, ...},
 *        action2: {method:?, params:?, isArray:?, headers:?, ...},
 *        ...}
     *
     *   Where:
     *
     *   - **`action`** – {string} – The name of action. This name becomes the name of the method on
     *     your resource object.
     *   - **`method`** – {string} – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,
     *     `DELETE`, `JSONP`, etc).
     *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of
     *     the parameter value is a function, it will be executed every time when a param value needs to
     *     be obtained for a request (unless the param was overridden).
     *   - **`url`** – {string} – action specific `url` override. The url templating is supported just
     *     like for the resource-level urls.
     *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,
     *     see `returns` section.
     *   - **`transformRequest`** –
     *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
     *     transform function or an array of such functions. The transform function takes the http
     *     request body and headers and returns its transformed (typically serialized) version.
     *     By default, transformRequest will contain one function that checks if the request data is
     *     an object and serializes to using `angular.toJson`. To prevent this behavior, set
     *     `transformRequest` to an empty array: `transformRequest: []`
     *   - **`transformResponse`** –
     *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
     *     transform function or an array of such functions. The transform function takes the http
     *     response body and headers and returns its transformed (typically deserialized) version.
     *     By default, transformResponse will contain one function that checks if the response looks like
     *     a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior, set
     *     `transformResponse` to an empty array: `transformResponse: []`
     *   - **`cache`** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the
     *     GET request, otherwise if a cache instance built with
     *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for
     *     caching.
     *   - **`timeout`** – `{number|Promise}` – timeout in milliseconds, or {@link ng.$q promise} that
     *     should abort the request when resolved.
     *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the
     *     XHR object. See
     *     [requests with credentials](https://developer.mozilla.org/en/http_access_control#section_5)
     *     for more information.
     *   - **`responseType`** - `{string}` - see
     *     [requestType](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType).
     *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -
     *     `response` and `responseError`. Both `response` and `responseError` interceptors get called
     *     with `http response` object. See {@link ng.$http $http interceptors}.
     *
     * @param {Object} options Hash with custom settings that should extend the
     *   default `$resourceProvider` behavior.  The only supported option is
     *
     *   Where:
     *
     *   - **`stripTrailingSlashes`** – {boolean} – If true then the trailing
     *   slashes from any calculated URL will be stripped. (Defaults to true.)
     *
     * @returns {Object} A resource "class" object with methods for the default set of resource actions
     *   optionally extended with custom `actions`. The default set contains these actions:
     *   ```js
     *   { 'get':    {method:'GET'},
 *     'save':   {method:'POST'},
 *     'query':  {method:'GET', isArray:true},
 *     'remove': {method:'DELETE'},
 *     'delete': {method:'DELETE'} };
     *   ```
     *
     *   Calling these methods invoke an {@link ng.$http} with the specified http method,
     *   destination and parameters. When the data is returned from the server then the object is an
     *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it
     *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,
     *   read, update, delete) on server-side data like this:
     *   ```js
     *   var User = $resource('/user/:userId', {userId:'@id'});
     *   var user = User.get({userId:123}, function() {
 *     user.abc = true;
 *     user.$save();
 *   });
     *   ```
     *
     *   It is important to realize that invoking a $resource object method immediately returns an
     *   empty reference (object or array depending on `isArray`). Once the data is returned from the
     *   server the existing reference is populated with the actual data. This is a useful trick since
     *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
     *   object results in no rendering, once the data arrives from the server then the object is
     *   populated with the data and the view automatically re-renders itself showing the new data. This
     *   means that in most cases one never has to write a callback function for the action methods.
     *
     *   The action methods on the class object or instance object can be invoked with the following
     *   parameters:
     *
     *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
     *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
     *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
     *
     *
     *   Success callback is called with (value, responseHeaders) arguments, where the value is
     *   the populated resource instance or collection object. The error callback is called
     *   with (httpResponse) argument.
     *
     *   Class actions return empty instance (with additional properties below).
     *   Instance actions return promise of the action.
     *
     *   The Resource instances and collection have these additional properties:
     *
     *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this
     *     instance or collection.
     *
     *     On success, the promise is resolved with the same resource instance or collection object,
     *     updated with data from server. This makes it easy to use in
     *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view
     *     rendering until the resource(s) are loaded.
     *
     *     On failure, the promise is resolved with the {@link ng.$http http response} object, without
     *     the `resource` property.
     *
     *     If an interceptor object was provided, the promise will instead be resolved with the value
     *     returned by the interceptor.
     *
     *   - `$resolved`: `true` after first server interaction is completed (either with success or
     *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
     *      data-binding.
     *
     * @example
     *
     * # Credit card resource
     *
     * ```js
     // Define CreditCard class
     var CreditCard = $resource('/user/:userId/card/:cardId',
     {userId:123, cardId:'@id'}, {
       charge: {method:'POST', params:{charge:true}}
      });

     // We can retrieve a collection from the server
     var cards = CreditCard.query(function() {
       // GET: /user/123/card
       // server returns: [ {id:456, number:'1234', name:'Smith'} ];

       var card = cards[0];
       // each item is an instance of CreditCard
       expect(card instanceof CreditCard).toEqual(true);
       card.name = "J. Smith";
       // non GET methods are mapped onto the instances
       card.$save();
       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
       // server returns: {id:456, number:'1234', name: 'J. Smith'};

       // our custom method is mapped as well.
       card.$charge({amount:9.99});
       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
     });

     // we can create an instance as well
     var newCard = new CreditCard({number:'0123'});
     newCard.name = "Mike Smith";
     newCard.$save();
     // POST: /user/123/card {number:'0123', name:'Mike Smith'}
     // server returns: {id:789, number:'0123', name: 'Mike Smith'};
     expect(newCard.id).toEqual(789);
     * ```
     *
     * The object returned from this function execution is a resource "class" which has "static" method
     * for each action in the definition.
     *
     * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and
     * `headers`.
     * When the data is returned from the server then the object is an instance of the resource type and
     * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
     * operations (create, read, update, delete) on server-side data.

     ```js
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123}, function(user) {
       user.abc = true;
       user.$save();
     });
     ```
     *
     * It's worth noting that the success callback for `get`, `query` and other methods gets passed
     * in the response that came from the server as well as $http header getter function, so one
     * could rewrite the above example and get access to http headers as:
     *
     ```js
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123}, function(u, getResponseHeaders){
       u.abc = true;
       u.$save(function(u, putResponseHeaders) {
         //u => saved user object
         //putResponseHeaders => $http header getter
       });
     });
     ```
     *
     * You can also access the raw `$http` promise via the `$promise` property on the object returned
     *
     ```
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123})
     .$promise.then(function(user) {
           $scope.user = user;
         });
     ```

     * # Creating a custom 'PUT' request
     * In this example we create a custom method on our resource to make a PUT request
     * ```js
     *    var app = angular.module('app', ['ngResource', 'ngRoute']);
     *
     *    // Some APIs expect a PUT request in the format URL/object/ID
     *    // Here we are creating an 'update' method
     *    app.factory('Notes', ['$resource', function($resource) {
 *    return $resource('/notes/:id', null,
 *        {
 *            'update': { method:'PUT' }
 *        });
 *    }]);
     *
     *    // In our controller we get the ID from the URL using ngRoute and $routeParams
     *    // We pass in $routeParams and our Notes factory along with $scope
     *    app.controller('NotesCtrl', ['$scope', '$routeParams', 'Notes',
     function($scope, $routeParams, Notes) {
 *    // First get a note object from the factory
 *    var note = Notes.get({ id:$routeParams.id });
 *    $id = note.id;
 *
 *    // Now call update passing in the ID first then the object you are updating
 *    Notes.update({ id:$id }, note);
 *
 *    // This will PUT /notes/ID with the note object in the request payload
 *    }]);
     * ```
     */
    angular.module('ngResource', ['ng']).
    provider('$resource', function() {
        var PROTOCOL_AND_DOMAIN_REGEX = /^https?:\/\/[^\/]*/;
        var provider = this;

        this.defaults = {
            // Strip slashes by default
            stripTrailingSlashes: true,

            // Default actions configuration
            actions: {
                'get': {method: 'GET'},
                'save': {method: 'POST'},
                'query': {method: 'GET', isArray: true},
                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'}
            }
        };

        this.$get = ['$http', '$q', function($http, $q) {

            var noop = angular.noop,
                forEach = angular.forEach,
                extend = angular.extend,
                copy = angular.copy,
                isFunction = angular.isFunction;

            /**
             * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
             * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set
             * (pchar) allowed in path segments:
             *    segment       = *pchar
             *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
             *    pct-encoded   = "%" HEXDIG HEXDIG
             *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
             *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
             *                     / "*" / "+" / "," / ";" / "="
             */
            function encodeUriSegment(val) {
                return encodeUriQuery(val, true).
                replace(/%26/gi, '&').
                replace(/%3D/gi, '=').
                replace(/%2B/gi, '+');
            }


            /**
             * This method is intended for encoding *key* or *value* parts of query component. We need a
             * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
             * have to be encoded per http://tools.ietf.org/html/rfc3986:
             *    query       = *( pchar / "/" / "?" )
             *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
             *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
             *    pct-encoded   = "%" HEXDIG HEXDIG
             *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
             *                     / "*" / "+" / "," / ";" / "="
             */
            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val).
                replace(/%40/gi, '@').
                replace(/%3A/gi, ':').
                replace(/%24/g, '$').
                replace(/%2C/gi, ',').
                replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
            }

            function Route(template, defaults) {
                this.template = template;
                this.defaults = extend({}, provider.defaults, defaults);
                this.urlParams = {};
            }

            Route.prototype = {
                setUrlParams: function(config, params, actionUrl) {
                    var self = this,
                        url = actionUrl || self.template,
                        val,
                        encodedVal,
                        protocolAndDomain = '';

                    var urlParams = self.urlParams = {};
                    forEach(url.split(/\W/), function(param) {
                        if (param === 'hasOwnProperty') {
                            throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
                        }
                        if (!(new RegExp("^\\d+$").test(param)) && param &&
                            (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                            urlParams[param] = true;
                        }
                    });
                    url = url.replace(/\\:/g, ':');
                    url = url.replace(PROTOCOL_AND_DOMAIN_REGEX, function(match) {
                        protocolAndDomain = match;
                        return '';
                    });

                    params = params || {};
                    forEach(self.urlParams, function(_, urlParam) {
                        val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
                        if (angular.isDefined(val) && val !== null) {
                            encodedVal = encodeUriSegment(val);
                            url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), function(match, p1) {
                                return encodedVal + p1;
                            });
                        } else {
                            url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function(match,
                                                                                                         leadingSlashes, tail) {
                                if (tail.charAt(0) == '/') {
                                    return tail;
                                } else {
                                    return leadingSlashes + tail;
                                }
                            });
                        }
                    });

                    // strip trailing slashes and set the url (unless this behavior is specifically disabled)
                    if (self.defaults.stripTrailingSlashes) {
                        url = url.replace(/\/+$/, '') || '/';
                    }

                    // then replace collapse `/.` if found in the last URL path segment before the query
                    // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
                    url = url.replace(/\/\.(?=\w+($|\?))/, '.');
                    // replace escaped `/\.` with `/.`
                    config.url = protocolAndDomain + url.replace(/\/\\\./, '/.');


                    // set params - delegate param encoding to $http
                    forEach(params, function(value, key) {
                        if (!self.urlParams[key]) {
                            config.params = config.params || {};
                            config.params[key] = value;
                        }
                    });
                }
            };


            function resourceFactory(url, paramDefaults, actions, options) {
                var route = new Route(url, options);

                actions = extend({}, provider.defaults.actions, actions);

                function extractParams(data, actionParams) {
                    var ids = {};
                    actionParams = extend({}, paramDefaults, actionParams);
                    forEach(actionParams, function(value, key) {
                        if (isFunction(value)) { value = value(); }
                        ids[key] = value && value.charAt && value.charAt(0) == '@' ?
                            lookupDottedPath(data, value.substr(1)) : value;
                    });
                    return ids;
                }

                function defaultResponseInterceptor(response) {
                    return response.resource;
                }

                function Resource(value) {
                    shallowClearAndCopy(value || {}, this);
                }

                Resource.prototype.toJSON = function() {
                    var data = extend({}, this);
                    delete data.$promise;
                    delete data.$resolved;
                    return data;
                };

                forEach(actions, function(action, name) {
                    var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

                    Resource[name] = function(a1, a2, a3, a4) {
                        var params = {}, data, success, error;

                        /* jshint -W086 */ /* (purposefully fall through case statements) */
                        switch (arguments.length) {
                            case 4:
                                error = a4;
                                success = a3;
                            //fallthrough
                            case 3:
                            case 2:
                                if (isFunction(a2)) {
                                    if (isFunction(a1)) {
                                        success = a1;
                                        error = a2;
                                        break;
                                    }

                                    success = a2;
                                    error = a3;
                                    //fallthrough
                                } else {
                                    params = a1;
                                    data = a2;
                                    success = a3;
                                    break;
                                }
                            case 1:
                                if (isFunction(a1)) success = a1;
                                else if (hasBody) data = a1;
                                else params = a1;
                                break;
                            case 0: break;
                            default:
                                throw $resourceMinErr('badargs',
                                    "Expected up to 4 arguments [params, data, success, error], got {0} arguments",
                                    arguments.length);
                        }
                        /* jshint +W086 */ /* (purposefully fall through case statements) */

                        var isInstanceCall = this instanceof Resource;
                        var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));
                        var httpConfig = {};
                        var responseInterceptor = action.interceptor && action.interceptor.response ||
                            defaultResponseInterceptor;
                        var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
                            undefined;

                        forEach(action, function(value, key) {
                            if (key != 'params' && key != 'isArray' && key != 'interceptor') {
                                httpConfig[key] = copy(value);
                            }
                        });

                        if (hasBody) httpConfig.data = data;
                        route.setUrlParams(httpConfig,
                            extend({}, extractParams(data, action.params || {}), params),
                            action.url);

                        var promise = $http(httpConfig).then(function(response) {
                            var data = response.data,
                                promise = value.$promise;

                            if (data) {
                                // Need to convert action.isArray to boolean in case it is undefined
                                // jshint -W018
                                if (angular.isArray(data) !== (!!action.isArray)) {
                                    throw $resourceMinErr('badcfg',
                                        'Error in resource configuration for action `{0}`. Expected response to ' +
                                        'contain an {1} but got an {2} (Request: {3} {4})', name, action.isArray ? 'array' : 'object',
                                        angular.isArray(data) ? 'array' : 'object', httpConfig.method, httpConfig.url);
                                }
                                // jshint +W018
                                if (action.isArray) {
                                    value.length = 0;
                                    forEach(data, function(item) {
                                        if (typeof item === "object") {
                                            value.push(new Resource(item));
                                        } else {
                                            // Valid JSON values may be string literals, and these should not be converted
                                            // into objects. These items will not have access to the Resource prototype
                                            // methods, but unfortunately there
                                            value.push(item);
                                        }
                                    });
                                } else {
                                    shallowClearAndCopy(data, value);
                                    value.$promise = promise;
                                }
                            }

                            value.$resolved = true;

                            response.resource = value;

                            return response;
                        }, function(response) {
                            value.$resolved = true;

                            (error || noop)(response);

                            return $q.reject(response);
                        });

                        promise = promise.then(
                            function(response) {
                                var value = responseInterceptor(response);
                                (success || noop)(value, response.headers);
                                return value;
                            },
                            responseErrorInterceptor);

                        if (!isInstanceCall) {
                            // we are creating instance / collection
                            // - set the initial promise
                            // - return the instance / collection
                            value.$promise = promise;
                            value.$resolved = false;

                            return value;
                        }

                        // instance call
                        return promise;
                    };


                    Resource.prototype['$' + name] = function(params, success, error) {
                        if (isFunction(params)) {
                            error = success; success = params; params = {};
                        }
                        var result = Resource[name].call(this, params, this, success, error);
                        return result.$promise || result;
                    };
                });

                Resource.bind = function(additionalParamDefaults) {
                    return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
                };

                return Resource;
            }

            return resourceFactory;
        }];
    });


})(window, window.angular);
/*
 * angular-lazy-load
 *
 * Copyright(c) 2014 Paweł Wszoła <wszola.p@gmail.com>
 * MIT Licensed
 *
 */

/**
 * @author Paweł Wszoła (wszola.p@gmail.com)
 *
 */

angular.module('angularLazyImg', []);

angular.module('angularLazyImg').factory('LazyImgMagic', [
    '$window', '$rootScope', 'lazyImgConfig', 'lazyImgHelpers',
    function($window, $rootScope, lazyImgConfig, lazyImgHelpers){
        'use strict';

        var winDimensions, $win, images, isListening, options;
        var checkImagesT, saveWinOffsetT, containers;

        images = [];
        isListening = false;
        options = lazyImgConfig.getOptions();
        $win = angular.element($window);
        winDimensions = lazyImgHelpers.getWinDimensions();
        saveWinOffsetT = lazyImgHelpers.throttle(function(){
            winDimensions = lazyImgHelpers.getWinDimensions();
        }, 60);
        containers = [options.container || $win];

        function checkImages(){
            for(var i = images.length - 1; i >= 0; i--){
                var image = images[i];
                if(image && lazyImgHelpers.isElementInView(image.$elem[0], options.offset, winDimensions)){
                    loadImage(image);
                    images.splice(i, 1);
                }
            }
            if(images.length === 0){ stopListening(); }
        }

        checkImagesT = lazyImgHelpers.throttle(checkImages, 30);

        function listen(param){
            containers.forEach(function (container) {
                container[param]('scroll', checkImagesT);
                container[param]('touchmove', checkImagesT);
            });
            $win[param]('resize', checkImagesT);
            $win[param]('resize', saveWinOffsetT);
        }

        function startListening(){
            isListening = true;
            setTimeout(function(){
                checkImages();
                listen('on');
            }, 1);
        }

        function stopListening(){
            isListening = false;
            listen('off');
        }

        function removeImage(image){
            var index = images.indexOf(image);
            if(index !== -1) {
                images.splice(index, 1);
            }
        }

        function loadImage(photo){
            var img = new Image();
            img.onerror = function(){
                if(options.errorClass){
                    photo.$elem.addClass(options.errorClass);
                }
                $rootScope.$emit('lazyImg:error', photo);
                options.onError(photo);
            };
            img.onload = function(){
                setPhotoSrc(photo.$elem, photo.src);
                if(options.successClass){
                    photo.$elem.addClass(options.successClass);
                }
                $rootScope.$emit('lazyImg:success', photo);
                options.onSuccess(photo);
            };
            img.src = photo.src;
        }

        function setPhotoSrc($elem, src){
            if ($elem[0].nodeName.toLowerCase() === 'img') {
                $elem[0].src = src;
            } else {
                $elem.css('background-image', 'url("' + src + '")');
            }
        }

        // PHOTO
        function Photo($elem){
            this.$elem = $elem;
        }

        Photo.prototype.setSource = function(source){
            this.src = source;
            images.unshift(this);
            if (!isListening){ startListening(); }
        };

        Photo.prototype.removeImage = function(){
            removeImage(this);
            if(images.length === 0){ stopListening(); }
        };

        Photo.prototype.checkImages = function(){
            checkImages();
        };

        Photo.addContainer = function (container) {
            stopListening();
            containers.push(container);
            startListening();
        };

        Photo.removeContainer = function (container) {
            stopListening();
            containers.splice(containers.indexOf(container), 1);
            startListening();
        };

        return Photo;

    }
]);

angular.module('angularLazyImg').provider('lazyImgConfig', function() {
    'use strict';

    this.options = {
        offset       : 100,
        errorClass   : null,
        successClass : null,
        onError      : function(){},
        onSuccess    : function(){}
    };

    this.$get = function() {
        var options = this.options;
        return {
            getOptions: function() {
                return options;
            }
        };
    };

    this.setOptions = function(options) {
        angular.extend(this.options, options);
    };
});
angular.module('angularLazyImg').factory('lazyImgHelpers', [
    '$window', function($window){
        'use strict';

        function getWinDimensions(){
            return {
                height: $window.innerHeight,
                width: $window.innerWidth
            };
        }

        function isElementInView(elem, offset, winDimensions) {
            var rect = elem.getBoundingClientRect();
            var bottomline = winDimensions.height + offset;
            return (
                rect.left >= 0 && rect.right <= winDimensions.width + offset && (
                    rect.top >= 0 && rect.top <= bottomline ||
                    rect.bottom <= bottomline && rect.bottom >= 0 - offset
                )
            );
        }

        // http://remysharp.com/2010/07/21/throttling-function-calls/
        function throttle(fn, threshhold, scope) {
            var last, deferTimer;
            return function () {
                var context = scope || this;
                var now = +new Date(),
                    args = arguments;
                if (last && now < last + threshhold) {
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        }

        return {
            isElementInView: isElementInView,
            getWinDimensions: getWinDimensions,
            throttle: throttle
        };

    }
]);
angular.module('angularLazyImg')
    .directive('lazyImg', [
        '$rootScope', 'LazyImgMagic', function ($rootScope, LazyImgMagic) {
            'use strict';

            function link(scope, element, attributes) {
                var lazyImage = new LazyImgMagic(element);
                attributes.$observe('lazyImg', function (newSource) {
                    if (newSource) {
                        // in angular 1.3 it might be nice to remove observer here
                        lazyImage.setSource(newSource);
                    }
                });
                scope.$on('$destroy', function () {
                    lazyImage.removeImage();
                });
                $rootScope.$on('lazyImg.runCheck', function () {
                    lazyImage.checkImages();
                });
                $rootScope.$on('lazyImg:refresh', function () {
                    lazyImage.checkImages();
                });
            }

            return {
                link: link,
                restrict: 'A'
            };
        }
    ])
    .directive('lazyImgContainer', [
        'LazyImgMagic', function (LazyImgMagic) {
            'use strict';

            function link(scope, element) {
                LazyImgMagic.addContainer(element);
                scope.$on('$destroy', function () {
                    LazyImgMagic.removeContainer(element);
                });
            }

            return {
                link: link,
                restrict: 'A'
            };
        }
    ]);

/**
 * angular-cache
 * @version 4.6.0 - Homepage <https://github.com/jmdobry/angular-cache>
 * @copyright (c) 2013-2016 angular-cache project authors
 * @license MIT <https://github.com/jmdobry/angular-cache/blob/master/LICENSE>
 * @overview angular-cache is a very useful replacement for Angular's $cacheFactory.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(typeof angular === 'undefined' ? require('angular') : angular) :
        typeof define === 'function' && define.amd ? define('angular-cache', ['angular'], factory) :
            (global.angularCacheModuleName = factory(global.angular));
}(this, function (angular) {
    'use strict';

    angular = 'default' in angular ? angular['default'] : angular;

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
            return typeof obj;
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
        };

    /**
     * @method bubbleUp
     * @param {array} heap The heap.
     * @param {function} weightFunc The weight function.
     * @param {number} n The index of the element to bubble up.
     */
    var bubbleUp = function bubbleUp(heap, weightFunc, n) {
        var element = heap[n];
        var weight = weightFunc(element);
        // When at 0, an element can not go up any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentN = Math.floor((n + 1) / 2) - 1;
            var parent = heap[parentN];
            // If the parent has a lesser weight, things are in order and we
            // are done.
            if (weight >= weightFunc(parent)) {
                break;
            } else {
                heap[parentN] = element;
                heap[n] = parent;
                n = parentN;
            }
        }
    };

    /**
     * @method bubbleDown
     * @param {array} heap The heap.
     * @param {function} weightFunc The weight function.
     * @param {number} n The index of the element to sink down.
     */
    var bubbleDown = function bubbleDown(heap, weightFunc, n) {
        var length = heap.length;
        var node = heap[n];
        var nodeWeight = weightFunc(node);

        while (true) {
            var child2N = (n + 1) * 2;
            var child1N = child2N - 1;
            var swap = null;
            if (child1N < length) {
                var child1 = heap[child1N];
                var child1Weight = weightFunc(child1);
                // If the score is less than our node's, we need to swap.
                if (child1Weight < nodeWeight) {
                    swap = child1N;
                }
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = heap[child2N];
                var child2Weight = weightFunc(child2);
                if (child2Weight < (swap === null ? nodeWeight : weightFunc(heap[child1N]))) {
                    swap = child2N;
                }
            }

            if (swap === null) {
                break;
            } else {
                heap[n] = heap[swap];
                heap[swap] = node;
                n = swap;
            }
        }
    };

    function BinaryHeap(weightFunc, compareFunc) {
        if (!weightFunc) {
            weightFunc = function weightFunc(x) {
                return x;
            };
        }
        if (!compareFunc) {
            compareFunc = function compareFunc(x, y) {
                return x === y;
            };
        }
        if (typeof weightFunc !== 'function') {
            throw new Error('BinaryHeap([weightFunc][, compareFunc]): "weightFunc" must be a function!');
        }
        if (typeof compareFunc !== 'function') {
            throw new Error('BinaryHeap([weightFunc][, compareFunc]): "compareFunc" must be a function!');
        }
        this.weightFunc = weightFunc;
        this.compareFunc = compareFunc;
        this.heap = [];
    }

    var BHProto = BinaryHeap.prototype;

    BHProto.push = function (node) {
        this.heap.push(node);
        bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
    };

    BHProto.peek = function () {
        return this.heap[0];
    };

    BHProto.pop = function () {
        var front = this.heap[0];
        var end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            bubbleDown(this.heap, this.weightFunc, 0);
        }
        return front;
    };

    BHProto.remove = function (node) {
        var length = this.heap.length;
        for (var i = 0; i < length; i++) {
            if (this.compareFunc(this.heap[i], node)) {
                var removed = this.heap[i];
                var end = this.heap.pop();
                if (i !== length - 1) {
                    this.heap[i] = end;
                    bubbleUp(this.heap, this.weightFunc, i);
                    bubbleDown(this.heap, this.weightFunc, i);
                }
                return removed;
            }
        }
        return null;
    };

    BHProto.removeAll = function () {
        this.heap = [];
    };

    BHProto.size = function () {
        return this.heap.length;
    };

    var _Promise = null;
    try {
        _Promise = window.Promise;
    } catch (e) {}

    var utils = {
        isNumber: function isNumber(value) {
            return typeof value === 'number';
        },
        isString: function isString(value) {
            return typeof value === 'string';
        },
        isObject: function isObject(value) {
            return value !== null && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object';
        },
        isFunction: function isFunction(value) {
            return typeof value === 'function';
        },
        fromJson: function fromJson(value) {
            return JSON.parse(value);
        },
        equals: function equals(a, b) {
            return a === b;
        },

        Promise: _Promise
    };

    function _keys(collection) {
        var keys = [];
        var key = void 0;
        if (!utils.isObject(collection)) {
            return keys;
        }
        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }

    function _isPromiseLike(value) {
        return value && typeof value.then === 'function';
    }

    function _stringifyNumber(number) {
        if (utils.isNumber(number)) {
            return number.toString();
        }
        return number;
    }

    function _keySet(collection) {
        var keySet = {};
        var key = void 0;
        if (!utils.isObject(collection)) {
            return keySet;
        }
        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                keySet[key] = key;
            }
        }
        return keySet;
    }

    var defaults = {
        capacity: Number.MAX_VALUE,
        maxAge: Number.MAX_VALUE,
        deleteOnExpire: 'none',
        onExpire: null,
        cacheFlushInterval: null,
        recycleFreq: 1000,
        storageMode: 'memory',
        storageImpl: null,
        disabled: false,
        storagePrefix: 'cachefactory.caches.',
        storeOnResolve: false,
        storeOnReject: false
    };

    var caches = {};

    function createCache(cacheId, options) {
        if (cacheId in caches) {
            throw new Error(cacheId + ' already exists!');
        } else if (!utils.isString(cacheId)) {
            throw new Error('cacheId must be a string!');
        }

        var $$data = {};
        var $$promises = {};
        var $$storage = null;
        var $$expiresHeap = new BinaryHeap(function (x) {
            return x.expires;
        }, utils.equals);
        var $$lruHeap = new BinaryHeap(function (x) {
            return x.accessed;
        }, utils.equals);

        var cache = caches[cacheId] = {

            $$id: cacheId,

            destroy: function destroy() {
                clearInterval(this.$$cacheFlushIntervalId);
                clearInterval(this.$$recycleFreqId);
                this.removeAll();
                if ($$storage) {
                    $$storage().removeItem(this.$$prefix + '.keys');
                    $$storage().removeItem(this.$$prefix);
                }
                $$storage = null;
                $$data = null;
                $$lruHeap = null;
                $$expiresHeap = null;
                this.$$prefix = null;
                delete caches[this.$$id];
            },
            disable: function disable() {
                this.$$disabled = true;
            },
            enable: function enable() {
                delete this.$$disabled;
            },
            get: function get(key, options) {
                var _this2 = this;

                if (Array.isArray(key)) {
                    var _ret = function () {
                        var keys = key;
                        var values = [];

                        keys.forEach(function (key) {
                            var value = _this2.get(key, options);
                            if (value !== null && value !== undefined) {
                                values.push(value);
                            }
                        });

                        return {
                            v: values
                        };
                    }();

                    if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
                } else {
                    key = _stringifyNumber(key);

                    if (this.$$disabled) {
                        return;
                    }
                }

                options = options || {};
                if (!utils.isString(key)) {
                    throw new Error('key must be a string!');
                } else if (options && !utils.isObject(options)) {
                    throw new Error('options must be an object!');
                } else if (options.onExpire && !utils.isFunction(options.onExpire)) {
                    throw new Error('options.onExpire must be a function!');
                }

                var item = void 0;

                if ($$storage) {
                    if ($$promises[key]) {
                        return $$promises[key];
                    }

                    var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

                    if (itemJson) {
                        item = utils.fromJson(itemJson);
                    } else {
                        return;
                    }
                } else if (utils.isObject($$data)) {
                    if (!(key in $$data)) {
                        return;
                    }

                    item = $$data[key];
                }

                var value = item.value;
                var now = new Date().getTime();

                if ($$storage) {
                    $$lruHeap.remove({
                        key: key,
                        accessed: item.accessed
                    });
                    item.accessed = now;
                    $$lruHeap.push({
                        key: key,
                        accessed: now
                    });
                } else {
                    $$lruHeap.remove(item);
                    item.accessed = now;
                    $$lruHeap.push(item);
                }

                if (this.$$deleteOnExpire === 'passive' && 'expires' in item && item.expires < now) {
                    this.remove(key);

                    if (this.$$onExpire) {
                        this.$$onExpire(key, item.value, options.onExpire);
                    } else if (options.onExpire) {
                        options.onExpire.call(this, key, item.value);
                    }
                    value = undefined;
                } else if ($$storage) {
                    $$storage().setItem(this.$$prefix + '.data.' + key, JSON.stringify(item));
                }

                return value;
            },
            info: function info(key) {
                if (key) {
                    var item = void 0;
                    if ($$storage) {
                        var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

                        if (itemJson) {
                            item = utils.fromJson(itemJson);
                            return {
                                created: item.created,
                                accessed: item.accessed,
                                expires: item.expires,
                                isExpired: new Date().getTime() - item.created > (item.maxAge || this.$$maxAge)
                            };
                        } else {
                            return undefined;
                        }
                    } else if (utils.isObject($$data) && key in $$data) {
                        item = $$data[key];

                        return {
                            created: item.created,
                            accessed: item.accessed,
                            expires: item.expires,
                            isExpired: new Date().getTime() - item.created > (item.maxAge || this.$$maxAge)
                        };
                    } else {
                        return undefined;
                    }
                } else {
                    return {
                        id: this.$$id,
                        capacity: this.$$capacity,
                        maxAge: this.$$maxAge,
                        deleteOnExpire: this.$$deleteOnExpire,
                        onExpire: this.$$onExpire,
                        cacheFlushInterval: this.$$cacheFlushInterval,
                        recycleFreq: this.$$recycleFreq,
                        storageMode: this.$$storageMode,
                        storageImpl: $$storage ? $$storage() : undefined,
                        disabled: !!this.$$disabled,
                        size: $$lruHeap && $$lruHeap.size() || 0
                    };
                }
            },
            keys: function keys() {
                if ($$storage) {
                    var keysJson = $$storage().getItem(this.$$prefix + '.keys');

                    if (keysJson) {
                        return utils.fromJson(keysJson);
                    } else {
                        return [];
                    }
                } else {
                    return _keys($$data);
                }
            },
            keySet: function keySet() {
                if ($$storage) {
                    var keysJson = $$storage().getItem(this.$$prefix + '.keys');
                    var kSet = {};

                    if (keysJson) {
                        var keys = utils.fromJson(keysJson);

                        for (var i = 0; i < keys.length; i++) {
                            kSet[keys[i]] = keys[i];
                        }
                    }
                    return kSet;
                } else {
                    return _keySet($$data);
                }
            },
            put: function put(key, value, options) {
                var _this3 = this;

                options || (options = {});

                var storeOnResolve = 'storeOnResolve' in options ? !!options.storeOnResolve : this.$$storeOnResolve;
                var storeOnReject = 'storeOnReject' in options ? !!options.storeOnReject : this.$$storeOnReject;

                var getHandler = function getHandler(store, isError) {
                    return function (v) {
                        if (store) {
                            delete $$promises[key];
                            if (utils.isObject(v) && 'status' in v && 'data' in v) {
                                v = [v.status, v.data, v.headers(), v.statusText];
                                _this3.put(key, v);
                            } else {
                                _this3.put(key, v);
                            }
                        }
                        if (isError) {
                            if (utils.Promise) {
                                return utils.Promise.reject(v);
                            } else {
                                throw v;
                            }
                        } else {
                            return v;
                        }
                    };
                };

                if (this.$$disabled || !utils.isObject($$data) || value === null || value === undefined) {
                    return;
                }
                key = _stringifyNumber(key);

                if (!utils.isString(key)) {
                    throw new Error('key must be a string!');
                }

                var now = new Date().getTime();
                var item = {
                    key: key,
                    value: _isPromiseLike(value) ? value.then(getHandler(storeOnResolve, false), getHandler(storeOnReject, true)) : value,
                    created: options.created === undefined ? now : options.created,
                    accessed: options.accessed === undefined ? now : options.accessed
                };
                if (options.maxAge) {
                    item.maxAge = options.maxAge;
                }

                if (options.expires === undefined) {
                    item.expires = item.created + (item.maxAge || this.$$maxAge);
                } else {
                    item.expires = options.expires;
                }

                if ($$storage) {
                    if (_isPromiseLike(item.value)) {
                        $$promises[key] = item.value;
                        return $$promises[key];
                    }
                    var keysJson = $$storage().getItem(this.$$prefix + '.keys');
                    var keys = keysJson ? utils.fromJson(keysJson) : [];
                    var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

                    // Remove existing
                    if (itemJson) {
                        this.remove(key);
                    }
                    // Add to expires heap
                    $$expiresHeap.push({
                        key: key,
                        expires: item.expires
                    });
                    // Add to lru heap
                    $$lruHeap.push({
                        key: key,
                        accessed: item.accessed
                    });
                    // Set item
                    $$storage().setItem(this.$$prefix + '.data.' + key, JSON.stringify(item));
                    var exists = false;
                    for (var i = 0; i < keys.length; i++) {
                        if (keys[i] === key) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        keys.push(key);
                    }
                    $$storage().setItem(this.$$prefix + '.keys', JSON.stringify(keys));
                } else {
                    // Remove existing
                    if ($$data[key]) {
                        this.remove(key);
                    }
                    // Add to expires heap
                    $$expiresHeap.push(item);
                    // Add to lru heap
                    $$lruHeap.push(item);
                    // Set item
                    $$data[key] = item;
                    delete $$promises[key];
                }

                // Handle exceeded capacity
                if ($$lruHeap.size() > this.$$capacity) {
                    this.remove($$lruHeap.peek().key);
                }

                return value;
            },
            remove: function remove(key) {
                key += '';
                delete $$promises[key];
                if ($$storage) {
                    var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

                    if (itemJson) {
                        var item = utils.fromJson(itemJson);
                        $$lruHeap.remove({
                            key: key,
                            accessed: item.accessed
                        });
                        $$expiresHeap.remove({
                            key: key,
                            expires: item.expires
                        });
                        $$storage().removeItem(this.$$prefix + '.data.' + key);
                        var keysJson = $$storage().getItem(this.$$prefix + '.keys');
                        var keys = keysJson ? utils.fromJson(keysJson) : [];
                        var index = keys.indexOf(key);

                        if (index >= 0) {
                            keys.splice(index, 1);
                        }
                        $$storage().setItem(this.$$prefix + '.keys', JSON.stringify(keys));
                        return item.value;
                    }
                } else if (utils.isObject($$data)) {
                    var value = $$data[key] ? $$data[key].value : undefined;
                    $$lruHeap.remove($$data[key]);
                    $$expiresHeap.remove($$data[key]);
                    $$data[key] = null;
                    delete $$data[key];
                    return value;
                }
            },
            removeAll: function removeAll() {
                if ($$storage) {
                    $$lruHeap.removeAll();
                    $$expiresHeap.removeAll();
                    var keysJson = $$storage().getItem(this.$$prefix + '.keys');

                    if (keysJson) {
                        var keys = utils.fromJson(keysJson);

                        for (var i = 0; i < keys.length; i++) {
                            this.remove(keys[i]);
                        }
                    }
                    $$storage().setItem(this.$$prefix + '.keys', JSON.stringify([]));
                } else if (utils.isObject($$data)) {
                    $$lruHeap.removeAll();
                    $$expiresHeap.removeAll();
                    for (var key in $$data) {
                        $$data[key] = null;
                    }
                    $$data = {};
                } else {
                    $$lruHeap.removeAll();
                    $$expiresHeap.removeAll();
                    $$data = {};
                }
                $$promises = {};
            },
            removeExpired: function removeExpired() {
                var now = new Date().getTime();
                var expired = {};
                var key = void 0;
                var expiredItem = void 0;

                while ((expiredItem = $$expiresHeap.peek()) && expiredItem.expires <= now) {
                    expired[expiredItem.key] = expiredItem.value ? expiredItem.value : null;
                    $$expiresHeap.pop();
                }

                if ($$storage) {
                    for (key in expired) {
                        var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);
                        if (itemJson) {
                            expired[key] = utils.fromJson(itemJson).value;
                            this.remove(key);
                        }
                    }
                } else {
                    for (key in expired) {
                        this.remove(key);
                    }
                }

                if (this.$$onExpire) {
                    for (key in expired) {
                        this.$$onExpire(key, expired[key]);
                    }
                }

                return expired;
            },
            setCacheFlushInterval: function setCacheFlushInterval(cacheFlushInterval) {
                var _this = this;
                if (cacheFlushInterval === null) {
                    delete _this.$$cacheFlushInterval;
                } else if (!utils.isNumber(cacheFlushInterval)) {
                    throw new Error('cacheFlushInterval must be a number!');
                } else if (cacheFlushInterval < 0) {
                    throw new Error('cacheFlushInterval must be greater than zero!');
                } else if (cacheFlushInterval !== _this.$$cacheFlushInterval) {
                    _this.$$cacheFlushInterval = cacheFlushInterval;

                    clearInterval(_this.$$cacheFlushIntervalId); // eslint-disable-line

                    _this.$$cacheFlushIntervalId = setInterval(function () {
                        _this.removeAll();
                    }, _this.$$cacheFlushInterval);
                }
            },
            setCapacity: function setCapacity(capacity) {
                if (capacity === null) {
                    delete this.$$capacity;
                } else if (!utils.isNumber(capacity)) {
                    throw new Error('capacity must be a number!');
                } else if (capacity < 0) {
                    throw new Error('capacity must be greater than zero!');
                } else {
                    this.$$capacity = capacity;
                }
                var removed = {};
                while ($$lruHeap.size() > this.$$capacity) {
                    removed[$$lruHeap.peek().key] = this.remove($$lruHeap.peek().key);
                }
                return removed;
            },
            setDeleteOnExpire: function setDeleteOnExpire(deleteOnExpire, setRecycleFreq) {
                if (deleteOnExpire === null) {
                    delete this.$$deleteOnExpire;
                } else if (!utils.isString(deleteOnExpire)) {
                    throw new Error('deleteOnExpire must be a string!');
                } else if (deleteOnExpire !== 'none' && deleteOnExpire !== 'passive' && deleteOnExpire !== 'aggressive') {
                    throw new Error('deleteOnExpire must be "none", "passive" or "aggressive"!');
                } else {
                    this.$$deleteOnExpire = deleteOnExpire;
                }
                if (setRecycleFreq !== false) {
                    this.setRecycleFreq(this.$$recycleFreq);
                }
            },
            setMaxAge: function setMaxAge(maxAge) {
                if (maxAge === null) {
                    this.$$maxAge = Number.MAX_VALUE;
                } else if (!utils.isNumber(maxAge)) {
                    throw new Error('maxAge must be a number!');
                } else if (maxAge < 0) {
                    throw new Error('maxAge must be greater than zero!');
                } else {
                    this.$$maxAge = maxAge;
                }
                var i = void 0,
                    keys = void 0,
                    key = void 0;

                $$expiresHeap.removeAll();

                if ($$storage) {
                    var keysJson = $$storage().getItem(this.$$prefix + '.keys');

                    keys = keysJson ? utils.fromJson(keysJson) : [];

                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

                        if (itemJson) {
                            var item = utils.fromJson(itemJson);
                            if (this.$$maxAge === Number.MAX_VALUE) {
                                item.expires = Number.MAX_VALUE;
                            } else {
                                item.expires = item.created + (item.maxAge || this.$$maxAge);
                            }
                            $$expiresHeap.push({
                                key: key,
                                expires: item.expires
                            });
                        }
                    }
                } else {
                    keys = _keys($$data);

                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        if (this.$$maxAge === Number.MAX_VALUE) {
                            $$data[key].expires = Number.MAX_VALUE;
                        } else {
                            $$data[key].expires = $$data[key].created + ($$data[key].maxAge || this.$$maxAge);
                        }
                        $$expiresHeap.push($$data[key]);
                    }
                }
                if (this.$$deleteOnExpire === 'aggressive') {
                    return this.removeExpired();
                } else {
                    return {};
                }
            },
            setOnExpire: function setOnExpire(onExpire) {
                if (onExpire === null) {
                    delete this.$$onExpire;
                } else if (!utils.isFunction(onExpire)) {
                    throw new Error('onExpire must be a function!');
                } else {
                    this.$$onExpire = onExpire;
                }
            },
            setOptions: function setOptions(cacheOptions, strict) {
                cacheOptions = cacheOptions || {};
                strict = !!strict;
                if (!utils.isObject(cacheOptions)) {
                    throw new Error('cacheOptions must be an object!');
                }

                if ('storagePrefix' in cacheOptions) {
                    this.$$storagePrefix = cacheOptions.storagePrefix;
                } else if (strict) {
                    this.$$storagePrefix = defaults.storagePrefix;
                }

                this.$$prefix = this.$$storagePrefix + this.$$id;

                if ('disabled' in cacheOptions) {
                    this.$$disabled = !!cacheOptions.disabled;
                } else if (strict) {
                    this.$$disabled = defaults.disabled;
                }

                if ('deleteOnExpire' in cacheOptions) {
                    this.setDeleteOnExpire(cacheOptions.deleteOnExpire, false);
                } else if (strict) {
                    this.setDeleteOnExpire(defaults.deleteOnExpire, false);
                }

                if ('recycleFreq' in cacheOptions) {
                    this.setRecycleFreq(cacheOptions.recycleFreq);
                } else if (strict) {
                    this.setRecycleFreq(defaults.recycleFreq);
                }

                if ('maxAge' in cacheOptions) {
                    this.setMaxAge(cacheOptions.maxAge);
                } else if (strict) {
                    this.setMaxAge(defaults.maxAge);
                }

                if ('storeOnResolve' in cacheOptions) {
                    this.$$storeOnResolve = !!cacheOptions.storeOnResolve;
                } else if (strict) {
                    this.$$storeOnResolve = defaults.storeOnResolve;
                }

                if ('storeOnReject' in cacheOptions) {
                    this.$$storeOnReject = !!cacheOptions.storeOnReject;
                } else if (strict) {
                    this.$$storeOnReject = defaults.storeOnReject;
                }

                if ('capacity' in cacheOptions) {
                    this.setCapacity(cacheOptions.capacity);
                } else if (strict) {
                    this.setCapacity(defaults.capacity);
                }

                if ('cacheFlushInterval' in cacheOptions) {
                    this.setCacheFlushInterval(cacheOptions.cacheFlushInterval);
                } else if (strict) {
                    this.setCacheFlushInterval(defaults.cacheFlushInterval);
                }

                if ('onExpire' in cacheOptions) {
                    this.setOnExpire(cacheOptions.onExpire);
                } else if (strict) {
                    this.setOnExpire(defaults.onExpire);
                }

                if ('storageMode' in cacheOptions || 'storageImpl' in cacheOptions) {
                    this.setStorageMode(cacheOptions.storageMode || defaults.storageMode, cacheOptions.storageImpl || defaults.storageImpl);
                } else if (strict) {
                    this.setStorageMode(defaults.storageMode, defaults.storageImpl);
                }
            },
            setRecycleFreq: function setRecycleFreq(recycleFreq) {
                if (recycleFreq === null) {
                    delete this.$$recycleFreq;
                } else if (!utils.isNumber(recycleFreq)) {
                    throw new Error('recycleFreq must be a number!');
                } else if (recycleFreq < 0) {
                    throw new Error('recycleFreq must be greater than zero!');
                } else {
                    this.$$recycleFreq = recycleFreq;
                }
                clearInterval(this.$$recycleFreqId);
                if (this.$$deleteOnExpire === 'aggressive') {
                    (function (self) {
                        self.$$recycleFreqId = setInterval(function () {
                            self.removeExpired();
                        }, self.$$recycleFreq);
                    })(this);
                } else {
                    delete this.$$recycleFreqId;
                }
            },
            setStorageMode: function setStorageMode(storageMode, storageImpl) {
                if (!utils.isString(storageMode)) {
                    throw new Error('storageMode must be a string!');
                } else if (storageMode !== 'memory' && storageMode !== 'localStorage' && storageMode !== 'sessionStorage') {
                    throw new Error('storageMode must be "memory", "localStorage" or "sessionStorage"!');
                }

                var prevStorage = $$storage;
                var prevData = $$data;
                var shouldReInsert = false;
                var items = {};

                function load(prevStorage, prevData) {
                    var keys = this.keys();
                    var length = keys.length;
                    if (length) {
                        var _key = void 0;
                        var prevDataIsObject = utils.isObject(prevData);
                        for (var i = 0; i < length; i++) {
                            _key = keys[i];
                            if (prevStorage) {
                                var itemJson = prevStorage().getItem(this.$$prefix + '.data.' + _key);
                                if (itemJson) {
                                    items[_key] = utils.fromJson(itemJson);
                                }
                            } else if (prevDataIsObject) {
                                items[_key] = prevData[_key];
                            }
                            this.remove(_key);
                        }
                        shouldReInsert = true;
                    }
                }

                if (!this.$$initializing) {
                    load.call(this, prevStorage, prevData);
                }

                this.$$storageMode = storageMode;

                if (storageImpl) {
                    if (!utils.isObject(storageImpl)) {
                        throw new Error('storageImpl must be an object!');
                    } else if (!('setItem' in storageImpl) || typeof storageImpl.setItem !== 'function') {
                        throw new Error('storageImpl must implement "setItem(key, value)"!');
                    } else if (!('getItem' in storageImpl) || typeof storageImpl.getItem !== 'function') {
                        throw new Error('storageImpl must implement "getItem(key)"!');
                    } else if (!('removeItem' in storageImpl) || typeof storageImpl.removeItem !== 'function') {
                        throw new Error('storageImpl must implement "removeItem(key)"!');
                    }
                    $$storage = function $$storage() {
                        return storageImpl;
                    };
                } else if (this.$$storageMode === 'localStorage') {
                    try {
                        localStorage.setItem('cachefactory', 'cachefactory');
                        localStorage.removeItem('cachefactory');
                        $$storage = function $$storage() {
                            return localStorage;
                        };
                    } catch (e) {
                        $$storage = null;
                        this.$$storageMode = 'memory';
                    }
                } else if (this.$$storageMode === 'sessionStorage') {
                    try {
                        sessionStorage.setItem('cachefactory', 'cachefactory');
                        sessionStorage.removeItem('cachefactory');
                        $$storage = function $$storage() {
                            return sessionStorage;
                        };
                    } catch (e) {
                        $$storage = null;
                        this.$$storageMode = 'memory';
                    }
                } else {
                    $$storage = null;
                    this.$$storageMode = 'memory';
                }

                if (this.$$initializing) {
                    load.call(this, $$storage, $$data);
                }

                if (shouldReInsert) {
                    var item = void 0;
                    for (var key in items) {
                        item = items[key];
                        this.put(key, item.value, {
                            created: item.created,
                            accessed: item.accessed,
                            expires: item.expires
                        });
                    }
                }
            },
            touch: function touch(key, options) {
                var _this4 = this;

                if (key) {
                    var val = this.get(key, {
                        onExpire: function onExpire(k, v) {
                            return _this4.put(k, v);
                        }
                    });
                    if (val) {
                        this.put(key, val, options);
                    }
                } else {
                    var keys = this.keys();
                    for (var i = 0; i < keys.length; i++) {
                        this.touch(keys[i], options);
                    }
                }
            },
            values: function values() {
                var keys = this.keys();
                var items = [];
                for (var i = 0; i < keys.length; i++) {
                    items.push(this.get(keys[i]));
                }
                return items;
            }
        };

        cache.$$initializing = true;
        cache.setOptions(options, true);
        cache.$$initializing = false;

        return cache;
    }

    function CacheFactory(cacheId, options) {
        return createCache(cacheId, options);
    }

    CacheFactory.createCache = createCache;
    CacheFactory.defaults = defaults;

    CacheFactory.info = function () {
        var keys = _keys(caches);
        var info = {
            size: keys.length,
            caches: {}
        };
        for (var opt in defaults) {
            if (defaults.hasOwnProperty(opt)) {
                info[opt] = defaults[opt];
            }
        }
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            info.caches[key] = caches[key].info();
        }
        return info;
    };

    CacheFactory.get = function (cacheId) {
        return caches[cacheId];
    };
    CacheFactory.keySet = function () {
        return _keySet(caches);
    };
    CacheFactory.keys = function () {
        return _keys(caches);
    };
    CacheFactory.destroy = function (cacheId) {
        if (caches[cacheId]) {
            caches[cacheId].destroy();
            delete caches[cacheId];
        }
    };
    CacheFactory.destroyAll = function () {
        for (var cacheId in caches) {
            caches[cacheId].destroy();
        }
        caches = {};
    };
    CacheFactory.clearAll = function () {
        for (var cacheId in caches) {
            caches[cacheId].removeAll();
        }
    };
    CacheFactory.removeExpiredFromAll = function () {
        var expired = {};
        for (var cacheId in caches) {
            expired[cacheId] = caches[cacheId].removeExpired();
        }
        return expired;
    };
    CacheFactory.enableAll = function () {
        for (var cacheId in caches) {
            caches[cacheId].$$disabled = false;
        }
    };
    CacheFactory.disableAll = function () {
        for (var cacheId in caches) {
            caches[cacheId].$$disabled = true;
        }
    };
    CacheFactory.touchAll = function () {
        for (var cacheId in caches) {
            caches[cacheId].touch();
        }
    };

    CacheFactory.utils = utils;
    CacheFactory.BinaryHeap = BinaryHeap;

    CacheFactory.utils.equals = angular.equals;
    CacheFactory.utils.isObject = angular.isObject;
    CacheFactory.utils.fromJson = angular.fromJson;

    function BinaryHeapProvider() {
        this.$get = function () {
            return CacheFactory.BinaryHeap;
        };
    }

    function CacheFactoryProvider() {
        this.defaults = CacheFactory.defaults;
        this.defaults.storagePrefix = 'angular-cache.caches.';

        this.$get = ['$q', function ($q) {
            CacheFactory.utils.Promise = $q;
            return CacheFactory;
        }];
    }

    angular.module('angular-cache', []).provider('BinaryHeap', BinaryHeapProvider).provider('CacheFactory', CacheFactoryProvider);

    var index = 'angular-cache';

    return index;

}));


/*!
 * angular-loading-bar v0.9.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2016 Wes Cruver
 * License: MIT
 */
/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */


(function() {

    'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
    angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
    angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);


    /**
     * loadingBarInterceptor service
     *
     * Registers itself as an Angular interceptor and listens for XHR requests.
     */
    angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
        .config(['$httpProvider', function ($httpProvider) {

            var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {

                /**
                 * The total number of requests made
                 */
                var reqsTotal = 0;

                /**
                 * The number of requests completed (either successfully or not)
                 */
                var reqsCompleted = 0;

                /**
                 * The amount of time spent fetching before showing the loading bar
                 */
                var latencyThreshold = cfpLoadingBar.latencyThreshold;

                /**
                 * $timeout handle for latencyThreshold
                 */
                var startTimeout;


                /**
                 * calls cfpLoadingBar.complete() which removes the
                 * loading bar from the DOM.
                 */
                function setComplete() {
                    $timeout.cancel(startTimeout);
                    cfpLoadingBar.complete();
                    reqsCompleted = 0;
                    reqsTotal = 0;
                }

                /**
                 * Determine if the response has already been cached
                 * @param  {Object}  config the config option from the request
                 * @return {Boolean} retrns true if cached, otherwise false
                 */
                function isCached(config) {
                    var cache;
                    var defaultCache = $cacheFactory.get('$http');
                    var defaults = $httpProvider.defaults;

                    // Choose the proper cache source. Borrowed from angular: $http service
                    if ((config.cache || defaults.cache) && config.cache !== false &&
                        (config.method === 'GET' || config.method === 'JSONP')) {
                        cache = angular.isObject(config.cache) ? config.cache
                            : angular.isObject(defaults.cache) ? defaults.cache
                                : defaultCache;
                    }

                    var cached = cache !== undefined ?
                        cache.get(config.url) !== undefined : false;

                    if (config.cached !== undefined && cached !== config.cached) {
                        return config.cached;
                    }
                    config.cached = cached;
                    return cached;
                }


                return {
                    'request': function(config) {
                        // Check to make sure this request hasn't already been cached and that
                        // the requester didn't explicitly ask us to ignore this request:
                        if (!config.ignoreLoadingBar && !isCached(config)) {
                            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
                            if (reqsTotal === 0) {
                                startTimeout = $timeout(function() {
                                    cfpLoadingBar.start();
                                }, latencyThreshold);
                            }
                            reqsTotal++;
                            cfpLoadingBar.set(reqsCompleted / reqsTotal);
                        }
                        return config;
                    },

                    'response': function(response) {
                        if (!response || !response.config) {
                            $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
                            return response;
                        }

                        if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
                            reqsCompleted++;
                            if (reqsCompleted >= reqsTotal) {
                                $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
                                setComplete();
                            } else {
                                cfpLoadingBar.set(reqsCompleted / reqsTotal);
                            }
                        }
                        return response;
                    },

                    'responseError': function(rejection) {
                        if (!rejection || !rejection.config) {
                            $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
                            return $q.reject(rejection);
                        }

                        if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
                            reqsCompleted++;
                            if (reqsCompleted >= reqsTotal) {
                                $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
                                setComplete();
                            } else {
                                cfpLoadingBar.set(reqsCompleted / reqsTotal);
                            }
                        }
                        return $q.reject(rejection);
                    }
                };
            }];

            $httpProvider.interceptors.push(interceptor);
        }]);


    /**
     * Loading Bar
     *
     * This service handles adding and removing the actual element in the DOM.
     * Generally, best practices for DOM manipulation is to take place in a
     * directive, but because the element itself is injected in the DOM only upon
     * XHR requests, and it's likely needed on every view, the best option is to
     * use a service.
     */
    angular.module('cfp.loadingBar', [])
        .provider('cfpLoadingBar', function() {

            this.autoIncrement = true;
            this.includeSpinner = true;
            this.includeBar = true;
            this.latencyThreshold = 100;
            this.startSize = 0.02;
            this.parentSelector = 'body';
            this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
            this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

            this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
                var $animate;
                var $parentSelector = this.parentSelector,
                    loadingBarContainer = angular.element(this.loadingBarTemplate),
                    loadingBar = loadingBarContainer.find('div').eq(0),
                    spinner = angular.element(this.spinnerTemplate);

                var incTimeout,
                    completeTimeout,
                    started = false,
                    status = 0;

                var autoIncrement = this.autoIncrement;
                var includeSpinner = this.includeSpinner;
                var includeBar = this.includeBar;
                var startSize = this.startSize;

                /**
                 * Inserts the loading bar element into the dom, and sets it to 2%
                 */
                function _start() {
                    if (!$animate) {
                        $animate = $injector.get('$animate');
                    }

                    $timeout.cancel(completeTimeout);

                    // do not continually broadcast the started event:
                    if (started) {
                        return;
                    }

                    var document = $document[0];
                    var parent = document.querySelector ?
                            document.querySelector($parentSelector)
                            : $document.find($parentSelector)[0]
                        ;

                    if (! parent) {
                        parent = document.getElementsByTagName('body')[0];
                    }

                    var $parent = angular.element(parent);
                    var $after = parent.lastChild && angular.element(parent.lastChild);

                    $rootScope.$broadcast('cfpLoadingBar:started');
                    started = true;

                    if (includeBar) {
                        $animate.enter(loadingBarContainer, $parent, $after);
                    }

                    if (includeSpinner) {
                        $animate.enter(spinner, $parent, loadingBarContainer);
                    }

                    _set(startSize);
                }

                /**
                 * Set the loading bar's width to a certain percent.
                 *
                 * @param n any value between 0 and 1
                 */
                function _set(n) {
                    if (!started) {
                        return;
                    }
                    var pct = (n * 100) + '%';
                    loadingBar.css('width', pct);
                    status = n;

                    // increment loadingbar to give the illusion that there is always
                    // progress but make sure to cancel the previous timeouts so we don't
                    // have multiple incs running at the same time.
                    if (autoIncrement) {
                        $timeout.cancel(incTimeout);
                        incTimeout = $timeout(function() {
                            _inc();
                        }, 250);
                    }
                }

                /**
                 * Increments the loading bar by a random amount
                 * but slows down as it progresses
                 */
                function _inc() {
                    if (_status() >= 1) {
                        return;
                    }

                    var rnd = 0;

                    // TODO: do this mathmatically instead of through conditions

                    var stat = _status();
                    if (stat >= 0 && stat < 0.25) {
                        // Start out between 3 - 6% increments
                        rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
                    } else if (stat >= 0.25 && stat < 0.65) {
                        // increment between 0 - 3%
                        rnd = (Math.random() * 3) / 100;
                    } else if (stat >= 0.65 && stat < 0.9) {
                        // increment between 0 - 2%
                        rnd = (Math.random() * 2) / 100;
                    } else if (stat >= 0.9 && stat < 0.99) {
                        // finally, increment it .5 %
                        rnd = 0.005;
                    } else {
                        // after 99%, don't increment:
                        rnd = 0;
                    }

                    var pct = _status() + rnd;
                    _set(pct);
                }

                function _status() {
                    return status;
                }

                function _completeAnimation() {
                    status = 0;
                    started = false;
                }

                function _complete() {
                    if (!$animate) {
                        $animate = $injector.get('$animate');
                    }

                    _set(1);
                    $timeout.cancel(completeTimeout);

                    // Attempt to aggregate any start/complete calls within 500ms:
                    completeTimeout = $timeout(function() {
                        var promise = $animate.leave(loadingBarContainer, _completeAnimation);
                        if (promise && promise.then) {
                            promise.then(_completeAnimation);
                        }
                        $animate.leave(spinner);
                        $rootScope.$broadcast('cfpLoadingBar:completed');
                    }, 500);
                }

                return {
                    start            : _start,
                    set              : _set,
                    status           : _status,
                    inc              : _inc,
                    complete         : _complete,
                    autoIncrement    : this.autoIncrement,
                    includeSpinner   : this.includeSpinner,
                    latencyThreshold : this.latencyThreshold,
                    parentSelector   : this.parentSelector,
                    startSize        : this.startSize
                };


            }];     //
        });       // wtf javascript. srsly
})();       //


(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'));
    } else {
        // Browser globals (root is window), we don't register it.
        factory(root.angular);
    }
}(this , function (angular) {
    'use strict';

    // RequireJS does not pass in Angular to us (will be undefined).
    // Fallback to window which should mostly be there.
    angular = (angular && angular.module ) ? angular : window.angular;

    /**
     * @ngdoc overview
     * @name ngStorage
     */

    return angular.module('ngStorage', [])

    /**
     * @ngdoc object
     * @name ngStorage.$localStorage
     * @requires $rootScope
     * @requires $window
     */

        .provider('$localStorage', _storageProvider('localStorage'))

        /**
         * @ngdoc object
         * @name ngStorage.$sessionStorage
         * @requires $rootScope
         * @requires $window
         */

        .provider('$sessionStorage', _storageProvider('sessionStorage'));

    function _storageProvider(storageType) {
        return function () {
            var storageKeyPrefix = 'ngStorage-';

            this.setKeyPrefix = function (prefix) {
                if (typeof prefix !== 'string') {
                    throw new TypeError('[ngStorage] - ' + storageType + 'Provider.setKeyPrefix() expects a String.');
                }
                storageKeyPrefix = prefix;
            };

            var serializer = angular.toJson;
            var deserializer = angular.fromJson;

            this.setSerializer = function (s) {
                if (typeof s !== 'function') {
                    throw new TypeError('[ngStorage] - ' + storageType + 'Provider.setSerializer expects a function.');
                }

                serializer = s;
            };

            this.setDeserializer = function (d) {
                if (typeof d !== 'function') {
                    throw new TypeError('[ngStorage] - ' + storageType + 'Provider.setDeserializer expects a function.');
                }

                deserializer = d;
            };

            // Note: This is not very elegant at all.
            this.get = function (key) {
                return deserializer(window[storageType].getItem(storageKeyPrefix + key));
            };

            // Note: This is not very elegant at all.
            this.set = function (key, value) {
                return window[storageType].setItem(storageKeyPrefix + key, serializer(value));
            };

            this.$get = [
                '$rootScope',
                '$window',
                '$log',
                '$timeout',

                function(
                    $rootScope,
                    $window,
                    $log,
                    $timeout
                ){
                    function isStorageSupported(storageType) {

                        // Some installations of IE, for an unknown reason, throw "SCRIPT5: Error: Access is denied"
                        // when accessing window.localStorage. This happens before you try to do anything with it. Catch
                        // that error and allow execution to continue.

                        // fix 'SecurityError: DOM Exception 18' exception in Desktop Safari, Mobile Safari
                        // when "Block cookies": "Always block" is turned on
                        var supported;
                        try {
                            supported = $window[storageType];
                        }
                        catch (err) {
                            supported = false;
                        }

                        // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage
                        // is available, but trying to call .setItem throws an exception below:
                        // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
                        if (supported && storageType === 'localStorage') {
                            var key = '__' + Math.round(Math.random() * 1e7);

                            try {
                                localStorage.setItem(key, key);
                                localStorage.removeItem(key);
                            }
                            catch (err) {
                                supported = false;
                            }
                        }

                        return supported;
                    }

                    // The magic number 10 is used which only works for some keyPrefixes...
                    // See https://github.com/gsklee/ngStorage/issues/137
                    var prefixLength = storageKeyPrefix.length;

                    // #9: Assign a placeholder object if Web Storage is unavailable to prevent breaking the entire AngularJS app
                    var webStorage = isStorageSupported(storageType) || ($log.warn('This browser does not support Web Storage!'), {setItem: angular.noop, getItem: angular.noop}),
                        $storage = {
                            $default: function(items) {
                                for (var k in items) {
                                    angular.isDefined($storage[k]) || ($storage[k] = items[k]);
                                }

                                $storage.$sync();
                                return $storage;
                            },
                            $reset: function(items) {
                                for (var k in $storage) {
                                    '$' === k[0] || (delete $storage[k] && webStorage.removeItem(storageKeyPrefix + k));
                                }

                                return $storage.$default(items);
                            },
                            $sync: function () {
                                for (var i = 0, l = webStorage.length, k; i < l; i++) {
                                    // #8, #10: `webStorage.key(i)` may be an empty string (or throw an exception in IE9 if `webStorage` is empty)
                                    (k = webStorage.key(i)) && storageKeyPrefix === k.slice(0, prefixLength) && ($storage[k.slice(prefixLength)] = deserializer(webStorage.getItem(k)));
                                }
                            },
                            $apply: function() {
                                var temp$storage;

                                _debounce = null;

                                if (!angular.equals($storage, _last$storage)) {
                                    temp$storage = angular.copy(_last$storage);
                                    angular.forEach($storage, function(v, k) {
                                        if (angular.isDefined(v) && '$' !== k[0]) {
                                            webStorage.setItem(storageKeyPrefix + k, serializer(v))
                                            delete temp$storage[k];
                                        }
                                    });

                                    for (var k in temp$storage) {
                                        webStorage.removeItem(storageKeyPrefix + k);
                                    }

                                    _last$storage = angular.copy($storage);
                                }
                            },
                        },
                        _last$storage,
                        _debounce;

                    $storage.$sync();

                    _last$storage = angular.copy($storage);

                    $rootScope.$watch(function() {
                        _debounce || (_debounce = $timeout($storage.$apply, 100, false));
                    });

                    // #6: Use `$window.addEventListener` instead of `angular.element` to avoid the jQuery-specific `event.originalEvent`
                    $window.addEventListener && $window.addEventListener('storage', function(event) {
                        if (storageKeyPrefix === event.key.slice(0, prefixLength)) {
                            event.newValue ? $storage[event.key.slice(prefixLength)] = deserializer(event.newValue) : delete $storage[event.key.slice(prefixLength)];

                            _last$storage = angular.copy($storage);

                            $rootScope.$apply();
                        }
                    });

                    $window.addEventListener && $window.addEventListener('beforeunload', function() {
                        $storage.$apply();
                    });

                    return $storage;
                }
            ];
        };
    }

}));
(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'));
    } else {
        // Browser globals (root is window), we don't register it.
        factory(root.angular);
    }
}(this , function (angular) {
    'use strict';

    // RequireJS does not pass in Angular to us (will be undefined).
    // Fallback to window which should mostly be there.
    angular = (angular && angular.module ) ? angular : window.angular;

    /* ng-infinite-scroll - v1.3.0 - 2016-06-30 */
    angular.module('infinite-scroll', []).value('THROTTLE_MILLISECONDS', null).directive('infiniteScroll', [
        '$rootScope', '$window', '$interval', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
            return {
                scope: {
                    infiniteScroll: '&',
                    infiniteScrollContainer: '=',
                    infiniteScrollDistance: '=',
                    infiniteScrollDisabled: '=',
                    infiniteScrollUseDocumentBottom: '=',
                    infiniteScrollListenForEvent: '@'
                },
                link: function(scope, elem, attrs) {
                    var changeContainer, checkInterval, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, unregisterEventListener, useDocumentBottom, windowElement;
                    windowElement = angular.element($window);
                    scrollDistance = null;
                    scrollEnabled = null;
                    checkWhenEnabled = null;
                    container = null;
                    immediateCheck = true;
                    useDocumentBottom = false;
                    unregisterEventListener = null;
                    checkInterval = false;
                    height = function(elem) {
                        elem = elem[0] || elem;
                        if (isNaN(elem.offsetHeight)) {
                            return elem.document.documentElement.clientHeight;
                        } else {
                            return elem.offsetHeight;
                        }
                    };
                    offsetTop = function(elem) {
                        if (!elem[0].getBoundingClientRect || elem.css('none')) {
                            return;
                        }
                        return elem[0].getBoundingClientRect().top + pageYOffset(elem);
                    };
                    pageYOffset = function(elem) {
                        elem = elem[0] || elem;
                        if (isNaN(window.pageYOffset)) {
                            return elem.document.documentElement.scrollTop;
                        } else {
                            return elem.ownerDocument.defaultView.pageYOffset;
                        }
                    };
                    handler = function() {
                        var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
                        if (container === windowElement) {
                            containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
                            elementBottom = offsetTop(elem) + height(elem);
                        } else {
                            containerBottom = height(container);
                            containerTopOffset = 0;
                            if (offsetTop(container) !== void 0) {
                                containerTopOffset = offsetTop(container);
                            }
                            elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
                        }
                        if (useDocumentBottom) {
                            elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
                        }
                        remaining = elementBottom - containerBottom;
                        shouldScroll = remaining <= height(container) * scrollDistance + 1;
                        if (shouldScroll) {
                            checkWhenEnabled = true;
                            if (scrollEnabled) {
                                if (scope.$$phase || $rootScope.$$phase) {
                                    return scope.infiniteScroll();
                                } else {
                                    return scope.$apply(scope.infiniteScroll);
                                }
                            }
                        } else {
                            if (checkInterval) {
                                $interval.cancel(checkInterval);
                            }
                            return checkWhenEnabled = false;
                        }
                    };
                    throttle = function(func, wait) {
                        var later, previous, timeout;
                        timeout = null;
                        previous = 0;
                        later = function() {
                            previous = new Date().getTime();
                            $interval.cancel(timeout);
                            timeout = null;
                            return func.call();
                        };
                        return function() {
                            var now, remaining;
                            now = new Date().getTime();
                            remaining = wait - (now - previous);
                            if (remaining <= 0) {
                                $interval.cancel(timeout);
                                timeout = null;
                                previous = now;
                                return func.call();
                            } else {
                                if (!timeout) {
                                    return timeout = $interval(later, remaining, 1);
                                }
                            }
                        };
                    };
                    if (THROTTLE_MILLISECONDS != null) {
                        handler = throttle(handler, THROTTLE_MILLISECONDS);
                    }
                    scope.$on('$destroy', function() {
                        container.unbind('scroll', handler);
                        if (unregisterEventListener != null) {
                            unregisterEventListener();
                            unregisterEventListener = null;
                        }
                        if (checkInterval) {
                            return $interval.cancel(checkInterval);
                        }
                    });
                    handleInfiniteScrollDistance = function(v) {
                        return scrollDistance = parseFloat(v) || 0;
                    };
                    scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
                    handleInfiniteScrollDistance(scope.infiniteScrollDistance);
                    handleInfiniteScrollDisabled = function(v) {
                        scrollEnabled = !v;
                        if (scrollEnabled && checkWhenEnabled) {
                            checkWhenEnabled = false;
                            return handler();
                        }
                    };
                    scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
                    handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
                    handleInfiniteScrollUseDocumentBottom = function(v) {
                        return useDocumentBottom = v;
                    };
                    scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
                    handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
                    changeContainer = function(newContainer) {
                        if (container != null) {
                            container.unbind('scroll', handler);
                        }
                        container = newContainer;
                        if (newContainer != null) {
                            return container.bind('scroll', handler);
                        }
                    };
                    changeContainer(windowElement);
                    if (scope.infiniteScrollListenForEvent) {
                        unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
                    }
                    handleInfiniteScrollContainer = function(newContainer) {
                        if ((newContainer == null) || newContainer.length === 0) {
                            return;
                        }
                        if (newContainer.nodeType && newContainer.nodeType === 1) {
                            newContainer = angular.element(newContainer);
                        } else if (typeof newContainer.append === 'function') {
                            newContainer = angular.element(newContainer[newContainer.length - 1]);
                        } else if (typeof newContainer === 'string') {
                            newContainer = angular.element(document.querySelector(newContainer));
                        }
                        if (newContainer != null) {
                            return changeContainer(newContainer);
                        } else {
                            throw new Error("invalid infinite-scroll-container attribute.");
                        }
                    };
                    scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
                    handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
                    if (attrs.infiniteScrollParent != null) {
                        changeContainer(angular.element(elem.parent()));
                    }
                    if (attrs.infiniteScrollImmediateCheck != null) {
                        immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
                    }
                    return checkInterval = $interval((function() {
                        if (immediateCheck) {
                            handler();
                        }
                        return $interval.cancel(checkInterval);
                    }));
                }
            };
        }
    ]);

    if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
        module.exports = 'infinite-scroll';
    }

}));

/*!
 * ngToast v2.0.0 (http://tameraydin.github.io/ngToast)
 * Copyright 2016 Tamer Aydin (http://tamerayd.in)
 * Licensed under MIT (http://tameraydin.mit-license.org/)
 */

(function(window, angular, undefined) {
    'use strict';

    angular.module('ngToast.provider', [])
        .provider('ngToast', [
            function() {
                var messages = [],
                    messageStack = [];

                var defaults = {
                    animation: false,
                    className: 'success',
                    additionalClasses: null,
                    dismissOnTimeout: true,
                    timeout: 4000,
                    dismissButton: false,
                    dismissButtonHtml: '&times;',
                    dismissOnClick: true,
                    onDismiss: null,
                    compileContent: false,
                    combineDuplications: false,
                    horizontalPosition: 'right', // right, center, left
                    verticalPosition: 'top', // top, bottom,
                    maxNumber: 0,
                    newestOnTop: true
                };

                function Message(msg) {
                    var id = Math.floor(Math.random()*1000);
                    while (messages.indexOf(id) > -1) {
                        id = Math.floor(Math.random()*1000);
                    }

                    this.id = id;
                    this.count = 0;
                    this.animation = defaults.animation;
                    this.className = defaults.className;
                    this.additionalClasses = defaults.additionalClasses;
                    this.dismissOnTimeout = defaults.dismissOnTimeout;
                    this.timeout = defaults.timeout;
                    this.dismissButton = defaults.dismissButton;
                    this.dismissButtonHtml = defaults.dismissButtonHtml;
                    this.dismissOnClick = defaults.dismissOnClick;
                    this.onDismiss = defaults.onDismiss;
                    this.compileContent = defaults.compileContent;

                    angular.extend(this, msg);
                }

                this.configure = function(config) {
                    angular.extend(defaults, config);
                };

                this.$get = [function() {
                    var _createWithClassName = function(className, msg) {
                        msg = (typeof msg === 'object') ? msg : {content: msg};
                        msg.className = className;

                        return this.create(msg);
                    };

                    return {
                        settings: defaults,
                        messages: messages,
                        dismiss: function(id) {
                            if (id) {
                                for (var i = messages.length - 1; i >= 0; i--) {
                                    if (messages[i].id === id) {
                                        messages.splice(i, 1);
                                        messageStack.splice(messageStack.indexOf(id), 1);
                                        return;
                                    }
                                }

                            } else {
                                while(messages.length > 0) {
                                    messages.pop();
                                }
                                messageStack = [];
                            }
                        },
                        create: function(msg) {
                            msg = (typeof msg === 'object') ? msg : {content: msg};

                            if (defaults.combineDuplications) {
                                for (var i = messageStack.length - 1; i >= 0; i--) {
                                    var _msg = messages[i];
                                    var _className = msg.className || 'success';

                                    if (_msg.content === msg.content &&
                                        _msg.className === _className) {
                                        messages[i].count++;
                                        return;
                                    }
                                }
                            }

                            if (defaults.maxNumber > 0 &&
                                messageStack.length >= defaults.maxNumber) {
                                this.dismiss(messageStack[0]);
                            }

                            var newMsg = new Message(msg);
                            messages[defaults.newestOnTop ? 'unshift' : 'push'](newMsg);
                            messageStack.push(newMsg.id);

                            return newMsg.id;
                        },
                        success: function(msg) {
                            return _createWithClassName.call(this, 'success', msg);
                        },
                        info: function(msg) {
                            return _createWithClassName.call(this, 'info', msg);
                        },
                        warning: function(msg) {
                            return _createWithClassName.call(this, 'warning', msg);
                        },
                        danger: function(msg) {
                            return _createWithClassName.call(this, 'danger', msg);
                        }
                    };
                }];
            }
        ]);

})(window, window.angular);

(function(window, angular) {
    'use strict';

    angular.module('ngToast.directives', ['ngToast.provider'])
        .run(['$templateCache',
            function($templateCache) {
                $templateCache.put('ngToast/toast.html',
                    '<div class="ng-toast ng-toast--{{hPos}} ng-toast--{{vPos}} {{animation ? \'ng-toast--animate-\' + animation : \'\'}}">' +
                    '<ul class="ng-toast__list">' +
                    '<toast-message ng-repeat="message in messages" ' +
                    'message="message" count="message.count">' +
                    '<span ng-bind-html="message.content"></span>' +
                    '</toast-message>' +
                    '</ul>' +
                    '</div>');
                $templateCache.put('ngToast/toastMessage.html',
                    '<li class="ng-toast__message {{message.additionalClasses}}"' +
                    'ng-mouseenter="onMouseEnter()"' +
                    'ng-mouseleave="onMouseLeave()">' +
                    '<div class="alert alert-{{message.className}}" ' +
                    'ng-class="{\'alert-dismissible\': message.dismissButton}">' +
                    '<button type="button" class="close" ' +
                    'ng-if="message.dismissButton" ' +
                    'ng-bind-html="message.dismissButtonHtml" ' +
                    'ng-click="!message.dismissOnClick && dismiss()">' +
                    '</button>' +
                    '<span ng-if="count" class="ng-toast__message__count">' +
                    '{{count + 1}}' +
                    '</span>' +
                    '<span ng-if="!message.compileContent" ng-transclude></span>' +
                    '</div>' +
                    '</li>');
            }
        ])
        .directive('toast', ['ngToast', '$templateCache', '$log',
            function(ngToast, $templateCache, $log) {
                return {
                    replace: true,
                    restrict: 'EA',
                    templateUrl: 'ngToast/toast.html',
                    compile: function(tElem, tAttrs) {
                        if (tAttrs.template) {
                            var template = $templateCache.get(tAttrs.template);
                            if (template) {
                                tElem.replaceWith(template);
                            } else {
                                $log.warn('ngToast: Provided template could not be loaded. ' +
                                    'Please be sure that it is populated before the <toast> element is represented.');
                            }
                        }

                        return function(scope) {
                            scope.hPos = ngToast.settings.horizontalPosition;
                            scope.vPos = ngToast.settings.verticalPosition;
                            scope.animation = ngToast.settings.animation;
                            scope.messages = ngToast.messages;
                        };
                    }
                };
            }
        ])
        .directive('toastMessage', ['$timeout', '$compile', 'ngToast',
            function($timeout, $compile, ngToast) {
                return {
                    replace: true,
                    transclude: true,
                    restrict: 'EA',
                    scope: {
                        message: '=',
                        count: '='
                    },
                    controller: ['$scope', 'ngToast', function($scope, ngToast) {
                        $scope.dismiss = function() {
                            ngToast.dismiss($scope.message.id);
                        };
                    }],
                    templateUrl: 'ngToast/toastMessage.html',
                    link: function(scope, element, attrs, ctrl, transclude) {
                        element.attr('data-message-id', scope.message.id);

                        var dismissTimeout;
                        var scopeToBind = scope.message.compileContent;

                        scope.cancelTimeout = function() {
                            $timeout.cancel(dismissTimeout);
                        };

                        scope.startTimeout = function() {
                            if (scope.message.dismissOnTimeout) {
                                dismissTimeout = $timeout(function() {
                                    ngToast.dismiss(scope.message.id);
                                }, scope.message.timeout);
                            }
                        };

                        scope.onMouseEnter = function() {
                            scope.cancelTimeout();
                        };

                        scope.onMouseLeave = function() {
                            scope.startTimeout();
                        };

                        if (scopeToBind) {
                            var transcludedEl;

                            transclude(scope, function(clone) {
                                transcludedEl = clone;
                                element.children().append(transcludedEl);
                            });

                            $timeout(function() {
                                $compile(transcludedEl.contents())
                                (typeof scopeToBind === 'boolean' ?
                                    scope.$parent : scopeToBind, function(compiledClone) {
                                    transcludedEl.replaceWith(compiledClone);
                                });
                            }, 0);
                        }

                        scope.startTimeout();

                        if (scope.message.dismissOnClick) {
                            element.bind('click', function() {
                                ngToast.dismiss(scope.message.id);
                                scope.$apply();
                            });
                        }

                        if (scope.message.onDismiss) {
                            scope.$on('$destroy',
                                scope.message.onDismiss.bind(scope.message));
                        }
                    }
                };
            }
        ]);

})(window, window.angular);

(function(window, angular) {
    'use strict';

    angular
        .module('ngToast', [
            'ngSanitize',
            'ngToast.directives',
            'ngToast.provider'
        ]);

})(window, window.angular);

