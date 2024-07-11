"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyBattleMessageBox extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.BoardId = 0);
  }
  K2_Notify(e, t) {
    return (
      0 < this.BoardId &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 4, "触发战斗弹框", ["Id", this.BoardId]),
        ControllerHolder_1.ControllerHolder.SoundAreaPlayTipsController.OpenSoundAreaPlayTips(
          this.BoardId,
        )),
      !0
    );
  }
  GetNotifyName() {
    return "战斗弹窗";
  }
}
exports.default = TsAnimNotifyBattleMessageBox;
//# sourceMappingURL=TsAnimNotifyBattleMessageBox.js.map
