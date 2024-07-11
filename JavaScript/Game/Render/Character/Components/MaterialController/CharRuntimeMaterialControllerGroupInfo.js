"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialControlRuntimeDataGroup = void 0);
const MapUtils_1 = require("../../../../../Core/Utils/MapUtils");
const RenderModuleController_1 = require("../../../Manager/RenderModuleController");
class CharMaterialControlRuntimeDataGroup {
  constructor() {
    (this.CharRenderingComponent = void 0),
      (this.DataGroup = void 0),
      (this.IsDead = !1),
      (this.DataMap = void 0),
      (this.war = void 0),
      (this.Bhr = void 0),
      (this.bhr = void 0),
      (this.qhr = -0),
      (this.Ghr = !1),
      (this.Nhr = !1);
  }
  Init(s, t) {
    (this.CharRenderingComponent = s),
      (this.DataGroup = t),
      (this.DataMap = new Map()),
      (this.war = []),
      (this.Bhr = []),
      (this.bhr = []),
      (this.IsDead = !1),
      (this.qhr = 0),
      (this.Ghr = !1),
      MapUtils_1.MapUtils.ForEach(this.DataGroup.DataMap, (t, i) => {
        this.qhr < i && (this.qhr = i),
          (this.Ghr = this.Ghr || t.DataType === 1),
          i > 0
            ? this.DataMap.set(t, i)
            : this.Bhr.push(s.AddMaterialControllerData(t));
      });
  }
  BeforeUpdateState(t, i) {
    this.Nhr || (this.Nhr = this.DataGroup.IgnoreTimeDilation);
    let s = t;
    if (
      this.Nhr ||
      !RenderModuleController_1.RenderModuleController.IsGamePaused
    ) {
      if (
        (this.Nhr || (s = t * i),
        (this.qhr -= s),
        this.DataMap.forEach((t, i) => {
          t -= s;
          t <= 0
            ? (this.Bhr.push(
                this.CharRenderingComponent.AddMaterialControllerData(i),
              ),
              this.war.push(i))
            : this.DataMap.set(i, t);
        }),
        this.war.length > 0)
      )
        for (const h of this.war) this.DataMap.delete(h);
      this.war = [];
    }
  }
  AfterUpdateState(t) {
    if (!this.Ghr && this.qhr <= 0) {
      this.bhr = [];
      for (let t = 0; t < this.Bhr.length; t++)
        this.CharRenderingComponent.IsMaterialControllerDataValid(
          this.Bhr[t],
        ) && this.bhr.push(this.Bhr[t]);
      (this.Bhr = this.bhr),
        (this.IsDead = this.Bhr.length === 0 && this.DataMap.size === 0);
    }
  }
  EndState() {
    (this.war = []),
      this.DataMap.clear(),
      this.Bhr.forEach((t) => {
        this.CharRenderingComponent.RemoveMaterialControllerData(t);
      }),
      (this.IsDead = !0);
  }
  EndStateWithEnding() {
    (this.war = []),
      this.DataMap.clear(),
      this.Bhr.forEach((t) => {
        this.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(t);
      }),
      (this.IsDead = !0);
  }
}
exports.CharMaterialControlRuntimeDataGroup =
  CharMaterialControlRuntimeDataGroup;
// # sourceMappingURL=CharRuntimeMaterialControllerGroupInfo.js.map
