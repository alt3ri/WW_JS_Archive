"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRefreshInputTag = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../../Game/Global"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelEventLockInputState_1 = require("../LevelEventLockInputState"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRefreshInputTag extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
      !0,
      !0,
      !0,
      !0,
    ),
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    var r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity,
      n = 477750727;
    r?.Valid &&
      (r = r.GetComponent(203))?.HasTag(n) &&
      (r.RemoveTag(n), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Test",
        29,
        "[LevelEventRefreshInputTag.ExecuteNew] RemoveTag 禁止冲刺",
      );
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RemGuaranteeAction,
      this.Type,
      this.BaseContext,
      { Name: "UnLimitPlayerOperation" },
    );
  }
}
exports.LevelEventRefreshInputTag = LevelEventRefreshInputTag;
//# sourceMappingURL=LevelEventRefreshInputTag.js.map
