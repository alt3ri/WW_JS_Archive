"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetPlayerMoveControl = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPlayerMoveControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.xRe = !1);
  }
  ExecuteNew(e, t) {
    e &&
      ((this.xRe =
        1 === (e = e).Forward && 1 === e.Back && 1 === e.Left && 1 === e.Right),
      ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
        1 === e.Forward,
        1 === e.Back,
        1 === e.Left,
        1 === e.Right,
      ));
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      this.xRe
        ? EventDefine_1.EEventName.RemGuaranteeAction
        : EventDefine_1.EEventName.AddGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "EnablePlayerMoveControl" },
    );
  }
}
exports.LevelEventSetPlayerMoveControl = LevelEventSetPlayerMoveControl;
//# sourceMappingURL=LevelEventSetPlayerMoveControl.js.map
