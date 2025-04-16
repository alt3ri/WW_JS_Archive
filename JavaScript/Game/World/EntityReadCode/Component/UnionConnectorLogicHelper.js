"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionConnectorLogicHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbConnectorRange_1 = require("./FbConnectorRange");
class UnionConnectorLogicHelper {
  static GetUnionConnectorLogicObject(o) {
    if (o === fb_component_1.UnionConnectorLogic.ConnectorRange)
      return new fb_component_1.ConnectorRange();
  }
  static ReadUnionConnectorLogic(o, n) {
    return void 0 !== n &&
      o === fb_component_1.UnionConnectorLogic.ConnectorRange
      ? FbConnectorRange_1.FbConnectorRange.Create(n)
      : void 0;
  }
}
exports.UnionConnectorLogicHelper = UnionConnectorLogicHelper;
//# sourceMappingURL=UnionConnectorLogicHelper.js.map
