"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskModel = void 0);
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityMowingRiskController_1 = require("../Controller/ActivityMowingRiskController"),
  MowingRiskDefine_1 = require("../MowingRiskDefine"),
  MowingRiskConfigContext_1 = require("./MowingRiskConfigContext"),
  MowingRiskProtocolContext_1 = require("./MowingRiskProtocolContext"),
  MowingRiskUiContext_1 = require("./MowingRiskUiContext"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
class MowingRiskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Q5a = void 0),
      (this.K5a = void 0),
      (this.$5a = void 0),
      (this.X5a = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
          this.BuildActivityRewardViewData(),
        );
      }),
      (this.IsNewInstanceOpen = !1),
      (this.InstanceSubViewResourceId = "UiItem_CheckpointsMowing"),
      (this.InstanceSubtitleTextId = "TowerDefence_GPint");
  }
  OnInit() {
    return (
      (this.Q5a = new MowingRiskConfigContext_1.MowingRiskConfigContext()),
      this.Q5a.Init(),
      (this.K5a = new MowingRiskProtocolContext_1.MowingRiskProtocolContext()),
      (this.$5a = new MowingRiskUiContext_1.MowingRiskUiContext(this)),
      !0
    );
  }
  OnClear() {
    return this.Q5a.Dispose(), this.K5a.Dispose(), this.$5a.Dispose(), !0;
  }
  SyncProtocolRiskHarvestEndNotify(t) {
    this.K5a?.ParseRiskHarvestEndNotify(t);
  }
  SyncProtocolRiskHarvestInstUpdateNotify(t) {
    this.K5a?.ParseRiskHarvestInstUpdateNotify(t);
  }
  SyncProtocolRiskHarvestArtifactNotify(t) {
    this.K5a?.ParseRiskHarvestArtifactNotify(t);
  }
  SyncProtocolRiskHarvestBuffUpdateNotify(t) {
    this.K5a?.ParseRiskHarvestBuffUpdateNotify(t), this.$5a?.SyncNewBuff(t.Dih);
  }
  SyncProtocolRiskHarvestBuffUnlockNotify(t) {
    this.K5a?.ParseRiskHarvestBuffUnlockNotify(t);
  }
  SyncProtocolRiskHarvestActivityUpdateNotify(t) {
    this.K5a?.ParseRiskHarvestActivityUpdateNotify(t);
  }
  ResetBuffViewCache() {
    (this.CurrentBuffViewType = 0),
      (this.CurrentChosenOverviewBuffId = void 0),
      (this.CurrentChosenProgressIndex = void 0),
      (this.$5a.CurrentBasicBuffConfigs.length = 0),
      (this.$5a.CurrentSuperBuffConfigs.length = 0);
  }
  ResetCacheInBattle() {
    this.K5a.ResetCacheInBattle(), this.$5a.ResetCacheInBattle();
  }
  GetBuffGroupNameTextIdByBuffType(t) {
    switch (t) {
      case 1:
      case 2:
        return "riskharvest_normalbuff";
      case 3:
        return "riskharvest_superbuff";
      default:
        return "";
    }
  }
  GetScoreByInstanceId(t) {
    t = this.Q5a.GetIdByInstanceId(t);
    return void 0 === t ? 0 : this.K5a.GetScoreById(t);
  }
  BuildBuffIntroduceDataInOverviewById(t) {
    var e = this.Q5a,
      i = this.K5a.IsBuffUnlocked(t),
      r = this.K5a.GetBuffCountInBattleById(t);
    return {
      BackgroundPath: e.GetBuffIntroduceBackgroundPath(t),
      LevelTextId: i && void 0 !== r ? "RiskHarvest_LV" : void 0,
      LevelTextArgs: i && void 0 !== r ? [r.toString()] : void 0,
      NameTextId: i ? e.GetBuffNameTextIdById(t) : "RiskHarvest_TitleUnlock",
      TipsTextId: i
        ? e.GetBuffDescriptionTextIdById(t)
        : "riskharvest_BuffunlockDesc",
      TipsArgs: i ? e.GetBuffDescriptionArgsById(t) : [],
      IconPath: i ? e.GetBuffIconPathById(t) : void 0,
      HexColor: e.GetBuffHexColorById(t),
      IsUnlock: i,
    };
  }
  BuildBuffIntroduceDataInProgressById(t) {
    var e = this.Q5a;
    return {
      BackgroundPath: e.GetBuffIntroduceBackgroundPath(t),
      LevelTextId: void 0,
      LevelTextArgs: void 0,
      NameTextId: e.GetBuffNameTextIdById(t),
      TipsTextId: e.GetBuffDescriptionTextIdById(t),
      TipsArgs: e.GetBuffDescriptionArgsById(t),
      IconPath: e.GetBuffIconPathById(t),
      HexColor: e.GetBuffHexColorById(t),
      IsUnlock: this.K5a.IsBuffUnlocked(t),
    };
  }
  BuildBuffItemDataById(t) {
    var e = this.Q5a,
      i = this.K5a.IsBuffUnlocked(t);
    return {
      BuffId: t,
      QualityPath: e.GetBuffQualityPathById(t),
      IconPath: i ? e.GetBuffIconPathById(t) : void 0,
      NameTextId: i ? e.GetBuffNameTextIdById(t) : "RiskHarvest_TitleUnlock",
      IsShowBackground: !0,
      IsChosen: t === this.CurrentChosenOverviewBuffId,
      IsUnlock: i,
      LevelContent: this.cXa(t),
    };
  }
  BuildSuperBuffUnitDataListById(t) {
    var e = this.K5a.ArtifactBasicBuffTotalCount,
      i = this.Q5a,
      r = i.GetThresholdDataByArtifactId(t),
      s = [];
    if (void 0 !== r)
      for (var [n, a] of r.entries()) {
        var o = i.GetBuffThresholdByArtifactIdAndIndex(t, n),
          n = {
            Index: a.Index,
            BuffId: a.BuffId,
            IsChosen: n === this.CurrentChosenProgressIndex,
            IsActive: o <= e,
            IconPath: i.GetBuffIconPathById(a.BuffId),
            NameTextId: i.GetBuffNameTextIdById(a.BuffId),
            ThresholdCountContent: o.toString(),
          };
        s.push(n);
      }
    return s;
  }
  Y5a(t) {
    var e = [];
    for (const i of t) e.push(this.BuildBuffItemDataById(i.Id));
    return {
      GroupNameTextId: this.GetBuffGroupNameTextIdByBuffType(t[0].BuffType),
      BuffItemList: e,
    };
  }
  BuildOverviewViewData() {
    var t, e, i;
    if (void 0 !== this.CurrentChosenOverviewBuffId)
      return (
        (t = []),
        (e = (i = this.$5a).CurrentBasicBuffConfigs),
        0 < (i = i.CurrentSuperBuffConfigs).length && t.push(this.Y5a(i)),
        0 < e.length && t.push(this.Y5a(e)),
        {
          IntroduceData: this.BuildBuffIntroduceDataInOverviewById(
            this.CurrentChosenOverviewBuffId,
          ),
          BuffGroupData: t,
        }
      );
  }
  BuildProgressViewData() {
    var t = this.K5a,
      e = this.Q5a,
      i = t.ArtifactId,
      t = t.ArtifactBasicBuffTotalCount,
      r = e.GetBuffMaxCountByArtifactId(i),
      s = e.GetBuffIdByArtifactIdAndIndex(i, this.CurrentChosenProgressIndex);
    return {
      CountTextId: "PrefabTextItem_1333511122_Text",
      CountTextArgs: [t.toString(), r.toString()],
      ProgressPercentage: e.GetProgressOverallPercentage(i, t),
      SuperBuffList: this.BuildSuperBuffUnitDataListById(i),
      IntroduceData: this.BuildBuffIntroduceDataInProgressById(s),
    };
  }
  BuildCaptionViewData() {
    var t =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        MowingRiskDefine_1.MOWING_RISK_ENTRANCE_ID,
      );
    return { TitleTextId: t?.Name ?? "", IconPath: t?.TitleSprite ?? "" };
  }
  BuildInstanceDetailDataByInstanceId(t) {
    t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    return {
      TitleTextId: t?.MapName ?? "",
      ContentTextId: t?.DungeonDesc ?? "",
      AttributeList: [{ IconPath: "", AttributeTextId: t?.MonsterTips ?? "" }],
      LockData: { LockDescriptionTextId: "", LockDescriptionTextArgs: [] },
    };
  }
  BuildInstanceRecommendDataByInstanceId(t) {
    return {
      TextId: "RecommendLevel",
      TextArgs: [
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
          t,
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
        ).toString(),
      ],
    };
  }
  BuildInstanceTotalScore() {
    return "" + this.K5a.TotalScore;
  }
  BuildInBattleBuffDataById(t) {
    var e = this.Q5a;
    return {
      IconPath: e.GetBuffIconPathById(t),
      TitleTextId: e.GetBuffNameTextIdById(t),
    };
  }
  BuildInBattleRootData() {
    var t = this.K5a,
      e = this.Q5a,
      i = t.ArtifactId,
      t = t.ArtifactBasicBuffTotalCount;
    return {
      LevelText: e.GetProgressLevel(i, t).toString(),
      ProgressPercentage: e.GetProgressPartialPercentage(i, t),
    };
  }
  BuildActivityRewardViewData() {
    return { DataPageList: [this.z5a(0), this.z5a(1)] };
  }
  BuildNewBuffTipsDataById(t) {
    var e = this.Q5a;
    return {
      IsGolden: e.IsNewBuffGoldenById(t),
      NameTextId: e.GetBuffNameTextIdById(t),
      NameHexColor: e.GetNewBuffNameHexColorById(t),
      IconPath: e.GetBuffIconPathById(t),
      DescriptionTextId: e.GetBuffDescriptionTextIdById(t),
      DescriptionArgs: e.GetBuffDescriptionArgsById(t),
      QualityTexPath: e.GetNewBuffQualityTexPathById(t),
    };
  }
  IsSuperBuffById(t) {
    return this.Q5a.IsSuperBuffByBuffId(t);
  }
  IsBuffGottenInBattleById(t) {
    var e = this.K5a;
    return this.Q5a.IsSuperBuffByBuffId(t)
      ? this.Q5a.IsSuperBuffAvailable(
          e.ArtifactId,
          t,
          e.ArtifactBasicBuffTotalCount,
        )
      : e.BasicBuffInfoInBattle.has(t);
  }
  IsBuffAvailableInActivity(t) {
    return this.K5a.Id === t.ActivityId;
  }
  z5a(t) {
    return { TabName: this.J5a(t), TabTips: this.Z5a(), DataList: this.e6a(t) };
  }
  e6a(t) {
    switch (t) {
      case 0:
        return this.t6a();
      case 1:
        return this.i6a();
      default:
        return [];
    }
  }
  t6a() {
    var t = [];
    for (const i of this.Q5a.RiskHarvestInstAll) {
      var e = this.o6a(i),
        e = {
          NameText: "",
          NameTextId: i.Desc,
          RewardList:
            ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreviewItemList(
              i.Reward,
            ),
          RewardState: e,
          RewardButtonText: this.Vea(e),
          RewardButtonRedDot: 1 === e,
          ClickFunction: () => {
            ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.RequestRiskHarvestInstRewardRequest(
              i.Id,
            ).then(this.X5a);
          },
        };
      t.push(e);
    }
    return t;
  }
  i6a() {
    var t = [];
    for (const i of this.Q5a.RiskHarvestScoreRewardAll) {
      var e = this.n6a(i),
        e = {
          NameText: "",
          NameTextId: i.Desc,
          RewardList:
            ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackagePreviewItemList(
              i.Reward,
            ),
          RewardState: e,
          RewardButtonText: this.Vea(e),
          RewardButtonRedDot: 1 === e,
          ClickFunction: () => {
            ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.RequestRiskHarvestScoreRewardRequest(
              i.Id,
            ).then(this.X5a);
          },
        };
      t.push(e);
    }
    return t;
  }
  o6a(t) {
    t = this.K5a.InstanceInfo.get(t.Id);
    return void 0 !== t && t.K6n && t.vih ? (t.mLs ? 2 : 1) : 0;
  }
  n6a(t) {
    var e = this.K5a;
    return e.TotalScore < t.Score ? 0 : e.HasScoreRewarded(t.Id) ? 2 : 1;
  }
  Vea(t) {
    switch (t) {
      case 2:
      case 1:
        return (
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "TowerDefence_Getbt1",
          ) ?? ""
        );
      case 0:
        return (
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "TowerDefence_Getbt3",
          ) ?? ""
        );
      default:
        return "";
    }
  }
  J5a(t) {
    switch (t) {
      case 0:
        return (
          ConfigManager_1.ConfigManager.TextConfig?.GetTextById(
            "BossRushLevelRewardText",
          ) ?? ""
        );
      case 1:
        return (
          ConfigManager_1.ConfigManager.TextConfig?.GetTextById(
            "BossRushScoreRewardText",
          ) ?? ""
        );
      default:
        return "";
    }
  }
  Z5a() {
    return StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MowingTotalPoint"),
      this.K5a.TotalScore.toString(),
    );
  }
  cXa(t) {
    t = this.K5a.GetBuffCountInBattleById(t);
    if (void 0 !== t)
      return StringUtils_1.StringUtils.Format(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("OverSeaServerLv"),
        t.toString(),
      );
  }
  get ActivityData() {
    return this.K5a;
  }
  get CurrentBuffViewUsage() {
    return this.$5a.CurrentBuffViewUsage;
  }
  set CurrentBuffViewUsage(t) {
    (this.$5a.CurrentBuffViewUsage = t),
      this.$5a.SyncCurrentShowingBuffConfigs();
  }
  get CurrentBuffViewType() {
    return this.$5a.CurrentBuffViewType;
  }
  set CurrentBuffViewType(t) {
    this.$5a.CurrentBuffViewType = t;
  }
  get EntireBasicBuffConfig() {
    return this.Q5a.BasicBuffConfigs;
  }
  get EntireSuperBuffConfig() {
    return this.Q5a.SuperBuffConfigs;
  }
  get CurrentChosenOverviewBuffId() {
    let t = this.$5a.CurrentChosenOverviewBuffId;
    var e;
    return (
      void 0 === t &&
        ((e = this.$5a.CurrentBasicBuffConfigs),
        (t = 0 < e.length ? e[0].Id : void 0),
        (this.$5a.CurrentChosenOverviewBuffId = t)),
      t
    );
  }
  set CurrentChosenOverviewBuffId(t) {
    this.$5a.CurrentChosenOverviewBuffId = t;
  }
  get CurrentChosenProgressIndex() {
    let t = this.$5a.CurrentChosenProgressIndex;
    return (
      void 0 === t && ((t = 0), (this.$5a.CurrentChosenProgressIndex = t)), t
    );
  }
  set CurrentChosenProgressIndex(t) {
    this.$5a.CurrentChosenProgressIndex = t;
  }
  get CurrentHelpButtonId() {
    return this.K5a.GetHelpId();
  }
  get CurrentInstanceId() {
    return ModelManager_1.ModelManager.InstanceDungeonEntranceModel
      .SelectInstanceId;
  }
  get IsPreQuestFinished() {
    return this.K5a.GetPreGuideQuestFinishState();
  }
  get UnFinishPreGuideQuestId() {
    return this.K5a.GetUnFinishPreGuideQuestId();
  }
  get ActivityTitleTextId() {
    return this.K5a.LocalConfig?.Title ?? "";
  }
  get ActivityDescriptionTextId() {
    return this.K5a.LocalConfig?.Desc ?? "";
  }
  get HasAnyReward() {
    return this.HasAnyInstanceReward || this.HasAnyScoreReward;
  }
  get HasAnyInstanceReward() {
    for (const t of this.Q5a.RiskHarvestInstAll)
      if (1 === this.o6a(t)) return !0;
    return !1;
  }
  get HasAnyScoreReward() {
    for (const t of this.Q5a.RiskHarvestScoreRewardAll)
      if (1 === this.n6a(t)) return !0;
    return !1;
  }
  get MapMarkId() {
    return MowingRiskDefine_1.MOWING_RISK_MAP_MARK_ID;
  }
  get MapMarkType() {
    return 6;
  }
  get NextNewBuffId() {
    return this.$5a.NewBuffToShowCache.shift();
  }
}
exports.MowingRiskModel = MowingRiskModel;
//# sourceMappingURL=MowingRiskModel.js.map
