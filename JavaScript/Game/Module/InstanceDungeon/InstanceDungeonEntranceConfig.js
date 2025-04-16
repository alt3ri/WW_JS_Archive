"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InstanceDungeonEntranceAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceAll"),
  InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  InstanceDungeonEntranceFlowAbyss_1 = require("./Define/InstanceDungeonEntranceFlowAbyss"),
  InstanceDungeonEntranceFlowAttached_1 = require("./Define/InstanceDungeonEntranceFlowAttached"),
  InstanceDungeonEntranceFlowFarmGold_1 = require("./Define/InstanceDungeonEntranceFlowFarmGold"),
  InstanceDungeonEntranceFlowMowingRisk_1 = require("./Define/InstanceDungeonEntranceFlowMowingRisk"),
  InstanceDungeonEntranceFlowNormal_1 = require("./Define/InstanceDungeonEntranceFlowNormal"),
  InstanceDungeonEntranceFlowRoguelike_1 = require("./Define/InstanceDungeonEntranceFlowRoguelike"),
  InstanceDungeonEntranceFlowSkipEditFormation_1 = require("./Define/InstanceDungeonEntranceFlowSkipEditFormation"),
  InstanceDungeonEntranceFlowTowerDefence_1 = require("./Define/InstanceDungeonEntranceFlowTowerDefence");
class InstanceDungeonEntranceConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.hhi = new Map()),
      (this.lhi = void 0),
      (this.MXa = void 0);
  }
  get SXa() {
    if (!this.MXa) {
      this.MXa = new Map();
      for (const n of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList())
        for (const e of n.InstanceDungeonList) this.MXa.set(e, n);
    }
    return this.MXa;
  }
  OnInit() {
    return (
      this.hhi.set(
        1,
        new InstanceDungeonEntranceFlowNormal_1.InstanceDungeonEntranceFlowNormal(),
      ),
      this.hhi.set(
        2,
        new InstanceDungeonEntranceFlowSkipEditFormation_1.InstanceDungeonEntranceFlowSkipEditFormation(),
      ),
      this.hhi.set(
        6,
        new InstanceDungeonEntranceFlowRoguelike_1.InstanceDungeonEntranceFlowRoguelike(),
      ),
      this.hhi.set(
        8,
        new InstanceDungeonEntranceFlowTowerDefence_1.InstanceDungeonEntranceFlowTowerDefense(),
      ),
      this.hhi.set(
        9,
        new InstanceDungeonEntranceFlowAttached_1.InstanceDungeonEntranceFlowAttached(),
      ),
      this.hhi.set(
        10,
        new InstanceDungeonEntranceFlowFarmGold_1.InstanceDungeonEntranceFlowFarmGold(),
      ),
      this.hhi.set(
        12,
        new InstanceDungeonEntranceFlowMowingRisk_1.InstanceDungeonEntranceFlowMowingRisk(),
      ),
      this.hhi.set(
        13,
        new InstanceDungeonEntranceFlowAbyss_1.InstanceDungeonEntranceFlowAbyss(),
      ),
      !0
    );
  }
  GetConfig(n) {
    var e =
      InstanceDungeonEntranceById_1.configInstanceDungeonEntranceById.GetConfig(
        n,
      );
    if (e) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 16, "获取副本入口配置错误", ["id", n]);
  }
  GetInstanceDungeonEntranceFlowId(n) {
    let e = this.GetConfig(n)?.FlowId;
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 16, "获取副本入口流程错误", [
            "flowId",
            e,
          ]),
        (e = 1)),
      e
    );
  }
  GetInstanceDungeonEntranceFlow(n) {
    let e = this.GetConfig(n)?.FlowId;
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 16, "获取副本入口流程错误", [
            "flowId",
            e,
          ]),
        (e = 1)),
      this.hhi.get(e)
    );
  }
  GetEntranceIdByMarkId(n) {
    return this.GetEntranceMarkIdMap().get(n) ?? 0;
  }
  CheckMarkIdLinkDungeonEntrance(n) {
    return 0 < this.GetEntranceIdByMarkId(n);
  }
  CheckMarkIdIsTowerEntrance(n) {
    var n = this.GetEntranceMarkIdMap().get(n);
    return (
      !!n &&
      (4 === (n = this.GetConfig(n))?.FlowId ||
        3 === n?.FlowId ||
        5 === n?.FlowId)
    );
  }
  CheckMarkIdIsShipTowerEntrance(n) {
    n = this.GetEntranceMarkIdMap().get(n);
    return !!n && 11 === this.GetConfig(n)?.FlowId;
  }
  CheckMarkIdIsRoguelike(n) {
    n = this.GetEntranceMarkIdMap().get(n);
    return !!n && 6 === this.GetConfig(n)?.FlowId;
  }
  CheckMarkIdIsRogueRes(n) {
    n = this.GetEntranceMarkIdMap().get(n);
    return !!n && 14 === this.GetConfig(n)?.FlowId;
  }
  CheckInstanceIdIsTowerDefense(n) {
    n = this.SXa.get(n);
    return !!n && 8 === n.FlowId;
  }
  GetEntranceIdByInstanceId(n) {
    var e = this.SXa.get(n);
    return void 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            64,
            "未找到副本入口，请检查副本表配置，instanceId: " + n,
          ),
        0)
      : e.Id;
  }
  GetEntranceMarkIdMap() {
    if (!this.lhi) {
      this.lhi = new Map();
      for (const n of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList())
        n.MarkId && this.lhi.set(n.MarkId, n.Id);
    }
    return this.lhi;
  }
}
exports.InstanceDungeonEntranceConfig = InstanceDungeonEntranceConfig;
//# sourceMappingURL=InstanceDungeonEntranceConfig.js.map
