"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostTabItem = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
class CostTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor(t) {
    super(),
      (this.wqe = void 0),
      (this.Bke = (t) => {
        1 === t && this.SelectedCallBack(this.GridIndex);
      }),
      (this.wqe = t);
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), !0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.Bke]]);
  }
  OnStart() {
    super.OnStart(), this.GetExtendToggle(1).SetToggleState(0);
  }
  OnUpdateTabIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), !1, void 0);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.CostTabItem = CostTabItem;
//# sourceMappingURL=CostTabItem.js.map
