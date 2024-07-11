"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsGetWayItem = exports.TipsGetWayPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
class TipsGetWayPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.yxt = void 0),
      (this.Ixt = void 0),
      (this.Txt = (t, e, s) => {
        return { Key: s, Value: new TipsGetWayItem(e, t) };
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.Ixt = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(0),
      this.Txt,
    );
  }
  OnBeforeDestroy() {
    this.yxt = [];
  }
  Refresh(t) {
    t.sort((t, e) => {
      var s = t.SortIndex,
        i = e.SortIndex;
      return s === i ? e.Id - t.Id : i - s;
    }),
      (this.yxt = t),
      this.Ixt.RebuildLayoutByDataNew(this.yxt),
      this.SetActive(0 !== this.yxt.length);
  }
}
exports.TipsGetWayPanel = TipsGetWayPanel;
class TipsGetWayItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.Gke = void 0),
      (this.Lxt = () => {
        this.Gke && this.Gke();
      }),
      (this.Pe = e),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.Lxt],
        [1, this.Lxt],
      ]);
  }
  OnStart() {
    switch (((this.Gke = this.Pe.Function), this.Pe.Type)) {
      case 2:
        this.GetButton(0).RootUIComp.SetUIActive(!0),
          this.GetButton(1).RootUIComp.SetUIActive(!1),
          this.GetText(2).ShowTextNew(this.Pe.Text);
        break;
      case 1:
        this.GetButton(0).RootUIComp.SetUIActive(!1),
          this.GetButton(1).RootUIComp.SetUIActive(!0),
          this.GetText(3).ShowTextNew(this.Pe.Text);
    }
  }
  OnBeforeDestroy() {
    (this.Pe = void 0), (this.Gke = void 0);
  }
}
exports.TipsGetWayItem = TipsGetWayItem;
//# sourceMappingURL=ItemTipsGetWay.js.map
