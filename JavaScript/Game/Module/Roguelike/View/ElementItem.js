"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  CommonSelectItem_1 = require("./CommonSelectItem");
class ElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.jso = void 0), (this.oao = void 0);
  }
  Refresh(t, e, s) {
    this.Update(t);
  }
  Update(t) {
    (this.jso = t), this.PWt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  PWt() {
    var t;
    this.jso.Name
      ? this.GetText(1).ShowTextNew(this.jso.Name)
      : ((t = this.GetText(1)).SetChangeColor(
          this.jso.IsPreview,
          t.changeColor,
        ),
        t.SetText(this.jso.Count.toString())),
      this.oao ||
        ((this.oao = new CommonSelectItem_1.CommonElementItem()),
        this.oao.Update(this.jso.ElementId),
        this.oao
          .CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
          .then(() => {
            this.oao?.RefreshPanel();
          }));
  }
}
exports.ElementItem = ElementItem;
//# sourceMappingURL=ElementItem.js.map
