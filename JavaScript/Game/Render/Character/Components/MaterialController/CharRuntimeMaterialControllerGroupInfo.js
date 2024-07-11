"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialControlRuntimeDataGroup = void 0);
const MapUtils_1 = require("../../../../../Core/Utils/MapUtils"),
  RenderModuleController_1 = require("../../../Manager/RenderModuleController");
class CharMaterialControlRuntimeDataGroup {
  constructor() {
    (this.CharRenderingComponent = void 0),
      (this.DataGroup = void 0),
      (this.IsDead = !1),
      (this.DataMap = void 0),
      (this.xhr = void 0),
      (this.Plr = void 0),
      (this.xlr = void 0),
      (this.wlr = -0),
      (this.Blr = !1),
      (this.blr = !1);
  }
  Init(s, t) {
    (this.CharRenderingComponent = s),
      (this.DataGroup = t),
      (this.DataMap = new Map()),
      (this.xhr = []),
      (this.Plr = []),
      (this.xlr = []),
      (this.IsDead = !1),
      (this.wlr = 0),
      (this.Blr = !1),
      MapUtils_1.MapUtils.ForEach(this.DataGroup.DataMap, (t, i) => {
        this.wlr < i && (this.wlr = i),
          (this.Blr = this.Blr || 1 === t.DataType),
          0 < i
            ? this.DataMap.set(t, i)
            : this.Plr.push(s.AddMaterialControllerData(t));
      });
  }
  BeforeUpdateState(t, i) {
    this.blr || (this.blr = this.DataGroup.IgnoreTimeDilation);
    let s = t;
    if (
      this.blr ||
      !RenderModuleController_1.RenderModuleController.IsGamePaused
    ) {
      if (
        (this.blr || (s = t * i),
        (this.wlr -= s),
        this.DataMap.forEach((t, i) => {
          t -= s;
          t <= 0
            ? (this.Plr.push(
                this.CharRenderingComponent.AddMaterialControllerData(i),
              ),
              this.xhr.push(i))
            : this.DataMap.set(i, t);
        }),
        0 < this.xhr.length)
      )
        for (const h of this.xhr) this.DataMap.delete(h);
      this.xhr = [];
    }
  }
  AfterUpdateState(t) {
    if (!this.Blr && this.wlr <= 0) {
      this.xlr = [];
      for (let t = 0; t < this.Plr.length; t++)
        this.CharRenderingComponent.IsMaterialControllerDataValid(
          this.Plr[t],
        ) && this.xlr.push(this.Plr[t]);
      (this.Plr = this.xlr),
        (this.IsDead = 0 === this.Plr.length && 0 === this.DataMap.size);
    }
  }
  EndState() {
    (this.xhr = []),
      this.DataMap.clear(),
      this.Plr.forEach((t) => {
        this.CharRenderingComponent.RemoveMaterialControllerData(t);
      }),
      (this.IsDead = !0);
  }
  EndStateWithEnding() {
    (this.xhr = []),
      this.DataMap.clear(),
      this.Plr.forEach((t) => {
        this.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(t);
      }),
      (this.IsDead = !0);
  }
}
exports.CharMaterialControlRuntimeDataGroup =
  CharMaterialControlRuntimeDataGroup;
//# sourceMappingURL=CharRuntimeMaterialControllerGroupInfo.js.map
