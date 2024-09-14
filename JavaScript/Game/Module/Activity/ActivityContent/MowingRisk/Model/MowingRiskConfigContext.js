"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskConfigContext = void 0);
const RiskHarvestArtifactAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactAll"),
  RiskHarvestArtifactById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestArtifactById"),
  RiskHarvestBuffGroupAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupAll"),
  RiskHarvestBuffGroupById_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffGroupById"),
  RiskHarvestBuffRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestBuffRewardAll"),
  RiskHarvestInstAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstAll"),
  RiskHarvestInstByInstanceID_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestInstByInstanceID"),
  RiskHarvestScoreRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/RiskHarvestScoreRewardAll"),
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
          f = [],
          o = n.BasicBuffGroup;
        let r = 0;
        for ([t, i] of n.BuffGroup.entries()) {
          var u = o[t];
          s.push({ Index: t, BuffId: i, Threshold: u });
          for (let e = r; e < u; e++) {
            var a = (e - r) / (u - r);
            f.push({
              Count: e,
              SuperLevel: t,
              Partial: a,
              Overall: (a + t) / n.BuffGroup.length,
            });
          }
          r = u;
        }
        f.push({
          Count: o.at(-1) ?? 0,
          SuperLevel: o.length,
          Partial: 1,
          Overall: 1,
        }),
          this.j5a.set(n.Id, s),
          this.L9a.set(n.Id, f);
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
}
exports.MowingRiskConfigContext = MowingRiskConfigContext;
//# sourceMappingURL=MowingRiskConfigContext.js.map