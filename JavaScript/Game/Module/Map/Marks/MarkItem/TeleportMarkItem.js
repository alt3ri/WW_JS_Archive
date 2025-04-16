"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportMarkItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  TeleportMarkItemView_1 = require("../MarkItemView/TeleportMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class TeleportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, i, n, a = 1) {
    super(e, r, t, i, n, a), (this.InnerView = void 0), (this.IsDirty = !1);
  }
  get IsFogUnlock() {
    return (
      (6 === this.MarkConfig.ObjectType && !this.IsLocked) || super.IsFogUnlock
    );
  }
  GetMarkItemViewType() {
    return 24;
  }
  CreateView() {
    return new TeleportMarkItemView_1.TeleportMarkItemView(this);
  }
  get IconPath() {
    return this.IsLocked
      ? this.MarkConfig.LockMarkPic
      : this.MarkConfig.UnlockMarkPic;
  }
  set IconPath(e) {}
  get IsActivity() {
    return 13 === this.MarkConfig.ObjectType;
  }
  get IsDungeonEntrance() {
    return (
      2 === this.MarkConfig.RelativeType ||
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdLinkDungeonEntrance(
        this.MarkConfigId,
      )
    );
  }
  get IsTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(
      this.MarkConfigId,
    );
  }
  get IsRoguelike() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRoguelike(
      this.MarkConfigId,
    );
  }
  get IsWeeklyRogue() {
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(
      this.MarkConfigId,
    );
    return !!e && 29 === e.InstSubType;
  }
  get IsRogueRes() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRogueRes(
      this.MarkConfigId,
    );
  }
  get IsShipTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsShipTowerEntrance(
      this.MarkConfigId,
    );
  }
  IsMultiMap() {
    return 0 !== this.MarkConfig.MultiMapFloorId;
  }
  GetMultiMapId() {
    return this.MarkConfig.MultiMapFloorId;
  }
  GetSecondaryUiType() {
    return this.IsActivity
      ? super.GetSecondaryUiType()
      : this.IsDungeonEntrance
        ? this.IsTowerEntrance
          ? WorldMapDefine_1.ESecondaryPanel.TowerEntrancePanel
          : this.IsRoguelike
            ? WorldMapDefine_1.ESecondaryPanel.RoguelikePanel
            : this.IsWeeklyRogue
              ? WorldMapDefine_1.ESecondaryPanel.WeeklyRoguePanel
              : this.IsRogueRes
                ? WorldMapDefine_1.ESecondaryPanel.RogueResPanel
                : this.IsShipTowerEntrance
                  ? WorldMapDefine_1.ESecondaryPanel.ShipTowerEntrancePanel
                  : WorldMapDefine_1.ESecondaryPanel
                      .InstanceDungeonEntrancePanel
        : WorldMapDefine_1.ESecondaryPanel.TeleportPanel;
  }
}
exports.TeleportMarkItem = TeleportMarkItem;
//# sourceMappingURL=TeleportMarkItem.js.map
