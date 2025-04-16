"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyBattleQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.BattleQteId = 0),
      (this.当前实体为玩家控制时才触发 = !1);
  }
  Constructor() {}
  K2_Notify(e, r) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "AN触发战斗QTE");
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (this.当前实体为玩家控制时才触发) {
      var t = e.CharacterActorComponent;
      if (!t?.Valid) return !1;
      if (!t.IsAutonomousProxy) return !1;
    }
    (t = e?.CharacterActorComponent?.Entity),
      (e = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(t)),
      (t = t
        ?.GetComponent(207)
        ?.CreateAnimNotifyContent(r.GetName(), this.exportIndex));
    return (
      e &&
        t &&
        ControllerHolder_1.ControllerHolder.BattleQteController.StartBattleQte(
          this.BattleQteId,
          t,
          e,
          0,
        ),
      !0
    );
  }
  GetNotifyName() {
    return "战斗QTE";
  }
}
exports.default = TsAnimNotifyBattleQte;
//# sourceMappingURL=TsAnimNotifyBattleQte.js.map
