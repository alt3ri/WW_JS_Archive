"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
class TsAnimNotifyAddCharRendering extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.RenderType = 7);
  }
  Received_Notify(e, t) {
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
exports.default = TsAnimNotifyAddCharRendering;
// # sourceMappingURL=TsAnimNotifyAddCharRendering.js.map
