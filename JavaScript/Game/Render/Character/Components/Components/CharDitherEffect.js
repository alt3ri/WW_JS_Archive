"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharDitherEffect = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharDitherEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.CharNpcDither = void 0),
      (this.MaterialContainer = void 0),
      (this.mhr = -0),
      (this.dhr = -0),
      (this.Chr = -0),
      (this.fhr = 0),
      (this.phr = -0),
      (this.vhr = !1),
      (this.Mhr = void 0);
  }
  Start() {
    this.Ehr()
      ? ((this.CharNpcDither = this.RenderComponent.GetComponent(
          RenderConfig_1.RenderConfig.IdNpcDitherEffect,
        )),
        this.CharNpcDither ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              12,
              "NPC类型没有添加组件 npc dither effect",
            )))
      : ((this.MaterialContainer = this.RenderComponent.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainer,
        )),
        this.MaterialContainer ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              12,
              "非NPC类型没有添加组件 material container",
            ))),
      (this.phr = 1),
      (this.mhr = 0),
      (this.dhr = -0.2),
      (this.Chr = 1),
      (this.fhr = 0),
      (this.vhr = !1),
      (this.Mhr = new Map()),
      this.OnInitSuccess();
  }
  ResetDitherEffect() {
    this.Shr(1), (this.fhr = 0), (this.vhr = !1), this.Mhr.clear();
  }
  UpdateNpcDitherComponent() {
    this.Ehr() &&
      this.CharNpcDither &&
      this.CharNpcDither.UpdateSkeletalComponents(
        this.RenderComponent.GetCachedOwner(),
      );
  }
  SetDitherEffect(i, s) {
    if (i !== this.phr) {
      let t = i < 0 || 1 <= i ? !0 : !1;
      if (t) {
        this.Mhr.has(s) && this.Mhr.set(s, !1);
        let e = !1,
          h = 0;
        this.Mhr.forEach((t, i) => {
          (e = e || t), t && h < i && (h = i);
        }),
          (this.fhr = h),
          !e && this.vhr && this.RemoveDitherEffect();
      } else
        this.Mhr.set(s, !0),
          (this.fhr === s || this.fhr < s) &&
            ((this.fhr = s), this.vhr || this.yhr(), this.Shr(i));
    }
  }
  RemoveDitherEffect() {
    this.Ihr(), this.Shr(1), (this.vhr = !1);
  }
  yhr() {
    this.Thr(), (this.vhr = !0);
  }
  Update() {}
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdDitherEffect;
  }
  GetDitherRate() {
    return this.mhr;
  }
  Shr(t) {
    (this.mhr = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, this.dhr, this.Chr)),
      Math.abs(this.phr - t) < 1e-6 || (this.Lhr(this.mhr), (this.phr = t));
  }
  Thr() {
    this.Ehr()
      ? this.CharNpcDither?.EnableNpcDitherEffect()
      : (this.MaterialContainer.UseAlphaTestCommon(),
        this.MaterialContainer.SetFloat(
          RenderConfig_1.RenderConfig.UseDitherEffect,
          1,
          0,
          -1,
          0,
        ));
  }
  Lhr(t) {
    this.Ehr()
      ? this.CharNpcDither?.SetNpcDitherEffect(t)
      : this.MaterialContainer.SetFloat(
          RenderConfig_1.RenderConfig.DitherValue,
          t,
          0,
          -1,
          0,
        );
  }
  Ihr() {
    this.Ehr()
      ? this.CharNpcDither?.RemoveNpcDitherEffect()
      : (this.MaterialContainer.RevertAlphaTestCommon(),
        this.MaterialContainer.SetFloat(
          RenderConfig_1.RenderConfig.UseDitherEffect,
          0,
          0,
          -1,
          0,
        ));
  }
  Ehr() {
    return !!this.RenderComponent && 3 === this.RenderComponent.GetRenderType();
  }
  GetStatName() {
    return "CharDitherEffect";
  }
}
exports.CharDitherEffect = CharDitherEffect;
//# sourceMappingURL=CharDitherEffect.js.map
