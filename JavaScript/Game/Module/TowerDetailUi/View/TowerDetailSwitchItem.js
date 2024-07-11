"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailSwitchItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailSwitchItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.LDo = void 0),
      (this.Lke = () =>
        ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId !==
        this.LDo.Index),
      (this.DDo = () => {
        (ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId =
          this.LDo.Index),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickSingleTimeTowerDetailSwitchBtn,
          );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.DDo]]);
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.SetToggleGroup(void 0),
      e.CanExecuteChange.Unbind(),
      e.CanExecuteChange.Bind(this.Lke);
  }
  Update(e) {
    e = (this.LDo = e).Name;
    this.GetText(1).SetText(e), this.Og();
  }
  Og() {
    ModelManager_1.ModelManager.TowerDetailModel.CurrentSelectDetailId !==
    this.LDo.Index
      ? this.GetExtendToggle(0).SetToggleStateForce(0, !1)
      : this.GetExtendToggle(0).SetToggleStateForce(1, !1);
  }
}
exports.TowerDetailSwitchItem = TowerDetailSwitchItem;
//# sourceMappingURL=TowerDetailSwitchItem.js.map
