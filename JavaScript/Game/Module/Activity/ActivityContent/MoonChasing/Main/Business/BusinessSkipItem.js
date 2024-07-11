"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessSkipItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class BusinessSkipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.zGn = void 0),
      (this.vIa = void 0),
      (this.Bra = () => {
        1 === this.vIa[0]
          ? this.zGn?.SkipToBuild()
          : 0 === this.vIa[0] &&
            ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView(
              2,
              this.vIa[1],
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[2, this.Bra]]);
  }
  RegisterViewController(e) {
    this.zGn = e;
  }
  Refresh() {
    var r,
      t = ModelManager_1.ModelManager.MoonChasingModel.GetFirstUnlockData();
    if (t) {
      let e = "",
        i = "";
      1 === (this.vIa = t)[0]
        ? ((r = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(
            t[1],
          )),
          (r = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
            r.AssociateRole,
          )),
          (i = r.SmallHeadIcon),
          (e = "Moonfiesta_PartnerTip2"))
        : 0 === t[0] &&
          ((r = ConfigManager_1.ConfigManager.TaskConfig.GetBranchLineTaskById(
            t[1],
          )),
          (t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
            r.AssociateRole,
          )),
          (i = t.SmallHeadIcon),
          (e = "Moonfiesta_PartnerTip1")),
        this.SetTextureByPath(i, this.GetTexture(1)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
    }
  }
}
exports.BusinessSkipItem = BusinessSkipItem;
//# sourceMappingURL=BusinessSkipItem.js.map
