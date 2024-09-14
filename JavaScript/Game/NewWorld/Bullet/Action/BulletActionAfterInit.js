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
      r,
      a = this.BulletInfo,
      n = a.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnStart;
    n &&
      n.TagName !== StringUtils_1.NONE_STRING &&
      (e = a.AttackerActorComp?.Actor)?.IsValid() &&
      (((t = new UE.GameplayEventData()).OptionalObject = a.Actor),
      UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(e, n, t)),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.EmitWithTarget(
          a.Attacker,
          EventDefine_1.EEventName.BulletCreate,
          a,
        ),
      (a.IsInit = !0),
      a.ActionLogicComponent.OnAfterInit(),
      (a.PreContextId = a.BulletInitParams.FromRemote
        ? 0n
        : a.BulletInitParams.ContextId),
      (a.ContextId = a.BulletInitParams.FromRemote
        ? a.BulletInitParams.ContextId
        : ModelManager_1.ModelManager.CombatMessageModel.GenMessageId()),
      a.BulletInitParams.FromRemote
        ? BulletConstant_1.BulletConstant.OpenCreateLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Bullet", 18, "创建被同步子弹", [
            "bulletRowName",
            a.BulletRowName,
          ])
        : ((e = {
            cVn: a.BulletEntityId,
            W5n: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          }),
          ModelManager_1.ModelManager.BulletModel.RegisterBullet(
            e,
            a.BulletEntityId,
          ),
          (n = 1 !== a.BulletInitParams.SyncType),
          (t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            a.TargetId,
          )),
          (o = a.GetActorLocation()),
          (l = a.MoveInfo.BeginSpeedRotator),
          ((r = Protocol_1.Aki.Protocol.D3n.create()).uVn = e),
          (r.Mjn = MathUtils_1.MathUtils.NumberToLong(Number(a.BulletRowName))),
          (r.r5n = a.BulletInitParams.SkillId),
          (r.P5n = o),
          (r.g8n = l),
          (r.Sjn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(
            a.BulletInitParams.ParentId,
          )),
          (r.Ejn = MathUtils_1.MathUtils.NumberToLong(
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
              a.BulletInitParams.BaseTransformId,
            ),
          )),
          (r.yjn = MathUtils_1.MathUtils.NumberToLong(
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
              a.BulletInitParams.BaseVelocityId,
            ),
          )),
          (r.CVn = MathUtils_1.MathUtils.NumberToLong(t)),
          (r.Ijn = n),
          (r.Tjn = a.BulletInitParams.DtType),
          (r.Ljn = a.RandomPosOffset),
          (r.Djn = a.RandomInitSpeedOffset),
          this.lra(r),
          CombatMessage_1.CombatNet.Call(
            24919,
            a.Attacker,
            r,
            (e) => {},
            a.PreContextId,
            a.ContextId,
          ),
          BulletConstant_1.BulletConstant.OpenCreateLog &&
            (n
              ? Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Bullet", 18, "创建本地子弹", [
                  "bulletRowName",
                  a.BulletRowName,
                ])
              : Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  18,
                  "创建同步子弹",
                  ["bulletRowName", a.BulletRowName],
                  ["skillId", a.BulletInitParams.SkillId],
                  ["handleId", e.cVn],
                  ["playerId", e.W5n],
                  ["Location", o],
                  ["Rotation", l],
                  ["TargetId", t],
                )));
  }
  lra(e) {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((e.P5n = void 0),
      (e.g8n = void 0),
      (e.Sjn = void 0),
      (e.yjn = 0),
      (e.Tjn = 0),
      (e.Ljn = void 0),
      (e.Djn = void 0));
  }
}
exports.BulletActionAfterInit = BulletActionAfterInit;
//# sourceMappingURL=BulletActionAfterInit.js.map
