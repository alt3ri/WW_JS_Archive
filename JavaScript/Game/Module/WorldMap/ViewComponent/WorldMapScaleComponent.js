"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapScaleComponent = void 0);
const UE = require("ue"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapScaleComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.yKa = void 0),
      (this.EKa = void 0),
      (this.OnScaleSliderValueChanged = (e) => {
        this.SetMapScale(e, 3, !0, !1);
      }),
      (this.AddMapScale = (e, t) => {
        this.SetMapScale(this.MapScale + e, t);
      });
  }
  get ComponentType() {
    return 4;
  }
  get MapScale() {
    return this.PropertyMap.tryGet(0, 0, !1);
  }
  set MapScale(e) {
    this.PropertyMap.set(0, e);
  }
  get IsScaleDirty() {
    return this.PropertyMap.isDirty(0);
  }
  FlushScaleDirty() {
    this.PropertyMap.flushDirty(0);
  }
  get MKa() {
    var e = this.Parent;
    if (void 0 !== e) return e;
    this.LogError(64, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get ScaleChangeEvent() {
    return this.yKa;
  }
  set ScaleChangeEvent(e) {
    this.yKa = e;
  }
  get ScaleSlider() {
    return this.EKa;
  }
  set ScaleSlider(e) {
    this.EKa = e;
  }
  Initialize() {
    this.ScaleSlider.OnValueChangeCb.Unbind(),
      this.ScaleSlider.OnValueChangeCb.Bind(this.OnScaleSliderValueChanged),
      this.SetMapScale(ModelManager_1.ModelManager.WorldMapModel.MapScale, 0),
      this.ScaleSlider.SetMinValue(
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        !1,
        !1,
      ),
      this.ScaleSlider.SetMaxValue(
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMax,
        !1,
        !1,
      ),
      this.ScaleSlider.SetValue(this.MapScale, !1);
  }
  SetMapScale(e, t, a = !0, i = !0) {
    var s = this.MapScale,
      e = MathCommon_1.MathCommon.Clamp(
        e,
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMax,
      ),
      r =
        ((this.MapScale = e),
        (ModelManager_1.ModelManager.WorldMapModel.MapScale = e),
        this.MKa.Map);
    r.SetMapScale(e),
      r.SelfPlayerNode.SetRelativeScale3D(new UE.Vector(1 / e, 1 / e, 1 / e)),
      i && this.ScaleSlider.SetValue(e, !1),
      a && this.ScaleChangeEvent?.(s, e, t);
  }
}
exports.WorldMapScaleComponent = WorldMapScaleComponent;
//# sourceMappingURL=WorldMapScaleComponent.js.map
