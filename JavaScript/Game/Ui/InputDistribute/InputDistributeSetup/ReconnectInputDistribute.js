"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReconnectInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../UiManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class ReconnectInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return (
      !!this.bmr() &&
      (this.qmr()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Input",
              8,
              "[InputDistribute]刷新重连状态输入Tag时，可点击鼠标",
            ),
          this.SetInputDistributeTags([
            InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
              .MouseInputTag,
            InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
              .NavigationTag,
          ]))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Input",
              8,
              "[InputDistribute]刷新重连状态输入Tag时，禁用所有操作",
            ),
          this.SetInputDistributeTag(
            InputDistributeDefine_1.inputDistributeTagDefine.BlockAllInputTag,
          )),
      !0)
    );
  }
  qmr() {
    return (
      void 0 !== UiManager_1.UiManager.GetViewByName("NetWorkConfirmBoxView")
    );
  }
  bmr() {
    return (
      ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus() === 1
    );
  }
}
exports.ReconnectInputDistribute = ReconnectInputDistribute;
// # sourceMappingURL=ReconnectInputDistribute.js.map
