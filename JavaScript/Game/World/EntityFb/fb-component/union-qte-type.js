"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionQteType =
    exports.unionToUnionQteType =
    exports.UnionQteType =
      void 0);
const single_btn_qte_js_1 = require("../fb-component/single-btn-qte.js");
var UnionQteType;
function unionToUnionQteType(e, n) {
  switch (UnionQteType[e]) {
    case "NONE":
      return;
    case "SingleBtnQte":
      return n(new single_btn_qte_js_1.SingleBtnQte());
    default:
      return;
  }
}
function unionListToUnionQteType(e, n, t) {
  switch (UnionQteType[e]) {
    case "NONE":
      return;
    case "SingleBtnQte":
      return n(t, new single_btn_qte_js_1.SingleBtnQte());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.SingleBtnQte = 1)] = "SingleBtnQte");
})((UnionQteType = exports.UnionQteType || (exports.UnionQteType = {}))),
  (exports.unionToUnionQteType = unionToUnionQteType),
  (exports.unionListToUnionQteType = unionListToUnionQteType);
//# sourceMappingURL=union-qte-type.js.map
