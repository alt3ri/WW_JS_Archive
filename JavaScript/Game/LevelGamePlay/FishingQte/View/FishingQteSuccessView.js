"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteSuccessView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  DockyardItemListItem_1 = require("../../../Module/Activity/ActivityContent/Fishing/Dockyard/List/DockyardItemListItem"),
  GenericScrollViewNew_1 = require("../../../Module/Util/ScrollView/GenericScrollViewNew"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class FishingQteSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.kGe = void 0),
      (this.W2e = () => {
        var e = new DockyardItemListItem_1.DockyardItemListItem();
        return (e.NeedInteract = !1), e;
      }),
      (this.Lxt = () => {
        ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardWareHouseView(
          !1,
        ),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.Lxt],
        [1, this.Lxt],
      ]);
  }
  OnStart() {
    this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.W2e,
    );
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.kGe.RefreshByData(e, void 0, !0);
  }
}
exports.FishingQteSuccessView = FishingQteSuccessView;
//# sourceMappingURL=FishingQteSuccessView.js.map
