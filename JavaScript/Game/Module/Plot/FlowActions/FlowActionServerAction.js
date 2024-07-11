"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionServerAction = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  FlowNetworks_1 = require("../Flow/FlowNetworks"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionServerAction extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments), (this.X$i = !1);
  }
  Execute(t, o, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Plot",
        18,
        "===>服务器剧情行为开始",
        ["", t.Name],
        ["actionId", t.ActionId],
      ),
      (this.Context = o),
      (this.ActionInfo = t),
      (this.X$i = e),
      this.Context.IsServerNotify
        ? (o.IsBackground ? this.OnBackgroundExecute() : this.OnExecute(),
          this.X$i && this.FinishExecute(!0))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "非服务器触发的剧情无法使用服务器行为！",
            ),
          this.FinishExecute(!0));
  }
  OnExecute() {
    this.RequestServerAction(!this.X$i);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  RequestServerAction(t = !1) {
    FlowNetworks_1.FlowNetworks.RequestAction(
      this.Context.FlowIncId,
      this.ActionInfo.ActionId,
      () => {
        t && this.FinishExecute(!0);
      },
    );
  }
}
exports.FlowActionServerAction = FlowActionServerAction;
//# sourceMappingURL=FlowActionServerAction.js.map
