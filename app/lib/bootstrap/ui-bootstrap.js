angular.module("ui.bootstrap",["ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdownToggle","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(a,b,c){function d(a){for(var b in a)if(void 0!==f.style[b])return a[b]}var e=function(d,f,g){g=g||{};var h=a.defer(),i=e[g.animation?"animationEndEventName":"transitionEndEventName"],j=function(){c.$apply(function(){d.unbind(i,j),h.resolve(d)})};return i&&d.bind(i,j),b(function(){angular.isString(f)?d.addClass(f):angular.isFunction(f)?f(d):angular.isObject(f)&&d.css(f),i||h.resolve(d)}),h.promise.cancel=function(){i&&d.unbind(i,j),h.reject("Transition cancelled")},h.promise},f=document.createElement("trans"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},h={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return e.transitionEndEventName=d(g),e.animationEndEventName=d(h),e}]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(a){var b=function(a,b,c){b.removeClass("collapse"),b.css({height:c}),b[0].offsetWidth,b.addClass("collapse")};return{link:function(c,d,e){var f,g=!0;c.$watch(function(){return d[0].scrollHeight},function(){0!==d[0].scrollHeight&&(f||(g?b(c,d,d[0].scrollHeight+"px"):b(c,d,"auto")))}),c.$watch(e.collapse,function(a){a?k():j()});var h,i=function(b){return h&&h.cancel(),h=a(d,b),h.then(function(){h=void 0},function(){h=void 0}),h},j=function(){g?(g=!1,f||b(c,d,"auto")):i({height:d[0].scrollHeight+"px"}).then(function(){f||b(c,d,"auto")}),f=!1},k=function(){f=!0,g?(g=!1,b(c,d,0)):(b(c,d,d[0].scrollHeight+"px"),i({height:"0"}))}}}}]),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("accordionConfig",{closeOthers:!0}).controller("AccordionController",["$scope","$attrs","accordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(this.groups.indexOf(a),1)}}]).directive("accordion",function(){return{restrict:"EA",controller:"AccordionController",transclude:!0,replace:!1,templateUrl:"template/accordion/accordion.html"}}).directive("accordionGroup",["$parse","$transition","$timeout",function(a){return{require:"^accordion",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/accordion/accordion-group.html",scope:{heading:"@"},controller:["$scope",function(){this.setHeading=function(a){this.heading=a}}],link:function(b,c,d,e){var f,g;e.addGroup(b),b.isOpen=!1,d.isOpen&&(f=a(d.isOpen),g=f.assign,b.$watch(function(){return f(b.$parent)},function(a){b.isOpen=a}),b.isOpen=f?f(b.$parent):!1),b.$watch("isOpen",function(a){a&&e.closeOthers(b),g&&g(b.$parent,a)})}}}]).directive("accordionHeading",function(){return{restrict:"EA",transclude:!0,template:"",replace:!0,require:"^accordionGroup",compile:function(a,b,c){return function(a,b,d,e){e.setHeading(c(a,function(){}))}}}}).directive("accordionTransclude",function(){return{require:"^accordionGroup",link:function(a,b,c,d){a.$watch(function(){return d[c.accordionTransclude]},function(a){a&&(b.html(""),b.append(a))})}}}),angular.module("ui.bootstrap.alert",[]).directive("alert",function(){return{restrict:"EA",templateUrl:"template/alert/alert.html",transclude:!0,replace:!0,scope:{type:"=",close:"&"},link:function(a,b,c){a.closeable="close"in c}}}),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(a,b,c){b.addClass("ng-binding").data("$binding",c.bindHtmlUnsafe),a.$watch(c.bindHtmlUnsafe,function(a){b.html(a||"")})}}),angular.module("ui.bootstrap.buttons",[]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).directive("btnRadio",["buttonConfig",function(a){var b=a.activeClass||"active",c=a.toggleEvent||"click";return{require:"ngModel",link:function(a,d,e,f){f.$render=function(){d.toggleClass(b,angular.equals(f.$modelValue,a.$eval(e.btnRadio)))},d.bind(c,function(){d.hasClass(b)||a.$apply(function(){f.$setViewValue(a.$eval(e.btnRadio)),f.$render()})})}}}]).directive("btnCheckbox",["buttonConfig",function(a){var b=a.activeClass||"active",c=a.toggleEvent||"click";return{require:"ngModel",link:function(a,d,e,f){function g(){var b=a.$eval(e.btnCheckboxTrue);return angular.isDefined(b)?b:!0}function h(){var b=a.$eval(e.btnCheckboxFalse);return angular.isDefined(b)?b:!1}f.$render=function(){d.toggleClass(b,angular.equals(f.$modelValue,g()))},d.bind(c,function(){a.$apply(function(){f.$setViewValue(d.hasClass(b)?h():g()),f.$render()})})}}}]),angular.module("ui.bootstrap.carousel",["ui.bootstrap.transition"]).controller("CarouselController",["$scope","$timeout","$transition","$q",function(a,b,c){function d(){function c(){f?(a.next(),d()):a.pause()}e&&b.cancel(e);var g=+a.interval;!isNaN(g)&&g>=0&&(e=b(c,g))}var e,f,g=this,h=g.slides=[],i=-1;g.currentSlide=null,g.select=function(e,f){function j(){g.currentSlide&&angular.isString(f)&&!a.noTransition&&e.$element?(e.$element.addClass(f),e.$element[0].offsetWidth,angular.forEach(h,function(a){angular.extend(a,{direction:"",entering:!1,leaving:!1,active:!1})}),angular.extend(e,{direction:f,active:!0,entering:!0}),angular.extend(g.currentSlide||{},{direction:f,leaving:!0}),a.$currentTransition=c(e.$element,{}),function(b,c){a.$currentTransition.then(function(){k(b,c)},function(){k(b,c)})}(e,g.currentSlide)):k(e,g.currentSlide),g.currentSlide=e,i=l,d()}function k(b,c){angular.extend(b,{direction:"",active:!0,leaving:!1,entering:!1}),angular.extend(c||{},{direction:"",active:!1,leaving:!1,entering:!1}),a.$currentTransition=null}var l=h.indexOf(e);void 0===f&&(f=l>i?"next":"prev"),e&&e!==g.currentSlide&&(a.$currentTransition?(a.$currentTransition.cancel(),b(j)):j())},g.indexOfSlide=function(a){return h.indexOf(a)},a.next=function(){var b=(i+1)%h.length;return a.$currentTransition?void 0:g.select(h[b],"next")},a.prev=function(){var b=0>i-1?h.length-1:i-1;return a.$currentTransition?void 0:g.select(h[b],"prev")},a.select=function(a){g.select(a)},a.isActive=function(a){return g.currentSlide===a},a.slides=function(){return h},a.$watch("interval",d),a.play=function(){f||(f=!0,d())},a.pause=function(){a.noPause||(f=!1,e&&b.cancel(e))},g.addSlide=function(b,c){b.$element=c,h.push(b),1===h.length||b.active?(g.select(h[h.length-1]),1==h.length&&a.play()):b.active=!1},g.removeSlide=function(a){var b=h.indexOf(a);h.splice(b,1),h.length>0&&a.active?b>=h.length?g.select(h[b-1]):g.select(h[b]):i>b&&i--}}]).directive("carousel",[function(){return{restrict:"EA",transclude:!0,replace:!0,controller:"CarouselController",require:"carousel",templateUrl:"template/carousel/carousel.html",scope:{interval:"=",noTransition:"=",noPause:"="}}}]).directive("slide",["$parse",function(a){return{require:"^carousel",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/carousel/slide.html",scope:{},link:function(b,c,d,e){if(d.active){var f=a(d.active),g=f.assign,h=b.active=f(b.$parent);b.$watch(function(){var a=f(b.$parent);return a!==b.active&&(a!==h?h=b.active=a:g(b.$parent,a=h=b.active)),a})}e.addSlide(b,c),b.$on("$destroy",function(){e.removeSlide(b)}),b.$watch("active",function(a){a&&e.select(b)})}}}]),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(a,b){function c(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}function d(a){return"static"===(c(a,"position")||"static")}var e=function(b){for(var c=a[0],e=b.offsetParent||c;e&&e!==c&&d(e);)e=e.offsetParent;return e||c};return{position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);return f!=a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft),{width:b.prop("offsetWidth"),height:b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},offset:function(c){var d=c[0].getBoundingClientRect();return{width:c.prop("offsetWidth"),height:c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].body.scrollTop||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].body.scrollLeft||a[0].documentElement.scrollLeft)}}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.position"]).constant("datepickerConfig",{dayFormat:"dd",monthFormat:"MMMM",yearFormat:"yyyy",dayHeaderFormat:"EEE",dayTitleFormat:"MMMM yyyy",monthTitleFormat:"yyyy",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null}).controller("DatepickerController",["$scope","$attrs","dateFilter","datepickerConfig",function(a,b,c,d){function e(b,c){return angular.isDefined(b)?a.$parent.$eval(b):c}function f(a,b){return new Date(a,b,0).getDate()}function g(a,b){for(var c=new Array(b),d=a,e=0;b>e;)c[e++]=new Date(d),d.setDate(d.getDate()+1);return c}function h(a,b,d,e){return{date:a,label:c(a,b),selected:!!d,secondary:!!e}}var i={day:e(b.dayFormat,d.dayFormat),month:e(b.monthFormat,d.monthFormat),year:e(b.yearFormat,d.yearFormat),dayHeader:e(b.dayHeaderFormat,d.dayHeaderFormat),dayTitle:e(b.dayTitleFormat,d.dayTitleFormat),monthTitle:e(b.monthTitleFormat,d.monthTitleFormat)},j=e(b.startingDay,d.startingDay),k=e(b.yearRange,d.yearRange);this.minDate=d.minDate?new Date(d.minDate):null,this.maxDate=d.maxDate?new Date(d.maxDate):null,this.modes=[{name:"day",getVisibleDates:function(a,b){var d=a.getFullYear(),e=a.getMonth(),k=new Date(d,e,1),l=j-k.getDay(),m=l>0?7-l:-l,n=new Date(k),o=0;m>0&&(n.setDate(-m+1),o+=m),o+=f(d,e+1),o+=(7-o%7)%7;for(var p=g(n,o),q=new Array(7),r=0;o>r;r++){var s=new Date(p[r]);p[r]=h(s,i.day,b&&b.getDate()===s.getDate()&&b.getMonth()===s.getMonth()&&b.getFullYear()===s.getFullYear(),s.getMonth()!==e)}for(var t=0;7>t;t++)q[t]=c(p[t].date,i.dayHeader);return{objects:p,title:c(a,i.dayTitle),labels:q}},compare:function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},split:7,step:{months:1}},{name:"month",getVisibleDates:function(a,b){for(var d=new Array(12),e=a.getFullYear(),f=0;12>f;f++){var g=new Date(e,f,1);d[f]=h(g,i.month,b&&b.getMonth()===f&&b.getFullYear()===e)}return{objects:d,title:c(a,i.monthTitle)}},compare:function(a,b){return new Date(a.getFullYear(),a.getMonth())-new Date(b.getFullYear(),b.getMonth())},split:3,step:{years:1}},{name:"year",getVisibleDates:function(a,b){for(var c=new Array(k),d=a.getFullYear(),e=parseInt((d-1)/k,10)*k+1,f=0;k>f;f++){var g=new Date(e+f,0,1);c[f]=h(g,i.year,b&&b.getFullYear()===g.getFullYear())}return{objects:c,title:[c[0].label,c[k-1].label].join(" - ")}},compare:function(a,b){return a.getFullYear()-b.getFullYear()},split:5,step:{years:k}}],this.isDisabled=function(b,c){var d=this.modes[c||0];return this.minDate&&d.compare(b,this.minDate)<0||this.maxDate&&d.compare(b,this.maxDate)>0||a.dateDisabled&&a.dateDisabled({date:b,mode:d.name})}}]).directive("datepicker",["dateFilter","$parse","datepickerConfig","$log",function(a,b,c,d){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/datepicker.html",scope:{dateDisabled:"&"},require:["datepicker","?^ngModel"],controller:"DatepickerController",link:function(a,e,f,g){function h(){a.showWeekNumbers=0===o&&q}function i(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c}function j(b){var c=null,e=!0;n.$modelValue&&(c=new Date(n.$modelValue),isNaN(c)?(e=!1,d.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):b&&(p=c)),n.$setValidity("date",e);var f=m.modes[o],g=f.getVisibleDates(p,c);angular.forEach(g.objects,function(a){a.disabled=m.isDisabled(a.date,o)}),n.$setValidity("date-disabled",!c||!m.isDisabled(c)),a.rows=i(g.objects,f.split),a.labels=g.labels||[],a.title=g.title}function k(a){o=a,h(),j()}function l(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}var m=g[0],n=g[1];if(n){var o=0,p=new Date,q=c.showWeeks;f.showWeeks?a.$parent.$watch(b(f.showWeeks),function(a){q=!!a,h()}):h(),f.min&&a.$parent.$watch(b(f.min),function(a){m.minDate=a?new Date(a):null,j()}),f.max&&a.$parent.$watch(b(f.max),function(a){m.maxDate=a?new Date(a):null,j()}),n.$render=function(){j(!0)},a.select=function(a){if(0===o){var b=new Date(n.$modelValue);b.setFullYear(a.getFullYear(),a.getMonth(),a.getDate()),n.$setViewValue(b),j(!0)}else p=a,k(o-1)},a.move=function(a){var b=m.modes[o].step;p.setMonth(p.getMonth()+a*(b.months||0)),p.setFullYear(p.getFullYear()+a*(b.years||0)),j()},a.toggleMode=function(){k((o+1)%m.modes.length)},a.getWeekNumber=function(b){return 0===o&&a.showWeekNumbers&&7===b.length?l(b[0].date):null}}}}}]).constant("datepickerPopupConfig",{dateFormat:"yyyy-MM-dd",closeOnDateSelection:!0}).directive("datepickerPopup",["$compile","$parse","$document","$position","dateFilter","datepickerPopupConfig",function(a,b,c,d,e,f){return{restrict:"EA",require:"ngModel",link:function(g,h,i,j){function k(a){t?t(g,!!a):r.isOpen=!!a}function l(a){if(a){if(angular.isDate(a))return j.$setValidity("date",!0),a;if(angular.isString(a)){var b=new Date(a);return isNaN(b)?(j.$setValidity("date",!1),void 0):(j.$setValidity("date",!0),b)}return j.$setValidity("date",!1),void 0}return j.$setValidity("date",!0),null}function m(){r.date=j.$modelValue,o()}function n(a,c,d){a&&(g.$watch(b(a),function(a){r[c]=a}),x.attr(d||c,c))}function o(){r.position=d.position(h),r.position.top=r.position.top+h.prop("offsetHeight")}var p=angular.isDefined(i.closeOnDateSelection)?r.$eval(i.closeOnDateSelection):f.closeOnDateSelection,q=i.datepickerPopup||f.dateFormat,r=g.$new();g.$on("$destroy",function(){r.$destroy()});var s,t;i.isOpen&&(s=b(i.isOpen),t=s.assign,g.$watch(s,function(a){r.isOpen=!!a})),r.isOpen=s?s(g):!1;var u=function(a){r.isOpen&&a.target!==h[0]&&r.$apply(function(){k(!1)})},v=function(){r.$apply(function(){k(!0)})},w=angular.element("<datepicker-popup-wrap><datepicker></datepicker></datepicker-popup-wrap>");w.attr({"ng-model":"date","ng-change":"dateSelection()"});var x=w.find("datepicker");i.datepickerOptions&&x.attr(angular.extend({},g.$eval(i.datepickerOptions))),j.$parsers.unshift(l),r.dateSelection=function(){j.$setViewValue(r.date),j.$render(),p&&k(!1)},h.bind("input change keyup",function(){r.$apply(function(){m()})}),j.$render=function(){var a=j.$viewValue?e(j.$viewValue,q):"";h.val(a),m()},n(i.min,"min"),n(i.max,"max"),i.showWeeks?n(i.showWeeks,"showWeeks","show-weeks"):(r.showWeeks=!0,x.attr("show-weeks","showWeeks")),i.dateDisabled&&x.attr("date-disabled",i.dateDisabled);var y=!1,z=!1;r.$watch("isOpen",function(a){a?(o(),c.bind("click",u),z&&h.unbind("focus",v),h[0].focus(),y=!0):(y&&c.unbind("click",u),h.bind("focus",v),z=!0),t&&t(g,a)});var A=b(i.ngModel).assign;r.today=function(){A(g,new Date)},r.clear=function(){A(g,null)},h.after(a(w)(r))}}}]).directive("datepickerPopupWrap",[function(){return{restrict:"E",replace:!0,transclude:!0,templateUrl:"template/datepicker/popup.html",link:function(a,b){b.bind("click",function(a){a.preventDefault(),a.stopPropagation()})}}}]),angular.module("ui.bootstrap.dropdownToggle",[]).directive("dropdownToggle",["$document","$location",function(a){var b=null,c=angular.noop;return{restrict:"CA",link:function(d,e){d.$watch("$location.path",function(){c()}),e.parent().bind("click",function(){c()}),e.bind("click",function(d){var f=e===b;d.preventDefault(),d.stopPropagation(),b&&c(),f||(e.parent().addClass("open"),b=e,c=function(d){d&&(d.preventDefault(),d.stopPropagation()),a.unbind("click",c),e.parent().removeClass("open"),c=angular.noop,b=null},a.bind("click",c))})}}}]),angular.module("ui.bootstrap.modal",[]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$modalStack","$timeout",function(a,b){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(c){b(function(){c.animate=!0}),c.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!=c.value.backdrop&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))}}}}]).directive("modalWindow",["$timeout",function(a){return{restrict:"EA",scope:{index:"@"},replace:!0,transclude:!0,templateUrl:"template/modal/window.html",link:function(b,c,d){b.windowClass=d.windowClass||"",a(function(){b.animate=!0})}}}]).factory("$modalStack",["$document","$compile","$rootScope","$$stackedMap",function(a,b,c,d){function e(){for(var a=-1,b=k.keys(),c=0;c<b.length;c++)k.get(b[c]).value.backdrop&&(a=c);return a}function f(a){var b=k.get(a).value;k.remove(a),b.modalDomEl.remove(),-1==e()&&(h.remove(),h=void 0),b.modalScope.$destroy()}var g,h,i=c.$new(!0),j=a.find("body").eq(0),k=d.createNew(),l={};return c.$watch(e,function(a){i.index=a}),a.bind("keydown",function(a){var b;27===a.which&&(b=k.top(),b&&b.value.keyboard&&c.$apply(function(){l.dismiss(b.key)}))}),l.open=function(a,c){k.add(a,{deferred:c.deferred,modalScope:c.scope,backdrop:c.backdrop,keyboard:c.keyboard});var d=angular.element("<div modal-window></div>");d.attr("window-class",c.windowClass),d.attr("index",k.length()-1),d.html(c.content);var f=b(d)(c.scope);k.top().value.modalDomEl=f,j.append(f),e()>=0&&!h&&(g=angular.element("<div modal-backdrop></div>"),h=b(g)(i),j.append(h))},l.close=function(a,b){var c=k.get(a);c&&(c.value.deferred.resolve(b),f(a))},l.dismiss=function(a,b){var c=k.get(a).value;c&&(c.deferred.reject(b),f(a))},l.getTop=function(){return k.top()},l}]).provider("$modal",function(){var a={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?d.when(a.template):e.get(a.templateUrl,{cache:f}).then(function(a){return a.data})}function j(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var k={};return k.open=function(b){var e=d.defer(),f=d.defer(),k={result:e.promise,opened:f.promise,close:function(a){h.close(k,a)},dismiss:function(a){h.dismiss(k,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var l=d.all([i(b)].concat(j(b.resolve)));return l.then(function(a){var d=(b.scope||c).$new();d.$close=k.close,d.$dismiss=k.dismiss;var f,i={},j=1;b.controller&&(i.$scope=d,i.$modalInstance=k,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),f=g(b.controller,i)),h.open(k,{scope:d,deferred:e,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,windowClass:b.windowClass})},function(a){e.reject(a)}),l.then(function(){f.resolve(!0)},function(){f.reject(!1)}),k},k}]};return a}),angular.module("ui.bootstrap.pagination",[]).controller("PaginationController",["$scope","$attrs","$parse","$interpolate",function(a,b,c,d){var e=this;this.init=function(d){b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){e.itemsPerPage=parseInt(b,10),a.totalPages=e.calculateTotalPages()}):this.itemsPerPage=d},this.noPrevious=function(){return 1===this.page},this.noNext=function(){return this.page===a.totalPages},this.isActive=function(a){return this.page===a},this.calculateTotalPages=function(){return this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage)},this.getAttributeValue=function(b,c,e){return angular.isDefined(b)?e?d(b)(a.$parent):a.$parent.$eval(b):c},this.render=function(){this.page=parseInt(a.page,10)||1,a.pages=this.getPages(this.page,a.totalPages)},a.selectPage=function(b){!e.isActive(b)&&b>0&&b<=a.totalPages&&(a.page=b,a.onSelectPage({page:b}))},a.$watch("totalItems",function(){a.totalPages=e.calculateTotalPages()}),a.$watch("totalPages",function(c){b.numPages&&(a.numPages=c),e.page>c?a.selectPage(c):e.render()}),a.$watch("page",function(){e.render()})}]).constant("paginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("pagination",["$parse","paginationConfig",function(a,b){return{restrict:"EA",scope:{page:"=",totalItems:"=",onSelectPage:" &",numPages:"="},controller:"PaginationController",templateUrl:"template/pagination/pagination.html",replace:!0,link:function(c,d,e,f){function g(a,b,c,d){return{number:a,text:b,active:c,disabled:d}}var h,i=f.getAttributeValue(e.boundaryLinks,b.boundaryLinks),j=f.getAttributeValue(e.directionLinks,b.directionLinks),k=f.getAttributeValue(e.firstText,b.firstText,!0),l=f.getAttributeValue(e.previousText,b.previousText,!0),m=f.getAttributeValue(e.nextText,b.nextText,!0),n=f.getAttributeValue(e.lastText,b.lastText,!0),o=f.getAttributeValue(e.rotate,b.rotate);f.init(b.itemsPerPage),e.maxSize&&c.$parent.$watch(a(e.maxSize),function(a){h=parseInt(a,10),f.render()}),f.getPages=function(a,b){var c=[],d=1,e=b,p=angular.isDefined(h)&&b>h;p&&(o?(d=Math.max(a-Math.floor(h/2),1),e=d+h-1,e>b&&(e=b,d=e-h+1)):(d=(Math.ceil(a/h)-1)*h+1,e=Math.min(d+h-1,b)));for(var q=d;e>=q;q++){var r=g(q,q,f.isActive(q),!1);c.push(r)}if(p&&!o){if(d>1){var s=g(d-1,"...",!1,!1);c.unshift(s)}if(b>e){var t=g(e+1,"...",!1,!1);c.push(t)}}if(j){var u=g(a-1,l,!1,f.noPrevious());c.unshift(u);var v=g(a+1,m,!1,f.noNext());c.push(v)}if(i){var w=g(1,k,!1,f.noPrevious());c.unshift(w);var x=g(b,n,!1,f.noNext());c.push(x)}return c}}}}]).constant("pagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("pager",["pagerConfig",function(a){return{restrict:"EA",scope:{page:"=",totalItems:"=",onSelectPage:" &",numPages:"="},controller:"PaginationController",templateUrl:"template/pagination/pager.html",replace:!0,link:function(b,c,d,e){function f(a,b,c,d,e){return{number:a,text:b,disabled:c,previous:i&&d,next:i&&e}}var g=e.getAttributeValue(d.previousText,a.previousText,!0),h=e.getAttributeValue(d.nextText,a.nextText,!0),i=e.getAttributeValue(d.align,a.align);e.init(a.itemsPerPage),e.getPages=function(a){return[f(a-1,g,e.noPrevious(),!0,!1),f(a+1,h,e.noNext(),!1,!0)]}}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).provider("$tooltip",function(){function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"top",animation:!0,popupDelay:0},c={mouseenter:"mouseleave",click:"click",focus:"blur"},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$parse","$document","$position","$interpolate",function(e,f,g,h,i,j,k){return function(e,l,m){function n(a){var b=a||o.trigger||m,d=c[b]||b;return{show:b,hide:d}}var o=angular.extend({},b,d),p=a(e),q=k.startSymbol(),r=k.endSymbol(),s="<"+p+"-popup "+'title="'+q+"tt_title"+r+'" '+'content="'+q+"tt_content"+r+'" '+'placement="'+q+"tt_placement"+r+'" '+'animation="tt_animation()" '+'is-open="tt_isOpen"'+">"+"</"+p+"-popup>";return{restrict:"EA",scope:!0,link:function(a,b,c){function d(){a.tt_isOpen?m():k()}function k(){a.tt_popupDelay?t=g(p,a.tt_popupDelay):a.$apply(p)}function m(){a.$apply(function(){q()})}function p(){var c,d,e,f;if(a.tt_content){switch(r&&g.cancel(r),v.css({top:0,left:0,display:"block"}),w?(u=u||i.find("body"),u.append(v)):b.after(v),c=w?j.offset(b):j.position(b),d=v.prop("offsetWidth"),e=v.prop("offsetHeight"),a.tt_placement){case"right":f={top:c.top+c.height/2-e/2,left:c.left+c.width};break;case"bottom":f={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"left":f={top:c.top+c.height/2-e/2,left:c.left-d};break;default:f={top:c.top-e,left:c.left+c.width/2-d/2}}f.top+="px",f.left+="px",v.css(f),a.tt_isOpen=!0}}function q(){a.tt_isOpen=!1,g.cancel(t),angular.isDefined(a.tt_animation)&&a.tt_animation()?r=g(function(){v.remove()},500):v.remove()}var r,t,u,v=f(s)(a),w=angular.isDefined(o.appendToBody)?o.appendToBody:!1,x=n(void 0),y=!1;a.tt_isOpen=!1,c.$observe(e,function(b){a.tt_content=b}),c.$observe(l+"Title",function(b){a.tt_title=b}),c.$observe(l+"Placement",function(b){a.tt_placement=angular.isDefined(b)?b:o.placement}),c.$observe(l+"Animation",function(b){a.tt_animation=angular.isDefined(b)?h(b):function(){return o.animation}}),c.$observe(l+"PopupDelay",function(b){var c=parseInt(b,10);a.tt_popupDelay=isNaN(c)?o.popupDelay:c}),c.$observe(l+"Trigger",function(a){y&&(b.unbind(x.show,k),b.unbind(x.hide,m)),x=n(a),x.show===x.hide?b.bind(x.show,d):(b.bind(x.show,k),b.bind(x.hide,m)),y=!0}),c.$observe(l+"AppendToBody",function(b){w=angular.isDefined(b)?h(b)(a):w}),w&&a.$on("$locationChangeSuccess",function(){a.tt_isOpen&&q()}),a.$on("$destroy",function(){a.tt_isOpen?q():v.remove()})}}}}]}).directive("tooltipPopup",function(){return{restrict:"E",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html"}}).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipHtmlUnsafePopup",function(){return{restrict:"E",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-unsafe-popup.html"}}).directive("tooltipHtmlUnsafe",["$tooltip",function(a){return a("tooltipHtmlUnsafe","tooltip","mouseenter")}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("popoverPopup",function(){return{restrict:"EA",replace:!0,scope:{title:"@",content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html"}}).directive("popover",["$compile","$timeout","$parse","$window","$tooltip",function(a,b,c,d,e){return e("popover","popover","click")}]),angular.module("ui.bootstrap.progressbar",["ui.bootstrap.transition"]).constant("progressConfig",{animate:!0,autoType:!1,stackedTypes:["success","info","warning","danger"]}).controller("ProgressBarController",["$scope","$attrs","progressConfig",function(a,b,c){function d(a){return g[a]}var e=angular.isDefined(b.animate)?a.$eval(b.animate):c.animate,f=angular.isDefined(b.autoType)?a.$eval(b.autoType):c.autoType,g=angular.isDefined(b.stackedTypes)?a.$eval("["+b.stackedTypes+"]"):c.stackedTypes;this.makeBar=function(a,b,c){var g=angular.isObject(a)?a.value:a||0,h=angular.isObject(b)?b.value:b||0,i=angular.isObject(a)&&angular.isDefined(a.type)?a.type:f?d(c||0):null;return{from:h,to:g,type:i,animate:e}},this.addBar=function(b){a.bars.push(b),a.totalPercent+=b.to},this.clearBars=function(){a.bars=[],a.totalPercent=0},this.clearBars()}]).directive("progress",function(){return{restrict:"EA",replace:!0,controller:"ProgressBarController",scope:{value:"=percent",onFull:"&",onEmpty:"&"},templateUrl:"template/progressbar/progress.html",link:function(a,b,c,d){a.$watch("value",function(a,b){if(d.clearBars(),angular.isArray(a))for(var c=0,e=a.length;e>c;c++)d.addBar(d.makeBar(a[c],b[c],c));else d.addBar(d.makeBar(a,b))},!0),a.$watch("totalPercent",function(b){b>=100?a.onFull():0>=b&&a.onEmpty()},!0)}}}).directive("progressbar",["$transition",function(a){return{restrict:"EA",replace:!0,scope:{width:"=",old:"=",type:"=",animate:"="},templateUrl:"template/progressbar/bar.html",link:function(b,c){b.$watch("width",function(d){b.animate?(c.css("width",b.old+"%"),a(c,{width:d+"%"})):c.css("width",d+"%")})}}}]),angular.module("ui.bootstrap.rating",[]).constant("ratingConfig",{max:5,stateOn:null,stateOff:null}).controller("RatingController",["$scope","$attrs","$parse","ratingConfig",function(a,b,c,d){this.maxRange=angular.isDefined(b.max)?a.$parent.$eval(b.max):d.max,this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):d.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):d.stateOff,this.createDefaultRange=function(a){for(var b={stateOn:this.stateOn,stateOff:this.stateOff},c=new Array(a),d=0;a>d;d++)c[d]=b;return c},this.normalizeRange=function(a){for(var b=0,c=a.length;c>b;b++)a[b].stateOn=a[b].stateOn||this.stateOn,a[b].stateOff=a[b].stateOff||this.stateOff;return a},a.range=angular.isDefined(b.ratingStates)?this.normalizeRange(angular.copy(a.$parent.$eval(b.ratingStates))):this.createDefaultRange(this.maxRange),a.rate=function(b){a.readonly||a.value===b||(a.value=b)},a.enter=function(b){a.readonly||(a.val=b),a.onHover({value:b})},a.reset=function(){a.val=angular.copy(a.value),a.onLeave()},a.$watch("value",function(b){a.val=b}),a.readonly=!1,b.readonly&&a.$parent.$watch(c(b.readonly),function(b){a.readonly=!!b})}]).directive("rating",function(){return{restrict:"EA",scope:{value:"=",onHover:"&",onLeave:"&"},controller:"RatingController",templateUrl:"template/rating/rating.html",replace:!0}}),angular.module("ui.bootstrap.tabs",[]).directive("tabs",function(){return function(){throw new Error("The `tabs` directive is deprecated, please migrate to `tabset`. Instructions can be found at http://github.com/angular-ui/bootstrap/tree/master/CHANGELOG.md")}}).controller("TabsetController",["$scope","$element",function(a){var b=this,c=b.tabs=a.tabs=[];b.select=function(a){angular.forEach(c,function(a){a.active=!1}),a.active=!0},b.addTab=function(a){c.push(a),(1===c.length||a.active)&&b.select(a)},b.removeTab=function(a){var d=c.indexOf(a);if(a.active&&c.length>1){var e=d==c.length-1?d-1:d+1;b.select(c[e])}c.splice(d,1)}}]).directive("tabset",function(){return{restrict:"EA",transclude:!0,replace:!0,require:"^tabset",scope:{},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",compile:function(a,b,c){return function(a,b,d,e){a.vertical=angular.isDefined(d.vertical)?a.$parent.$eval(d.vertical):!1,a.type=angular.isDefined(d.type)?a.$parent.$eval(d.type):"tabs",a.direction=angular.isDefined(d.direction)?a.$parent.$eval(d.direction):"top",a.tabsAbove="below"!=a.direction,e.$scope=a,e.$transcludeFn=c}}}}).directive("tab",["$parse","$http","$templateCache","$compile",function(a){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{heading:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},compile:function(b,c,d){return function(b,c,e,f){var g,h;e.active?(g=a(e.active),h=g.assign,b.$parent.$watch(g,function(a){b.active=!!a}),b.active=g(b.$parent)):h=g=angular.noop,b.$watch("active",function(a){h(b.$parent,a),a?(f.select(b),b.onSelect()):b.onDeselect()}),b.disabled=!1,e.disabled&&b.$parent.$watch(a(e.disabled),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},f.addTab(b),b.$on("$destroy",function(){f.removeTab(b)}),b.active&&h(b.$parent,!0),b.$transcludeFn=d}}}}]).directive("tabHeadingTransclude",[function(){return{restrict:"A",require:"^tab",link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}]).directive("tabContentTransclude",["$compile","$parse",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase())
}return{restrict:"A",require:"^tabset",link:function(b,c,d){var e=b.$eval(d.tabContentTransclude);e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}]).directive("tabsetTitles",["$http",function(){return{restrict:"A",require:"^tabset",templateUrl:"template/tabs/tabset-titles.html",replace:!0,link:function(a,b,c,d){a.$eval(c.tabsetTitles)?d.$transcludeFn(d.$scope.$parent,function(a){b.append(a)}):b.remove()}}}]),angular.module("ui.bootstrap.timepicker",[]).constant("timepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:["AM","PM"],readonlyInput:!1,mousewheel:!0}).directive("timepicker",["$parse","$log","timepickerConfig",function(a,b,c){return{restrict:"EA",require:"?^ngModel",replace:!0,scope:{},templateUrl:"template/timepicker/timepicker.html",link:function(d,e,f,g){function h(){var a=parseInt(d.hours,10),b=d.showMeridian?a>0&&13>a:a>=0&&24>a;return b?(d.showMeridian&&(12===a&&(a=0),d.meridian===p[1]&&(a+=12)),a):void 0}function i(){var a=parseInt(d.minutes,10);return a>=0&&60>a?a:void 0}function j(a){return angular.isDefined(a)&&a.toString().length<2?"0"+a:a}function k(a){l(),g.$setViewValue(new Date(o)),m(a)}function l(){g.$setValidity("time",!0),d.invalidHours=!1,d.invalidMinutes=!1}function m(a){var b=o.getHours(),c=o.getMinutes();d.showMeridian&&(b=0===b||12===b?12:b%12),d.hours="h"===a?b:j(b),d.minutes="m"===a?c:j(c),d.meridian=o.getHours()<12?p[0]:p[1]}function n(a){var b=new Date(o.getTime()+6e4*a);o.setHours(b.getHours(),b.getMinutes()),k()}if(g){var o=new Date,p=c.meridians,q=c.hourStep;f.hourStep&&d.$parent.$watch(a(f.hourStep),function(a){q=parseInt(a,10)});var r=c.minuteStep;f.minuteStep&&d.$parent.$watch(a(f.minuteStep),function(a){r=parseInt(a,10)}),d.showMeridian=c.showMeridian,f.showMeridian&&d.$parent.$watch(a(f.showMeridian),function(a){if(d.showMeridian=!!a,g.$error.time){var b=h(),c=i();angular.isDefined(b)&&angular.isDefined(c)&&(o.setHours(b),k())}else m()});var s=e.find("input"),t=s.eq(0),u=s.eq(1),v=angular.isDefined(f.mousewheel)?d.$eval(f.mousewheel):c.mousewheel;if(v){var w=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};t.bind("mousewheel wheel",function(a){d.$apply(w(a)?d.incrementHours():d.decrementHours()),a.preventDefault()}),u.bind("mousewheel wheel",function(a){d.$apply(w(a)?d.incrementMinutes():d.decrementMinutes()),a.preventDefault()})}if(d.readonlyInput=angular.isDefined(f.readonlyInput)?d.$eval(f.readonlyInput):c.readonlyInput,d.readonlyInput)d.updateHours=angular.noop,d.updateMinutes=angular.noop;else{var x=function(a,b){g.$setViewValue(null),g.$setValidity("time",!1),angular.isDefined(a)&&(d.invalidHours=a),angular.isDefined(b)&&(d.invalidMinutes=b)};d.updateHours=function(){var a=h();angular.isDefined(a)?(o.setHours(a),k("h")):x(!0)},t.bind("blur",function(){!d.validHours&&d.hours<10&&d.$apply(function(){d.hours=j(d.hours)})}),d.updateMinutes=function(){var a=i();angular.isDefined(a)?(o.setMinutes(a),k("m")):x(void 0,!0)},u.bind("blur",function(){!d.invalidMinutes&&d.minutes<10&&d.$apply(function(){d.minutes=j(d.minutes)})})}g.$render=function(){var a=g.$modelValue?new Date(g.$modelValue):null;isNaN(a)?(g.$setValidity("time",!1),b.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(a&&(o=a),l(),m())},d.incrementHours=function(){n(60*q)},d.decrementHours=function(){n(60*-q)},d.incrementMinutes=function(){n(r)},d.decrementMinutes=function(){n(-r)},d.toggleMeridian=function(){n(720*(o.getHours()<12?1:-1))}}}}}]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(a){var b=/^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '"+c+"'.");return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(a,b,c,d,e,f,g){var h=[9,13,27,38,40];return{require:"ngModel",link:function(i,j,k,l){var m=i.$eval(k.typeaheadMinLength)||1,n=i.$eval(k.typeaheadWaitMs)||0,o=i.$eval(k.typeaheadEditable)!==!1,p=b(k.typeaheadLoading).assign||angular.noop,q=b(k.typeaheadOnSelect),r=k.typeaheadInputFormatter?b(k.typeaheadInputFormatter):void 0,s=b(k.ngModel).assign,t=g.parse(k.typeahead),u=angular.element("<typeahead-popup></typeahead-popup>");u.attr({matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(k.typeaheadTemplateUrl)&&u.attr("template-url",k.typeaheadTemplateUrl);var v=i.$new();i.$on("$destroy",function(){v.$destroy()});var w=function(){v.matches=[],v.activeIdx=-1},x=function(a){var b={$viewValue:a};p(i,!0),c.when(t.source(v,b)).then(function(c){if(a===l.$viewValue){if(c.length>0){v.activeIdx=0,v.matches.length=0;for(var d=0;d<c.length;d++)b[t.itemName]=c[d],v.matches.push({label:t.viewMapper(v,b),model:c[d]});v.query=a,v.position=f.position(j),v.position.top=v.position.top+j.prop("offsetHeight")}else w();p(i,!1)}},function(){w(),p(i,!1)})};w(),v.query=void 0;var y;l.$parsers.unshift(function(a){return w(),a&&a.length>=m&&(n>0?(y&&d.cancel(y),y=d(function(){x(a)},n)):x(a)),o?a:(l.$setValidity("editable",!1),void 0)}),l.$formatters.push(function(a){var b,c,d={};return r?(d.$model=a,r(i,d)):(d[t.itemName]=a,b=t.viewMapper(i,d),d[t.itemName]=void 0,c=t.viewMapper(i,d),b!==c?b:a)}),v.select=function(a){var b,c,d={};d[t.itemName]=c=v.matches[a].model,b=t.modelMapper(i,d),s(i,b),l.$setValidity("editable",!0),q(i,{$item:c,$model:b,$label:t.viewMapper(i,d)}),w(),j[0].focus()},j.bind("keydown",function(a){0!==v.matches.length&&-1!==h.indexOf(a.which)&&(a.preventDefault(),40===a.which?(v.activeIdx=(v.activeIdx+1)%v.matches.length,v.$digest()):38===a.which?(v.activeIdx=(v.activeIdx?v.activeIdx:v.matches.length)-1,v.$digest()):13===a.which||9===a.which?v.$apply(function(){v.select(v.activeIdx)}):27===a.which&&(a.stopPropagation(),w(),v.$digest()))});var z=function(a){j[0]!==a.target&&(w(),v.$digest())};e.bind("click",z),i.$on("$destroy",function(){e.unbind("click",z)}),j.after(a(u)(v))}}}]).directive("typeaheadPopup",function(){return{restrict:"E",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(a,b,c){a.templateUrl=c.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(b){return a.active==b},a.selectActive=function(b){a.active=b},a.selectMatch=function(b){a.select({activeIdx:b})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(a,b,c,d){return{restrict:"E",scope:{index:"=",match:"=",query:"="},link:function(e,f,g){var h=d(g.templateUrl)(e.$parent)||"template/typeahead/typeahead-match.html";a.get(h,{cache:b}).success(function(a){f.replaceWith(c(a.trim())(e))})}}}]).filter("typeaheadHighlight",function(){function a(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(b,c){return c?b.replace(new RegExp(a(c),"gi"),"<strong>$&</strong>"):b}});