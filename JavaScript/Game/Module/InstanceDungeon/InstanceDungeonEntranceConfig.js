"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InstanceDungeonEntranceAll_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceAll"),
  InstanceDungeonEntranceById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonEntranceById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  InstanceDungeonEntranceFlowAttached_1 = require("./Define/InstanceDungeonEntranceFlowAttached"),
  InstanceDungeonEntranceFlowNormal_1 = require("./Define/InstanceDungeonEntranceFlowNormal"),
  InstanceDungeonEntranceFlowRoguelike_1 = require("./Define/InstanceDungeonEntranceFlowRoguelike"),
  InstanceDungeonEntranceFlowSkipEditFormation_1 = require("./Define/InstanceDungeonEntranceFlowSkipEditFormation"),
  InstanceDungeonEntranceFlowTowerDefence_1 = require("./Define/InstanceDungeonEntranceFlowTowerDefence");
class InstanceDungeonEntranceConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.hhi = new Map()),
      (this.lhi = void 0),
      (this.XWa = void 0);
  }
  get YWa() {
    if (!this.XWa) {
      this.XWa = new Map();
      for (const n of InstanceDungeonEntranceAll_1.configInstanceDungeonEntranceAll.GetConfigList())
        for (const e of n.InstanceDungeonList) this.XWa.set(e, n);
    }
    return this.XWa;
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
  CheckInstanceIdIsTowerDefense(n) {
    n = this.YWa.get(n);
    return !!n && 8 === n.FlowId;
  }
  GetEntranceIdByInstanceId(n) {
    var e = this.YWa.get(n);
    return void 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            65,
            "未找到副本入口，请检查副本表配置，instanceId: " + n,
          ),
        0)
      : e.Id;
  }
}
exports.InstanceDungeonEntranceConfig = InstanceDungeonEntranceConfig;
//# sourceMappingURL=InstanceDungeonEntranceConfig.js.map
