"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyFootprint extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.IsLeftFoot = !1);
  }
  Constructor() {}
  K2_Notify(t, e) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.GetEntityNoBlueprint()?.GetComponent(56)) &&
      (t.TriggerFootprint(this.IsLeftFoot), !0)
    );
  }
  GetNotifyName() {
    return "脚印特效";
  }
}
exports.default = TsAnimNotifyFootprint;
//# sourceMappingURL=TsAnimNotifyFootprint.js.map
