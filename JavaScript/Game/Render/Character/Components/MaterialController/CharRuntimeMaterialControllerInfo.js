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
  Time_1 = require("../../../../../Core/Common/Time"),
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
    (this.f8o = 0), (this.Factor = 0);
  }
  get Type() {
    return this.f8o;
  }
  set Type(t) {
    this.f8o !== t && (this.f8o = t);
  }
}
exports.InterpolateFactor = InterpolateFactor;
class CharMaterialControlFloatGroup {
  constructor(t, i, h) {
    (this.End = void 0),
      (this.Loop = void 0),
      (this.Start = void 0),
      (this.EndConstant = void 0),
      (this.LoopConstant = void 0),
      (this.StartConstant = void 0),
      t.bUseCurve ? (this.End = t) : (this.EndConstant = t.Constant),
      i.bUseCurve ? (this.Loop = i) : (this.LoopConstant = i.Constant),
      h.bUseCurve ? (this.Start = h) : (this.StartConstant = h.Constant);
  }
}
exports.CharMaterialControlFloatGroup = CharMaterialControlFloatGroup;
class CharMaterialControlColorGroup {
  constructor(t, i, h) {
    (this.End = void 0),
      (this.Loop = void 0),
      (this.Start = void 0),
      (this.EndConstant = void 0),
      (this.LoopConstant = void 0),
      (this.StartConstant = void 0),
      t.bUseCurve ? (this.End = t) : (this.EndConstant = t.Constant),
      i.bUseCurve ? (this.Loop = i) : (this.LoopConstant = i.Constant),
      h.bUseCurve ? (this.Start = h) : (this.StartConstant = h.Constant);
  }
}
exports.CharMaterialControlColorGroup = CharMaterialControlColorGroup;
class CharMaterialControlTextureGroup {
  constructor(t, i, h) {
    (this.End = void 0),
      (this.Loop = void 0),
      (this.Start = void 0),
      (this.End = t),
      (this.Loop = i),
      (this.Start = h);
  }
}
exports.CharMaterialControlTextureGroup = CharMaterialControlTextureGroup;
class CharMaterialControlDataCache {
  constructor(t, i) {
    (this.Data = void 0),
      (this.DataName = void 0),
      (this.RefCount = 0),
      (this.StatCharMaterialControlCacheData = void 0),
      (this.StatCharMaterialControlUpdate = void 0),
      (this.WholeLoopTime = 0),
      (this.DataLoopEnd = 0),
      (this.DataLoopStart = 0),
      (this.DataLoopTime = 0),
      (this.IgnoreTimeDilation = !1),
      (this.MaskOriginEffect = !1),
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
      (this.Data = i),
      (this.DataName = t),
      (this.StatCharMaterialControlUpdate = Stats_1.Stat.Create(
        ["Render_CharMaterialControlUpdate_", t].join(),
      )),
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataCache.Start(),
      (this.StatCharMaterialControlCacheData = Stats_1.Stat.Create(
        ["Render_CharMaterialControlCacheData_", t].join(),
      )),
      this.StatCharMaterialControlCacheData.Start(),
      (this.RefCount = 0),
      (this.MaskOriginEffect = i.MaskOriginEffect),
      (this.DataType = i.DataType);
    var t = i.LoopTime,
      h =
        ((this.DataLoopEnd = t.End),
        (this.DataLoopStart = t.Start),
        (this.DataLoopTime = t.Loop),
        (this.WholeLoopTime =
          this.DataLoopStart + this.DataLoopTime + this.DataLoopEnd),
        (this.IgnoreTimeDilation = i.IgnoreTimeDilation),
        (this.SpecifiedBodyType = i.SpecifiedBodyType),
        (this.SpecifiedSlotType = i.SpecifiedSlotType),
        (this.MaterialModifyType = i.MaterialModifyType),
        i.OtherCases);
    let s = h.Num();
    if (0 < s) {
      this.OtherCases = new Set();
      for (let t = 0; t < s; t++) this.OtherCases.add(h.Get(t));
    }
    var r = i.WeaponCases;
    if (0 < (s = r.Num())) {
      this.WeaponCases = new Set();
      for (let t = 0; t < s; t++) this.WeaponCases.add(r.Get(t));
    }
    var a = i.SpecifiedParts;
    if (0 < (s = a.Num())) {
      this.SpecifiedParts = new Array(s);
      for (let t = 0; t < s; t++) this.SpecifiedParts[t] = a.Get(t);
    }
    var e = i.CustomPartNames;
    if (0 < (s = e.Num())) {
      this.CustomPartNames = new Array(s);
      for (let t = 0; t < s; t++) this.CustomPartNames[t] = e.Get(t);
    }
    if (
      ((this.UseRim = i.UseRim),
      this.UseRim &&
        ((this.RimUseTex = i.RimUseTex ? 1 : 0),
        (this.RimChannel = RenderUtil_1.RenderUtil.GetSelectedChannel(
          i.RimChannel,
        )),
        (this.RimRevertProperty = i.RimRevertProperty),
        (t = i.RimRange),
        (this.RimRange = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.RimColor),
        (this.RimColor = new CharMaterialControlColorGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.RimIntensity),
        (this.RimIntensity = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        ))),
      (this.UseDissolve = i.UseDissolve),
      this.UseDissolve &&
        ((t = i.DissolveChannel),
        (this.DissolveChannel =
          0 === t
            ? new UE.LinearColor(1, 0, 0, 0)
            : RenderUtil_1.RenderUtil.GetSelectedChannel(i.DissolveChannel)),
        (t = i.DissolveProgress),
        (this.DissolveProgress = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.DissolveSmooth),
        (this.DissolveSmooth = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.DissolveColorIntensity),
        (this.DissolveColorIntensity = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.DissolveColor),
        (this.DissolveColor = new CharMaterialControlColorGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (this.DissolveRevertProperty = i.DissolveRevertProperty)),
      (this.UseOutline = i.UseOutline),
      this.UseOutline &&
        ((this.OutlineRevertProperty = i.OutlineRevertProperty),
        (this.OutlineUseTex = i.OutlineUseTex ? 1 : 0),
        (this.UseOuterOutlineEffect = i.UseOuterOutlineEffect),
        (t = i.OutlineWidth),
        (this.OutlineWidth = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.OutlineColor),
        (this.OutlineColor = new CharMaterialControlColorGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.OutlineIntensity),
        (this.OutlineIntensity = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        ))),
      GlobalData_1.GlobalData.IsEs3 &&
      i.MobileUseDifferentMaterial &&
      i.ReplaceMaterialMobile
        ? (this.ReplaceMaterialInterface = i.ReplaceMaterialMobile)
        : (this.ReplaceMaterialInterface = i.ReplaceMaterial),
      this.ReplaceMaterialInterface)
    ) {
      (this.UseParameterModify = i.UseParameterModify),
        (this.RevertMaterial = i.RevertMaterial);
      var o = i.ColorParameters;
      if (0 < (s = o.Num())) {
        (this.ColorParameterNames = new Array()),
          (this.ColorParameterValues = new Array());
        for (let t = 0; t < s; t++) {
          var l = o.Get(t);
          l.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.ColorParameterNames.push(l.ParameterName),
            (l = l.ParameterValue),
            this.ColorParameterValues.push(
              new CharMaterialControlColorGroup(l.End, l.Loop, l.Start),
            ));
        }
      }
      var n = i.FloatParameters;
      if (0 < (s = n.Num())) {
        (this.FloatParameterNames = new Array()),
          (this.FloatParameterValues = new Array());
        for (let t = 0; t < s; t++) {
          var C = n.Get(t);
          C.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.FloatParameterNames.push(C.ParameterName),
            (C = C.ParameterValue),
            this.FloatParameterValues.push(
              new CharMaterialControlFloatGroup(C.End, C.Loop, C.Start),
            ));
        }
      }
    }
    if (
      ((this.UseColor = i.UseColor),
      this.UseColor &&
        ((t = i.BaseColor),
        (this.BaseColor = new CharMaterialControlColorGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.EmissionColor),
        (this.EmissionColor = new CharMaterialControlColorGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.EmissionIntensity),
        (this.EmissionIntensity = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (t = i.BaseColorIntensity),
        (this.BaseColorIntensity = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (this.BaseUseTex = i.BaseUseTex ? 1 : 0),
        (this.EmissionUseTex = i.EmissionUseTex ? 1 : 0),
        (this.ColorRevertProperty = i.ColorRevertProperty)),
      (this.UseTextureSample = i.UseTextureSample),
      this.UseTextureSample)
    ) {
      switch (
        ((this.MaskTexture = i.MaskTexture),
        (this.UseScreenUv = 0),
        i.UVSelection)
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
      var t = i.TextureScaleAndOffset,
        t =
          ((this.TextureScaleAndOffset = new CharMaterialControlColorGroup(
            t.End,
            t.Loop,
            t.Start,
          )),
          i.TextureSpeed),
        t =
          ((this.TextureSpeed = new CharMaterialControlColorGroup(
            t.End,
            t.Loop,
            t.Start,
          )),
          i.TextureColorTint),
        t =
          ((this.TextureColorTint = new CharMaterialControlColorGroup(
            t.End,
            t.Loop,
            t.Start,
          )),
          i.Rotation),
        t =
          ((this.Rotation = new CharMaterialControlFloatGroup(
            t.End,
            t.Loop,
            t.Start,
          )),
          i.TextureMaskRange);
      (this.TextureMaskRange = new CharMaterialControlFloatGroup(
        t.End,
        t.Loop,
        t.Start,
      )),
        (this.UseAlphaToMask = i.UseAlphaToMask ? 1 : 0),
        (this.TextureSampleRevertProperty = i.TextureSampleRevertProperty);
    }
    if (
      ((this.UseMotionOffset = i.UseMotionOffset),
      this.UseMotionOffset &&
        ((this.MotionAffectVertexRange = i.MotionAffectVertexRange),
        (this.MotionOffsetLength = i.MotionOffsetLength),
        (t = i.MotionNoiseSpeed),
        (this.MotionNoiseSpeed = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (this.MotionOffsetRevertProperty = i.MotionOffsetRevertProperty)),
      (this.UseDitherEffect = i.UseDitherEffect),
      this.UseDitherEffect &&
        ((t = i.DitherValue),
        (this.DitherValue = new CharMaterialControlFloatGroup(
          t.End,
          t.Loop,
          t.Start,
        )),
        (this.DitherRevertProperty = i.DitherRevertProperty)),
      (this.UseCustomMaterialEffect = i.UseCustomMaterialEffect),
      this.UseCustomMaterialEffect)
    ) {
      this.CustomRevertProperty = i.CustomRevertProperty;
      var d = i.CustomColorParameters;
      if (0 < (s = d.Num())) {
        (this.CustomColorParameterNames = new Array()),
          (this.CustomColorParameterValues = new Array());
        for (let t = 0; t < s; t++) {
          var v = d.Get(t);
          v.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.CustomColorParameterNames.push(v.ParameterName),
            (v = v.ParameterValue),
            this.CustomColorParameterValues.push(
              new CharMaterialControlColorGroup(v.End, v.Loop, v.Start),
            ));
        }
      }
      var M = i.CustomFloatParameters;
      if (0 < (s = M.Num())) {
        (this.CustomFloatParameterNames = new Array()),
          (this.CustomFloatParameterValues = new Array());
        for (let t = 0; t < s; t++) {
          var c = M.Get(t);
          c.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.CustomFloatParameterNames.push(c.ParameterName),
            (c = c.ParameterValue),
            this.CustomFloatParameterValues.push(
              new CharMaterialControlFloatGroup(c.End, c.Loop, c.Start),
            ));
        }
      }
      var u = i.CustomTextureParameters;
      if (0 < (s = u.Num())) {
        (this.CustomTextureParameterNames = new Array()),
          (this.CustomTextureParameterValues = new Array());
        for (let t = 0; t < s; t++) {
          var f = u.Get(t);
          f.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
            (this.CustomTextureParameterNames.push(f.ParameterName),
            (f = f.ParameterValue),
            this.CustomTextureParameterValues.push(
              new CharMaterialControlTextureGroup(f.End, f.Loop, f.Start),
            ));
        }
      }
    }
    (this.HiddenAfterEffect = i.HiddenAfterEffect),
      this.StatCharMaterialControlCacheData.Stop(),
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentDataCache.Stop();
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
      (this.r6 = (t) => {
        if (((this.e8 -= t), !(0 < this.e8))) {
          this.gW.Start();
          var t = GlobalData_1.GlobalData.IsPlayInEditor
              ? CharMaterialControlDataCacheMgr.qlr
              : CharMaterialControlDataCacheMgr.Glr,
            i = t - this.e8;
          for (const s of this.DataCacheGcCountDownTime.keys()) {
            var h = this.DataCacheGcCountDownTime.get(s) - i;
            h <= 0
              ? this.WaitingRemoveDataCacheNames.push(s)
              : this.DataCacheGcCountDownTime.set(s, h);
          }
          if (0 < this.WaitingRemoveDataCacheNames.length) {
            for (const r of this.WaitingRemoveDataCacheNames)
              this.DataCacheGcCountDownTime.delete(r),
                this.DataCacheMap.has(r) && this.DataCacheMap.delete(r);
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("RenderCharacter", 41, "DataCache删除", [
                "数量",
                this.WaitingRemoveDataCacheNames.length,
              ]),
              (this.WaitingRemoveDataCacheNames.length = 0);
          }
          (this.e8 = t), this.gW.Stop();
        }
      }),
      (this.e8 = GlobalData_1.GlobalData.IsPlayInEditor
        ? CharMaterialControlDataCacheMgr.qlr
        : CharMaterialControlDataCacheMgr.Glr),
      (this.gW = Stats_1.Stat.Create("CharMaterialControlDataCacheMgr.Tick"));
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
  GetOrCreateDataCache(i) {
    if (i) {
      var h = i.GetName();
      let t = this.DataCacheMap.get(h);
      return (
        t ||
          ((t = new CharMaterialControlDataCache(h, i)),
          this.DataCacheMap.set(h, t)),
        ++t.RefCount,
        this.DataCacheGcCountDownTime.has(h) &&
          this.DataCacheGcCountDownTime.delete(h),
        t
      );
    }
  }
  RecycleDataCache(t) {
    var i,
      h = this.DataCacheMap.get(t);
    h
      ? (--h.RefCount,
        h.RefCount <= 0 &&
          ((i = GlobalData_1.GlobalData.IsPlayInEditor
            ? CharMaterialControlDataCacheMgr.Nlr
            : CharMaterialControlDataCacheMgr.Olr),
          this.DataCacheGcCountDownTime.set(t, i),
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
(CharMaterialControlDataCacheMgr.Olr = 6e4),
  (CharMaterialControlDataCacheMgr.Nlr = 0),
  (CharMaterialControlDataCacheMgr.Glr = 1e4),
  (CharMaterialControlDataCacheMgr.qlr = 10),
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
      (this.IsDead = !1),
      (this.EffectState = 0),
      (this.HasReverted = !1),
      (this.e5a = !1),
      (this.ReplaceMaterial = void 0),
      (this.MotionStartLocation = void 0),
      (this.TargetSkeletalMesh = void 0),
      (this.MotionEndLocation = void 0),
      (this.klr = void 0),
      (this.LastUpdateTime = 0),
      (this.Flr = void 0);
  }
  Init(t, i, h) {
    (this.Id = t),
      (this.DataCache =
        CharMaterialControlDataCacheMgr.Get().GetOrCreateDataCache(i)),
      (this.CurrentTimeCounter = 0),
      (this.WholeLoopTimeCounter = 0),
      (this.LoopTimeCounter = 0),
      (this.UserData = h),
      (this.InterpolateFactor = new InterpolateFactor()),
      (this.InterpolateFactor.Type = 0),
      (this.InterpolateFactor.Factor = 0),
      (this.HasReverted = !1),
      (this.IsDead = !1),
      (this.ReadyToDie = !1),
      (this.e5a = !i.UpdateAtLeastOneFrame),
      (this.SelectedAllBodies = !1),
      (this.SelectedAllParts = !1),
      (this.SpecifiedMaterialIndexMap = new Map()),
      (this.ReplaceMaterial = void 0),
      (this.Flr = void 0),
      (this.klr = Stats_1.Stat.Create(
        "[CharMaterialControlRuntimeData.Destroy] Path:" +
          this.DataCache.DataName,
      )),
      (this.LastUpdateTime = Time_1.Time.NowSeconds);
  }
  Destroy() {
    if (
      (CharMaterialControlDataCacheMgr.Get().RecycleDataCache(
        this.DataCache.DataName,
      ),
      (this.DataCache = void 0),
      this.Flr)
    ) {
      if ((this.klr?.Start(), this.Flr)) {
        for (const t of this.Flr) t(this.Id);
        this.ClearDestroyCallback();
      }
      this.klr?.Stop();
    }
  }
  ClearDestroyCallback() {
    this.Flr = void 0;
  }
  AddDestroyCallback(t) {
    return (
      !!t &&
      (this.Flr || (this.Flr = new Set()), !this.Flr.has(t)) &&
      (this.Flr.add(t), !0)
    );
  }
  RemoveDestroyCallback(t) {
    return !!t && !!this.Flr && this.Flr.delete(t);
  }
  SetSpecifiedMaterialIndex(i) {
    (this.SelectedAllBodies =
      0 === this.DataCache.SpecifiedBodyType &&
      void 0 === this.DataCache.WeaponCases &&
      void 0 === this.DataCache.OtherCases),
      (this.SelectedAllParts =
        0 === this.DataCache.SpecifiedSlotType &&
        void 0 === this.DataCache.SpecifiedParts &&
        void 0 === this.DataCache.CustomPartNames),
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataSetSpecified.Start();
    let h = void 0;
    if (0 === this.DataCache.SpecifiedBodyType) {
      h = [];
      for (const t of i.AllBodyInfoList.keys()) h.push(t);
    } else
      h = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(
        this.DataCache.SpecifiedBodyType,
      );
    if (h && h.length) {
      for (let t = 0; t < h.length; t++) {
        var s = h[t],
          r = i.AllBodyInfoList.get(s);
        if (r) {
          var a = r.BodyType;
          if (
            (1 !== a ||
              void 0 === this.DataCache.WeaponCases ||
              this.DataCache.WeaponCases.has(s)) &&
            (3 !== a ||
              void 0 === this.DataCache.OtherCases ||
              this.DataCache.OtherCases.has(s))
          ) {
            var e = r.SpecifiedSlotList[this.DataCache.SpecifiedSlotType],
              o = new Array();
            for (let h = 0; h < e.length; h++) {
              var l = e[h],
                n = r.MaterialSlotList[l];
              let i = !1,
                t = !0;
              var C = this.DataCache.SpecifiedParts;
              if (void 0 !== C) {
                var d = C.length;
                if (0 < d) {
                  t = !1;
                  for (let t = 0; t < d; t++)
                    if (n.MaterialPartType === C[t]) {
                      i = !0;
                      break;
                    }
                }
              }
              var v = this.DataCache.CustomPartNames;
              if (void 0 !== v) {
                var M = v.length;
                if (0 < M) {
                  t = !1;
                  for (let t = 0; t < M; t++)
                    if (n.SlotName.includes(v[t])) {
                      i = !0;
                      break;
                    }
                }
              }
              (i || t) && o.push(l);
            }
            this.SpecifiedMaterialIndexMap.set(s, o);
          }
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataSetSpecified.Stop();
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderUtil", 14, "", [
          "BODY类型未配置:",
          this.DataCache.SpecifiedBodyType,
        ]);
  }
  UpdateState(i, h) {
    if (this.IsDead)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "RuntimeData UpdateState: 已经结束的效果，还在更新",
          ["id", this.Id],
          ["updated", this.e5a],
          ["data", this.DataCache.DataName],
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
        RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateState.Start();
        let t = i;
        this.DataCache.IgnoreTimeDilation || (t = i * h),
          this.Vlr(t),
          (this.CurrentTimeCounter += t),
          (this.WholeLoopTimeCounter += t),
          (this.LoopTimeCounter += t);
        i = this.GetSpecifiedLoopTime(this.InterpolateFactor.Type);
        (this.LoopTimeCounter %= i),
          (this.InterpolateFactor.Factor = RenderUtil_1.RenderUtil.Clamp(
            this.LoopTimeCounter / i,
            0,
            1,
          )),
          0 === this.DataCache.DataType &&
            this.CurrentTimeCounter >= this.DataCache.WholeLoopTime - t &&
            this.e5a &&
            (this.IsDead = !0),
          (this.e5a = !0),
          this.ReadyToDie &&
            this.CurrentTimeCounter >= this.DataCache.DataLoopEnd &&
            (this.IsDead = !0),
          RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateState.Stop();
      }
  }
  RequestEffectStateEnter() {
    3 === this.EffectState
      ? (this.EffectState = 0)
      : 2 === this.EffectState && (this.EffectState = 1);
  }
  RequestEffectStateRevert() {
    1 === this.EffectState
      ? (this.EffectState = 2)
      : 0 === this.EffectState && (this.EffectState = 3);
  }
  UpdateEffect(t) {
    RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateEffect.Start(),
      this.DataCache.StatCharMaterialControlUpdate.Start(),
      this.IsDead && this.RequestEffectStateRevert(),
      3 !== this.EffectState &&
        (0 === this.EffectState
          ? (t.StateEnter(this), (this.EffectState = 1))
          : 2 === this.EffectState
            ? (t.StateRevert(this), (this.EffectState = 3))
            : t.StateUpdate(this)),
      this.DataCache.StatCharMaterialControlUpdate.Stop(),
      RenderModuleConfig_1.RenderStats.StatCharRenderingComponentRuntimeDataUpdateEffect.Stop();
  }
  Vlr(t) {
    var i = this.DataCache.DataLoopStart,
      h = this.DataCache.DataLoopTime;
    !this.ReadyToDie && this.WholeLoopTimeCounter <= i - t
      ? (0 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
        (this.InterpolateFactor.Type = 0))
      : !this.ReadyToDie && this.WholeLoopTimeCounter <= i + h - t
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
      var t = this.DataCache.WholeLoopTime - this.WholeLoopTimeCounter;
      if (t < this.DataCache.DataLoopEnd)
        return void (this.CurrentTimeCounter = this.DataCache.DataLoopEnd - t);
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetReadyToDie: End阶段的剩余时间小于End时间",
          ["leftTime", t],
          ["WholeLoopTimeCounter", this.WholeLoopTimeCounter],
          ["WholeLoopTime", this.DataCache.WholeLoopTime],
          ["DataLoopEnd", this.DataCache.DataLoopEnd],
        );
    }
    this.CurrentTimeCounter = 0;
  }
  SetProgress(t) {
    2 === this.DataCache.DataType &&
      ((t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
      (t = this.DataCache.WholeLoopTime * t),
      this.Hlr(t));
  }
  Hlr(t) {
    var i = this.DataCache.DataLoopStart,
      h = this.DataCache.DataLoopTime;
    t <= i
      ? ((this.InterpolateFactor.Type = 0),
        (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
          t,
          i,
        )))
      : t <= i + h
        ? ((this.InterpolateFactor.Type = 1),
          (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
            t - i,
            h,
          )))
        : t <= this.DataCache.WholeLoopTime &&
          ((this.InterpolateFactor.Type = 2),
          (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
            t - i - h,
            this.DataCache.DataLoopEnd,
          ))),
      (this.InterpolateFactor.Factor = MathUtils_1.MathUtils.Clamp(
        this.InterpolateFactor.Factor,
        0,
        1,
      ));
  }
  GetSpecifiedLoopTime(t) {
    switch (t) {
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
