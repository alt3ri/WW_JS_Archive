"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepChoiceItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine");
class CiacconaGalStepChoiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Ebc = void 0),
      (this.H5e = void 0),
      (this.OZt = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnClick(
          this.Ebc.Id,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIExtendToggleTextureTransition],
    ]),
      (this.BtnBindInfo = [[0, this.OZt]]);
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(0);
  }
  Refresh(i, t, e) {
    (this.Ebc = i), this.Dke(), this._Oe();
  }
  Dke() {
    this.Ebc &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Ebc.Content);
  }
  _Oe() {
    if (this.Ebc)
      switch ((this.H5e?.OnPointUpCallBack.Unbind(), this.Ebc.State)) {
        case 0:
          this.ehi("T_PlotReasoningIcon04"), this.H5e?.SetToggleState(0);
          break;
        case 1:
          this.ehi("T_PlotReasoningIcon02"),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(1),
              CiacconaGalDefine_1.TEXT_CIACCONA_LOCKING_BY_INSPIRATION,
              [this.Ebc.RequiredInspiration],
            ),
            this.H5e?.SetToggleState(0);
          break;
        case 2:
          this.ehi("T_PlotReasoningIcon01"),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(1),
              this.Ebc.Content,
            ),
            this.H5e?.SetToggleState(0);
          break;
        case 3:
          this.ehi("T_PlotReasoningIcon03"),
            this.H5e?.SetToggleState(2),
            this.H5e?.OnPointUpCallBack.Bind(this.OZt);
      }
  }
  async ehi(i) {
    var t = this.GetUiExtendToggleTextureTransition(2);
    await this.SetExtendToggleTextureTransitionByPath(
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i),
      t,
    ),
      t.GetRootComponent().SetUIActive(!0);
  }
}
exports.CiacconaGalStepChoiceItem = CiacconaGalStepChoiceItem;
//# sourceMappingURL=CiacconaGalStepChoiceItem.js.map
