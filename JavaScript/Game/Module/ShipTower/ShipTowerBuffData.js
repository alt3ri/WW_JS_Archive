"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerBuffData = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ShipTowerBuffData {
  constructor() {
    (this.Id = 0),
      (this.BuffIds = []),
      (this.ItemId = 0),
      (this.Quality = 0),
      (this.ItemNameKey = ""),
      (this.ObtainedShowDescKey = ""),
      (this.BgDescKey = ""),
      (this.IsSelected = !1),
      (this.AG_ = !1),
      (this.Season = 0);
  }
  get CanUseCount() {
    return this.TotalUseCount - this.UsedCount;
  }
  get IsUnlock() {
    return 0 < this.TotalUseCount;
  }
  get TotalUseCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.ItemId,
    );
  }
  get UsedCount() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList;
    return t[0]?.IsHaveProtoData
      ? t
          .filter((t) => !t.IsEndLess && t.IsUnLocked())
          .reduce((t, e) => {
            return (
              t +
              e.TeamDataList.filter((t) => t.BuffDataEdit?.Id === this.Id)
                .length
            );
          }, 0)
      : 0;
  }
  Init(t) {
    (this.Id = t.Id),
      (this.ItemId = t.ItemId),
      (this.AG_ = !!t.Unlimited),
      (this.BuffIds = t.BuffIds),
      (this.Season = t.Season),
      this.zn_();
  }
  zn_() {
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.ItemId);
    t &&
      ((this.Quality = t.QualityId),
      (this.ItemNameKey = t.Name),
      (this.ObtainedShowDescKey = t.ObtainedShowDescription),
      (this.BgDescKey = t.BgDescription));
  }
  SetSelected(t) {
    t &&
      (ModelManager_1.ModelManager.ShipTowerModel.CurSelectBuffData?.SetSelected(
        !1,
      ),
      (ModelManager_1.ModelManager.ShipTowerModel.CurSelectBuffData = this)),
      (this.IsSelected = t);
  }
  ClearSelected() {
    this.IsSelected = !1;
  }
  CanUseCountStr(t) {
    return this.IsUnlimited(t) ? "∞" : this.CanUseCount.toString();
  }
  IsUnlimited(t) {
    return (
      !!this.AG_ ||
      !(
        !t ||
        !ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(t)
          ?.IsEndLess
      )
    );
  }
  IsShowNumTextCallback(t) {
    return !this.IsUnlimited(t);
  }
  GetQualityColor() {
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
      this.Quality,
    );
    return UE.Color.FromHex(t.DropColor);
  }
  IsCanUse(t) {
    return (
      !ModelManager_1.ModelManager.ShipTowerModel?.IsOldSeason(this.Season) &&
      !!this.IsUnlock &&
      (!!this.IsUnlimited(t) || 0 < this.CanUseCount)
    );
  }
  GetQualityTitle() {
    return "GhostShipItemQuality_Text" + this.Quality;
  }
  IsFirstGet() {
    return (
      !!this.IsUnlock &&
      !ModelManager_1.ModelManager.ShipTowerModel.PlayerGetBuffSet.has(this.Id)
    );
  }
  AddToGetState() {
    return (
      !!this.IsFirstGet() &&
      (ModelManager_1.ModelManager.ShipTowerModel.AddPlayerGetBuff(this.Id), !0)
    );
  }
}
exports.ShipTowerBuffData = ShipTowerBuffData;
//# sourceMappingURL=ShipTowerBuffData.js.map
