"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationConcertoItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FormationConcertoItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), (this.sst = ""), this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
    ];
  }
  RefreshConcertoInfoView(e, s, t) {
    var o = this.GetTexture(1);
    o.SetColor(t),
      this.GetSprite(0).SetColor(t),
      this.sst !== e.Icon3 &&
        ((this.sst = e.Icon3), this.SetElementIcon(e.Icon3, o, s));
  }
  RefreshConcertoProgress(e) {
    this.GetSprite(0).SetFillAmount(e);
  }
}
exports.FormationConcertoItem = FormationConcertoItem;
//# sourceMappingURL=FormationConcertoItem.js.map
