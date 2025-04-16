"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelResourcesManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem"),
  ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  EffectUtil_1 = require("../../Utils/EffectUtil");
class UiModelResourcesManager {
  static get cxo() {
    return UiModelResourcesManager.mxo++;
  }
  static LoadUiModelResources(o, s) {
    if (!o || 0 === o.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiModelResourcesManager",
            10,
            "加载资源内容为空,检查一下传进来的数据",
          ),
        s?.(1),
        0
      );
    const a = [],
      t = [],
      i = UiModelResourcesManager.cxo,
      l = new Map();
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
      GlobalData_1.GlobalData.World,
      "UiModelResourcesManager.LoadUiModelResources",
    ),
      UiModelResourcesManager.dxo.set(i, []);
    for (const r of o) {
      var e = ResourceSystem_1.ResourceSystem.LoadAsync(
        r,
        UE.Object,
        (e, r) => {
          e && (a.push(r), l.set(r, e)),
            t.push(r),
            t.length === o.length &&
              (UiModelResourcesManager.dxo.delete(i),
              a.length !== t.length ? s?.(3) : s?.(2, l),
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "UiModelResourcesManager.LoadUiModelResources",
              ));
        },
      );
      UiModelResourcesManager.dxo.has(i) &&
        UiModelResourcesManager.dxo.get(i).push(e);
    }
    return i;
  }
  static LoadUiRoleAllResourceByRoleConfigId(e, r) {
    var o = [];
    return (
      o.push(...UiModelResourcesManager.GetRoleResourcesPath(e)),
      o.push(
        EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController"),
      ),
      UiModelResourcesManager.LoadUiModelResources(o, r)
    );
  }
  static CancelUiModelResourceLoad(e) {
    if (e !== UiModelResourcesManager.InvalidValue) {
      var r = UiModelResourcesManager.dxo.get(e);
      if (r) {
        for (const e of r) ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
        ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
          GlobalData_1.GlobalData.World,
          "UiModelResourcesManager.LoadUiModelResources",
        );
      }
    }
  }
  static GetRoleResourcesPath(e) {
    var r = [],
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      o = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId),
      s =
        (r.push(o.网格体.ToAssetPathName()),
        r.push(e.UiScenePerformanceABP),
        o.子网格体);
    if (s) for (let e = 0; e < s.Num(); e++) r.push(s.Get(e).ToAssetPathName());
    return r;
  }
  static GetWeaponResourcesPath(e) {
    var r = [];
    for (const a of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
      e,
    ).Models) {
      var o = ModelUtil_1.ModelUtil.GetModelConfig(a),
        s = o.网格体.ToAssetPathName(),
        s = (s && r.push(s), o.动画蓝图.ToAssetPathName());
      s && r.push(s);
    }
    return r;
  }
  static GetHuluResourcesPath(e) {
    var r = [],
      e = ModelUtil_1.ModelUtil.GetModelConfig(e),
      o = e.网格体.ToAssetPathName(),
      o = (o && r.push(o), e.动画蓝图.ToAssetPathName());
    return o && r.push(o), r;
  }
  static LoadMeshesComponentsBundleStreaming(e, r, s) {
    var o = (e, r) => {
        const o = () => {
          try {
            s(e, r),
              UiModelResourcesManager.StreamingCallBackCatchSet.delete(o);
          } catch (e) {
            e instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "UiModelResourcesManager",
                  43,
                  "[UiModelResourcesManager FinishCallBack] 模型加载回调执行异常",
                  e,
                  ["error", e.message],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "UiModelResourcesManager",
                  43,
                  "[UiModelResourcesManager FinishCallBack] 模型加载回调执行异常",
                  ["error", e],
                );
          }
        };
        UiModelResourcesManager.StreamingCallBackCatchSet.add(o),
          TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
            0,
            !0,
            o,
          );
      },
      e = UE.KuroMeshTextureFunctionLibrary.ForceMeshesBundleStreamingInAllMips(
        e,
        r,
        (0, puerts_1.toManualReleaseDelegate)(o),
      );
    return this.sg1.set(e, o), e;
  }
  static ReleaseMeshesComponentsBundleStreaming(e) {
    UE.KuroMeshTextureFunctionLibrary.StopMeshesBundleStreamingInAllMips(e);
    var r = this.sg1.get(e);
    r && ((0, puerts_1.releaseManualReleaseDelegate)(r), this.sg1.delete(e));
  }
}
((exports.UiModelResourcesManager = UiModelResourcesManager).dxo = new Map()),
  (UiModelResourcesManager.mxo = 0),
  (UiModelResourcesManager.InvalidValue = 0),
  (UiModelResourcesManager.StreamingInvalidValue = -1),
  (UiModelResourcesManager.StreamingCallBackCatchSet = new Set()),
  (UiModelResourcesManager.sg1 = new Map());
//# sourceMappingURL=UiModelResourcesManager.js.map
