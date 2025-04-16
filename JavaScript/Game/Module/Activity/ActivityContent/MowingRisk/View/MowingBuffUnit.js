"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffUnit = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GRAY_ALPHA = 0.85;
class MowingBuffUnit extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._9a = void 0),
      (this.ujr = void 0),
      (this.p9a = () => {
        (ModelManager_1.ModelManager.MowingRiskModel.CurrentChosenProgressIndex =
          this._9a.Index),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingSuperBuffGridItemClick,
          );
      }),
      (this.$$a = () => !this._9a.IsChosen);
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
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.p9a]]);
  }
  OnStart() {
    (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)),
      this.GetExtendToggle(6).CanExecuteChange.Bind(this.$$a);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(6).CanExecuteChange.Unbind();
  }
  RefreshByCustomData(e) {
    this._9a = e;
    var t = this.GetTexture(3);
    t?.SetUIActive(void 0 !== e.IconPath),
      e.IconPath && this.SetTextureByPath(e.IconPath, t),
      this.UpdateUnlockState(e.IsActive),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.NameTextId),
      this.GetText(5).SetText(e.ThresholdCount.toString()),
      this.GetExtendToggle(6).SetToggleStateForce(e.IsChosen ? 1 : 0),
      this.GetItem(7).SetUIActive(!1);
  }
  UpdateUnlockState(e) {
    this.GetSprite(0).SetUIActive(e),
      this.GetItem(1).SetUIActive(e),
      this.GetItem(2).SetUIActive(!e);
    var t = this.GetTexture(3);
    t?.SetIsGray(!e), t?.SetAlpha(e ? 1 : GRAY_ALPHA);
  }
  PlayUnlockSequence() {
    this.GetItem(7).SetUIActive(!0),
      this.UpdateUnlockState(!0),
      this.ujr.LitePlayAsync("Unlock", !0);
  }
}
exports.MowingBuffUnit = MowingBuffUnit;
//# sourceMappingURL=MowingBuffUnit.js.map
