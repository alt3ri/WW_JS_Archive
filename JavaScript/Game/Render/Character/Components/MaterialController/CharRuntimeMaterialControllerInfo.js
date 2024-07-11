"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialControlRuntimeData =
    exports.CharMaterialControlDataCache =
    exports.CharMaterialControlTextureGroup =
    exports.CharMaterialControlColorGroup =
    exports.CharMaterialControlFloatGroup =
    exports.InterpolateFactor =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../GlobalData"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig"),
  RenderModuleController_1 = require("../../../Manager/RenderModuleController"),
  RenderUtil_1 = require("../../../Utils/RenderUtil");
class InterpolateFactor {
  constructor() {
    (this.M6o = 0), (this.Factor = 0);
  }
  get Type() {
    return this.M6o;
  }
  set Type(i) {
    this.M6o !== i && (this.M6o = i);
  }
}
exports.InterpolateFactor = InterpolateFactor;
class CharMaterialControlFloatGroup {
  constructor(i, t, h) {
    (this.End = void 0),
      (this.Loop = void 0),
      (this.Start = void 0),
      (this.EndConstant = void 0),
      (this.LoopConstant = void 0),
      (this.StartConstant = void 0) === i || i.bUseCurve
        ? (this.End = i)
        : (this.EndConstant = i.Constant),
      void 0 === t || t.bUseCurve
        ? (this.Loop = t)
        : (this.LoopConstant = t.Constant),
      void 0 === h || h.bUseCurve
        ? (this.Start = h)
        : (this.StartConstant = h.Constant);
  }
}
exports.CharMaterialControlFloatGroup = CharMaterialControlFloatGroup;
class CharMaterialControlColorGroup {
  constructor(i, t, h) {
    (this.End = void 0),
      (this.Loop = void 0),
      (this.Start = void 0),
      (this.EndConstant = void 0),
      (this.LoopConstant = void 0),
      (this.StartConstant = void 0) === i || i.bUseCurve
        ? (this.End = i)
        : (this.EndConstant = i.Constant),
      void 0 === t || t.bUseCurve
        ? (this.Loop = t)
        : (this.LoopConstant = t.Constant),
      void 0 === h || h.bUseCurve
        ? (this.Start = h)
        : (this.StartConstant = h.Constant);
  }
}
exports.CharMaterialControlColorGroup = CharMaterialControlColorGroup;
class CharMaterialControlTextureGroup {
  constructor(i, t, h) {
    (this.End = void 0),
      (this.Loop = void 0),
      (this.Start = void 0),
      (this.End = i),
      (this.Loop = t),
      (this.Start = h);
  }
}
exports.CharMaterialControlTextureGroup = CharMaterialControlTextureGroup;
class CharMaterialControlDataCache {
  constructor(i, t) {
    (this.Data = void 0),
      (this.DataName = void 0),
      (this.RefCount = 0),
      (this.StatCharMaterialControlCacheData = void 0),
      (this.StatCharMaterialControlUpdate = void 0),
      (this.WholeLoopTime = 0),
      (this.DataLoopEnd = void 0),
      (this.DataLoopStart = void 0),
      (this.DataLoopTime = void 0),
      (this.IgnoreTimeDilation = !1),
      (this.DataType = void 0),
      (this.OtherCases = void 0),
      (this.WeaponCases = void 0),
      (this.SpecifiedParts = void 0),
      (this.CustomPartNames = void 0),
      (this.HiddenAfterEffect = !1),
      (this.SpecifiedBodyType = void 0),
      (this.SpecifiedSlotType = void 0),
      (this.MaterialModifyType = void 0),
      (this.UseRim = !1),
      (this.RimRange = void 0),
      (this.RimColor = void 0),
      (this.RimIntensity = void 0),
      (this.RimUseTex = 0),
      (this.RimChannel = void 0),
      (this.RimRevertProperty = !1),
      (this.UseDissolve = !1),
      (this.DissolveChannel = void 0),
      (this.DissolveProgress = void 0),
      (this.DissolveSmooth = void 0),
      (this.DissolveColorIntensity = void 0),
      (this.DissolveColor = void 0),
      (this.DissolveRevertProperty = !1),
      (this.UseOutline = !1),
      (this.OutlineRevertProperty = !1),
      (this.OutlineUseTex = 0),
      (this.UseOuterOutlineEffect = !1),
      (this.OutlineWidth = void 0),
      (this.OutlineColor = void 0),
      (this.OutlineIntensity = void 0),
      (this.ReplaceMaterialInterface = void 0),
      (this.UseParameterModify = !1),
      (this.ColorParameterNames = void 0),
      (this.ColorParameterValues = void 0),
      (this.FloatParameterNames = void 0),
      (this.FloatParameterValues = void 0),
      (this.RevertMaterial = !1),
      (this.BaseColor = void 0),
      (this.EmissionColor = void 0),
      (this.EmissionIntensity = void 0),
      (this.BaseColorIntensity = void 0),
      (this.BaseUseTex = 0),
      (this.EmissionUseTex = 0),
      (this.UseColor = !1),
      (this.ColorRevertProperty = !1),
      (this.UseTextureSample = !1),
      (this.MaskTexture = void 0),
      (this.UvSelection = void 0),
      (this.UseScreenUv = 0),
      (this.TextureScaleAndOffset = void 0),
      (this.TextureSpeed = void 0),
      (this.TextureColorTint = void 0),
      (this.Rotation = void 0),
      (this.UseAlphaToMask = 0),
      (this.TextureMaskRange = void 0),
      (this.TextureSampleRevertProperty = !1),
      (this.UseMotionOffset = !1),
      (this.MotionAffectVertexRange = 0),
      (this.MotionOffsetLength = 0),
      (this.MotionNoiseSpeed = void 0),
      (this.MotionOffsetRevertProperty = !1),
      (this.UseDitherEffect = !1),
      (this.DitherValue = void 0),
      (this.DitherRevertProperty = !1),
      (this.UseCustomMaterialEffect = !1),
      (this.CustomRevertProperty = !1),
      (this.CustomColorParameterNames = void 0),
      (this.CustomColorParameterValues = void 0),
      (this.CustomFloatParameterNames = void 0),
      (this.CustomFloatParameterValues = void 0),
      (this.CustomTextureParameterNames = void 0),
      (this.CustomTextureParameterValues = void 0),
      (this.Data = t),
      (this.DataName = i),
      (this.StatCharMaterialControlUpdate = void 0),
      (this.StatCharMaterialControlCacheData = void 0),
      (this.RefCount = 0),
      (this.DataType = t.DataType);
    var i = t.LoopTime,
      h =
        ((this.DataLoopEnd = i.End),
        (this.DataLoopStart = i.Start),
        (this.DataLoopTime = i.Loop),
        (this.WholeLoopTime =
          this.DataLoopStart + this.DataLoopTime + this.DataLoopEnd),
        (this.IgnoreTimeDilation = t.IgnoreTimeDilation),
        (this.SpecifiedBodyType = t.SpecifiedBodyType),
        (this.SpecifiedSlotType = t.SpecifiedSlotType),
        (this.MaterialModifyType = t.MaterialModifyType),
        t.OtherCases);
    let s = h.Num();
    if (0 < s) {
      this.OtherCases = new Set();
      for (let i = 0; i < s; i++) this.OtherCases.add(h.Get(i));
    }
    var o = t.WeaponCases;
    if (0 < (s = o.Num())) {
      this.WeaponCases = new Set();
      for (let i = 0; i < s; i++) this.WeaponCases.add(o.Get(i));
    }
    var r = t.SpecifiedParts;
    if (0 < (s = r.Num())) {
      this.SpecifiedParts = new Array(s);
      for (let i = 0; i < s; i++) this.SpecifiedParts[i] = r.Get(i);
    }
    var a = t.CustomPartNames;
    if (0 < (s = a.Num())) {
      this.CustomPartNames = new Array(s);
      for (let i = 0; i < s; i++) this.CustomPartNames[i] = a.Get(i);
    }
    if (
      ((this.UseRim = t.UseRim),
      this.UseRim &&
        ((this.RimUseTex = t.RimUseTex ? 1 : 0),
        (this.RimChannel = RenderUtil_1.RenderUtil.GetSelectedChannel(
          t.RimChannel,
        )),
        (this.RimRevertProperty = t.RimRevertProperty),
        (i = t.RimRange),
        (this.RimRange = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.RimColor),
        (this.RimColor = new CharMaterialControlColorGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.RimIntensity),
        (this.RimIntensity = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        ))),
      (this.UseDissolve = t.UseDissolve),
      this.UseDissolve &&
        ((i = t.DissolveChannel),
        (this.DissolveChannel =
          0 === i
            ? new UE.LinearColor(1, 0, 0, 0)
            : RenderUtil_1.RenderUtil.GetSelectedChannel(t.DissolveChannel)),
        (i = t.DissolveProgress),
        (this.DissolveProgress = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.DissolveSmooth),
        (this.DissolveSmooth = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.DissolveColorIntensity),
        (this.DissolveColorIntensity = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.DissolveColor),
        (this.DissolveColor = new CharMaterialControlColorGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (this.DissolveRevertProperty = t.DissolveRevertProperty)),
      (this.UseOutline = t.UseOutline),
      this.UseOutline &&
        ((this.OutlineRevertProperty = t.OutlineRevertProperty),
        (this.OutlineUseTex = t.OutlineUseTex ? 1 : 0),
        (this.UseOuterOutlineEffect = t.UseOuterOutlineEffect),
        (i = t.OutlineWidth),
        (this.OutlineWidth = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.OutlineColor),
        (this.OutlineColor = new CharMaterialControlColorGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.OutlineIntensity),
        (this.OutlineIntensity = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        ))),
      GlobalData_1.GlobalData.IsEs3 &&
      t.MobileUseDifferentMaterial &&
      t.ReplaceMaterialMobile
        ? (this.ReplaceMaterialInterface = t.ReplaceMaterialMobile)
        : (this.ReplaceMaterialInterface = t.ReplaceMaterial),
      this.ReplaceMaterialInterface)
    ) {
      (this.UseParameterModify = t.UseParameterModify),
        (this.RevertMaterial = t.RevertMaterial);
      var e = t.ColorParameters;
      if (0 < (s = e.Num())) {
        (this.ColorParameterNames = new Array()),
          (this.ColorParameterValues = new Array());
        for (let i = 0; i < s; i++) {
          var l = e.Get(i);
          l.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.ColorParameterNames.push(l.ParameterName),
            (l = l.ParameterValue),
            this.ColorParameterValues.push(
              new CharMaterialControlColorGroup(
                this.DataLoopEnd ? l.End : void 0,
                this.DataLoopTime ? l.Loop : void 0,
                this.DataLoopStart ? l.Start : void 0,
              ),
            ));
        }
      }
      var d = t.FloatParameters;
      if (0 < (s = d.Num())) {
        (this.FloatParameterNames = new Array()),
          (this.FloatParameterValues = new Array());
        for (let i = 0; i < s; i++) {
          var v = d.Get(i);
          v.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.FloatParameterNames.push(v.ParameterName),
            (v = v.ParameterValue),
            this.FloatParameterValues.push(
              new CharMaterialControlFloatGroup(
                this.DataLoopEnd ? v.End : void 0,
                this.DataLoopTime ? v.Loop : void 0,
                this.DataLoopStart ? v.Start : void 0,
              ),
            ));
        }
      }
    }
    if (
      ((this.UseColor = t.UseColor),
      this.UseColor &&
        ((i = t.BaseColor),
        (this.BaseColor = new CharMaterialControlColorGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.EmissionColor),
        (this.EmissionColor = new CharMaterialControlColorGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.EmissionIntensity),
        (this.EmissionIntensity = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (i = t.BaseColorIntensity),
        (this.BaseColorIntensity = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (this.BaseUseTex = t.BaseUseTex ? 1 : 0),
        (this.EmissionUseTex = t.EmissionUseTex ? 1 : 0),
        (this.ColorRevertProperty = t.ColorRevertProperty)),
      (this.UseTextureSample = t.UseTextureSample),
      this.UseTextureSample)
    ) {
      switch (
        ((this.MaskTexture = t.MaskTexture),
        (this.UseScreenUv = 0),
        t.UVSelection)
      ) {
        case 0:
          this.UvSelection = new UE.LinearColor(1, 0, 0, 0);
          break;
        case 1:
          this.UvSelection = new UE.LinearColor(0, 1, 0, 0);
          break;
        case 2:
          this.UvSelection = new UE.LinearColor(0, 0, 1, 0);
          break;
        case 3:
          this.UvSelection = new UE.LinearColor(0, 0, 0, 1);
          break;
        case 4:
          (this.UseScreenUv = 1),
            (this.UvSelection = new UE.LinearColor(0, 0, 0, 0));
          break;
        default:
          this.UvSelection = new UE.LinearColor(0, 0, 0, 0);
      }
      var i = t.TextureScaleAndOffset,
        i =
          ((this.TextureScaleAndOffset = new CharMaterialControlColorGroup(
            this.DataLoopEnd ? i.End : void 0,
            this.DataLoopTime ? i.Loop : void 0,
            this.DataLoopStart ? i.Start : void 0,
          )),
          t.TextureSpeed),
        i =
          ((this.TextureSpeed = new CharMaterialControlColorGroup(
            this.DataLoopEnd ? i.End : void 0,
            this.DataLoopTime ? i.Loop : void 0,
            this.DataLoopStart ? i.Start : void 0,
          )),
          t.TextureColorTint),
        i =
          ((this.TextureColorTint = new CharMaterialControlColorGroup(
            this.DataLoopEnd ? i.End : void 0,
            this.DataLoopTime ? i.Loop : void 0,
            this.DataLoopStart ? i.Start : void 0,
          )),
          t.Rotation),
        i =
          ((this.Rotation = new CharMaterialControlFloatGroup(
            this.DataLoopEnd ? i.End : void 0,
            this.DataLoopTime ? i.Loop : void 0,
            this.DataLoopStart ? i.Start : void 0,
          )),
          t.TextureMaskRange);
      (this.TextureMaskRange = new CharMaterialControlFloatGroup(
        this.DataLoopEnd ? i.End : void 0,
        this.DataLoopTime ? i.Loop : void 0,
        this.DataLoopStart ? i.Start : void 0,
      )),
        (this.UseAlphaToMask = t.UseAlphaToMask ? 1 : 0),
        (this.TextureSampleRevertProperty = t.TextureSampleRevertProperty);
    }
    if (
      ((this.UseMotionOffset = t.UseMotionOffset),
      this.UseMotionOffset &&
        ((this.MotionAffectVertexRange = t.MotionAffectVertexRange),
        (this.MotionOffsetLength = t.MotionOffsetLength),
        (i = t.MotionNoiseSpeed),
        (this.MotionNoiseSpeed = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (this.MotionOffsetRevertProperty = t.MotionOffsetRevertProperty)),
      (this.UseDitherEffect = t.UseDitherEffect),
      this.UseDitherEffect &&
        ((i = t.DitherValue),
        (this.DitherValue = new CharMaterialControlFloatGroup(
          this.DataLoopEnd ? i.End : void 0,
          this.DataLoopTime ? i.Loop : void 0,
          this.DataLoopStart ? i.Start : void 0,
        )),
        (this.DitherRevertProperty = t.DitherRevertProperty)),
      (this.UseCustomMaterialEffect = t.UseCustomMaterialEffect),
      this.UseCustomMaterialEffect)
    ) {
      this.CustomRevertProperty = t.CustomRevertProperty;
      var n = t.CustomColorParameters;
      if (0 < (s = n.Num())) {
        (this.CustomColorParameterNames = new Array()),
          (this.CustomColorParameterValues = new Array());
        for (let i = 0; i < s; i++) {
          var C = n.Get(i);
          C.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.CustomColorParameterNames.push(C.ParameterName),
            (C = C.ParameterValue),
            this.CustomColorParameterValues.push(
              new CharMaterialControlColorGroup(
                this.DataLoopEnd ? C.End : void 0,
                this.DataLoopTime ? C.Loop : void 0,
                this.DataLoopStart ? C.Start : void 0,
              ),
            ));
        }
      }
      var c = t.CustomFloatParameters;
      if (0 < (s = c.Num())) {
        (this.CustomFloatParameterNames = new Array()),
          (this.CustomFloatParameterValues = new Array());
        for (let i = 0; i < s; i++) {
          var M = c.Get(i);
          M.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.CustomFloatParameterNames.push(M.ParameterName),
            (M = M.ParameterValue),
            this.CustomFloatParameterValues.push(
              new CharMaterialControlFloatGroup(
                this.DataLoopEnd ? M.End : void 0,
                this.DataLoopTime ? M.Loop : void 0,
                this.DataLoopStart ? M.Start : void 0,
              ),
            ));
        }
      }
      var u = t.CustomTextureParameters;
      if (0 < (s = u.Num())) {
        (this.CustomTextureParameterNames = new Array()),
          (this.CustomTextureParameterValues = new Array());
        for (let i = 0; i < s; i++) {
          var p = u.Get(i);
          p.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.CustomTextureParameterNames.push(p.ParameterName),
            (p = p.ParameterValue),
            this.CustomTextureParameterValues.push(
              new CharMaterialControlTextureGroup(
                this.DataLoopEnd ? p.End : void 0,
                this.DataLoopTime ? p.Loop : void 0,
                this.DataLoopStart ? p.Start : void 0,
              ),
            ));
        }
      }
    }
    this.HiddenAfterEffect = t.HiddenAfterEffect;
  }
}
exports.CharMaterialControlDataCache = CharMaterialControlDataCache;
class CharMaterialControlDataCacheMgr {
  constructor() {
    (this.DataCacheMap = new Map()),
      (this.DataCacheGcCountDownTime = new Map()),
      (this.WaitingRemoveDataCacheNames = new Array()),
      (this.gW = void 0),
      (this.e8 = 0),
      (this.r6 = (i) => {
        if (((this.e8 -= i), !(0 < this.e8))) {
          var i = GlobalData_1.GlobalData.IsPlayInEditor
              ? CharMaterialControlDataCacheMgr.Ohr
              : CharMaterialControlDataCacheMgr.khr,
            t = i - this.e8;
          for (const s of this.DataCacheGcCountDownTime.keys()) {
            var h = this.DataCacheGcCountDownTime.get(s) - t;
            h <= 0
              ? this.WaitingRemoveDataCacheNames.push(s)
              : this.DataCacheGcCountDownTime.set(s, h);
          }
          if (0 < this.WaitingRemoveDataCacheNames.length) {
            for (const o of this.WaitingRemoveDataCacheNames)
              this.DataCacheGcCountDownTime.delete(o),
                this.DataCacheMap.has(o) && this.DataCacheMap.delete(o);
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("RenderCharacter", 41, "DataCache删除", [
                "数量",
                this.WaitingRemoveDataCacheNames.length,
              ]),
              (this.WaitingRemoveDataCacheNames.length = 0);
          }
          this.e8 = i;
        }
      }),
      (this.e8 = GlobalData_1.GlobalData.IsPlayInEditor
        ? CharMaterialControlDataCacheMgr.Ohr
        : CharMaterialControlDataCacheMgr.khr),
      (this.gW = void 0);
  }
  static Get() {
    return (
      this.Me ||
        ((this.Me = new CharMaterialControlDataCacheMgr()),
        TickSystem_1.TickSystem.Add(
          this.Me.r6,
          "CharMaterialControlDataCacheMgr.Tick",
          3,
        )),
      this.Me
    );
  }
  GetOrCreateDataCache(t) {
    if (t) {
      var h = t.GetName();
      let i = this.DataCacheMap.get(h);
      return (
        i ||
          ((i = new CharMaterialControlDataCache(h, t)),
          this.DataCacheMap.set(h, i)),
        ++i.RefCount,
        this.DataCacheGcCountDownTime.has(h) &&
          this.DataCacheGcCountDownTime.delete(h),
        i
      );
    }
  }
  RecycleDataCache(i) {
    var t,
      h = this.DataCacheMap.get(i);
    h
      ? (--h.RefCount,
        h.RefCount <= 0 &&
          ((t = GlobalData_1.GlobalData.IsPlayInEditor
            ? CharMaterialControlDataCacheMgr.Fhr
            : CharMaterialControlDataCacheMgr.Vhr),
          this.DataCacheGcCountDownTime.set(i, t),
          h.RefCount < 0) &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            41,
            "RecycleDataCache: dataCache引用计数出错",
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "RecycleDataCache: dataCache不存在",
        );
  }
}
(CharMaterialControlDataCacheMgr.Vhr = 6e4),
  (CharMaterialControlDataCacheMgr.Fhr = 0),
  (CharMaterialControlDataCacheMgr.khr = 1e4),
  (CharMaterialControlDataCacheMgr.Ohr = 10),
  (CharMaterialControlDataCacheMgr.Me = void 0);
class CharMaterialControlRuntimeData {
  constructor() {
    (this.Id = 0),
      (this.DataCache = void 0),
      (this.UserData = void 0),
      (this.CurrentTimeCounter = 0),
      (this.WholeLoopTimeCounter = 0),
      (this.InterpolateFactor = void 0),
      (this.LoopTimeCounter = 0),
      (this.SpecifiedMaterialIndexMap = void 0),
      (this.SelectedAllBodies = !1),
      (this.SelectedAllParts = !1),
      (this.ReadyToDie = !1),
      (this.HasEntered = !1),
      (this.IsDead = !1),
      (this.HasReverted = !1),
      (this.ReplaceMaterial = void 0),
      (this.MotionStartLocation = void 0),
      (this.TargetSkeletalMesh = void 0),
      (this.MotionEndLocation = void 0),
      (this.Hhr = void 0),
      (this.jhr = void 0);
  }
  Init(i, t, h) {
    (this.Id = i),
      (this.DataCache =
        CharMaterialControlDataCacheMgr.Get().GetOrCreateDataCache(t)),
      (this.CurrentTimeCounter = 0),
      (this.WholeLoopTimeCounter = 0),
      (this.LoopTimeCounter = 0),
      (this.UserData = h),
      (this.InterpolateFactor = new InterpolateFactor()),
      (this.InterpolateFactor.Type = 0),
      (this.InterpolateFactor.Factor = 0),
      (this.HasEntered = !1),
      (this.HasReverted = !1),
      (this.IsDead = !1),
      (this.ReadyToDie = !1),
      (this.SelectedAllBodies = !1),
      (this.SelectedAllParts = !1),
      (this.SpecifiedMaterialIndexMap = new Map()),
      (this.ReplaceMaterial = void 0),
      (this.jhr = void 0),
      (this.Hhr = void 0);
  }
  Destroy() {
    if (
      (CharMaterialControlDataCacheMgr.Get().RecycleDataCache(
        this.DataCache.DataName,
      ),
      (this.DataCache = void 0),
      this.jhr && this.jhr)
    ) {
      for (const i of this.jhr) i(this.Id);
      this.ClearDestroyCallback();
    }
  }
  ClearDestroyCallback() {
    this.jhr = void 0;
  }
  AddDestroyCallback(i) {
    return (
      !!i &&
      (this.jhr || (this.jhr = new Set()), !this.jhr.has(i)) &&
      (this.jhr.add(i), !0)
    );
  }
  RemoveDestroyCallback(i) {
    return !!i && !!this.jhr && this.jhr.delete(i);
  }
  SetSpecifiedMaterialIndex(t) {
    (this.SelectedAllBodies =
      0 === this.DataCache.SpecifiedBodyType &&
      void 0 === this.DataCache.WeaponCases &&
      void 0 === this.DataCache.OtherCases),
      (this.SelectedAllParts =
        0 === this.DataCache.SpecifiedSlotType &&
        void 0 === this.DataCache.SpecifiedParts &&
        void 0 === this.DataCache.CustomPartNames);
    var h = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(
      this.DataCache.SpecifiedBodyType,
    );
    if (h)
      for (let i = 0; i < h.length; i++) {
        var s = h[i],
          o = t.AllBodyInfoList.get(s);
        if (o) {
          var r = o.BodyType;
          if (
            (1 !== r ||
              void 0 === this.DataCache.WeaponCases ||
              this.DataCache.WeaponCases.has(s)) &&
            (3 !== r ||
              void 0 === this.DataCache.OtherCases ||
              this.DataCache.OtherCases.has(s))
          ) {
            var a = o.SpecifiedSlotList[this.DataCache.SpecifiedSlotType],
              e = new Array();
            for (let h = 0; h < a.length; h++) {
              var l = a[h],
                d = o.MaterialSlotList[l];
              let t = !1,
                i = !0;
              var v = this.DataCache.SpecifiedParts;
              if (void 0 !== v) {
                var n = v.length;
                if (0 < n) {
                  i = !1;
                  for (let i = 0; i < n; i++)
                    if (d.MaterialPartType === v[i]) {
                      t = !0;
                      break;
                    }
                }
              }
              var C = this.DataCache.CustomPartNames;
              if (void 0 !== C) {
                var c = C.length;
                if (0 < c) {
                  i = !1;
                  for (let i = 0; i < c; i++)
                    if (d.SlotName.includes(C[i])) {
                      t = !0;
                      break;
                    }
                }
              }
              (t || i) && e.push(l);
            }
            this.SpecifiedMaterialIndexMap.set(s, e);
          }
        }
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderUtil", 14, "", [
          "BODY类型未配置:",
          this.DataCache.SpecifiedBodyType,
        ]);
  }
  UpdateState(t, h) {
    if (this.IsDead)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "RuntimeData UpdateState: 已经结束的效果，还在更新",
          ["id", this.Id],
        );
    else if (2 !== this.DataCache.DataType)
      if (this.DataCache.WholeLoopTime <= 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderCharacter", 41, "材质控制器的总时长需大于0", [
            "data",
            this.DataCache.DataName,
          ]),
          (this.IsDead = !0);
      else if (
        1 === this.DataCache.DataType &&
        this.DataCache.DataLoopTime <= 0
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            41,
            "Runtime类型材质控制器的Loop时长需大于0",
            ["data", this.DataCache.DataName],
          ),
          (this.IsDead = !0);
      else if (
        this.DataCache.IgnoreTimeDilation ||
        !RenderModuleController_1.RenderModuleController.IsGamePaused
      ) {
        let i = t;
        this.DataCache.IgnoreTimeDilation || (i = t * h),
          this.Whr(i),
          (this.CurrentTimeCounter += i),
          (this.WholeLoopTimeCounter += i),
          (this.LoopTimeCounter += i);
        t = this.GetSpecifiedLoopTime(this.InterpolateFactor.Type);
        (this.LoopTimeCounter %= t),
          (this.InterpolateFactor.Factor = RenderUtil_1.RenderUtil.Clamp(
            this.LoopTimeCounter / t,
            0,
            1,
          )),
          0 === this.DataCache.DataType &&
            this.CurrentTimeCounter >= this.DataCache.WholeLoopTime - i &&
            (this.IsDead = !0),
          this.ReadyToDie &&
            this.CurrentTimeCounter >= this.DataCache.DataLoopEnd &&
            (this.IsDead = !0);
      }
  }
  UpdateEffect(i) {
    this.HasEntered || (i.StateEnter(this), (this.HasEntered = !0)),
      this.IsDead ? i.StateRevert(this) : i.StateUpdate(this);
  }
  Whr(i) {
    var t = this.DataCache.DataLoopStart,
      h = this.DataCache.DataLoopTime;
    !this.ReadyToDie && this.WholeLoopTimeCounter <= t - i
      ? (0 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
        (this.InterpolateFactor.Type = 0))
      : !this.ReadyToDie && this.WholeLoopTimeCounter <= t + h - i
        ? (1 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
          (this.InterpolateFactor.Type = 1))
        : this.WholeLoopTimeCounter <= this.DataCache.WholeLoopTime &&
          (2 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
          this.ReadyToDie || 1 !== this.DataCache.DataType
            ? (this.InterpolateFactor.Type = 2)
            : ((this.InterpolateFactor.Type = 1),
              (this.WholeLoopTimeCounter -= h)));
  }
  SetReadyToDie() {
    if (((this.ReadyToDie = !0), 2 === this.InterpolateFactor.Type)) {
      var i = this.DataCache.WholeLoopTime - this.WholeLoopTimeCounter;
      if (i < this.DataCache.DataLoopEnd)
        return void (this.CurrentTimeCounter = this.DataCache.DataLoopEnd - i);
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetReadyToDie: End阶段的剩余时间小于End时间",
          ["leftTime", i],
          ["WholeLoopTimeCounter", this.WholeLoopTimeCounter],
          ["WholeLoopTime", this.DataCache.WholeLoopTime],
          ["DataLoopEnd", this.DataCache.DataLoopEnd],
        );
    }
    this.CurrentTimeCounter = 0;
  }
  SetProgress(i) {
    2 === this.DataCache.DataType &&
      ((i = MathUtils_1.MathUtils.Clamp(i, 0, 1)),
      (i = this.DataCache.WholeLoopTime * i),
      this.Khr(i));
  }
  Khr(i) {
    var t = this.DataCache.DataLoopStart,
      h = this.DataCache.DataLoopTime;
    i <= t
      ? ((this.InterpolateFactor.Type = 0),
        (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
          i,
          t,
        )))
      : i <= t + h
        ? ((this.InterpolateFactor.Type = 1),
          (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
            i - t,
            h,
          )))
        : i <= this.DataCache.WholeLoopTime &&
          ((this.InterpolateFactor.Type = 2),
          (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
            i - t - h,
            this.DataCache.DataLoopEnd,
          ))),
      (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.Clamp(
        this.InterpolateFactor.Factor,
        0,
        1,
      ));
  }
  GetSpecifiedLoopTime(i) {
    switch (i) {
      case 0:
        return this.DataCache.DataLoopStart ?? 0;
      case 1:
        return this.DataCache.DataLoopTime ?? 0;
      case 2:
        return this.DataCache.DataLoopEnd ?? 0;
      default:
        return 0;
    }
  }
}
exports.CharMaterialControlRuntimeData = CharMaterialControlRuntimeData;
//# sourceMappingURL=CharRuntimeMaterialControllerInfo.js.map
