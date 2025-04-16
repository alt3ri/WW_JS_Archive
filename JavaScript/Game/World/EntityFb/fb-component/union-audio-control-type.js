"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAudioControlType =
    exports.unionToUnionAudioControlType =
    exports.UnionAudioControlType =
      void 0);
const gramophone_audio_control_js_1 = require("../fb-component/gramophone-audio-control.js");
var UnionAudioControlType;
function unionToUnionAudioControlType(o, n) {
  switch (UnionAudioControlType[o]) {
    case "NONE":
      return;
    case "GramophoneAudioControl":
      return n(new gramophone_audio_control_js_1.GramophoneAudioControl());
    default:
      return;
  }
}
function unionListToUnionAudioControlType(o, n, r) {
  switch (UnionAudioControlType[o]) {
    case "NONE":
      return;
    case "GramophoneAudioControl":
      return n(r, new gramophone_audio_control_js_1.GramophoneAudioControl());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.GramophoneAudioControl = 1)] = "GramophoneAudioControl");
})(
  (UnionAudioControlType =
    exports.UnionAudioControlType || (exports.UnionAudioControlType = {})),
),
  (exports.unionToUnionAudioControlType = unionToUnionAudioControlType),
  (exports.unionListToUnionAudioControlType = unionListToUnionAudioControlType);
//# sourceMappingURL=union-audio-control-type.js.map
