"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LanguageController = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
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
    var t = new Protocol_1.Aki.Protocol.Pms();
    (t.XVn = e),
      Net_1.Net.Call(12314, t, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            13572,
          );
      });
  }
}
(exports.LanguageController = LanguageController).OnLanguageChange = (e, t) => {
  t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(t).LanguageType;
  LanguageController.RequestSetLanguage(t);
};
//# sourceMappingURL=LanguageController.js.map
