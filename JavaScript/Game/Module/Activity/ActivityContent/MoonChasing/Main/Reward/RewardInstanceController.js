"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardInstanceController = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class RewardInstanceController {
  constructor() {
    (this.iOn = void 0), (this.TabDataList = []), (this.dla = 0);
  }
  RegisterMainView(t) {
    this.iOn = t;
  }
  async InitMainView() {
    this.iOn.InitTabViewComponent(),
      await Promise.all([
        this.iOn.InitTabComponent(),
        this.iOn.InitCaption(),
        this.iOn.InitGrandItem(),
      ]);
  }
  RefreshTabList() {
    (this.TabDataList =
      ModelManager_1.ModelManager.MoonChasingModel.GetRewardTabList()),
      this.iOn.SetTabState(0, !0, !0);
  }
  TabItemToggleClick(t) {
    t !== this.dla && this.iOn.SetTabState(this.dla, !1, !0), (this.dla = t);
    var s = this.TabDataList[t];
    this.iOn.SwitchTabView(s, t);
  }
}
exports.RewardInstanceController = RewardInstanceController;
//# sourceMappingURL=RewardInstanceController.js.map
