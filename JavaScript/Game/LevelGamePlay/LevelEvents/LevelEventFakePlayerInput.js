"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventFakePlayerInput = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFakePlayerInput extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.OPt = void 0);
  }
  ExecuteNew(e, n) {
    e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          31,
          "[LevelEventFakePlayerInput] 参数配置错误",
        )),
      (this.OPt = e);
    let t = InputEnums_1.EInputAction.None;
    switch (this.OPt.Input) {
      case 1:
        t = InputEnums_1.EInputAction.跳跃;
        break;
      case 2:
        t = InputEnums_1.EInputAction.攻击;
        break;
      case 3:
        t = InputEnums_1.EInputAction.闪避;
        break;
      case 4:
        t = InputEnums_1.EInputAction.技能1;
        break;
      case 5:
        t = InputEnums_1.EInputAction.幻象1;
        break;
      case 7:
        t = InputEnums_1.EInputAction.幻象2;
        break;
      case 6:
        t = InputEnums_1.EInputAction.大招;
    }
    t === InputEnums_1.EInputAction.None
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          31,
          "[LevelEventFakePlayerInput] 未知的输入类型",
          ["Input", this.OPt.Input],
        )
      : (ControllerHolder_1.ControllerHolder.InputController.InputAction(t, 1),
        ControllerHolder_1.ControllerHolder.InputController.InputAction(t, 2));
  }
}
exports.LevelEventFakePlayerInput = LevelEventFakePlayerInput;
//# sourceMappingURL=LevelEventFakePlayerInput.js.map
