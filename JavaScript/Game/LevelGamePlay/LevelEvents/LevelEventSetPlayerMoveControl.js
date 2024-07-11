"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetPlayerMoveControl = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputController_1 = require("../../Input/InputController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetPlayerMoveControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.xRe = !1);
  }
  Execute(e, t) {
    const n = e.get("Front") === StringUtils_1.ONE_STRING;
    const r = e.get("Back") === StringUtils_1.ONE_STRING;
    const l = e.get("Left") === StringUtils_1.ONE_STRING;
    var e = e.get("Right") === StringUtils_1.ONE_STRING;
    (this.xRe = n && r && l && e),
      InputController_1.InputController.SetMoveControlEnabled(n, r, l, e);
  }
  ExecuteNew(e, t) {
    e &&
      ((this.xRe =
        (e = e).Forward === 1 && e.Back === 1 && e.Left === 1 && e.Right === 1),
      InputController_1.InputController.SetMoveControlEnabled(
        e.Forward === 1,
        e.Back === 1,
        e.Left === 1,
        e.Right === 1,
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
// # sourceMappingURL=LevelEventSetPlayerMoveControl.js.map
