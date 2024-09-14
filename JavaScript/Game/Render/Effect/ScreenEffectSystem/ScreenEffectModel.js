"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScreenEffectModel = exports.ScreenEffectHandle = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ScreenEffectSystem_1 = require("./ScreenEffectSystem");
class ScreenEffectHandle {
  constructor() {
    (this.HandleIds = new Set()),
      (this.Path = void 0),
      (this.EffectData = void 0),
      (this.LoadResId = -1),
      (this.WaitingFightRootInit = !1);
  }
}
exports.ScreenEffectHandle = ScreenEffectHandle;
class ScreenEffectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.HandleIdGenerator = 1),
      (this.HandleMap = new Map()),
      (this.PathToHandleMap = new Map()),
      (this.HandlePool = []),
      (this.FightRootInited = !1);
  }
  PlayScreenEffect(e) {
    let t = this.PathToHandleMap.get(e);
    t || (((t = this.GetHandle()).Path = e), this.PathToHandleMap.set(e, t));
    var s = this.HandleIdGenerator++;
    return (
      t.HandleIds.add(s),
      this.HandleMap.set(s, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          18,
          "调用播放镜头特效接口",
          ["handleId", s],
          ["path", e],
        ),
      1 === t.HandleIds.size && (t.LoadResId = this.lTa(e)),
      s
    );
  }
  lTa(s) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(
      s,
      UE.EffectScreenPlayData_C,
      (e) => {
        var t = this.PathToHandleMap.get(s);
        t &&
          0 !== t.HandleIds.size &&
          ((t.EffectData = e),
          this.FightRootInited
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("RenderEffect", 18, "开始播放镜头特效", [
                  "path",
                  s,
                ]),
              ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
                e,
              ))
            : (t.WaitingFightRootInit = !0));
      },
    );
  }
  EndScreenEffect(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("RenderEffect", 18, "调用停止镜头特效接口", [
        "handleId",
        e,
      ]);
    var t = this.HandleMap.get(e);
    t &&
      t.HandleIds.has(e) &&
      (t.HandleIds.delete(e), 0 === t.HandleIds.size) &&
      (this.PathToHandleMap.delete(t.Path), this._Ta(t));
  }
  OnClear() {
    return (this.HandleIdGenerator = 0), this.uTa(), !0;
  }
  uTa() {
    for (const e of this.PathToHandleMap.values()) this._Ta(e);
    this.PathToHandleMap.clear(), this.HandleMap.clear();
  }
  _Ta(e) {
    e.HandleIds.clear(),
      e.EffectData &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 18, "停止镜头特效", ["path", e.Path]),
        ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(
          e.EffectData,
        ),
        (e.EffectData = void 0)),
      -1 !== e.LoadResId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e.LoadResId),
        (e.LoadResId = -1)),
      (e.Path = void 0),
      (e.WaitingFightRootInit = !1),
      this.ReleaseHandle(e);
  }
  SetFightRootInited(e) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("RenderEffect", 18, "设置战斗镜头特效根节点", [
          "isInit",
          e,
        ]),
      this.FightRootInited !== e && (this.FightRootInited = e))
    )
      for (const t of this.PathToHandleMap.values())
        t.WaitingFightRootInit &&
          ((t.WaitingFightRootInit = !1), t.EffectData) &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("RenderEffect", 18, "开始播放镜头特效", [
              "path",
              t.Path,
            ]),
          ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
            t.EffectData,
          ));
  }
  GetHandle() {
    var e = this.HandlePool.pop();
    return e || new ScreenEffectHandle();
  }
  ReleaseHandle(e) {
    this.HandlePool.includes(e)
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("RenderEffect", 18, "镜头特效Handel重复入池")
      : this.HandlePool.push(e);
  }
}
exports.ScreenEffectModel = ScreenEffectModel;
//# sourceMappingURL=ScreenEffectModel.js.map
