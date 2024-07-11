"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractionController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class InteractionController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      this.M1i,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      this.M1i,
    );
  }
}
(exports.InteractionController = InteractionController).M1i = () => {
  const e = ModelManager_1.ModelManager.InteractionModel;
  e.LoadInteractGuideData(), e.LoadAutoInteractionGuideAppearCount();
};
// # sourceMappingURL=InteractionController.js.map
