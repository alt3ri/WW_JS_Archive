"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallSignInRewardItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityRecallHelper_1 = require("../Misc/ActivityRecallHelper");
class ActivityRecallSignInRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sft = void 0),
      (this.Xy = 0),
      (this.q_a = 0),
      (this.G_a = void 0),
      (this.G1a = void 0),
      (this.u6e = void 0),
      (this.G3e = () => {
        var i;
        this.G1a.CheckRewardState(this.q_a, 1)
          ? this.u6e?.(this.Xy)
          : (([i] =
              ModelManager_1.ModelManager.ActivityRecallModel.GetSignRewardPreviewReward(
                this.G_a,
              )),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              i,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.G3e]]);
  }
  RegisterItemClickCallBack(i) {
    this.u6e = i;
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(4).GetOwner()),
      this.sft.BindOnCanExecuteChange(() => !1),
      this.sft.BindOnExtendToggleClicked(this.G3e);
  }
  RefreshByData(i, e, t) {
    (this.G1a = i), (this.Xy = e), (this.G_a = t);
    i = e + 1;
    this.q_a = i;
    this.GetText(5).SetText("0" + i);
    var t = this.G1a.CheckRewardState(this.q_a, 1),
      e = this.G1a.CheckRewardState(this.q_a, 2),
      i = this.G1a.GetSignRewardState(i),
      s =
        ModelManager_1.ModelManager.ActivityRecallModel.GetSignRewardLocalTextKeyByState(
          i,
        ),
      r = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, s), this.GetItem(1).SetUIActive(t);
    this.GetItem(2).SetUIActive(e);
    var [r, s] =
      ModelManager_1.ModelManager.ActivityRecallModel.GetSignRewardPreviewItemInfo(
        this.G_a,
      );
    ActivityRecallHelper_1.ActivityRecallHelper.RefreshItemGrid(
      this.sft,
      r,
      s,
      [0 === i, 1 === i, 2 === i],
    );
  }
}
exports.ActivityRecallSignInRewardItem = ActivityRecallSignInRewardItem;
//# sourceMappingURL=ActivityRecallSignInRewardItem.js.map
