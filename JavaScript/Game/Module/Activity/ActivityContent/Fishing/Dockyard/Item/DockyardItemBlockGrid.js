"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardItemBlockGrid = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class DockyardItemBlockGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.H_t = void 0),
      (this.sit = void 0),
      (this.Xe = 0);
  }
  OnRegisterComponent() {
    (this.sit = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UISprite],
        [1, UE.UIDraggableComponent],
      ]);
  }
  uYl() {
    (this.H_t = this.GetDraggable(1)),
      this.H_t.OnPointerDownCallBack.Bind(this.sit.OnPointerDown),
      this.H_t.OnPointerCancelCallBack.Bind(this.sit.OnPointerUp),
      this.H_t.OnPointerUpCallBack.Bind(this.sit.OnPointerUp),
      this.H_t.OnPointerBeginDragCallBack.Bind(this.sit.OnDragBegin),
      this.H_t.OnPointerDragCallBack.Bind(this.sit.OnDrag),
      this.H_t.OnPointerEndDragCallBack.Bind(this.sit.OnDragEnd);
  }
  OnStart() {
    this.uYl(), this.GetSprite(0).SetUIActive(!1);
  }
  Refresh(t, s, i) {
    (this.Xe = this.sit.GetValueByPanelPos(t)), this.RefreshDragItemActive(!1);
  }
  RefreshDragItemActive(t) {
    this.H_t.RootUIComp.SetUIActive(0 !== this.Xe || t);
  }
}
exports.DockyardItemBlockGrid = DockyardItemBlockGrid;
//# sourceMappingURL=DockyardItemBlockGrid.js.map
