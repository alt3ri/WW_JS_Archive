"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Config =
    exports.serverInfoList =
    exports.checkVersionIsLatest =
    exports.EDITOR_VERSION =
      void 0);
const IEditor_1 = require("../Interface/IEditor"),
  Init_1 = require("../Interface/Init"),
  BranchDefine_1 = require("./BranchDefine"),
  EventSystem_1 = require("./Misc/EventSystem"),
  File_1 = require("./Misc/File"),
  JsonConfig_1 = require("./Misc/JsonConfig"),
  Log_1 = require("./Misc/Log"),
  Util_1 = require("./Misc/Util");
function checkVersionIsLatest(e, t = exports.EDITOR_VERSION) {
  if (e) {
    var r = e.split("."),
      i = t.split(".");
    for (let e = 0; e < r.length; e++) {
      var n = parseInt(r[e]);
      if (parseInt(i[e]) < n) return !0;
    }
  }
  return !1;
}
(exports.EDITOR_VERSION = "2024.01.18"),
  (exports.checkVersionIsLatest = checkVersionIsLatest);
const GAME_CLIENT_GM_PORT_OFFSET = 11,
  configRecords = {
    IsSaveWhileExitPie: !1,
    IsTestMode: !1,
    MaxErrorReportCount: 4,
    IsNewJsonNameMode: !0,
    IsFullDataMode: !1,
    ReportErrorToSentry: !0,
    IsLockedComponentEditable: !1,
    IsEntityExportIncludeTemplate: !1,
    DelDelegateEntityUid: [],
    IsDisableAutoMoveAddedActorToSelectedFolder: !1,
    IsEnableRandomlyRotateNewEntityZaxis: !1,
    LastWorkSpaceCheckTimestamp: 0,
    IsLoadingArchive: !1,
    FixLevelPlayAoiProxy: [],
    IsSimulateGameCommandService: !1,
    EditorLaunchMode: IEditor_1.EEditorLaunchMode.PIE,
    PackageServerType: IEditor_1.EPackageServerType.Package,
    IsEnableAutoJump: !1,
    IsShowFilterPreset: !0,
    IsShowFormalText: !1,
    IsShowActionNote: !0,
    TidTextExportType: "Desc",
    PlannedBranch: "development",
    AutoCaptureTree: [],
    IsShowFullDateCheckError: !1,
    IsEnableBtStateConflictCheck: !1,
    IsEnableSetPlotModeCheck: !0,
    IsEnableOnlineChainCheck: !1,
    IsEnableRepetitiveOccupyCheck: !1,
    IsEnableFunctionalEntitiesOccupyCheck: !1,
    IsEnableChangeEntityStateCheck: !1,
    IsEnableSetTimeLockStateCheck: !1,
    IsEnableEntityExternalReferenceCheck: !1,
    IsEnableSameOccupationInQuestCheck: !1,
    IsEnableDifferentOccupationUnderParallelSelectNodeCheck: !1,
    IsEnableOccupationInDungeonCheck: !1,
    IsEnableWutheriumerInSleepCheck: !1,
    IsEnableLevelAiReachAreaCheck: !1,
    IsEnablePlotPosCheck: !1,
  };
let clusterRecords = void 0;
function getClusterTimestamp() {
  var e;
  return (
    clusterRecords ||
      ((e = (0, File_1.getSavePath)("Editor/ClusterRecord.json")),
      (clusterRecords = (0, Util_1.readJsonObj)(e, {
        Timestamp: new Date().getTime(),
      })),
      (0, File_1.existFile)(e)) ||
      (0, Util_1.writeJson)(clusterRecords, e),
    clusterRecords.Timestamp
  );
}
exports.serverInfoList = [
  { Ip: "10.0.7.6", Name: "final1.1周包服" },
  { Ip: "10.0.7.14", Name: "final1.2周包服" },
  { Ip: "10.0.7.100", Name: "final1.3周包服" },
  { Ip: "10.0.7.80", Name: "branch_1.1公共服" },
  { Ip: "10.0.7.77", Name: "branch_1.2公共服" },
  { Ip: "10.0.7.26", Name: "branch_1.3公共服" },
  { Ip: "127.0.0.1", Name: "本地服" },
  { Ip: "10.0.61.42", Name: "雷涛", IsTest: !0 },
  { Ip: "10.0.70.231", Name: "黄俊集", IsTest: !0 },
];
const eventDefine = { OnConfigChanged: (e, t, r) => {} };
class Config extends JsonConfig_1.JsonConfig {
  constructor() {
    if (
      (super("Config", Config.t()),
      (this.Dispatcher = new EventSystem_1.EventDispatcher()),
      (this.VirtualMacAddress = ""),
      (this.o = this.i()),
      this.o || (this.o = this.l()),
      !this.o)
    )
      throw (
        (EventSystem_1.editorEventDispatcher.Dispatch("EditorPortAllInUse"),
        new Error("所有EditorCommandService端口已被使用"))
      );
  }
  static get Instance() {
    return void 0 === this.m && (this.m = new Config()), this.m;
  }
  static get PackageServerPort() {
    return Config.Instance.Get("PackageServerType") ===
      IEditor_1.EPackageServerType.Package
      ? Config.DefaultPackageServerPort
      : Config.Instance.PieServerPort;
  }
  static get PieServerClusterName() {
    return `PIE_${(0, Util_1.getWorkspaceBranch)()}_` + getClusterTimestamp();
  }
  static get PkgServerClusterName() {
    return (
      `UniverseLauncher_${(0, Util_1.getWorkspaceBranch)()}_` +
      getClusterTimestamp()
    );
  }
  static get PkgCommandServicePort() {
    return Config.Instance.GameClientGmPort + 20;
  }
  static GetCurrentLevelSavePath(e) {
    return (0, File_1.getSavePath)("Map") + `/${e}.json`;
  }
  i() {
    var t,
      r,
      i = (0, Util_1.getEditorCommandArgs)();
    if (i) {
      let e = void 0;
      return (
        void 0 !== i.TsEditorServicePort &&
          ((t = parseInt(i.TsEditorServicePort)),
          (0, Util_1.isRuntimePlatform)() || !(0, Util_1.isPortInUse)(t)
            ? ((r = t + 10),
              (0, Log_1.log)("通过命令行设置编辑器端口为: " + t),
              (0, Log_1.log)("通过命令行设置P4代理端口为: " + r),
              (e = {
                EditorPort: t,
                GameClientGmPort: t + GAME_CLIENT_GM_PORT_OFFSET,
                P4Proxy: { Address: "localhost", Port: t + 10 },
                GameServerConfig: {},
              }))
            : (0, Log_1.error)(`命令行设置的编辑器端口: ${t} 已被占用`)),
        e &&
          i.LocalGameServerStartPort &&
          i.LocalGameServerNode &&
          ((r = parseInt(i.LocalGameServerStartPort)),
          (e.GameServerConfig = {
            LocalGameServerNode: i.LocalGameServerNode,
            LocalGameServerApiPort: r,
            LocalGameServerLoginPort: r + 1,
          }),
          (Config.IsStartWithCliServer = !0),
          (0, Log_1.log)(
            `通过命令行设置GameServer启动配置:
` + (0, Util_1.stringify)(e),
          )),
        e
      );
    }
  }
  l() {
    var e = (0, File_1.getProjectPath)(
      (0, Init_1.isUe5)()
        ? "Content/Editor/Config/EditorConnectionConfig.json"
        : "Content/Aki/UniverseEditor/Config/EditorConnectionConfig.json",
    );
    for (const t of (0, Util_1.readJsonObj)(e).ConnectionGroups)
      if (!(0, Util_1.isPortInUse)(t.EditorPort)) return t;
  }
  static wkn(e) {
    e.PlannedBranch = (0, BranchDefine_1.getDefaultPlannedBranch)();
  }
  static t() {
    var e = (0, Util_1.deepCopyData)(configRecords);
    return Config.wkn(e), e;
  }
  get NetworkAddress() {
    return (
      void 0 === this.p && (this.p = (0, Util_1.getNetWorkAddress)() ?? ""),
      this.p
    );
  }
  get NetworkAddressMd5() {
    return (
      void 0 === this.W1a &&
        (this.W1a = (0, Util_1.getMd5)(this.NetworkAddress)),
      this.W1a
    );
  }
  get MacAddress() {
    return (
      this.VirtualMacAddress ||
      (void 0 === this.Q1a && (this.Q1a = (0, Util_1.getMacAddress)()),
      this.Q1a)
    );
  }
  get MacAddressMd5() {
    return (
      void 0 === this.K1a && (this.K1a = (0, Util_1.getMd5)(this.MacAddress)),
      this.K1a
    );
  }
  get EditorCommandPort() {
    return this.o.EditorPort;
  }
  get GameClientGmPort() {
    return this.o.GameClientGmPort;
  }
  get P4Proxy() {
    return this.o.P4Proxy;
  }
  get GameServerConfig() {
    return this.o.GameServerConfig;
  }
  get GameCommandServicePort() {
    var e = this.Get("EditorLaunchMode");
    return e === IEditor_1.EEditorLaunchMode.Attach
      ? Config.DefaultServerPort
      : (0, Util_1.isRuntimePlatform)()
        ? Config.GameCommandRuntimePort
        : this.Get("IsSimulateGameCommandService")
          ? Config.GameCommandServiceSimulatePort
          : (0, Util_1.isInPie)() && Config.IsPkgRunning
            ? e === IEditor_1.EEditorLaunchMode.PIE
              ? this.GameClientGmPort
              : Config.PkgCommandServicePort
            : (0, Util_1.isInPie)()
              ? this.GameClientGmPort
              : Config.PkgCommandServicePort;
  }
  get PieServerPort() {
    return (
      this.GameServerConfig?.LocalGameServerApiPort ?? Config.DefaultServerPort
    );
  }
  get ServerPort() {
    return !(0, Util_1.isInPie)() && Config.IsPkgRunning
      ? Config.PackageServerPort
      : this.PieServerPort;
  }
  get LocalGameLoginPort() {
    var e = Config.Instance.GameServerConfig;
    return void 0 !== e?.LocalGameServerLoginPort
      ? e.LocalGameServerLoginPort
      : 5500;
  }
  get PlannedBranch() {
    var e;
    return (!Config.IsStartWithCliServer && !(0, Util_1.isNodeJsPlatform)()) ||
      (0, BranchDefine_1.isInDevelopmentBranch)()
      ? ((e = this.Get("PlannedBranch")),
        (0, BranchDefine_1.isPlannedBranch)(e) ||
          this.Set(
            "PlannedBranch",
            (0, BranchDefine_1.getDefaultPlannedBranch)(),
          ),
        this.Get("PlannedBranch"))
      : "development";
  }
  Set(e, t) {
    var r = (0, Util_1.deepCopyData)(this.Get(e));
    super.Set(e, t), this.Dispatcher.Dispatch("OnConfigChanged", e, r, t);
  }
}
((exports.Config = Config).FlowListPrefix = (0, Init_1.isUe5)()
  ? "流程_"
  : "剧情_"),
  (Config.IsStartWithCliServer = !1),
  (Config.IsPkgRunning = !1),
  (Config.IsServerAttaching = !1),
  (Config.EditorCommandServiceSimulatePort = (0, Init_1.isUe5)() ? 8997 : 8998),
  (Config.GameCommandServiceSimulatePort = (0, Init_1.isUe5)() ? 8999 : 9e3),
  (Config.GameCommandServicePort = 9001),
  (Config.GameCommandRuntimePort = 9021),
  (Config.DefaultServerPort = 9500),
  (Config.DefaultPackageServerPort = 9600);
//# sourceMappingURL=Config.js.map
