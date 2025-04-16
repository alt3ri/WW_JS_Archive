"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnTurnActionController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  TURN_ANGLE_MAX = 60;
class PawnTurnActionController {
  constructor(t) {
    (this.Jh = void 0),
      (this.Krr = void 0),
      (this.Qrr = 1),
      (this.vir = Vector_1.Vector.Create()),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.NeedTurn = !1),
      (this.WaitTurnEnd = !1),
      (this.PlayerOffset = Vector_1.Vector.Create()),
      (this.IsPlayerInputLocked = !1),
      (this.OnTurnEndHandle = void 0),
      (this.OnTurnToDefaultForwardEndHandle = void 0),
      (this.OnTurnToInteractTargetEndHandle = void 0),
      (this.Xrr = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pawn", 50, "转身开始", [
            "PbDataId",
            this.Hte?.CreatureData.GetPbDataId(),
          ]);
      }),
      (this.$rr = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pawn", 50, "转身结束", [
            "PbDataId",
            this.Hte?.CreatureData.GetPbDataId(),
          ]),
          this.RemoveEvents(),
          this.OnTurnEndHandle && this.OnTurnEndHandle();
      }),
      (this.Yrr = () => {
        var t;
        this.Gce?.Valid
          ? ((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
            this.Gce.Entity.GetComponent(175).SetSightTargetItem(t),
            this.WaitTurnEnd &&
              (this.Jrr(!1), this.OnTurnToInteractTargetEndHandle) &&
              this.OnTurnToInteractTargetEndHandle())
          : this.OnTurnToInteractTargetEndHandle &&
            this.OnTurnToInteractTargetEndHandle();
      }),
      (this.zrr = () => {
        this.Gce?.Valid &&
          this.Gce.CharacterMovement?.IsValid() &&
          this.Gce.ActorComp?.Actor.KuroSetMovementMode({
            Mode: this.Qrr,
            Context: "[PawnTurnActionController.TurnToDefaultForwardEnd]",
          }),
          this.OnTurnToDefaultForwardEndHandle &&
            this.OnTurnToDefaultForwardEndHandle();
      }),
      (this.Jh = t),
      (this.Gce = t.GetComponent(44)),
      (this.Hte = t.GetComponent(1)),
      this.Gce?.Valid && this.vir.DeepCopy(this.Hte.ActorForwardProxy);
  }
  AddEvents() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharTurnBegin,
      this.Xrr,
    ) ||
      (EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnBegin,
        this.Xrr,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnEnd,
        this.$rr,
      ));
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharTurnBegin,
      this.Xrr,
    ) &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnBegin,
        this.Xrr,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnEnd,
        this.$rr,
      ));
  }
  TurnToInteractTarget() {
    var t, i, s, e, o;
    this.NeedTurn
      ? this.Gce?.Valid
        ? ((this.Qrr = this.Gce.CharacterMovement.MovementMode),
          this.Gce.ActorComp?.Actor.KuroSetMovementMode({
            Mode: 1,
            Context: "[PawnTurnActionController.TurnToInteractTarget]",
          }),
          (t = Global_1.Global.BaseCharacter.CharacterActorComponent),
          (i = (s = this.Gce.Entity).GetComponent(175)),
          (s = s.GetComponent(3)) &&
            ((o = Vector_1.Vector.Create(t.ActorLocationProxy)).AdditionEqual(
              this.PlayerOffset,
            ),
            (e = s.InputFacingProxy),
            ((o = o.SubtractionEqual(s.ActorLocationProxy)).Z = 0),
            o.Normalize(),
            o.ToOrientationRotator(MathUtils_1.MathUtils.CommonTempRotator),
            (e = MathUtils_1.MathUtils.GetAngleByVectorDot(e, o)) <
            TURN_ANGLE_MAX
              ? (i && i.SetSightTargetItem(t),
                this.OnTurnToInteractTargetEndHandle &&
                  this.OnTurnToInteractTargetEndHandle(),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    50,
                    "[PawnTurnActionController.TurnToInteractTarget][交互转身] 夹角小于阈值，转头不转身",
                    ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
                    ["Angle", e],
                    ["TurnAngleMax", TURN_ANGLE_MAX],
                    ["CurRot", s.ActorRotationProxy],
                    ["CurInputRot", s.InputRotatorProxy],
                    ["TarRot", MathUtils_1.MathUtils.CommonTempRotator],
                  ))
              : (this.WaitTurnEnd
                  ? this.Jrr(!0)
                  : this.OnTurnToInteractTargetEndHandle &&
                    this.OnTurnToInteractTargetEndHandle(),
                (o = Vector_1.Vector.Create(
                  t.ActorLocationProxy,
                )).AdditionEqual(this.PlayerOffset),
                this.Jh.GetComponent(45).PerformTurn(2, { TargetLocation: o }),
                (this.OnTurnEndHandle = this.Yrr),
                this.AddEvents(),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    50,
                    "[PawnTurnActionController.TurnToInteractTarget][交互转身] 添加转身监听事件",
                    ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
                  ),
                (this.Krr = !0))))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              50,
              "[PawnTurnActionController.TurnToInteractTarget][交互转身] MoveComp不合法",
              ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
            ),
          this.OnTurnToInteractTargetEndHandle &&
            this.OnTurnToInteractTargetEndHandle())
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "NPC",
            50,
            "[PawnTurnActionController.TurnToInteractTarget][交互转身] NeedTurn为False",
            ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
          ),
        this.OnTurnToInteractTargetEndHandle &&
          this.OnTurnToInteractTargetEndHandle());
  }
  Jrr(t) {
    var i,
      s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    s &&
      ((i = s.GetComponent(61)),
      t
        ? (s.GetComponent(3).SetInputDirect(Vector_1.Vector.ZeroVector),
          i.ClearMoveVectorCache(),
          i.SetActive(!1))
        : i.SetActive(!0),
      (this.IsPlayerInputLocked = t));
  }
  TurnToDefaultForward() {
    if (this.NeedTurn && this.Krr)
      if (this.Gce?.Valid) {
        1 !== this.Gce.CharacterMovement.MovementMode &&
          this.Gce.ActorComp?.Actor.KuroSetMovementMode({
            Mode: 1,
            Context: "[PawnTurnActionController.TurnToDefaultForward]",
          });
        var t,
          i = this.Gce.Entity;
        const s = i.GetComponent(185);
        if (
          (s?.OpenLookAt ||
            ((t = i.GetComponent(175)) && t.SetSightTargetItem(void 0)),
          i.GetComponent(3))
        ) {
          const s = this.Jh.GetComponent(45);
          s.PerformTurn(2, { Direction: this.vir }),
            (this.OnTurnEndHandle = this.zrr),
            this.AddEvents(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "NPC",
                50,
                "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] 添加转身监听事件",
                ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
              );
        }
        this.Krr = !1;
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "NPC",
            50,
            "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] MoveComp不合法",
            ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
          ),
          this.OnTurnToDefaultForwardEndHandle &&
            this.OnTurnToDefaultForwardEndHandle();
    else
      this.OnTurnToDefaultForwardEndHandle &&
        this.OnTurnToDefaultForwardEndHandle();
  }
  UpdateDefaultDirect(t) {
    this.vir.DeepCopy(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          50,
          "[PawnTurnActionController.UpdateDefaultDirect]更新默认朝向",
          ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
          ["NewDirect", t],
        );
  }
  Dispose() {
    this.RemoveEvents(),
      (this.Gce = void 0),
      this.IsPlayerInputLocked && this.Jrr(!1);
  }
}
exports.PawnTurnActionController = PawnTurnActionController;
//# sourceMappingURL=PawnTurnActionController.js.map
