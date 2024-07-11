"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharNpcDitherEffect = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharNpcDitherEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.gU = !1),
      (this.Rar = new Array()),
      (this.Tfi = !0),
      (this.k$o = -0);
  }
  Start() {
    this.OnInitSuccess();
  }
  EnableNpcDitherEffect() {
    this.gU &&
      this.Rar.forEach((r) => {
        ObjectUtils_1.ObjectUtils.IsValid(r) && r.SetUseCustomAlphaTest(!0);
        const i = r.GetMaterials();
        for (let t = 0, e = i.Num(); t < e; t++) {
          let e = void 0;
          const s = i.Get(t);
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
      this.Rar.forEach((e) => {
        ObjectUtils_1.ObjectUtils.IsValid(e) && e.SetUseCustomAlphaTest(!1);
        const r = e.GetMaterials();
        for (let e = 0, t = r.Num(); e < t; e++) {
          const i = r.Get(e);
          i instanceof UE.MaterialInstanceDynamic &&
            i.SetScalarParameterValue(
              RenderConfig_1.RenderConfig.UseDitherEffect,
              0,
            );
        }
      });
  }
  SetNpcDitherEffect(t) {
    if (this.gU && this.Rar.length !== 0) {
      const r = MathUtils_1.MathUtils.Clamp(t, 0, 1);
      let e = !1;
      this.Tfi ? ((this.Tfi = !1), (e = !0)) : this.k$o !== r && (e = !0),
        e &&
          ((this.k$o = t),
          this.Rar.forEach((r) => {
            const i = r.GetMaterials();
            for (let t = 0, e = i.Num(); t < e; t++) {
              let e = void 0;
              const s = i.Get(t);
              s &&
                (s instanceof UE.MaterialInstanceDynamic
                  ? (e = s)
                  : ((e = r.CreateDynamicMaterialInstance(t, i.Get(t))),
                    r.SetMaterial(t, e)),
                e.SetScalarParameterValue(
                  RenderConfig_1.RenderConfig.DitherValue,
                  this.k$o,
                ));
            }
          }));
    }
  }
  UpdateSkeletalComponents(e) {
    if ((this.gU || this.Uar(), e && ObjectUtils_1.ObjectUtils.IsValid(e))) {
      const t = e.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      );
      this.Rar.length = 0;
      for (let e = t.Num() - 1; e >= 0; --e) {
        const r = t.Get(e);
        if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
          const i = r.SkeletalMesh;
          if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
            const s = r.GetMaterials();
            for (let e = 0, t = s.Num(); e < t; e++) {
              const a = r.CreateDynamicMaterialInstance(e, s.Get(e));
              r.SetMaterial(e, a);
            }
            this.Rar.push(r);
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
  Uar() {
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
// # sourceMappingURL=CharNpcDitherEffect.js.map
