"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventLeisureInteract = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RouletteController_1 = require("../../Module/Roulette/RouletteController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  SKILL_ID_FIX_HOOK_1 = 100020,
  SKILL_ID_FIX_HOOK_2 = 100021,
  SKILL_ID_XA_KITE = 210130,
  SKILL_ID_XA_CHARACTER_DIR = 210330,
  hardCodePoseId = new Map([
    [IAction_1.ELeisureInteract.FailurePose, 300002],
    [IAction_1.ELeisureInteract.GameplayPose1, 300003],
    [IAction_1.ELeisureInteract.GameplayPose2, 300004],
    [IAction_1.ELeisureInteract.GameplayPose3, 300005],
  ]),
  tmpRotator = Rotator_1.Rotator.Create();
class LevelEventLeisureInteract extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.QYs = void 0),
      (this.IXi = void 0),
      (this.KYs = 0);
  }
  ExecuteNew(e, t, i) {
    var r = e;
    if (r)
      if (Global_1.Global.BaseCharacter) {
        var o = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
          s = o.GetComponent(29),
          a = o.GetComponent(191);
        switch (r.Option.Type) {
          case IAction_1.ELeisureInteract.SitDown:
          case IAction_1.ELeisureInteract.SitOnGround:
            var _ = this.aic(t, r.SceneEntity);
            if (!_)
              return (
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    36,
                    " LevelEventLeisureInteract, 尝试坐下时交互实体不存在",
                  ),
                void this.FinishExecute(!1)
              );
            var n = this.Kul(r.Option.Type);
            s.EnterSitDownAction(_, n), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.Manipulate:
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LevelEvent",
                31,
                "[LevelEventLeisureInteract]控物动作已废弃",
              );
            break;
          case IAction_1.ELeisureInteract.Catapult:
          case IAction_1.ELeisureInteract.SuperCatapult:
            {
              let e = 0;
              switch (t.Type) {
                case 5:
                  e = t.TriggerEntityId;
                  break;
                case 1:
                  e = t.EntityId;
              }
              var _ = EntitySystem_1.EntitySystem.Get(e);
              s.StartCatapult(_, r.Option), this.FinishExecute(!0);
            }
            break;
          case IAction_1.ELeisureInteract.Bounce:
            s.StartBounce(r.Option), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.StandControl:
            s.PlayCustomCommonSkill(400202), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.StandControl2:
            a.AddTag(1334991742);
            s.PlayCustomCommonSkill(400202), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.Soar:
            n = o.GetComponent(39);
            9 === this.BaseContext?.Type &&
              a.TagContainer.UpdateExactTag(2, 283451623, -1),
              RouletteController_1.RouletteController.ExploreSkillSetRequest(
                1015,
              ),
              n.BeginSkill(SKILL_ID_XA_CHARACTER_DIR, {
                Reason: "LeisureInteract行为触发翱翔",
              }),
              9 === this.BaseContext?.Type &&
                a.TagContainer.UpdateExactTag(2, 283451623, 1),
              this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.Glide:
            o.GetComponent(176).TrySetGlide(), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.HookLock:
            o.GetComponent(97)?.CanActivateFixHook()
              ? ((_ = a.HasTag(-1958756056)
                  ? SKILL_ID_FIX_HOOK_2
                  : SKILL_ID_FIX_HOOK_1),
                o
                  .GetComponent(39)
                  .BeginSkill(_, { Reason: "LeisureInteract行为触发定点钩锁" }),
                this.FinishExecute(!0))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    39,
                    " LevelEventLeisureInteract, 没有可用定点钩锁",
                  ),
                this.FinishExecute(!1));
            break;
          case IAction_1.ELeisureInteract.KiteHook:
            a.HasTag(-1526637662)
              ? (o
                  .GetComponent(39)
                  .BeginSkill(SKILL_ID_XA_KITE, {
                    Reason: "LeisureInteract行为触发风筝钩锁",
                  }),
                this.FinishExecute(!0))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    39,
                    " LevelEventLeisureInteract, 没有可用风筝钩索点",
                  ),
                this.FinishExecute(!1));
            break;
          case IAction_1.ELeisureInteract.GetUp:
            s.IsSitDown && s.PreLeaveSitDownAction(), this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.FailurePose:
            n = o.GetComponent(3);
            tmpRotator.Set(
              r.Option.Rot.Y ?? 0,
              r.Option.Rot.Z ?? 0,
              r.Option.Rot.X ?? 0,
            ),
              n.SetActorRotation(
                tmpRotator.ToUeRotator(),
                "LeisureInteract行为触发失败姿势",
                !1,
              ),
              n.ClearInput(),
              o
                .GetComponent(39)
                .BeginSkill(hardCodePoseId.get(r.Option.Type), {
                  Reason: "LeisureInteract行为触发失败姿势",
                }),
              this.FinishExecute(!0);
            break;
          case IAction_1.ELeisureInteract.GameplayPose1:
          case IAction_1.ELeisureInteract.GameplayPose2:
          case IAction_1.ELeisureInteract.GameplayPose3:
            s.PlayCustomCommonSkill(hardCodePoseId.get(r.Option.Type)),
              this.FinishExecute(!0);
        }
        (this.QYs = void 0), (this.IXi = void 0), (this.KYs = 0);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LevelEvent",
            36,
            " LevelEventLeisureInteract, 尝试执行时主角未创建",
          ),
          (this.QYs = e),
          (this.IXi = t),
          (this.KYs = i);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          57,
          " LevelEventLeisureInteract, 坐下参数为空",
        );
  }
  OnTick(e) {
    Global_1.Global.BaseCharacter &&
      this.QYs &&
      this.IXi &&
      this.ExecuteNew(this.QYs, this.IXi, this.KYs);
  }
  Kul(e) {
    switch (e) {
      case IAction_1.ELeisureInteract.SitDown:
        return 1;
      case IAction_1.ELeisureInteract.SitOnGround:
        return 2;
    }
    return 0;
  }
  aic(e, t) {
    return t
      ? ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(t)
          ?.Entity
      : 1 === e.Type
        ? EntitySystem_1.EntitySystem.Get(e.EntityId)
        : void 0;
  }
}
exports.LevelEventLeisureInteract = LevelEventLeisureInteract;
//# sourceMappingURL=LevelEventLeisureInteract.js.map
