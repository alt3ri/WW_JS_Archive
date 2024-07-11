"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateAicAnimEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.bCallBegin = !1),
      (this.bCallEnd = !1),
      (this.Name = void 0);
  }
  K2_NotifyBegin(t, e, s) {
    var t = t.GetOwner();
    return (
      this.bCallBegin &&
        t instanceof TsBaseCharacter_1.default &&
        (t = t.GetController()) instanceof UE.AIC_AICommon_C &&
        t.AicTriggerEvent(this.Name),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return (
      this.bCallEnd &&
        t instanceof TsBaseCharacter_1.default &&
        (t = t.GetController()) instanceof UE.AIC_AICommon_C &&
        t.AicTriggerEvent(this.Name),
      !0
    );
  }
  GetNotifyName() {
    return "AIC动画通知事件";
  }
}
exports.default = TsAnimNotifyStateAicAnimEvent;
//# sourceMappingURL=TsAnimNotifyStateAicAnimEvent.js.map
