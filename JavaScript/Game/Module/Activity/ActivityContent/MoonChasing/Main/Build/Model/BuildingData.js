"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingData = void 0);
const MultiTextLang_1 = require("../../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class BuildingData {
  constructor(t) {
    (this.Id = t), (this.Level = 0), (this.IsUnlock = !1);
  }
  get IsBuild() {
    return 0 < this.Level;
  }
  GetBuildingName() {
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
      this.Id,
    );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
  }
  GetConsumeCount() {
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
      this.Id,
    );
    return 0 === this.Level
      ? t.UnLockPrice
      : ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingUpGradeCurveByGroupIdAndLevel(
          t.UpGradeCurve,
          this.Level,
        ).UpGradePrice;
  }
  NXs(t, e) {
    return { TextId: t, ValueText: e };
  }
  GetAdditionDataList(t) {
    var t = MathUtils_1.MathUtils.Clamp(t, 1, this.LevelMax),
      e = [],
      i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id),
      i =
        ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingUpGradeCurveByGroupIdAndLevel(
          i.UpGradeCurve,
          t,
        );
    return (
      0 !== i.GoldAddition &&
        ((t = i.GoldAddition / 10 + "%"),
        e.push(this.NXs("Moonfiesta_UP1", t))),
      0 !== i.GoldAdditionFix &&
        e.push(this.NXs("Moonfiesta_UP7", i.GoldAdditionFix.toString())),
      0 !== i.WishAdditionFix &&
        e.push(this.NXs("Moonfiesta_UP2", i.WishAdditionFix.toString())),
      0 !== i.EnergyAddition &&
        ((t = i.EnergyAddition / 10 + "%"),
        e.push(this.NXs("Moonfiesta_UP3", t))),
      0 !== i.IdeaRatioAddition &&
        ((t = i.IdeaRatioAddition / 10 + "%"),
        e.push(this.NXs("Moonfiesta_UP4", t))),
      0 !== i.SuccessAddition &&
        ((t = i.SuccessAddition / 10 + "%"),
        e.push(this.NXs("Moonfiesta_UP5", t))),
      0 !== i.HeatAddition &&
        e.push(this.NXs("Moonfiesta_UP6", i.HeatAddition.toString())),
      e
    );
  }
  GetLevelUpIncreaseDesc() {
    var t = this.GetAdditionDataList(this.Level);
    return t.length < 1
      ? StringUtils_1.EMPTY_STRING
      : ((t = t[0]),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.TextId) +
          t.ValueText);
  }
  GetAssociateRoleId() {
    return ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.Id)
      .AssociateRole;
  }
  get IsCanLevelUp() {
    var t = this.GetConsumeCount(),
      e = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    return (
      t <= ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e)
    );
  }
  get LevelMax() {
    var t = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
        this.Id,
      ),
      t =
        ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingUpGradeCurveByGroupId(
          t.UpGradeCurve,
        );
    return t[t.length - 1].Level;
  }
  get IsMax() {
    return this.Level >= this.LevelMax;
  }
}
exports.BuildingData = BuildingData;
//# sourceMappingURL=BuildingData.js.map
