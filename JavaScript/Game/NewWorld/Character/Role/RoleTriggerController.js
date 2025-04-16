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
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../Common/CharacterNameDefines"),
  TRIGGER_HALF_HEIGHT_DEVIATION = 0;
class RoleTriggerController extends ControllerBase_1.ControllerBase {
  static GetMyRoleTrigger() {
    return this.Lir;
  }
  static GetMyRoleTriggerOrUndefined() {
    return this.Lir;
  }
  static DebugTestWorldDone() {
    this.nye();
  }
  static OnInit() {
    return (
      (this.IsInitTrigger = !1),
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
    (this.IsInitTrigger = !1),
      this.Lir?.IsValid() &&
        (ModelManager_1.ModelManager.GameModeModel.DetachStreamingSourceFromActor(),
        ActorSystem_1.ActorSystem.Put(
          "RoleTriggerController.ClearMyRoleTrigger",
          this.Lir,
        ),
        (this.Lir = void 0)),
      (this.xir = void 0);
  }
  static Koh() {
    if (!RoleTriggerController.IsInitTrigger && Global_1.Global.BaseCharacter) {
      RoleTriggerController.IsInitTrigger = !0;
      let e = void 0,
        r = 77 + TRIGGER_HALF_HEIGHT_DEVIATION,
        o = 25;
      Global_1.Global.BaseCharacter &&
        ((e = Global_1.Global.BaseCharacter.D_GetTransform()),
        (r =
          Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleHalfHeight +
          TRIGGER_HALF_HEIGHT_DEVIATION),
        (o = Global_1.Global.BaseCharacter.CapsuleComponent.CapsuleRadius)),
        (RoleTriggerController.Lir = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          e,
        )),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          RoleTriggerController.Lir?.SetActorLabel("RoleTrigger"),
        (RoleTriggerController.xir =
          RoleTriggerController.Lir.AddComponentByClass(
            UE.CapsuleComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
        RoleTriggerController.Lir.SetActorHiddenInGame(!0),
        RoleTriggerController.xir.SetCapsuleHalfHeight(r, !1),
        RoleTriggerController.xir.SetCapsuleRadius(o, !1),
        RoleTriggerController.xir.SetCollisionProfileName(
          CharacterNameDefines_1.CharacterNameDefines.ROLE_TRIGGER_NAME,
          !1,
        ),
        RoleTriggerController.OnTick(0),
        ModelManager_1.ModelManager.GameModeModel?.AttachStreamingSourcesToActor(
          RoleTriggerController.Lir,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoleTriggerInit,
        );
    }
  }
  static OnTick(e) {
    this.IsInitTrigger &&
      this.Lir?.IsValid() &&
      Global_1.Global.BaseCharacter &&
      this.UpdateTransform();
  }
  static UpdateRoleTriggerHalfHeightAndRadius(e, r, o) {
    RoleTriggerController.sxl &&
      ((RoleTriggerController.xir && RoleTriggerController.xir.IsValid()) ||
        (RoleTriggerController.IsInitTrigger = !1),
      RoleTriggerController.IsInitTrigger
        ? (RoleTriggerController.xir.SetCapsuleRadius(e, o),
          RoleTriggerController.xir.SetCapsuleHalfHeight(r, o))
        : RoleTriggerController.Koh());
  }
  static UpdateTransform() {
    this.IsInitTrigger &&
      this.Lir?.IsValid() &&
      Global_1.Global.BaseCharacter &&
      this.Lir.D_K2_SetActorTransform(
        Global_1.Global.BaseCharacter.D_GetTransform(),
        !1,
        void 0,
        !0,
      );
  }
  static UpdateOverlaps() {
    this.IsInitTrigger &&
      this.Lir?.IsValid() &&
      Global_1.Global.BaseCharacter &&
      RoleTriggerController.xir?.IsValid() &&
      RoleTriggerController.xir?.SetCapsuleRadius(
        RoleTriggerController.xir.CapsuleRadius,
        !0,
      );
  }
}
((exports.RoleTriggerController = RoleTriggerController).IsInitTrigger = !1),
  (RoleTriggerController.Lir = void 0),
  (RoleTriggerController.xir = void 0),
  (RoleTriggerController.sxl = !1),
  (RoleTriggerController.uMe = () => {
    RoleTriggerController.Pir(), (RoleTriggerController.sxl = !1);
  }),
  (RoleTriggerController.nye = () => {
    RoleTriggerController.IsInitTrigger
      ? RoleTriggerController.OnTick(0)
      : RoleTriggerController.Koh(),
      (RoleTriggerController.sxl = !0);
  }),
  (RoleTriggerController.xie = (e, r) => {
    RoleTriggerController.sxl &&
      ((RoleTriggerController.xir && RoleTriggerController.xir.IsValid()) ||
        (RoleTriggerController.IsInitTrigger = !1),
      RoleTriggerController.IsInitTrigger || RoleTriggerController.Koh(),
      e?.Valid) &&
      (e = e.Entity.GetComponent(3)?.Actor)?.IsValid() &&
      (RoleTriggerController.xir?.SetCapsuleHalfHeight(
        e.CapsuleComponent.CapsuleHalfHeight + TRIGGER_HALF_HEIGHT_DEVIATION,
        !1,
      ),
      RoleTriggerController.xir?.SetCapsuleRadius(
        e.CapsuleComponent.CapsuleRadius,
        !1,
      ));
  });
//# sourceMappingURL=RoleTriggerController.js.map
