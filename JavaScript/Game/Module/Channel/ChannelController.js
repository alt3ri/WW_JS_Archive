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
  UiManager_1 = require("../../Ui/UiManager"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine");
class ChannelController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25276, this.dEt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25276);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnShareResult,
      this.CEt,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnShareResult,
      this.CEt,
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
  static RequestFirstShareReward(r) {
    var e = new Protocol_1.Aki.Protocol.BCs();
    (e.x8n = r),
      Net_1.Net.Call(26311, e, (e) => {
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
          (ModelManager_1.ModelManager.ChannelModel.MarkActionShared(r),
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
  static ShareChannel(e, r, t, o) {
    r
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            53,
            "分享图片",
            ["channel", e],
            ["shareConfigId", o],
            ["arraySize", r.Num()],
          ),
        (ModelManager_1.ModelManager.ChannelModel.SharingActionId = t),
        (ModelManager_1.ModelManager.ChannelModel.SharingConfigId = o),
        ((t = new KuroSdkData_1.ShareData()).platform = String(e)),
        ControllerHolder_1.ControllerHolder.KuroSdkController.ShareByteData(
          t,
          r,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("KuroSdk", 53, "分享图片数据为空");
  }
  static LS1(e, r, t) {
    var o = new LogReportDefine_1.ShareEvent();
    (o.i_share_channel = r),
      (o.i_share_result = t ? 1 : 0),
      (o.i_share_scene = e),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
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
  ((_a = ChannelController).dEt = (e) => {
    for (const r of e.mGs)
      ModelManager_1.ModelManager.ChannelModel.MarkActionShared(r);
  }),
  (ChannelController.CEt = (e) => {
    var r = ModelManager_1.ModelManager.ChannelModel.SharingActionId,
      t = ModelManager_1.ModelManager.ChannelModel.SharingConfigId;
    e &&
      ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(r) &&
      _a.RequestFirstShareReward(r),
      _a.LS1(r, t, e);
  });
//# sourceMappingURL=ChannelController.js.map
