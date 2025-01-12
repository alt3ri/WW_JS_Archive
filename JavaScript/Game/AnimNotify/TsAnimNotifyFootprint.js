"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyFootprint extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.IsLeftFoot = !1);
  }
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.GetEntityNoBlueprint()?.GetComponent(49)) &&
      (e.TriggerFootprint(this.IsLeftFoot), !0)
    );
  }
  GetNotifyName() {
    return "脚印特效";
  }
}
exports.default = TsAnimNotifyFootprint;
//# sourceMappingURL=TsAnimNotifyFootprint.js.map
