"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCharacterConnectorLogicHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCharacterConnectorRange_1 = require("./FbCharacterConnectorRange");
class UnionCharacterConnectorLogicHelper {
  static GetUnionCharacterConnectorLogicObject(e) {
    if (
      e === fb_component_1.UnionCharacterConnectorLogic.CharacterConnectorRange
    )
      return new fb_component_1.CharacterConnectorRange();
  }
  static ReadUnionCharacterConnectorLogic(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionCharacterConnectorLogic.CharacterConnectorRange
      ? FbCharacterConnectorRange_1.FbCharacterConnectorRange.Create(o)
      : void 0;
  }
}
exports.UnionCharacterConnectorLogicHelper = UnionCharacterConnectorLogicHelper;
//# sourceMappingURL=UnionCharacterConnectorLogicHelper.js.map
