"use strict";
var EEntityActorLoadMode,
  EActorDeleteMode,
  EMaximumDisplayCountInSelector,
  ERecentSelectRecordMode,
  EEditorLoginAccountType,
  EEditorLaunchMode,
  EPackageServerType,
  EEditorSearchMode;
function getEntityActorLoadModeName(e) {
  return exports.actorLoadOptions[e];
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EEditorSearchMode =
    exports.EPackageServerType =
    exports.EEditorLaunchMode =
    exports.EEditorLoginAccountType =
    exports.ERecentSelectRecordMode =
    exports.defaultEditorArgConfig =
    exports.EMaximumDisplayCountInSelector =
    exports.EActorDeleteMode =
    exports.getEntityActorLoadModeName =
    exports.actorLoadOptions =
    exports.EEntityActorLoadMode =
    exports.multiplyValue =
    exports.EDITOR_SAVE_CONFIG_PATH =
      void 0),
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
  (function (e) {
    (e[(e.Moderate = 6)] = "Moderate"),
      (e[(e.Abundant = 8)] = "Abundant"),
      (e[(e.Plentiful = 10)] = "Plentiful");
  })(
    (EMaximumDisplayCountInSelector =
      exports.EMaximumDisplayCountInSelector ||
      (exports.EMaximumDisplayCountInSelector = {})),
  ),
  (exports.defaultEditorArgConfig = {
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
    (e.PIE = "PIE"), (e.Package = "Package"), (e.Attach = "Attach");
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
  );
//# sourceMappingURL=IEditor.js.map
