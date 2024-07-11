"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionAfterInit = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAfterInit extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    var e,
      t,
      o,
      l,
      r = this.BulletInfo,
      a = r.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnStart,
      n =
        (a &&
          a.TagName !== StringUtils_1.NONE_STRING &&
          (n = r.AttackerActorComp?.Actor)?.IsValid() &&
          (((e = new UE.GameplayEventData()).OptionalObject = r.Actor),
          UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(n, a, e)),
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          EventSystem_1.EventSystem.EmitWithTarget(
            r.Attacker,
            EventDefine_1.EEventName.BulletCreate,
            r,
          ),
        (r.IsInit = !0),
        r.ActionLogicComponent.OnAfterInit(),
        {
          rVn: r.BulletEntityId,
          q5n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        });
    ModelManager_1.ModelManager.BulletModel.RegisterBullet(n, r.BulletEntityId),
      (r.PreContextId = r.BulletInitParams.FromRemote
        ? 0n
        : r.BulletInitParams.ContextId),
      (r.ContextId = r.BulletInitParams.FromRemote
        ? r.BulletInitParams.ContextId
        : ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      r.BulletInitParams.FromRemote
        ? BulletConstant_1.BulletConstant.OpenCreateLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Bullet", 18, "创建被同步子弹", [
            "bulletRowName",
            r.BulletRowName,
          ])
        : ((a = 1 !== r.BulletInitParams.SyncType),
          (e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            r.TargetId,
          )),
          (t = r.GetActorLocation()),
          (o = r.MoveInfo.BeginSpeedRotator),
          ((l = Protocol_1.Aki.Protocol.p3n.create()).iVn = n),
          (l.ujn = MathUtils_1.MathUtils.NumberToLong(Number(r.BulletRowName))),
          (l.X4n = r.BulletInitParams.SkillId),
          (l.y5n = t),
          (l.a8n = o),
          (l.cjn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(
            r.BulletInitParams.ParentId,
          )),
          (l.mjn = MathUtils_1.MathUtils.NumberToLong(
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
              r.BulletInitParams.BaseTransformId,
            ),
          )),
          (l.djn = MathUtils_1.MathUtils.NumberToLong(
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
              r.BulletInitParams.BaseVelocityId,
            ),
          )),
          (l.sVn = MathUtils_1.MathUtils.NumberToLong(e)),
          (l.Cjn = a),
          (l.gjn = r.BulletInitParams.DtType),
          (l.fjn = r.RandomPosOffset),
          (l.pjn = r.RandomInitSpeedOffset),
          this.Yea(l),
          CombatMessage_1.CombatNet.Call(
            18139,
            r.Attacker,
            l,
            (e) => {},
            r.PreContextId,
            r.ContextId,
          ),
          BulletConstant_1.BulletConstant.OpenCreateLog &&
            (a
              ? Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Bullet", 18, "创建本地子弹", [
                  "bulletRowName",
                  r.BulletRowName,
                ])
              : Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  18,
                  "创建同步子弹",
                  ["bulletRowName", r.BulletRowName],
                  ["skillId", r.BulletInitParams.SkillId],
                  ["handleId", n.rVn],
                  ["playerId", n.q5n],
                  ["Location", t],
                  ["Rotation", o],
                  ["TargetId", e],
                )));
  }
  Yea(e) {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((e.y5n = void 0),
      (e.a8n = void 0),
      (e.cjn = void 0),
      (e.djn = 0),
      (e.gjn = 0),
      (e.fjn = void 0),
      (e.pjn = void 0));
  }
}
exports.BulletActionAfterInit = BulletActionAfterInit;
//# sourceMappingURL=BulletActionAfterInit.js.map
