"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnTurnActionController = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const TURN_ANGLE_MAX = 60;
class PawnTurnActionController {
  constructor(t) {
    (this.Jh = void 0),
      (this.$or = void 0),
      (this.Yor = 1),
      (this.Mtr = Vector_1.Vector.Create()),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.NeedTurn = !1),
      (this.WaitTurnEnd = !1),
      (this.PlayerOffset = Vector_1.Vector.Create()),
      (this.OnTurnEndHandle = void 0),
      (this.OnTurnToDefaultForwardEndHandle = void 0),
      (this.OnTurnToInteractTargetEndHandle = void 0),
      (this.Jor = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pawn", 51, "转身开始", [
            "PbDataId",
            this.Hte?.CreatureData.GetPbDataId(),
          ]);
      }),
      (this.zor = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Pawn", 51, "转身结束", [
            "PbDataId",
            this.Hte?.CreatureData.GetPbDataId(),
          ]),
          this.RemoveEvents(),
          this.OnTurnEndHandle && this.OnTurnEndHandle();
      }),
      (this.Zor = () => {
        let t;
        this.Gce?.Valid
          ? ((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
            this.Gce.Entity.GetComponent(160).SetSightTargetItem(t),
            this.WaitTurnEnd &&
              (this.err(!1), this.OnTurnToInteractTargetEndHandle) &&
              this.OnTurnToInteractTargetEndHandle())
          : this.OnTurnToInteractTargetEndHandle &&
            this.OnTurnToInteractTargetEndHandle();
      }),
      (this.trr = () => {
        this.Gce?.Valid &&
          this.Gce.CharacterMovement?.IsValid() &&
          this.Gce.CharacterMovement.SetMovementMode(this.Yor),
          this.OnTurnToDefaultForwardEndHandle &&
            this.OnTurnToDefaultForwardEndHandle();
      }),
      (this.Jh = t),
      (this.Gce = t.GetComponent(36)),
      (this.Hte = t.GetComponent(1)),
      this.Gce?.Valid && this.Mtr.DeepCopy(this.Hte.ActorForwardProxy);
  }
  AddEvents() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharTurnBegin,
      this.Jor,
    ) ||
      (EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnBegin,
        this.Jor,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnEnd,
        this.zor,
      ));
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharTurnBegin,
      this.Jor,
    ) &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnBegin,
        this.Jor,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharTurnEnd,
        this.zor,
      ));
  }
  TurnToInteractTarget() {
    let t, i, s, e, o, r;
    this.NeedTurn
      ? this.Gce?.Valid
        ? ((this.Yor = this.Gce.CharacterMovement.MovementMode),
          this.Gce.CharacterMovement.SetMovementMode(1),
          (t = Global_1.Global.BaseCharacter.CharacterActorComponent),
          (i = (s = this.Gce.Entity).GetComponent(160)),
          (s = s.GetComponent(3)) &&
            ((o = Vector_1.Vector.Create(t.ActorLocationProxy)).AdditionEqual(
              this.PlayerOffset,
            ),
            (e = s.ActorForwardProxy),
            ((o = o.SubtractionEqual(s.ActorLocationProxy)).Z = 0),
            o.Normalize(),
            (r = Vector_1.Vector.Create()),
            Vector_1.Vector.CrossProduct(e, o, r),
            MathUtils_1.MathUtils.GetAngleByVectorDot(e, o) < TURN_ANGLE_MAX
              ? (i && i.SetSightTargetItem(t),
                this.OnTurnToInteractTargetEndHandle &&
                  this.OnTurnToInteractTargetEndHandle(),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    51,
                    "[PawnTurnActionController.TurnToInteractTarget][交互转身] 夹角小于阈值，转头不转身",
                    ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
                    ["TurnAngleMax", TURN_ANGLE_MAX],
                  ))
              : (this.WaitTurnEnd
                  ? this.err(!0)
                  : this.OnTurnToInteractTargetEndHandle &&
                    this.OnTurnToInteractTargetEndHandle(),
                (r = Vector_1.Vector.Create(
                  t.ActorLocationProxy,
                )).AdditionEqual(this.PlayerOffset),
                AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(s, r, 0),
                (this.OnTurnEndHandle = this.Zor),
                this.AddEvents(),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "NPC",
                    51,
                    "[PawnTurnActionController.TurnToInteractTarget][交互转身] 添加转身监听事件",
                    ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
                  )),
            (this.$or = !0)))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              51,
              "[PawnTurnActionController.TurnToInteractTarget][交互转身] MoveComp不合法",
              ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
            ),
          this.OnTurnToInteractTargetEndHandle &&
            this.OnTurnToInteractTargetEndHandle())
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "NPC",
            51,
            "[PawnTurnActionController.TurnToInteractTarget][交互转身] NeedTurn为False",
            ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
          ),
        this.OnTurnToInteractTargetEndHandle &&
          this.OnTurnToInteractTargetEndHandle());
  }
  err(t) {
    let i;
    const s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    s &&
      ((i = s.GetComponent(52)),
      t
        ? (s.GetComponent(3).SetInputDirect(Vector_1.Vector.ZeroVector),
          i.ClearMoveVectorCache(),
          i.SetActive(!1))
        : i.SetActive(!0));
  }
  TurnToDefaultForward() {
    let t, i;
    this.NeedTurn && this.$or
      ? this.Gce?.Valid
        ? ((t = this.Gce.CharacterMovement).MovementMode !== 1 &&
            t.SetMovementMode(1),
          (t = this.Gce.Entity).GetComponent(168)?.OpenLookAt ||
            ((i = t.GetComponent(160)) && i.SetSightTargetItem(void 0)),
          (i = t.GetComponent(3)) &&
            (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
              i,
              this.Mtr,
              0,
            ),
            (this.OnTurnEndHandle = this.trr),
            this.AddEvents(),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "NPC",
              51,
              "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] 添加转身监听事件",
              ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
            ),
          (this.$or = !1))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              51,
              "[PawnTurnActionController.TurnToDefaultForward][结束交互转身] MoveComp不合法",
              ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
            ),
          this.OnTurnToDefaultForwardEndHandle &&
            this.OnTurnToDefaultForwardEndHandle())
      : this.OnTurnToDefaultForwardEndHandle &&
        this.OnTurnToDefaultForwardEndHandle();
  }
  Dispose() {
    this.RemoveEvents(), (this.Gce = void 0);
  }
}
exports.PawnTurnActionController = PawnTurnActionController;
// # sourceMappingURL=PawnTurnActionController.js.map
