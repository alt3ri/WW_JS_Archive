"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharDitherEffect = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharDitherEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.CharNpcDither = void 0),
      (this.MaterialContainer = void 0),
      (this.mar = -0),
      (this.dar = -0),
      (this.gar = -0),
      (this.par = 0),
      (this.var = -0),
      (this.Mar = !1),
      (this.Sar = void 0);
  }
  Start() {
    this.Ear()
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
      (this.var = 1),
      (this.mar = 0),
      (this.dar = -0.2),
      (this.gar = 1),
      (this.par = 0),
      (this.Mar = !1),
      (this.Sar = new Map()),
      this.OnInitSuccess();
  }
  ResetDitherEffect() {
    this.yar(1), (this.par = 0), (this.Mar = !1), this.Sar.clear();
  }
  UpdateNpcDitherComponent() {
    this.Ear() &&
      this.CharNpcDither &&
      this.CharNpcDither.UpdateSkeletalComponents(
        this.RenderComponent.GetCachedOwner(),
      );
  }
  SetDitherEffect(i, s) {
    if (i !== this.var) {
      const t = i < 0 || i >= 1 ? !0 : !1;
      if (t) {
        this.Sar.has(s) && this.Sar.set(s, !1);
        let e = !1;
        let h = 0;
        this.Sar.forEach((t, i) => {
          (e = e || t), t && h < i && (h = i);
        }),
          (this.par = h),
          !e && this.Mar && this.RemoveDitherEffect();
      } else
        this.Sar.set(s, !0),
          (this.par === s || this.par < s) &&
            ((this.par = s), this.Mar || this.Iar(), this.yar(i));
    }
  }
  RemoveDitherEffect() {
    this.Tar(), this.yar(1), (this.Mar = !1);
  }
  Iar() {
    this.Lar(), (this.Mar = !0);
  }
  Update() {}
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdDitherEffect;
  }
  yar(t) {
    (this.mar = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, this.dar, this.gar)),
      Math.abs(this.var - t) < 1e-6 || (this.Dar(this.mar), (this.var = t));
  }
  Lar() {
    this.Ear()
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
  Dar(t) {
    this.Ear()
      ? this.CharNpcDither?.SetNpcDitherEffect(t)
      : this.MaterialContainer.SetFloat(
          RenderConfig_1.RenderConfig.DitherValue,
          t,
          0,
          -1,
          0,
        );
  }
  Tar() {
    this.Ear()
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
  Ear() {
    return !!this.RenderComponent && this.RenderComponent.GetRenderType() === 3;
  }
  GetStatName() {
    return "CharDitherEffect";
  }
}
exports.CharDitherEffect = CharDitherEffect;
// # sourceMappingURL=CharDitherEffect.js.map
