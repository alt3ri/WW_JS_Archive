"use strict";
let ECommonNodeState, EChildQuestNodeState;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EChildQuestNodeState = exports.ECommonNodeState = void 0),
  (function (e) {
    (e[(e.Inactive = 0)] = "Inactive"),
      (e[(e.PreActivated = 1)] = "PreActivated"),
      (e[(e.Activated = 2)] = "Activated"),
      (e[(e.Running = 3)] = "Running"),
      (e[(e.Completed = 4)] = "Completed"),
      (e[(e.Skipped = 5)] = "Skipped"),
      (e[(e.Error = 6)] = "Error");
  })(
    (ECommonNodeState =
      exports.ECommonNodeState || (exports.ECommonNodeState = {})),
  ),
  (function (e) {
    (e[(e.Inactive = 0)] = "Inactive"),
      (e[(e.EnteringNode = 1)] = "EnteringNode"),
      (e[(e.StartingAction = 2)] = "StartingAction"),
      (e[(e.Running = 3)] = "Running"),
      (e[(e.CompletedButActionFailed = 4)] = "CompletedButActionFailed"),
      (e[(e.Completed = 5)] = "Completed"),
      (e[(e.Failed = 6)] = "Failed");
  })(
    (EChildQuestNodeState =
      exports.EChildQuestNodeState || (exports.EChildQuestNodeState = {})),
  );
// # sourceMappingURL=IGameStatusDefine.js.map
