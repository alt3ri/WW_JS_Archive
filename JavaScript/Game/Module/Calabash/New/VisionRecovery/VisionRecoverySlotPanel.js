"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoverySlotPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CalabashDefine_1 = require("../../CalabashDefine"),
  VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
class VisionRecoverySlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e, i = !0) {
    super(),
      (this.hMt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)),
      (this.lMt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)),
      (this._Mt = void 0),
      (this.nMt = !1),
      (this._Mt = e),
      (this.nMt = i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = new Array();
    e.push(this.uMt(0)),
      e.push(this.uMt(1)),
      e.push(this.uMt(2)),
      e.push(this.uMt(3)),
      e.push(this.uMt(4)),
      await Promise.all(e);
  }
  async uMt(e) {
    var i = this.GetItem(e),
      s = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
        this._Mt,
        this.nMt,
      );
    await s.CreateThenShowByActorAsync(i.GetOwner()), (this.lMt[e] = s);
  }
  RefreshUi(s) {
    for (let i = 0; i < this.hMt.length; i++) {
      let e = this.hMt[i];
      (e = i >= s.length ? void 0 : s[i]), this.lMt[i].RefreshUi(e);
    }
  }
}
exports.VisionRecoverySlotPanel = VisionRecoverySlotPanel;
//# sourceMappingURL=VisionRecoverySlotPanel.js.map
