"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyTransitionView = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
class DangoMonopolyTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.OpenParam = void 0);
  }
  OnAfterPlayStartSequence() {
    this.OnTransitionCallback();
  }
  async OnTransitionCallback() {
    await this.OpenParam?.TransitionCallback(),
      await this.OpenPromise?.Promise,
      await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME),
      this.CloseMe();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.DangoMonopolyTransitionClose,
    );
  }
}
exports.DangoMonopolyTransitionView = DangoMonopolyTransitionView;
//# sourceMappingURL=DangoMonopolyTransitionView.js.map
