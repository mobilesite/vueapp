var globalLib=webpackJsonpglobalLib([4],{"/GUM":function(module,e,n){"use strict";n("msgh").a.filter("price",function(e,n){return n=void 0===n?n:2,e=isNaN(e)?0:Number(e),e.toFixed(n).toString()})},"/OUp":function(module,exports,e){var n=e("7RJo");"string"==typeof n&&(n=[[module.i,n,""]]),n.locals&&(module.exports=n.locals);e("rjj0")("5f8ddcf7",n,!1)},"38CL":function(module,exports,e){module.exports={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("div",{staticClass:"card",on:{click:e.onClick}},[o("div",[o("span",{domProps:{textContent:e._s(e.name)}}),o("span",[e._v("当前价格:")])]),e._v(" "),o("div",{staticClass:"price"},[e._v(e._s(e._f("price")(e.price,2)))])]),e._v(" "),o("card",{attrs:{msg:"这是一个Vue组件~ "}})],1)},staticRenderFns:[]},module.exports.render._withStripped=!0},"7RJo":function(module,exports,e){exports=module.exports=e("FZ+f")(),exports.push([module.i,"\n.page {\n  background-color: #fff;\n}\n.page .price {\n  padding-left: 10px;\n}\n.page .price:before {\n  display: inline;\n  content: '\\A5';\n}\n","",{version:3,sources:["D:/vueapp/src/pages/use-vue/page.vue"],names:[],mappings:";AAAA;EACE,uBAAuB;CACxB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,eAAa;CACd",file:"page.vue",sourcesContent:[".page {\n  background-color: #fff;\n}\n.page .price {\n  padding-left: 10px;\n}\n.page .price:before {\n  display: inline;\n  content: '¥';\n}\n"],sourceRoot:""}])},FdLB:function(module,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("msgh"),t=n("kZIa"),r=n.n(t);console.log(""+o.a),o.a.config.debug=!0,new o.a({template:"<page></page>",replace:!1,el:"#page",components:{Page:r.a}})},Pg1e:function(module,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("fzej"),t=n.n(o);n("/GUM");e.default={components:{Card:t.a},data:function(){return{name:"iPhone7",price:5500}},methods:{onClick:function(){return alert("Do not touch me!")}}}},kZIa:function(module,exports,e){e("/OUp");var n=e("VU/8")(e("Pg1e"),e("38CL"),null,null);n.options.__file="D:\\vueapp\\src\\pages\\use-vue\\page.vue",n.esModule&&Object.keys(n.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] page.vue: functional components are not supported with templates, they should use render functions."),module.exports=n.exports},msgh:function(module,e,n){"use strict";var o=n("4bK6"),t=n.n(o);e.a=t.a}},["FdLB"]);