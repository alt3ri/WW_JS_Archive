"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatExpressionItem = void 0);
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ChatExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.C8e = 0),
      (this.x$e = void 0),
      (this.K9e = () => {
        this.x$e && this.x$e(this.C8e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.K9e]]);
  }
  Refresh(t, s, i) {
    this.C8e = t.Id;
    let e = t.ExpressionTexturePath;
    const r = this.GetTexture(2);
    r.SetUIActive(!1),
      this.SetTextureByPath(e, r, void 0, () => {
        r.SetUIActive(!0);
      });
    e = t.Name;
    this.GetText(1).ShowTextNew(e);
  }
  BindOnClicked(t) {
    this.x$e = t;
  }
}
exports.ChatExpressionItem = ChatExpressionItem;
// # sourceMappingURL=ChatExpressionItem.js.map
