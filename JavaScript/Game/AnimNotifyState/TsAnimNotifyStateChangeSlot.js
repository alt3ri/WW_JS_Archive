"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateChangeSlot extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.ComponentName = void 0),
      (this.SwitchToSlotName = void 0),
      (this.SlotTransform = void 0),
      (this.AttachSocketName = void 0),
      (this.TempSkeletalMeshComponent = void 0);
  }
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var i = t.CharacterActorComponent;
    if (!i) return !1;
    var r = i.SkeletalMesh?.GetNumChildrenComponents();
    for (let t = 0; t < r; t++) {
      var a = i.SkeletalMesh?.GetChildComponent(t);
      if (
        a &&
        a.GetName() === this.ComponentName &&
        a instanceof UE.SkeletalMeshComponent
      ) {
        (this.TempSkeletalMeshComponent = a),
          (this.AttachSocketName = a.GetAttachSocketName()),
          a.K2_AttachToComponent(
            i.SkeletalMesh,
            this.SwitchToSlotName,
            0,
            0,
            0,
            !0,
          ),
          this.SlotTransform &&
            a.K2_SetRelativeTransform(this.SlotTransform, !1, void 0, !0);
        break;
      }
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.CharacterActorComponent) &&
      (this.AttachSocketName &&
        this.TempSkeletalMeshComponent &&
        this.TempSkeletalMeshComponent.K2_AttachToComponent(
          t.SkeletalMesh,
          this.AttachSocketName,
          0,
          0,
          0,
          !0,
        ),
      !0)
    );
  }
  GetNotifyName() {
    return "切换组件到指定插槽";
  }
}
exports.default = TsAnimNotifyStateChangeSlot;
//# sourceMappingURL=TsAnimNotifyStateChangeSlot.js.map
