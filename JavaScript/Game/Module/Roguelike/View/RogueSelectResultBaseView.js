"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueSelectResultBaseView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class RogueSelectResultBaseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OnDescModelChange = () => {
        this.Refresh();
      }),
      (this.CloseBtn = () => {
        this.OnCloseBtnClick();
      }),
      (this.TabBtn = (e) => {
        ModelManager_1.ModelManager.RoguelikeModel.UpdateDescModel(e === 1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIExtendToggle],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.CloseBtn],
        [1, this.TabBtn],
      ]);
  }
  OnStart() {
    const e =
      ModelManager_1.ModelManager.RoguelikeModel.GetDescModel() === 0 ? 1 : 0;
    this.GetExtendToggle(1)?.SetToggleState(e, !0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeDataUpdate,
      this.OnDescModelChange,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeDataUpdate,
      this.OnDescModelChange,
    );
  }
  Refresh() {}
  OnCloseBtnClick() {
    this.CloseMe();
  }
}
exports.RogueSelectResultBaseView = RogueSelectResultBaseView;
// # sourceMappingURL=RogueSelectResultBaseView.js.map
