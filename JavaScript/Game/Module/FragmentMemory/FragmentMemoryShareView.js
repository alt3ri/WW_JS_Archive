"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryShareView = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../Util/LguiUtil");
class FragmentMemoryShareView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.$8i = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.Og();
  }
  Og() {
    (this.$8i = this.OpenParam), this.Aqe(), this.P5e(), this.Pqe(), this.u3e();
  }
  u3e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "FragmentMemoryCollectTime",
      this.$8i.GetTimeText(),
    );
  }
  Aqe() {
    this.SetTextureByPath(this.$8i.GetBgResource(), this.GetTexture(0));
  }
  P5e() {
    this.GetText(1).ShowTextNew(this.$8i.GetTitle());
  }
  Pqe() {
    this.GetText(3).ShowTextNew(this.$8i.GetDesc());
  }
}
exports.FragmentMemoryShareView = FragmentMemoryShareView;
//# sourceMappingURL=FragmentMemoryShareView.js.map
