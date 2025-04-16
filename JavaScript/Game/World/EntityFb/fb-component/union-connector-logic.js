"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionConnectorLogic =
    exports.unionToUnionConnectorLogic =
    exports.UnionConnectorLogic =
      void 0);
const connector_range_js_1 = require("../fb-component/connector-range.js");
var UnionConnectorLogic;
function unionToUnionConnectorLogic(n, o) {
  switch (UnionConnectorLogic[n]) {
    case "NONE":
      return;
    case "ConnectorRange":
      return o(new connector_range_js_1.ConnectorRange());
    default:
      return;
  }
}
function unionListToUnionConnectorLogic(n, o, e) {
  switch (UnionConnectorLogic[n]) {
    case "NONE":
      return;
    case "ConnectorRange":
      return o(e, new connector_range_js_1.ConnectorRange());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"), (n[(n.ConnectorRange = 1)] = "ConnectorRange");
})(
  (UnionConnectorLogic =
    exports.UnionConnectorLogic || (exports.UnionConnectorLogic = {})),
),
  (exports.unionToUnionConnectorLogic = unionToUnionConnectorLogic),
  (exports.unionListToUnionConnectorLogic = unionListToUnionConnectorLogic);
//# sourceMappingURL=union-connector-logic.js.map
