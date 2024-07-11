"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil");
class TsAnimNotifyStateAddCharRendering extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.RenderType = 7);
  }
  K2_NotifyBegin(e, t, i) {
    e = e.GetOwner();
    return (
      e instanceof UE.KuroRecordCharacter &&
      (e
        .AddComponentByClass(
          UE.CharRenderingComponent_C.StaticClass(),
          !1,
          e.GetTransform(),
          !1,
          FNameUtil_1.FNameUtil.GetDynamicFName("CharRenderingComponent"),
        )
        .Init(this.RenderType),
      !0)
    );
  }
}
exports.default = TsAnimNotifyStateAddCharRendering;
//# sourceMappingURL=TsAnimNotifyStateAddCharRendering.js.map
