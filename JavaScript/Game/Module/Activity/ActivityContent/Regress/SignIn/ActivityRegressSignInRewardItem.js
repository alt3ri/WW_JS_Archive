"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressSignInRewardItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressSignInRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sft = void 0),
      (this.Xy = 0),
      (this.hma = 0),
      (this.u6e = void 0),
      (this.G3e = () => {
        var e;
        ModelManager_1.ModelManager.ActivityRegressModel.CheckSignRewardState(
          this.hma,
          1,
        )
          ? this.u6e?.(this.Xy)
          : ((e =
              ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardConfigByIndex(
                this.Xy,
              )),
            ([e] =
              ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardPreviewReward(
                e,
              )),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
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
  RegisterItemClickCallBack(e) {
    this.u6e = e;
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(4).GetOwner()),
      this.sft.BindOnCanExecuteChange(() => !1),
      this.sft.BindOnExtendToggleClicked(this.G3e);
  }
  RefreshByData(e) {
    var i = (this.Xy = e) + 1;
    this.hma = i;
    this.GetText(5).SetText("0" + i);
    var t =
        ModelManager_1.ModelManager.ActivityRegressModel.CheckSignRewardState(
          this.hma,
          1,
        ),
      r = ModelManager_1.ModelManager.ActivityRegressModel.CheckSignRewardState(
        this.hma,
        2,
      ),
      i =
        ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardState(i),
      i =
        ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardLocalTextKeyByState(
          i,
        ),
      s = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, i), this.GetItem(1).SetUIActive(t);
    this.GetItem(2).SetUIActive(r);
    (s =
      ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardConfigByIndex(
        e,
      )),
      (i =
        ModelManager_1.ModelManager.ActivityRegressModel.GetSignRewardPreviewItemInfo(
          s,
        ));
    ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(
      this.sft,
      i,
    );
  }
}
exports.ActivityRegressSignInRewardItem = ActivityRegressSignInRewardItem;
//# sourceMappingURL=ActivityRegressSignInRewardItem.js.map
