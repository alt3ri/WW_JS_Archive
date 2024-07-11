"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const ScreenEffectSystem_1 = require("../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
class TsAnimNotifyCameraEffect extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.EffectData = void 0);
  }
  K2_Notify(e, t) {
    return (
      this.EffectData &&
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
          this.EffectData,
        ),
      !0
    );
  }
  GetNotifyName() {
    return "镜头特效";
  }
}
exports.default = TsAnimNotifyCameraEffect;
// # sourceMappingURL=TsAnimNotifyCameraEffect.js.map
