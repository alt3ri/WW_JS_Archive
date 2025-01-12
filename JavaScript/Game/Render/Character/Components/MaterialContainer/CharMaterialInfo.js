"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialSlot = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  STAR_SCAR_SLOT_NAME = "MI_Star",
  ORIGINAL_INDEX = 0,
  CACHE_INDEX = 1,
  TARGET_INDEX = 2;
class ColorTempContainer {
  constructor() {
    (this.ColorR = -0),
      (this.ColorG = -0),
      (this.ColorB = -0),
      (this.ColorA = -0);
  }
}
class CharMaterialSlot {
  constructor() {
    (this.DynamicMaterial = void 0),
      (this.FloatParamMap = void 0),
      (this.VectorParamMap = void 0),
      (this.TextureParamMap = void 0),
      (this.ReplaceMaterialArray = void 0),
      (this.SlotName = ""),
      (this.MaterialIndex = 0),
      (this.SectionIndex = 0),
      (this.IsStarScar = !1),
      (this.MaterialPartType = 0),
      (this.SlotType = 0),
      (this.MaterialDirty = !1),
      (this.Llr = !1),
      (this.Dlr = !1),
      (this.Rlr = !1);
  }
  Init(t, i, s) {
    (this.SlotName = i),
      (this.MaterialIndex = t),
      (this.SectionIndex = RenderConfig_1.INVALID_SECTION_INDEX),
      (this.Llr = !1),
      (this.Dlr = !1),
      (this.Rlr = !1),
      (this.IsStarScar = i === STAR_SCAR_SLOT_NAME),
      (this.SlotType = RenderConfig_1.RenderConfig.GetMaterialSlotType(i)),
      (this.MaterialPartType =
        RenderConfig_1.RenderConfig.GetMaterialPartType(i)),
      this.SetDynamicMaterial(s),
      (this.ReplaceMaterialArray = new Array());
  }
  SetDynamicMaterial(t) {
    (this.DynamicMaterial = t),
      (this.FloatParamMap = new Map()),
      (this.VectorParamMap = new Map()),
      (this.TextureParamMap = new Map()),
      (this.MaterialDirty = !0);
  }
  SetSkeletalMeshMaterial(t) {
    var i;
    this.MaterialDirty &&
      ((this.MaterialDirty = !1),
      0 < (i = this.ReplaceMaterialArray.length)
        ? t.SetMaterial(this.MaterialIndex, this.ReplaceMaterialArray[i - 1])
        : t.SetMaterial(this.MaterialIndex, this.DynamicMaterial));
  }
  UpdateMaterialParam() {
    if (this.IsDynamicMaterialValid()) {
      var t = this.DynamicMaterial;
      if (this.Llr) {
        this.Llr = !1;
        for (const E of this.FloatParamMap.keys()) {
          var i,
            s = this.FloatParamMap.get(E);
          s[CACHE_INDEX] !== s[TARGET_INDEX] &&
            ((s[CACHE_INDEX] = s[TARGET_INDEX]),
            (i = FNameUtil_1.FNameUtil.GetDynamicFName(E)),
            t.SetScalarParameterValue(i, s[TARGET_INDEX]));
        }
      }
      if (this.Dlr) {
        this.Dlr = !1;
        for (const o of this.VectorParamMap.keys()) {
          var h,
            e = this.VectorParamMap.get(o);
          e[CACHE_INDEX] !== e[TARGET_INDEX] &&
            ((e[CACHE_INDEX] = e[TARGET_INDEX]),
            (e = new UE.LinearColor(
              e[TARGET_INDEX].ColorR,
              e[TARGET_INDEX].ColorG,
              e[TARGET_INDEX].ColorB,
              e[TARGET_INDEX].ColorA,
            )),
            (h = FNameUtil_1.FNameUtil.GetDynamicFName(o)),
            t.SetVectorParameterValue(h, e));
        }
      }
      if (this.Rlr) {
        this.Rlr = !1;
        for (const _ of this.TextureParamMap.keys()) {
          var r = this.TextureParamMap.get(_),
            a = r[TARGET_INDEX];
          void 0 !== a &&
            r[CACHE_INDEX] !== a &&
            ((r[CACHE_INDEX] = a),
            (r = FNameUtil_1.FNameUtil.GetDynamicFName(_)),
            t.SetTextureParameterValue(r, a));
        }
      }
    }
  }
  SetReplaceMaterial(t) {
    this.ReplaceMaterialArray.push(t), (this.MaterialDirty = !0);
  }
  RevertReplaceMaterial(i) {
    var s = new Array();
    let h = !1;
    for (let t = 0; t < this.ReplaceMaterialArray.length; t++)
      this.ReplaceMaterialArray[t] !== i
        ? s.push(this.ReplaceMaterialArray[t])
        : (h = !0);
    return (this.ReplaceMaterialArray = s), (this.MaterialDirty = !0), h;
  }
  SetFloat(t, i) {
    var s;
    this.IsDynamicMaterialValid() &&
      ((s = t.toString()),
      (this.Llr = !0),
      this.FloatParamMap.has(s)
        ? (this.FloatParamMap.get(s)[TARGET_INDEX] = i)
        : this.FloatParamMap.set(s, [
            this.DynamicMaterial.K2_GetScalarParameterValue(t),
            i + 1,
            i,
          ]));
  }
  RevertFloat(t) {
    this.IsDynamicMaterialValid() &&
      this.FloatParamMap.has(t) &&
      ((this.Llr = !0),
      ((t = this.FloatParamMap.get(t))[TARGET_INDEX] = t[ORIGINAL_INDEX]));
  }
  SetColor(t, i) {
    var s, h;
    this.IsDynamicMaterialValid() &&
      ((s = t.toString()),
      (this.Dlr = !0),
      ((h = new ColorTempContainer()).ColorR = i.R),
      (h.ColorG = i.G),
      (h.ColorB = i.B),
      (h.ColorA = i.A),
      this.VectorParamMap.has(s)
        ? (this.VectorParamMap.get(s)[TARGET_INDEX] = h)
        : ((i = this.DynamicMaterial.K2_GetVectorParameterValue(t)),
          ((t = new ColorTempContainer()).ColorR = i.R),
          (t.ColorG = i.G),
          (t.ColorB = i.B),
          (t.ColorA = i.A),
          this.VectorParamMap.set(s, [t, void 0, h])));
  }
  RevertColor(t) {
    this.IsDynamicMaterialValid() &&
      this.VectorParamMap.has(t) &&
      ((this.Dlr = !0),
      ((t = this.VectorParamMap.get(t))[TARGET_INDEX] = t[ORIGINAL_INDEX]));
  }
  SetTexture(t, i) {
    var s;
    this.IsDynamicMaterialValid() &&
      ((s = t.toString()),
      (this.Rlr = !0),
      this.TextureParamMap.has(s)
        ? (this.TextureParamMap.get(s)[TARGET_INDEX] = i)
        : this.TextureParamMap.set(s, [
            this.DynamicMaterial.K2_GetTextureParameterValue(t),
            void 0,
            i,
          ]));
  }
  RevertTexture(t) {
    this.IsDynamicMaterialValid() &&
      this.TextureParamMap.has(t) &&
      ((this.Rlr = !0),
      ((t = this.TextureParamMap.get(t))[TARGET_INDEX] = t[ORIGINAL_INDEX]));
  }
  RevertProperty(t) {
    this.IsDynamicMaterialValid() &&
      ((t = t.toString()),
      this.RevertColor(t),
      this.RevertFloat(t),
      this.RevertTexture(t));
  }
  SetStarScarEnergy(t) {
    this.IsDynamicMaterialValid() &&
      this.IsStarScar &&
      this.SetFloat(RenderConfig_1.RenderConfig.StarScarEnergyControl, t);
  }
  IsDynamicMaterialValid() {
    return void 0 !== this.DynamicMaterial && this.DynamicMaterial.IsValid();
  }
}
exports.CharMaterialSlot = CharMaterialSlot;
//# sourceMappingURL=CharMaterialInfo.js.map
