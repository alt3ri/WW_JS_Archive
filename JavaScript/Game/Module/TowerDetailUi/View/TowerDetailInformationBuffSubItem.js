"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationBuffSubItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailInformationBuffSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), (this.Pe = void 0), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Update(t) {
    (this.Pe = t), this.Og();
  }
  Og() {
    var t = this.Pe.Desc,
      t = (this.GetText(2).SetText(t), this.Pe.Name),
      t = (this.GetText(1).SetText(t), this.Pe.IconPath);
    ("" !== t && void 0 !== t) ||
      (StringUtils_1.StringUtils.IsEmpty(t)
        ? this.GetTexture(0).SetUIActive(!1)
        : (this.SetTextureByPath(t, this.GetTexture(0)),
          this.GetTexture(0).SetUIActive(!0)));
  }
}
exports.TowerDetailInformationBuffSubItem = TowerDetailInformationBuffSubItem;
//# sourceMappingURL=TowerDetailInformationBuffSubItem.js.map
