"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSentenceSelectItemContent = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceSentenceSelectItemContent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.X7e = 0),
      (this.$7e = () => {
        this.Og(), this.W9e();
      }),
      (this.T7e = () =>
        ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId !==
        this.X7e),
      (this.j7e = () => {
        ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
          ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
        ) !== this.X7e &&
          (ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.set(
            ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
            this.X7e,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnClickAdviceSortWord,
          ));
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.j7e]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSortWord,
      this.$7e,
    );
    const e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.T7e);
  }
  UpdateItem(e) {
    (this.X7e = e), this.Og(), this.Q7e(), this.W9e();
  }
  Og() {
    const e =
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
      ) === this.X7e;
    this.GetItem(2).SetUIActive(e);
  }
  Q7e() {
    let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
      this.X7e,
    );
    (e = e.replace("{}", "_")), this.GetText(1).SetText(e);
  }
  W9e() {
    const e = this.GetExtendToggle(0).ToggleState;
    var t =
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
      );
    var t = this.X7e === t ? 1 : 0;
    e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSortWord,
      this.$7e,
    );
  }
}
exports.AdviceSentenceSelectItemContent = AdviceSentenceSelectItemContent;
// # sourceMappingURL=AdviceSentenceSelectItemContent.js.map
