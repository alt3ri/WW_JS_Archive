"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsAnimNotifyStateStopRotateBoneToLocation extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(t, e, o) {
    t = t.GetAnimInstance();
    return (
      t instanceof UE.KuroAnimInstance &&
        t.SetBoneRotateToLocationInfoStopBegin(),
      !0
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetAnimInstance();
    return (
      t instanceof UE.KuroAnimInstance &&
        t.SetBoneRotateToLocationInfoStopEnd(),
      !0
    );
  }
  GetNotifyName() {
    return "停止将骨骼旋转至目标位置";
  }
}
exports.default = TsAnimNotifyStateStopRotateBoneToLocation;
// # sourceMappingURL=TsAnimNotifyStateStopRotateBoneToLocation.js.map
