"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoRunModel =
    exports.GmDataLayerInfo =
    exports.TeleportInfo =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DataLayerById_1 = require("../../../Core/Define/ConfigQuery/DataLayerById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager");
class TeleportInfo {
  constructor(e, t) {
    (this.Location = e), (this.Rotator = t);
  }
}
exports.TeleportInfo = TeleportInfo;
class GmDataLayerInfo {
  constructor(e, t) {
    (this.LoadDataLayers = e), (this.UnloadDataLayers = t);
  }
}
exports.GmDataLayerInfo = GmDataLayerInfo;
class AutoRunModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.$Ke = "Stopped"),
      (this.YKe = "Disabled"),
      (this.JKe = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid),
      (this.zKe = 0),
      (this.ZKe = 0),
      (this.ShouldTpAfterSkip = !1),
      (this.ShouldFastSkip = !1),
      (this.eQe = new Map()),
      (this.tQe = new Map()),
      (this.dKs = new Map()),
      (this.MapEntityDataCache = new Map());
  }
  OnInit() {
    return (
      (this.YKe = "Disabled"),
      (this.JKe = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid),
      (this.zKe = 0),
      !(this.ZKe = 0)
    );
  }
  OnClear() {
    return (
      this.ClearAllOverrideTpInfo(),
      this.ClearAllGuaranteeTpInfo(),
      this.ClearCachedDataLayerInfo(),
      this.MapEntityDataCache.clear(),
      !0
    );
  }
  GetAutoRunState() {
    return this.$Ke;
  }
  SetAutoRunState(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Gm",
        40,
        "[Gm一键推进] AutoRunState改变",
        ["原AutoRunState", this.$Ke],
        ["新AutoRunState", e],
      ),
      this.$Ke !== e &&
        ((this.$Ke = e),
        (ModelManager_1.ModelManager.SundryModel.IsBlockTips =
          this.IsInLogicTreeGmMode()),
        ModelManager_1.ModelManager.GuideModel.SetGmLock(
          this.IsInLogicTreeGmMode(),
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GmAutoModeChange,
          e,
        ));
  }
  IsInLogicTreeGmMode() {
    return "Disabled" !== this.YKe && "Running" === this.$Ke;
  }
  IsInAfterRunningState() {
    return "Disabled" !== this.YKe && "AfterRunning" === this.$Ke;
  }
  IsInServerControlGmMode() {
    return "ServerControlledSkip" === this.YKe;
  }
  GetAutoRunMode() {
    return this.YKe;
  }
  SetAutoRunMode(
    e,
    t = Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid,
    r = 0,
    o = 0,
  ) {
    (this.YKe = e), (this.JKe = t), (this.zKe = r), (this.ZKe = o);
  }
  StopAutoRunAndClearInfo() {
    this.SetAutoRunState("Stopped"), this.ClearAutoRunInfo();
  }
  ClearAutoRunInfo() {
    this.SetAutoRunMode("Disabled"),
      (this.ShouldFastSkip = !1),
      (this.ShouldTpAfterSkip = !1),
      (this.ShouldTpAfterSkip = !1),
      this.ClearAllOverrideTpInfo(),
      this.ClearAllGuaranteeTpInfo(),
      this.ClearCachedDataLayerInfo();
  }
  GetGmSkipTreeType() {
    return this.JKe;
  }
  GetGmSkipTreeConfigId() {
    return this.zKe;
  }
  GetGmSkipNodeId() {
    return this.ZKe;
  }
  GetGuaranteeTpInfo(e) {
    e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.tQe.get(e);
  }
  SetGuaranteeTpInfo(e, t) {
    t = t ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Gm",
        40,
        "[Gm一键推进] 设置保底传送信息",
        ["地图Id", t],
        ["旧值", this.tQe.get(t)],
        ["新值", e],
      ),
      e ? this.tQe.set(t, e) : this.tQe.delete(t);
  }
  ClearAllGuaranteeTpInfo() {
    this.tQe.clear();
  }
  GetOverrideTpInfo(e) {
    e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.eQe.get(e);
  }
  SetOverrideTpInfo(e, t) {
    t = t ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Gm",
        40,
        "[Gm一键推进] 设置覆盖传送信息",
        ["地图Id", t],
        ["旧值", this.eQe.get(t)],
        ["新值", e],
      ),
      e ? this.eQe.set(t, e) : this.eQe.delete(t);
  }
  ClearAllOverrideTpInfo() {
    this.eQe.clear();
  }
  GetCachedDataLayerInfo(e) {
    e = e ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.dKs.get(e);
  }
  UpdateCachedDataLayerInfo(t, r, o) {
    if (t.length || r.length) {
      var n,
        s,
        o = o ?? ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        i = new Array(),
        a = new Array();
      for (const h of t)
        "string" == typeof h
          ? i.push(h)
          : (n = DataLayerById_1.configDataLayerById.GetConfig(h)) &&
            i.push(n.DataLayer);
      for (const u of r)
        "string" == typeof u
          ? a.push(u)
          : (s = DataLayerById_1.configDataLayerById.GetConfig(u)) &&
            a.push(s.DataLayer);
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Gm",
          40,
          "[Gm一键推进] 更新缓存的DataLayer信息",
          ["地图Id", o],
          ["加载", i],
          ["卸载", a],
        );
      let e = this.dKs.get(o);
      e ||
        ((e = new GmDataLayerInfo(new Set(), new Set())), this.dKs.set(o, e));
      for (const d of i) e.LoadDataLayers.add(d), e.UnloadDataLayers.delete(d);
      for (const l of a) e.UnloadDataLayers.add(l), e.LoadDataLayers.delete(l);
    }
  }
  ClearCachedDataLayerInfo() {
    this.dKs.clear();
  }
}
exports.AutoRunModel = AutoRunModel;
//# sourceMappingURL=AutoRunModel.js.map
