"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ElementItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  CommonSelectItem_1 = require("./CommonSelectItem");
class ElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.kao = void 0), (this.Zao = void 0);
  }
  Refresh(t, e, s) {
    this.Update(t);
  }
  Update(t) {
    (this.kao = t), this.PKt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  PKt() {
    var t;
    this.kao.Name
      ? this.GetText(1).ShowTextNew(this.kao.Name)
      : ((t = this.GetText(1)).SetChangeColor(
          this.kao.IsPreview,
          t.changeColor,
        ),
        t.SetText(this.kao.Count.toString())),
      this.Zao ||
        ((this.Zao = new CommonSelectItem_1.CommonElementItem()),
        this.Zao.Update(this.kao.ElementId),
        this.Zao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()).then(
          () => {
            this.Zao?.RefreshPanel();
          },
        ));
  }
}
exports.ElementItem = ElementItem;
//# sourceMappingURL=ElementItem.js.map
