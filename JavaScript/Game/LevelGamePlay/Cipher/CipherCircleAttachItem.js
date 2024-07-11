"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherCircleAttachItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AutoAttachItem_1 = require("../../Module/AutoAttach/AutoAttachItem"),
  WRONG_COLOR = "BB5C58",
  RIGHT_COLOR = "F6D03F",
  NORMAL_COLOR = "FFFFFF";
class CipherCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.fye = 0),
      (this.pye = void 0),
      (this.vye = UE.Color.FromHex(WRONG_COLOR)),
      (this.Mye = UE.Color.FromHex(RIGHT_COLOR)),
      (this.Eye = UE.Color.FromHex(NORMAL_COLOR)),
      (this.Sye = void 0);
  }
  OnMoveItem() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefreshItem(t) {
    (this.pye = t),
      void 0 !== this.pye && this.GetText(0).SetText(this.pye.toString());
  }
  OnSelect() {
    ModelManager_1.ModelManager.CipherModel.SetCurPassword(this.fye, this.pye);
    var t = this.GetText(0);
    t.SetChangeColor(!1, t.changeColor), this.Sye && this.Sye(this.pye);
  }
  OnUnSelect() {
    var t = this.GetText(0);
    t.SetColor(this.Eye), t.SetChangeColor(!0, t.changeColor);
  }
  InitData(t, e) {
    (this.fye = t), (this.Sye = e);
  }
  HandleConfirm(t) {
    let e = this.vye;
    t && (e = this.Mye), this.GetText(0).SetColor(e);
  }
  GetNumber() {
    return this.pye;
  }
}
exports.CipherCircleAttachItem = CipherCircleAttachItem;
//# sourceMappingURL=CipherCircleAttachItem.js.map
