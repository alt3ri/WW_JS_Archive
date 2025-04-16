"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetworkDetectionSelectServerView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  NetworkDetectionSelectServerDynItem_1 = require("./NetworkDetectionSelectServerDynItem"),
  NetworkDetectionSelectServerItem_1 = require("./NetworkDetectionSelectServerItem");
class NetworkDetectionSelectServerView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.xqe = void 0),
      (this.LSi = (e, t, r) => {
        return new NetworkDetectionSelectServerItem_1.NetworkDetectionSelectServerItem();
      }),
      (this.DSi = () => {
        this.CloseMe();
      }),
      (this.RSi = () => {
        var e =
          ModelManager_1.ModelManager.NetworkDetectionModel
            .CurrentUiSelectSeverData;
        (ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData =
          e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnConfirmNetworkDetectionItem,
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
    var e =
        new NetworkDetectionSelectServerDynItem_1.NetworkDetectionSelectServerDynItem(),
      e =
        ((this.xqe = new DynScrollView_1.DynamicScrollView(
          this.GetUIDynScrollViewComponent(2),
          this.GetItem(3),
          e,
          this.LSi,
        )),
        await this.xqe.Init(),
        (ModelManager_1.ModelManager.NetworkDetectionModel.CurrentUiSelectSeverData =
          ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData),
        ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion());
    this.xqe.RefreshByData(e), await this.USi(e);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  async USi(e) {
    const t = this.ASi(e);
    await this.xqe?.ScrollToItemIndex(t),
      TimerSystem_1.TimerSystem.Next(() => {
        var e = this.xqe?.GetGrid(t);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(
          e,
          !0,
        );
      });
  }
  ASi(t) {
    let r = 0;
    var i = t.length;
    for (let e = 0; e < i; e++)
      if (
        ModelManager_1.ModelManager.NetworkDetectionModel
          .CurrentUiSelectSeverData === t[e]
      ) {
        r = e;
        break;
      }
    return r;
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren(), (this.xqe = void 0);
  }
}
exports.NetworkDetectionSelectServerView = NetworkDetectionSelectServerView;
//# sourceMappingURL=NetworkDetectionSelectServerView.js.map
