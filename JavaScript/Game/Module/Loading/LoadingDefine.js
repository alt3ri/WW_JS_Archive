"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.dungeonToLoadingViewMap = exports.loadingViewList = void 0),
  (exports.loadingViewList = [
    "LoadingView",
    "RacingBetsLoadingView",
    "DangoAbyssWorldLoadingView",
    "RoleLoadingView",
  ]),
  (exports.dungeonToLoadingViewMap = new Map([
    [31, { View: "RacingBetsLoadingView" }],
    [35, { View: "RacingBetsLoadingView" }],
    [32, { View: "DangoAbyssWorldLoadingView" }],
    [12, { WorldSubType: 1, View: "DangoAbyssWorldLoadingView" }],
  ]));
//# sourceMappingURL=LoadingDefine.js.map
