"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceWordSelectItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.sje = 0),
      (this.E9 = 0),
      (this.vje = () => {
        this.Og();
      }),
      (this.jbe = () => {
        (ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId =
          this.sje),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceWord,
          );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.jbe]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceWord,
      this.vje,
    );
  }
  Update(e, t) {
    (this.sje = e), (this.E9 = t), this.Og(), this.T2e();
  }
  nHe() {
    var e = this.GetExtendToggle(0).ToggleState;
    this.sje === ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId
      ? 1 !== e && this.GetExtendToggle(0).SetToggleStateForce(1, !1)
      : 0 !== e && this.GetExtendToggle(0).SetToggleStateForce(0, !1);
  }
  T2e() {
    if (0 === this.E9) {
      let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
        this.sje,
      );
      (e = e.replace("{}", "_")), this.GetText(1).SetText(e);
    } else {
      var e =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
          this.sje,
        );
      this.GetText(1).SetText(e);
    }
  }
  Og() {
    var e =
      this.sje === ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId;
    this.GetItem(2).SetUIActive(e), this.nHe();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceWord,
      this.vje,
    );
  }
}
exports.AdviceWordSelectItem = AdviceWordSelectItem;
//# sourceMappingURL=AdviceWordSelectItem.js.map
