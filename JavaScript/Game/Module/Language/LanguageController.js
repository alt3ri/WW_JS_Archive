"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageController = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LanguageController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TextLanguageChange,
      this.OnLanguageChange,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TextLanguageChange,
      this.OnLanguageChange,
    );
  }
  static RequestSetLanguage(e) {
    const t = new Protocol_1.Aki.Protocol.B_s();
    (t.d5n = e),
      Net_1.Net.Call(22277, t, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            19106,
          );
      });
  }
}
(exports.LanguageController = LanguageController).OnLanguageChange = (e, t) => {
  t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(t).LanguageType;
  LanguageController.RequestSetLanguage(t);
};
// # sourceMappingURL=LanguageController.js.map
