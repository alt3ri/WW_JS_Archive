"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControllerWithAssistantBase = void 0);
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
class ControllerWithAssistantBase extends ControllerBase_1.ControllerBase {
  static Init() {
    var t = super.Init();
    return this.OnRegisterNetEvent(), this.OnAddEvents(), t;
  }
  static Clear() {
    return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), super.Clear();
  }
  static OnInit() {
    return this.F$t(), !0;
  }
  static OnClear() {
    return this.V$t(), super.OnClear();
  }
  static OnRegisterNetEvent() {
    this.H$t();
  }
  static OnUnRegisterNetEvent() {
    this.j$t();
  }
  static OnAddEvents() {
    this.W$t();
  }
  static OnRemoveEvents() {
    this.K$t();
  }
  static F$t() {
    (this.Assistants = new Map()), this.RegisterAssistant();
  }
  static RegisterAssistant() {}
  static V$t() {
    if (this.Assistants) {
      for (var [, t] of this.Assistants) t.Destroy();
      this.Assistants.clear(), (this.Assistants = void 0);
    }
  }
  static H$t() {
    if (this.Assistants)
      for (var [, t] of this.Assistants) t.OnRegisterNetEvent();
  }
  static j$t() {
    if (this.Assistants)
      for (var [, t] of this.Assistants) t.OnUnRegisterNetEvent();
  }
  static W$t() {
    if (this.Assistants) for (var [, t] of this.Assistants) t.OnAddEvents();
  }
  static K$t() {
    if (this.Assistants) for (var [, t] of this.Assistants) t.OnRemoveEvents();
  }
  static AddAssistant(t, s) {
    s && (s.Init(), this.Assistants.set(t, s));
  }
}
(exports.ControllerWithAssistantBase = ControllerWithAssistantBase).Assistants =
  void 0;
//# sourceMappingURL=ControllerWithAssistantBase.js.map
