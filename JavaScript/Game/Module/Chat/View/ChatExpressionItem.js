"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatExpressionItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ChatExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.U9e = 0),
      (this.jYe = void 0),
      (this.sHe = () => {
        this.jYe && this.jYe(this.U9e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.sHe]]);
  }
  Refresh(t, s, i) {
    this.U9e = t.Id;
    var e = t.ExpressionTexturePath;
    const r = this.GetTexture(2);
    r.SetUIActive(!1),
      this.SetTextureByPath(e, r, void 0, () => {
        r.SetUIActive(!0);
      });
    e = t.Name;
    this.GetText(1).ShowTextNew(e);
  }
  BindOnClicked(t) {
    this.jYe = t;
  }
}
exports.ChatExpressionItem = ChatExpressionItem;
//# sourceMappingURL=ChatExpressionItem.js.map
