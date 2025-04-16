"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventExitDungeon = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitDungeon extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.EDe = () => {
        this.FinishExecute(!0);
      });
  }
  ExecuteInGm(e, r, t) {
    this.FinishExecute(!0);
  }
  ExecuteNew(e, r) {
    ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()
      ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByText(
          "ExitDungeon被GM屏蔽，跳过执行",
        ),
        this.FinishExecute(!0))
      : e.IsNeedSecondaryConfirmation
        ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.OnClickInstanceDungeonExitButton(
            this.EDe,
            this.EDe,
            !1,
          )
        : this.FinishExecute(!0);
  }
}
exports.LevelEventExitDungeon = LevelEventExitDungeon;
//# sourceMappingURL=LevelEventExitDungeon.js.map
