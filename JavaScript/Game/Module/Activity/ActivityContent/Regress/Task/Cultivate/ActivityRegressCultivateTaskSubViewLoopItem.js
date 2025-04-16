"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressCultivateTaskSubViewLoopItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ButtonItem_1 = require("../../../../../Common/Button/ButtonItem"),
  CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
class ActivityRegressCultivateTaskSubViewLoopItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.bOe = void 0),
      (this.El1 = void 0),
      (this.uPa = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.tWt = () => {
        var e = this.Pe.Config,
          t =
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
              e.Id,
            );
        0 === t
          ? SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.AccessPathId)
          : 1 === t &&
            ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimTaskReward(
              e.Id,
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.JGe,
    );
    var e = this.GetItem(4),
      e =
        ((this.El1 = new ButtonItem_1.ButtonItem(e)),
        this.El1.SetFunction(this.tWt),
        this.El1.SetShowText("RecallActivity_Go"),
        this.GetItem(6));
    (this.uPa = new ButtonItem_1.ButtonItem(e)),
      this.uPa.SetShowText("CollectActivity_state_CanRecive"),
      this.uPa.SetFunction(this.tWt);
  }
  Refresh(e, t, i) {
    (this.Pe = e), this.P5e(), this.Nqe(), this._Oe(), this.Z3e();
  }
  P5e() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, this.Pe.Config.TargetName);
  }
  Nqe() {
    var e = this.Pe.Config.Id,
      [e, t] =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskProgressTuple(
          e,
        );
    this.GetText(1).SetText(e + "/" + t);
  }
  _Oe() {
    var e = this.Pe.Config.Id,
      e =
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(
          e,
        );
    this.GetItem(7).SetUIActive(!1),
      this.GetItem(5).SetUIActive(2 === e),
      this.El1.SetUiActive(0 === e),
      this.uPa.SetUiActive(1 === e);
  }
  Z3e() {
    var e =
      ModelManager_1.ModelManager.ActivityRegressModel.GetDropPreviewRewardItemListForPreview(
        this.Pe.Config.TargetReward,
      );
    this.bOe.RefreshByData(e);
  }
}
exports.ActivityRegressCultivateTaskSubViewLoopItem =
  ActivityRegressCultivateTaskSubViewLoopItem;
//# sourceMappingURL=ActivityRegressCultivateTaskSubViewLoopItem.js.map
