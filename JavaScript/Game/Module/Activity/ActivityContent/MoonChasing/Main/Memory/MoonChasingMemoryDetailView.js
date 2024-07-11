"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingMemoryDetailView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  MemoryContentItem_1 = require("./MemoryContentItem");
class MoonChasingMemoryDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.H9s = void 0),
      (this.j9s = void 0),
      (this.W9s = () => new MemoryContentItem_1.MemoryContentItemA()),
      (this.K9s = () => new MemoryContentItem_1.MemoryContentItemB());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.H9s = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.W9s,
      )),
      (this.j9s = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.K9s,
      ));
  }
  OnBeforeShow() {
    var e = this.OpenParam,
      t = e.filter((e) => 0 === e.Classify),
      t = (this.H9s.RefreshByData(t), e.filter((e) => 1 === e.Classify));
    this.j9s.RefreshByData(t);
  }
}
exports.MoonChasingMemoryDetailView = MoonChasingMemoryDetailView;
//# sourceMappingURL=MoonChasingMemoryDetailView.js.map
