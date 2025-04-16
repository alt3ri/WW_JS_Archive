"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InviteNewbieProtocolContext = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ActivityData_1 = require("../../../ActivityData");
class InviteNewbieProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor(e) {
    super(),
      (this.FI1 = void 0),
      (this.Score = 0),
      (this.i5l = void 0),
      (this.i5l = e);
  }
  get InviteCode() {
    return this.FI1;
  }
  set InviteCode(e) {
    (this.FI1 = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.InviteNewbieInviteCodeChanged,
        e,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InviteNewbie", 64, "邀请码变更", ["InviteCode", e]);
  }
  Dispose() {}
  PhraseEx(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InviteNewbie", 64, "解析邀请新人活动数据", [
        "ActivityData",
        e,
      ]);
    e = e.$wc;
    void 0 !== e && ((this.InviteCode = e.Wwc), (this.Score = e.SMs));
  }
  GetExDataRedPointShowState() {
    return this.i5l.HasRedDot;
  }
}
exports.InviteNewbieProtocolContext = InviteNewbieProtocolContext;
//# sourceMappingURL=InviteNewbieProtocolContext.js.map
