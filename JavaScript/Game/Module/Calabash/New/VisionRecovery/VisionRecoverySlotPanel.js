"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoverySlotPanel = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CalabashDefine_1 = require("../../CalabashDefine");
const VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
class VisionRecoverySlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e, i = !0) {
    super(),
      (this.Ypt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)),
      (this.Jpt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)),
      (this.zpt = void 0),
      (this.Qpt = !1),
      (this.zpt = e),
      (this.Qpt = i);
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
    const e = new Array();
    e.push(this.Zpt(0)),
      e.push(this.Zpt(1)),
      e.push(this.Zpt(2)),
      e.push(this.Zpt(3)),
      e.push(this.Zpt(4)),
      await Promise.all(e);
  }
  async Zpt(e) {
    const i = this.GetItem(e);
    const s = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
      this.zpt,
      this.Qpt,
    );
    await s.CreateThenShowByActorAsync(i.GetOwner()), (this.Jpt[e] = s);
  }
  RefreshUi(s) {
    for (let i = 0; i < this.Ypt.length; i++) {
      let e = this.Ypt[i];
      (e = i >= s.length ? void 0 : s[i]), this.Jpt[i].RefreshUi(e);
    }
  }
}
exports.VisionRecoverySlotPanel = VisionRecoverySlotPanel;
// # sourceMappingURL=VisionRecoverySlotPanel.js.map
