"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPureUiKeyHandle = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  ModelManager_1 = require("../Manager/ModelManager"),
  UiLayer_1 = require("../Ui/UiLayer"),
  LEFT_BARACKET_NAME = new UE.FName("LeftBracket"),
  RIGHT_BARACKET_NAME = new UE.FName("RightBracket");
class TsPureUiKeyHandle {
  constructor() {
    (this.R$e = void 0),
      (this.gDa = () => {
        ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Input", 8, "按下 】 键显示所有界面"),
          UiLayer_1.UiLayer.ForceShowUi());
      }),
      (this.fDa = () => {
        ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Input", 8, "按下 【 键隐藏所有界面"),
          UiLayer_1.UiLayer.ForceHideUi());
      });
  }
  Initialize(e) {
    this.R$e = e;
  }
  Reset() {
    this.R$e = void 0;
  }
  BindKey() {
    cpp_1.FKuroInputInterface.RegisterKeyBinding(
      new UE.InputChord(new UE.Key(LEFT_BARACKET_NAME), !1, !1, !1, !1),
      1,
      this.R$e,
      this,
      this.gDa,
    ),
      cpp_1.FKuroInputInterface.RegisterKeyBinding(
        new UE.InputChord(new UE.Key(RIGHT_BARACKET_NAME), !1, !1, !1, !1),
        1,
        this.R$e,
        this,
        this.fDa,
      );
  }
}
exports.TsPureUiKeyHandle = TsPureUiKeyHandle;
//# sourceMappingURL=TsPureUiKeyHandle.js.map
