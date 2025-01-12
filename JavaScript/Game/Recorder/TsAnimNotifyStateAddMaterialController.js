"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CharRenderingComponent_1 = require("../Render/Character/Manager/CharRenderingComponent");
class TsAnimNotifyStateAddMaterialController extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.ControllerData = void 0),
      (this.UserData = void 0),
      (this.Handles = void 0);
  }
  K2_NotifyBegin(e, t, r) {
    var n = e
      .GetOwner()
      .GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    if (!(n instanceof CharRenderingComponent_1.default)) return !1;
    this.Handles || (this.Handles = new Map());
    n = n.AddMaterialControllerDataWithUserData(
      this.ControllerData,
      this.UserData,
    );
    return this.Handles.set(e, n), !0;
  }
  K2_NotifyEnd(e, t) {
    var r,
      n = e
        .GetOwner()
        .GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    return (
      n instanceof CharRenderingComponent_1.default &&
      !!this.Handles &&
      void 0 !== (r = this.Handles.get(e)) &&
      (this.Handles.delete(e), n.RemoveMaterialControllerData(r), !0)
    );
  }
}
exports.default = TsAnimNotifyStateAddMaterialController;
//# sourceMappingURL=TsAnimNotifyStateAddMaterialController.js.map
