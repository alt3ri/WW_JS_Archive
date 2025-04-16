"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionGroupAiOption =
    exports.unionToUnionGroupAiOption =
    exports.UnionGroupAiOption =
      void 0);
const group_ai_patrol_js_1 = require("../fb-component/group-ai-patrol.js");
var UnionGroupAiOption;
function unionToUnionGroupAiOption(o, n) {
  switch (UnionGroupAiOption[o]) {
    case "NONE":
      return;
    case "GroupAiPatrol":
      return n(new group_ai_patrol_js_1.GroupAiPatrol());
    default:
      return;
  }
}
function unionListToUnionGroupAiOption(o, n, r) {
  switch (UnionGroupAiOption[o]) {
    case "NONE":
      return;
    case "GroupAiPatrol":
      return n(r, new group_ai_patrol_js_1.GroupAiPatrol());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"), (o[(o.GroupAiPatrol = 1)] = "GroupAiPatrol");
})(
  (UnionGroupAiOption =
    exports.UnionGroupAiOption || (exports.UnionGroupAiOption = {})),
),
  (exports.unionToUnionGroupAiOption = unionToUnionGroupAiOption),
  (exports.unionListToUnionGroupAiOption = unionListToUnionGroupAiOption);
//# sourceMappingURL=union-group-ai-option.js.map
