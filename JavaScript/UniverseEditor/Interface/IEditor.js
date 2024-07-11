"use strict";
var EActorDeleteMode,
  EMaximumDisplayCountInSelector,
  ERecentSelectRecordMode,
  EEditorLoginAccountType,
  EEditorLaunchMode,
  ERangeTipShape;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ERangeTipShape =
    exports.EEditorLaunchMode =
    exports.EEditorLoginAccountType =
    exports.ERecentSelectRecordMode =
    exports.defaultEditorArgConfig =
    exports.EMaximumDisplayCountInSelector =
    exports.EActorDeleteMode =
    exports.EDITOR_SAVE_CONFIG_PATH =
      void 0),
  (exports.EDITOR_SAVE_CONFIG_PATH =
    "Saved/Editor/JsonConfig/EditorSaveConfig.json"),
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
    (e.PIE = "PIE"), (e.Package = "Package");
  })(
    (EEditorLaunchMode =
      exports.EEditorLaunchMode || (exports.EEditorLaunchMode = {})),
  ),
  (function (e) {
    (e[(e.Box = 0)] = "Box"),
      (e[(e.Sphere = 1)] = "Sphere"),
      (e[(e.Cylinder = 2)] = "Cylinder"),
      (e[(e.SignagePoint = 3)] = "SignagePoint");
  })(
    (ERangeTipShape = exports.ERangeTipShape || (exports.ERangeTipShape = {})),
  );
//# sourceMappingURL=IEditor.js.map
