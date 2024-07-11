"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckSystemFunction = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckSystemFunction extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, n) {
    var r = e.SystemId,
      r = ModelManager_1.ModelManager.FunctionModel.IsOpen(r);
    return "Eq" === e.Compare ? r : !r;
  }
}
exports.LevelConditionCheckSystemFunction = LevelConditionCheckSystemFunction;
//# sourceMappingURL=LevelConditionCheckSystemFunction.js.map
