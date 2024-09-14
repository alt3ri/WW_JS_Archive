"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskSitDown = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelAiTask_1 = require("../LevelAiTask"),
  LevelAiTaskMoveTo_1 = require("./LevelAiTaskMoveTo"),
  LevelAiTaskSetItemCollision_1 = require("./LevelAiTaskSetItemCollision"),
  LevelAiTaskSuccess_1 = require("./LevelAiTaskSuccess"),
  LevelAiTaskTurnAndPlayMontage_1 = require("./LevelAiTaskTurnAndPlayMontage"),
  NEARBY_CHAIR_OFFSET = 100,
  MOVE_TO_NEARBY_CHAIR_SPEED = 100,
  MOVE_TO_CHAIR_SPEED = 70;
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
      var e = this.Params;
      if (e) {
        var i = e.Option.PosEntityId;
        if (
          ((this.jTe =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)),
          this.jTe)
        ) {
          var t = this.jTe.Entity.GetComponent(182);
          if (t) {
            var t = t.GetSubEntityInteractLogicController(),
              s = this.CreatureDataComponent.Entity.GetComponent(1),
              o = this.CreatureDataComponent.GetPbDataId(),
              n = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
              a =
                (n.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  this.Description,
                ),
                t.Possess(this.CreatureDataComponent.Entity),
                t.GetSitLocation()),
              r = t.GetForwardDirection(),
              l = Vector_1.Vector.Create(),
              _ = Vector_1.Vector.Create(),
              l =
                (r.Multiply(NEARBY_CHAIR_OFFSET, l),
                a.Addition(l, _),
                new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo()),
              h =
                (l.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  this.Description +
                    " Move To Nearby Chair Location: " +
                    _.ToString(),
                ),
                (l.Target = Vector_1.Vector.Create()),
                l.Target.DeepCopy(_),
                (l.MoveState = 1),
                (l.MoveSpeed = MOVE_TO_NEARBY_CHAIR_SPEED),
                n.NextNodes.push(l),
                new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision()),
              l =
                (h.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  this.Description + " Ignore Actor Collision",
                ),
                (h.ItemEntity = this.jTe),
                (h.IsIgnore = !0),
                l.NextNodes.push(h),
                s.ActorLocationProxy),
              s = Vector_1.Vector.Create(a.X, a.Y, l.Z),
              a = new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo(),
              l =
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
                h.NextNodes.push(a),
                Vector_1.Vector.Create()),
              s = Vector_1.Vector.Create(),
              h =
                (r.Multiply(200, s),
                _.Addition(s, l),
                {
                  EntityId: o,
                  Pos: l,
                  MontageId: e.Option.MontageId.MontageId,
                  IsAbpMontage: e.Option.MontageId.IsAbp,
                  LoopDuration: e.Option.Duration,
                }),
              r =
                new LevelAiTaskTurnAndPlayMontage_1.LevelAiTaskTurnAndPlayMontage(),
              s =
                (r.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  this.Description + " Turn To Chair And Play Sit Down Montage",
                  h,
                ),
                a.NextNodes.push(r),
                t.UnPossess(this.CreatureDataComponent.Entity),
                new LevelAiTaskMoveTo_1.LevelAiTaskMoveTo()),
              T =
                (s.Serialize(
                  this.CharacterPlanComponent,
                  this.CreatureDataComponent,
                  this.Description +
                    " Move Back To Nearby Chair Location: " +
                    _.ToString(),
                ),
                (s.Target = Vector_1.Vector.Create()),
                s.Target.DeepCopy(_),
                (s.MoveState = 1),
                (s.MoveSpeed = MOVE_TO_CHAIR_SPEED),
                r.NextNodes.push(s),
                new LevelAiTaskSetItemCollision_1.LevelAiTaskSetItemCollision());
            if (
              (T.Serialize(
                this.CharacterPlanComponent,
                this.CreatureDataComponent,
                this.Description + " Reset Actor Collision",
              ),
              (T.ItemEntity = this.jTe),
              (T.IsIgnore = !1),
              s.NextNodes.push(T),
              this.NextNodes.length)
            ) {
              for (const A of this.NextNodes) T.NextNodes.push(A);
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
//# sourceMappingURL=LevelAiTaskSitDown.js.map
