"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PublicUtil = exports.getConfigPath = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Json_1 = require("../../Core/Common/Json"),
  Log_1 = require("../../Core/Common/Log"),
  MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
  DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  IGlobal_1 = require("../../UniverseEditor/Interface/IGlobal"),
  GlobalData_1 = require("../GlobalData"),
  CdnServerDebugConfig_1 = require("../Module/Debug/CdnServerDebugConfig"),
  MultiTextCsvModule_1 = require("./MultiText/MultiTextCsvModule"),
  MultiTextDefine_1 = require("./MultiText/MultiTextDefine"),
  PACKAGENAME = "com.kurogame.aki.internal",
  LOGIN_NOTICE = "LoginNotice.json",
  SCROLLTEXT_NOTICE = "ScrollTextNotice.json";
function getConfigPath(t) {
  return "" + UE.KismetSystemLibrary.GetProjectDirectory() + t;
}
exports.getConfigPath = getConfigPath;
class PublicUtil {
  static IsInIpWhiteList(t) {
    if (void 0 === t) return !0;
    if (0 !== t.length) {
      var e = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString)),
        i =
          (UE.KuroStaticLibrary.GetLocalHostAddresses(e),
          (0, puerts_1.$unref)(e)),
        r = new Array();
      for (let t = 0; t < i.Num(); t++) {
        var o = i.Get(t);
        r.push(o);
      }
      for (const a of t) for (const l of r) if (l === a) return !0;
    }
    return !1;
  }
  static GetIfGlobalSdk() {
    return (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
    );
  }
  static GetGameId() {
    return PublicUtil.GetIfGlobalSdk() ? "G153" : "G152";
  }
  static GetLoginNoticeUrl2(t, e, i) {
    var r = PublicUtil.GetNoticeBaseUrl();
    if (r) return r + `/gm/loginNotice/${t}/${i}/${e}.json`;
  }
  static GetMarqueeUrl2(t, e) {
    var i = PublicUtil.GetNoticeBaseUrl();
    if (i) return i + `/gm/scrollTextNotice/${t}/${e}/notice.json`;
  }
  static GetLoginNoticeUrl() {
    var t = PublicUtil.GetNoticeBaseUrl();
    if (t)
      return (
        `${t}/${PACKAGENAME}/${UE.KuroLauncherLibrary.GetAppVersion()}/` +
        LOGIN_NOTICE
      );
  }
  static GetMarqueeUrl() {
    var t = PublicUtil.GetNoticeBaseUrl();
    if (t)
      return (
        `${t}/${PACKAGENAME}/${UE.KuroLauncherLibrary.GetAppVersion()}/` +
        SCROLLTEXT_NOTICE
      );
  }
  static GetNoticeBaseUrl() {
    var t = BaseConfigController_1.BaseConfigController.GetNoticeUrl();
    if (t)
      return CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetNoticeServerPrefixAddress(
        t,
      );
    GlobalData_1.GlobalData.IsPlayInEditor ||
      ((t = UE.KuroLauncherLibrary.GetAppReleaseType()),
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("PublicUtil", 9, "找不到cdn", ["Apptype", t]));
  }
  static GetGARUrl(t, e, i, r, o) {
    var a = BaseConfigController_1.BaseConfigController.GetGARUrl();
    if (a)
      return (
        a +
        `/UserRegion/GetUserInfo?loginType=${t}&userId=${e}&token=${r}&area=${o}&userName=` +
        i
      );
  }
  static GetLocalHost() {
    var t = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString)),
      e =
        (UE.KuroStaticLibrary.GetLocalHostAddresses(t),
        (0, puerts_1.$unref)(t));
    let i = "127.0.0.1";
    0 < e.Num() && (i = e.Get(0));
    for (let t = 0; t < e.Num(); t++) {
      var r = e.Get(t);
      r.startsWith("10.0.") && (i = r);
    }
    return i;
  }
  static GetConfigTextByKey(t) {
    return PublicUtil.UseDbConfig()
      ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t)
      : (this.xde.GetLocalText(t) ?? t);
  }
  static GetConfigTextByTable(t, e) {
    t = this.GetConfigIdByTable(t, e);
    return PublicUtil.UseDbConfig()
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)
      : this.xde.GetLocalText(t);
  }
  static GetConfigIdByTable(t, e) {
    t = MultiTextDefine_1.tableTextMap[t];
    return new StringBuilder_1.StringBuilder(t[0], e, t[1]).ToString();
  }
  static GetFlowConfigLocalText(t) {
    return PublicUtil.UseDbConfig()
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)
      : this.xde.GetLocalText(t);
  }
  static RegisterEditorLocalConfig() {
    PublicUtil.UseDbConfig() ||
      this.xde.RegisterTextLocalConfig(
        getConfigPath(IGlobal_1.globalConfig.TidTextTempPath),
      );
  }
  static RegisterFlowTextLocalConfig(t) {
    var e, i;
    PublicUtil.UseDbConfig() ||
      ((e =
        "" +
        UE.KismetSystemLibrary.GetProjectDirectory() +
        MultiTextDefine_1.MULTI_TEXT_LANG_PLOT_PATH),
      (t = `文本库_${t}.csv`),
      0 === (i = UE.KuroStaticLibrary.GetFilesRecursive(e, t, !0, !1)).Num()
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "MultiTextCsvModule",
            11,
            "无法找到对应文本库表格",
            ["文本库表格名字", t],
            ["目录路径", e],
          )
        : this.xde.RegisterTextLocalConfig(i.Get(0), !0));
  }
  static GetFlowListInfo(t) {
    if (!PublicUtil.UseDbConfig()) {
      var e,
        i = getConfigPath(IGlobal_1.globalConfig.FlowListDir),
        i = UE.KuroStaticLibrary.GetFilesRecursive(i, t + ".json", !0, !1);
      if (0 !== i.Num())
        return (
          (i = i.Get(0)),
          (e = (0, puerts_1.$ref)(void 0)),
          UE.KuroStaticLibrary.LoadFileToString(e, i),
          (i = (0, puerts_1.$unref)(e)),
          (e = JSON.parse(i)),
          Object.assign({}, e)
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Level",
          19,
          "[PlotController.StartPlotNetwork] 无法找到对应剧情资源",
          ["flowListName", t],
        );
    }
  }
  static GetParkourConfig(t) {
    return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(11, t);
  }
  static IsUseTempData() {
    return (
      !(
        !GlobalData_1.GlobalData.IsPlayInEditor &&
        !GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
      ) && (void 0 === this.wde && this.Bde(), this.wde ?? !1)
    );
  }
  static IsStartEditorDebugServer() {
    return (
      !(
        !GlobalData_1.GlobalData.IsPlayInEditor &&
        !GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
      ) && (void 0 === this.bde && this.Bde(), this.bde)
    );
  }
  static GetGameDebugPort() {
    if (
      GlobalData_1.GlobalData.IsPlayInEditor ||
      GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
    )
      return void 0 === this.qde && this.Bde(), this.qde;
  }
  static GetEditorDebugPort() {
    if (
      GlobalData_1.GlobalData.IsPlayInEditor ||
      GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
    )
      return void 0 === this.Gde && this.Bde(), this.Gde;
  }
  static Bde() {
    var t,
      e,
      i =
        UE.BlueprintPathsLibrary.ProjectDir() +
        "../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json";
    !UE.BlueprintPathsLibrary.FileExists(i) ||
    ((t = ((e = ""), puerts_1.$ref)("")),
    !UE.KuroStaticLibrary.LoadFileToString(t, i)) ||
    ((e = (0, puerts_1.$unref)(t)), void 0 === (i = Json_1.Json.Parse(e)))
      ? (this.wde = !1)
      : ((this.wde = i.UseTemp),
        (this.bde = i.IsOpenDebugService),
        (this.qde = i.GameClientGmPort),
        (this.Gde = i.EditorPort));
  }
  static TestLoadEditorConfigData() {
    var t =
      UE.BlueprintPathsLibrary.ProjectConfigDir() +
      "../Saved/Editor/JsonConfig/EditorConfig.json";
    if (UE.BlueprintPathsLibrary.FileExists(t)) {
      var e = (0, puerts_1.$ref)("");
      if (UE.KuroStaticLibrary.LoadFileToString(e, t)) {
        (e = (0, puerts_1.$unref)(e)), (e = Json_1.Json.Parse(e));
        if (void 0 !== e) return e;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Temp", 43, "读取本地文件配置失败, 反序列化失败");
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Temp", 43, "读取本地文件配置失败", ["path", t]);
    }
  }
  static TestSaveEditorConfigData(t = void 0) {
    var e,
      i = void 0;
    if (t)
      return (
        (i = t),
        void 0 === (t = Json_1.Json.Stringify(i))
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Temp", 43, "IEditorConfig反序列化失败")
          : ((e =
              UE.BlueprintPathsLibrary.ProjectConfigDir() +
              "../Saved/Editor/JsonConfig/EditorConfig.json"),
            UE.KuroStaticLibrary.SaveStringToFile(t, e)),
        i
      );
  }
  static MapToObj(t) {
    var e,
      i,
      r = {};
    for ([e, i] of t) r[e] = i;
    return r;
  }
  static MapToObjEx(t) {
    var e,
      i,
      r = {};
    for ([e, i] of t) r[e] = this.MapToObj(i);
    return r;
  }
  static ObjToMap(t) {
    var e = new Map();
    for (const r in t) {
      var i = Number(r);
      isNaN(i) ? e.set(r, t[r]) : e.set(i, t[r]);
    }
    return e;
  }
  static ObjToMapEx(t) {
    var e = new Map();
    for (const i in t) e.set(i, this.ObjToMap(t[i]));
    return e;
  }
  static UseDbConfig() {
    return !PublicUtil.IsUseTempData();
  }
  static SetIsSilentLogin(t) {
    this.Nde = t;
  }
  static GetIsSilentLogin() {
    return this.Nde;
  }
  static CreateTransformFromConfig(t, e, i) {
    var r = Transform_1.Transform.Create(),
      t = Vector_1.Vector.Create(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0),
      e = Rotator_1.Rotator.Create(e?.Y ?? 0, e?.Z ?? 0, e?.X ?? 0),
      i = Vector_1.Vector.Create(i?.X ?? 0, i?.Y ?? 0, i?.Z ?? 0);
    return r.SetLocation(t), r.SetRotation(e.Quaternion()), r.SetScale3D(i), r;
  }
}
((exports.PublicUtil = PublicUtil).wde = void 0),
  (PublicUtil.bde = void 0),
  (PublicUtil.Gde = void 0),
  (PublicUtil.qde = void 0),
  (PublicUtil.xde = new MultiTextCsvModule_1.MultiTextCsvModule()),
  (PublicUtil.Nde = !1);
//# sourceMappingURL=PublicUtil.js.map
