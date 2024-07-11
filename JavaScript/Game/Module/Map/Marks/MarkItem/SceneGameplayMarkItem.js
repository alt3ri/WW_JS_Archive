"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneGameplayMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneGameplayMarkItemView_1 = require("../MarkItemView/SceneGameplayMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class SceneGameplayMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, a, r, t, i, n = 1) {
    super(e, a, r, t, i, n), (this.InnerView = void 0);
  }
  OnCreateView() {
    this.InnerView = new SceneGameplayMarkItemView_1.SceneGameplayMarkItemView(
      this,
    );
  }
  CheckCanShowView() {
    const e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
      this.MarkConfig.RelativeId,
    );
    return !(!e || e.IsClose) && super.CheckCanShowView();
  }
  InitIcon() {
    const e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
      this.MarkConfig.RelativeId,
    );
    (e && !e.IsClose) || (this.IconPath = this.MarkConfig.LockMarkPic),
      (this.IconPath = this.MarkConfig.UnlockMarkPic);
  }
}
exports.SceneGameplayMarkItem = SceneGameplayMarkItem;
// # sourceMappingURL=SceneGameplayMarkItem.js.map
