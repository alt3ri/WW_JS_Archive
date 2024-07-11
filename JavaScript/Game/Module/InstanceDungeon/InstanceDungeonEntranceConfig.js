"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InstanceDungeonEntranceAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceAll"),
  InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  InstanceDungeonEntranceFlowNormal_1 = require("./Define/InstanceDungeonEntranceFlowNormal"),
  InstanceDungeonEntranceFlowRoguelike_1 = require("./Define/InstanceDungeonEntranceFlowRoguelike"),
  InstanceDungeonEntranceFlowSkipEditFormation_1 = require("./Define/InstanceDungeonEntranceFlowSkipEditFormation"),
  InstanceDungeonEntranceFlowTowerDefence_1 = require("./Define/InstanceDungeonEntranceFlowTowerDefence");
class InstanceDungeonEntranceConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.hhi = new Map()),
      (this.lhi = void 0),
      (this.Gzs = void 0);
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
      Log_1.Log.Error("InstanceDungeon", 17, "获取副本入口配置错误", ["id", n]);
  }
  GetInstanceDungeonEntranceFlowId(n) {
    let e = this.GetConfig(n)?.FlowId;
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 17, "获取副本入口流程错误", [
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
          Log_1.Log.Error("InstanceDungeon", 17, "获取副本入口流程错误", [
            "flowId",
            e,
          ]),
        (e = 1)),
      this.hhi.get(e)
    );
  }
  GetEntranceIdByMarkId(n) {
    if (!this.lhi) {
      this.lhi = new Map();
      for (const e of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList())
        e.MarkId && this.lhi.set(e.MarkId, e.Id);
    }
    return this.lhi.get(n) ?? 0;
  }
  CheckMarkIdLinkDungeonEntrance(n) {
    return 0 < this.GetEntranceIdByMarkId(n);
  }
  CheckMarkIdIsTowerEntrance(n) {
    var n = this.lhi.get(n);
    return (
      !!n &&
      (4 === (n = this.GetConfig(n))?.FlowId ||
        3 === n?.FlowId ||
        5 === n?.FlowId)
    );
  }
  CheckMarkIdIsRoguelike(n) {
    n = this.lhi.get(n);
    return !!n && 6 === this.GetConfig(n)?.FlowId;
  }
  CheckInstanceIdIsTowerDefence(n) {
    if (!this.Gzs) {
      this.Gzs = new Map();
      for (const e of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList())
        for (const n of e.InstanceDungeonList) this.Gzs.set(n, e);
    }
    const e = this.Gzs.get(n);
    return !!e && 8 === e.FlowId;
  }
}
exports.InstanceDungeonEntranceConfig = InstanceDungeonEntranceConfig;
//# sourceMappingURL=InstanceDungeonEntranceConfig.js.map
