"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteTimeDilation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class PanelQteTimeDilation {
  constructor() {
    (this.ROi = 0), (this.UOi = 0);
  }
  Init() {
    (this.ROi = 1), (this.UOi = 1);
  }
  Clear() {}
  Start(t) {
    (this.ROi = t.Config.WorldTimeDilation),
      1 <= this.ROi || this.ROi < 0
        ? (this.ROi = 1)
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("PanelQte", 18, "界面QTE时停开始"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
            this.ROi,
          ));
  }
  Stop() {
    1 !== this.ROi &&
      ((this.ROi = 1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("PanelQte", 18, "界面QTE时停结束"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
        this.ROi,
      ));
  }
  GetWorldTimeDilation() {
    return this.ROi;
  }
  GetEntityTimeDilation() {
    return this.UOi;
  }
}
exports.PanelQteTimeDilation = PanelQteTimeDilation;
//# sourceMappingURL=PanelQteTimeDilation.js.map
