"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDecodeTabItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BLACK_COLOR = "#000000FF";
class SignalDecodeTabItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, s, t) {
    super(),
      (this.TabIndex = e),
      (this.WaveformId = s),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.GetText(3).SetText(this.TabIndex.toString());
  }
  OnProcess(e) {
    var e = this.TabIndex === e,
      s = this.GetSprite(0),
      t = this.GetSprite(1),
      s = (s.SetUIActive(!e), t.SetUIActive(e), this.GetText(3));
    e
      ? (s.SetColor(UE.Color.FromHex(BLACK_COLOR)), s.SetAnchorOffsetY(30))
      : s.SetAnchorOffsetY(0);
  }
  UpdateColor(e) {
    e &&
      (this.GetSprite(0).SetColor(UE.Color.FromHex(e.ActiveColor)),
      this.GetText(3).SetColor(UE.Color.FromHex(e.ActiveColor)),
      this.GetSprite(1).SetColor(UE.Color.FromHex(e.ActiveColor)),
      this.GetSprite(2).SetColor(UE.Color.FromHex(e.ActiveColor)));
  }
  SetComplete() {
    this.GetSprite(2).SetUIActive(!0);
  }
}
exports.SignalDecodeTabItem = SignalDecodeTabItem;
//# sourceMappingURL=SignalDecodeTabItem.js.map
