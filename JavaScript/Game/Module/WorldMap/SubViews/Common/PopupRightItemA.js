"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupRightItemA = void 0);
const UE = require("ue"),
  PopupTypeRightItem_1 = require("../../../../Ui/Common/PopupTypeRightItem"),
  PopupCaption_1 = require("./PopupCaption");
class PopupRightItemA extends PopupTypeRightItem_1.PopupTypeRightItem {
  constructor() {
    super(...arguments), (this.xXa = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [0, UE.UIButtonComponent],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickCloseBtn]]);
  }
  async OnBeforeStartAsync() {
    (this.xXa = new PopupCaption_1.PopupCaption()),
      (this.xXa.OnCloseCall = this.OnClickCloseBtn),
      await this.xXa.CreateByActorAsync(this.GetItem(2).GetOwner()),
      this.AddChild(this.xXa);
  }
  SetTitleIcon(t) {
    this.xXa.SetTitleIcon(t);
  }
  SetTitleLocalTxt(t) {
    this.xXa.SetTitleLocalTxt(t);
  }
}
exports.PopupRightItemA = PopupRightItemA;
//# sourceMappingURL=PopupRightItemA.js.map
