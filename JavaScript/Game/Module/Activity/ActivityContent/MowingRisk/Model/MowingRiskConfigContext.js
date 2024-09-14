"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskConfigContext = void 0);
const RiskHarvestArtifactAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactAll"),
  RiskHarvestArtifactById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactById"),
  RiskHarvestBuffGroupAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupAll"),
  RiskHarvestBuffGroupById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupById"),
  RiskHarvestBuffRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffRewardAll"),
  RiskHarvestInstAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstAll"),
  RiskHarvestInstById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstById"),
  RiskHarvestInstByInstanceID_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstByInstanceID"),
  RiskHarvestScoreRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestScoreRewardAll"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  type2QualityData = new Map([
    [
      1,
      {
        HexColor: "3E9DFFFF",
        CfgQualityInfoId: 3,
        BackgroundResource: "T_MowingQualityBlue",
      },
    ],
    [
      2,
      {
        HexColor: "7645A3FF",
        CfgQualityInfoId: 4,
        BackgroundResource: "T_MowingQualityPurple",
      },
    ],
    [
      3,
      {
        HexColor: "FFBD47FF",
        CfgQualityInfoId: 5,
        BackgroundResource: "T_MowingQualityGold",
      },
    ],
  ]);
class MowingRiskConfigContext {
  constructor() {
    (this.V5a = void 0),
      (this.H5a = void 0),
      (this.j5a = new Map()),
      (this.L9a = new Map()),
      (this.W5a = (e, r) =>
        e.BuffType === r.BuffType ? e.Id - r.Id : e.BuffType - r.BuffType);
  }
  Init() {
    var e =
      RiskHarvestArtifactAll_1.configRiskHarvestArtifactAll.GetConfigList();
    if (void 0 !== e)
      for (const n of e) {
        var t,
          i,
          s = [],
          o = [],
          a = n.BasicBuffGroup;
        let r = 0;
        for ([t, i] of n.BuffGroup.entries()) {
          var f = a[t];
          s.push({ Index: t, BuffId: i, Threshold: f });
          for (let e = r; e < f; e++) {
            var u = (e - r) / (f - r);
            o.push({
              Count: e,
              SuperLevel: t,
              Partial: u,
              Overall: (u + t) / n.BuffGroup.length,
            });
          }
          r = f;
        }
        o.push({
          Count: a.at(-1) ?? 0,
          SuperLevel: a.length,
          Partial: 1,
          Overall: 1,
        }),
          this.j5a.set(n.Id, s),
          this.L9a.set(n.Id, o);
      }
  }
  Dispose() {}
  GetBuffHexColorById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    return void 0 === e
      ? "FFFFFFFF"
      : (type2QualityData.get(e.BuffType)?.HexColor ?? "FFFFFFFF");
  }
  GetBuffNameTextIdById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    return void 0 === e ? "" : e.BuffName;
  }
  GetBuffDescriptionTextIdById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    return void 0 === e ? "" : e.BuffDesc;
  }
  GetBuffDescriptionArgsById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    return void 0 === e ? [] : e.BuffFactors;
  }
  GetBuffIconPathById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    return void 0 === e ? "" : e.BuffIcon;
  }
  GetBuffQualityInfoById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (void 0 !== e) {
      e = type2QualityData.get(e.BuffType);
      if (void 0 !== e)
        return ConfigManager_1.ConfigManager.CommonConfig?.GetItemQualityById(
          e.CfgQualityInfoId,
        );
    }
  }
  GetBuffQualityPathById(e) {
    return (
      this.GetBuffQualityInfoById(e)?.MediumItemGridQualitySpritePath ?? ""
    );
  }
  GetNewBuffNameHexColorById(e) {
    return this.GetBuffQualityInfoById(e)?.TextColor ?? "FFFFFFFF";
  }
  GetNewBuffQualityTexPathById(e) {
    return this.GetBuffQualityInfoById(e)?.AcquireNewItemQualityTexPath ?? "";
  }
  IsNewBuffGoldenById(e) {
    return 5 === this.GetBuffQualityInfoById(e)?.Id;
  }
  GetBuffIntroduceBackgroundPath(e) {
    var e =
      RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    return void 0 === e || void 0 === (e = type2QualityData.get(e.BuffType))
      ? ""
      : ((e = e.BackgroundResource),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e));
  }
  GetBuffMaxCountByArtifactId(e) {
    return (
      RiskHarvestArtifactById_1.configRiskHarvestArtifactById
        .GetConfig(e)
        ?.BasicBuffGroup.at(-1) ?? 0
    );
  }
  GetProgressOverallPercentage(e, r) {
    e = this.L9a.get(e);
    return void 0 === e ? 0 : r >= e.length ? 1 : e[r].Overall;
  }
  GetProgressPartialPercentage(e, r) {
    e = this.L9a.get(e);
    return void 0 === e ? 0 : r >= e.length ? 1 : e[r].Partial;
  }
  GetProgressLevel(e, r) {
    e = this.L9a.get(e);
    return void 0 === e
      ? 0
      : r >= e.length
        ? (e.at(-1)?.SuperLevel ?? 0)
        : e[r].SuperLevel;
  }
  GetBuffThresholdByArtifactIdAndIndex(e, r) {
    e = this.j5a.get(e);
    return void 0 === e || r >= e.length ? 0 : e[r].Threshold;
  }
  GetBuffIdByArtifactIdAndIndex(e, r) {
    e = this.j5a.get(e);
    return void 0 === e || r >= e.length ? 0 : e[r].BuffId;
  }
  GetThresholdDataByArtifactId(e) {
    return this.j5a.get(e);
  }
  GetBuffTypeById(e) {
    e = RiskHarvestBuffGroupById_1.configRiskHarvestBuffGroupById.GetConfig(e);
    if (void 0 !== e) return e.BuffType;
  }
  GetIdByInstanceId(e) {
    e =
      RiskHarvestInstByInstanceID_1.configRiskHarvestInstByInstanceID.GetConfig(
        e,
      );
    if (void 0 !== e) return e.Id;
  }
  GetInstanceRewardScoreById(e) {
    return (
      RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(e)
        ?.RewardScore ?? 0
    );
  }
  GetScoreToUnlockById(e) {
    e = RiskHarvestInstById_1.configRiskHarvestInstById.GetConfig(e);
    return void 0 === e || 0 === e.UnlockInst ? 0 : e.UnlockScore;
  }
  IsSuperBuffByBuffId(e) {
    return 3 === this.GetBuffTypeById(e);
  }
  IsSuperBuffAvailable(e, r, t) {
    if (this.IsSuperBuffByBuffId(r)) {
      e = this.j5a.get(e);
      if (void 0 !== e)
        for (const i of e) if (i.BuffId === r && t >= i.Threshold) return !0;
    }
    return !1;
  }
  get BasicBuffConfigs() {
    if (void 0 === this.V5a) {
      var e = [];
      for (const r of RiskHarvestBuffGroupAll_1.configRiskHarvestBuffGroupAll.GetConfigList())
        r.BuffType < 3 && e.push(r);
      e.sort(this.W5a), (this.V5a = e);
    }
    return this.V5a;
  }
  get SuperBuffConfigs() {
    if (void 0 === this.H5a) {
      var e = [];
      for (const r of RiskHarvestBuffGroupAll_1.configRiskHarvestBuffGroupAll.GetConfigList())
        3 === r.BuffType && e.push(r);
      e.sort(this.W5a), (this.H5a = e);
    }
    return this.H5a;
  }
  get RiskHarvestInstAll() {
    return RiskHarvestInstAll_1.configRiskHarvestInstAll.GetConfigList() ?? [];
  }
  get RiskHarvestScoreRewardAll() {
    return (
      RiskHarvestScoreRewardAll_1.configRiskHarvestScoreRewardAll.GetConfigList() ??
      []
    );
  }
  get RiskHarvestBuffRewardAll() {
    return (
      RiskHarvestBuffRewardAll_1.configRiskHarvestBuffRewardAll.GetConfigList() ??
      []
    );
  }
  get MaxRewardScore() {
    var e =
      RiskHarvestScoreRewardAll_1.configRiskHarvestScoreRewardAll.GetConfigList();
    return void 0 === e ? 0 : e[e.length - 1].Score;
  }
  get IsInstanceNewCache() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MowingRiskIsInstanceNew,
    );
    if (void 0 !== e) return e;
    var r = new Map(),
      e = RiskHarvestInstAll_1.configRiskHarvestInstAll.GetConfigList();
    if (void 0 !== e) {
      for (const t of e) r.set(t.Id, !0);
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MowingRiskIsInstanceNew,
        r,
      );
    }
    return r;
  }
  set IsInstanceNewCache(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.MowingRiskIsInstanceNew,
      e,
    );
  }
}
exports.MowingRiskConfigContext = MowingRiskConfigContext;
//# sourceMappingURL=MowingRiskConfigContext.js.map
