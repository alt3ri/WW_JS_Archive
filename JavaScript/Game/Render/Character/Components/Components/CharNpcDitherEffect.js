"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharNpcDitherEffect = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharNpcDitherEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.gU = !1),
      (this.Dhr = new Array()),
      (this.Lpi = !0),
      (this.GYo = -0);
  }
  Start() {
    this.OnInitSuccess();
  }
  EnableNpcDitherEffect() {
    this.gU &&
      this.Dhr.forEach((r) => {
        ObjectUtils_1.ObjectUtils.IsValid(r) && r.SetUseCustomAlphaTest(!0);
        var i = r.GetMaterials();
        for (let t = 0, e = i.Num(); t < e; t++) {
          let e = void 0;
          var s = i.Get(t);
          s &&
            (s instanceof UE.MaterialInstanceDynamic
              ? (e = s)
              : ((e = r.CreateDynamicMaterialInstance(t, i.Get(t))),
                r.SetMaterial(t, e)),
            e.SetScalarParameterValue(
              RenderConfig_1.RenderConfig.UseDitherEffect,
              1,
            ));
        }
      });
  }
  RemoveNpcDitherEffect() {
    this.gU &&
      this.Dhr.forEach((e) => {
        ObjectUtils_1.ObjectUtils.IsValid(e) && e.SetUseCustomAlphaTest(!1);
        var r = e.GetMaterials();
        for (let e = 0, t = r.Num(); e < t; e++) {
          var i = r.Get(e);
          i instanceof UE.MaterialInstanceDynamic &&
            i.SetScalarParameterValue(
              RenderConfig_1.RenderConfig.UseDitherEffect,
              0,
            );
        }
      });
  }
  SetNpcDitherEffect(t) {
    if (this.gU && 0 !== this.Dhr.length) {
      var r = MathUtils_1.MathUtils.Clamp(t, 0, 1);
      let e = !1;
      this.Lpi ? ((this.Lpi = !1), (e = !0)) : this.GYo !== r && (e = !0),
        e &&
          ((this.GYo = t),
          this.Dhr.forEach((r) => {
            var i = r.GetMaterials();
            for (let t = 0, e = i.Num(); t < e; t++) {
              let e = void 0;
              var s = i.Get(t);
              s &&
                (s instanceof UE.MaterialInstanceDynamic
                  ? (e = s)
                  : ((e = r.CreateDynamicMaterialInstance(t, i.Get(t))),
                    r.SetMaterial(t, e)),
                e.SetScalarParameterValue(
                  RenderConfig_1.RenderConfig.DitherValue,
                  this.GYo,
                ));
            }
          }));
    }
  }
  UpdateSkeletalComponents(e) {
    if ((this.gU || this.Rhr(), e && ObjectUtils_1.ObjectUtils.IsValid(e))) {
      var t = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      this.Dhr.length = 0;
      for (let e = t.Num() - 1; 0 <= e; --e) {
        var r = t.Get(e);
        if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
          var i = r.SkeletalMesh;
          if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
            var s = r.GetMaterials();
            for (let e = 0, t = s.Num(); e < t; e++) {
              var a = r.CreateDynamicMaterialInstance(e, s.Get(e));
              r.SetMaterial(e, a);
            }
            this.Dhr.push(r);
          }
        }
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          12,
          "NPC Rendering传入了一个无效的actor",
        );
  }
  Rhr() {
    this.gU
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 12, "重复调用NPC dither初始化方法:")
      : (this.gU = !0);
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdNpcDitherEffect;
  }
  GetStatName() {
    return "CharNpcDitherEffect";
  }
}
exports.CharNpcDitherEffect = CharNpcDitherEffect;
//# sourceMappingURL=CharNpcDitherEffect.js.map
