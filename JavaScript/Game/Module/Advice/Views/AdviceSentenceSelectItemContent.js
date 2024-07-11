"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceSentenceSelectItemContent = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AdviceSentenceSelectItemContent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.sje = 0),
      (this.aje = () => {
        this.Og(), this.nHe();
      }),
      (this.Lke = () =>
        ModelManager_1.ModelManager.AdviceModel.PreSelectSortWordId !==
        this.sje),
      (this.ije = () => {
        ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
          ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
        ) !== this.sje &&
          (ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.set(
            ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
            this.sje,
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
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnClickAdviceSortWord,
      this.aje,
    );
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.Lke);
  }
  UpdateItem(e) {
    (this.sje = e), this.Og(), this.nje(), this.nHe();
  }
  Og() {
    var e =
      ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
      ) === this.sje;
    this.GetItem(2).SetUIActive(e);
  }
  nje() {
    let e = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
      this.sje,
    );
    (e = e.replace("{}", "_")), this.GetText(1).SetText(e);
  }
  nHe() {
    var e = this.GetExtendToggle(0).ToggleState,
      t = ModelManager_1.ModelManager.AdviceModel.CurrentPreSentenceWordMap.get(
        ModelManager_1.ModelManager.AdviceModel.CurrentSentenceSelectIndex,
      ),
      t = this.sje === t ? 1 : 0;
    e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnClickAdviceSortWord,
      this.aje,
    );
  }
}
exports.AdviceSentenceSelectItemContent = AdviceSentenceSelectItemContent;
//# sourceMappingURL=AdviceSentenceSelectItemContent.js.map
