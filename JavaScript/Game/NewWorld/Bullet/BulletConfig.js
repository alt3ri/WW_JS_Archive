"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletConfig =
    exports.BulletDataCacheInfo =
    exports.PreloadBulletConfig =
      void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const BulletDataMain_1 = require("./BulletConf/BulletDataMain");
const bulletDtPath = [
  void 0,
  void 0,
  "/Game/Aki/Data/Fight/DT_CommonBulletDataMain_Rogue.DT_CommonBulletDataMain_Rogue",
];
class PreloadBulletConfig {
  constructor() {
    (this.ModelId = 0),
      (this.DataTable = void 0),
      (this.RowNames = void 0),
      (this.CurIndex = 0);
  }
}
exports.PreloadBulletConfig = PreloadBulletConfig;
const preloadCommonBulletRowNames = ["100121", "100122"];
class BulletDataCacheInfo {
  constructor() {
    (this.BulletDataMap = new Map()),
      (this.DataTable = void 0),
      (this.DataTableExtra = void 0),
      (this.EntityCount = 0);
  }
}
exports.BulletDataCacheInfo = BulletDataCacheInfo;
class BulletConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.O8o = []), (this.k8o = void 0);
  }
  static RemoveCacheBulletDataByEntityId(e) {
    let t;
    const l = BulletConfig.F8o.get(e);
    l &&
      (BulletConfig.F8o.delete(e),
      (t = BulletConfig.V8o.get(l))
        ? (t.EntityCount--, t.EntityCount === 0 && BulletConfig.V8o.delete(l))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "删除实体时，子弹缓存里没有对应的数据",
            ["entityId", e],
            ["modelId", l],
          ));
  }
  static ClearBulletDataCache() {
    BulletConfig.V8o.clear(),
      BulletConfig.H8o.clear(),
      BulletConfig.F8o.clear();
  }
  GetBulletData(e, t, l = !0, a = -1) {
    const o = e.CheckGetComponent(33);
    const i = e.Id;
    let r = BulletConfig.F8o.get(i);
    let n = !0;
    let u =
      (r || ((r = e.CheckGetComponent(0).GetModelId()), (n = !1)),
      BulletConfig.V8o.get(r));
    if (u) {
      var s = u.BulletDataMap.get(t);
      if (s) return n || (BulletConfig.F8o.set(i, r), u.EntityCount++), s;
    }
    let f = this.j8o(a, t);
    if (f) return f;
    let g = void 0;
    let B = void 0;
    let _ =
      ((B = u
        ? ((g = u.DataTable), u.DataTableExtra)
        : ((g = o.DtBulletInfo), o.DtBulletInfoExtra)),
      DataTableUtil_1.DataTableUtil.GetDataTableRow(g, t));
    if ((_ = _ || DataTableUtil_1.DataTableUtil.GetDataTableRow(B, t))) {
      const f = new BulletDataMain_1.BulletDataMain(_, t);
      return f.CheckValid()
        ? (GlobalData_1.GlobalData.IsPlayInEditor ||
            (u ||
              (((u = new BulletDataCacheInfo()).DataTable = g),
              (u.DataTableExtra = B),
              (u.EntityCount = 0),
              BulletConfig.V8o.set(r, u)),
            u.BulletDataMap.set(t, f),
            n) ||
            (BulletConfig.F8o.set(i, r), u.EntityCount++),
          f)
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", t])
          );
    }
    if ((f = this.W8o(a, t))) return f;
    l &&
      ((s = e.CheckGetComponent(3).Actor), Log_1.Log.CheckError()) &&
      Log_1.Log.Error(
        "Bullet",
        18,
        "子弹数据未找到!",
        ["角色:", s.GetName()],
        ["子弹名称:", t],
        ["dtType", a],
      );
  }
  j8o(e, t) {
    if (e === -1)
      for (const o of BulletConfig.H8o.values()) {
        const l = o.BulletDataMap.get(t);
        if (l) return l;
      }
    else if (e !== 0) {
      const o = BulletConfig.H8o.get(e);
      if (o) {
        const a = o.BulletDataMap.get(t);
        if (a) return a;
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "该子弹的DT表没有加载，请检查触发子弹的玩法是否正确",
            ["bulletDataName", t],
            ["dtType", e],
          );
    }
  }
  W8o(e, t) {
    if (e === -1)
      for (const a of BulletConfig.H8o.values()) {
        const o = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, t);
        var l;
        if (o)
          return (l = new BulletDataMain_1.BulletDataMain(o, t)).CheckValid()
            ? (GlobalData_1.GlobalData.IsPlayInEditor ||
                a.BulletDataMap.set(t, l),
              l)
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", t])
              );
      }
    else {
      const a = BulletConfig.H8o.get(e);
      if (a) {
        const o = DataTableUtil_1.DataTableUtil.GetDataTableRow(a.DataTable, t);
        return o
          ? (e = new BulletDataMain_1.BulletDataMain(o, t)).CheckValid()
            ? (GlobalData_1.GlobalData.IsPlayInEditor ||
                a.BulletDataMap.set(t, e),
              e)
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", t])
              )
          : void 0;
      }
    }
  }
  GetBulletHitData(t, l) {
    if (l !== FNameUtil_1.FNameUtil.EMPTY && l !== FNameUtil_1.FNameUtil.NONE) {
      (t = t.CheckGetComponent(33)), (l = l.toString());
      let e = DataTableUtil_1.DataTableUtil.GetDataTableRow(t.DtHitEffect, l);
      return (e =
        (e =
          !e && t.DtHitEffectExtra
            ? DataTableUtil_1.DataTableUtil.GetDataTableRow(
                t.DtHitEffectExtra,
                l,
              )
            : e) ||
        DataTableUtil_1.DataTableUtil.GetDataTableRow(
          ConfigManager_1.ConfigManager.WorldConfig.GetCommonHitEffectData(),
          l,
        ));
    }
  }
  PreloadCommonBulletData() {
    this.K8o(1),
      ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() &&
        this.K8o(2);
    const e = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData();
    return this.X8o(e, void 0, 0, 0, preloadCommonBulletRowNames), !0;
  }
  K8o(t) {
    let l;
    let a = BulletConfig.H8o.get(t);
    if (!a) {
      let e = void 0;
      t === 1
        ? (e = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData())
        : (l = bulletDtPath[t]) &&
          (e = ResourceSystem_1.ResourceSystem.SyncLoad(l, UE.DataTable)),
        e &&
          (((a = new BulletDataCacheInfo()).DataTable = e),
          BulletConfig.H8o.set(t, a),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Bullet", 18, "预加载通用子弹DT", ["dtType", t]);
    }
  }
  PreloadBulletData(e) {
    let t, l;
    e?.GetComponent(0)?.IsRole() &&
      ((t = e.CheckGetComponent(33)),
      (l = e.CheckGetComponent(0).GetModelId()),
      this.X8o(t.DtBulletInfo, t.DtBulletInfoExtra, l, e.Id));
  }
  X8o(e, l, a, o, i = void 0) {
    if (
      !GlobalData_1.GlobalData.IsPlayInEditor &&
      e &&
      void 0 !== a &&
      !BulletConfig.V8o.has(a)
    ) {
      let t = i;
      if (!t) {
        t = [];
        var i = (0, puerts_1.$ref)(void 0);
        const r =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(e, i),
          (0, puerts_1.$unref)(i));
        if (!r) return;
        const n = r.Num();
        if (n <= 0) return;
        for (let e = 0; e < n; e++) {
          const u = r.Get(e).toString();
          t.push(u);
        }
      }
      (i = new BulletDataCacheInfo()),
        (l =
          ((i.DataTable = e),
          (i.DataTableExtra = l),
          ModelManager_1.ModelManager.CharacterModel.IsValid(o) &&
            ((i.EntityCount = 1), BulletConfig.F8o.set(o, a)),
          BulletConfig.V8o.set(a, i),
          new PreloadBulletConfig()));
      (l.ModelId = a),
        (l.DataTable = e),
        (l.CurIndex = 0),
        (l.RowNames = t),
        this.k8o ? this.O8o.push(l) : (this.k8o = l);
    }
  }
  TickPreload() {
    if (this.k8o) {
      if (this.k8o.RowNames.length <= this.k8o.CurIndex) {
        if (this.O8o.length === 0) return void (this.k8o = void 0);
        if (
          ((this.k8o = this.O8o.pop()),
          this.k8o.RowNames.length <= this.k8o.CurIndex)
        )
          return;
      }
      let e;
      let t;
      const l = BulletConfig.V8o.get(this.k8o.ModelId);
      l
        ? ((e = this.k8o.RowNames[this.k8o.CurIndex]),
          (t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.k8o.DataTable,
            e,
          ))
            ? (t = new BulletDataMain_1.BulletDataMain(t, e)).CheckValid()
              ? (t.Preload(), l.BulletDataMap.set(e, t))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Bullet", 18, "子弹配置非法", ["", e])
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                18,
                "子弹配置为空",
                ["rowName", e],
                ["modelId", this.k8o?.ModelId],
                ["index", this.k8o?.CurIndex],
              ),
          this.k8o.CurIndex++)
        : (this.k8o.CurIndex = this.k8o.RowNames.length);
    }
  }
  ClearPreload() {
    (this.k8o = void 0), (this.O8o.length = 0);
  }
}
((exports.BulletConfig = BulletConfig).Q8o = void 0),
  (BulletConfig.$8o = void 0),
  (BulletConfig.V8o = new Map()),
  (BulletConfig.H8o = new Map()),
  (BulletConfig.F8o = new Map());
// # sourceMappingURL=BulletConfig.js.map
