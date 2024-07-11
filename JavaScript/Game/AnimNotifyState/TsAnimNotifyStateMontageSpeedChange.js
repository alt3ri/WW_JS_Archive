"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsAnimNotifyStateMontageSpeedChange extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.MontagePlayRate = -0);
  }
  K2_NotifyBegin(e, t, o) {
    return (
      e.GetAnimInstance()?.Montage_SetPlayRate(void 0, this.MontagePlayRate), !0
    );
  }
  K2_NotifyEnd(e, t) {
    return e.GetAnimInstance()?.Montage_SetPlayRate(void 0, 1), !0;
  }
  GetNotifyName() {
    return "配置蒙太奇播放速度变化";
  }
}
exports.default = TsAnimNotifyStateMontageSpeedChange;
// # sourceMappingURL=TsAnimNotifyStateMontageSpeedChange.js.map
