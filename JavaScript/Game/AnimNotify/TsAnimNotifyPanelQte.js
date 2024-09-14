"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  PanelQteController_1 = require("../Module/PanelQte/PanelQteController");
class TsAnimNotifyPanelQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.QteId = 0);
  }
  K2_Notify(e, t) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("PanelQte", 18, "AN触发通用QTE");
    let r = void 0;
    var o = e.GetOwner();
    return (
      o instanceof TsBaseCharacter_1.default &&
        ((o = o?.CharacterActorComponent?.Entity)
          ?.GetComponent(34)
          ?.SetCurAnInfo(this.exportIndex, t.GetName()),
        (r = o?.GetComponent(194).CreateAnimNotifyContent())),
      PanelQteController_1.PanelQteController.StartAnimNotifyQte(
        this.QteId,
        e,
        r,
      ),
      !0
    );
  }
  GetNotifyName() {
    return "通用QTE";
  }
}
exports.default = TsAnimNotifyPanelQte;
//# sourceMappingURL=TsAnimNotifyPanelQte.js.map
