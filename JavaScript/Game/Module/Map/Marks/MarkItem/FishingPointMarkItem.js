"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingPointMarkItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  FishingDefine_1 = require("../../../Activity/ActivityContent/Fishing/FishingDefine"),
  FishingPointMarkItemView_1 = require("../MarkItemView/FishingPointMarkItemView"),
  ServerMarkItem_1 = require("./ServerMarkItem");
class FishingPointMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, i, t, r) {
    super(e, i, t, r), (this.gNa = void 0);
  }
  get MarkConfig() {
    return this.gNa;
  }
  set MarkConfig(e) {
    this.gNa = e;
  }
  get MapId() {
    return this.ServerMarkInfo.MapId;
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  GetMarkItemViewType() {
    return 10;
  }
  CreateView() {
    return new FishingPointMarkItemView_1.FishingPointMarkItemView(this);
  }
  GetTitleText() {
    var e = this.EntityConfigId,
      e =
        ModelManager_1.ModelManager.FishingModel.GetFishingPointNameLocalKey(e),
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e);
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
      this.MarkConfig.MarkTitle,
      e,
    );
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo,
      i =
        (this.SetTrackData(e.TrackTarget),
        this.MarkItemEntity.GetComponent(16));
    (i.FishingPointEntityId = e.TrackTarget),
      i.Update(),
      this.SetConfigId(e.MarkConfigId),
      this.UpdateVisibleRelativeState();
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    (this.gNa = e),
      (this.MarkItemEntity.GetComponent(15).MapMarkConfig = e),
      this.OnAfterSetConfigId({
        ShowRange: e.ShowRange,
        MarkPic: e.UnlockMarkPic,
        ShowPriority: e.ShowPriority,
        Scale: e.Scale,
        CornerScale: e.CornerScale,
      }),
      this.UpdateIconPath();
  }
  UpdateIconPath() {
    if (0 === this.ServerMarkInfo.FishPointDetectSourceType) {
      var e = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(
        FishingDefine_1.FISHING_POINT_QUEST_MARK_ID,
      );
      this.IconPath = e.MarkPic;
    } else {
      e =
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigByEntityId(
          this.EntityConfigId,
        ).ShowItem;
      switch (
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(e).Type
      ) {
        case 1:
          return void (this.IconPath =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "T_IconMap_Activity_Navigation_4_UI",
            ));
        case 2:
          return void (this.IconPath =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "T_IconMap_Activity_Navigation_6_UI",
            ));
      }
      this.IconPath = this.MarkConfig.UnlockMarkPic;
    }
  }
}
exports.FishingPointMarkItem = FishingPointMarkItem;
//# sourceMappingURL=FishingPointMarkItem.js.map
