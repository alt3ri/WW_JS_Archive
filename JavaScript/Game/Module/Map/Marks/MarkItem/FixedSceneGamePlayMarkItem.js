"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedSceneGameplayMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  FixedSceneGamePlayMarkItemView_1 = require("../MarkItemView/FixedSceneGamePlayMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class FixedSceneGameplayMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, t, i, r, a, s = 1) {
    super(e, t, i, r, a, s), (this.InnerView = void 0);
  }
  GetMarkItemViewType() {
    return 12;
  }
  CreateView() {
    return new FixedSceneGamePlayMarkItemView_1.FixedSceneGamePlayMarkItemView(
      this,
    );
  }
  OnInitialize() {
    super.OnInitialize(), this.uil();
  }
  InitIcon() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
      this.MarkConfig.RelativeId,
    );
    !e || e.IsClose
      ? (this.IconPath = this.MarkConfig.LockMarkPic)
      : (this.IconPath = this.MarkConfig.UnlockMarkPic);
  }
  IsMultiMap() {
    return 0 !== this.MarkConfig.MultiMapFloorId;
  }
  GetMultiMapId() {
    return this.MarkConfig.MultiMapFloorId;
  }
  OnUpdate(e) {
    super.OnUpdate(e), 1 === this.MapType && this.uil();
  }
  uil() {
    var e = this.IsSelectThisFloor;
    (this.IsSelectThisFloor = this.GetIsSelectThisFloor()),
      e !== this.IsSelectThisFloor && this.UpdateViewIcon();
  }
  GetSecondaryUiType() {
    return 24 === this.MarkType
      ? WorldMapDefine_1.ESecondaryPanel.CorniceMeetingPanel
      : this.IsLordGym() || this.IsNewLordGym()
        ? WorldMapDefine_1.ESecondaryPanel.LordGymPanel
        : WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel;
  }
}
exports.FixedSceneGameplayMarkItem = FixedSceneGameplayMarkItem;
//# sourceMappingURL=FixedSceneGamePlayMarkItem.js.map
