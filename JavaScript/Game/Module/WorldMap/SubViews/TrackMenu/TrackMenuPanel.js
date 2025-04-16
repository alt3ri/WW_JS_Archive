"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackMenuPanel = void 0);
const UE = require("ue"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  TrackMenuItem_1 = require("./TrackMenuItem");
class TrackMenuPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments), (this.VNl = void 0), (this.d5a = []);
  }
  GetResourceId() {
    return "UiItem_MapHandleNav";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.Close]]);
  }
  OnStart() {
    this.GetItem(1).SetUIActive(!1);
  }
  HNl(t) {
    var i = this.d5a.length;
    if (t !== i)
      if (i < t)
        for (let e = i; e < t; ++e) {
          var r = LguiUtil_1.LguiUtil.CopyItem(
            this.GetItem(1),
            this.GetVerticalLayout(0).RootUIComp,
          );
          this.d5a.push(r);
        }
      else for (let e = t; e < i; ++e) this.d5a[e].SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.HNl(e.length),
      (this.VNl = []),
      e.forEach((e, t) => {
        var i = new TrackMenuItem_1.TrackMenuItem();
        this.VNl.push(i), i.Init(this.d5a[t], e);
      });
  }
  OnCloseWorldMapSecondaryUi() {
    this.d5a.splice(0, this.VNl.length),
      this.VNl.forEach((e) => {
        e.Destroy();
      }),
      (this.VNl = []);
  }
  OnBeforeDestroy() {
    this.VNl = [];
  }
  GetNeedBgItem() {
    return !1;
  }
}
exports.TrackMenuPanel = TrackMenuPanel;
//# sourceMappingURL=TrackMenuPanel.js.map
