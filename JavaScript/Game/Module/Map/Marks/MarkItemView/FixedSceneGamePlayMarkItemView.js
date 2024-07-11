"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedSceneGamePlayMarkItemView = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class FixedSceneGamePlayMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnInitialize() {
    super.OnInitialize(), this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnSafeUpdate(e, a, r) {
    var i = this.Holder,
      t = i.IconPath,
      s = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
        i.MarkConfig.RelativeId,
      );
    !s || s.IsClose
      ? (i.IconPath = i.MarkConfig.LockMarkPic)
      : ((i.IconPath = i.MarkConfig.UnlockMarkPic),
        t !== i.IconPath && this.OnIconPathChanged(i.IconPath));
  }
}
exports.FixedSceneGamePlayMarkItemView = FixedSceneGamePlayMarkItemView;
//# sourceMappingURL=FixedSceneGamePlayMarkItemView.js.map
