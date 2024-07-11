"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginServerView = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
  LoginServerDynItem_1 = require("./LoginServerDynItem"),
  LoginServerItem_1 = require("./LoginServerItem");
class LoginServerView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.TSi = void 0),
      (this.LSi = (e, r, t) => {
        return new LoginServerItem_1.LoginServerItem();
      }),
      (this.DSi = () => {
        this.CloseMe();
      }),
      (this.RSi = () => {
        var e =
          ModelManager_1.ModelManager.LoginServerModel.CurrentUiSelectSeverData;
        (ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData =
          e),
          ModelManager_1.ModelManager.LoginModel.SetServerName(e.name),
          ModelManager_1.ModelManager.LoginModel.SetServerIp(e.ip, 3),
          ModelManager_1.ModelManager.LoginModel.SetServerId(e.id),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnConfirmServerItem,
          ),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIDynScrollViewComponent],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.DSi],
        [1, this.RSi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.TSi = new LoginServerDynItem_1.LoginServerDynItem()),
      (this.xqe = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(2),
        this.GetItem(3),
        this.TSi,
        this.LSi,
      )),
      await this.xqe.Init();
  }
  OnStart() {
    ModelManager_1.ModelManager.LoginServerModel.CurrentUiSelectSeverData =
      ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData;
    var e = BaseConfigController_1.BaseConfigController.GetLoginServers();
    this.xqe.RefreshByData(e), this.USi(e);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  USi(e) {
    e = this.ASi(e);
    this.GetUIDynScrollViewComponent(2).ScrollToItemIndex(e);
  }
  ASi(r) {
    let t = 0;
    var i = r.length;
    for (let e = 0; e < i; e++)
      if (
        ModelManager_1.ModelManager.LoginServerModel
          .CurrentUiSelectSeverData === r[e]
      ) {
        t = e;
        break;
      }
    return t;
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren(), (this.xqe = void 0);
  }
}
exports.LoginServerView = LoginServerView;
//# sourceMappingURL=LoginServerView.js.map
