"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelResourcesManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  EffectUtil_1 = require("../../Utils/EffectUtil");
class UiModelResourcesManager {
  static get CPo() {
    return UiModelResourcesManager.gPo++;
  }
  static LoadUiModelResources(r, a) {
    if (!r || 0 === r.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiModelResourcesManager",
            11,
            "加载资源内容为空,检查一下传进来的数据",
          ),
        a?.(1),
        0
      );
    const s = [],
      t = [],
      l = UiModelResourcesManager.CPo;
    var e = [];
    const i = new Map();
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
      GlobalData_1.GlobalData.World,
      "UiModelResourcesManager.LoadUiModelResources",
    );
    for (const u of r) {
      var o = ResourceSystem_1.ResourceSystem.LoadAsync(
        u,
        UE.Object,
        (e, o) => {
          e && (s.push(o), i.set(o, e)),
            t.push(o),
            t.length === r.length &&
              (UiModelResourcesManager.fPo.delete(l),
              s.length !== t.length ? a?.(3) : a?.(2, i),
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "UiModelResourcesManager.LoadUiModelResources",
              ));
        },
      );
      e.push(o);
    }
    return UiModelResourcesManager.fPo.set(l, e), l;
  }
  static LoadUiRoleAllResourceByRoleConfigId(e, o) {
    var r = [];
    return (
      r.push(...UiModelResourcesManager.GetRoleResourcesPath(e)),
      r.push(
        EffectUtil_1.EffectUtil.GetEffectPath("ChangeRoleMaterialController"),
      ),
      UiModelResourcesManager.LoadUiModelResources(r, o)
    );
  }
  static CancelUiModelResourceLoad(e) {
    if (e !== UiModelResourcesManager.InvalidValue) {
      var o = UiModelResourcesManager.fPo.get(e);
      if (o) {
        for (const e of o) ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
        ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
          GlobalData_1.GlobalData.World,
          "UiModelResourcesManager.LoadUiModelResources",
        );
      }
    }
  }
  static GetRoleResourcesPath(e) {
    var o = [],
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      r = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId),
      a =
        (o.push(r.网格体.ToAssetPathName()),
        o.push(e.UiScenePerformanceABP),
        r.子网格体);
    if (a) for (let e = 0; e < a.Num(); e++) o.push(a.Get(e).ToAssetPathName());
    return o;
  }
  static GetWeaponResourcesPath(e) {
    var o = [];
    for (const s of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
      e,
    ).Models) {
      var r = ModelUtil_1.ModelUtil.GetModelConfig(s),
        a = r.网格体.ToAssetPathName(),
        a = (a && o.push(a), r.动画蓝图.ToAssetPathName());
      a && o.push(a);
    }
    return o;
  }
  static GetHuluResourcesPath(e) {
    var o = [],
      e = ModelUtil_1.ModelUtil.GetModelConfig(e),
      r = e.网格体.ToAssetPathName(),
      r = (r && o.push(r), e.动画蓝图.ToAssetPathName());
    return r && o.push(r), o;
  }
  static LoadMeshesComponentsBundleStreaming(e, o, r) {
    return UE.KuroMeshTextureFunctionLibrary.ForceMeshesBundleStreamingInAllMips(
      e,
      o,
      (0, puerts_1.toManualReleaseDelegate)(r),
    );
  }
  static ReleaseMeshesComponentsBundleStreaming(e) {
    UE.KuroMeshTextureFunctionLibrary.StopMeshesBundleStreamingInAllMips(e);
  }
}
((exports.UiModelResourcesManager = UiModelResourcesManager).fPo = new Map()),
  (UiModelResourcesManager.gPo = 0),
  (UiModelResourcesManager.InvalidValue = 0),
  (UiModelResourcesManager.StreamingInvalidValue = -1);
//# sourceMappingURL=UiModelResourcesManager.js.map
