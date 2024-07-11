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
      (this.LoadResId = -1);
  }
}
exports.ScreenEffectHandle = ScreenEffectHandle;
class ScreenEffectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.HandleIdGenerator = 1),
      (this.HandleMap = new Map()),
      (this.PathToHandleMap = new Map()),
      (this.HandlePool = []);
  }
  PlayScreenEffect(e) {
    let t = this.PathToHandleMap.get(e);
    t || (((t = this.GetHandle()).Path = e), this.PathToHandleMap.set(e, t));
    var r = this.HandleIdGenerator++;
    return (
      t.HandleIds.add(r),
      this.HandleMap.set(r, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          18,
          "调用播放镜头特效接口",
          ["handleId", r],
          ["path", e],
        ),
      1 === t.HandleIds.size && (t.LoadResId = this.GSa(e)),
      r
    );
  }
  GSa(r) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(
      r,
      UE.EffectScreenPlayData_C,
      (e) => {
        var t = this.PathToHandleMap.get(r);
        t &&
          0 !== t.HandleIds.size &&
          ((t.EffectData = e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("RenderEffect", 18, "开始播放镜头特效", [
              "path",
              r,
            ]),
          ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
            e,
          ));
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
      (this.PathToHandleMap.delete(t.Path), this.OSa(t));
  }
  OnClear() {
    return (this.HandleIdGenerator = 0), this.kSa(), !0;
  }
  kSa() {
    this.PathToHandleMap.clear();
    for (const e of this.HandleMap.values()) this.OSa(e);
    this.HandleMap.clear();
  }
  OSa(e) {
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
      this.ReleaseHandle(e);
  }
  GetHandle() {
    var e = this.HandlePool.pop();
    return e || new ScreenEffectHandle();
  }
  ReleaseHandle(e) {
    this.HandlePool.push(e);
  }
}
exports.ScreenEffectModel = ScreenEffectModel;
//# sourceMappingURL=ScreenEffectModel.js.map
