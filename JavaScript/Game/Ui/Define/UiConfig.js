"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  InputDefine_1 = require("../Input/InputDefine"),
  InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine"),
  UiViewStorage_1 = require("../UiViewStorage"),
  UiLayerType_1 = require("./UiLayerType"),
  UiViewInfo_1 = require("./UiViewInfo");
class UiConfig {
  static TryGetViewInfo(n) {
    let r = UiConfig.Jcr.get(n);
    if (!r) {
      var o = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(n),
        a = UiViewStorage_1.UiViewStorage.GetUiTsInfo(n);
      if (!a)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            17,
            "[UiConfig.TryGetViewInfo] 未在UiViewManager中注册",
            ["name", n],
          )
        );
      var t = a.ResourceId;
      let e = "",
        i = "";
      if (this.zcr(n))
        (e = ConfigManager_1.ConfigManager.CommonConfig.GetDebugGmViewPath(n)),
          (i = e);
      else {
        var g =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(t);
        if (!g)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "[UiConfig.TryGetViewInfo] 找不到界面配置",
              ["name", n],
              ["resourceId", t],
            )
          );
        (e = g.Path), (i = g.PcPath);
      }
      var f = [];
      if (o.SkipAnim)
        if (o.IsShortKeysExitView) {
          for (var [u, p] of InputDefine_1.openViewActionsMap.entries())
            if (n === p) {
              if (
                "Escape" ===
                InputSettingsManager_1.InputSettingsManager.GetActionBinding(u)
                  ?.GetPcKey()
                  ?.GetKeyName()
              )
                break;
              f.push(u);
              break;
            }
          f.push(InputMappingsDefine_1.actionMappings.Ui返回);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              38,
              "[UiConfig.SkipAnim] 配置错误,跳过动画功能前提为IsShortKeysExitView=True",
            );
      t = UiLayerType_1.ELayerType[o.Type];
      (r = new UiViewInfo_1.UiViewInfo(
        n,
        t,
        a.Ctor,
        e,
        i,
        o.ObstructUi,
        o.AudioEvent,
        o.OpenAudioEvent,
        o.CloseAudioEvent,
        o.TimeDilation,
        o.ShowCursorType,
        o.CanOpenViewByShortcutKey,
        o.IsShortKeysExitView,
        a.SourceType,
        o.LoadAsync,
        o.NeedGC,
        o.IsFullScreen,
        UiLayerType_1.NORMAL_CONTAINER_TYPE & t
          ? ConfigManager_1.ConfigManager.UiViewConfig.GetUiNormalConfig(n)
              .SortIndex
          : -1,
        o.CommonPopBg,
        o.CommonPopBgKey,
        o.ScenePath,
        o.IsPermanent,
        f,
        o.ScenePointTag,
      )),
        UiConfig.Jcr.set(n, r);
    }
    return r;
  }
  static zcr(e) {
    return "GmView" === e || "LoginDebugView" === e;
  }
}
((exports.UiConfig = UiConfig).Jcr = new Map()),
  (UiConfig.CanOpenWhileClearSceneViewNameSet = new Set(["LoadingView"]));
//# sourceMappingURL=UiConfig.js.map
