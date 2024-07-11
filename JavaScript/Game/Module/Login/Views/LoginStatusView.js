"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginStatusView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LoginDefine_1 = require("../Data/LoginDefine");
class LoginStatusView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RefreshStatus = () => {
        const e = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
        const n = ModelManager_1.ModelManager.LoginModel.GetLastFailStatus();
        let t = "";
        (t = n
          ? `登录状态:${LoginDefine_1.ELoginStatus[e]}, 上一次失败:` +
            LoginDefine_1.ELoginStatus[n]
          : "登录状态:" + LoginDefine_1.ELoginStatus[e]),
          this.GetText(0).SetText(t);
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LoginStatusChange,
      this.RefreshStatus,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LoginStatusChange,
      this.RefreshStatus,
    );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.RefreshStatus();
  }
}
exports.LoginStatusView = LoginStatusView;
// # sourceMappingURL=LoginStatusView.js.map
