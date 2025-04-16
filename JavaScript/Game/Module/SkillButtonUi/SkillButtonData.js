"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonData = exports.controlVisionTagId = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  SkillButton_1 = require("../../../Core/Define/Config/SkillButton"),
  SkillCommonButton_1 = require("../../../Core/Define/Config/SkillCommonButton"),
  SkillFollowerButton_1 = require("../../../Core/Define/Config/SkillFollowerButton"),
  SkillVehicleButton_1 = require("../../../Core/Define/Config/SkillVehicleButton"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  PhantomUtil_1 = require("../Phantom/PhantomUtil"),
  SkillButtonCustomHandleFactory_1 = require("./Custom/SkillButtonCustomHandleFactory");
exports.controlVisionTagId = 1427742187;
class SkillButtonData {
  constructor() {
    (this.qxa = 0),
      (this.sDe = void 0),
      (this.Config = void 0),
      (this.ConfigRole = void 0),
      (this.ConfigFollower = void 0),
      (this.ConfigVehicle = void 0),
      (this.PriorityConfig = void 0),
      (this.wmo = 0),
      (this.DefaultSkillId = 0),
      (this.SkillIdTagMap = new Map()),
      (this.E9_ = 0),
      (this.RO = InputEnums_1.EInputAction.None),
      (this.CSo = 0),
      (this.ZMe = ""),
      (this.FormationData = void 0),
      (this.gSo = []),
      (this.pri = []),
      (this.fSo = new Map()),
      (this.mEa = 0),
      (this.pSo = []),
      (this.DY_ = []),
      (this.DynamicEffectTagIdMap = new Map()),
      (this.DynamicEffectId = 0),
      (this.SkillIconTagIds = void 0),
      (this.I9_ = 0),
      (this.AttributeIdTagMap = new Map()),
      (this.AttributeEnableTagIds = void 0),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
      (this.IsEnableWhenAttributeNoEnough = !1),
      (this.vSo = !1),
      (this.RoleConfig = void 0),
      (this.Qst = void 0),
      (this.ESo = void 0),
      (this.SSo = void 0),
      (this.ySo = !1),
      (this.ISo = void 0),
      (this.TSo = void 0),
      (this.LSo = void 0),
      (this.DSo = !1),
      (this.J6a = 0),
      (this.GameplayTagComponent = void 0),
      (this.BuffComponent = void 0),
      (this.u1t = void 0),
      (this.RSo = void 0),
      (this.$te = void 0),
      (this.USo = void 0),
      (this.Cvl = void 0),
      (this.xut = 0),
      (this.ayc = !1),
      (this.ConfigShowLongPressTagIds = []),
      (this.ASo = !1),
      (this.dEa = !1),
      (this.BY_ = !0),
      (this.PSo = ""),
      (this.SkillIconName = ""),
      (this.xSo = void 0),
      (this.wSo = ""),
      (this.Aot = void 0),
      (this.npo = !1),
      (this.BSo = !0),
      (this.CustomHandle = void 0),
      (this.IsLimitCountCustom = !1),
      (this.RemainingCountCustom = 0),
      (this.TotalCoolDownCustom = 0),
      (this.HideCoolDownTextCustom = !1),
      (this.gvl = !0),
      (this.pvl = !1),
      (this.fvl = 0),
      (this.IsLimitCountVehicleSkill = !1),
      (this.RemainingCountVehicleSkill = 0),
      (this.ExploreAsFightTagIds = []),
      (this.IsExploreAsFight = !1);
  }
  get bSo() {
    return this.DSo;
  }
  set bSo(t) {
    this.DSo = t;
  }
  Refresh(t, i, s, h) {
    var e,
      r,
      o,
      n,
      t = (this.sDe = t).Entity;
    if (
      ((this.qxa = s),
      (this.Config = i) instanceof SkillButton_1.SkillButton ||
      i instanceof SkillCommonButton_1.SkillCommonButton
        ? (this.ConfigRole = i)
        : i instanceof SkillFollowerButton_1.SkillFollowerButton
          ? (this.ConfigFollower = i)
          : i instanceof SkillVehicleButton_1.SkillVehicleButton &&
            (this.ConfigVehicle = i),
      (this.DefaultSkillId = i.SkillId),
      (this.PriorityConfig = h),
      this.SkillIdTagMap.clear(),
      this.DynamicEffectTagIdMap.clear(),
      h)
    ) {
      for (var [l, u] of h.SkillIdTagMap) this.SkillIdTagMap.set(l, u);
      for (var [a, f] of h.DynamicEffectTagMap)
        this.DynamicEffectTagIdMap.set(a, f);
    }
    for ([e, r] of i.SkillIdTagMap) this.SkillIdTagMap.set(e, r);
    (this.RO = i.ActionType),
      (this.CSo = i.ButtonType),
      (this.ZMe = InputEnums_1.EInputAction[this.RO]),
      (this.FormationData =
        ModelManager_1.ModelManager.SkillButtonUiModel.SkillButtonFormationData?.GetSkillButtonTypeFormationData(
          this.CSo,
        ));
    for ([o, n] of this.Config.DynamicEffectTagMap)
      this.DynamicEffectTagIdMap.set(o, n);
    this.SkillIconTagIds = [];
    for (const d of this.Config.SkillIconTags) this.SkillIconTagIds.push(d);
    this.ConfigRole && this.kY_(this.ConfigRole),
      this.ConfigFollower &&
        (this.kY_(this.ConfigFollower),
        (this.dEa = !this.ConfigFollower.IsVisible)),
      (this.vSo = i.IsLongPressControlCamera),
      (this.TSo = t.GetComponent(38)),
      (this.LSo = t.GetComponent(205)),
      (this.GameplayTagComponent = t.GetComponent(203)),
      (this.BuffComponent = t.GetComponent(207)),
      (this.u1t = t.GetComponent(0)),
      (this.RSo = t.GetComponent(61)),
      (this.$te = t.GetComponent(171)),
      (this.USo = t.GetComponent(42)),
      (this.Cvl = t.GetComponent(226)),
      this.InitCustomHandle(),
      this.InitVehicleHandle(),
      this.qSo(),
      this.RefreshIsExploreAsFight(),
      this.RefreshSkillId(),
      this.RefreshAttributeId(),
      this.SetExploreSkillChange(!1),
      this.pmi(),
      this.RefreshDynamicEffect(),
      this.RefreshIsEnable(),
      this.RefreshIsVisible(),
      this.RefreshSkillTexturePath(),
      (this.ConfigRole || this.ConfigFollower) &&
        (this.RefreshFrameSpriteColor(), this.NSo(), this.OSo()),
      this.RefreshLongPressTime(),
      this.RefreshIsShowLongPress(),
      this.RefreshIsEnableLongPress(),
      this.RefreshConfigIsShowLongPress();
  }
  Reset() {
    (this.qxa = 0),
      (this.sDe = void 0),
      (this.Config = void 0),
      (this.ConfigRole = void 0),
      (this.ConfigFollower = void 0),
      (this.DefaultSkillId = void 0),
      (this.SkillIdTagMap = void 0),
      (this.E9_ = 0),
      (this.RO = InputEnums_1.EInputAction.None),
      (this.ZMe = void 0),
      (this.FormationData = void 0),
      (this.AttributeIdTagMap = void 0),
      (this.AttributeEnableTagIds = void 0),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
      (this.IsEnableWhenAttributeNoEnough = !1),
      (this.ayc = !1),
      (this.vSo = void 0),
      (this.TSo = void 0),
      (this.LSo = void 0),
      (this.GameplayTagComponent = void 0),
      (this.BuffComponent = void 0),
      (this.u1t = void 0),
      (this.RSo = void 0),
      (this.$te = void 0),
      (this.Cvl = void 0),
      (this.RoleConfig = void 0),
      (this.ESo = void 0),
      (this.SSo = void 0),
      (this.ySo = void 0),
      (this.ISo = void 0),
      (this.npo = !1),
      (this.BSo = !0),
      (this.CustomHandle = void 0),
      (this.IsLimitCountCustom = !1),
      (this.RemainingCountCustom = 0),
      (this.TotalCoolDownCustom = 0),
      (this.HideCoolDownTextCustom = !1),
      (this.gvl = !0),
      (this.pvl = !1),
      (this.fvl = 0),
      (this.IsExploreAsFight = !1),
      (this.I9_ = 0);
  }
  kY_(t) {
    if (
      ((this.AttributeId = t.AttributeId),
      (this.MaxAttributeId = t.MaxAttributeId),
      0 < t.AttributeIdTagMap.size)
    ) {
      this.AttributeIdTagMap.set(0, [this.AttributeId, this.MaxAttributeId]);
      for (var [i, s] of t.AttributeIdTagMap)
        this.AttributeIdTagMap.set(i, s.ArrayInt);
    }
    t = t.AttributeEnableTags;
    if (t && 0 < t.length) {
      this.AttributeEnableTagIds = [];
      for (const h of t) this.AttributeEnableTagIds.push(h);
    }
  }
  qSo() {
    var i,
      s,
      t = this.Config,
      h = this.ConfigRole,
      e = this.PriorityConfig;
    if (
      ((this.gSo.length = 0),
      (this.pri.length = 0),
      this.fSo.clear(),
      (this.pSo.length = 0),
      (this.DY_.length = 0),
      (this.ConfigShowLongPressTagIds.length = 0),
      e)
    ) {
      for (var [r, o] of e.DisableSkillIdTags)
        if (o) {
          var n = new Set();
          for (const l of o.ArrayInt) n.add(l);
          this.fSo.set(r, n);
        }
      for (const u of e.DisableTags) this.pri.push(u);
    }
    if (h) {
      for (const a of h.EnableTags) this.gSo.push(a);
      for (const f of h.HiddenTags) this.pSo.push(f);
      for (const d of h.ShowLongPressTags)
        this.ConfigShowLongPressTagIds.push(d);
    } else if (this.ConfigVehicle)
      for (const v of this.ConfigVehicle.EnableTags) this.gSo.push(v);
    else if (this.ConfigFollower)
      for (const g of this.ConfigFollower.NotOccupyTags) this.DY_.push(g);
    for (const I of t.DisableTags) this.pri.push(I);
    for ([i, s] of t.DisableSkillIdTags)
      if (s) {
        let t = this.fSo.get(i);
        t || ((t = new Set()), this.fSo.set(i, t));
        for (const _ of s.ArrayInt) t.add(_);
      }
    (e = SkillButtonData.GetCommonDisableTagIdByButtonType(this.CSo)),
      e && this.pri.push(e),
      this.pri.push(1008164187),
      (h = SkillButtonData.GetCommonHiddenTagIdByButtonType(this.CSo));
    h ? ((this.mEa = h), this.pSo.push(h)) : (this.mEa = 0),
      7 === this.CSo && this.ExploreAsFightTagIds.push(362533963);
  }
  static GetCommonDisableTagIdByButtonType(t) {
    return SkillButtonData.kSo.get(t);
  }
  static GetCommonHiddenTagIdByButtonType(t) {
    return SkillButtonData.FSo.get(t);
  }
  GetEnableTagIds() {
    return this.gSo;
  }
  GetDisableTagIds() {
    return this.pri;
  }
  GetDisableSkillIdTagIds() {
    return this.fSo;
  }
  GetHiddenTagIds() {
    return this.pSo;
  }
  GetNotOccupyTagIds() {
    return this.DY_;
  }
  GetConfigType() {
    return this.qxa;
  }
  IsCdVisible() {
    return (
      !!this.ConfigFollower ||
      !(!this.ConfigVehicle?.IsCdVisible && !this.ConfigRole?.IsCdVisible)
    );
  }
  GetMaxAttributeBurstEffectId() {
    return this.ConfigRole?.MaxAttributeBurstEffectId ?? 0;
  }
  GetMaxAttributeBurstEffectConfig() {
    var t = this.GetMaxAttributeBurstEffectId();
    return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(
      t,
    );
  }
  VSo() {
    var t;
    return (
      this.Qst ||
        ((t = (this.ConfigFollower || this.RoleConfig).ElementId),
        (this.Qst =
          ConfigManager_1.ConfigManager.BattleUiConfig.GetElementConfig(t))),
      this.Qst
    );
  }
  GetCdCompletedEffectId() {
    return this.ConfigRole?.CdCompletedEffectId ?? 0;
  }
  GetCdCompletedEffectConfig() {
    var t = this.GetCdCompletedEffectId();
    return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(
      t,
    );
  }
  GetDynamicEffectConfig() {
    if (0 !== this.DynamicEffectId)
      return ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillButtonEffectConfig(
        this.DynamicEffectId,
      );
  }
  RefreshDynamicEffect() {
    for (var [t, i] of this.DynamicEffectTagIdMap)
      if (this.mSo(t)) return void (this.DynamicEffectId = i);
    this.DynamicEffectId = 0;
  }
  RefreshIsExploreAsFight() {
    for (const t of this.ExploreAsFightTagIds)
      if (this.mSo(t)) return void (this.IsExploreAsFight = !0);
    this.IsExploreAsFight = !1;
  }
  GetActionType() {
    return this.RO;
  }
  GetButtonType() {
    return this.CSo;
  }
  GetEntityHandle() {
    return this.sDe;
  }
  GetEntityId() {
    return this.sDe.Entity.Id;
  }
  GetSkillId() {
    return this.wmo;
  }
  GetSkillConfig() {
    return this.ESo;
  }
  GetSkillTexturePath() {
    return this.PSo;
  }
  GetActionName() {
    return this.ZMe;
  }
  IsEnable() {
    return this.bSo;
  }
  IsVisible() {
    return this.ASo;
  }
  IsOccupy() {
    return this.BY_;
  }
  HasAttribute() {
    return 0 !== this.AttributeId && 0 !== this.MaxAttributeId;
  }
  GetAttribute() {
    return this.$te.GetCurrentValue(this.AttributeId);
  }
  GetMaxAttribute() {
    return this.$te.GetCurrentValue(this.MaxAttributeId);
  }
  GetMaxAttributeColor() {
    return this.xSo;
  }
  GetMaxAttributeEffectPath() {
    return this.wSo;
  }
  GetFrameSpriteColor() {
    return this.Aot;
  }
  GetIsLongPressControlCamera() {
    return !!this.FormationData?.IsLongPressControlCamera || this.vSo;
  }
  GetLongPressTime() {
    return this.FormationData?.IsLongPressControlCamera
      ? this.FormationData.LongPressTime
      : this.xut;
  }
  GetMultiSkillInfo() {
    return (
      this.ISo ||
      (this.ySo
        ? ((this.ISo = this.LSo?.GetMultiSkillInfo(this.wmo)), this.ISo)
        : void 0)
    );
  }
  IsMultiStageSkill() {
    return this.ySo;
  }
  GetMultiSkillTexturePath() {
    if (9 === this.CSo) return this.PSo;
    var t = this.GetMultiSkillInfo();
    if (!t || 0 === t.NextSkillId) return this.PSo;
    t = this.FindSkillConfig(t.NextSkillId);
    if (t) {
      t = t.SkillIcon;
      if (t) {
        t = t.AssetPathName;
        if (!FNameUtil_1.FNameUtil.IsNothing(t)) return t.toString();
      }
    }
  }
  RefreshVisionMultiSkillInfo(t, i) {
    if (this.ISo !== t) {
      if (
        i !==
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          this.u1t.VisionSkillServerEntityId,
        )?.Id
      )
        return !1;
      (this.ySo = !0), (this.ISo = t);
    }
    return !0;
  }
  GetSkillRemainingCoolDown() {
    return this.SSo ? this.SSo.CurRemainingCd : 0;
  }
  GetGroupSkillCdInfo() {
    return this.SSo;
  }
  HasCdComponent() {
    return void 0 !== this.LSo;
  }
  RefreshSkillId() {
    var t,
      i,
      s = this.wmo;
    (this.wmo = this.DefaultSkillId), (this.E9_ = 0);
    let h = !1;
    for ([t, i] of this.SkillIdTagMap)
      if (this.mSo(t)) {
        (this.wmo = i), (this.E9_ = t), (h = !0);
        break;
      }
    this.HSo(h), this.jSo(h), s !== this.wmo && this.Jlo();
  }
  Jlo() {
    this.wmo
      ? ((this.ESo = this.TSo.GetSkillInfo(this.wmo)),
        (this.SSo = this.LSo?.GetGroupSkillCdInfo(this.wmo)),
        (this.ySo = !!this.ESo && 1 < this.ESo.CooldownConfig.SectionCount))
      : ((this.ESo = void 0), (this.SSo = void 0), (this.ySo = !1)),
      (this.ISo = void 0);
  }
  RefreshSkillIdByTag(t) {
    var i;
    0 !== this.E9_
      ? this.RefreshSkillId()
      : (i = this.SkillIdTagMap.get(t)) !== this.wmo &&
        ((this.wmo = i), (this.E9_ = t), this.Jlo());
  }
  HSo(i) {
    if (this.RO === InputEnums_1.EInputAction.幻象2 && this.ConfigRole) {
      let t = void 0;
      if (
        (t = this.GameplayTagComponent.HasTag(exports.controlVisionTagId)
          ? this.USo.GetVisionSkillInformation(3)?.r5n
          : this.USo.GetVisionId())
      ) {
        var s =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
            t,
          );
        if (s)
          return (
            i || (this.wmo = s.SkillGroupId),
            (this.PSo = s.BattleViewIcon),
            (this.SkillIconName = void 0),
            void (this.BSo =
              PhantomUtil_1.PhantomUtil.GetVisionData(t)?.空中能否释放 ?? !0)
          );
      }
      i || (this.wmo = void 0),
        (this.PSo = void 0),
        (this.SkillIconName = void 0),
        (this.BSo = !0);
    }
  }
  jSo(t) {
    t ||
      this.RO !== InputEnums_1.EInputAction.幻象1 ||
      (!this.ConfigRole && !this.ConfigVehicle) ||
      ((t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId)
        ? ((t = PhantomUtil_1.PhantomUtil.GetVisionData(t)),
          this.SetExploreSkillChange(this.wmo !== t.技能ID),
          (this.wmo = t.技能ID))
        : void 0 !== this.wmo &&
          (this.SetExploreSkillChange(!0), (this.wmo = void 0)));
  }
  GetExploreSkillChange() {
    return this.npo;
  }
  SetExploreSkillChange(t) {
    this.npo = t;
  }
  GetIsVisionEnableInAir() {
    return this.BSo;
  }
  RefreshAttributeId() {
    if (!(this.AttributeIdTagMap.size <= 0)) {
      this.IsEnableWhenAttributeNoEnough = !1;
      for (var [t, i] of this.AttributeIdTagMap)
        if (this.mSo(t))
          return (
            (this.AttributeId = i[0]),
            (this.MaxAttributeId = i[1]),
            void (
              this.AttributeEnableTagIds?.includes(t) &&
              (this.IsEnableWhenAttributeNoEnough = !0)
            )
          );
      var s = this.AttributeIdTagMap.get(0);
      (this.AttributeId = s[0]), (this.MaxAttributeId = s[1]);
    }
  }
  pmi() {
    this.u1t && this.ConfigRole && (this.RoleConfig = this.u1t.GetRoleConfig());
  }
  RefreshSkillTexturePathBySkillIconTag(t) {
    0 !== this.I9_ ? this.RefreshSkillTexturePath() : this.T9_(t);
  }
  T9_(t) {
    var i,
      s =
        ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillIconConfigByTag(
          t,
        );
    return (
      !!s &&
      ((i = s.IconPath),
      (this.SkillIconName = s.Name),
      !StringUtils_1.StringUtils.IsEmpty(i)) &&
      ((this.PSo = i), (this.I9_ = t), !0)
    );
  }
  RefreshSkillTexturePath() {
    if (
      ((this.I9_ = 0), this.SkillIconTagIds && 0 < this.SkillIconTagIds.length)
    )
      for (const s of this.SkillIconTagIds)
        if (this.mSo(s) && this.T9_(s)) return;
    var t = this.FormationData?.SkillIconPath;
    if (t) {
      var i = this.FormationData.EnableSkillId;
      if (0 === i || i === this.wmo)
        return (this.PSo = t), void (this.SkillIconName = void 0);
    }
    if (((this.SkillIconName = void 0), this.ConfigRole || this.ConfigVehicle))
      if (this.RO === InputEnums_1.EInputAction.幻象1) {
        var i = this.WSo();
        if (i) return void (this.PSo = i);
      } else if (
        this.RO === InputEnums_1.EInputAction.幻象2 &&
        void 0 !== this.PSo
      )
        return;
    -1 === this.wmo && this.ConfigFollower
      ? (this.PSo = this.ConfigFollower.SkillIcon)
      : -1 === this.wmo && this.ConfigVehicle
        ? (this.PSo = this.ConfigVehicle.SkillIcon)
        : !(t = this.GetSkillConfig()) ||
            !(i = t.SkillIcon) ||
            ((t = i.AssetPathName), FNameUtil_1.FNameUtil.IsNothing(t))
          ? (this.PSo = void 0)
          : (this.PSo = t.toString());
  }
  NSo() {
    var t = this.VSo().SkillEffectColor;
    this.xSo = new UE.LinearColor(UE.Color.FromHex(t));
  }
  OSo() {
    var t = this.VSo();
    this.wSo = t.SkillButtonEffectPath;
  }
  RefreshFrameSpriteColor() {
    var t;
    this.HasAttribute()
      ? ((t = this.VSo()), (this.Aot = UE.Color.FromHex(t.UltimateSkillColor)))
      : (this.Aot = void 0);
  }
  RefreshIsEnable() {
    for (const h of this.gSo)
      if (this.mSo(h)) return (this.bSo = !0), void (this.J6a = 1);
    if (
      this.RO &&
      !ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(this.RO)
    )
      (this.bSo = !1), (this.J6a = 2);
    else if (this.CustomHandle?.ForceEnable) (this.bSo = !0), (this.J6a = 10);
    else if (
      this.HasAttribute() &&
      this.GetAttribute() < this.GetMaxAttribute() &&
      !this.IsEnableWhenAttributeNoEnough
    )
      (this.bSo = !1), (this.J6a = 3);
    else {
      if (this.Cvl?.IsOnVehicle)
        if (
          this.Cvl?.IsVehicleType("Gongduola") ||
          this.Cvl?.IsVehicleType("AutoMoveGongduola")
        ) {
          if (this.RO === InputEnums_1.EInputAction.幻象1)
            return (this.bSo = !0), void (this.J6a = 11);
          if (this.RO === InputEnums_1.EInputAction.跳跃)
            return (this.bSo = !!this.Cvl?.CanLeave), void (this.J6a = 11);
          if (this.Cvl?.IsVehicleType("Gongduola")) {
            if (this.RO === InputEnums_1.EInputAction.闪避)
              return (this.bSo = !!this.Cvl?.CanSprint), void (this.J6a = 11);
            if (this.RO === InputEnums_1.EInputAction.技能1)
              return (
                (this.bSo = !!this.Cvl?.CanRiderSharing), void (this.J6a = 11)
              );
          }
        } else if (
          this.Cvl?.IsVehicleType("NpcVehicle") &&
          this.RO === InputEnums_1.EInputAction.跳跃
        )
          return (this.bSo = !0), void (this.J6a = 11);
      for (const e of this.pri)
        if (this.mSo(e)) return (this.bSo = !1), void (this.J6a = 4);
      if (this.wmo)
        for (var [t, i] of this.fSo)
          if (this.mSo(t) && i.has(this.wmo))
            return (this.bSo = !1), void (this.J6a = 5);
      if (this.ySo) {
        var s = this.GetMultiSkillInfo();
        if (s && 0 !== s.NextSkillId)
          return (this.bSo = s.RemainingStartTime <= 0), void (this.J6a = 6);
      }
      if (
        this.IsUseItem &&
        !this.IsExploreAsFight &&
        (this.IsEquippedItemBanReqUse() || this.IsSkillInItemUseCd())
      )
        (this.bSo = !1), (this.J6a = 7);
      else {
        if (this.LSo) {
          s = this.GetGroupSkillCdInfo();
          if (!s || s.RemainingCount <= 0)
            return (this.bSo = !1), void (this.J6a = 8);
        }
        this.RO === InputEnums_1.EInputAction.幻象2 &&
        !this.BSo &&
        this.mSo(40422668)
          ? ((this.bSo = !1), (this.J6a = 9))
          : ((this.bSo = !0), (this.J6a = 0));
      }
    }
  }
  SetEnable(t, i) {
    (this.bSo = t), (this.J6a = i);
  }
  RefreshIsVisible(t = !0) {
    if (this.dEa && !this.FormationData?.IgnoreDefaultHidden) this.ASo = !1;
    else if (
      this.RO &&
      !ModelManager_1.ModelManager.BattleInputModel?.GetInputVisible(this.RO)
    )
      this.ASo = !1;
    else {
      if (t)
        if (this.FormationData?.IgnoreHiddenTag) {
          if (this.mSo(this.mEa)) return void (this.ASo = !1);
        } else
          for (const i of this.pSo)
            if (this.mSo(i)) return void (this.ASo = !1);
      this.ASo = !0;
    }
  }
  SetInvisible() {
    this.ASo = !1;
  }
  SetDefaultHidden(t) {
    this.dEa = t;
  }
  RefreshIsOccupy() {
    for (const t of this.pSo) if (this.mSo(t)) return void (this.ASo = !1);
    this.BY_ = !0;
  }
  SetNotOccupy() {
    this.BY_ = !1;
  }
  RefreshLongPressTime() {
    var t = this.GetActionType(),
      t = this.RSo?.GetHoldConfig(t);
    t
      ? ((t = t[1]),
        (this.xut =
          t <= 0
            ? this.Config.LongPressTime /
              CommonDefine_1.MILLIONSECOND_PER_SECOND
            : t))
      : (this.xut =
          this.Config.LongPressTime / CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  WSo() {
    return ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillIcon;
  }
  FindSkillConfig(t) {
    if (t) return this.TSo.GetSkillInfo(t);
  }
  mSo(t) {
    return !!this.GameplayTagComponent && this.GameplayTagComponent.HasTag(t);
  }
  get IsUseItem() {
    return (
      !this.ConfigFollower &&
      this.RO === InputEnums_1.EInputAction.幻象1 &&
      ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn
    );
  }
  IsSkillInItemUseCd() {
    return (
      this.RO === InputEnums_1.EInputAction.幻象1 &&
      (this.IsSkillInItemUseBuffCd() || this.IsSkillInItemUseSkillCd())
    );
  }
  IsEquippedItemBanReqUse() {
    return (
      !!this.IsUseItem &&
      ModelManager_1.ModelManager.RouletteModel.IsEquippedItemBanReqUse()
    );
  }
  IsSkillInItemUseBuffCd() {
    return (
      !(!this.IsUseItem || this.IsExploreAsFight) &&
      ModelManager_1.ModelManager.RouletteModel.IsEquipItemInBuffCd()
    );
  }
  GetEquippedItemUsingBuffCd() {
    var t, i;
    return this.IsUseItem
      ? ((t = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId),
        [
          (i =
            ModelManager_1.ModelManager.BuffItemModel).GetBuffItemRemainCdTime(
            t,
          ),
          i.GetBuffItemTotalCdTime(t),
        ])
      : [0, 0];
  }
  IsSkillInItemUseSkillCd() {
    if (this.IsUseItem && this.LSo && !this.IsExploreAsFight) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
        ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId,
      )?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (t)
        return (
          0 <
          this.LSo.GetGroupSkillCdInfo(t)?.CurRemainingCd -
            TimeUtil_1.TimeUtil.TimeDeviation
        );
    }
    return !1;
  }
  GetEquippedItemUsingSkillCd() {
    if (this.IsUseItem && this.LSo) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
        ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId,
      )?.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (t)
        return [
          (t = this.LSo.GetGroupSkillCdInfo(t)).CurRemainingCd,
          t.CurMaxCd,
        ];
    }
    return [0, 0];
  }
  IsVehicleSkillInCd() {
    if (
      this.Cvl?.IsOnVehicle &&
      this.Cvl.IsVehicleType("Gongduola") &&
      this.Cvl.VehicleEntity?.GetComponent(242)?.IsSprintSkillInCd()
    )
      return !0;
    return !1;
  }
  GetVehicleSkillCd() {
    if (this.Cvl?.IsOnVehicle && this.Cvl.IsVehicleType("Gongduola")) {
      var t =
        this.Cvl.VehicleEntity?.GetComponent(242)?.GetSprintSkillRemainingCd();
      if (t) return t;
    }
    return [0, 0];
  }
  GetDebugInfo() {
    return `Type:${this.CSo},SkillId:${this.wmo},Visible:${this.ASo},Enable:${this.bSo},${this.J6a},`;
  }
  InitCustomHandle() {
    (this.Config instanceof SkillButton_1.SkillButton ||
      this.Config instanceof SkillFollowerButton_1.SkillFollowerButton) &&
      ((this.CustomHandle =
        SkillButtonCustomHandleFactory_1.SkillButtonCustomHandleFactory.GetSkillButtonCustomHandleById(
          this.Config.CustomHandleId,
        )),
      this.CustomHandle) &&
      (this.CustomHandle.Init(this), this.CustomHandle.Refresh());
  }
  GetRemainingCoolDownCustom() {
    return this.CustomHandle?.GetCustomRemainingCoolDown() ?? 0;
  }
  InitVehicleHandle() {
    var t;
    (this.IsLimitCountVehicleSkill = !1),
      (this.RemainingCountVehicleSkill = 0),
      5 === this.CSo &&
        this.Cvl?.IsOnVehicle &&
        this.Cvl.IsVehicleType("Gongduola") &&
        ((this.IsLimitCountVehicleSkill = !0),
        (t = this.Cvl.VehicleEntity?.GetComponent(242))) &&
        (this.RemainingCountVehicleSkill = t.GetSprintSkillUsableCount());
  }
  IsEnableLongPress() {
    return this.gvl;
  }
  RefreshIsEnableLongPress() {
    7 === this.CSo &&
      (this.Cvl?.IsVehicleType("Gongduola")
        ? (this.gvl = !1)
        : (this.gvl = !0));
  }
  IsShowLongPress() {
    return this.pvl;
  }
  RefreshIsShowLongPress() {
    1 === this.CSo &&
    (this.ConfigVehicle?.ShowLongPress ||
      (this.Cvl?.IsOnVehicle && this.Cvl?.IsEnableLongPressLeave()))
      ? ((this.pvl = !0), this.RefreshLongPressDuration())
      : (this.pvl = !1);
  }
  RefreshLongPressDuration() {
    let t = void 0;
    var i;
    this.ConfigVehicle
      ? (t = this.sDe?.Entity)
      : this.Cvl?.IsOnVehicle &&
        this.Cvl?.IsEnableLongPressLeave() &&
        (t = this.Cvl?.VehicleEntity),
      t &&
        ((i = t?.GetComponent(237)?.GetHoldConfig(this.RO)),
        (this.fvl = i ? i[1] : 0));
  }
  GetLongPressDuration() {
    return this.fvl;
  }
  GetIsConfigShowLongPress() {
    return this.ayc;
  }
  SetIsConfigShowLongPress(t) {
    this.ayc = t;
  }
  RefreshConfigIsShowLongPress() {
    for (const t of this.ConfigShowLongPressTagIds)
      if (this.mSo(t)) return void (this.ayc = !0);
    this.ayc = !1;
  }
  GetIsLongPressing() {
    let t = void 0;
    return (
      this.ConfigVehicle
        ? (t = this.sDe?.Entity)
        : this.Cvl?.IsOnVehicle && (t = this.Cvl?.VehicleEntity),
      !!t?.GetComponent(237)?.IsHoldingAction(this.RO)
    );
  }
}
((exports.SkillButtonData = SkillButtonData).kSo = new Map([
  [4, -542518289],
  [6, -541178966],
  [8, -732810197],
  [5, 581080458],
  [7, -1802431900],
  [1, -469423249],
  [2, 766688429],
  [9, -1752099043],
  [10, 581080458],
  [11, -542518289],
])),
  (SkillButtonData.FSo = new Map([
    [4, -1823030825],
    [6, -1949137153],
    [8, -800147974],
    [5, 1381320300],
    [7, -2112257652],
    [1, -571871026],
    [9, 1725229954],
    [10, 1381320300],
    [11, -1823030825],
  ]));
//# sourceMappingURL=SkillButtonData.js.map
