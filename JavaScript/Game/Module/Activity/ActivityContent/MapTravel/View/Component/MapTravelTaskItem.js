"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskItemBase = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  ActivitySmallItemGrid_1 = require("../../../UniversalComponents/ActivitySmallItemGrid"),
  ActivityButtonItem_1 = require("../../../UniversalComponents/Functional/ActivityButtonItem");
class TaskItemBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(),
      (this.ActivityBaseData = t),
      (this.RewardScrollView = void 0),
      (this.ButtonItem = void 0),
      (this.RewardButtonItem = void 0),
      (this.TaskData = void 0),
      (this.sGe = () => {
        return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
      }),
      (this.OnClickedButton = () => {}),
      (this.OnClickedRewardButton = () => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(4),
      t =
        ((this.ButtonItem = new ActivityButtonItem_1.ActivityButtonItem()),
        await this.ButtonItem.CreateByActorAsync(t.GetOwner()),
        this.ButtonItem.SetFunction(this.OnClickedButton),
        this.GetItem(7));
    (this.RewardButtonItem = new ActivityButtonItem_1.ActivityButtonItem()),
      await this.RewardButtonItem.CreateByActorAsync(t.GetOwner()),
      this.RewardButtonItem.SetFunction(this.OnClickedRewardButton);
  }
  OnStart() {
    (this.RewardScrollView = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(2),
      this.sGe,
    )),
      this.ButtonItem.SetLocalTextNew("MapTravelJump_Text"),
      this.RewardButtonItem.SetLocalTextNew("MapTravelGetReward_Text");
  }
  Refresh(t) {
    this.TaskData = t;
  }
}
exports.TaskItemBase = TaskItemBase;
//# sourceMappingURL=MapTravelTaskItem.js.map
