"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityButtonItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityButtonItem extends UiPanelBase_1.UiPanelBase {
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
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnBeforeDestroy() {
    (this.Gke = void 0), this.UJa.clear(), this.UnBindGivenUid(this.c8a);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i = this.GetButton(0)?.RootUIComp;
    if (void 0 !== i) return [i, i];
  }
  SetButtonAllowEventBubbleUp(t) {
    this.GetButton(0).AllowEventBubbleUp = t;
  }
  SetText(t) {
    var i = this.GetText(1);
    i && i.SetText(t);
  }
  SetLocalTextNew(t, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...i);
  }
  SetShowText(t) {
    this.GetText(1).ShowTextNew(t);
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
    this.GetItem(2).SetUIActive(t);
  }
  BindRedDot(t, i = 0) {
    var e = this.GetItem(2);
    e &&
      ((this.l4e = t), (this.c8a = i), this.l4e) &&
      RedDotController_1.RedDotController.BindRedDot(t, e, void 0, i);
  }
  UnBindGivenUid(t) {
    this.l4e &&
      (RedDotController_1.RedDotController.UnBindGivenUi(
        this.l4e,
        this.GetItem(2),
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
exports.ActivityButtonItem = ActivityButtonItem;
//# sourceMappingURL=ActivityButtonItem.js.map
