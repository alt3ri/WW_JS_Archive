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
      n = r.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnStart,
      a =
        (n &&
          n.TagName !== StringUtils_1.NONE_STRING &&
          (a = r.AttackerActorComp?.Actor)?.IsValid() &&
          (((e = new UE.GameplayEventData()).OptionalObject = r.Actor),
          UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(a, n, e)),
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          EventSystem_1.EventSystem.EmitWithTarget(
            r.Attacker,
            EventDefine_1.EEventName.BulletCreate,
            r,
          ),
        (r.IsInit = !0),
        r.ActionLogicComponent.OnAfterInit(),
        {
          y4n: r.BulletEntityId,
          aFn: ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        });
    ModelManager_1.ModelManager.BulletModel.RegisterBullet(a, r.BulletEntityId),
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
        : ((n = 1 !== r.BulletInitParams.SyncType),
          (e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
            r.TargetId,
          )),
          (t = r.GetActorLocation()),
          (o = r.MoveInfo.BeginSpeedRotator),
          ((l = Protocol_1.Aki.Protocol.H2n.create()).E4n = a),
          (l.wVn = MathUtils_1.MathUtils.NumberToLong(Number(r.BulletRowName))),
          (l.vkn = r.BulletInitParams.SkillId),
          (l.$kn = t),
          (l.D3n = o),
          (l.bVn = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(
            r.BulletInitParams.ParentId,
          )),
          (l.qVn = MathUtils_1.MathUtils.NumberToLong(
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
              r.BulletInitParams.BaseTransformId,
            ),
          )),
          (l.GVn = MathUtils_1.MathUtils.NumberToLong(
            ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(
              r.BulletInitParams.BaseVelocityId,
            ),
          )),
          (l.L4n = MathUtils_1.MathUtils.NumberToLong(e)),
          (l.OVn = n),
          (l.NVn = r.BulletInitParams.DtType),
          (l.kVn = r.RandomPosOffset),
          (l.FVn = r.RandomInitSpeedOffset),
          CombatMessage_1.CombatNet.Call(
            7976,
            r.Attacker,
            l,
            (e) => {},
            r.PreContextId,
            r.ContextId,
          ),
          BulletConstant_1.BulletConstant.OpenCreateLog &&
            (n
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
                  ["handleId", a.y4n],
                  ["playerId", a.aFn],
                  ["Location", t],
                  ["Rotation", o],
                  ["TargetId", e],
                )));
  }
}
exports.BulletActionAfterInit = BulletActionAfterInit;
//# sourceMappingURL=BulletActionAfterInit.js.map
