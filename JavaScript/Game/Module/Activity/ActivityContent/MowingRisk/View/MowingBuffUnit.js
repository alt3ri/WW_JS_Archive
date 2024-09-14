"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffUnit = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GRAY_ALPHA = 0.85;
class MowingBuffUnit extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.L6a = void 0),
      (this.B6a = () => {
        (ModelManager_1.ModelManager.MowingRiskModel.CurrentChosenProgressIndex =
          this.L6a.Index),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingSuperBuffGridItemClick,
          );
      }),
      (this.DWa = () => !this.L6a.IsChosen);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[6, this.B6a]]);
  }
  OnStart() {
    this.GetExtendToggle(6).CanExecuteChange.Bind(this.DWa);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(6).CanExecuteChange.Unbind();
  }
  RefreshByCustomData(e) {
    (this.L6a = e),
      this.GetSprite(0).SetUIActive(e.IsActive),
      this.GetItem(1).SetUIActive(e.IsActive),
      this.GetItem(2).SetUIActive(!e.IsActive);
    var t = this.GetTexture(3);
    t?.SetUIActive(void 0 !== e.IconPath),
      e.IconPath &&
        (this.SetTextureByPath(e.IconPath, t),
        t?.SetIsGray(!e.IsActive),
        t?.SetAlpha(e.IsActive ? 1 : GRAY_ALPHA)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NameTextId),
      this.GetText(5).SetText(e.ThresholdCountContent),
      this.GetExtendToggle(6).SetToggleStateForce(e.IsChosen ? 1 : 0);
  }
}
exports.MowingBuffUnit = MowingBuffUnit;
//# sourceMappingURL=MowingBuffUnit.js.map
