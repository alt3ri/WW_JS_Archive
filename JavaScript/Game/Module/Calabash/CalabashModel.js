"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashModel = exports.CalabashDevelopRewardData = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  PhantomFetterGroupById_1 = require("../../../Core/Define/ConfigQuery/PhantomFetterGroupById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CalabashInstance_1 = require("./CalabashInstance");
class CalabashDevelopRewardData {
  constructor(e, t) {
    (this.DevelopReward = e),
      (this.SkillName = t),
      (this.Jft = !1),
      (this.zft = 0),
      (this.Zft = new Map());
  }
  set UnlockData(e) {
    this.Jft = e;
  }
  get UnlockData() {
    return this.Jft;
  }
  set RewardNumData(e) {
    this.zft = e;
  }
  get RewardNumData() {
    return this.zft;
  }
  get DevelopRewardData() {
    return this.DevelopReward;
  }
  get RewardSumNumData() {
    return this.DevelopRewardData.DevelopCondition.length;
  }
  SetUnlockConditionMap(e) {
    for (const t of e) this.Zft.set(t.sLs, t.aLs);
  }
  GetUnlockConditionMap() {
    return this.Zft;
  }
  get UnlockSize() {
    return this.Zft.size;
  }
  CheckCanGetReward() {
    for (const e of this.Zft.values()) if (!e) return !0;
    return !1;
  }
}
exports.CalabashDevelopRewardData = CalabashDevelopRewardData;
class CalabashModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.OnlyShowBattleFettersTab = !1),
      (this.OnlyShowPhantomFetterGroupIdList = void 0),
      (this.Me = void 0),
      (this.ept = void 0),
      (this.tpt = void 0),
      (this.ipt = void 0),
      (this.HideVisionRecoveryConfirmBox = !1),
      (this.opt = new Array());
  }
  rpt() {
    (this.CalabashInstance = new CalabashInstance_1.CalabashInstance()),
      this.npt(),
      this.InitMonsterIdRecord();
  }
  npt() {
    var e =
      ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopList();
    this.ept || (this.ept = new Map());
    for (const a of e) {
      var t =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
            a.MonsterInfoId,
          ),
        t = new CalabashDevelopRewardData(a, t.Name);
      a.IsShow && this.ept.set(a.MonsterId, t);
    }
  }
  UpdateCalabashDevelopRewardData() {
    for (const t of this.GetUnlockCalabashDevelopRewards()) {
      var e = this.ept.get(t[0]);
      (e.UnlockData = !0),
        e.SetUnlockConditionMap(t[1]),
        (e.RewardNumData = t[1].length);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HasCalabashExp);
  }
  GetCalabashDevelopRewardSortData() {
    var e = new Array();
    for (const t of this.ept.values()) e.push(t);
    return e.sort((e, t) => e.DevelopReward.SortId - t.DevelopReward.SortId), e;
  }
  SetCalabashInstanceBaseInfo(e) {
    this.CalabashInstance || this.rpt(), this.CalabashInstance.SetBaseInfo(e);
  }
  SetCalabashInstanceConfigInfo(e) {
    this.CalabashInstance || this.rpt(), this.CalabashInstance.SetConfigInfo(e);
  }
  InitMonsterIdRecord() {
    (this.ipt =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollect,
      ) ?? []),
      (this.tpt = new Set());
    for (const e of this.ipt) this.tpt.add(e);
  }
  SetCalabashLevel(e) {
    (this.CalabashInstance.CalabashCurrentLevel = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CalabashLevelUpdate,
      );
  }
  GetCalabashLevel() {
    return this.CalabashInstance.CalabashCurrentLevel;
  }
  GetCalabashMaxLevel() {
    return this.CalabashInstance.CalabashMaxLevel;
  }
  GetIdentifyGuaranteeCount() {
    return this.CalabashInstance.IdentifyGuaranteeCount;
  }
  GetLeftIntensifyCaptureGuarantee() {
    var e =
      ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee() -
      ModelManager_1.ModelManager.CalabashModel.GetIdentifyGuaranteeCount();
    return e <= 0 ? 0 : e;
  }
  SetCurrentExp(e) {
    this.CalabashInstance.CalabashCurrentExp = e;
  }
  GetCurrentExp() {
    return this.CalabashInstance.CalabashCurrentExp;
  }
  SetUnlockCalabashDevelopReward(e) {
    this.CalabashInstance.SetUnlockCalabashDevelopReward(e);
  }
  GetUnlockCalabashDevelopRewards() {
    return this.CalabashInstance.GetUnlockCalabashDevelopRewards();
  }
  GetMonsterName(e) {
    return "CalabashCatchGain_" + e;
  }
  GetCalabashDevelopRewardInfoData(e) {
    var t = this.ept.get(e);
    if (t) {
      var a = new Array();
      for (const n of t.DevelopReward.DevelopCondition) {
        var r =
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionById(
              n,
            ),
          r = {
            IsUnlock: void 0 !== t.GetUnlockConditionMap().get(r.Id),
            Info: r.Description,
            Num: ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionRewardExp(
              r,
            ),
          };
        a.push(r);
      }
      return a;
    }
  }
  GetCalabashDevelopRewardExpByMonsterId(e) {
    let t = 0;
    var a = this.ept.get(e);
    if (a)
      for (const n of a.DevelopReward.DevelopCondition) {
        var r =
          ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionById(
            n,
          );
        a.GetUnlockConditionMap().get(r.Id) &&
          (t +=
            ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionRewardExp(
              r,
            ));
      }
    return t;
  }
  GetCalabashAllSchedule() {
    let e = 0;
    for (const t of this.ept.values()) e += t.RewardSumNumData;
    return e;
  }
  GetCalabashOwnSchedule() {
    let e = 0;
    for (const t of this.ept.values()) e += t.UnlockSize;
    return e;
  }
  set CalabashInstance(e) {
    this.Me = e;
  }
  get CalabashInstance() {
    return this.Me;
  }
  get CalabashUnlockTipsList() {
    return this.opt;
  }
  SetCalabashLevelsReward(e) {
    this.CalabashInstance.SetRewardedLevelsSet(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GetCalabashReward,
      );
  }
  GetCurrentExpByLevel(e) {
    return e < this.CalabashInstance.CalabashCurrentLevel
      ? ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e)
          .LevelUpExp
      : e === this.CalabashInstance.CalabashCurrentLevel
        ? this.CalabashInstance.CalabashCurrentExp
        : 0;
  }
  GetMaxExpByLevel(e) {
    return ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
      e,
    ).LevelUpExp;
  }
  GetReceiveRewardStateByLevel(e) {
    return 0 === e
      ? 0
      : this.CalabashInstance.IsRewardedByLevel(e)
        ? 3
        : e > this.CalabashInstance.CalabashCurrentLevel
          ? 1
          : 2;
  }
  IsLimitToLevelUp(e) {
    return (
      e === this.CalabashInstance.CalabashCurrentLevel &&
      ((e =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          e,
        )),
      this.CalabashInstance.CalabashCurrentExp >= e.LevelUpExp)
    );
  }
  GetCatchGainByLevel(e) {
    return this.CalabashInstance.GetCatchGainByLevel(e) ?? 0;
  }
  CheckCanReceiveReward() {
    if (void 0 !== this.CalabashInstance)
      for (let e = 1; e <= this.CalabashInstance.CalabashCurrentLevel; ++e)
        if (2 === this.GetReceiveRewardStateByLevel(e)) return !0;
    return !1;
  }
  RecordMonsterId(e) {
    return (
      !this.tpt?.has(e) &&
      (this.tpt?.add(e),
      this.ipt?.push(e),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollect,
        this.ipt,
      ),
      !0)
    );
  }
  CheckMonsterIdInRecord(e) {
    return this.tpt.has(e);
  }
  CheckSimpleStateSave() {
    void 0 ===
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .CalabashCollectIsSimpleDetail,
      ) && this.SaveIfSimpleState(!0);
  }
  GetIfSimpleState() {
    return LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail,
    );
  }
  SaveIfSimpleState(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail,
    );
    (void 0 !== t && t === e) ||
      (LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .CalabashCollectIsSimpleDetail,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ChangeCalabashCollectSimplyState,
      ));
  }
  GetViewTabList() {
    var e =
      ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "CalabashRootView",
      );
    if (this.OnlyShowBattleFettersTab)
      return e.filter((e) => "PhantomBattleFettersTabView" === e.ChildViewName);
    const t = [];
    return (
      e.forEach((e) => {
        ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId) &&
          t.push(e);
      }),
      t
    );
  }
  GetPhantomFetterGroupList() {
    if (!this.OnlyShowBattleFettersTab)
      return ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterGroupList(),
      );
    var e = [];
    for (const a of this.OnlyShowPhantomFetterGroupIdList ?? []) {
      var t =
        PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(a);
      t && e.push(t);
    }
    return e;
  }
}
exports.CalabashModel = CalabashModel;
//# sourceMappingURL=CalabashModel.js.map
