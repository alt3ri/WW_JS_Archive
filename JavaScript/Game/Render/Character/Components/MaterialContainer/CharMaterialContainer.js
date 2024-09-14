"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialContainer = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
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
      (this.Zhr = ""),
      (this.Cha = new Array()),
      (this.xW = void 0),
      (this.q3a = 0);
  }
  static GetMaxUpdateParamsPerFrame() {
    return (
      CharMaterialContainer.G3a < 0 &&
        (CharMaterialContainer.G3a = Info_1.Info.IsGameRunning()
          ? GlobalData_1.GlobalData.IsEs3
            ? 16
            : 32
          : 9999),
      CharMaterialContainer.G3a
    );
  }
  Awake(e) {
    super.Awake(e);
    e = this.RenderComponent.GetOwner();
    if (e?.IsValid()) {
      (this.Zhr = e.GetName()), (this.AllBodyInfoList = new Map());
      var o = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
        n = o.Num();
      let r = !1;
      for (let e = 0; e < n; e++) {
        var t,
          i = o.Get(e);
        i?.IsValid()
          ? ((t = i.GetName()),
            i.SkeletalMesh?.IsValid()
              ? ((i = this.AddSkeletalComponent(i, t)),
                (r = r || i),
                i ||
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "RenderCharacter",
                      14,
                      "材质容器部位初始化失败",
                      ["Actor", this.Zhr],
                      ["部位名称", t],
                    )))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderCharacter",
                  41,
                  "资产的SkeletalMeshComponent的SkeletalMesh为空",
                  ["Actor", this.Zhr],
                  ["SkeletalName", t],
                ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              41,
              "材质容器初始化失败，组件不可用",
              ["Actor", this.Zhr],
            );
      }
      this.OnInitSuccess(),
        r ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderCharacter",
              14,
              "无Mesh类型材质控制器初始化",
              ["Actor", this.Zhr],
            ));
      e = "Render_CharMaterialContainer_" + this.Zhr;
      this.xW = Stats_1.Stat.Create(e);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 14, "Actor 为空");
  }
  AddSkeletalComponent(e, r, o = !0) {
    var n, t;
    return r
      ? e
        ? e.GetOwner()
          ? e.SkeletalMesh
            ? ((n = e.bHiddenInGame),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "RenderCharacter",
                  41,
                  "AddSkeletalMeshComponent",
                  ["Actor", this.Zhr],
                  ["SkeletalName", r],
                  ["SkeletalComponent", e.SkeletalMesh.GetName()],
                  ["isHidden", n],
                ),
              n && e.SetHiddenInGame(!1),
              (t = new CharBodyInfo_1.CharBodyInfo()).Init(
                this.Zhr,
                r,
                e,
                o,
                this,
              ),
              this.AllBodyInfoList.set(r, t),
              n && e.SetHiddenInGame(!0),
              !0)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "RenderCharacter",
                  14,
                  "外部传入的SkeletalMeshComponent的SkeletalMesh为空",
                  ["Actor", this.Zhr],
                  ["SkeletalName", r],
                ),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                41,
                "外部传入的SkeletalMeshComponent的Owner为空",
                ["Actor", this.Zhr],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "外部传入了空的SkeletalMeshComponent",
              ["Actor", this.Zhr],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderCharacter", 14, "角色骨骼名称错误", [
            "Actor",
            this.Zhr,
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
  SetColor(r, o, e = 0, n = -1, t = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= n &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var i = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < i.length; e++) {
        var a = this.AllBodyInfoList.get(i[e]);
        a && a.SetColor(r, o, t);
      }
    }
  }
  RevertColor(r, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= o &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        i && i.RevertColor(r, n);
      }
    }
  }
  SetFloat(r, o, e = 0, n = -1, t = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= n &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var i = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < i.length; e++) {
        var a = this.AllBodyInfoList.get(i[e]);
        a && a.SetFloat(r, o, t);
      }
    }
  }
  RevertFloat(r, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= o &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        i && i.RevertFloat(r, n);
      }
    }
  }
  SetTexture(r, o, e = 0, n = -1, t = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r) && void 0 !== o) {
      0 <= n &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var i = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < i.length; e++) {
        var a = this.AllBodyInfoList.get(i[e]);
        a && a.SetTexture(r, o, t);
      }
    }
  }
  RevertTexture(r, e = 0, o = -1, n = 0) {
    if (!FNameUtil_1.FNameUtil.IsEmpty(r)) {
      0 <= o &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          41,
          "SetColor: 不支持指定SectionIndex",
        );
      var t = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(e);
      for (let e = 0; e < t.length; e++) {
        var i = this.AllBodyInfoList.get(t[e]);
        i && i.RevertTexture(r, n);
      }
    }
  }
  SetStarScarEnergy(e) {
    for (const r of this.AllBodyInfoList.values()) r.SetStarScarEnergy(e);
  }
  LateUpdate() {
    this.xW.Start(), ++this.q3a;
    var e = this.GetRenderingComponent().GetCachedOwner();
    let r = void 0;
    if (e instanceof UE.Character && e !== Global_1.Global.BaseCharacter) {
      var o = e.GetVelocity().SizeSquared(),
        n =
          CharRenderingComponent_1.CharRenderingComponent.MotionVelocitySquared;
      r = 0;
      for (let e = n.length - 1; 0 <= e; e--)
        if (o > n[e]) {
          r =
            CharRenderingComponent_1.CharRenderingComponent
              .MotionMeshShadingRate[e];
          break;
        }
    }
    var t = [];
    for (const a of this.AllBodyInfoList.values())
      for (let e = 0; e <= t.length; ++e) {
        if (e === t.length) {
          t.push(a);
          break;
        }
        if (t[e].LastUpdateCounter > a.LastUpdateCounter) {
          t.splice(e, 0, a);
          break;
        }
      }
    let i = 0;
    for (const f of t)
      if (
        ((i += f.Update(r)),
        (f.LastUpdateCounter = this.q3a),
        i > CharMaterialContainer.GetMaxUpdateParamsPerFrame())
      )
        break;
    this.xW.Stop();
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
    (e.HasReverted = !1),
      0 === r.MaterialModifyType
        ? (r.UseRim && this.elr(e),
          r.UseDissolve && this.tlr(e),
          r.UseOutline && this.ilr(e),
          r.UseColor && this.olr(e),
          r.UseTextureSample && this.rlr(e),
          r.UseMotionOffset && this.nlr(e),
          r.UseDitherEffect && this.slr(e))
        : 1 === r.MaterialModifyType && this.alr(e);
  }
  StateUpdate(e) {
    var r = e.DataCache;
    0 === r.MaterialModifyType
      ? (r.UseRim && this.hlr(e),
        r.UseDissolve && this.llr(e),
        r.UseOutline && this._lr(e),
        r.UseColor && this.ulr(e),
        r.UseTextureSample && this.clr(e),
        r.UseMotionOffset && this.mlr(e),
        r.UseDitherEffect && this.dlr(e),
        r.UseCustomMaterialEffect && this.Clr(e))
      : 1 === r.MaterialModifyType && this.glr(e);
  }
  StateRevert(e) {
    var r = e.DataCache;
    if (e.HasReverted)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "已经执行过Revert逻辑",
          ["Actor", this.Zhr],
          ["DataAsset", r.DataName],
        );
    else if (
      ((e.HasReverted = !0),
      0 === r.MaterialModifyType
        ? (r.UseRim && this.flr(e),
          r.UseDissolve && this.plr(e),
          r.UseOutline && this.vlr(e),
          r.UseColor && this.Mlr(e),
          r.UseTextureSample && this.Elr(e),
          r.UseMotionOffset && this.Slr(e),
          r.UseDitherEffect && this.ylr(e),
          r.UseCustomMaterialEffect && this.Ilr(e))
        : 1 === r.MaterialModifyType && this.Tlr(e),
      r.HiddenAfterEffect)
    ) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("RenderCharacter", 41, "播放完效果后，隐藏mesh", [
          "DataAsset",
          r.DataName,
        ]);
      for (const n of e.SpecifiedMaterialIndexMap.keys()) {
        var o = this.AllBodyInfoList.get(n);
        o.SkeletalComp.IsValid() && o.SkeletalComp.SetHiddenInGame(!0);
      }
    }
  }
  alr(r) {
    var o = r.DataCache;
    if (o.ReplaceMaterialInterface)
      if (
        (RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Start(),
        (r.ReplaceMaterial =
          UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
            this.GetRenderingComponent(),
            o.ReplaceMaterialInterface,
          )),
        r.ReplaceMaterial)
      ) {
        this.Cha.length = 0;
        for (const e of r.SpecifiedMaterialIndexMap.keys()) {
          var n = r.SpecifiedMaterialIndexMap.get(e),
            t = this.AllBodyInfoList.get(e);
          this.Cha.push(e);
          for (let e = 0; e < n.length; e++) {
            var i = t.MaterialSlotList[n[e]];
            o.RevertMaterial
              ? i.SetReplaceMaterial(r.ReplaceMaterial)
              : i.SetDynamicMaterial(r.ReplaceMaterial);
          }
        }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderCharacter",
            41,
            "材质替换",
            ["Actor", this.Zhr],
            ["替换材质名称", o.DataName],
            ["材质名称", r.ReplaceMaterial?.GetName()],
            ["是否永久性的", !o.RevertMaterial],
            ["body array", this.Cha.join()],
          ),
          RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Stop();
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "材质替换失败，不存在替换材质:",
            ["替换材质名称", o.DataName],
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderCharacter", 14, "材质替换失败，不存在替换材质", [
          "替换材质名称",
          o.DataName,
        ]);
  }
  glr(e) {
    var r = e.DataCache;
    if (r.UseParameterModify) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Start();
      var o = e.ReplaceMaterial,
        n = e.InterpolateFactor;
      if (void 0 !== r.FloatParameterNames)
        for (let e = 0; e < r.FloatParameterNames.length; e++) {
          var t = RenderUtil_1.RenderUtil.GetFloatFromGroup(
            r.FloatParameterValues[e],
            n,
          );
          o.SetScalarParameterValue(r.FloatParameterNames[e], t);
        }
      if (void 0 !== r.ColorParameterNames)
        for (let e = 0; e < r.ColorParameterNames.length; e++) {
          var i = RenderUtil_1.RenderUtil.GetColorFromGroup(
            r.ColorParameterValues[e],
            n,
          );
          o.SetVectorParameterValue(r.ColorParameterNames[e], i);
        }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Stop();
    }
  }
  Tlr(o) {
    var e = o.DataCache;
    if (e.RevertMaterial) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Start();
      let r = !1;
      for (const i of o.SpecifiedMaterialIndexMap.keys()) {
        var n = o.SpecifiedMaterialIndexMap.get(i),
          t = this.AllBodyInfoList.get(i);
        for (let e = 0; e < n.length; e++)
          t.MaterialSlotList[n[e]].RevertReplaceMaterial(o.ReplaceMaterial) ||
            (r = !0);
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          41,
          "材质替换Revert",
          ["Actor", this.Zhr],
          ["替换材质名称", e.DataName],
          ["材质名称", o.ReplaceMaterial?.GetName()],
          ["是否永久性的", !e.RevertMaterial],
          ["MaterialMiss", r],
        ),
        (o.ReplaceMaterial = void 0),
        RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMaterialReplace.Stop();
    }
  }
  elr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      if (r) n.UseBattleCommon();
      else
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            n.UseBattle(t.SectionIndex);
        }
    }
  }
  hlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Start();
    var r = e.DataCache,
      o = e.InterpolateFactor,
      n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.RimRange, o),
      t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.RimColor, o),
      i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.RimIntensity, o);
    for (const _ of e.SpecifiedMaterialIndexMap.keys()) {
      var a = e.SpecifiedMaterialIndexMap.get(_),
        f = this.AllBodyInfoList.get(_);
      for (let e = 0; e < a.length; e++) {
        var d = f.MaterialSlotList[a[e]];
        d.SetFloat(RenderConfig_1.RenderConfig.UseRim, 1),
          d.SetFloat(RenderConfig_1.RenderConfig.RimUseTex, r.RimUseTex),
          d.SetColor(RenderConfig_1.RenderConfig.RimChannel, r.RimChannel),
          d.SetFloat(RenderConfig_1.RenderConfig.RimRange, n),
          d.SetColor(RenderConfig_1.RenderConfig.RimColor, t),
          d.SetFloat(RenderConfig_1.RenderConfig.RimIntensity, i);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Stop();
  }
  flr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      r && n.RevertBattleCommon();
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.UseRim),
          t.RevertProperty(RenderConfig_1.RenderConfig.RimUseTex),
          t.RevertProperty(RenderConfig_1.RenderConfig.RimChannel),
          t.RevertProperty(RenderConfig_1.RenderConfig.RimRange),
          t.RevertProperty(RenderConfig_1.RenderConfig.RimColor),
          t.RevertProperty(RenderConfig_1.RenderConfig.RimIntensity),
          r ||
            t.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            n.RevertBattle(t.SectionIndex);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateRim.Stop();
  }
  tlr(e) {
    var r = e.SelectedAllParts;
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Start();
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      if (r) n.UseBattleMaskCommon();
      else
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            n.UseBattleMask(t.SectionIndex);
        }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Stop();
  }
  llr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Start();
    var r = e.DataCache,
      o = e.InterpolateFactor,
      n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveProgress, o),
      t = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DissolveSmooth, o),
      i = RenderUtil_1.RenderUtil.GetFloatFromGroup(
        r.DissolveColorIntensity,
        o,
      ),
      a = RenderUtil_1.RenderUtil.GetColorFromGroup(r.DissolveColor, o);
    for (const C of e.SpecifiedMaterialIndexMap.keys()) {
      var f = e.SpecifiedMaterialIndexMap.get(C),
        d = this.AllBodyInfoList.get(C);
      for (let e = 0; e < f.length; e++) {
        var _ = d.MaterialSlotList[f[e]];
        _.SetFloat(RenderConfig_1.RenderConfig.UseDissolve, 1),
          _.SetColor(
            RenderConfig_1.RenderConfig.DissolveChannelSwitch,
            r.DissolveChannel,
          ),
          _.SetFloat(RenderConfig_1.RenderConfig.DissolveProgress, n),
          _.SetFloat(RenderConfig_1.RenderConfig.DissolveSmooth, t),
          _.SetFloat(RenderConfig_1.RenderConfig.DissolveMulti, i),
          _.SetColor(RenderConfig_1.RenderConfig.DissolveEmission, a);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Stop();
  }
  plr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      r && n.RevertBattleMaskCommon();
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.UseDissolve),
          t.RevertProperty(RenderConfig_1.RenderConfig.DissolveChannelSwitch),
          t.RevertProperty(RenderConfig_1.RenderConfig.DissolveProgress),
          t.RevertProperty(RenderConfig_1.RenderConfig.DissolveSmooth),
          t.RevertProperty(RenderConfig_1.RenderConfig.DissolveMulti),
          t.RevertProperty(RenderConfig_1.RenderConfig.DissolveEmission),
          r ||
            t.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            n.RevertBattleMask(t.SectionIndex);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDissolve.Stop();
  }
  ilr(e) {
    if (e.DataCache.UseOuterOutlineEffect) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Start();
      var r = e.SelectedAllParts;
      for (const i of e.SpecifiedMaterialIndexMap.keys()) {
        var o = e.SpecifiedMaterialIndexMap.get(i),
          n = this.AllBodyInfoList.get(i);
        if (r) n.UseOutlineStencilTestCommon();
        else
          for (let e = 0; e < o.length; e++) {
            var t = n.MaterialSlotList[o[e]];
            t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
              n.UseOutlineStencilTest(t.SectionIndex);
          }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Stop();
    }
  }
  _lr(e) {
    var r = e.DataCache,
      o = e.InterpolateFactor,
      n =
        (RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Start(),
        RenderUtil_1.RenderUtil.GetFloatFromGroup(r.OutlineWidth, o)),
      t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.OutlineColor, o),
      i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.OutlineIntensity, o);
    for (const _ of e.SpecifiedMaterialIndexMap.keys()) {
      var a = e.SpecifiedMaterialIndexMap.get(_),
        f = this.AllBodyInfoList.get(_);
      for (let e = 0; e < a.length; e++) {
        var d = f.MaterialSlotList[a[e]];
        d.SetFloat(RenderConfig_1.RenderConfig.OutlineUseTex, r.OutlineUseTex),
          d.SetFloat(RenderConfig_1.RenderConfig.OutlineWidth, n),
          d.SetColor(RenderConfig_1.RenderConfig.OutlineColor, t),
          d.SetFloat(RenderConfig_1.RenderConfig.OutlineColorIntensity, i);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Stop();
  }
  vlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      r && n.RevertOutlineStencilTestCommon();
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.OutlineUseTex),
          t.RevertProperty(RenderConfig_1.RenderConfig.OutlineWidth),
          t.RevertProperty(RenderConfig_1.RenderConfig.OutlineColor),
          t.RevertProperty(RenderConfig_1.RenderConfig.OutlineColorIntensity),
          r ||
            t.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            n.RevertOutlineStencilTest(t.SectionIndex);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateOutline.Stop();
  }
  olr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      if (r) n.UseBattleCommon();
      else
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            n.UseBattle(t.SectionIndex);
        }
    }
  }
  ulr(e) {
    var r = e.DataCache;
    if (r.UseColor) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Start();
      var o = e.InterpolateFactor,
        n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.BaseColor, o),
        t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.EmissionColor, o),
        i = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.EmissionIntensity, o),
        a = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.BaseColorIntensity, o);
      for (const C of e.SpecifiedMaterialIndexMap.keys()) {
        var f = e.SpecifiedMaterialIndexMap.get(C),
          d = this.AllBodyInfoList.get(C);
        for (let e = 0; e < f.length; e++) {
          var _ = d.MaterialSlotList[f[e]];
          _.SetFloat(RenderConfig_1.RenderConfig.BaseUseTex, r.BaseUseTex),
            _.SetColor(RenderConfig_1.RenderConfig.BaseColor, n),
            _.SetFloat(RenderConfig_1.RenderConfig.BaseColorIntensity, a),
            _.SetFloat(
              RenderConfig_1.RenderConfig.EmissionUseTex,
              r.EmissionUseTex,
            ),
            _.SetColor(RenderConfig_1.RenderConfig.EmissionColor, t),
            _.SetFloat(RenderConfig_1.RenderConfig.EmissionIntensity, i);
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Stop();
    }
  }
  Mlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      r && n.RevertBattleCommon();
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.BaseUseTex),
          t.RevertProperty(RenderConfig_1.RenderConfig.BaseColor),
          t.RevertProperty(RenderConfig_1.RenderConfig.BaseColorIntensity),
          t.RevertProperty(RenderConfig_1.RenderConfig.EmissionUseTex),
          t.RevertProperty(RenderConfig_1.RenderConfig.EmissionColor),
          t.RevertProperty(RenderConfig_1.RenderConfig.EmissionIntensity),
          r ||
            t.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            n.RevertBattle(t.SectionIndex);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateModifyOtherParameters.Stop();
  }
  rlr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      if (r) n.UseBattleCommon();
      else
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            n.UseBattle(t.SectionIndex);
        }
    }
  }
  clr(e) {
    var r = e.DataCache,
      o =
        (RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Start(),
        e.InterpolateFactor),
      n = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureScaleAndOffset, o),
      t = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureSpeed, o),
      i = RenderUtil_1.RenderUtil.GetColorFromGroup(r.TextureColorTint, o),
      a = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.Rotation, o),
      f = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.TextureMaskRange, o),
      d = r.MaskTexture;
    for (const l of e.SpecifiedMaterialIndexMap.keys()) {
      var _ = e.SpecifiedMaterialIndexMap.get(l),
        C = this.AllBodyInfoList.get(l);
      for (let e = 0; e < _.length; e++) {
        var R = C.MaterialSlotList[_[e]];
        R.SetFloat(RenderConfig_1.RenderConfig.UseTexture, 1),
          R.SetFloat(
            RenderConfig_1.RenderConfig.TextureUseMask,
            r.UseAlphaToMask,
          ),
          R.SetFloat(RenderConfig_1.RenderConfig.TextureMaskRange, f),
          R.SetColor(RenderConfig_1.RenderConfig.TextureScaleAndOffset, n),
          R.SetColor(RenderConfig_1.RenderConfig.TextureSpeed, t),
          R.SetColor(RenderConfig_1.RenderConfig.TextureColor, i),
          R.SetFloat(RenderConfig_1.RenderConfig.TextureRotation, a),
          R.SetFloat(
            RenderConfig_1.RenderConfig.TextureUseScreenUv,
            r.UseScreenUv,
          ),
          d && R.SetTexture(RenderConfig_1.RenderConfig.NoiseTexture, d),
          R.SetColor(
            RenderConfig_1.RenderConfig.TextureUvSwitch,
            r.UvSelection,
          );
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Stop();
  }
  Elr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      r && n.RevertBattleCommon();
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.UseTexture),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureUseScreenUv),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureUseMask),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureMaskRange),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureUvSwitch),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureScaleAndOffset),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureSpeed),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureColor),
          t.RevertProperty(RenderConfig_1.RenderConfig.TextureRotation),
          t.RevertProperty(RenderConfig_1.RenderConfig.NoiseTexture),
          r ||
            t.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            n.RevertBattle(t.SectionIndex);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateSampleTexture.Stop();
  }
  nlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Start();
    for (const o of e.SpecifiedMaterialIndexMap.keys()) {
      var r = this.AllBodyInfoList.get(o);
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
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Stop();
  }
  mlr(e) {
    var r = e.DataCache;
    if (e.TargetSkeletalMesh) {
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Start();
      var o = e.InterpolateFactor,
        n = Math.pow(o.Factor, r.MotionOffsetLength),
        t = e.TargetSkeletalMesh.GetSocketLocation(
          RenderConfig_1.RenderConfig.RootName,
        ),
        n =
          (RenderUtil_1.RenderUtil.LerpVector(
            e.MotionStartLocation,
            t,
            n,
            e.MotionEndLocation,
          ),
          e.MotionEndLocation[0] - t.X),
        i = e.MotionEndLocation[1] - t.Y,
        t = e.MotionEndLocation[2] - t.Z,
        a = Math.sqrt(n * n + i * i + t * t),
        f =
          a < 100
            ? new UE.LinearColor(n, i, t, a)
            : new UE.LinearColor(0, 0, 0, 0),
        d =
          a < 100
            ? RenderUtil_1.RenderUtil.GetFloatFromGroup(r.MotionNoiseSpeed, o)
            : 0;
      for (const l of e.SpecifiedMaterialIndexMap.keys()) {
        var _ = e.SpecifiedMaterialIndexMap.get(l),
          C = this.AllBodyInfoList.get(l);
        for (let e = 0; e < _.length; e++) {
          var R = C.MaterialSlotList[_[e]];
          R.SetFloat(
            RenderConfig_1.RenderConfig.MotionRange,
            r.MotionAffectVertexRange,
          ),
            R.SetColor(RenderConfig_1.RenderConfig.MotionOffset, f),
            R.SetFloat(RenderConfig_1.RenderConfig.MotionNoiseSpeed, d);
        }
      }
      RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Stop();
    }
  }
  Slr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Start();
    for (const t of e.SpecifiedMaterialIndexMap.keys()) {
      var r = e.SpecifiedMaterialIndexMap.get(t),
        o = this.AllBodyInfoList.get(t);
      for (let e = 0; e < r.length; e++) {
        var n = o.MaterialSlotList[r[e]];
        n.RevertProperty(RenderConfig_1.RenderConfig.MotionRange),
          n.RevertProperty(RenderConfig_1.RenderConfig.MotionOffset),
          n.RevertProperty(RenderConfig_1.RenderConfig.MotionNoiseSpeed);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateMotionOffset.Stop();
  }
  slr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Start();
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      if (r) n.UseAlphaTestCommon();
      else
        for (let e = 0; e < o.length; e++) {
          var t = n.MaterialSlotList[o[e]];
          t.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
            n.UseAlphaTest(t.SectionIndex);
        }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Stop();
  }
  dlr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Start();
    var r = e.DataCache,
      o = e.InterpolateFactor,
      n = RenderUtil_1.RenderUtil.GetFloatFromGroup(r.DitherValue, o);
    for (const f of e.SpecifiedMaterialIndexMap.keys()) {
      var t = e.SpecifiedMaterialIndexMap.get(f),
        i = this.AllBodyInfoList.get(f);
      for (let e = 0; e < t.length; e++) {
        var a = i.MaterialSlotList[t[e]];
        a.SetFloat(RenderConfig_1.RenderConfig.UseDitherEffect2, 1),
          a.SetFloat(RenderConfig_1.RenderConfig.DitherValue2, n);
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateDither.Stop();
  }
  ylr(e) {
    var r = e.SelectedAllParts;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      r && n.RevertAlphaTestCommon();
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        t.RevertProperty(RenderConfig_1.RenderConfig.DitherValue2),
          t.RevertProperty(RenderConfig_1.RenderConfig.UseDitherEffect2),
          r ||
            t.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
            n.RevertAlphaTest(t.SectionIndex);
      }
    }
  }
  Clr(e) {
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateCustomMaterialEffect.Start();
    var r = e.DataCache,
      o = e.InterpolateFactor;
    for (const _ of e.SpecifiedMaterialIndexMap.keys()) {
      var n = e.SpecifiedMaterialIndexMap.get(_),
        t = this.AllBodyInfoList.get(_);
      for (let e = 0; e < n.length; e++) {
        var i = t.MaterialSlotList[n[e]];
        if (void 0 !== r.CustomTextureParameterNames)
          for (let e = 0; e < r.CustomTextureParameterNames.length; e++) {
            var a = RenderUtil_1.RenderUtil.GetTextureFromGroup(
              r.CustomTextureParameterValues[e],
              o,
            );
            a && i.SetTexture(r.CustomTextureParameterNames[e], a);
          }
        if (void 0 !== r.CustomFloatParameterNames)
          for (let e = 0; e < r.CustomFloatParameterNames.length; e++) {
            var f = RenderUtil_1.RenderUtil.GetFloatFromGroup(
              r.CustomFloatParameterValues[e],
              o,
            );
            i.SetFloat(r.CustomFloatParameterNames[e], f);
          }
        if (void 0 !== r.CustomColorParameterNames)
          for (let e = 0; e < r.CustomColorParameterNames.length; e++) {
            var d = RenderUtil_1.RenderUtil.GetColorFromGroup(
              r.CustomColorParameterValues[e],
              o,
            );
            i.SetColor(r.CustomColorParameterNames[e], d);
          }
      }
    }
    RenderModuleConfig_1.RenderStats.StatCharMaterialControllerUpdateCustomMaterialEffect.Stop();
  }
  Ilr(e) {
    var r = e.DataCache;
    for (const i of e.SpecifiedMaterialIndexMap.keys()) {
      var o = e.SpecifiedMaterialIndexMap.get(i),
        n = this.AllBodyInfoList.get(i);
      for (let e = 0; e < o.length; e++) {
        var t = n.MaterialSlotList[o[e]];
        if (void 0 !== r.CustomTextureParameterNames)
          for (let e = 0; e < r.CustomTextureParameterNames.length; e++)
            t.RevertProperty(r.CustomTextureParameterNames[e]);
        if (void 0 !== r.CustomFloatParameterNames)
          for (let e = 0; e < r.CustomFloatParameterNames.length; e++)
            t.RevertProperty(r.CustomFloatParameterNames[e]);
        if (void 0 !== r.CustomColorParameterNames)
          for (let e = 0; e < r.CustomColorParameterNames.length; e++)
            t.RevertProperty(r.CustomColorParameterNames[e]);
      }
    }
  }
}
(exports.CharMaterialContainer = CharMaterialContainer).G3a = -1;
//# sourceMappingURL=CharMaterialContainer.js.map
