"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsAnimNotifyStateSkeletalMeshAnimPlay extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Tag = void 0), (this.动画资产 = void 0);
  }
  K2_NotifyBegin(t, e, s) {
    var t = t
      .GetOwner()
      .GetComponentsByTag(UE.SkeletalMeshComponent.StaticClass(), this.Tag);
    return (
      t.Num() !== 0 &&
      !!(t = t.Get(0))?.IsValid() &&
      (t.SetHiddenInGame(!1, !1), t.PlayAnimation(this.动画资产, !1), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    var t = t
      .GetOwner()
      .GetComponentsByTag(UE.SkeletalMeshComponent.StaticClass(), this.Tag);
    return (
      t.Num() !== 0 &&
      !!(t = t.Get(0))?.IsValid() &&
      (t.SetHiddenInGame(!0, !1), t.Stop(), !0)
    );
  }
  GetNotifyName() {
    return "临时播放特定Mesh的动画";
  }
}
exports.default = TsAnimNotifyStateSkeletalMeshAnimPlay;
// # sourceMappingURL=TsAnimNotifyStateSkeletalMeshAnimPlay.js.map
