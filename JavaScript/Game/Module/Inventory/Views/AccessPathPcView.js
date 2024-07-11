"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AccessPathPcView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AccessPathPcButton_1 = require("./AccessPathPcButton"),
  Info_1 = require("../../../../Core/Common/Info");
class AccessPathPcView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xmi = []),
      (this.wmi = () => {}),
      (this.Bmi = () => {
        UiManager_1.UiManager.CloseView("AccessPathPcView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UISprite],
      [12, UE.UIItem],
      [13, UE.UISprite],
      [14, UE.UIItem],
      [15, UE.UISprite],
      [16, UE.UIItem],
      [17, UE.UISprite],
      [18, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.wmi],
        [2, this.Bmi],
      ]);
  }
  OnStart() {
    this.bmi(), this.qmi(), this.AddEvents();
  }
  OnBeforeDestroy() {
    for (const t of this.xmi) t.Destroy();
    (this.xmi.length = 0), this.RemoveEvents();
  }
  AddEvents() {}
  RemoveEvents() {}
  qmi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData()
        .GetItemDataBase()
        .GetItemAccess(),
      e = this.GetItem(0);
    for (const i of t) {
      var s = new AccessPathPcButton_1.AccessPathPcButton(e, i);
      this.xmi.push(s);
    }
  }
  bmi() {
    var t = Info_1.Info.IsInKeyBoard();
    this.Gmi(t);
  }
  Gmi(t) {
    var e = this.GetSprite(3),
      s = this.GetItem(4),
      i = this.GetSprite(5),
      r = this.GetItem(6),
      h = this.GetSprite(7),
      a = this.GetItem(8),
      o = this.GetSprite(9),
      c = this.GetItem(10),
      n = this.GetSprite(11),
      U = this.GetItem(12),
      E = this.GetSprite(13),
      u = this.GetItem(14),
      _ = this.GetSprite(15),
      P = this.GetItem(16),
      v = this.GetSprite(17),
      M = this.GetItem(18);
    e.SetUIActive(t),
      s.SetUIActive(!t),
      i.SetUIActive(t),
      r.SetUIActive(!t),
      h.SetUIActive(t),
      a.SetUIActive(!t),
      o.SetUIActive(t),
      c.SetUIActive(!t),
      n.SetUIActive(t),
      U.SetUIActive(!t),
      E.SetUIActive(t),
      u.SetUIActive(!t),
      _.SetUIActive(t),
      P.SetUIActive(!t),
      v.SetUIActive(t),
      M.SetUIActive(!t);
  }
}
exports.AccessPathPcView = AccessPathPcView;
//# sourceMappingURL=AccessPathPcView.js.map
