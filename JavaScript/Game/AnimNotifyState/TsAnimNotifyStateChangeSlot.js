"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateChangeSlot extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.ComponentName = void 0),
      (this.SwitchToSlotName = void 0),
      (this.SlotTransform = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t
        .GetEntityNoBlueprint()
        ?.GetComponent(220)
        ?.SetSubMeshAttach(
          this.ComponentName,
          this.SwitchToSlotName,
          this.SlotTransform,
        ),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t
        .GetEntityNoBlueprint()
        ?.GetComponent(220)
        ?.ResetSubMeshAttach(this.ComponentName),
      !0)
    );
  }
  GetNotifyName() {
    return "切换组件到指定插槽";
  }
}
exports.default = TsAnimNotifyStateChangeSlot;
//# sourceMappingURL=TsAnimNotifyStateChangeSlot.js.map
