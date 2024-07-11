"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionSummonEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonEntity extends BulletActionBase_1.BulletActionBase {
  OnExecute() {
    const e = this.BulletInfo.Attacker;
    const o = this.BulletInfo.AttackerCreatureDataComp;
    let t = 0;
    const r = o.GetEntityType();
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (
        !(
          (r !== Protocol_1.Aki.Protocol.HBs.Proto_Player &&
            r !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
          this.BulletInfo.AttackerActorComp.IsAutonomousProxy
        )
      )
        return;
      r === Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
        (t = o.GetSummonsVersion()) === 0 &&
        (t = o.ComponentDataMap.get("sps")?.sps?.o8n ?? 1);
    }
    (this.BulletInfo.SummonAttackerId = e.Id),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Bullet", 21, "子弹召唤", ["Version", t]),
      (this.BulletInfo.SummonServerEntityId =
        ControllerHolder_1.ControllerHolder.CreatureController.SummonRequest(
          this.BulletInfo.BulletInitParams.SkillId,
          !0,
          this.BulletInfo.ActorComponent.ActorTransform,
          this.BulletInfo.SummonAttackerId,
          this.BulletInfo.BulletDataMain.Summon.EntityId,
          t,
        )),
      t > 0 && o.SetSummonsVersion(t + 1);
  }
}
exports.BulletActionSummonEntity = BulletActionSummonEntity;
// # sourceMappingURL=BulletActionSummonEntity.js.map
