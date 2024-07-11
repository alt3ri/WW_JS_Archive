"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSetWalkOff extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(e, t, r) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity.GetComponent(161))?.Valid &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Movement",
          6,
          "边缘保护：开，动画事件",
          ["玩家id:", e.Entity.Id],
          ["动作", t?.GetName()],
        ),
      e.SetWalkOffLedgeRecord(!1),
      !0)
    );
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity.GetComponent(161))?.Valid &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Movement",
          6,
          "边缘保护：关，动画事件",
          ["玩家id:", e.Entity.Id],
          ["动作", t?.GetName()],
        ),
      e.SetWalkOffLedgeRecord(!0),
      !0)
    );
  }
  GetNotifyName() {
    return "边缘保护";
  }
}
exports.default = TsAnimNotifyStateSetWalkOff;
// # sourceMappingURL=TsAnimNotifyStateSetWalkOff.js.map
