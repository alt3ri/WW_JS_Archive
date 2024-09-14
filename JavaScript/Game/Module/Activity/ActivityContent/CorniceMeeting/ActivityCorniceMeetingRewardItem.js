"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCorniceMeetingRewardItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
class ActivityCorniceMeetingRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.bOe = void 0),
      (this.HFe = 0),
      (this.JGe = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.s3e = () => {
        var e =
          ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.CorniceMeetingRewardRequest(
          e.CurrentSelectLevelPlayId,
          this.GridIndex,
          () => {
            this.n3e();
          },
        );
      });
  }
  GetKey(e, i) {}
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.s3e]]);
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(1);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, () =>
      this.JGe(),
    );
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  Refresh(e, i, t) {
    (this.HFe = e), this.mGe(), this.jqe(), this.n3e();
  }
  Clear() {}
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(0),
      "ActivityCorniceMeetingPointNeed",
      this.HFe.toString(),
    );
  }
  jqe() {
    var e =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData(),
      e = e.GetScoreIndexPreviewItem(e.CurrentSelectLevelPlayId, this.HFe);
    this.bOe.RefreshByData(e);
  }
  n3e() {
    var e =
        ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData(),
      e = e.GetRewardState(e.CurrentSelectLevelPlayId, this.GridIndex);
    this.GetText(2).SetUIActive(!1),
      this.GetButton(4).RootUIComp.SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.GetSprite(3).SetUIActive(!1),
      0 === e
        ? this.GetText(2).SetUIActive(!0)
        : 1 === e
          ? (this.GetItem(5).SetUIActive(!0),
            this.GetButton(4).RootUIComp.SetUIActive(!0))
          : 2 === e && this.GetSprite(3).SetUIActive(!0);
  }
}
exports.ActivityCorniceMeetingRewardItem = ActivityCorniceMeetingRewardItem;
//# sourceMappingURL=ActivityCorniceMeetingRewardItem.js.map
