"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssActorManager = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  SkeletalObserverManager_1 = require("../../SkeletalObserver/SkeletalObserverManager");
class DangoAbyssActorManager {
  static InitIndexDangoSkeletalObserverHandle(e) {
    var r;
    DangoAbyssActorManager._n1.get(e) ||
      ((r =
        SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
          this.cn1,
        )),
      this._n1.set(e, r));
  }
  static GetDangoSkeletalObserverHandle(e) {
    e = DangoAbyssActorManager._n1.get(e);
    if (!e) return e;
  }
  static RefreshDangoSkeletalObserverHandle(e, a, s) {
    var r = DangoAbyssActorManager._n1.get(e);
    if (r) {
      r = r.Model;
      const o = a.MeshId;
      var t = r.CheckGetComponent(0);
      if (t?.ModelConfigId === o) 2 === t.GetModelLoadState() && s?.();
      else if (
        ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(o)
      ) {
        const n = r.CheckGetComponent(1),
          i = r.CheckGetComponent(10);
        i.StopAnimation();
        t = a.DangoPointCase;
        n.SetTransformByTag(t);
        const g = r.CheckGetComponent(26);
        i.SetAnimationMode(1);
        t = a.StandAnimationName;
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimationAsset, (r) => {
          r &&
            g.LoadModelByDangoId(a.DangoId, o, !0, () => {
              var e = r;
              i.PlayAnimation(e, !0),
                (e = a.Transform) &&
                  n.SetAllMeshComponentRelativeTransform(e, !1, void 0, !1),
                s?.();
            });
        });
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 27, "没有初始化index observer", [
          "index",
          e,
        ]);
  }
  static RefreshSkeletalObserverAnimation(e, r, a) {
    var s = DangoAbyssActorManager._n1.get(e);
    if (s) {
      const t = s.Model.CheckGetComponent(10);
      t.StopAnimation(),
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimationAsset, (e) => {
          e && t.PlayAnimation(e, a);
        });
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 27, "没有初始化index observer", [
          "index",
          e,
        ]);
  }
  static DestroyAllDangoSkeletalObserverHandle() {
    for (const e of this._n1.values())
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      );
    this._n1.clear();
  }
  static DestroyDangoSkeletalObserverHandle(e) {
    var r = this._n1.get(e);
    r &&
      (SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        r,
      ),
      this._n1.delete(e));
  }
}
((exports.DangoAbyssActorManager = DangoAbyssActorManager).cn1 = 15),
  (DangoAbyssActorManager._n1 = new Map());
//# sourceMappingURL=DangoAbyssActorManager.js.map
