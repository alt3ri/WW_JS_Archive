"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  MapRogueDefine_1 = require("./MapRogueDefine"),
  MapRogueOpFallback_1 = require("./Op/MapRogueOpFallback"),
  MapRogueOpGotoLevelPlay_1 = require("./Op/MapRogueOpGotoLevelPlay"),
  MapRogueOpGridEvent_1 = require("./Op/MapRogueOpGridEvent"),
  MapRogueOpGridFocus_1 = require("./Op/MapRogueOpGridFocus"),
  MapRogueOpMove_1 = require("./Op/MapRogueOpMove"),
  MapRogueOpRoleBuffBondLinkId_1 = require("./Op/MapRogueOpRoleBuffBondLinkId"),
  MapRogueOpSelectView_1 = require("./Op/MapRogueOpSelectView"),
  MapRogueOpShowView_1 = require("./Op/MapRogueOpShowView"),
  MapRogueOpTeleport_1 = require("./Op/MapRogueOpTeleport"),
  SeedRandomUtil_1 = require("./Utils/SeedRandomUtil");
class MapRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.GameInfo = void 0),
      (this.GameOpList = []),
      (this.GameOpMap = new Map()),
      (this.vm1 = 0),
      (this.ffc = 0),
      (this.py1 = 0);
  }
  RefreshGameInfo(e) {
    this.GameInfo || (this.GameInfo = new MapRogueDefine_1.MapRogueGameInfo()),
      this.GameInfo.Refresh(e),
      (this.vm1 = e.CurrencyItemId),
      (this.ffc = e.RoleLevel),
      (this.py1 = e.RoleMaxStar);
  }
  ResetGameInfo() {
    this.GameInfo?.Clear(),
      (this.GameInfo = void 0),
      (this.GameOpList.length = 0);
  }
  GenerateOpList(e) {
    this.GameOpList.length = 0;
    for (const t of e) this.AddOpData(t);
    this.PrintAllOpList(), this.ExecuteOpDataList(!1);
  }
  PrintAllOpList() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RogueBattle", 37, "[MapRogue] 指令队列打印开始", [
        "InBattle",
        this.GameInfo?.InBattle,
      ]);
    for (let e = 0; e < this.GameOpList.length; e++) {
      var t = this.GameOpList[e];
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RogueBattle",
          37,
          "[MapRogue] 指令",
          ["Index", e],
          ["Data", t.ToString()],
        );
    }
  }
  AddOpData(e) {
    let t = void 0;
    switch (e.iac) {
      case Protocol_1.Aki.Protocol.iac.TJ_:
        t = new MapRogueOpMove_1.MapRogueOpMove(
          this.GameInfo?.PlayerGridIndex ?? 0,
        );
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_ShowView:
        t = new MapRogueOpShowView_1.MapRogueOpShowView();
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_SelectView:
        t = new MapRogueOpSelectView_1.MapRogueOpSelectView();
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_GridEvent:
        t = new MapRogueOpGridEvent_1.MapRogueOpGridEvent();
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_RogueGotoLevelPlay:
        t = new MapRogueOpGotoLevelPlay_1.MapRogueOpGotoLevelPlay();
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_RollBuffBondLinkId:
        t = new MapRogueOpRoleBuffBondLinkId_1.MapRogueOpRoleBuffBondLinkId();
        break;
      case Protocol_1.Aki.Protocol.iac.by1:
        t = new MapRogueOpFallback_1.MapRogueOpFallback();
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_LightBlockByLocationEffect:
        t = new MapRogueOpGridFocus_1.MapRogueOpGridFocus();
        break;
      case Protocol_1.Aki.Protocol.iac.Proto_MapTeleportByLocationEffect:
        t = new MapRogueOpTeleport_1.MapRogueOpTeleport();
    }
    t &&
      (t.Update(e, this.GameInfo),
      this.GameOpList.push(t),
      this.GameOpMap.set(e.w5n, t),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "RogueBattle",
        37,
        "[MapRogue] 新增指令",
        ["Index", this.GameOpList.length - 1],
        ["Data", t.ToString()],
      );
  }
  RemoveOpData(t) {
    var e;
    this.GameInfo &&
      (e = this.GameOpMap.get(t)) &&
      (e.Delete(this.GameInfo),
      -1 !== (e = this.GameOpList.findIndex((e) => e.IncId === t)) &&
        this.GameOpList.splice(e, 1),
      this.GameOpMap.delete(t),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "RogueBattle",
        37,
        "[MapRogue] 删除指令",
        ["Index", e],
        ["IncId", t],
      );
  }
  UpdateOpData(e) {
    var t = this.GameOpMap.get(e.w5n);
    t &&
      (t.Update(e, this.GameInfo), Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("RogueBattle", 37, "[MapRogue] 更新指令", [
        "Data",
        t.ToString(),
      ]);
  }
  GetOpData(e) {
    return this.GameOpMap.get(e);
  }
  GetAllOpData() {
    return this.GameOpList;
  }
  ExecuteOpData(e, t) {
    this.GameInfo && this.GameOpMap.get(e)?.Execute(this.GameInfo, t);
  }
  ExecuteOpDataList(e) {
    var t;
    this.GameInfo &&
      (0 < this.GameOpList.length
        ? ((t = this.GameOpList[this.GameOpList.length - 1]).ExecuteByMapView &&
            !e) ||
          (t.ExecuteInMapView && !this.GameInfo.HasBindView) ||
          ((this.GameInfo.GameStage = 2), t.StartExecute(this.GameInfo))
        : (this.GameInfo.GameStage = 1));
  }
  CreateMapGridDataList(t, e) {
    var o = new SeedRandomUtil_1.SeedRandomUtil(),
      a = (o.SetSeed(e), []);
    for (let e = 0; e < t.length; e++) {
      var i = t[e],
        r = new MapRogueDefine_1.MapGridData();
      r.RefreshByServer(i), (r.GridIndex = e), this.r2c(r, o), a.push(r);
    }
    return a;
  }
  RefreshMapGridData(e, t) {
    var o,
      a,
      i = this.GameInfo.MapGrids.at(e);
    i &&
      ((o = i.GridTypeId),
      (a = i.IsExplore),
      i.RefreshByServer(t),
      o !== i.GridTypeId &&
        ((t = new SeedRandomUtil_1.SeedRandomUtil()).SetSeed(
          this.GameInfo.RandomSeed,
        ),
        this.r2c(i, t)),
      this.GameInfo.RefreshGrid(e, a !== i.IsExplore));
  }
  r2c(e, t) {
    var o,
      a = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridMapTypeConfigById(
        e.GridTypeId,
      );
    a &&
      ((o = Array.from(a.GroundPath.values())),
      (e.GroundPathIndex = t.WeightedRandom(o)),
      (o = a.DecorationPath) && 0 < o.size
        ? ((a = Array.from(o.values())),
          (e.ExtraPathIndex = t.WeightedRandom(a)))
        : (e.ExtraPathIndex = -1));
  }
  ShiftGetItemData() {
    if (this.GameInfo) return this.GameInfo.ShiftGetItemData();
  }
  GetRogueCurrencyItemId() {
    return this.vm1;
  }
  GetRogueRoleLevel() {
    return this.ffc;
  }
  SetRoleLevel(e) {
    this.ffc = e;
  }
  GetRogueRoleMaxStar() {
    return this.py1;
  }
  GetExploredGridCount() {
    let e = 0;
    for (const t of this.GameInfo.MapGrids) e += t.IsExplore ? 1 : 0;
    return e;
  }
}
exports.MapRogueModel = MapRogueModel;
//# sourceMappingURL=MapRogueModel.js.map
