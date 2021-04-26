"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports[Symbol.toStringTag] = "Module";
var vue = require("vue");
var vueRouter = require("vue-router");
var serverRenderer = require("@vue/server-renderer");
var _sfc_main$3 = vue.defineComponent({
  name: "BlogHead",
  props: {
    links: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    isTransparent: {
      type: Boolean,
      default: false
    },
    logoSrc: {
      type: String,
      default: null
    },
    logoTransparentSrc: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const isLogoImgShow = vue.computed(() => {
      return typeof props.logoSrc === "string" && props.logoSrc !== "";
    });
    const logoImgSrc = vue.computed(() => {
      return props.isTransparent ? props.logoTransparentSrc : props.logoSrc;
    });
    function m(e) {
      console.log(e);
    }
    return {
      isLogoImgShow,
      logoImgSrc,
      m
    };
  }
});
var BlogHead_styl_vue_type_style_index_0_src_scoped_true_lang = '.blog-header[data-v-5a99373c] {\n  position: fixed;\n  width: 100%;\n  height: 60px;\n  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.3);\n  background-color: #fff;\n}\n.blog-header-logo img[data-v-5a99373c] {\n  height: 50px;\n}\n.blog-header-nav[data-v-5a99373c] {\n  height: 60px;\n  position: relative;\n}\n.blog-header-nav a[data-v-5a99373c] {\n  display: block;\n  line-height: 30px;\n  padding: 15px 20px;\n  color: #2f3542;\n}\n.blog-header-nav[data-v-5a99373c]::after {\n  content: "";\n  height: 3px;\n  background-color: #b3c131;\n  position: absolute;\n  bottom: 0px;\n}\n.blog-header-nav.active a[data-v-5a99373c] {\n  color: #b3c131;\n}\n.blog-header-nav.active[data-v-5a99373c]::after {\n  width: 100%;\n}\n.transparent.blog-header[data-v-5a99373c] {\n  background-color: rgba(0,0,0,0);\n  box-shadow: none;\n}\n.transparent .blog-header-nav a[data-v-5a99373c] {\n  color: #fff;\n}\n.transparent .blog-header-nav.active[data-v-5a99373c]::after {\n  background-color: #fff;\n}\n';
const _withId = /* @__PURE__ */ vue.withScopeId("data-v-5a99373c");
const _sfc_ssrRender$3 = /* @__PURE__ */ _withId((_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) => {
  const _component_router_link = vue.resolveComponent("router-link");
  _push(`<header${serverRenderer.ssrRenderAttrs(vue.mergeProps({
    class: ["blog-header", {transparent: _ctx.isTransparent}]
  }, _attrs))} data-v-5a99373c><div class="app-viewport flex flex-j-between flex-a-center" data-v-5a99373c>`);
  _push(serverRenderer.ssrRenderComponent(_component_router_link, {
    class: "blog-header-logo",
    to: "/"
  }, {
    default: _withId((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.isLogoImgShow) {
          _push2(`<img${serverRenderer.ssrRenderAttr("src", _ctx.logoImgSrc)} data-v-5a99373c${_scopeId}>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          _ctx.isLogoImgShow ? (vue.openBlock(), vue.createBlock("img", {
            key: 0,
            src: _ctx.logoImgSrc
          }, null, 8, ["src"])) : vue.createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<ul class="blog-header-nav-group flex flex-j-end margin-0" data-v-5a99373c><!--[-->`);
  serverRenderer.ssrRenderList(_ctx.links, (item, index) => {
    _push(`<li class="${serverRenderer.ssrRenderClass([{active: index === _ctx.activeIndex}, "blog-header-nav"])}" data-v-5a99373c>`);
    _push(serverRenderer.ssrRenderComponent(_component_router_link, {
      to: item.to
    }, {
      default: _withId((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${serverRenderer.ssrInterpolate(item.text)}`);
        } else {
          return [
            vue.createTextVNode(vue.toDisplayString(item.text), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</li>`);
  });
  _push(`<!--]--></ul></div></header>`);
});
_sfc_main$3.ssrRender = _sfc_ssrRender$3;
_sfc_main$3.__scopeId = "data-v-5a99373c";
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("F:/project/myblog/src/components/BlogHead/BlogHead.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var logoUrl = "https://myblog-1255355961.cos.ap-guangzhou.myqcloud.com/img/logo.png";
var logoTransparentUrl = "https://myblog-1255355961.cos.ap-guangzhou.myqcloud.com/img/logo-transparent.png";
var _sfc_main$2 = vue.defineComponent({
  name: "Base",
  components: {
    BlogHead: _sfc_main$3
  },
  setup() {
    const route = vueRouter.useRoute();
    const links = [
      {text: "\u9996\u9875", to: "/"},
      {text: "\u6587\u7AE0", to: "/blog"},
      {text: "\u5B9E\u9A8C\u5BA4", to: "/projects"},
      {text: "\u7559\u8A00", to: "/messages"}
    ];
    const activeIndex = vue.computed(() => {
      const index = links.findIndex((data) => data.to === route.path);
      return index >= 0 ? index : 0;
    });
    console.log(logoUrl, logoTransparentUrl);
    function handler() {
      console.log("\u89E6\u53D1");
    }
    return {
      links,
      activeIndex,
      logoUrl,
      logoTransparentUrl,
      handler
    };
  }
});
var Base_vue_vue_type_style_index_0_lang = "";
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_BlogHead = vue.resolveComponent("BlogHead");
  const _component_router_view = vue.resolveComponent("router-view");
  _push(`<!--[-->`);
  _push(serverRenderer.ssrRenderComponent(_component_BlogHead, {
    links: _ctx.links,
    activeIndex: _ctx.activeIndex,
    logoSrc: _ctx.logoUrl,
    logoTransparentSrc: _ctx.logoTransparentUrl
  }, null, _parent));
  _push(serverRenderer.ssrRenderComponent(_component_router_view, null, null, _parent));
  _push(`<!--]-->`);
}
_sfc_main$2.ssrRender = _sfc_ssrRender$2;
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("F:/project/myblog/src/pages/Base/Base.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var App_vue_vue_type_style_index_0_lang = "\n";
const _sfc_main$1 = {
  components: {
    Base: _sfc_main$2
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Base = vue.resolveComponent("Base");
  _push(serverRenderer.ssrRenderComponent(_component_Base, _attrs, null, _parent));
}
_sfc_main$1.ssrRender = _sfc_ssrRender$1;
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("F:/project/myblog/src/App.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const routes = [
  {
    path: "/",
    component: () => Promise.resolve().then(function() {
      return Index;
    })
  }
];
function createRouter() {
  return vueRouter.createRouter({
    history: vueRouter.createMemoryHistory(),
    routes
  });
}
const mqlMap = new Map();
const media = {
  mounted(el, binding) {
    console.log("media-mounted", el, binding);
    const {key, val, handler} = binding.value;
    const mediaKey = `(${key}: ${val})`;
    let mql = mqlMap.get(mediaKey);
    if (!mql) {
      mql = window.matchMedia(mediaKey);
      mqlMap.set(mediaKey, mql);
    }
    handler(mql);
    mql.addListener(handler);
  },
  beforeUnmount(el, binding) {
    console.log("media-beforeUnmount", el, binding);
    const {key, val, handler} = binding.value;
    const mediaKey = `(${key}: ${val})`;
    let mql = mqlMap.get(mediaKey);
    if (mql) {
      mql.removeListener(handler);
    }
  }
};
var common = `html,
body,
#app {
  width: 100%;
  height: 100%;
}
input::-ms-clear,
input::-ms-reveal {
  display: none;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
@-ms-viewport {
  width: device-width;
}
article,
aside,
dialog,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}
body {
  margin: 0;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-variant: tabular-nums;
  line-height: 1.5;
  background-color: #fff;
  font-feature-settings: 'tnum';
}
[tabindex='-1']:focus {
  outline: none !important;
}
hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: rgba(0,0,0,0.85);
  font-weight: 500;
}
p {
  margin-top: 0;
  margin-bottom: 1em;
}
abbr[title],
abbr[data-original-title] {
  text-decoration: underline;
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  border-bottom: 0;
  cursor: help;
}
address {
  margin-bottom: 1em;
  font-style: normal;
  line-height: inherit;
}
input[type='text'],
input[type='password'],
input[type='number'],
textarea {
  -webkit-appearance: none;
}
ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1em;
}
ol ol,
ul ul,
ol ul,
ul ol {
  margin-bottom: 0;
}
li {
  list-style-type: none;
}
dt {
  font-weight: 500;
}
dd {
  margin-bottom: 0.5em;
  margin-left: 0;
}
blockquote {
  margin: 0 0 1em;
}
dfn {
  font-style: italic;
}
b,
strong {
  font-weight: bolder;
}
small {
  font-size: 80%;
}
sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
a {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}
a:hover {
  color: #40a9ff;
}
a:active {
  color: #096dd9;
}
a:active,
a:hover {
  text-decoration: none;
  outline: 0;
}
a[disabled] {
  color: rgba(0,0,0,0.25);
  cursor: not-allowed;
  pointer-events: none;
}
pre,
code,
kbd,
samp {
  font-size: 1em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
pre {
  margin-top: 0;
  margin-bottom: 1em;
  overflow: auto;
}
figure {
  margin: 0 0 1em;
}
img {
  vertical-align: middle;
  border-style: none;
}
svg:not(:root) {
  overflow: hidden;
}
a,
area,
button,
[role='button'],
input:not([type='range']),
label,
select,
summary,
textarea {
  touch-action: manipulation;
}
table {
  border-collapse: collapse;
}
caption {
  padding-top: 0.75em;
  padding-bottom: 0.3em;
  color: rgba(0,0,0,0.45);
  text-align: left;
  caption-side: bottom;
}
th {
  text-align: inherit;
}
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
button,
input {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}
button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner {
  padding: 0;
  border-style: none;
}
input[type='radio'],
input[type='checkbox'] {
  box-sizing: border-box;
  padding: 0;
}
input[type='date'],
input[type='time'],
input[type='datetime-local'],
input[type='month'] {
  -webkit-appearance: listbox;
}
textarea {
  overflow: auto;
  resize: vertical;
}
fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
legend {
  display: block;
  width: 100%;
  max-width: 100%;
  margin-bottom: 0.5em;
  padding: 0;
  color: inherit;
  font-size: 1.5em;
  line-height: inherit;
  white-space: normal;
}
progress {
  vertical-align: baseline;
}
[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}
[type='search'] {
  outline-offset: -2px;
  -webkit-appearance: none;
}
[type='search']::-webkit-search-cancel-button,
[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}
output {
  display: inline-block;
}
summary {
  display: list-item;
}
template {
  display: none;
}
[hidden] {
  display: none !important;
}
mark {
  padding: 0.2em;
  background-color: #feffe6;
}
::-moz-selection {
  color: #fff;
  background: #1890ff;
}
::selection {
  color: #fff;
  background: #1890ff;
}
.clearfix {
  zoom: 1;
}
.clearfix::after {
  clear: both;
}
.clearfix::before,
.clearfix::after {
  display: table;
  content: '';
}
html,
body {
  background-color: #f1f2f6;
}
/* @section \u9875\u9762\u6846\u67B6\u5E03\u5C40CSS */
.app-header {
  position: fixed;
  width: 100%;
  height: 60px;
}
.app-viewport {
  max-width: 1280px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
}
/* @section Flex\u5E03\u5C40\u76F8\u5173 */
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
  flex-direction: row;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-r-wrap {
  flex-wrap: wrap-reverse;
}
.flex-col {
  flex-direction: column;
}
.flex-r-row {
  flex-direction: row-reverse;
}
.flex-r-col {
  flex-direction: column-reverse;
}
.flex-j-start {
  justify-content: flex-start;
}
.flex-j-end {
  justify-content: flex-end;
}
.flex-j-center {
  justify-content: center;
}
.flex-j-around {
  justify-content: space-around;
}
.flex-j-between {
  justify-content: space-between;
}
.flex-a-start {
  align-items: flex-start;
}
.flex-a-end {
  align-items: flex-end;
}
.flex-a-center {
  align-items: center;
}
.flex-a-baseline {
  align-items: baseline;
}
.flex-ac-start {
  align-content: flex-start;
}
.flex-ac-end {
  align-content: flex-end;
}
.flex-ac-center {
  align-content: center;
}
.flex-ac-between {
  align-content: space-between;
}
.flex-ac-around {
  align-content: space-around;
}
.flex-s-0 {
  flex-shrink: 0;
}
.flex-s-1 {
  flex-shrink: 1;
}
.flex-g-0 {
  flex-grow: 0;
}
.flex-g-1 {
  flex-grow: 1;
}
.flex-g-2 {
  flex-grow: 2;
}
.flex-g-3 {
  flex-grow: 3;
}
.flex-g-4 {
  flex-grow: 4;
}
.flex-as-start {
  align-self: flex-start;
}
.flex-as-end {
  align-self: flex-end;
}
.flex-as-center {
  align-self: center;
}
.flex-as-baseline {
  align-self: baseline;
}
.flex-as-stretch {
  align-self: stretch;
}
/* @section \u95F4\u8DDD\u8BBE\u7F6E */
.margin-top-0 {
  margin-top: 0px !important;
}
.padding-top-0 {
  padding-top: 0px !important;
}
.margin-top-1 {
  margin-top: 1px !important;
}
.padding-top-1 {
  padding-top: 1px !important;
}
.margin-top-2 {
  margin-top: 2px !important;
}
.padding-top-2 {
  padding-top: 2px !important;
}
.margin-top-3 {
  margin-top: 3px !important;
}
.padding-top-3 {
  padding-top: 3px !important;
}
.margin-top-4 {
  margin-top: 4px !important;
}
.padding-top-4 {
  padding-top: 4px !important;
}
.margin-top-5 {
  margin-top: 5px !important;
}
.padding-top-5 {
  padding-top: 5px !important;
}
.margin-top-6 {
  margin-top: 6px !important;
}
.padding-top-6 {
  padding-top: 6px !important;
}
.margin-top-7 {
  margin-top: 7px !important;
}
.padding-top-7 {
  padding-top: 7px !important;
}
.margin-top-8 {
  margin-top: 8px !important;
}
.padding-top-8 {
  padding-top: 8px !important;
}
.margin-top-9 {
  margin-top: 9px !important;
}
.padding-top-9 {
  padding-top: 9px !important;
}
.margin-top-10 {
  margin-top: 10px !important;
}
.padding-top-10 {
  padding-top: 10px !important;
}
.margin-top-11 {
  margin-top: 11px !important;
}
.padding-top-11 {
  padding-top: 11px !important;
}
.margin-top-12 {
  margin-top: 12px !important;
}
.padding-top-12 {
  padding-top: 12px !important;
}
.margin-top-13 {
  margin-top: 13px !important;
}
.padding-top-13 {
  padding-top: 13px !important;
}
.margin-top-14 {
  margin-top: 14px !important;
}
.padding-top-14 {
  padding-top: 14px !important;
}
.margin-top-15 {
  margin-top: 15px !important;
}
.padding-top-15 {
  padding-top: 15px !important;
}
.margin-top-16 {
  margin-top: 16px !important;
}
.padding-top-16 {
  padding-top: 16px !important;
}
.margin-top-17 {
  margin-top: 17px !important;
}
.padding-top-17 {
  padding-top: 17px !important;
}
.margin-top-18 {
  margin-top: 18px !important;
}
.padding-top-18 {
  padding-top: 18px !important;
}
.margin-top-19 {
  margin-top: 19px !important;
}
.padding-top-19 {
  padding-top: 19px !important;
}
.margin-top-20 {
  margin-top: 20px !important;
}
.padding-top-20 {
  padding-top: 20px !important;
}
.margin-top-21 {
  margin-top: 21px !important;
}
.padding-top-21 {
  padding-top: 21px !important;
}
.margin-top-22 {
  margin-top: 22px !important;
}
.padding-top-22 {
  padding-top: 22px !important;
}
.margin-top-23 {
  margin-top: 23px !important;
}
.padding-top-23 {
  padding-top: 23px !important;
}
.margin-top-24 {
  margin-top: 24px !important;
}
.padding-top-24 {
  padding-top: 24px !important;
}
.margin-top-25 {
  margin-top: 25px !important;
}
.padding-top-25 {
  padding-top: 25px !important;
}
.margin-top-26 {
  margin-top: 26px !important;
}
.padding-top-26 {
  padding-top: 26px !important;
}
.margin-top-27 {
  margin-top: 27px !important;
}
.padding-top-27 {
  padding-top: 27px !important;
}
.margin-top-28 {
  margin-top: 28px !important;
}
.padding-top-28 {
  padding-top: 28px !important;
}
.margin-top-29 {
  margin-top: 29px !important;
}
.padding-top-29 {
  padding-top: 29px !important;
}
.margin-top-30 {
  margin-top: 30px !important;
}
.padding-top-30 {
  padding-top: 30px !important;
}
.margin-bottom-0 {
  margin-bottom: 0px !important;
}
.padding-bottom-0 {
  padding-bottom: 0px !important;
}
.margin-bottom-1 {
  margin-bottom: 1px !important;
}
.padding-bottom-1 {
  padding-bottom: 1px !important;
}
.margin-bottom-2 {
  margin-bottom: 2px !important;
}
.padding-bottom-2 {
  padding-bottom: 2px !important;
}
.margin-bottom-3 {
  margin-bottom: 3px !important;
}
.padding-bottom-3 {
  padding-bottom: 3px !important;
}
.margin-bottom-4 {
  margin-bottom: 4px !important;
}
.padding-bottom-4 {
  padding-bottom: 4px !important;
}
.margin-bottom-5 {
  margin-bottom: 5px !important;
}
.padding-bottom-5 {
  padding-bottom: 5px !important;
}
.margin-bottom-6 {
  margin-bottom: 6px !important;
}
.padding-bottom-6 {
  padding-bottom: 6px !important;
}
.margin-bottom-7 {
  margin-bottom: 7px !important;
}
.padding-bottom-7 {
  padding-bottom: 7px !important;
}
.margin-bottom-8 {
  margin-bottom: 8px !important;
}
.padding-bottom-8 {
  padding-bottom: 8px !important;
}
.margin-bottom-9 {
  margin-bottom: 9px !important;
}
.padding-bottom-9 {
  padding-bottom: 9px !important;
}
.margin-bottom-10 {
  margin-bottom: 10px !important;
}
.padding-bottom-10 {
  padding-bottom: 10px !important;
}
.margin-bottom-11 {
  margin-bottom: 11px !important;
}
.padding-bottom-11 {
  padding-bottom: 11px !important;
}
.margin-bottom-12 {
  margin-bottom: 12px !important;
}
.padding-bottom-12 {
  padding-bottom: 12px !important;
}
.margin-bottom-13 {
  margin-bottom: 13px !important;
}
.padding-bottom-13 {
  padding-bottom: 13px !important;
}
.margin-bottom-14 {
  margin-bottom: 14px !important;
}
.padding-bottom-14 {
  padding-bottom: 14px !important;
}
.margin-bottom-15 {
  margin-bottom: 15px !important;
}
.padding-bottom-15 {
  padding-bottom: 15px !important;
}
.margin-bottom-16 {
  margin-bottom: 16px !important;
}
.padding-bottom-16 {
  padding-bottom: 16px !important;
}
.margin-bottom-17 {
  margin-bottom: 17px !important;
}
.padding-bottom-17 {
  padding-bottom: 17px !important;
}
.margin-bottom-18 {
  margin-bottom: 18px !important;
}
.padding-bottom-18 {
  padding-bottom: 18px !important;
}
.margin-bottom-19 {
  margin-bottom: 19px !important;
}
.padding-bottom-19 {
  padding-bottom: 19px !important;
}
.margin-bottom-20 {
  margin-bottom: 20px !important;
}
.padding-bottom-20 {
  padding-bottom: 20px !important;
}
.margin-bottom-21 {
  margin-bottom: 21px !important;
}
.padding-bottom-21 {
  padding-bottom: 21px !important;
}
.margin-bottom-22 {
  margin-bottom: 22px !important;
}
.padding-bottom-22 {
  padding-bottom: 22px !important;
}
.margin-bottom-23 {
  margin-bottom: 23px !important;
}
.padding-bottom-23 {
  padding-bottom: 23px !important;
}
.margin-bottom-24 {
  margin-bottom: 24px !important;
}
.padding-bottom-24 {
  padding-bottom: 24px !important;
}
.margin-bottom-25 {
  margin-bottom: 25px !important;
}
.padding-bottom-25 {
  padding-bottom: 25px !important;
}
.margin-bottom-26 {
  margin-bottom: 26px !important;
}
.padding-bottom-26 {
  padding-bottom: 26px !important;
}
.margin-bottom-27 {
  margin-bottom: 27px !important;
}
.padding-bottom-27 {
  padding-bottom: 27px !important;
}
.margin-bottom-28 {
  margin-bottom: 28px !important;
}
.padding-bottom-28 {
  padding-bottom: 28px !important;
}
.margin-bottom-29 {
  margin-bottom: 29px !important;
}
.padding-bottom-29 {
  padding-bottom: 29px !important;
}
.margin-bottom-30 {
  margin-bottom: 30px !important;
}
.padding-bottom-30 {
  padding-bottom: 30px !important;
}
.margin-left-0 {
  margin-left: 0px !important;
}
.padding-left-0 {
  padding-left: 0px !important;
}
.margin-left-1 {
  margin-left: 1px !important;
}
.padding-left-1 {
  padding-left: 1px !important;
}
.margin-left-2 {
  margin-left: 2px !important;
}
.padding-left-2 {
  padding-left: 2px !important;
}
.margin-left-3 {
  margin-left: 3px !important;
}
.padding-left-3 {
  padding-left: 3px !important;
}
.margin-left-4 {
  margin-left: 4px !important;
}
.padding-left-4 {
  padding-left: 4px !important;
}
.margin-left-5 {
  margin-left: 5px !important;
}
.padding-left-5 {
  padding-left: 5px !important;
}
.margin-left-6 {
  margin-left: 6px !important;
}
.padding-left-6 {
  padding-left: 6px !important;
}
.margin-left-7 {
  margin-left: 7px !important;
}
.padding-left-7 {
  padding-left: 7px !important;
}
.margin-left-8 {
  margin-left: 8px !important;
}
.padding-left-8 {
  padding-left: 8px !important;
}
.margin-left-9 {
  margin-left: 9px !important;
}
.padding-left-9 {
  padding-left: 9px !important;
}
.margin-left-10 {
  margin-left: 10px !important;
}
.padding-left-10 {
  padding-left: 10px !important;
}
.margin-left-11 {
  margin-left: 11px !important;
}
.padding-left-11 {
  padding-left: 11px !important;
}
.margin-left-12 {
  margin-left: 12px !important;
}
.padding-left-12 {
  padding-left: 12px !important;
}
.margin-left-13 {
  margin-left: 13px !important;
}
.padding-left-13 {
  padding-left: 13px !important;
}
.margin-left-14 {
  margin-left: 14px !important;
}
.padding-left-14 {
  padding-left: 14px !important;
}
.margin-left-15 {
  margin-left: 15px !important;
}
.padding-left-15 {
  padding-left: 15px !important;
}
.margin-left-16 {
  margin-left: 16px !important;
}
.padding-left-16 {
  padding-left: 16px !important;
}
.margin-left-17 {
  margin-left: 17px !important;
}
.padding-left-17 {
  padding-left: 17px !important;
}
.margin-left-18 {
  margin-left: 18px !important;
}
.padding-left-18 {
  padding-left: 18px !important;
}
.margin-left-19 {
  margin-left: 19px !important;
}
.padding-left-19 {
  padding-left: 19px !important;
}
.margin-left-20 {
  margin-left: 20px !important;
}
.padding-left-20 {
  padding-left: 20px !important;
}
.margin-left-21 {
  margin-left: 21px !important;
}
.padding-left-21 {
  padding-left: 21px !important;
}
.margin-left-22 {
  margin-left: 22px !important;
}
.padding-left-22 {
  padding-left: 22px !important;
}
.margin-left-23 {
  margin-left: 23px !important;
}
.padding-left-23 {
  padding-left: 23px !important;
}
.margin-left-24 {
  margin-left: 24px !important;
}
.padding-left-24 {
  padding-left: 24px !important;
}
.margin-left-25 {
  margin-left: 25px !important;
}
.padding-left-25 {
  padding-left: 25px !important;
}
.margin-left-26 {
  margin-left: 26px !important;
}
.padding-left-26 {
  padding-left: 26px !important;
}
.margin-left-27 {
  margin-left: 27px !important;
}
.padding-left-27 {
  padding-left: 27px !important;
}
.margin-left-28 {
  margin-left: 28px !important;
}
.padding-left-28 {
  padding-left: 28px !important;
}
.margin-left-29 {
  margin-left: 29px !important;
}
.padding-left-29 {
  padding-left: 29px !important;
}
.margin-left-30 {
  margin-left: 30px !important;
}
.padding-left-30 {
  padding-left: 30px !important;
}
.margin-right-0 {
  margin-right: 0px !important;
}
.padding-right-0 {
  padding-right: 0px !important;
}
.margin-right-1 {
  margin-right: 1px !important;
}
.padding-right-1 {
  padding-right: 1px !important;
}
.margin-right-2 {
  margin-right: 2px !important;
}
.padding-right-2 {
  padding-right: 2px !important;
}
.margin-right-3 {
  margin-right: 3px !important;
}
.padding-right-3 {
  padding-right: 3px !important;
}
.margin-right-4 {
  margin-right: 4px !important;
}
.padding-right-4 {
  padding-right: 4px !important;
}
.margin-right-5 {
  margin-right: 5px !important;
}
.padding-right-5 {
  padding-right: 5px !important;
}
.margin-right-6 {
  margin-right: 6px !important;
}
.padding-right-6 {
  padding-right: 6px !important;
}
.margin-right-7 {
  margin-right: 7px !important;
}
.padding-right-7 {
  padding-right: 7px !important;
}
.margin-right-8 {
  margin-right: 8px !important;
}
.padding-right-8 {
  padding-right: 8px !important;
}
.margin-right-9 {
  margin-right: 9px !important;
}
.padding-right-9 {
  padding-right: 9px !important;
}
.margin-right-10 {
  margin-right: 10px !important;
}
.padding-right-10 {
  padding-right: 10px !important;
}
.margin-right-11 {
  margin-right: 11px !important;
}
.padding-right-11 {
  padding-right: 11px !important;
}
.margin-right-12 {
  margin-right: 12px !important;
}
.padding-right-12 {
  padding-right: 12px !important;
}
.margin-right-13 {
  margin-right: 13px !important;
}
.padding-right-13 {
  padding-right: 13px !important;
}
.margin-right-14 {
  margin-right: 14px !important;
}
.padding-right-14 {
  padding-right: 14px !important;
}
.margin-right-15 {
  margin-right: 15px !important;
}
.padding-right-15 {
  padding-right: 15px !important;
}
.margin-right-16 {
  margin-right: 16px !important;
}
.padding-right-16 {
  padding-right: 16px !important;
}
.margin-right-17 {
  margin-right: 17px !important;
}
.padding-right-17 {
  padding-right: 17px !important;
}
.margin-right-18 {
  margin-right: 18px !important;
}
.padding-right-18 {
  padding-right: 18px !important;
}
.margin-right-19 {
  margin-right: 19px !important;
}
.padding-right-19 {
  padding-right: 19px !important;
}
.margin-right-20 {
  margin-right: 20px !important;
}
.padding-right-20 {
  padding-right: 20px !important;
}
.margin-right-21 {
  margin-right: 21px !important;
}
.padding-right-21 {
  padding-right: 21px !important;
}
.margin-right-22 {
  margin-right: 22px !important;
}
.padding-right-22 {
  padding-right: 22px !important;
}
.margin-right-23 {
  margin-right: 23px !important;
}
.padding-right-23 {
  padding-right: 23px !important;
}
.margin-right-24 {
  margin-right: 24px !important;
}
.padding-right-24 {
  padding-right: 24px !important;
}
.margin-right-25 {
  margin-right: 25px !important;
}
.padding-right-25 {
  padding-right: 25px !important;
}
.margin-right-26 {
  margin-right: 26px !important;
}
.padding-right-26 {
  padding-right: 26px !important;
}
.margin-right-27 {
  margin-right: 27px !important;
}
.padding-right-27 {
  padding-right: 27px !important;
}
.margin-right-28 {
  margin-right: 28px !important;
}
.padding-right-28 {
  padding-right: 28px !important;
}
.margin-right-29 {
  margin-right: 29px !important;
}
.padding-right-29 {
  padding-right: 29px !important;
}
.margin-right-30 {
  margin-right: 30px !important;
}
.padding-right-30 {
  padding-right: 30px !important;
}
.margin-0 {
  margin: 0px !important;
}
.padding-0 {
  padding: 0px !important;
}
.margin-1 {
  margin: 1px !important;
}
.padding-1 {
  padding: 1px !important;
}
.margin-2 {
  margin: 2px !important;
}
.padding-2 {
  padding: 2px !important;
}
.margin-3 {
  margin: 3px !important;
}
.padding-3 {
  padding: 3px !important;
}
.margin-4 {
  margin: 4px !important;
}
.padding-4 {
  padding: 4px !important;
}
.margin-5 {
  margin: 5px !important;
}
.padding-5 {
  padding: 5px !important;
}
.margin-6 {
  margin: 6px !important;
}
.padding-6 {
  padding: 6px !important;
}
.margin-7 {
  margin: 7px !important;
}
.padding-7 {
  padding: 7px !important;
}
.margin-8 {
  margin: 8px !important;
}
.padding-8 {
  padding: 8px !important;
}
.margin-9 {
  margin: 9px !important;
}
.padding-9 {
  padding: 9px !important;
}
.margin-10 {
  margin: 10px !important;
}
.padding-10 {
  padding: 10px !important;
}
.margin-11 {
  margin: 11px !important;
}
.padding-11 {
  padding: 11px !important;
}
.margin-12 {
  margin: 12px !important;
}
.padding-12 {
  padding: 12px !important;
}
.margin-13 {
  margin: 13px !important;
}
.padding-13 {
  padding: 13px !important;
}
.margin-14 {
  margin: 14px !important;
}
.padding-14 {
  padding: 14px !important;
}
.margin-15 {
  margin: 15px !important;
}
.padding-15 {
  padding: 15px !important;
}
.margin-16 {
  margin: 16px !important;
}
.padding-16 {
  padding: 16px !important;
}
.margin-17 {
  margin: 17px !important;
}
.padding-17 {
  padding: 17px !important;
}
.margin-18 {
  margin: 18px !important;
}
.padding-18 {
  padding: 18px !important;
}
.margin-19 {
  margin: 19px !important;
}
.padding-19 {
  padding: 19px !important;
}
.margin-20 {
  margin: 20px !important;
}
.padding-20 {
  padding: 20px !important;
}
.margin-21 {
  margin: 21px !important;
}
.padding-21 {
  padding: 21px !important;
}
.margin-22 {
  margin: 22px !important;
}
.padding-22 {
  padding: 22px !important;
}
.margin-23 {
  margin: 23px !important;
}
.padding-23 {
  padding: 23px !important;
}
.margin-24 {
  margin: 24px !important;
}
.padding-24 {
  padding: 24px !important;
}
.margin-25 {
  margin: 25px !important;
}
.padding-25 {
  padding: 25px !important;
}
.margin-26 {
  margin: 26px !important;
}
.padding-26 {
  padding: 26px !important;
}
.margin-27 {
  margin: 27px !important;
}
.padding-27 {
  padding: 27px !important;
}
.margin-28 {
  margin: 28px !important;
}
.padding-28 {
  padding: 28px !important;
}
.margin-29 {
  margin: 29px !important;
}
.padding-29 {
  padding: 29px !important;
}
.margin-30 {
  margin: 30px !important;
}
.padding-30 {
  padding: 30px !important;
}
`;
function createApp() {
  const app = vue.createSSRApp(_sfc_main$1);
  const router = createRouter();
  app.use(router);
  app.directive("media", media);
  return {app, router};
}
async function render(url, manifest) {
  const {app, router} = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return "";
  }
}
var _sfc_main = vue.defineComponent({
  name: "Index",
  setup(props, {emit}) {
    vue.onMounted(() => {
      emit("haha");
    });
    let backgroundSrc = vue.ref("/img/logo.png");
    return {
      backgroundSrc
    };
  }
});
var Index_styl_vue_type_style_index_0_src_lang = '.index-main {\n  width: 100%;\n  height: 100%;\n}\n.index-banner {\n  width: 100%;\n  height: 640px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-image: url("https://myblog-1255355961.cos.ap-guangzhou.myqcloud.com/img/logo.png");\n  background-attachment: fixed;\n}\n';
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<main${serverRenderer.ssrRenderAttrs(vue.mergeProps({class: "index-main"}, _attrs))}><div class="index-banner"></div></main>`);
}
_sfc_main.ssrRender = _sfc_ssrRender;
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = new Set())).add("F:/project/myblog/src/pages/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: _sfc_main
});
exports.render = render;
