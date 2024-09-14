"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SneakController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
class SneakController extends ControllerBase_1.ControllerBase {
  static StartSneaking() {
    (this.wpr = !0),
      this.B$t(!0),
      this.G$t(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakStart);
  }
  static EndSneaking() {
    (this.wpr = !1),
      this.B$t(!1),
      this.O$t(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakEnd);
  }
  static get IsSneaking() {
    return this.wpr;
  }
  static G$t() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnBattleStateChanged,
      this.Zpe,
    );
  }
  static O$t() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnBattleStateChanged,
      this.Zpe,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.Zpe,
      );
  }
  static B$t(e) {
    var t =
      Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(160);
    t?.Valid &&
      (e
        ? t.AddBuff(CharacterBuffIds_1.buffId.StealthIgnoreHateBuff, {
            InstigatorId: t.CreatureDataId,
            Reason: "SneakController",
          })
        : t.RemoveBuff(
            CharacterBuffIds_1.buffId.StealthIgnoreHateBuff,
            -1,
            "SneakController",
          ));
  }
}
(exports.SneakController = SneakController),
  ((_a = SneakController).wpr = !1),
  (SneakController.R$t = !1),
  (SneakController.Zpe = (e) => {
    _a.B$t(!e),
      e !== _a.R$t &&
        ((_a.R$t = e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSneakFoundChange,
          _a.R$t,
          0,
        ));
  });
//# sourceMappingURL=SneakController.js.map
