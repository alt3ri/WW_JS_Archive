"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedSceneGameplayMarkItem = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  FixedSceneGamePlayMarkItemView_1 = require("../MarkItemView/FixedSceneGamePlayMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class FixedSceneGameplayMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, a, r, t, i, n = 1) {
    super(e, a, r, t, i, n), (this.InnerView = void 0);
  }
  OnCreateView() {
    this.InnerView =
      new FixedSceneGamePlayMarkItemView_1.FixedSceneGamePlayMarkItemView(this);
  }
  CheckCanShowView() {
    return super.CheckCanShowView();
  }
  InitIcon() {
    var e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
      this.MarkConfig.RelativeId,
    );
    !e || e.IsClose
      ? (this.IconPath = this.MarkConfig.LockMarkPic)
      : (this.IconPath = this.MarkConfig.UnlockMarkPic);
  }
}
exports.FixedSceneGameplayMarkItem = FixedSceneGameplayMarkItem;
//# sourceMappingURL=FixedSceneGamePlayMarkItem.js.map
