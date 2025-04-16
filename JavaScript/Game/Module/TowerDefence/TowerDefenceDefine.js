"use strict";
var ETabType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.tabText =
    exports.ETabType =
    exports.entranceSet =
    exports.INSTANCE_FAIL =
    exports.INSTANCE_SUCCESS =
    exports.NIL_PHANTOM_ID =
    exports.DEFAULT_ID =
      void 0),
  (exports.DEFAULT_ID = 0),
  (exports.NIL_PHANTOM_ID = -1),
  (exports.INSTANCE_SUCCESS = 3018),
  (exports.INSTANCE_FAIL = 3017),
  (exports.entranceSet = new Set([8170, 8180, 8610])),
  (function (e) {
    (e[(e.Single = 0)] = "Single"), (e[(e.Online = 1)] = "Online");
  })((ETabType = exports.ETabType || (exports.ETabType = {}))),
  (exports.tabText = {
    [ETabType.Single]: "OnlineGymnasium_SingleListName",
    [ETabType.Online]: "OnlineGymnasium_OnlineListName",
  });
//# sourceMappingURL=TowerDefenceDefine.js.map
