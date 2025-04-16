"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  SceneGameplayMarkItemView_1 = require("../MarkItemView/SceneGameplayMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class SceneGameplayMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, a, t, i, n = 1) {
    super(e, r, a, t, i, n), (this.InnerView = void 0);
  }
  GetMarkItemViewType() {
    return 20;
  }
  CreateView() {
    return new SceneGameplayMarkItemView_1.SceneGameplayMarkItemView(this);
  }
  CheckCanShowView() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
      this.MarkConfig.RelativeId,
    );
    return !(!e || e.IsClose) && super.CheckCanShowView();
  }
  InitIcon() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
      this.MarkConfig.RelativeId,
    );
    (e && !e.IsClose) || (this.IconPath = this.MarkConfig.LockMarkPic),
      (this.IconPath = this.MarkConfig.UnlockMarkPic);
  }
  GetSecondaryUiType() {
    return 24 === this.MarkType
      ? WorldMapDefine_1.ESecondaryPanel.CorniceMeetingPanel
      : this.IsLordGym() || this.IsNewLordGym()
        ? WorldMapDefine_1.ESecondaryPanel.LordGymPanel
        : WorldMapDefine_1.ESecondaryPanel.SceneGameplayPanel;
  }
}
exports.SceneGameplayMarkItem = SceneGameplayMarkItem;
//# sourceMappingURL=SceneGameplayMarkItem.js.map
