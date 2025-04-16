"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleMorphLiuLiDaoLingHandle = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoleMorphHandleBase_1 = require("./RoleMorphHandleBase");
class RoleMorphLiuLiDaoLingHandle extends RoleMorphHandleBase_1.RoleMorphHandleBase {
  BeginMorph() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(
      7,
      [18, 9, 10],
      !1,
    );
  }
  EndMorph() {
    UiManager_1.UiManager.IsViewOpen("LiuLiDaoLingView") &&
      UiManager_1.UiManager.CloseView("LiuLiDaoLingView"),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(
        7,
        [18, 9, 10],
        !0,
      );
  }
}
exports.RoleMorphLiuLiDaoLingHandle = RoleMorphLiuLiDaoLingHandle;
//# sourceMappingURL=RoleMorphLiuLiDaoLingHandle.js.map
