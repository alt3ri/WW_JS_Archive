"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessSkipItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class BusinessSkipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.aOn = void 0),
      (this.nRa = void 0),
      (this.fsa = () => {
        1 === this.nRa[0]
          ? this.aOn?.SkipToBuild()
          : 0 === this.nRa[0] &&
            ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView(
              2,
              this.nRa[1],
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.fsa]]);
  }
  RegisterViewController(e) {
    this.aOn = e;
  }
  Refresh() {
    var i = ModelManager_1.ModelManager.MoonChasingModel.GetFirstUnlockData();
    if (i) {
      let e = "";
      1 === (this.nRa = i)[0]
        ? (e = "Moonfiesta_PartnerTip2")
        : 0 === i[0] && (e = "Moonfiesta_PartnerTip1"),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    }
  }
}
exports.BusinessSkipItem = BusinessSkipItem;
//# sourceMappingURL=BusinessSkipItem.js.map
