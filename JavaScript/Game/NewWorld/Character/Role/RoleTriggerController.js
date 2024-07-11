"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTriggerController = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  CharacterNameDefines_1 = require("../Common/CharacterNameDefines"),
  TRIGGER_HALF_HEIGHT_DEVIATION = 0;
class RoleTriggerController extends ControllerBase_1.ControllerBase {
  static GetMyRoleTrigger() {
    return this.Lir;
  }
  static DebugTestWorldDone() {
    this.nye();
  }
  static OnInit() {
    return (
      (this.Rir = !1),
      (this.Uir = !1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      this.Pir(),
      !0
    );
  }
  static Pir() {
    (this.Rir = !1),
      (this.Uir = !1),
      this.Lir?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.Lir), (this.Lir = void 0)),
      (this.xir = void 0);
  }
  static OnTick(e) {
    this.Rir &&
      this.Lir?.IsValid() &&
      Global_1.Global.BaseCharacter &&
      this.Lir.K2_SetActorTransform(
        Global_1.Global.BaseCharacter.GetTransform(),
        !1,
        void 0,
        !0,
      );
  }
  static OnChangeMode() {
    return (
      this.Rir &&
        this.Lir?.IsValid() &&
        Global_1.Global.BaseCharacter &&
        ((RoleTriggerController.Uir = !0),
        RoleTriggerController.xir.SetCollisionEnabled(0)),
      !0
    );
  }
}
((exports.RoleTriggerController = RoleTriggerController).Rir = !1),
  (RoleTriggerController.Uir = !1),
  (RoleTriggerController.Lir = void 0),
  (RoleTriggerController.xir = void 0),
  (RoleTriggerController.uMe = () => {
    RoleTriggerController.Pir();
  }),
  (RoleTriggerController.nye = () => {
    if (!RoleTriggerController.Rir) {
      RoleTriggerController.Rir = !0;
      let e = void 0,
        r = 77 + TRIGGER_HALF_HEIGHT_DEVIATION,
        t = 25;
      Global_1.Global.BaseCharacter
        ? ((e = Global_1.Global.BaseCharacter.GetTransform()),
          (r =
            Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleHalfHeight +
            TRIGGER_HALF_HEIGHT_DEVIATION),
          (t = Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleRadius))
        : (e = new UE.Transform()),
        (RoleTriggerController.Lir = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          e,
        )),
        (RoleTriggerController.xir =
          RoleTriggerController.Lir.AddComponentByClass(
            UE.CapsuleComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
        RoleTriggerController.Lir.SetActorHiddenInGame(!0),
        RoleTriggerController.xir.SetCapsuleHalfHeight(r, !1),
        RoleTriggerController.xir.SetCapsuleRadius(t, !1),
        RoleTriggerController.xir.SetCollisionProfileName(
          CharacterNameDefines_1.CharacterNameDefines.ROLE_TRIGGER_NAME,
          !1,
        );
    }
  }),
  (RoleTriggerController.xie = (e, r) => {
    RoleTriggerController.Rir &&
      e?.Valid &&
      (e = e.Entity.GetComponent(3)?.Actor)?.IsValid() &&
      (RoleTriggerController.xir?.SetCapsuleHalfHeight(
        e.CapsuleComponent.CapsuleHalfHeight + TRIGGER_HALF_HEIGHT_DEVIATION,
        !1,
      ),
      RoleTriggerController.xir?.SetCapsuleRadius(
        e.CapsuleComponent.CapsuleRadius,
        !1,
      ),
      RoleTriggerController.Uir) &&
      ((RoleTriggerController.Uir = !1),
      RoleTriggerController.xir?.SetCollisionEnabled(1));
  });
//# sourceMappingURL=RoleTriggerController.js.map
