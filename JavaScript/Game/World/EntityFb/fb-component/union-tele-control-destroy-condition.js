"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTeleControlDestroyCondition =
    exports.unionToUnionTeleControlDestroyCondition =
    exports.UnionTeleControlDestroyCondition =
      void 0);
const create_bullet_destroy_condition_js_1 = require("../fb-component/create-bullet-destroy-condition.js"),
  let_go_destroy_condition_js_1 = require("../fb-component/let-go-destroy-condition.js"),
  throw_destroy_condition_js_1 = require("../fb-component/throw-destroy-condition.js");
var UnionTeleControlDestroyCondition;
function unionToUnionTeleControlDestroyCondition(o, t) {
  switch (UnionTeleControlDestroyCondition[o]) {
    case "NONE":
      return;
    case "CreateBulletDestroyCondition":
      return t(
        new create_bullet_destroy_condition_js_1.CreateBulletDestroyCondition(),
      );
    case "LetGoDestroyCondition":
      return t(new let_go_destroy_condition_js_1.LetGoDestroyCondition());
    case "ThrowDestroyCondition":
      return t(new throw_destroy_condition_js_1.ThrowDestroyCondition());
    default:
      return;
  }
}
function unionListToUnionTeleControlDestroyCondition(o, t, e) {
  switch (UnionTeleControlDestroyCondition[o]) {
    case "NONE":
      return;
    case "CreateBulletDestroyCondition":
      return t(
        e,
        new create_bullet_destroy_condition_js_1.CreateBulletDestroyCondition(),
      );
    case "LetGoDestroyCondition":
      return t(e, new let_go_destroy_condition_js_1.LetGoDestroyCondition());
    case "ThrowDestroyCondition":
      return t(e, new throw_destroy_condition_js_1.ThrowDestroyCondition());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.CreateBulletDestroyCondition = 1)] = "CreateBulletDestroyCondition"),
    (o[(o.LetGoDestroyCondition = 2)] = "LetGoDestroyCondition"),
    (o[(o.ThrowDestroyCondition = 3)] = "ThrowDestroyCondition");
})(
  (UnionTeleControlDestroyCondition =
    exports.UnionTeleControlDestroyCondition ||
    (exports.UnionTeleControlDestroyCondition = {})),
),
  (exports.unionToUnionTeleControlDestroyCondition =
    unionToUnionTeleControlDestroyCondition),
  (exports.unionListToUnionTeleControlDestroyCondition =
    unionListToUnionTeleControlDestroyCondition);
//# sourceMappingURL=union-tele-control-destroy-condition.js.map
