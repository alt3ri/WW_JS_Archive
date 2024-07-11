"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapScaleComponent = void 0);
const UE = require("ue"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WorldMapComponentBase_1 = require("./WorldMapComponentBase");
class WorldMapScaleComponent extends WorldMapComponentBase_1.WorldMapComponentBase {
  constructor(e) {
    super(e),
      (this.s3o = 0),
      (this.OnScaleSliderValueChanged = (e) => {
        this.SetMapScale(e, 3);
      }),
      (this.AddMapScale = (e, t) => {
        this.SetMapScale(this.MapScale + e, t);
      });
  }
  get MapScale() {
    return this.s3o;
  }
  OnBegin() {
    this.SetMapScale(ModelManager_1.ModelManager.WorldMapModel.MapScale, 0);
  }
  SetMapScale(e, t, n = !0) {
    var o = this.s3o,
      e = MathCommon_1.MathCommon.Clamp(
        e,
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        ModelManager_1.ModelManager.WorldMapModel.MapScaleMax,
      );
    (this.s3o = e),
      (ModelManager_1.ModelManager.WorldMapModel.MapScale = e),
      this.Map.SetMapScale(e),
      this.Map.SelfPlayerNode.SetRelativeScale3D(
        new UE.Vector(1 / e, 1 / e, 1 / e),
      ),
      n &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldMapScaleChanged,
          o,
          e,
          t,
        );
  }
}
exports.WorldMapScaleComponent = WorldMapScaleComponent;
//# sourceMappingURL=WorldMapScaleComponent.js.map
