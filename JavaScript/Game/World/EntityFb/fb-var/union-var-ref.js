"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVarRef =
    exports.unionToUnionVarRef =
    exports.UnionVarRef =
      void 0);
const const_var_ref_js_1 = require("../fb-var/const-var-ref.js"),
  global_var_ref_js_1 = require("../fb-var/global-var-ref.js"),
  other_var_ref_js_1 = require("../fb-var/other-var-ref.js"),
  self_var_ref_js_1 = require("../fb-var/self-var-ref.js");
var UnionVarRef;
function unionToUnionVarRef(r, e) {
  switch (UnionVarRef[r]) {
    case "NONE":
      return;
    case "ConstVarRef":
      return e(new const_var_ref_js_1.ConstVarRef());
    case "GlobalVarRef":
      return e(new global_var_ref_js_1.GlobalVarRef());
    case "OtherVarRef":
      return e(new other_var_ref_js_1.OtherVarRef());
    case "SelfVarRef":
      return e(new self_var_ref_js_1.SelfVarRef());
    default:
      return;
  }
}
function unionListToUnionVarRef(r, e, a) {
  switch (UnionVarRef[r]) {
    case "NONE":
      return;
    case "ConstVarRef":
      return e(a, new const_var_ref_js_1.ConstVarRef());
    case "GlobalVarRef":
      return e(a, new global_var_ref_js_1.GlobalVarRef());
    case "OtherVarRef":
      return e(a, new other_var_ref_js_1.OtherVarRef());
    case "SelfVarRef":
      return e(a, new self_var_ref_js_1.SelfVarRef());
    default:
      return;
  }
}
!(function (r) {
  (r[(r.NONE = 0)] = "NONE"),
    (r[(r.ConstVarRef = 1)] = "ConstVarRef"),
    (r[(r.GlobalVarRef = 2)] = "GlobalVarRef"),
    (r[(r.OtherVarRef = 3)] = "OtherVarRef"),
    (r[(r.SelfVarRef = 4)] = "SelfVarRef");
})((UnionVarRef = exports.UnionVarRef || (exports.UnionVarRef = {}))),
  (exports.unionToUnionVarRef = unionToUnionVarRef),
  (exports.unionListToUnionVarRef = unionListToUnionVarRef);
//# sourceMappingURL=union-var-ref.js.map
