"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsButtonItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.l4e = void 0),
      (this.c8a = 0),
      (this.UJa = new Set()),
      (this.Gke = void 0),
      (this.ije = () => {
        this.Gke?.();
        for (const t of this.UJa) t();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnBeforeDestroy() {
    (this.Gke = void 0), this.UJa.clear(), this.UnBindGivenUid(this.c8a);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e = this.GetButton(0)?.RootUIComp;
    if (void 0 !== e) return [e, e];
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetButton(0).AllowEventBubbleUp = t;
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetExtraFunction(t) {
    this.UJa.add(t);
  }
  DeleteExtraFunction(t) {
    this.UJa.delete(t);
  }
  SetRedDotVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  BindRedDot(t, e = 0) {
    var i = this.GetItem(1);
    i &&
      ((this.l4e = t), (this.c8a = e), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, i, void 0, e);
  }
  UnBindGivenUid(t) {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        this.l4e,
        this.GetItem(1),
        t,
      ),
      (this.l4e = void 0),
      (this.c8a = 0));
  }
  UnBindRedDot() {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindRedDot(this.l4e),
      (this.l4e = void 0),
      (this.c8a = 0));
  }
}
exports.RacingBetsButtonItem = RacingBetsButtonItem;
//# sourceMappingURL=RacingBetsButtonItem.js.map
