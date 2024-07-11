"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AccessPathPcView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const AccessPathPcButton_1 = require("./AccessPathPcButton");
class AccessPathPcView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xci = []),
      (this.wci = () => {}),
      (this.Bci = () => {
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
        [1, this.wci],
        [2, this.Bci],
      ]);
  }
  OnStart() {
    this.bci(), this.qci(), this.AddEvents();
  }
  OnBeforeDestroy() {
    for (const t of this.xci) t.Destroy();
    (this.xci.length = 0), this.RemoveEvents();
  }
  AddEvents() {}
  RemoveEvents() {}
  qci() {
    const t = ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData()
      .GetItemDataBase()
      .GetItemAccess();
    const e = this.GetItem(0);
    for (const i of t) {
      const s = new AccessPathPcButton_1.AccessPathPcButton(e, i);
      this.xci.push(s);
    }
  }
  bci() {
    const t = ModelManager_1.ModelManager.PlatformModel.IsPc();
    this.Gci(t);
  }
  Gci(t) {
    const e = this.GetSprite(3);
    const s = this.GetItem(4);
    const i = this.GetSprite(5);
    const h = this.GetItem(6);
    const r = this.GetSprite(7);
    const a = this.GetItem(8);
    const c = this.GetSprite(9);
    const o = this.GetItem(10);
    const U = this.GetSprite(11);
    const n = this.GetItem(12);
    const E = this.GetSprite(13);
    const u = this.GetItem(14);
    const _ = this.GetSprite(15);
    const M = this.GetItem(16);
    const P = this.GetSprite(17);
    const v = this.GetItem(18);
    e.SetUIActive(t),
      s.SetUIActive(!t),
      i.SetUIActive(t),
      h.SetUIActive(!t),
      r.SetUIActive(t),
      a.SetUIActive(!t),
      c.SetUIActive(t),
      o.SetUIActive(!t),
      U.SetUIActive(t),
      n.SetUIActive(!t),
      E.SetUIActive(t),
      u.SetUIActive(!t),
      _.SetUIActive(t),
      M.SetUIActive(!t),
      P.SetUIActive(t),
      v.SetUIActive(!t);
  }
}
exports.AccessPathPcView = AccessPathPcView;
// # sourceMappingURL=AccessPathPcView.js.map
