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
  Constructor() {
    this.Handles = void 0;
  }
  K2_NotifyBegin(t, e, r) {
    var i = t
      .GetOwner()
      .GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    if (!(i instanceof CharRenderingComponent_1.default)) return !1;
    this.Handles || (this.Handles = new Map());
    i = i.AddMaterialControllerDataWithUserData(
      this.ControllerData,
      this.UserData,
    );
    return this.Handles.set(t, i), !0;
  }
  K2_NotifyEnd(t, e) {
    var r,
      i = t
        .GetOwner()
        .GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    return (
      i instanceof CharRenderingComponent_1.default &&
      !!this.Handles &&
      void 0 !== (r = this.Handles.get(t)) &&
      (this.Handles.delete(t), i.RemoveMaterialControllerData(r), !0)
    );
  }
}
exports.default = TsAnimNotifyStateAddMaterialController;
//# sourceMappingURL=TsAnimNotifyStateAddMaterialController.js.map
