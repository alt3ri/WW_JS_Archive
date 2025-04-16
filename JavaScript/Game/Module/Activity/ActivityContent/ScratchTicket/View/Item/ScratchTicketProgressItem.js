"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketProgressItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UISprite],
    ];
  }
  Refresh(t, s, r) {
    var e = t.GetRoundState(),
      i = (this.GetItem(0).SetUIActive(1 === e), this.GetSprite(1)),
      i =
        (i.SetChangeColor(1 !== e, i.changeColor),
        this.GetItem(2).SetUIActive(0 === e),
        this.GetItem(3).SetUIActive(2 === e),
        this.GetSprite(4)),
      o = this.GetSprite(5);
    i.SetUIActive(1 === e),
      this.SetSpriteByPath(t.Config.YellowRoundIcon, i, !1, void 0),
      o.SetUIActive(1 !== e),
      this.SetSpriteByPath(t.Config.BlackRoundIcon, o, !1, void 0);
  }
}
exports.ScratchTicketProgressItem = ScratchTicketProgressItem;
//# sourceMappingURL=ScratchTicketProgressItem.js.map
