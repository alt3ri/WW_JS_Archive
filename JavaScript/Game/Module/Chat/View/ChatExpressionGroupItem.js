"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatExpressionGroupItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ChatExpressionGroupItem extends UiPanelBase_1.UiPanelBase {
  constructor(s) {
    super(),
      (this.aHe = 0),
      (this.jYe = void 0),
      (this.hSt = (s) => {
        1 === s && this.jYe && this.jYe(this.aHe);
      }),
      this.CreateThenShowByActor(s);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[1, this.hSt]]);
  }
  Refresh(s) {
    this.aHe = s.Id;
    s = s.GroupTexturePath;
    const e = this.GetTexture(0);
    e.SetUIActive(!1),
      this.SetTextureByPath(s, e, void 0, () => {
        e.SetUIActive(!0);
      });
  }
  SetState(s, e = !1) {
    this.GetExtendToggle(1).SetToggleState(s, e);
  }
  BindOnClicked(s) {
    this.jYe = s;
  }
}
exports.ChatExpressionGroupItem = ChatExpressionGroupItem;
//# sourceMappingURL=ChatExpressionGroupItem.js.map
