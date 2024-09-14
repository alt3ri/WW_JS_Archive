"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardInstanceController = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class RewardInstanceController {
  constructor() {
    (this.uOn = void 0), (this.TabDataList = []), (this.Cua = 0);
  }
  RegisterMainView(t) {
    this.uOn = t;
  }
  async InitMainView() {
    this.uOn.InitTabViewComponent(),
      await Promise.all([
        this.uOn.InitTabComponent(),
        this.uOn.InitCaption(),
        this.uOn.InitGrandItem(),
      ]);
  }
  RefreshTabList() {
    (this.TabDataList =
      ModelManager_1.ModelManager.MoonChasingModel.GetRewardTabList()),
      this.uOn.SetTabState(0, !0, !0);
  }
  TabItemToggleClick(t) {
    t !== this.Cua && this.uOn.SetTabState(this.Cua, !1, !0), (this.Cua = t);
    var s = this.TabDataList[t];
    this.uOn.SwitchTabView(s, t);
  }
}
exports.RewardInstanceController = RewardInstanceController;
//# sourceMappingURL=RewardInstanceController.js.map
