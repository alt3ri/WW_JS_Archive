"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorPowerInfoComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RoleFavorPowerInfoComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(), (this.guo = t), e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UINiagara],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalText(e, "FavorPowerFile"),
      this.GetText(3).ShowTextNew(this.guo.TalentName),
      this.GetText(4).ShowTextNew(this.guo.TalentDoc),
      this.GetText(5).ShowTextNew(this.guo.TalentCertification);
  }
  OnBeforeDestroy() {
    this.guo = void 0;
  }
}
exports.RoleFavorPowerInfoComponent = RoleFavorPowerInfoComponent;
//# sourceMappingURL=RoleFavorPowerInfoComponent.js.map
