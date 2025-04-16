"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionHeadStyle =
    exports.unionToUnionHeadStyle =
    exports.UnionHeadStyle =
      void 0);
const head_style_monster_display_js_1 = require("../fb-action/head-style-monster-display.js"),
  head_style_normal_js_1 = require("../fb-action/head-style-normal.js"),
  head_style_voice_only_js_1 = require("../fb-action/head-style-voice-only.js"),
  head_style_warning_js_1 = require("../fb-action/head-style-warning.js"),
  head_style_weak_signal_js_1 = require("../fb-action/head-style-weak-signal.js");
var UnionHeadStyle;
function unionToUnionHeadStyle(e, a) {
  switch (UnionHeadStyle[e]) {
    case "NONE":
      return;
    case "HeadStyleMonsterDisplay":
      return a(new head_style_monster_display_js_1.HeadStyleMonsterDisplay());
    case "HeadStyleNormal":
      return a(new head_style_normal_js_1.HeadStyleNormal());
    case "HeadStyleVoiceOnly":
      return a(new head_style_voice_only_js_1.HeadStyleVoiceOnly());
    case "HeadStyleWarning":
      return a(new head_style_warning_js_1.HeadStyleWarning());
    case "HeadStyleWeakSignal":
      return a(new head_style_weak_signal_js_1.HeadStyleWeakSignal());
    default:
      return;
  }
}
function unionListToUnionHeadStyle(e, a, n) {
  switch (UnionHeadStyle[e]) {
    case "NONE":
      return;
    case "HeadStyleMonsterDisplay":
      return a(
        n,
        new head_style_monster_display_js_1.HeadStyleMonsterDisplay(),
      );
    case "HeadStyleNormal":
      return a(n, new head_style_normal_js_1.HeadStyleNormal());
    case "HeadStyleVoiceOnly":
      return a(n, new head_style_voice_only_js_1.HeadStyleVoiceOnly());
    case "HeadStyleWarning":
      return a(n, new head_style_warning_js_1.HeadStyleWarning());
    case "HeadStyleWeakSignal":
      return a(n, new head_style_weak_signal_js_1.HeadStyleWeakSignal());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HeadStyleMonsterDisplay = 1)] = "HeadStyleMonsterDisplay"),
    (e[(e.HeadStyleNormal = 2)] = "HeadStyleNormal"),
    (e[(e.HeadStyleVoiceOnly = 3)] = "HeadStyleVoiceOnly"),
    (e[(e.HeadStyleWarning = 4)] = "HeadStyleWarning"),
    (e[(e.HeadStyleWeakSignal = 5)] = "HeadStyleWeakSignal");
})((UnionHeadStyle = exports.UnionHeadStyle || (exports.UnionHeadStyle = {}))),
  (exports.unionToUnionHeadStyle = unionToUnionHeadStyle),
  (exports.unionListToUnionHeadStyle = unionListToUnionHeadStyle);
//# sourceMappingURL=union-head-style.js.map
