(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-291be31e"],{"15b3":function(e,t,a){},"269a":function(e,t){e.exports=function(e,t){var a="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var n in"function"===typeof e.exports&&(a.directives=e.exports.options.directives),a.directives=a.directives||{},t)a.directives[n]=a.directives[n]||t[n]}},"3ccf":function(e,t,a){"use strict";var n=a("d9bd");function i(e,t){e.style["transform"]=t,e.style["webkitTransform"]=t}function s(e,t){e.style["opacity"]=t.toString()}function r(e){return"TouchEvent"===e.constructor.name}var o=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.getBoundingClientRect(),i=r(e)?e.touches[e.touches.length-1]:e,s=i.clientX-n.left,o=i.clientY-n.top,c=0,l=.3;t._ripple&&t._ripple.circle?(l=.15,c=t.clientWidth/2,c=a.center?c:c+Math.sqrt(Math.pow(s-c,2)+Math.pow(o-c,2))/4):c=Math.sqrt(Math.pow(t.clientWidth,2)+Math.pow(t.clientHeight,2))/2;var p=(t.clientWidth-2*c)/2+"px",u=(t.clientHeight-2*c)/2+"px",d=a.center?p:s-c+"px",v=a.center?u:o-c+"px";return{radius:c,scale:l,x:d,y:v,centerX:p,centerY:u}},c={show:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(t._ripple&&t._ripple.enabled){var n=document.createElement("span"),r=document.createElement("span");n.appendChild(r),n.className="v-ripple__container",a.class&&(n.className+=" "+a.class);var c=o(e,t,a),l=c.radius,p=c.scale,u=c.x,d=c.y,v=c.centerX,m=c.centerY,f=2*l+"px";r.className="v-ripple__animation",r.style.width=f,r.style.height=f,t.appendChild(n);var h=window.getComputedStyle(t);"static"===h.position&&(t.style.position="relative",t.dataset.previousPosition="static"),r.classList.add("v-ripple__animation--enter"),r.classList.add("v-ripple__animation--visible"),i(r,"translate("+u+", "+d+") scale3d("+p+","+p+","+p+")"),s(r,0),r.dataset.activated=String(performance.now()),setTimeout(function(){r.classList.remove("v-ripple__animation--enter"),r.classList.add("v-ripple__animation--in"),i(r,"translate("+v+", "+m+") scale3d(1,1,1)"),s(r,.25)},0)}},hide:function(e){if(e&&e._ripple&&e._ripple.enabled){var t=e.getElementsByClassName("v-ripple__animation");if(0!==t.length){var a=t[t.length-1];if(!a.dataset.isHiding){a.dataset.isHiding="true";var n=performance.now()-Number(a.dataset.activated),i=Math.max(250-n,0);setTimeout(function(){a.classList.remove("v-ripple__animation--in"),a.classList.add("v-ripple__animation--out"),s(a,0),setTimeout(function(){var t=e.getElementsByClassName("v-ripple__animation");1===t.length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),a.parentNode&&e.removeChild(a.parentNode)},300)},i)}}}}};function l(e){return"undefined"===typeof e||!!e}function p(e){var t={},a=e.currentTarget;a&&!a._ripple.touched&&(r(e)&&(a._ripple.touched=!0),t.center=a._ripple.centered,a._ripple.class&&(t.class=a._ripple.class),c.show(e,a,t))}function u(e){var t=e.currentTarget;t&&(window.setTimeout(function(){t._ripple.touched=!1}),c.hide(t))}function d(e,t,a){var n=l(t.value);n||c.hide(e),e._ripple=e._ripple||{},e._ripple.enabled=n;var i=t.value||{};i.center&&(e._ripple.centered=!0),i.class&&(e._ripple.class=t.value.class),i.circle&&(e._ripple.circle=i.circle),n&&!a?(e.addEventListener("touchstart",p,{passive:!0}),e.addEventListener("touchend",u,{passive:!0}),e.addEventListener("touchcancel",u),e.addEventListener("mousedown",p),e.addEventListener("mouseup",u),e.addEventListener("mouseleave",u),e.addEventListener("dragstart",u,{passive:!0})):!n&&a&&v(e)}function v(e){e.removeEventListener("mousedown",p),e.removeEventListener("touchstart",u),e.removeEventListener("touchend",u),e.removeEventListener("touchcancel",u),e.removeEventListener("mouseup",u),e.removeEventListener("mouseleave",u),e.removeEventListener("dragstart",u)}function m(e,t,a){d(e,t,!1),a.context&&a.context.$nextTick(function(){if("inline"===window.getComputedStyle(e).display){var t=a.fnOptions?[a.fnOptions,a.context]:[a.componentInstance];n["c"].apply(void 0,["v-ripple can only be used on block-level elements"].concat(t))}})}function f(e){delete e._ripple,v(e)}function h(e,t){if(t.value!==t.oldValue){var a=l(t.oldValue);d(e,t,a)}}t["a"]={bind:m,unbind:f,update:h}},4845:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header"},[e.backIcon?n("span",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"icon-back",on:{click:e.handleIconClick}}):e._e(),n("img",{staticClass:"header-logo",attrs:{src:a("947b"),alt:"company logo"},on:{click:e.handleLogoClick}}),e.showHistoryButton?n("button",{staticClass:"login-button run-button",on:{click:e.routeToHistory}},[n("img",{staticClass:"dna-icon",attrs:{src:a("6fc7"),alt:""}}),n("div",{staticClass:"run-button-text"},[e._v("\n      Runs\n    ")])]):e._e()])},i=[],s=a("41cb"),r={name:"BaseHeader",props:{title:{type:String,default:""},backIcon:{type:Boolean,default:!1},handleIconClick:{type:Function,default:function(){}},handleLogoClick:{type:Function,default:function(){}},showHistoryButton:{type:Boolean,default:!1}},methods:{routeToHistory:function(){s["a"].push("/runs")}}},o=r,c=(a("dfde"),a("2877")),l=a("269a"),p=a.n(l),u=a("3ccf"),d=Object(c["a"])(o,n,i,!1,null,"26dbcbff",null);t["a"]=d.exports;p()(d,{Ripple:u["a"]})},"59d9":function(e,t,a){},"6a7c":function(e,t,a){"use strict";var n=a("15b3"),i=a.n(n);i.a},"6fc7":function(e,t,a){e.exports=a.p+"img/dna-white.bd33e124.svg"},"947b":function(e,t,a){e.exports=a.p+"img/kapsel-logo.c043d58e.png"},dfde:function(e,t,a){"use strict";var n=a("59d9"),i=a.n(n);i.a},e4bb:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"history view"},[a("BaseHeader",{attrs:{"back-icon":"","handle-icon-click":e.routeToRuns}}),a("div",{staticClass:"data-view"},[a("div",{staticClass:"data-view-title"},[e._v("\n      History\n    ")]),a("BaseCard",{staticClass:"data-well"},[a("div",{staticClass:"data-content-wrapper"},[a("div",{staticClass:"data-content data-content-left"},[a("div",[e._v("AB32_01")]),a("ul",{staticClass:"parameter-list"},[a("li",{staticClass:"parameter-list-item",class:{active:"DO"===e.activeParameter},on:{click:e.changeToDO}},[e._v("\n              Dissolved Oxygen\n            ")]),a("li",{staticClass:"parameter-list-item",class:{active:"TEMP"===e.activeParameter},on:{click:e.changeToTemp}},[e._v("\n              Temperature\n            ")]),a("li",{staticClass:"parameter-list-item"},[e._v("\n              pH\n            ")]),a("li",{staticClass:"parameter-list-item"},[e._v("\n              Agitation\n            ")]),a("li",{staticClass:"parameter-list-item",class:{active:"OPTICALD"===e.activeParameter},on:{click:e.changeToOpticalDensity}},[e._v("\n              Optical Density\n            ")])])]),a("div",{staticClass:"data-content data-content-right"},[a("BaseChart",{attrs:{config:e.chartConfig[e.activeParameter]}})],1)])])],1)],1)},i=[],s=a("41cb"),r=a("ff7d"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"chart-wrapper"},[a("canvas",{ref:"canvas",attrs:{id:"myChart"}})])},c=[],l=(a("ac6a"),a("30ef")),p=a.n(l),u={name:"BaseChart",props:{config:{type:Object,required:!0}},watch:{config:function(e){var t="grey",a=this.config,n=(a.xAxisID,a.yAxisID),i=a.yAxisConfig,s=a.title;a.points;function r(a){a.data.labels.pop(),a.data.datasets.forEach(function(t){t.label=s,t.data=e.points}),a.options={elements:{line:{tension:0}},scales:{xAxes:[{id:"time",type:"linear",ticks:{min:0,max:20,stepSize:5},scaleLabel:{display:!0,labelString:"EFT (hours)"},gridLines:{color:t}}],yAxes:[{id:n,type:"linear",ticks:i.ticks,scaleLabel:{display:!0,labelString:i.label},gridLines:{color:t}}]}},a.update()}r(this.chart)}},mounted:function(){var e=this.$refs.canvas,t="grey";p.a.defaults.global.defaultFontColor="white";var a=this.config,n=a.xAxisID,i=a.yAxisID,s=a.yAxisConfig,r=a.title,o=a.points;this.chart=new p.a(e.getContext("2d"),{xAxisID:n,yAxisID:i,type:"line",data:{datasets:[{data:o,label:r,pointRadius:0,borderColor:"rgb(255, 99, 132)",borderWidth:1,fill:!1,showLines:!1}]},options:{responsiveAnimationDuration:0,elements:{line:{tension:0}},scales:{xAxes:[{id:"time",type:"linear",ticks:{min:0,max:20,stepSize:5},scaleLabel:{display:!0,labelString:"EFT (hours)"},gridLines:{color:t}}],yAxes:[{id:i,type:"linear",ticks:s.ticks,scaleLabel:{display:!0,labelString:s.label},gridLines:{color:t}}]}}})}},d=u,v=a("2877"),m=Object(v["a"])(d,o,c,!1,null,"13ecaacf",null),f=m.exports,h=a("4845"),b=a("75fc"),g=a("cebc"),y=function(e,t){return Math.floor(Math.random()*(t-e)+e)},x=function(){return y(0,10)>5?-1:1},_=function(e,t){return Math.random()*(t-e)+e},C=function(e){var t=e.dropRate,a=e.numPoints,n=e.step,i=e.yStart,s=function(e){return e>=0?t*-e*e+i:0},r=function(e){for(var t=[],a={start:1.25,frequency:function(){return y(0,10)<10},magnitude:function(){return x()*_(0,3)}},i=a.start,r=a.frequency,o=a.magnitude,c=0;c<e;c+=n){var l=o(),p=s(c),u=c<i?p:r()?p+l:p;t.push({x:c,y:u})}return t};return r(a)},w=function(e){for(var t,a=e.start,n=e.numPoints,i=e.stableVal,s=e.spreadUpper,r=e.spreadLower,o=e.step,c=[],l=a;l<n;l+=o)t=l===a?i:i+_(-1*r,s),c.push({x:l,y:t});return c},L=function(e){for(var t=e.start,a=e.numPoints,n=e.stableVal,i=e.spreadUpper,s=e.spreadLower,r=e.step,o=e.kFreq,c=e.magUpper,l=[],p={frequency:function(){return y(0,1e4)<(o||1e3)},magnitude:function(){return x()*_(0,c||.2)}},u=p.frequency,d=p.magnitude,v=t;v<a;v+=r){var m=d(),f=_(-1*s,i),h=n,b=u()?h+m:h+f;l.push({x:v,y:b})}return l},k=function(){var e=1.2,t=L({start:0,numPoints:13,stableVal:37,spreadUpper:.1,spreadLower:.1,step:.02*e}),a={kFreq:1e3,magUpper:3},n=L(Object(g["a"])({start:13,numPoints:15,stableVal:37,spreadUpper:.1,spreadLower:.1,step:.03*e},a)),i=L({start:15,numPoints:17,stableVal:37,spreadUpper:.3,spreadLower:.2,step:.02*e});return[].concat(Object(b["a"])(t),Object(b["a"])(n),Object(b["a"])(i))},O=function(){var e=1.2,t=w({start:12,numPoints:17,stableVal:20,spreadUpper:5,spreadLower:8,step:.01*e}),a=w({start:7.2,numPoints:12,stableVal:20,spreadUpper:8,spreadLower:6,step:.01*e}),n=w({start:7,numPoints:7.2,stableVal:20,spreadUpper:35,spreadLower:5,step:.01*e}),i=w({start:4.5,numPoints:7,stableVal:20,spreadUpper:2,spreadLower:2,step:.01*e}),s=C({numPoints:4.5,step:.1,yStart:100,dropRate:4}),r=[].concat(Object(b["a"])(s),Object(b["a"])(i),Object(b["a"])(n),Object(b["a"])(a),Object(b["a"])(t));return r},T=function(){return[{x:0,y:0},{x:8,y:30},{x:11,y:85},{x:13,y:110},{x:17,y:145}]},D={DO:{title:"Dissolved Oxygen",points:O(),xAxisID:"time",yAxisID:"OD",yAxisConfig:{label:"Percent",ticks:{min:0,max:100,stepSize:20}}},TEMP:{title:"Temperature",points:k(),xAxisID:"time",yAxisID:"temp",yAxisConfig:{label:"Degrees Celcius",ticks:{min:25,max:45,stepSize:5}}},OPTICALD:{title:"Optical Density",points:T(),xAxisID:"time",yAxisID:"temp",yAxisConfig:{label:"OD600",ticks:{min:0,max:160,stepSize:20}}}},P={name:"Test",components:{BaseCard:r["a"],BaseChart:f,BaseHeader:h["a"]},data:function(){return{activeParameter:"DO",chartConfig:D}},mounted:function(){},methods:{changeToDO:function(){this.activeParameter="DO"},changeToTemp:function(){this.activeParameter="TEMP"},changeToOpticalDensity:function(){this.activeParameter="OPTICALD"},routeToRuns:function(){s["a"].push("/runs")}}},E=P,A=(a("6a7c"),Object(v["a"])(E,n,i,!1,null,"eb277b62",null));t["default"]=A.exports}}]);
//# sourceMappingURL=chunk-291be31e.9c76b976.js.map