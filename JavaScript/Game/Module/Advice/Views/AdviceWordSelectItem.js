"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceWordSelectItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceWordSelectItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.X7e = 0),
      (this.S9 = 0),
      (this.aHe = () => {
        this.Og();
      }),
      (this.jbe = () => {
        (ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId =
          this.X7e),
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
      this.aHe,
    );
  }
  Update(e, t) {
    (this.X7e = e), (this.S9 = t), this.Og(), this.hke();
  }
  W9e() {
    const e = this.GetExtendToggle(0).ToggleState;
    this.X7e === ModelManager_1.ModelManager.AdviceModel.CurrentPreSelectWordId
      ? e !== 1 && this.GetExtendToggle(0).SetToggleStateForce(1, !1)
      : e !== 0 && this.GetExtendToggle(0).SetToggleStateForce(0, !1);
  }
  hke() {
    if (this.S9 === 0) {
      let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
        this.X7e,
      );
      (e = e.replace("{}", "_")), this.GetText(1).SetText(e);
    } else {
      const e =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
          this.X7e,
        );
      this.GetText(1).SetText(e);
    }
  }
  Og() {
    const e =
      this.X7e === ModelManager_1.ModelManager.AdviceModel.CurrentSelectWordId;
    this.GetItem(2).SetUIActive(e), this.W9e();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceWord,
      this.aHe,
    );
  }
}
exports.AdviceWordSelectItem = AdviceWordSelectItem;
// # sourceMappingURL=AdviceWordSelectItem.js.map
