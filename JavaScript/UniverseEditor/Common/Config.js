"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Config =
    exports.checkVersionIsLatest =
    exports.EDITOR_VERSION =
      void 0);
const IEditor_1 = require("../Interface/IEditor");
const Init_1 = require("../Interface/Init");
const BranchDefine_1 = require("./BranchDefine");
const EventSystem_1 = require("./Misc/EventSystem");
const File_1 = require("./Misc/File");
const JsonConfig_1 = require("./Misc/JsonConfig");
const Log_1 = require("./Misc/Log");
const Util_1 = require("./Misc/Util");
function checkVersionIsLatest(e, t = exports.EDITOR_VERSION) {
  if (e) {
    const r = e.split(".");
    const i = t.split(".");
    for (let e = 0; e < r.length; e++) {
      const o = parseInt(r[e]);
      if (parseInt(i[e]) < o) return !0;
    }
  }
  return !1;
}
(exports.EDITOR_VERSION = "2024.01.18"),
  (exports.checkVersionIsLatest = checkVersionIsLatest);
const GAME_CLIENT_GM_PORT_OFFSET = 11;
const config = {
  IsSaveWhileExitPie: !1,
  IsTestMode: !1,
  MaxErrorReportCount: 4,
  IsNewLevelLoadMode: !0,
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
  IsEnableAutoJump: !1,
  IsShowFilterPreset: !0,
  IsShowFormalText: !1,
  TidTextExportType: "Formal",
  PlannedBranch: "development",
  AutoCaptureTree: [],
  IsShowFullDateCheckError: !1,
  IsEnableBtStateConflictCheck: !1,
  IsEnableSetPlotModeCheck: !0,
  IsEnableOnlineChainCheck: !1,
};
let clusterRecords = void 0;
function getClusterTimestamp() {
  let e;
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
class Config extends JsonConfig_1.JsonConfig {
  constructor() {
    if (
      (super("Config", Config.t()),
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
    let t;
    let r;
    const i = (0, Util_1.getEditorCommandArgs)();
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
    const e = (0, File_1.getProjectPath)(
      (0, Init_1.isUe5)()
        ? "Content/Editor/Config/EditorConnectionConfig.json"
        : "Content/Aki/UniverseEditor/Config/EditorConnectionConfig.json",
    );
    for (const t of (0, Util_1.readJsonObj)(e).ConnectionGroups)
      if (!(0, Util_1.isPortInUse)(t.EditorPort)) return t;
  }
  static sOn(e) {
    e.PlannedBranch = (0, BranchDefine_1.getDefaultPlannedBranch)();
  }
  static t() {
    const e = (0, Util_1.deepCopyData)(config);
    return Config.sOn(e), e;
  }
  get NetworkAddress() {
    return this.p || (this.p = (0, Util_1.getNetWorkAddress)()), this.p;
  }
  get MacAddress() {
    return (
      this.VirtualMacAddress ||
      (this.u || (this.u = (0, Util_1.getMacAddress)()), this.u)
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
    return (0, Util_1.isRuntimePlatform)()
      ? Config.GameCommandRuntimePort
      : this.Get("IsSimulateGameCommandService")
        ? Config.GameCommandServiceSimulatePort
        : (0, Util_1.isInPie)() && Config.IsPkgRunning
          ? this.Get("EditorLaunchMode") === IEditor_1.EEditorLaunchMode.PIE
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
}
((exports.Config = Config).FlowListPrefix = (0, Init_1.isUe5)()
  ? "流程_"
  : "剧情_"),
  (Config.IsStartWithCliServer = !1),
  (Config.IsPkgRunning = !1),
  (Config.EditorCommandServiceSimulatePort = (0, Init_1.isUe5)() ? 8997 : 8998),
  (Config.GameCommandServiceSimulatePort = (0, Init_1.isUe5)() ? 8999 : 9e3),
  (Config.GameCommandServicePort = 9001),
  (Config.GameCommandRuntimePort = 9021),
  (Config.DefaultServerPort = 9500),
  (Config.PackageServerPort = 9600);
// # sourceMappingURL=Config.js.map
