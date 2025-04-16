"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TermExplanationComponent = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class TermExplanationComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.ePt = () => {
        this.Lri();
      });
  }
  OnPress(e) {
    ControllerHolder_1.ControllerHolder.TermExplanationController.OpenTermExplanationViewDirectly();
  }
  OnRefreshSelfHotKeyState(e) {
    this.Lri();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange,
      this.ePt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTermExplanationRegisteredTextContentChange,
      this.ePt,
    );
  }
  Lri() {
    var e =
      ControllerHolder_1.ControllerHolder.TermExplanationController.HasAnyTermInCurrentTexts();
    this.SetVisibleMode(2, e);
  }
}
exports.TermExplanationComponent = TermExplanationComponent;
//# sourceMappingURL=TermExplanationComponent.js.map
