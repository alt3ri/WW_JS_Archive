"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetWorkMaskView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ReconnectDefine_1 = require("../ReconnectDefine");
class NetWorkMaskView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Kno = 0),
      (this.oUe = 0),
      (this.Qno = 0),
      (this.tBt = 0),
      (this.Xno = () => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
          ReconnectDefine_1.ELogoutReason.NetWorkMaskViewBackBtn,
        );
      }),
      (this.$no = () => {}),
      (this.Yno = () => {
        UiManager_1.UiManager.CloseView("NetWorkMaskView");
      }),
      (this.Jno = () => {
        this.zno();
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ReConnectSuccess,
      this.Yno,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReConnectFail,
        this.Jno,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ReConnectSuccess,
      this.Yno,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReConnectFail,
        this.Jno,
      );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    (this.oUe = 0), (this.Kno = 0);
    const e = ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty();
    const i =
      CommonParamById_1.configCommonParamById.GetIntConfig("network_mask_time");
    (this.tBt = e ? 100 : i ?? 100), this.GetItem(0).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.Zno();
  }
  Zno() {
    this.Qno &&
      (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(
        this.Qno,
      ),
      (this.Qno = void 0));
  }
  eso(e) {
    this.tBt < 0 ||
      Net_1.Net.IsConsumeNotifyPaused ||
      ((this.tBt -= e),
      this.tBt < 0 &&
        (this.GetItem(0).SetUIActive(!0),
        (e = ModelManager_1.ModelManager.ReConnectModel.GetUnResponsedRpcStr())
          .length > 0) &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Reconnect", 9, "网络遮罩超时, 打开断线重连界面", [
          "未响应的rpcId",
          e,
        ]));
  }
  OnTick(e) {
    (this.oUe += e),
      this.oUe > 1e3 &&
        ((this.oUe -= 1e3), this.GetText(1).IsUIActiveSelf()) &&
        (this.Kno++,
        this.Kno >= ReconnectDefine_1.ellipsis.length && (this.Kno = 0),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(1),
          "ReconnectingInfo",
          ReconnectDefine_1.ellipsis[this.Kno],
        )),
      this.eso(e);
  }
  zno() {
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(30);
    e.FunctionMap.set(0, this.$no),
      e.FunctionMap.set(1, this.Xno),
      e.FunctionMap.set(2, this.$no),
      (e.IsEscViewTriggerCallBack = !1),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        e,
        (e, i) => {
          this.Qno = i;
        },
      );
  }
}
exports.NetWorkMaskView = NetWorkMaskView;
// # sourceMappingURL=NetWorkMaskView.js.map
