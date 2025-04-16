"use strict";
var EEntityActorLoadMode,
  EActorDeleteMode,
  EActionDisabledType,
  ETreeNodeDisabledType,
  EMaximumDisplayCountInSelector,
  ERecentSelectRecordMode,
  EEditorLoginAccountType,
  EEditorLaunchMode,
  EPackageServerType,
  EEditorSearchMode,
  ESyncBlockContext,
  EAreaConflictSelector,
  EEntityAssignPriority;
function getEntityActorLoadModeName(e) {
  return exports.actorLoadOptions[e];
}
function createDefaultDeployConfig() {
  return {
    IsShowDeploySettings: !1,
    DefaultEntityDeployFolderByLevelId: {},
    IsUseEntityDeployFolder: !0,
    DefaultActorDeployFolderByLevelId: {},
    IsUseActorDeployFolder: !0,
    DefaultEntityPackIdByLevelId: {},
    PostProcessComponents: [],
  };
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EEntityAssignPriority =
    exports.EAreaConflictSelector =
    exports.ESyncBlockContext =
    exports.EEditorSearchMode =
    exports.EPackageServerType =
    exports.EEditorLaunchMode =
    exports.EEditorLoginAccountType =
    exports.ERecentSelectRecordMode =
    exports.defaultEditorArgConfig =
    exports.EMaximumDisplayCountInSelector =
    exports.ETreeNodeDisabledType =
    exports.EActionDisabledType =
    exports.createDefaultDeployConfig =
    exports.EActorDeleteMode =
    exports.getEntityActorLoadModeName =
    exports.actorLoadOptions =
    exports.EEntityActorLoadMode =
    exports.multiplyValue =
    exports.EDITOR_SAVE_CONFIG_PATH =
    exports.MAX_MAP_SIZE =
    exports.GRID_SIZE =
    exports.WORLD_PARTITION_MAP_SIZE =
    exports.WORLD_PARTITION_BOUNDS_SIZE =
      void 0),
  (exports.WORLD_PARTITION_BOUNDS_SIZE = 50400),
  (exports.WORLD_PARTITION_MAP_SIZE = 48 * exports.WORLD_PARTITION_BOUNDS_SIZE),
  (exports.GRID_SIZE = 85e3),
  (exports.MAX_MAP_SIZE =
    Math.ceil(exports.WORLD_PARTITION_MAP_SIZE / exports.GRID_SIZE) *
    exports.GRID_SIZE),
  (exports.EDITOR_SAVE_CONFIG_PATH =
    "Saved/Editor/JsonConfig/EditorSaveConfig.json"),
  (exports.multiplyValue = null),
  (function (e) {
    (e.Self = "Self"),
      (e.ParentChild = "ParentChild"),
      (e.SizeCell = "SizeCell"),
      (e.WpCell = "WpCell");
  })(
    (EEntityActorLoadMode =
      exports.EEntityActorLoadMode || (exports.EEntityActorLoadMode = {})),
  ),
  (exports.actorLoadOptions = {
    [EEntityActorLoadMode.Self]: "实体Actor",
    [EEntityActorLoadMode.ParentChild]: "父子链相关实体",
    [EEntityActorLoadMode.SizeCell]: "实体和周边地形",
    [EEntityActorLoadMode.WpCell]: "实体和所属地块",
  }),
  (exports.getEntityActorLoadModeName = getEntityActorLoadModeName),
  (function (e) {
    (e.AskUser = "AskUser"),
      (e.DontAskUserAndDeleteChild = "DontAskUserAndDeleteChild"),
      (e.DontAskUserAndNotDeleteChild = "DontAskUserAndNotDeleteChild");
  })(
    (EActorDeleteMode =
      exports.EActorDeleteMode || (exports.EActorDeleteMode = {})),
  ),
  (exports.createDefaultDeployConfig = createDefaultDeployConfig),
  (function (e) {
    (e.LocalDisabled = "LocalDisabled"),
      (e.FormalDisabled = "FormalDisabled"),
      (e.HideDisabled = "HideDisabled");
  })(
    (EActionDisabledType =
      exports.EActionDisabledType || (exports.EActionDisabledType = {})),
  ),
  (function (e) {
    (e.LocalDisabled = "LocalDisabled"), (e.HideDisabled = "HideDisabled");
  })(
    (ETreeNodeDisabledType =
      exports.ETreeNodeDisabledType || (exports.ETreeNodeDisabledType = {})),
  ),
  (function (e) {
    (e[(e.Moderate = 8)] = "Moderate"),
      (e[(e.Abundant = 10)] = "Abundant"),
      (e[(e.Plentiful = 12)] = "Plentiful");
  })(
    (EMaximumDisplayCountInSelector =
      exports.EMaximumDisplayCountInSelector ||
      (exports.EMaximumDisplayCountInSelector = {})),
  ),
  (exports.defaultEditorArgConfig = {
    ExecCmds: "",
    LocalGameServerNode: "",
    TsEditorServicePort: "",
    LocalGameServerStartPort: "",
    IgnoreStartupCheck: "false",
    DisablePopEditorSaviorOnError: "false",
    DisableAutoStartServer: "false",
    UseTemp: "false",
  }),
  (function (e) {
    (e.SortByCount = "SortByCount"), (e.SortByTime = "SortByTime");
  })(
    (ERecentSelectRecordMode =
      exports.ERecentSelectRecordMode ||
      (exports.ERecentSelectRecordMode = {})),
  ),
  (function (e) {
    (e.Custom = "Custom"), (e.Archive = "Archive");
  })(
    (EEditorLoginAccountType =
      exports.EEditorLoginAccountType ||
      (exports.EEditorLoginAccountType = {})),
  ),
  (function (e) {
    (e.PIE = "PIE"), (e.Attach = "Attach"), (e.Package = "Package");
  })(
    (EEditorLaunchMode =
      exports.EEditorLaunchMode || (exports.EEditorLaunchMode = {})),
  ),
  (function (e) {
    (e.Package = "Package"), (e.Local = "Local");
  })(
    (EPackageServerType =
      exports.EPackageServerType || (exports.EPackageServerType = {})),
  ),
  (function (e) {
    (e.Keyword = "Keyword"),
      (e.TidText = "TidText"),
      (e.EntityId = "EntityId"),
      (e.Action = "Action"),
      (e.VarRef = "VarRef");
  })(
    (EEditorSearchMode =
      exports.EEditorSearchMode || (exports.EEditorSearchMode = {})),
  ),
  (function (e) {
    (e.Quest = "Quest"), (e.LevelPlay = "LevelPlay");
  })(
    (ESyncBlockContext =
      exports.ESyncBlockContext || (exports.ESyncBlockContext = {})),
  ),
  (function (e) {
    (e.Quest = "任务"), (e.LevelPlay = "玩法"), (e.Shape = "自定义形状");
  })(
    (EAreaConflictSelector =
      exports.EAreaConflictSelector || (exports.EAreaConflictSelector = {})),
  ),
  (function (e) {
    (e.EntityActor = "Actor 优先"), (e.EntityEditor = "实体编辑器优先");
  })(
    (EEntityAssignPriority =
      exports.EEntityAssignPriority || (exports.EEntityAssignPriority = {})),
  );
//# sourceMappingURL=IEditor.js.map
