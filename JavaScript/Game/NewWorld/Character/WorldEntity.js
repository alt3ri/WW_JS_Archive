"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldEntity = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
  WorldEntityHelper_1 = require("./WorldEntityHelper");
class WorldEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments), (this.UsePool = !0);
  }
  static StaticGameBudgetConfig(r) {
    let e = -1,
      t = -1,
      o = -1,
      a = -1;
    if (r instanceof WorldEntity) {
      var n = r.GetComponent(0),
        n =
          ((e = n.GetEntityType()),
          (t = n.GetSubEntityType()),
          (o = n.GetSummonerId()),
          n.GetBaseInfo());
      if (n) {
        if (n.EntityUpdateStrategy)
          return GameBudgetAllocatorConfigCreator_1
            .GameBudgetAllocatorConfigCreator.TsStabilizeLowEntityGroupConfig;
        void 0 !== n.Category.MonsterMatchType &&
          (a = n?.Category.MonsterMatchType);
      }
    }
    switch (e) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        return GameBudgetAllocatorConfigCreator_1
          .GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        if (r instanceof WorldEntity) {
          if (0 < o)
            return 652000002 === r.GetComponent(0).GetPbDataId()
              ? GameBudgetAllocatorConfigCreator_1
                  .GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig
              : GameBudgetAllocatorConfigCreator_1
                  .GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
          if (r.GetComponent(204))
            return GameBudgetAllocatorConfigCreator_1
              .GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
        }
        return 2 <= a
          ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsBossEntityGroupConfig
          : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsCharacterEntityGroupConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        return 2 === t
          ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
              .TsCharacterEntityGroupConfig
          : 1 === t
            ? GameBudgetAllocatorConfigCreator_1
                .GameBudgetAllocatorConfigCreator.TsSimpleNpcEntityGroupConfig
            : GameBudgetAllocatorConfigCreator_1
                .GameBudgetAllocatorConfigCreator.TsNormalNpcEntityGroupConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Animal:
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
      var e = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority.get(t);
      this.AddComponent(t, e);
    }
    return !0;
  }
  OnInitData(r) {
    for (const o of this.Components) if (!o.InitData(r)) return !1;
    var e, t;
    return (
      r.RegisterToGameBudgetController &&
        this.RegisterToGameBudgetController(void 0, this),
      PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity &&
        (e = this.GetComponent(0)) &&
        e.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n &&
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
          e.GetPbDataId(),
        )) &&
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
          t.BlueprintType,
        )) &&
        ((this.TickStatTdType = Stats_1.Stat.Create(
          `PbDataId: ${e.GetPbDataId()}, PrefabId: ${e.GetPrefabId()} ,BlueprintType: ` +
            t.BlueprintType,
        )),
        (this.AfterTickStatTdType = this.TickStatTdType)),
      !0
    );
  }
}
exports.WorldEntity = WorldEntity;
//# sourceMappingURL=WorldEntity.js.map
