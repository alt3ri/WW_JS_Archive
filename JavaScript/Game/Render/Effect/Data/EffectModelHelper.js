"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelHelper = exports.EffectTemp = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
class EffectTemp {
  static Initialize() {}
  static StartStat() {}
  static StopStat() {}
}
((exports.EffectTemp = EffectTemp).FloatRef = (0, puerts_1.$ref)(0)),
  (EffectTemp.FloatXRef = (0, puerts_1.$ref)(0)),
  (EffectTemp.FloatYRef = (0, puerts_1.$ref)(0)),
  (EffectTemp.FloatZRef = (0, puerts_1.$ref)(0)),
  (EffectTemp.VectorRef = (0, puerts_1.$ref)(new UE.Vector())),
  (EffectTemp.Vector2dRef = (0, puerts_1.$ref)(new UE.Vector2D())),
  (EffectTemp.ColorRef = (0, puerts_1.$ref)(new UE.LinearColor())),
  (EffectTemp.Transform = new UE.Transform()),
  (EffectTemp.TsVector = Vector_1.Vector.Create(0, 0, 0)),
  (EffectTemp.Rotator = new UE.Rotator());
class EffectModelHelper {
  static VectorToRotator(e, t) {
    (t.Pitch = e.Y), (t.Yaw = e.Z), (t.Roll = e.X);
  }
  static AddSceneComponent(t, r, o, c, f = !1, p) {
    if (t && r) {
      let e = void 0;
      return (
        (e = c
          ? UE.KuroEffectLibrary.AddSceneComponentWithTransform(t, r, o, f, c)
          : UE.KuroEffectLibrary.AddSceneComponent(t, r, o, f)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              26,
              "特效试图生成在不属于任何世界的actor上",
              ["Actor", t],
              ["ComponentClass", r],
              ["EffectDataPath", p ? p.GetName() : "unknown"],
            )),
        e
      );
    }
  }
}
exports.EffectModelHelper = EffectModelHelper;
//# sourceMappingURL=EffectModelHelper.js.map
