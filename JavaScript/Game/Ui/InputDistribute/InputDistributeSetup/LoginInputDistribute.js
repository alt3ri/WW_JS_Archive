"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginInputDistribute = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoginDefine_1 = require("../../../Module/Login/Data/LoginDefine");
const WorldModel_1 = require("../../../World/Model/WorldModel");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class LoginInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return !(
      WorldModel_1.WorldModel.IsStandalone ||
      !this.Bmr() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Input", 8, "[InputDistribute]刷新登录状态输入Tag时"),
      this.SetInputDistributeTags([
        InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
          .MouseInputTag,
        InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot
          .NavigationTag,
      ]),
      0)
    );
  }
  Bmr() {
    return !ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
      LoginDefine_1.ELoginStatus.EnterGameRet,
    );
  }
}
exports.LoginInputDistribute = LoginInputDistribute;
// # sourceMappingURL=LoginInputDistribute.js.map
