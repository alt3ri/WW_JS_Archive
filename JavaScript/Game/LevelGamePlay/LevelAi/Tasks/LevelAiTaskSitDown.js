"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskSitDown = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiTask_1 = require("../LevelAiTask");
const LevelAiTaskMoveTo_1 = require("./LevelAiTaskMoveTo");
const LevelAiTaskSetItemCollision_1 = require("./LevelAiTaskSetItemCollision");
const LevelAiTaskSuccess_1 = require("./LevelAiTaskSuccess");
const LevelAiTaskTurnAndPlayMontage_1 = require("./LevelAiTaskTurnAndPlayMontage");
const NEARBY_CHAIR_OFFSET = 100;
const MOVE_TO_NEARBY_CHAIR_SPEED = 100;
const MOVE_TO_CHAIR_SPEED = 70;
class LevelAiTaskSitDown extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments),
      (this.CanRecordPlanProgress = !1),
      (this.Cost = 0),
      (this.gU = !1),
      (this.jTe = void 0);
  }
  MakePlanExpansions(e, i) {
    this.PrintDescription(
      "Sit Down Task Make Plan Expansions",
      ["LevelIndex", e.CurrentLevelIndex],
      ["StepIndex", e.CurrentStepIndex],
    ),
      this.gU || this.Init(),
      this.CreatePlanSteps(e, i.MakeCopy());
  }
  Init() {
    if (!this.gU) {
      const e = this.Params;
      if (e) {
        const i = e.Option.PosEntityId;
        if (
          ((this.jTe =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)),
          this.jTe)
        ) {
          var t = this.jTe.Entity.GetComponent(178);
          if (t) {
            var t = t.GetSubEntityInteractLogicController();
            var s = this.CreatureDataComponent.Entity.GetComponent(1);
            const o = this.CreatureDataComponent.GetPbDataId();
            const n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess();
            var a =
              (n.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description,
              ),
              t.GetInteractPoint());
            var t = t.GetForwardDirection();
            var r = Vector_1.Vector.Create();
            const l = Vector_1.Vector.Create();
            var r =
              (t.Multiply(NEARBY_CHAIR_OFFSET, r),
              a.Addition(r, l),
              new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo());
            var _ =
              (r.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description +
                  " Move To Nearby Chair Location: " +
                  l.ToString(),
              ),
              (r.Target = Vector_1.Vector.Create()),
              r.Target.DeepCopy(l),
              (r.MoveState = 1),
              (r.MoveSpeed = MOVE_TO_NEARBY_CHAIR_SPEED),
              n.NextNodes.push(r),
              new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision());
            var r =
              (_.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description + " Ignore Actor Collision",
              ),
              (_.ItemEntity = this.jTe),
              (_.IsIgnore = !0),
              r.NextNodes.push(_),
              s.ActorLocationProxy);
            var s = Vector_1.Vector.Create(a.X, a.Y, r.Z);
            var a = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo();
            var r =
              (a.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description +
                  " Move To Interact Location: " +
                  s.ToString(),
              ),
              (a.Target = Vector_1.Vector.Create()),
              a.Target.DeepCopy(s),
              (a.MoveState = 1),
              (a.MoveSpeed = MOVE_TO_CHAIR_SPEED),
              _.NextNodes.push(a),
              Vector_1.Vector.Create());
            var s = Vector_1.Vector.Create();
            var _ =
              (t.Multiply(200, s),
              l.Addition(s, r),
              {
                EntityId: o,
                Pos: r,
                MontageId: e.Option.MontageId.MontageId,
                IsAbpMontage: e.Option.MontageId.IsAbp,
                LoopDuration: e.Option.Duration,
              });
            var t =
              new LevelAiTaskTurnAndPlayMontage_1.LevelAiTaskTurnAndPlayMontage();
            var s =
              (t.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description + " Turn To Chair And Play Sit Down Montage",
                _,
              ),
              a.NextNodes.push(t),
              new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo());
            const h =
              (s.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description +
                  " Move Back To Nearby Chair Location: " +
                  l.ToString(),
              ),
              (s.Target = Vector_1.Vector.Create()),
              s.Target.DeepCopy(l),
              (s.MoveState = 1),
              (s.MoveSpeed = MOVE_TO_CHAIR_SPEED),
              t.NextNodes.push(s),
              new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision());
            if (
              (h.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description + " Reset Actor Collision",
              ),
              (h.ItemEntity = this.jTe),
              (h.IsIgnore = !1),
              s.NextNodes.push(h),
              this.NextNodes.length)
            ) {
              for (const T of this.NextNodes) h.NextNodes.push(T);
              this.NextNodes.length = 0;
            }
            this.NextNodes.push(n), (this.gU = !0);
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelAi",
                51,
                `[LevelAiTaskSitDown] Item Entity ${i} has no PawnInteractNewComponent`,
              );
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelAi",
              51,
              "[LevelAiTaskSitDown] Cannot Find Corresponding Item Entity for: " +
                i,
            );
      }
    }
  }
}
exports.LevelAiTaskSitDown = LevelAiTaskSitDown;
// # sourceMappingURL=LevelAiTaskSitDown.js.map
