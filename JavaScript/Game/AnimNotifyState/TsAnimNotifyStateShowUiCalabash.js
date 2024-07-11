"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor"),
  UiCalabashAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiCalabashAnsContext");
class TsAnimNotifyStateShowUiCalabash extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Socket = void 0),
      (this.IsRotate = !1),
      (this.UiCalabashAnsContext = void 0);
  }
  K2_NotifyBegin(e, t, o) {
    var i;
    return (
      this.Socket
        ? (i = e.GetOwner()) instanceof TsUiSceneRoleActor_1.default &&
          ((this.UiCalabashAnsContext =
            new UiCalabashAnsContext_1.UiCalabashAnsContext(
              this.Socket,
              this.IsRotate,
            )),
          i.Model?.CheckGetComponent(6).AddAns(
            "UiCalabashAnsContext",
            this.UiCalabashAnsContext,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            44,
            "Ui界面葫芦显示动画通知中socket配置为空",
            ["meshComp", e],
            ["animation", t],
          ),
      !1
    );
  }
  K2_NotifyEnd(e, t) {
    if (this.Socket) {
      var o = e.GetOwner();
      if (o instanceof TsUiSceneRoleActor_1.default) {
        if (!this.UiCalabashAnsContext)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Calabash",
                44,
                "TsAnimNotifyStateShowUiCalabash未成对，UiCalabashAnsContext为空",
              ),
            !1
          );
        o.Model?.CheckGetComponent(6).ReduceAns(
          "UiCalabashAnsContext",
          this.UiCalabashAnsContext,
        );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          44,
          "Ui界面葫芦显示动画通知中socket配置为空",
          ["meshComp", e],
          ["animation", t],
        );
    return !1;
  }
  GetNotifyName() {
    return "Ui界面葫芦显示";
  }
}
exports.default = TsAnimNotifyStateShowUiCalabash;
//# sourceMappingURL=TsAnimNotifyStateShowUiCalabash.js.map
