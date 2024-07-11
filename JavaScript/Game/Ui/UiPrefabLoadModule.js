"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiPrefabLoadModule = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Log_1 = require("../../Core/Common/Log"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../GlobalData");
class UiPrefabLoadModule {
  constructor() {
    this.sCr = new Map();
  }
  async LoadPrefabAsync(e, r) {
    if (GlobalData_1.GlobalData.World) {
      const s = new CustomPromise_1.CustomPromise();
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiPrefabLoad", 11, "资源加载开始", ["路径", e]);
      var o = ResourceSystem_1.ResourceSystem.LoadAsync(
          e,
          UE.PrefabAsset,
          (e, o) => {
            e = UE.LGUIBPLibrary.LoadPrefabWithAsset(
              GlobalData_1.GlobalData.World,
              e,
              r,
            );
            s.SetResult(e),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("UiPrefabLoad", 11, "资源加载完成", ["路径", o]);
          },
          102,
        ),
        e =
          (o !== ResourceSystem_1.ResourceSystem.InvalidId &&
            this.sCr.set(o, e),
          await s.Promise);
      return this.sCr.delete(o), e;
    }
  }
  Clear() {
    for (var [e, o] of this.sCr)
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("UiPrefabLoad", 11, "资源加载取消", ["路径", o]);
    this.sCr.clear();
  }
}
exports.UiPrefabLoadModule = UiPrefabLoadModule;
//# sourceMappingURL=UiPrefabLoadModule.js.map
