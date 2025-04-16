"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  LoadingDefine_1 = require("../../Module/Loading/LoadingDefine"),
  InputDefine_1 = require("../Input/InputDefine"),
  InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine"),
  UiViewStorage_1 = require("../UiViewStorage"),
  UiLayerType_1 = require("./UiLayerType"),
  UiViewInfo_1 = require("./UiViewInfo");
class UiConfig {
  static TryGetViewInfo(n) {
    let r = UiConfig.Jcr.get(n);
    if (!r) {
      var t = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(n),
        o = UiViewStorage_1.UiViewStorage.GetUiTsInfo(n);
      if (!o)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiCore",
            16,
            "[UiConfig.TryGetViewInfo] 未在UiViewManager中注册",
            ["name", n],
          )
        );
      var a = o.ResourceId;
      let e = "",
        i = "";
      if (this.zcr(n))
        (e = ConfigManager_1.ConfigManager.CommonConfig.GetDebugGmViewPath(n)),
          (i = e);
      else {
        var g =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(a);
        if (!g)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              16,
              "[UiConfig.TryGetViewInfo] 找不到界面配置",
              ["name", n],
              ["resourceId", a],
            )
          );
        (e = g.Path), (i = g.PcPath);
      }
      var f = [];
      if (t.SkipAnim)
        if (t.IsShortKeysExitView) {
          for (var [_, u] of InputDefine_1.openViewActionsMap.entries())
            if (n === u) {
              if (
                "Escape" ===
                InputSettingsManager_1.InputSettingsManager.GetActionBinding(_)
                  ?.GetPcKey()
                  ?.GetKeyName()
              )
                break;
              f.push(_);
              break;
            }
          f.push(InputMappingsDefine_1.actionMappings.Ui返回);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              37,
              "[UiConfig.SkipAnim] 配置错误,跳过动画功能前提为IsShortKeysExitView=True",
            );
      a = UiLayerType_1.ELayerType[t.Type];
      (r = new UiViewInfo_1.UiViewInfo(
        n,
        a,
        o.Ctor,
        e,
        i,
        t.ObstructUi,
        t.AudioEvent,
        t.OpenAudioEvent,
        t.LoopAudioEvent,
        t.CloseAudioEvent,
        t.TimeDilation,
        t.ShowCursorType,
        t.CanOpenViewByShortcutKey,
        t.IsShortKeysExitView,
        o.SourceType,
        t.LoadAsync,
        t.NeedGC,
        t.IsFullScreen,
        UiLayerType_1.NORMAL_CONTAINER_TYPE & a
          ? ConfigManager_1.ConfigManager.UiViewConfig.GetUiNormalConfig(n)
              .SortIndex
          : -1,
        t.CommonPopBg,
        t.CommonPopBgKey,
        t.ScenePath,
        t.IsPermanent,
        f,
        t.ScenePointTag,
      )),
        UiConfig.Jcr.set(n, r);
    }
    return r;
  }
  static zcr(e) {
    return "GmView" === e || "LoginDebugView" === e;
  }
  static RewritePath(e, i) {
    var n;
    i &&
      i.GetExtraResourceId &&
      ((i = i.GetExtraResourceId()),
      StringUtils_1.StringUtils.IsBlank(i) ||
        ((n =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(i))
          ? ((e.Path = n.Path), (e.PcPath = n.PcPath))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              10,
              "[UiConfig.RewritePath] 找不到界面配置",
              ["name", e.Name],
              ["resourceId", i],
            )));
  }
}
((exports.UiConfig = UiConfig).Jcr = new Map()),
  (UiConfig.CanOpenWhileClearSceneViewNameSet = new Set(
    LoadingDefine_1.loadingViewList,
  ));
//# sourceMappingURL=UiConfig.js.map
