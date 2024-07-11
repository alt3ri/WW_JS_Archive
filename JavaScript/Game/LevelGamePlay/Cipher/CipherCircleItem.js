"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CipherCircleItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachExhibitionItem_1 = require("../../Module/CircleExhibition/AutoAttachExhibitionItem");
const WRONG_COLOR = "BB5C58";
const RIGHT_COLOR = "F6D03F";
const NORMAL_COLOR = "FFFFFF";
class CipherCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments),
      (this.fye = 0),
      (this.pye = void 0),
      (this.Pe = void 0),
      (this.vye = UE.Color.FromHex(WRONG_COLOR)),
      (this.Mye = UE.Color.FromHex(RIGHT_COLOR)),
      (this.Sye = UE.Color.FromHex(NORMAL_COLOR)),
      (this.Eye = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshItem(t) {
    (this.pye = this.Pe[this.GetShowItemIndex()]),
      void 0 !== this.pye && this.GetText(0).SetText(this.pye.toString());
  }
  OnSelect() {
    super.OnSelect(),
      ModelManager_1.ModelManager.CipherModel.SetCurPassword(
        this.fye,
        this.pye,
      ),
      (this.GetText(0).useChangeColor = !1),
      this.Eye && this.Eye(this.pye);
  }
  OnUnSelect() {
    super.OnUnSelect(),
      this.GetText(0).SetColor(this.Sye),
      (this.GetText(0).useChangeColor = !0);
  }
  SetData(t) {
    this.Pe = t;
  }
  InitItem(t, i) {
    (this.fye = t), (this.Eye = i);
  }
  HandleConfirm(t) {
    let i = this.vye;
    t && (i = this.Mye), this.GetText(0).SetColor(i);
  }
  GetNumber() {
    return this.pye;
  }
}
exports.CipherCircleItem = CipherCircleItem;
// # sourceMappingURL=CipherCircleItem.js.map
