"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonData = exports.controlVisionTagId = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  SkillButton_1 = require("../../../Core/Define/Config/SkillButton"),
  SkillCommonButton_1 = require("../../../Core/Define/Config/SkillCommonButton"),
  SkillFollowerButton_1 = require("../../../Core/Define/Config/SkillFollowerButton"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  PhantomUtil_1 = require("../Phantom/PhantomUtil");
exports.controlVisionTagId = 1427742187;
class SkillButtonData {
  constructor() {
    (this.Pxa = 0),
      (this.sDe = void 0),
      (this.Config = void 0),
      (this.ConfigRole = void 0),
      (this.ConfigFollower = void 0),
      (this.wmo = 0),
      (this.DefaultSkillId = 0),
      (this.SkillIdTagMap = new Map()),
      (this.RO = InputEnums_1.EInputAction.None),
      (this.CSo = 0),
      (this.ZMe = ""),
      (this.FormationData = void 0),
      (this.gSo = []),
      (this.pri = []),
      (this.fSo = new Map()),
      (this.uEa = 0),
      (this.pSo = []),
      (this.DynamicEffectTagIdMap = new Map()),
      (this.DynamicEffectId = 0),
      (this.SkillIconTagIds = void 0),
      (this.AttributeIdTagMap = new Map()),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
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
      (this.v4a = 0),
      (this.Kst = void 0),
      (this.u1t = void 0),
      (this.RSo = void 0),
      (this.$te = void 0),
      (this.USo = void 0),
      (this.xut = 0),
      (this.ASo = !1),
      (this.cEa = !1),
      (this.PSo = ""),
      (this.SkillIconName = ""),
      (this.xSo = void 0),
      (this.wSo = ""),
      (this.Aot = void 0),
      (this.npo = !1),
      (this.BSo = !0);
  }
  get bSo() {
    return this.DSo;
  }
  set bSo(t) {
    this.DSo = t;
  }
  Refresh(t, i, s) {
    var e,
      h,
      r,
      n,
      t = (this.sDe = t).Entity;
    (this.Pxa = s),
      (this.Config = i) instanceof SkillButton_1.SkillButton ||
      i instanceof SkillCommonButton_1.SkillCommonButton
        ? (this.ConfigRole = i)
        : i instanceof SkillFollowerButton_1.SkillFollowerButton &&
          (this.ConfigFollower = i),
      (this.DefaultSkillId = i.SkillId),
      this.SkillIdTagMap.clear();
    for ([e, h] of i.SkillIdTagMap)
      this.SkillIdTagMap.set(
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
        h,
      );
    (this.RO = i.ActionType),
      (this.CSo = i.ButtonType),
      (this.ZMe = InputEnums_1.EInputAction[this.RO]),
      (this.FormationData =
        ModelManager_1.ModelManager.SkillButtonUiModel.SkillButtonFormationData?.GetSkillButtonTypeFormationData(
          this.CSo,
        )),
      this.DynamicEffectTagIdMap.clear();
    for ([r, n] of this.Config.DynamicEffectTagMap)
      this.DynamicEffectTagIdMap.set(
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r),
        n,
      );
    this.SkillIconTagIds = [];
    for (const l of this.Config.SkillIconTags)
      this.SkillIconTagIds.push(
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(l),
      );
    if (
      this.ConfigRole &&
      ((this.AttributeId = this.ConfigRole.AttributeId),
      (this.MaxAttributeId = this.ConfigRole.MaxAttributeId),
      0 < this.ConfigRole.AttributeIdTagMap.size)
    ) {
      this.AttributeIdTagMap.set(0, [this.AttributeId, this.MaxAttributeId]);
      for (var [o, a] of this.ConfigRole.AttributeIdTagMap)
        this.AttributeIdTagMap.set(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o),
          a.ArrayInt,
        );
    }
    this.ConfigFollower && (this.cEa = !this.ConfigFollower.IsVisible),
      (this.vSo = i.IsLongPressControlCamera),
      (this.TSo = t.GetComponent(34)),
      (this.LSo = t.GetComponent(192)),
      (this.Kst = t.GetComponent(190)),
      (this.u1t = t.GetComponent(0)),
      (this.RSo = t.GetComponent(54)),
      (this.$te = t.GetComponent(159)),
      (this.USo = t.GetComponent(36)),
      this.qSo(),
      this.RefreshSkillId(),
      this.RefreshAttributeId(),
      this.SetExploreSkillChange(!1),
      this.pmi(),
      this.RefreshDynamicEffect(),
      this.RefreshIsEnable(),
      this.RefreshIsVisible(),
      this.RefreshSkillTexturePath(),
      this.ConfigRole &&
        (this.RefreshFrameSpriteColor(), this.NSo(), this.OSo()),
      this.RefreshLongPressTime();
  }
  Reset() {
    (this.Pxa = 0),
      (this.sDe = void 0),
      (this.Config = void 0),
      (this.ConfigRole = void 0),
      (this.ConfigFollower = void 0),
      (this.DefaultSkillId = void 0),
      (this.SkillIdTagMap = void 0),
      (this.RO = InputEnums_1.EInputAction.None),
      (this.ZMe = void 0),
      (this.FormationData = void 0),
      (this.AttributeIdTagMap = void 0),
      (this.AttributeId = 0),
      (this.MaxAttributeId = 0),
      (this.vSo = void 0),
      (this.TSo = void 0),
      (this.LSo = void 0),
      (this.Kst = void 0),
      (this.u1t = void 0),
      (this.RSo = void 0),
      (this.$te = void 0),
      (this.RoleConfig = void 0),
      (this.ESo = void 0),
      (this.SSo = void 0),
      (this.ySo = void 0),
      (this.ISo = void 0),
      (this.npo = !1),
      (this.BSo = !0);
  }
  qSo() {
    var t,
      i,
      s = this.Config,
      e = this.ConfigRole;
    if (
      ((this.gSo.length = 0),
      (this.pri.length = 0),
      this.fSo.clear(),
      (this.pSo.length = 0),
      e)
    ) {
      for (const r of e.EnableTags)
        this.gSo.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r));
      for (const n of e.HiddenTags)
        this.pSo.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n));
    }
    for (const o of s.DisableTags)
      this.pri.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o));
    for ([t, i] of s.DisableSkillIdTags)
      if (i) {
        var h = new Set();
        for (const a of i.ArrayInt) h.add(a);
        this.fSo.set(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t), h);
      }
    (e = SkillButtonData.GetCommonDisableTagIdByButtonType(this.CSo)),
      e && this.pri.push(e),
      this.pri.push(1008164187),
      (s = SkillButtonData.GetCommonHiddenTagIdByButtonType(this.CSo));
    s ? ((this.uEa = s), this.pSo.push(s)) : (this.uEa = 0);
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
  GetConfigType() {
    return this.Pxa;
  }
  IsCdVisible() {
    return this.ConfigRole?.IsCdVisible ?? !1;
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
        ((t = this.RoleConfig.ElementId),
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
    this.wmo = this.DefaultSkillId;
    let e = !1;
    for ([t, i] of this.SkillIdTagMap)
      if (this.mSo(t)) {
        (this.wmo = i), (e = !0);
        break;
      }
    this.HSo(e), this.jSo(e), s !== this.wmo && this.Jlo();
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
    t = this.SkillIdTagMap.get(t);
    t !== this.wmo && ((this.wmo = t), this.Jlo());
  }
  HSo(i) {
    if (this.RO === InputEnums_1.EInputAction.幻象2 && this.ConfigRole) {
      let t = void 0;
      if (
        (t = this.Kst.HasTag(exports.controlVisionTagId)
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
    !t &&
      this.RO === InputEnums_1.EInputAction.幻象1 &&
      this.ConfigRole &&
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
      for (var [t, i] of this.AttributeIdTagMap)
        if (this.mSo(t))
          return (this.AttributeId = i[0]), void (this.MaxAttributeId = i[1]);
      var s = this.AttributeIdTagMap.get(0);
      (this.AttributeId = s[0]), (this.MaxAttributeId = s[1]);
    }
  }
  pmi() {
    this.u1t && this.ConfigRole && (this.RoleConfig = this.u1t.GetRoleConfig());
  }
  RefreshSkillTexturePathBySkillIconTag(t) {
    var i,
      t =
        ConfigManager_1.ConfigManager.SkillButtonConfig.GetSkillIconConfigByTag(
          t,
        );
    return (
      !!t &&
      ((i = t.IconPath),
      (this.SkillIconName = t.Name),
      !StringUtils_1.StringUtils.IsEmpty(i)) &&
      ((this.PSo = i), !0)
    );
  }
  RefreshSkillTexturePath() {
    if (this.SkillIconTagIds && 0 < this.SkillIconTagIds.length)
      for (const e of this.SkillIconTagIds)
        if (this.mSo(e)) {
          var t = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
          if (this.RefreshSkillTexturePathBySkillIconTag(t)) return;
        }
    var i = this.FormationData?.SkillIconPath;
    if (i) {
      var s = this.FormationData.EnableSkillId;
      if (0 === s || s === this.wmo)
        return (this.PSo = i), void (this.SkillIconName = void 0);
    }
    if (((this.SkillIconName = void 0), this.ConfigRole))
      if (this.RO === InputEnums_1.EInputAction.幻象1) {
        var s = this.WSo();
        if (s) return void (this.PSo = s);
      } else if (
        this.RO === InputEnums_1.EInputAction.幻象2 &&
        void 0 !== this.PSo
      )
        return;
    -1 === this.wmo && this.ConfigFollower
      ? (this.PSo = this.ConfigFollower.SkillIcon)
      : !(i = this.GetSkillConfig()) ||
          !(s = i.SkillIcon) ||
          ((i = s.AssetPathName), FNameUtil_1.FNameUtil.IsNothing(i))
        ? (this.PSo = void 0)
        : (this.PSo = i.toString());
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
    for (const e of this.gSo)
      if (this.mSo(e)) return (this.bSo = !0), void (this.v4a = 1);
    if (
      this.RO &&
      !ModelManager_1.ModelManager.BattleInputModel?.GetInputEnable(this.RO)
    )
      (this.bSo = !1), (this.v4a = 2);
    else if (
      this.HasAttribute() &&
      this.GetAttribute() < this.GetMaxAttribute()
    )
      (this.bSo = !1), (this.v4a = 3);
    else {
      for (const h of this.pri)
        if (this.mSo(h)) return (this.bSo = !1), void (this.v4a = 4);
      if (this.wmo)
        for (var [t, i] of this.fSo)
          if (this.mSo(t) && i.has(this.wmo))
            return (this.bSo = !1), void (this.v4a = 5);
      if (this.ySo) {
        var s = this.GetMultiSkillInfo();
        if (s && 0 !== s.NextSkillId)
          return (this.bSo = s.RemainingStartTime <= 0), void (this.v4a = 6);
      }
      if (
        this.IsUseItem &&
        (this.IsEquippedItemBanReqUse() || this.IsSkillInItemUseCd())
      )
        (this.bSo = !1), (this.v4a = 7);
      else {
        if (this.LSo) {
          s = this.GetGroupSkillCdInfo();
          if (!s || s.RemainingCount <= 0)
            return (this.bSo = !1), void (this.v4a = 8);
        }
        this.RO === InputEnums_1.EInputAction.幻象2 &&
        !this.BSo &&
        this.mSo(40422668)
          ? ((this.bSo = !1), (this.v4a = 9))
          : ((this.bSo = !0), (this.v4a = 0));
      }
    }
  }
  SetEnable(t, i) {
    (this.bSo = t), (this.v4a = i);
  }
  RefreshIsVisible(t = !0) {
    if (this.cEa && !this.FormationData?.IgnoreDefaultHidden) this.ASo = !1;
    else if (
      this.RO &&
      !ModelManager_1.ModelManager.BattleInputModel?.GetInputVisible(this.RO)
    )
      this.ASo = !1;
    else {
      if (t)
        if (this.FormationData?.IgnoreHiddenTag) {
          if (this.mSo(this.uEa)) return void (this.ASo = !1);
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
    this.cEa = t;
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
    return !!this.Kst && this.Kst.HasTag(t);
  }
  get IsUseItem() {
    return (
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
      !!this.IsUseItem &&
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
    if (this.IsUseItem && this.LSo) {
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
  GetDebugInfo() {
    return `Type:${this.CSo},SkillId:${this.wmo},Visible:${this.ASo},Enable:${this.bSo},${this.v4a},`;
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
