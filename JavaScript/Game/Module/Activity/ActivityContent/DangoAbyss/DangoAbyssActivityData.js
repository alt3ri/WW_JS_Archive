"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssActivityData =
    exports.AbyssChallengeData =
    exports.AbyssRewardInfo =
    exports.AbyssPluginItemInfo =
    exports.AbyssDangoRoleData =
    exports.AbyssDangoRoleSlotData =
      void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  AbyssInstById_1 = require("../../../../../Core/Define/ConfigQuery/AbyssInstById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AttributeModel_1 = require("../../../Attribute/AttributeModel"),
  DangoAbyssDefine_1 = require("../../../Dango/DangoAbyss/DangoAbyssDefine"),
  AttributeItemData_1 = require("../../../Inventory/ItemData/AttributeItemData"),
  AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData"),
  ActivityCommonDefine_1 = require("../../ActivityCommonDefine"),
  ActivityData_1 = require("../../ActivityData"),
  DangoAbyssActivityController_1 = require("./DangoAbyssActivityController"),
  OPENTIPKEY = 1;
class AbyssDangoRoleSlotData {
  constructor() {
    (this.wVi = -1), (this.wTt = 0), (this.ETt = 0), (this.SVc = 0);
  }
  GetSlotIndex() {
    return this.wVi;
  }
  GetDangoId() {
    return this.SVc;
  }
  GetIncId() {
    return this.wTt;
  }
  GetEquipId() {
    return this.ETt;
  }
  GetPassiveSkillDesc() {
    return 0 < this.ETt
      ? ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
          this.wTt,
        ).GetPassiveSkillDesc()
      : "";
  }
  SetDangoRoleId(t) {
    this.SVc = t;
  }
  Refresh(t, e, r) {
    (this.wVi = t), (this.wTt = e), (this.ETt = r);
  }
}
exports.AbyssDangoRoleSlotData = AbyssDangoRoleSlotData;
class AbyssDangoRoleData {
  constructor() {
    (this.xe = 0),
      (this.B8 = 0),
      (this.huc = []),
      (this.Ujt = !0),
      (this.luc = new Map());
  }
  GetId() {
    return this.xe;
  }
  GetLevel() {
    return this.B8;
  }
  GetEquipItems() {
    return this.huc;
  }
  GetIfLock() {
    return this.Ujt;
  }
  GetTexture() {
    return this.GetConfig().Icon;
  }
  GetFormationIcon() {
    return this.GetConfig().FormationIcon;
  }
  GetMeshId() {
    var t = this.GetPhantomId();
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
      t,
    ).PhantomItem.MeshId;
  }
  GetPhantomId() {
    return this.GetConfig().PhantomItemId;
  }
  Init(t) {
    (this.xe = t.Id), (this.B8 = 1);
  }
  Phrase(t, e) {
    (this.xe = t.s5n),
      (this.B8 = t.F6n),
      (this.huc = t.Xnc),
      (this.Ujt = !1),
      this.PhraseSlotData(t.Xnc, e);
  }
  PhraseSlotData(e, r) {
    e.length < DangoAbyssDefine_1.SLOT_COUNT &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("Activity", 75, "团子插槽信息不足", ["dangoId", this.xe]);
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      var i = e[t],
        s = r[t],
        n = new AbyssDangoRoleSlotData();
      n.SetDangoRoleId(this.xe), n.Refresh(t, i, s), this.luc.set(t, n);
    }
  }
  GetQuality() {
    return this.GetConfig().Quality;
  }
  GetQualitySpritePath() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(
      this.GetQuality(),
    ).Bg;
  }
  GetEquipPluginIdList() {
    var t = [];
    for (const e of Array.from(this.luc.values())) t.push(e.GetIncId());
    return t;
  }
  GetEquipPluginMap() {
    var t,
      e = new Map();
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) e.set(t, 0);
    for ([, t] of this.luc) e.set(t.GetSlotIndex(), t.GetIncId());
    return e;
  }
  GetPluginSlotData(t) {
    return this.luc.get(t);
  }
  GetCurrentPluginSlotNum() {
    return this.GetLevelConfig().PluginNum;
  }
  GetName() {
    return this.GetConfig().Name;
  }
  GetCastTypeDesc() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoCastDescById(
      this.GetConfig().CastType,
    );
  }
  GetSkillCastTypeName() {
    return this.GetCastTypeDesc().Name;
  }
  GetSkillCastTypeIconPath() {
    return this.GetCastTypeDesc().Icon;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(
      this.xe,
    );
  }
  _uc() {
    return this.GetConfig().LevelGroupId;
  }
  GetLevelGroupConfigs() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByGroupId(
      this._uc(),
    );
  }
  GetSkillId() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
      this.GetConfig().PhantomItemId,
    ).GetPhantomSkillId();
  }
  GetSkillConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
      this.GetSkillId(),
    );
  }
  GetSkillDesc() {
    return this.GetSkillConfig().DescriptionEx;
  }
  GetSkillDescAddition() {
    var t = this.GetSkillId(),
      e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
          this.GetConfig().PhantomItemId,
        ).PhantomItem.QualityId;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
      t,
      e,
    );
  }
  GetEffectPassiveSkillDescList() {
    const r = new Array();
    return (
      this.luc.forEach((t, e) => {
        t = t.GetPassiveSkillDesc();
        "" !== t && r.push(t);
      }),
      r
    );
  }
  GetLevelConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(
      this.B8,
      this._uc(),
    );
  }
  GetCurrentLevelUpConsume() {
    var t = this.GetLevelConfig();
    if (!t) return [];
    var t = t.Consume,
      e = new Array();
    for (const i of t) {
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i[0],
        ),
        r = { ItemId: i[0], Cost: i[1], Count: r };
      e.push(r);
    }
    return e;
  }
  GetIfLevelUpEnough() {
    for (const t of this.GetCurrentLevelUpConsume())
      if (t.Cost > t.Count) return !1;
    return !0;
  }
  GetMaxLevel() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByGroupId(
      this._uc(),
    ).length;
  }
  GetIfMaxLevel() {
    var t =
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByGroupId(
        this._uc(),
      );
    return this.B8 >= t.length;
  }
  GetIfCanLevelUp() {
    var t = this.GetIfLock(),
      e = this.GetIfMaxLevel();
    return !t && !e;
  }
  GetLevelUpPreviewData(t) {
    const i = new Array();
    return (
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(
        t - 1,
        this._uc(),
      ).Prop.forEach((t) => {
        let e = !1;
        for (const r of i)
          r.Id === t.Id &&
            r.IsRatio === t.IsRatio &&
            ((r.BaseValue += t.Value), (e = !0));
        e ||
          i.push(
            new AttrListScrollData_1.AttrListScrollData(
              t.Id,
              t.Value,
              0,
              0,
              t.IsRatio,
              0,
            ),
          );
      }),
      t <= this.GetMaxLevel() &&
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(
          t,
          this._uc(),
        ).Prop.forEach((t) => {
          let e = !1;
          for (const r of i)
            r.Id === t.Id &&
              r.IsRatio === t.IsRatio &&
              ((r.AddValue += t.Value), (e = !0));
          e ||
            i.push(
              new AttrListScrollData_1.AttrListScrollData(
                t.Id,
                0,
                t.Value,
                0,
                t.IsRatio,
                0,
              ),
            );
        }),
      i
    );
  }
  GetLevelUpPluginAddData(t) {
    var e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(
          t,
          this._uc(),
        ),
      r =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(
          t - 1,
          this._uc(),
        );
    return e && r
      ? e.PluginNum - r.PluginNum
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 75, "获取团子升级信息错误，检查配置表", [
            "level",
            t,
          ]),
        0);
  }
  Gi1(t, e, r) {
    e = AttributeModel_1.TipsDataTool.GetPropRatioValue(e, r);
    return ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
      t,
      e,
      r,
    );
  }
  GetLevelUpViewAttributeInfo(t, r) {
    var e = this.GetLevelUpPreviewData(t);
    const i = new Array();
    e.forEach((t) => {
      var e =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            t.Id,
          ),
        e = {
          Name: e.Name,
          IconPath: e.Icon,
          ShowArrow: !r,
          PreText: this.Gi1(t.Id, t.BaseValue, t.IsRatio),
        };
      r || (e.CurText = this.Gi1(t.Id, t.AddValue, t.IsRatio)), i.push(e);
    });
    e = this.GetLevelUpPluginAddData(t);
    return (
      e <= 0 ||
        r ||
        ((t = {
          Name: "Ayess_Chajiancao_Text",
          IconPath: void 0,
          ShowArrow: !1,
          CurText: StringUtils_1.StringUtils.Format("+{0}", e.toString()),
        }),
        i.push(t)),
      i
    );
  }
  GetLevelUpViewData(t) {
    return {
      LevelInfo: {
        PreUpgradeLv: t - 1,
        UpgradeLv: t,
        FormatStringId: "Text_LevelShow_Text",
        IsMaxLevel: t >= this.GetMaxLevel(),
      },
      AttributeInfo: this.GetLevelUpViewAttributeInfo(t),
    };
  }
}
exports.AbyssDangoRoleData = AbyssDangoRoleData;
class AbyssPluginItemInfo extends AttributeItemData_1.AttributeItemData {
  constructor(t) {
    super(t.L8n, t.b9n, t.Vws, 13), (this.dFe = 0), (this.Count = t.m9n);
  }
  SetRoleId(t) {
    this.dFe = t;
  }
  GetRoleId() {
    return this.dFe;
  }
  GetItemId() {
    return this.ConfigId;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(
      this.ConfigId,
    );
  }
  GetMainType() {}
  GetType() {
    return 60006;
  }
  GetSortIndex() {
    var t = this.GetItemTypeConfig();
    return t ? t.SortIndex : 0;
  }
  GetItemAccess() {
    return [];
  }
  GetMaxStackCount() {
    return 1;
  }
  GetUseCountLimit() {
    return 1;
  }
  GetRedDotDisableRule() {
    return 1;
  }
  IsValid() {
    return !0;
  }
  HasRedDot() {
    return !1;
  }
  GetQuality() {
    return this.GetConfig().QualityId;
  }
  GetProp() {
    return this.GetConfig().Prop;
  }
  GetBelongRole() {
    return this.GetConfig().BelongLittleRole;
  }
  GetCanRecovery() {
    return this.dFe <= 0 && !this.GetIsLock();
  }
  GetFormationCoreBgPath() {
    return (
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(
        this.GetQuality(),
      )?.AbyssCoreItemFormationBg ?? ""
    );
  }
  GetFormationBgPath() {
    return (
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(
        this.GetQuality(),
      )?.AbyssItemFormationBg ?? ""
    );
  }
  GetFormationBgColor() {
    return (
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(
        this.GetQuality(),
      )?.AbyssItemFormationBgColor ?? ""
    );
  }
  GetPassiveSkillDesc() {
    var t,
      e = this.GetConfig().PassiveBuffShowDesc;
    return "" === e
      ? ""
      : ((t = this.YR1()),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
          ...t,
        ));
  }
  GetBgDesc() {
    var t,
      e = this.GetConfig().BgDescription;
    return "" === e
      ? ""
      : ((t = this.YR1()),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
          ...t,
        ));
  }
  YR1() {
    var t = this.GetConfig();
    return 0 < t.LevelDescStrArray.length
      ? t.LevelDescStrArray[0].ArrayString
      : [];
  }
}
exports.AbyssPluginItemInfo = AbyssPluginItemInfo;
class AbyssRewardInfo {
  constructor() {
    (this.xe = 0),
      (this.muc = !1),
      (this.dbe = 0),
      (this.fuc = 0),
      (this.guc = !1);
  }
  GetId() {
    return this.xe;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardById(
      this.xe,
    );
  }
  GetHasGetReward() {
    return this.muc;
  }
  GetCanGetReward() {
    return this.dbe === this.fuc;
  }
  GetCurrentProgress() {
    return this.dbe;
  }
  GetTargetProgress() {
    return this.fuc;
  }
  GetIfUnlock() {
    return this.guc;
  }
  GetRewardType() {
    var t = this.GetConfig().RewardType;
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardTypeById(
      t,
    ).RewardType;
  }
  GetTabId() {
    var t = this.GetConfig().RewardType;
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardTypeById(
      t,
    ).TabId;
  }
  GetAllSameRewardTypeRewardId() {
    var t,
      e = [];
    for (const r of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAllAbyssReward())
      r.RewardType === this.GetConfig().RewardType &&
        (t = ModelManager_1.ModelManager.DangoAbyssModel.GetRewardInfoById(
          r.Id,
        )) &&
        0 === t.GetRewardTaskState() &&
        e.push(r.Id);
    return e;
  }
  GetRewardTaskState() {
    let t = 1;
    return this.muc ? (t = 2) : this.GetCanGetReward() && (t = 0), t;
  }
  GetActivityRewardData() {
    var t = this.GetRewardTaskState(),
      e = this.dbe,
      r = this.fuc,
      i = this.GetConfig();
    return {
      Id: this.GetId(),
      NameText: StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title),
        r.toString(),
      ),
      NameTextArgs: ["" + e, "" + r],
      RewardState: ActivityCommonDefine_1.taskStateToRewardStateResolver[t],
      ClickFunction: () => {
        DangoAbyssActivityController_1.DangoAbyssActivityController.RequestGetAbyssRewardList(
          this.GetAllSameRewardTypeRewardId(),
        );
      },
      RewardList: this.I2e(this.iNc()),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        this.kbn(ActivityCommonDefine_1.taskStateToRewardStateResolver[t]),
      ),
    };
  }
  kbn(t) {
    let e = "";
    switch (t) {
      case 0:
        e = "PrefabTextItem_1443074454_Text";
        break;
      case 1:
        e = "CollectActivity_state_CanRecive";
        break;
      case 2:
        e = "CollectActivity_state_recived";
    }
    return e;
  }
  iNc() {
    return this.GetConfig().DropId;
  }
  I2e(t) {
    var e,
      r,
      i = [];
    for ([
      e,
      r,
    ] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t))
      i.push([{ ItemId: e, IncId: 0 }, r]);
    return i;
  }
  Pharse(t) {
    (this.xe = t.s5n),
      (this.muc = t.mLs),
      (this.dbe = t.lMs),
      (this.fuc = t.j6n),
      (this.guc = t.CM_);
  }
}
exports.AbyssRewardInfo = AbyssRewardInfo;
class AbyssChallengeData {
  constructor() {
    (this.Ifc = 0),
      (this.guc = !1),
      (this.RVc = !1),
      (this.Gol = 0),
      (this.sC1 = !1),
      (this.Cbe = 0),
      (this.yR1 = !1);
  }
  GetChallengeId() {
    return this.Ifc;
  }
  GetIfUnlock() {
    return this.guc;
  }
  GetCanChallenge() {
    return this.RVc;
  }
  GetConditionFinishState() {
    return this.sC1;
  }
  GetUnlockTime() {
    return this.Gol;
  }
  GetConfig() {
    return AbyssInstById_1.configAbyssInstById.GetConfig(this.Ifc);
  }
  GetOverUnlockTime() {
    return TimeUtil_1.TimeUtil.GetServerTime() >= this.Gol;
  }
  GetLeftTimeText() {
    var t = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(this.Gol - t, 1);
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t).CountDownText ?? "";
  }
  GetReward() {
    var t,
      e,
      r = [],
      i = this.GetConfig().DropPreviewId;
    if (0 < i)
      for ([t, e] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
        i,
      ).DropPreview) {
        var s = [{ IncId: 0, ItemId: t }, e];
        r.push(s);
      }
    return r;
  }
  GetMaxProgress() {
    return this.Cbe;
  }
  GetIfPass() {
    return this.yR1;
  }
  Phrase(t) {
    (this.Ifc = t.e8n),
      (this.guc = t.CMs),
      (this.RVc = t.MNc),
      (this.Gol = Number(MathUtils_1.MathUtils.LongToBigInt(t.yzs)) / 1e3),
      (this.sC1 = t.bxs),
      (this.Cbe = t.fM_),
      (this.yR1 = t.Ezs);
  }
}
exports.AbyssChallengeData = AbyssChallengeData;
class DangoAbyssActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.Cuc = !1),
      (this.puc = new Map()),
      (this.rNc = new Map()),
      (this.vuc = new Map()),
      (this.yuc = new Map()),
      (this.AVc = new Map()),
      (this.Muc = 0),
      (this.bf1 = 0),
      (this.Rf1 = 0),
      (this.SNe = (t, e) => {
        var r = this.wSn(e),
          i = this.wSn(t);
        return r === i ? t.Id - e.Id : r - i;
      });
  }
  PhraseEx(t) {
    this.Euc();
    var e = t.Ssc;
    for (const t of e.Wnc) this.Iuc(t);
    for (const t of e.Y7n) this.Hdo(t);
    (this.Muc = e.Knc),
      this.PVc(e.SNc),
      this.Tuc(e.ob_),
      (this.bf1 = Number(MathUtils_1.MathUtils.LongToBigInt(e.CPs)) / 1e3),
      (this.Rf1 = Number(MathUtils_1.MathUtils.LongToBigInt(e.gPs)) / 1e3);
  }
  GetExDataRedPointShowState() {
    var t = this.GetRewardTypeIfHaveCanTakeReward(2),
      e = this.GetRewardTypeIfHaveCanTakeReward(1),
      r = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoNewRedDot();
    return this.GetPreGuideQuestFinishState() && (t || e || r);
  }
  CheckInLimitTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return t >= this.bf1 && t <= this.Rf1;
  }
  GetRemainTimeText() {
    var t = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(this.Rf1 - t, 1);
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t).CountDownText ?? "";
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState();
  }
  PVc(t) {
    for (const r of t) {
      const t = this.AVc.get(r.e8n);
      var e;
      t
        ? t.Phrase(r)
        : ((e = new AbyssChallengeData()).Phrase(r),
          this.AVc.set(e.GetChallengeId(), e));
    }
  }
  Tuc(t) {
    for (const e of t) {
      let t = this.puc.get(e.s5n);
      t
        ? t.Pharse(e)
        : ((t = new AbyssRewardInfo()).Pharse(e), this.puc.set(e.s5n, t)),
        this.oNc(t);
    }
  }
  GetRewardInfoById(t) {
    return this.puc.get(t);
  }
  OnRoleInfoUpdate(t) {
    for (const e of t.Y7n) this.Hdo(e);
  }
  OnAddRoleInfo(t) {
    for (const e of t.Y7n) this.Hdo(e, !0);
  }
  OnPluginInfoUpdate(t) {
    for (const e of t.Wnc) this.Iuc(e);
  }
  OnPluginAdd(t) {
    for (const e of t.Wnc) this.Iuc(e);
  }
  OnPluginEquip(t) {
    this.Hdo(t);
  }
  OnPluginRemove(t) {
    for (const e of t.izl) this.yuc.delete(e);
  }
  OnUpdateRewardIdList(t) {
    for (const e of t.Jnc) {
      let t = this.puc.get(e.s5n);
      t
        ? t.Pharse(e)
        : ((t = new AbyssRewardInfo()).Pharse(e), this.puc.set(e.s5n, t)),
        this.oNc(t);
    }
  }
  GetRewardFinishProgressText() {
    let t = 0,
      e = 0;
    for (const r of this.GetRewardTypeTabList(2))
      for (const i of this.GetRewardInfoByRewardTypeAndTab(2, r))
        e++, (i.GetHasGetReward() || i.GetCanGetReward()) && t++;
    return StringUtils_1.StringUtils.Format(
      "{0}/{1}",
      t.toString(),
      e.toString(),
    );
  }
  GetRewardTypeIfHaveCanTakeReward(t) {
    if (this.CheckInLimitTime())
      for (const e of this.GetRewardTypeTabList(t))
        for (const r of this.GetRewardInfoByRewardTypeAndTab(t, e))
          if (!r.GetHasGetReward() && r.GetCanGetReward()) return !0;
    return !1;
  }
  GetRewardTypeTabList(t) {
    var e = new Array(),
      t = this.rNc.get(t);
    if (t) for (var [r] of t) e.push(r);
    return e;
  }
  GetRewardInfoByRewardTypeAndTab(t, e) {
    t = this.rNc.get(t);
    return (t && t.get(e)) || [];
  }
  GetTaskActivityRewardDataList(t, e) {
    var r = [];
    for (const s of this.GetRewardInfoByRewardTypeAndTab(t, e)) {
      var i = s.GetActivityRewardData();
      r.push(i);
    }
    return r.sort(this.SNe);
  }
  wSn(t) {
    let e = 0;
    switch (t.RewardState) {
      case 0:
        e = 2;
        break;
      case 1:
        e = 3;
        break;
      case 2:
        e = 1;
        break;
      default:
        e = 4;
    }
    return e;
  }
  oNc(e) {
    let t = this.rNc.get(e.GetRewardType());
    t || ((t = new Map()), this.rNc.set(e.GetRewardType(), t));
    var r = e.GetTabId();
    let i = t.get(r),
      s = (i || ((i = new Array()), t.set(r, i)), !1);
    for (let t = 0; t < i.length; t++)
      if (i[t].GetId() === e.GetId()) {
        (i[t] = e), (s = !0);
        break;
      }
    s || i.push(e);
  }
  OnUpdateUnlockChallengeIdList(t) {
    this.PVc(t.SNc);
  }
  GetUnLockChallengeIdList() {
    var t,
      e = new Array();
    for ([, t] of this.AVc) t.GetIfUnlock() && e.push(t.GetChallengeId());
    return e;
  }
  GetCanChallengeIdList() {
    var t,
      e = new Array();
    for ([, t] of this.AVc) t.GetCanChallenge() && e.push(t.GetChallengeId());
    return e;
  }
  GetLikeCount() {
    return this.Muc;
  }
  Euc() {
    if (!this.Cuc) {
      this.Cuc = !0;
      for (const r of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssActivityData(
        this.Id,
      ).DangoList) {
        var t = new AbyssDangoRoleData(),
          e =
            ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(r);
        t.Init(e), this.vuc.set(e.Id, t);
      }
    }
  }
  Hdo(t, e) {
    this.mFc(t);
    let r = this.vuc.get(t.s5n);
    r || ((r = new AbyssDangoRoleData()), this.vuc.set(t.s5n, r)),
      e &&
        (ModelManager_1.ModelManager.DangoAbyssModel.SetDangoIfNew(t.s5n, !0),
        ModelManager_1.ModelManager.DangoAbyssModel.SetDangoFormationIfNew(
          t.s5n,
          !0,
        ));
    var i = [];
    for (const n of t.Xnc) {
      var s = this.yuc.get(n);
      !s &&
        0 < n &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 75, "团子中含有未初始化的插件", [
          "dangoId",
          t.s5n,
        ]),
        i.push(s?.GetConfigId() ?? 0);
    }
    r.Phrase(t, i);
  }
  mFc(e) {
    var t = this.vuc.get(e.s5n),
      r = e.Xnc,
      i = t.GetEquipPluginIdList(),
      s = r.length;
    for (let t = 0; t < s; t++) {
      var n = i[t],
        a = r[t];
      n !== a &&
        (0 < a && this.yuc.get(a).SetRoleId(e.s5n), 0 < n) &&
        this.yuc.get(n).SetRoleId(0);
    }
  }
  GetRoleDataById(t) {
    return this.vuc.get(t);
  }
  GetAllDangoList() {
    return Array.from(this.vuc.values());
  }
  GetAbyssWorldProgressText() {
    let t = 0;
    for (var [, e] of this.vuc) e.GetIfLock() || t++;
    return StringUtils_1.StringUtils.Format(
      "{0}/{1}",
      t.toString(),
      this.vuc.size.toString(),
    );
  }
  GetAbyssWorldProgressPercentage() {
    let t = 0;
    for (var [, e] of this.vuc) e.GetIfLock() || t++;
    return t / this.vuc.size;
  }
  GetAbyssProgressText() {
    var t = this.GetCanChallengeIdList().length,
      e = this.AVc.size;
    return StringUtils_1.StringUtils.Format(
      "{0}/{1}",
      t.toString(),
      e.toString(),
    );
  }
  GetPreChallengeFinishState(e) {
    var r = Array.from(this.AVc.values()),
      i = r.length;
    for (let t = 0; t < i; t++)
      if (r[t].GetChallengeId() === e) return 0 === t || r[t - 1].GetIfPass();
    return !1;
  }
  GetCurrentLastFinishChallengeId() {
    let e = 0;
    var r = Array.from(this.AVc.values()),
      i = r.length;
    for (let t = 0; t < i; t++)
      0 === t
        ? (e = r[t].GetChallengeId())
        : r[t - 1].GetIfPass() && (e = r[t].GetChallengeId());
    return (e = 0 === e ? this.GetFirstUnlockChallengeId() : e);
  }
  GetFirstUnlockChallengeId() {
    for (var [, t] of this.AVc) if (t.GetIfUnlock()) return t.GetChallengeId();
    return 0;
  }
  Iuc(t) {
    var e;
    this.yuc.get(t.b9n) ||
      ((e = new AbyssPluginItemInfo(t)), this.yuc.set(t.b9n, e));
  }
  GetPluginItemInfoById(t) {
    return this.yuc.get(t);
  }
  GetPluginItemInfoAll() {
    return Array.from(this.yuc.values());
  }
  GetAbyssChallengeDataList() {
    return Array.from(this.AVc.values());
  }
  GetAbyssChallengeRankList() {
    var t = Array.from(this.AVc.values()),
      e = new Array();
    for (const i of t) {
      var r = i.GetChallengeId();
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(r)
        ?.RankOpen && e.push(i);
    }
    return e;
  }
  GetAbyssChallengeDataById(t) {
    return this.AVc.get(t);
  }
  GetActivityTipNeedShowState() {
    return (
      !(!this.CheckIfInOpenTime() || !this.CheckIfInShowTime()) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          OPENTIPKEY,
          0,
          0,
        )
    );
  }
  CacheActivityTipShowState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      OPENTIPKEY,
      0,
      0,
      1,
    );
  }
}
exports.DangoAbyssActivityData = DangoAbyssActivityData;
//# sourceMappingURL=DangoAbyssActivityData.js.map
