"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialContainer = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Global_1 = require("../../../../Global"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig"),
  RenderUtil_1 = require("../../../Utils/RenderUtil"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase"),
  CharRenderingComponent_1 = require("../../Manager/CharRenderingComponent"),
  CharBodyInfo_1 = require("./CharBodyInfo");
class CharMaterialContainer extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.AllBodyInfoList = void 0),
      (this.ihr = ""),
      (this.xW = void 0);
  }
  Awake(e) {
    super.Awake(e);
    e = this.RenderComponent.GetOwner();
    if (e?.IsValid()) {
      (this.ihr = e.GetName()), (this.AllBodyInfoList = new Map());
      var t = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
        o = t.Num();
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          41,
          "CharMaterialContainer.Awake",
          ["Actor", this.ihr],
          ["skeletalCompsNum", o],
        );
      let r = !1;
      for (let e = 0; e < o; e++) {
        var n,
          i = t.Get(e);
        i?.IsValid()
          ? ((n = i.GetName()),
            i.SkeletalMesh?.IsValid()
              ? ((i = this.AddSkeletalComponent(i, n)),
                (r = r || i),
                i ||
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "RenderCharacter",
                      14,
                      "材质容器部位初始化失败",
                      ["Actor", this.ihr],
                      ["部位名称", n],
                    )))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderCharacter",
                  41,
                  "资产的SkeletalMeshComponent的SkeletalMesh为空",
                  ["Actor", this.ihr],
                  ["SkeletalName", n],
                ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              41,
              "材质容器初始化失败，组件不可用",
              ["Actor", this.ihr],
            );
      }
      this.OnInitSuccess(),
        r ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderCharacter",
              14,
              "无Mesh类型材质控制器初始化",
              ["Actor", this.ihr],
            ));
      this.ihr;
      this.xW = void 0;
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 14, "Actor 为空");
  }
  AddSkeletalComponent(e, r, t = !0) {
    var o, n;
    return r
      ? e
        ? e.GetOwner()
          ? e.SkeletalMesh
            ? ((o = e.bHiddenInGame),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "RenderCharacter",
                  41,
                  "AddSkeletalMeshComponent",
                  ["Actor", this.ihr],
                  ["SkeletalName", r],
                  ["isHidden", o],
                ),
              o && e.SetHiddenInGame(!1),
              (n = new CharBodyInfo_1.CharBodyInfo()).Init(
                this.ihr,
                r,
                e,
                t,
                this,
              ),
              this.AllBodyInfoList.set(r, n),
              o && e.SetHiddenInGame(!0),
              !0)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "RenderCharacter",
                  14,
                  "外部传入的SkeletalMeshComponent的SkeletalMesh为空",
                  ["Actor", this.ihr],
                  ["SkeletalName", r],
                ),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                41,
                "外部传入的SkeletalMeshComponent的Owner为空",
                ["Actor", this.ihr],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "外部传入了空的SkeletalMeshComponent",
              ["Actor", this.ihr],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderCharacter", 14, "角色骨骼名称错误", [
            "Actor",
            this.ihr,
          ]),
        !1);
  }
  RemoveSkeletalComponent(e) {
    return (
      !!this.AllBodyInfoList.has(e) && (this.AllBodyInfoList.delete(e), !0)
    );
  }
  ResetAllState() {
    for (const e of this.AllBodyInfoList.values()) e.ResetAllState();
  }
  UseAlphaTestCommon() {
    for (const e of this.AllBodyInfoList.values()) e.UseAlphaTestCommon();
  }
  RevertAlphaTestCommon() {
    for (const e of this.AllBodyInfoList.values()) e.RevertAlphaTestCommon();
  }
  SetColor(r, t, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= o &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var i = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < i.length; e++) {
        var a = this.AllBodyInfoList.get(i[e]);
        a && a.SetColor(r, t, n);
      }
    }
  }
  RevertColor(r, e = 0, t = -1, o = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < n.length; e++) {
        var i = this.AllBodyInfoList.get(n[e]);
        i && i.RevertColor(r, o);
      }
    }
  }
  SetFloat(r, t, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= o &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var i = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < i.length; e++) {
        var a = this.AllBodyInfoList.get(i[e]);
        a && a.SetFloat(r, t, n);
      }
    }
  }
  RevertFloat(r, e = 0, t = -1, o = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < n.length; e++) {
        var i = this.AllBodyInfoList.get(n[e]);
        i && i.RevertFloat(r, o);
      }
    }
  }
  SetTexture(r, t, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r) && void 0 !== t) {
      0 <= o &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var i = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < i.length; e++) {
        var a = this.AllBodyInfoList.get(i[e]);
        a && a.SetTexture(r, t, n);
      }
    }
  }
  RevertTexture(r, e = 0, t = -1, o = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < n.length; e++) {
        var i = this.AllBodyInfoList.get(n[e]);
        i && i.RevertTexture(r, o);
      }
    }
  }
  SetStarScarEnergy(e) {
    for (const r of this.AllBodyInfoList.values()) r.SetStarScarEnergy(e);
  }
  LateUpdate() {
    var e = this.GetRenderingComponent().GetCachedOwner();
    let r = void 0;
    if (e instanceof UE.Character && e !== Global_1.Global.BaseCharacter) {
      var t = e.GetVelocity().SizeSquared(),
        o =
          CharRenderingComponent_1.CharRenderingComponent.MotionVelocitySquared;
      r = 0;
      for (let e = o.length - 1; 0 <= e; e--)
        if (t > o[e]) {
          r =
            CharRenderingComponent_1.CharRenderingComponent
              .MotionMeshShadingRate[e];
          break;
        }
    }
    for (const n of this.AllBodyInfoList.values()) n.Update(r);
  }
  Destroy() {
    for (const e of this.AllBodyInfoList.values())
      e.SkeletalComp && e.SkeletalComp.IsValid() && e.Update();
    this.AllBodyInfoList.clear();
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialContainer;
  }
  GetStatName() {
    return "CharMaterialContainer";
  }
  StateEnter(e) {
    var r = e.DataCache;
    0 === r.MaterialModifyType
      ? (r.UseRim && this.ohr(e),
        r.UseDissolve && this.rhr(e),
        r.UseOutline && this.nhr(e),
        r.UseColor && this.shr(e),
        r.UseTextureSample && this.ahr(e),
        r.UseMotionOffset && this.hhr(e),
        r.UseDitherEffect && this.lhr(e))
      : 1 === r.MaterialModifyType && this._hr(e);
  }
  StateUpdate(e) {
    var r = e.DataCache;
    0 === r.MaterialModifyType
      ? (r.UseRim && this.uhr(e),
        r.UseDissolve && this.chr(e),
        r.UseOutline && this.mhr(e),
        r.UseColor && this.dhr(e),
        r.UseTextureSample && this.Chr(e),
        r.UseMotionOffset && this.ghr(e),
        r.UseDitherEffect && this.fhr(e),
        r.UseCustomMaterialEffect && this.phr(e))
      : 1 === r.MaterialModifyType && this.vhr(e);
  }
  StateRevert(e) {
    var r = e.DataCache;
    if (e.HasReverted)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "已经执行过Revert逻辑",
          ["Actor", this.ihr],
          ["DataAsset", r.DataName],
        );
    else if (
      ((e.HasReverted = !0),
      0 === r.MaterialModifyType
        ? (r.UseRim && this.Mhr(e),
          r.UseDissolve && this.Shr(e),
          r.UseOutline && this.Ehr(e),
          r.UseColor && this.yhr(e),
          r.UseTextureSample && this.Ihr(e),
          r.UseMotionOffset && this.Thr(e),
          r.UseDitherEffect && this.Lhr(e),
          r.UseCustomMaterialEffect && this.Dhr(e))
        : 1 === r.MaterialModifyType && this.Rhr(e),
      r.HiddenAfterEffect)
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("RenderCharacter", 41, "播放完效果后，隐藏mesh", [
          "DataAsset",
          r.DataName,
        ]);
      for (const o of e.SpecifiedMaterialIndexMap.keys()) {
        var t = this.AllBodyInfoList.get(o);
        t.SkeletalComp.IsValid() && t.SkeletalComp.SetHiddenInGame(!0);
      }
    }
  }
  _hr(r) {
    var t = r.DataCache;
    if (t.ReplaceMaterialInterface)
      if (
        ((r.ReplaceMaterial =
          UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
            this.GetRenderingComponent(),
            t.ReplaceMaterialInterface,
          )),
        r.ReplaceMaterial)
      ) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderCharacter",
            41,
            "材质替换",
            ["替换材质名称", t.DataName],
            ["是否永久性的", !t.RevertMaterial],
          );
        for (const e of r.SpecifiedMaterialIndexMap.keys()) {
          var o = r.SpecifiedMaterialIndexMap.get(e),
            n = this.AllBodyInfoList.get(e);
          for (let e = 0; e < o.length; e++) {
            var i = n.MaterialSlotList[o[e]];
            t.RevertMaterial
              ? i.SetReplaceMaterial(r.ReplaceMaterial)
              : i.SetDynamicMaterial(r.ReplaceMaterial);
          }
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "材质替换失败，不存在替换材质:",
            ["替换材质名称", t.DataName],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 14, "材质替换失败，不存在替换材质", [
          "替换材质名称",
          t.DataName,
        ]);
  }
  vhr(e) {
    var r = e.DataCache;
    if (r.UseParameterModify) {
      var t = e.ReplaceMaterial,
        o = e.InterpolateFactor;
      if (void 0 !== r.FloatParameterNames)
        for (let e = 0; e < r.FloatParameterNames.length; e++) {
          var n = RenderUtil_1.RenderUtil.GetFloatFromGroup(
            r.FloatParameterValues[e],
            o,
          );
          t.SetScalarParameterValue(r.FloatParameterNames[e], n);
        }
      if (void 0 !== r.ColorParameterNames)
        for (let e = 0; e < r.ColorParameterNames.length; e++) {
          var i = RenderUtil_1.RenderUtil.GetColorFromGroup(
            r.ColorParameterValues[e],
            o,
          );
          t.SetVectorParameterValue(r.ColorParameterNames[e], i);
        }
    }
  }
  Rhr(r) {
    if (r.DataCache.RevertMaterial) {
      for (const e of r.SpecifiedMaterialIndexMap.keys()) {
        var t = r.SpecifiedMaterialIndexMap.get(e),
          o = this.AllBodyInfoList.get(e);
        for (let e = 0; e < t.length; e++)
          o.MaterialSlotList[t[e]].RevertReplaceMaterial(r.ReplaceMaterial);
      }
      r.ReplaceMaterial = void 0;
    }
  }
  ohr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      if (r) o.UseBattleCommon();
      else
        for (let e = 0; e < t.length; e++) {
          var n = o.MaterialSlotList[t[e]];
          n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            o.UseBattle(n.SectionIndex);
        }
    }
  }
  uhr(e) {
    var r = e.DataCache,
      t = e.InterpolateFactor,
      o = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.RimRange, t),
      n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.RimColor, t),
      i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.RimIntensity, t);
    for (const d of e.SpecifiedMaterialIndexMap.keys()) {
      var a = e.SpecifiedMaterialIndexMap.get(d),
        f = this.AllBodyInfoList.get(d);
      for (let e = 0; e < a.length; e++) {
        var _ = f.MaterialSlotList[a[e]];
        _.SetFloat(RenderConfig_1.RenderConfig.UseRim, 1),
          _.SetFloat(RenderConfig_1.RenderConfig.RimUseTex, r.RimUseTex),
          _.SetColor(RenderConfig_1.RenderConfig.RimChannel, r.RimChannel),
          _.SetFloat(RenderConfig_1.RenderConfig.RimRange, o),
          _.SetColor(RenderConfig_1.RenderConfig.RimColor, n),
          _.SetFloat(RenderConfig_1.RenderConfig.RimIntensity, i);
      }
    }
  }
  Mhr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      r && o.RevertBattleCommon();
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.UseRim),
          n.RevertProperty(RenderConfig_1.RenderConfig.RimUseTex),
          n.RevertProperty(RenderConfig_1.RenderConfig.RimChannel),
          n.RevertProperty(RenderConfig_1.RenderConfig.RimRange),
          n.RevertProperty(RenderConfig_1.RenderConfig.RimColor),
          n.RevertProperty(RenderConfig_1.RenderConfig.RimIntensity),
          r ||
            n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            o.RevertBattle(n.SectionIndex);
      }
    }
  }
  rhr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      if (r) o.UseBattleMaskCommon();
      else
        for (let e = 0; e < t.length; e++) {
          var n = o.MaterialSlotList[t[e]];
          n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            o.UseBattleMask(n.SectionIndex);
        }
    }
  }
  chr(e) {
    var r = e.DataCache,
      t = e.InterpolateFactor,
      o = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveProgress, t),
      n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveSmooth, t),
      i = RenderUtil_1.RenderUtil.GetFloatFromGroup(
        r.DissolveColorIntensity,
        t,
      ),
      a = RenderUtil_1.RenderUtil.GetColorFromGroup(r.DissolveColor, t);
    for (const s of e.SpecifiedMaterialIndexMap.keys()) {
      var f = e.SpecifiedMaterialIndexMap.get(s),
        _ = this.AllBodyInfoList.get(s);
      for (let e = 0; e < f.length; e++) {
        var d = _.MaterialSlotList[f[e]];
        d.SetFloat(RenderConfig_1.RenderConfig.UseDissolve, 1),
          d.SetColor(
            RenderConfig_1.RenderConfig.DissolveChannelSwitch,
            r.DissolveChannel,
          ),
          d.SetFloat(RenderConfig_1.RenderConfig.DissolveProgress, o),
          d.SetFloat(RenderConfig_1.RenderConfig.DissolveSmooth, n),
          d.SetFloat(RenderConfig_1.RenderConfig.DissolveMulti, i),
          d.SetColor(RenderConfig_1.RenderConfig.DissolveEmission, a);
      }
    }
  }
  Shr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      r && o.RevertBattleMaskCommon();
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.UseDissolve),
          n.RevertProperty(RenderConfig_1.RenderConfig.DissolveChannelSwitch),
          n.RevertProperty(RenderConfig_1.RenderConfig.DissolveProgress),
          n.RevertProperty(RenderConfig_1.RenderConfig.DissolveSmooth),
          n.RevertProperty(RenderConfig_1.RenderConfig.DissolveMulti),
          n.RevertProperty(RenderConfig_1.RenderConfig.DissolveEmission),
          r ||
            n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            o.RevertBattleMask(n.SectionIndex);
      }
    }
  }
  nhr(e) {
    if (e.DataCache.UseOuterOutlineEffect) {
      var r = e.SelectedAllParts;
      for (const i of e.SpecifiedMaterialIndexMap.keys()) {
        var t = e.SpecifiedMaterialIndexMap.get(i),
          o = this.AllBodyInfoList.get(i);
        if (r) o.UseOutlineStencilTestCommon();
        else
          for (let e = 0; e < t.length; e++) {
            var n = o.MaterialSlotList[t[e]];
            n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
              o.UseOutlineStencilTest(n.SectionIndex);
          }
      }
    }
  }
  mhr(e) {
    var r = e.DataCache,
      t = e.InterpolateFactor,
      o = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.OutlineWidth, t),
      n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.OutlineColor, t),
      i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.OutlineIntensity, t);
    for (const d of e.SpecifiedMaterialIndexMap.keys()) {
      var a = e.SpecifiedMaterialIndexMap.get(d),
        f = this.AllBodyInfoList.get(d);
      for (let e = 0; e < a.length; e++) {
        var _ = f.MaterialSlotList[a[e]];
        _.SetFloat(RenderConfig_1.RenderConfig.OutlineUseTex, r.OutlineUseTex),
          _.SetFloat(RenderConfig_1.RenderConfig.OutlineWidth, o),
          _.SetColor(RenderConfig_1.RenderConfig.OutlineColor, n),
          _.SetFloat(RenderConfig_1.RenderConfig.OutlineColorIntensity, i);
      }
    }
  }
  Ehr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      r && o.RevertOutlineStencilTestCommon();
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.OutlineUseTex),
          n.RevertProperty(RenderConfig_1.RenderConfig.OutlineWidth),
          n.RevertProperty(RenderConfig_1.RenderConfig.OutlineColor),
          n.RevertProperty(RenderConfig_1.RenderConfig.OutlineColorIntensity),
          r ||
            n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            o.RevertOutlineStencilTest(n.SectionIndex);
      }
    }
  }
  shr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      if (r) o.UseBattleCommon();
      else
        for (let e = 0; e < t.length; e++) {
          var n = o.MaterialSlotList[t[e]];
          n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            o.UseBattle(n.SectionIndex);
        }
    }
  }
  dhr(e) {
    var r = e.DataCache;
    if (r.UseColor) {
      var t = e.InterpolateFactor,
        o = RenderUtil_1.RenderUtil.GetColorFromGroup(r.BaseColor, t),
        n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.EmissionColor, t),
        i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.EmissionIntensity, t),
        a = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.BaseColorIntensity, t);
      for (const s of e.SpecifiedMaterialIndexMap.keys()) {
        var f = e.SpecifiedMaterialIndexMap.get(s),
          _ = this.AllBodyInfoList.get(s);
        for (let e = 0; e < f.length; e++) {
          var d = _.MaterialSlotList[f[e]];
          d.SetFloat(RenderConfig_1.RenderConfig.BaseUseTex, r.BaseUseTex),
            d.SetColor(RenderConfig_1.RenderConfig.BaseColor, o),
            d.SetFloat(RenderConfig_1.RenderConfig.BaseColorIntensity, a),
            d.SetFloat(
              RenderConfig_1.RenderConfig.EmissionUseTex,
              r.EmissionUseTex,
            ),
            d.SetColor(RenderConfig_1.RenderConfig.EmissionColor, n),
            d.SetFloat(RenderConfig_1.RenderConfig.EmissionIntensity, i);
        }
      }
    }
  }
  yhr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      r && o.RevertBattleCommon();
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.BaseUseTex),
          n.RevertProperty(RenderConfig_1.RenderConfig.BaseColor),
          n.RevertProperty(RenderConfig_1.RenderConfig.BaseColorIntensity),
          n.RevertProperty(RenderConfig_1.RenderConfig.EmissionUseTex),
          n.RevertProperty(RenderConfig_1.RenderConfig.EmissionColor),
          n.RevertProperty(RenderConfig_1.RenderConfig.EmissionIntensity),
          r ||
            n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            o.RevertBattle(n.SectionIndex);
      }
    }
  }
  ahr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      if (r) o.UseBattleCommon();
      else
        for (let e = 0; e < t.length; e++) {
          var n = o.MaterialSlotList[t[e]];
          n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            o.UseBattle(n.SectionIndex);
        }
    }
  }
  Chr(e) {
    var r = e.DataCache,
      t = e.InterpolateFactor,
      o = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureScaleAndOffset, t),
      n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureSpeed, t),
      i = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureColorTint, t),
      a = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.Rotation, t),
      f = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.TextureMaskRange, t),
      _ = r.MaskTexture;
    for (const C of e.SpecifiedMaterialIndexMap.keys()) {
      var d = e.SpecifiedMaterialIndexMap.get(C),
        s = this.AllBodyInfoList.get(C);
      for (let e = 0; e < d.length; e++) {
        var R = s.MaterialSlotList[d[e]];
        R.SetFloat(RenderConfig_1.RenderConfig.UseTexture, 1),
          R.SetFloat(
            RenderConfig_1.RenderConfig.TextureUseMask,
            r.UseAlphaToMask,
          ),
          R.SetFloat(RenderConfig_1.RenderConfig.TextureMaskRange, f),
          R.SetColor(RenderConfig_1.RenderConfig.TextureScaleAndOffset, o),
          R.SetColor(RenderConfig_1.RenderConfig.TextureSpeed, n),
          R.SetColor(RenderConfig_1.RenderConfig.TextureColor, i),
          R.SetFloat(RenderConfig_1.RenderConfig.TextureRotation, a),
          R.SetFloat(
            RenderConfig_1.RenderConfig.TextureUseScreenUv,
            r.UseScreenUv,
          ),
          _ && R.SetTexture(RenderConfig_1.RenderConfig.NoiseTexture, _),
          R.SetColor(
            RenderConfig_1.RenderConfig.TextureUvSwitch,
            r.UvSelection,
          );
      }
    }
  }
  Ihr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      r && o.RevertBattleCommon();
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.UseTexture),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureUseScreenUv),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureUseMask),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureMaskRange),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureUvSwitch),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureScaleAndOffset),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureSpeed),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureColor),
          n.RevertProperty(RenderConfig_1.RenderConfig.TextureRotation),
          n.RevertProperty(RenderConfig_1.RenderConfig.NoiseTexture),
          r ||
            n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            o.RevertBattle(n.SectionIndex);
      }
    }
  }
  hhr(e) {
    for (const t of e.SpecifiedMaterialIndexMap.keys()) {
      var r = this.AllBodyInfoList.get(t);
      if (r.SkeletalComp?.IsValid()) {
        (e.TargetSkeletalMesh = r.SkeletalComp),
          (e.MotionStartLocation = e.TargetSkeletalMesh.GetSocketLocation(
            RenderConfig_1.RenderConfig.RootName,
          )),
          void 0 === e.MotionEndLocation &&
            (e.MotionEndLocation = new Array(3));
        break;
      }
    }
  }
  ghr(e) {
    var r = e.DataCache;
    if (e.TargetSkeletalMesh) {
      var t = e.InterpolateFactor,
        o = Math.pow(t.Factor, r.MotionOffsetLength),
        n = e.TargetSkeletalMesh.GetSocketLocation(
          RenderConfig_1.RenderConfig.RootName,
        ),
        o =
          (RenderUtil_1.RenderUtil.LerpVector(
            e.MotionStartLocation,
            n,
            o,
            e.MotionEndLocation,
          ),
          e.MotionEndLocation[0] - n.X),
        i = e.MotionEndLocation[1] - n.Y,
        n = e.MotionEndLocation[2] - n.Z,
        a = Math.sqrt(o * o + i * i + n * n),
        f = new UE.LinearColor(o, i, n, a),
        _ = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.MotionNoiseSpeed, t);
      for (const C of e.SpecifiedMaterialIndexMap.keys()) {
        var d = e.SpecifiedMaterialIndexMap.get(C),
          s = this.AllBodyInfoList.get(C);
        for (let e = 0; e < d.length; e++) {
          var R = s.MaterialSlotList[d[e]];
          R.SetFloat(
            RenderConfig_1.RenderConfig.MotionRange,
            r.MotionAffectVertexRange,
          ),
            R.SetColor(RenderConfig_1.RenderConfig.MotionOffset, f),
            R.SetFloat(RenderConfig_1.RenderConfig.MotionNoiseSpeed, _);
        }
      }
    }
  }
  Thr(e) {
    for (const n of e.SpecifiedMaterialIndexMap.keys()) {
      var r = e.SpecifiedMaterialIndexMap.get(n),
        t = this.AllBodyInfoList.get(n);
      for (let e = 0; e < r.length; e++) {
        var o = t.MaterialSlotList[r[e]];
        o.RevertProperty(RenderConfig_1.RenderConfig.MotionRange),
          o.RevertProperty(RenderConfig_1.RenderConfig.MotionOffset),
          o.RevertProperty(RenderConfig_1.RenderConfig.MotionNoiseSpeed);
      }
    }
  }
  lhr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      if (r) o.UseAlphaTestCommon();
      else
        for (let e = 0; e < t.length; e++) {
          var n = o.MaterialSlotList[t[e]];
          n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            o.UseAlphaTest(n.SectionIndex);
        }
    }
  }
  fhr(e) {
    var r = e.DataCache,
      t = e.InterpolateFactor,
      o = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DitherValue, t);
    for (const f of e.SpecifiedMaterialIndexMap.keys()) {
      var n = e.SpecifiedMaterialIndexMap.get(f),
        i = this.AllBodyInfoList.get(f);
      for (let e = 0; e < n.length; e++) {
        var a = i.MaterialSlotList[n[e]];
        a.SetFloat(RenderConfig_1.RenderConfig.UseDitherEffect2, 1),
          a.SetFloat(RenderConfig_1.RenderConfig.DitherValue2, o);
      }
    }
  }
  Lhr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      r && o.RevertAlphaTestCommon();
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.DitherValue2),
          n.RevertProperty(RenderConfig_1.RenderConfig.UseDitherEffect2),
          r ||
            n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            o.RevertAlphaTest(n.SectionIndex);
      }
    }
  }
  phr(e) {
    var r = e.DataCache,
      t = e.InterpolateFactor;
    for (const d of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(d),
        n = this.AllBodyInfoList.get(d);
      for (let e = 0; e < o.length; e++) {
        var i = n.MaterialSlotList[o[e]];
        if (void 0 !== r.CustomTextureParameterNames)
          for (let e = 0; e < r.CustomTextureParameterNames.length; e++) {
            var a = RenderUtil_1.RenderUtil.GetTextureFromGroup(
              r.CustomTextureParameterValues[e],
              t,
            );
            a && i.SetTexture(r.CustomTextureParameterNames[e], a);
          }
        if (void 0 !== r.CustomFloatParameterNames)
          for (let e = 0; e < r.CustomFloatParameterNames.length; e++) {
            var f = RenderUtil_1.RenderUtil.GetFloatFromGroup(
              r.CustomFloatParameterValues[e],
              t,
            );
            i.SetFloat(r.CustomFloatParameterNames[e], f);
          }
        if (void 0 !== r.CustomColorParameterNames)
          for (let e = 0; e < r.CustomColorParameterNames.length; e++) {
            var _ = RenderUtil_1.RenderUtil.GetColorFromGroup(
              r.CustomColorParameterValues[e],
              t,
            );
            i.SetColor(r.CustomColorParameterNames[e], _);
          }
      }
    }
  }
  Dhr(e) {
    var r = e.DataCache;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(i),
        o = this.AllBodyInfoList.get(i);
      for (let e = 0; e < t.length; e++) {
        var n = o.MaterialSlotList[t[e]];
        if (void 0 !== r.CustomTextureParameterNames)
          for (let e = 0; e < r.CustomTextureParameterNames.length; e++)
            n.RevertProperty(r.CustomTextureParameterNames[e]);
        if (void 0 !== r.CustomFloatParameterNames)
          for (let e = 0; e < r.CustomFloatParameterNames.length; e++)
            n.RevertProperty(r.CustomFloatParameterNames[e]);
        if (void 0 !== r.CustomColorParameterNames)
          for (let e = 0; e < r.CustomColorParameterNames.length; e++)
            n.RevertProperty(r.CustomColorParameterNames[e]);
      }
    }
  }
}
exports.CharMaterialContainer = CharMaterialContainer;
//# sourceMappingURL=CharMaterialContainer.js.map
