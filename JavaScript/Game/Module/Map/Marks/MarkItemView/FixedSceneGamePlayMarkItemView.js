"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FixedSceneGamePlayMarkItemView = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class FixedSceneGamePlayMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnAfterShow() {
    super.OnAfterShow(), this.UpdateIcon();
  }
  OnSafeUpdate(e, r, a) {
    var t = this.Holder,
      i = t.IconPath,
      s = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
        t.MarkConfig.RelativeId,
      );
    !s || s.IsClose
      ? (t.IconPath = t.MarkConfig.LockMarkPic)
      : (t.IconPath = t.MarkConfig.UnlockMarkPic),
      i !== t.IconPath && this.OnIconPathChanged(t.IconPath);
  }
}
exports.FixedSceneGamePlayMarkItemView = FixedSceneGamePlayMarkItemView;
//# sourceMappingURL=FixedSceneGamePlayMarkItemView.js.map
