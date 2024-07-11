"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleModelLoadingItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleModelLoadingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.h1o = !0), (this.TDe = void 0), (this.jFe = !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.l1o();
  }
  OnBeforeDestroy() {
    this._1o();
  }
  _1o() {
    void 0 !== this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  l1o() {
    this.SetActive(this.h1o && this.jFe);
  }
  SetLoadingOpen(e) {
    this.jFe = e;
  }
  SetLoadingActive(e) {
    this.h1o !== e &&
      ((this.h1o = e)
        ? (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
            this._1o(), this.l1o();
          }, 300))
        : (this._1o(), this.l1o()));
  }
  SetIconPosition(e) {
    this.GetItem(0)?.SetAnchorOffset(e);
  }
}
exports.RoleModelLoadingItem = RoleModelLoadingItem;
//# sourceMappingURL=RoleModelLoadingItem.js.map
