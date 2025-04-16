"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerReviewView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ShipTowerDefine_1 = require("../ShipTowerDefine"),
  ShipTowerReviewItem_1 = require("./ShipTowerReviewItem");
class ShipTowerReviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.RD_ = void 0),
      (this.AD_ = () => {
        return new ShipTowerReviewItem_1.ShipTowerReviewItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.CloseMe.bind(this)]]);
  }
  Es_() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      (this.RD_ = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(2).GetOwner(),
        this.AD_,
        !0,
      ));
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    this.OpenParam?.Promise?.SetResult(!0);
  }
  UpdateData() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.ReviewList,
      e =
        (this.RD_?.RefreshByData(e),
        ModelManager_1.ModelManager.ShipTowerModel.ReviewProgressList),
      i = ShipTowerDefine_1.shipTowerTextKey.LastReviewProgress,
      r = this.GetText(3);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, i, ...e);
  }
}
exports.ShipTowerReviewView = ShipTowerReviewView;
//# sourceMappingURL=ShipTowerReviewView.js.map
