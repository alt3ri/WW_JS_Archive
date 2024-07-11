"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldEntity = void 0);
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const PerformanceController_1 = require("../../../Core/Performance/PerformanceController");
const ModelManager_1 = require("../../Manager/ModelManager");
const GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator");
const WorldEntityHelper_1 = require("./WorldEntityHelper");
class WorldEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments), (this.UsePool = !0);
  }
  static StaticGameBudgetConfig(r) {
    let e = -1;
    let t = -1;
    let o;
    switch (
      (r instanceof WorldEntity &&
        ((o = r.GetComponent(0)),
        (e = o.GetEntityType()),
        (t = o.GetSummonerId())),
      e)
    ) {
      case Protocol_1.Aki.Protocol.HBs.Proto_Player:
      case Protocol_1.Aki.Protocol.HBs.Proto_Vision:
        return GameBudgetAllocatorConfigCreator_1
          .GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
        return r instanceof WorldEntity && t > 0
          ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsPlayerAlwaysTickConfig
          : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsCharacterEntityGroupConfig;
      case Protocol_1.Aki.Protocol.HBs.Proto_Npc:
      case Protocol_1.Aki.Protocol.HBs.Proto_Animal:
        return GameBudgetAllocatorConfigCreator_1
          .GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
      default:
        return GameBudgetAllocatorConfigCreator_1
          .GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig;
    }
  }
  OnRespawn(r) {
    return !0;
  }
  OnCreate(r) {
    for (const t of r.Components) {
      const e = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority.get(t);
      this.AddComponent(t, e);
    }
    return !0;
  }
  OnInitData(r) {
    for (const t of this.Components) if (!t.InitData(r)) return !1;
    let e;
    return (
      r.RegisterToGameBudgetController &&
        this.RegisterToGameBudgetController(void 0, this),
      PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity &&
        (e = this.GetComponent(0)) &&
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
          e.GetPbDataId(),
        )) &&
        ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
          e.BlueprintType,
        ) &&
        ((this.TickStatTdType = void 0),
        (this.AfterTickStatTdType = this.TickStatTdType)),
      !0
    );
  }
}
exports.WorldEntity = WorldEntity;
// # sourceMappingURL=WorldEntity.js.map
