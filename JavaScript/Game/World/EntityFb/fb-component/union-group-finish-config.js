"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionGroupFinishConfig =
    exports.unionToUnionGroupFinishConfig =
    exports.UnionGroupFinishConfig =
      void 0);
const group_finish_destroy_js_1 = require("../fb-component/group-finish-destroy.js"),
  group_finish_silence_js_1 = require("../fb-component/group-finish-silence.js");
var UnionGroupFinishConfig;
function unionToUnionGroupFinishConfig(n, i) {
  switch (UnionGroupFinishConfig[n]) {
    case "NONE":
      return;
    case "GroupFinishDestroy":
      return i(new group_finish_destroy_js_1.GroupFinishDestroy());
    case "GroupFinishSilence":
      return i(new group_finish_silence_js_1.GroupFinishSilence());
    default:
      return;
  }
}
function unionListToUnionGroupFinishConfig(n, i, o) {
  switch (UnionGroupFinishConfig[n]) {
    case "NONE":
      return;
    case "GroupFinishDestroy":
      return i(o, new group_finish_destroy_js_1.GroupFinishDestroy());
    case "GroupFinishSilence":
      return i(o, new group_finish_silence_js_1.GroupFinishSilence());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.GroupFinishDestroy = 1)] = "GroupFinishDestroy"),
    (n[(n.GroupFinishSilence = 2)] = "GroupFinishSilence");
})(
  (UnionGroupFinishConfig =
    exports.UnionGroupFinishConfig || (exports.UnionGroupFinishConfig = {})),
),
  (exports.unionToUnionGroupFinishConfig = unionToUnionGroupFinishConfig),
  (exports.unionListToUnionGroupFinishConfig =
    unionListToUnionGroupFinishConfig);
//# sourceMappingURL=union-group-finish-config.js.map
