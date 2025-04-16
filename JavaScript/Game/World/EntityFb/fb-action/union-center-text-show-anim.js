"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCenterTextShowAnim =
    exports.unionToUnionCenterTextShowAnim =
    exports.UnionCenterTextShowAnim =
      void 0);
const icenter_text_fade_out_js_1 = require("../fb-action/icenter-text-fade-out.js"),
  icenter_text_show_all_js_1 = require("../fb-action/icenter-text-show-all.js"),
  icenter_text_type_writer_js_1 = require("../fb-action/icenter-text-type-writer.js");
var UnionCenterTextShowAnim;
function unionToUnionCenterTextShowAnim(e, t) {
  switch (UnionCenterTextShowAnim[e]) {
    case "NONE":
      return;
    case "ICenterTextFadeOut":
      return t(new icenter_text_fade_out_js_1.ICenterTextFadeOut());
    case "ICenterTextShowAll":
      return t(new icenter_text_show_all_js_1.ICenterTextShowAll());
    case "ICenterTextTypeWriter":
      return t(new icenter_text_type_writer_js_1.ICenterTextTypeWriter());
    default:
      return;
  }
}
function unionListToUnionCenterTextShowAnim(e, t, n) {
  switch (UnionCenterTextShowAnim[e]) {
    case "NONE":
      return;
    case "ICenterTextFadeOut":
      return t(n, new icenter_text_fade_out_js_1.ICenterTextFadeOut());
    case "ICenterTextShowAll":
      return t(n, new icenter_text_show_all_js_1.ICenterTextShowAll());
    case "ICenterTextTypeWriter":
      return t(n, new icenter_text_type_writer_js_1.ICenterTextTypeWriter());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ICenterTextFadeOut = 1)] = "ICenterTextFadeOut"),
    (e[(e.ICenterTextShowAll = 2)] = "ICenterTextShowAll"),
    (e[(e.ICenterTextTypeWriter = 3)] = "ICenterTextTypeWriter");
})(
  (UnionCenterTextShowAnim =
    exports.UnionCenterTextShowAnim || (exports.UnionCenterTextShowAnim = {})),
),
  (exports.unionToUnionCenterTextShowAnim = unionToUnionCenterTextShowAnim),
  (exports.unionListToUnionCenterTextShowAnim =
    unionListToUnionCenterTextShowAnim);
//# sourceMappingURL=union-center-text-show-anim.js.map
