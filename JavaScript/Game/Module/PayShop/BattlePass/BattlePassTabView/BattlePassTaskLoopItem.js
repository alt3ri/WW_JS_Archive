"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassTaskLoopItem = exports.BattlePassTaskData = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BattlePassController_1 = require("../BattlePassController");
class BattlePassTaskData {
  constructor() {
    (this.RewardItemList = []),
      (this.TaskId = 0),
      (this.TaskState = 1),
      (this.UpdateType = 0),
      (this.CurrentProgress = 0),
      (this.TargetProgress = 0),
      (this.Exp = 0);
  }
}
exports.BattlePassTaskData = BattlePassTaskData;
class BattlePassTaskLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Uki = void 0),
      (this.BOe = 0),
      (this.XOt = () => {
        BattlePassController_1.BattlePassController.TryRequestTaskList([
          this.BOe,
        ]);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.XOt]]);
  }
  OnStart() {
    (this.Uki = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      this.Uki.Initialize(this.GetItem(5).GetOwner());
  }
  Refresh(t, s, e) {
    this.Uki.Refresh(t.RewardItemList[0]),
      this.GetButton(4).RootUIComp.SetUIActive(t.TaskState === 3),
      this.GetText(3).SetUIActive(t.TaskState === 1),
      this.GetSprite(2).SetUIActive(t.TaskState !== 1),
      (this.BOe = t.TaskId);
    const i = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(
      this.BOe,
    ).TaskName;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i),
      this.GetText(1).SetText(
        t.CurrentProgress.toString() + "/" + t.TargetProgress.toString(),
      );
  }
}
exports.BattlePassTaskLoopItem = BattlePassTaskLoopItem;
// # sourceMappingURL=BattlePassTaskLoopItem.js.map
