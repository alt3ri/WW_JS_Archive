"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionVar =
    exports.unionToUnionVar =
    exports.UnionVar =
      void 0);
const int_value_js_1 = require("../fb-var/int-value.js"),
  string_value_js_1 = require("../fb-var/string-value.js");
var UnionVar;
function unionToUnionVar(n, r) {
  switch (UnionVar[n]) {
    case "NONE":
      return;
    case "FbVar_IntValue":
      return r(new int_value_js_1.IntValue());
    case "FbVar_StringValue":
      return r(new string_value_js_1.StringValue());
    default:
      return;
  }
}
function unionListToUnionVar(n, r, e) {
  switch (UnionVar[n]) {
    case "NONE":
      return;
    case "FbVar_IntValue":
      return r(e, new int_value_js_1.IntValue());
    case "FbVar_StringValue":
      return r(e, new string_value_js_1.StringValue());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.FbVar_IntValue = 1)] = "FbVar_IntValue"),
    (n[(n.FbVar_StringValue = 2)] = "FbVar_StringValue");
})((UnionVar = exports.UnionVar || (exports.UnionVar = {}))),
  (exports.unionToUnionVar = unionToUnionVar),
  (exports.unionListToUnionVar = unionListToUnionVar);
//# sourceMappingURL=union-var.js.map
