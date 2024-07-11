"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChannelController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkData_1 = require("../../KuroSdk/KuroSdkData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class ChannelController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15920, this.iMt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15920);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnShareResult,
      this.oMt,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnShareResult,
      this.oMt,
    );
  }
  static CheckShareChannelOpen(e) {
    return ModelManager_1.ModelManager.ChannelModel.CheckShareChannelOpen(e);
  }
  static CheckKuroStreetOpen() {
    return ModelManager_1.ModelManager.ChannelModel.CheckKuroStreetOpen();
  }
  static CheckAccountSettingOpen(e) {
    return ModelManager_1.ModelManager.ChannelModel.CheckAccountSettingOpen(e);
  }
  static CheckCustomerServiceOpen() {
    return ModelManager_1.ModelManager.ChannelModel.CheckCustomerServiceOpen();
  }
  static OpenKuroStreet() {
    ModelManager_1.ModelManager.ChannelModel.OpenKuroStreet();
  }
  static ProcessAccountSetting(e) {
    ModelManager_1.ModelManager.ChannelModel.ProcessAccountSetting(e);
  }
  static RequestFirstShareReward(t) {
    var e = Protocol_1.Aki.Protocol.xus.create();
    (e.V3n = t),
      Net_1.Net.Call(26885, e, (e) => {
        e &&
          e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
          (ModelManager_1.ModelManager.ChannelModel.MarkActionShared(t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFirstShare,
          ));
      });
  }
  static GetOpenedShareIds() {
    return ModelManager_1.ModelManager.ChannelModel.GetOpenedShareIds();
  }
  static CouldShare() {
    return (
      0 < ModelManager_1.ModelManager.ChannelModel.GetOpenedShareIds().length
    );
  }
  static ShareChannel(e, t, r) {
    t
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            54,
            "分享图片",
            ["channel", e],
            ["arraySize", t.Num()],
          ),
        (ModelManager_1.ModelManager.ChannelModel.SharingActionId = r),
        ((r = new KuroSdkData_1.ShareData()).platform = String(e)),
        ControllerHolder_1.ControllerHolder.KuroSdkController.ShareByteData(
          r,
          t,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("KuroSdk", 54, "分享图片数据为空");
  }
  static ShareGacha(e) {
    e = {
      ScreenShot: !1,
      IsHiddenBattleView: !1,
      HandBookPhotoData: void 0,
      GachaData: e,
    };
    UiManager_1.UiManager.OpenView("PhotoSaveView", e);
  }
}
(exports.ChannelController = ChannelController),
  ((_a = ChannelController).iMt = (e) => {
    for (const t of e.Vxs)
      ModelManager_1.ModelManager.ChannelModel.MarkActionShared(t);
  }),
  (ChannelController.oMt = (e) => {
    var t = ModelManager_1.ModelManager.ChannelModel.SharingActionId;
    e &&
      ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(t) &&
      _a.RequestFirstShareReward(t);
  });
//# sourceMappingURL=ChannelController.js.map
