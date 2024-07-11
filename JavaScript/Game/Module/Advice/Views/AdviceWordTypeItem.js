"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceWordTypeItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.rje = 0),
      (this.QHe = () => {
        this.Og();
      }),
      (this.Lke = () =>
        ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId !==
        this.rje),
      (this.ije = () => {
        ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId !==
          this.rje &&
          ((ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId =
            this.rje),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceSort,
          ));
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.QHe,
    );
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.Lke);
  }
  UpdateItem(e) {
    this.GetExtendToggle(0).OnStateChange.Clear(),
      this.GetExtendToggle(0).OnStateChange.Add(this.ije),
      (this.rje = e),
      this.Og(),
      this.nje();
  }
  Og() {
    var e = this.GetExtendToggle(0).ToggleState,
      t =
        ModelManager_1.ModelManager.AdviceModel.PreSelectSortTypeId !== this.rje
          ? 0
          : 1;
    e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
  nje() {
    var e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceTypeText(
      this.rje,
    );
    this.GetText(4).SetText(e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSort,
      this.QHe,
    );
  }
}
exports.AdviceWordTypeItem = AdviceWordTypeItem;
//# sourceMappingURL=AdviceWordTypeItem.js.map
