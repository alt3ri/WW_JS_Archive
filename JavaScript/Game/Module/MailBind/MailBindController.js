"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailBindController = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine");
class MailBindController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.nye,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16849, MailBindController.oil);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16849);
  }
  static MainBindInfoRequest() {
    MailBindController.MailBindInfoRequestAsync()
      .then(void 0)
      .catch((e) => {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 43, "请求邮箱绑定信息出错");
      });
  }
  static async MailBindInfoRequestAsync() {
    return new Promise((t) => {
      var e = new Protocol_1.Aki.Protocol.bC_();
      Net_1.Net.Call(27216, e, (e) => {
        (e = e && e.Hb_)
          ? (ModelManager_1.ModelManager.MailBindModel.UpdateByProtoMailBindInfo(
              e,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnMailBindInfoResponse,
            ),
            t(!0))
          : t(!1);
      });
    });
  }
  static MailBindRequest() {
    var e = new Protocol_1.Aki.Protocol.AC_();
    Net_1.Net.Call(25152, e, (e) => {
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnMailBindResponse,
        );
    });
  }
  static MailBindRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.LC_();
    Net_1.Net.Call(19410, e, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21321,
            )
          : EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnMailBindRewardResponse,
            ));
    });
  }
  static RecordMailBindNextShowRedDotTime() {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      t = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MailBindNextShowRedDotTime,
      );
    (t && e < t) ||
      ((t = new Date(e)).setHours(4, 0, 0, 0),
      (e = (e = t.getDay()) < 1 ? 1 - e : 7 - (e - 1)),
      (t =
        t.getTime() +
        e *
          CommonDefine_1.SECOND_PER_DAY *
          CommonDefine_1.MILLIONSECOND_PER_SECOND),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.MailBindNextShowRedDotTime,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMailBindRedDot,
      ));
  }
  static RecordMailBindClick() {
    var e = new LogReportDefine_1.MailBindClickEvent();
    (e.i_language = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
      LanguageSystem_1.LanguageSystem.PackageLanguage,
    ).LanguageType),
      (e.i_if_binded = ModelManager_1.ModelManager.MailBindModel.GetIsBind()
        ? 1
        : 0),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
  static RecordMailBindJumpToWebView() {
    var e = new LogReportDefine_1.MailBindJumpToWebViewEvent();
    (e.i_language = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
      LanguageSystem_1.LanguageSystem.PackageLanguage,
    ).LanguageType),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
}
((exports.MailBindController = MailBindController).oil = (e) => {
  e = e.Hb_;
  e &&
    (ModelManager_1.ModelManager.MailBindModel.UpdateByProtoMailBindInfo(e),
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnMailBindInfoNotify,
    ));
}),
  (MailBindController.nye = () => {
    MailBindController.MainBindInfoRequest();
  }),
  (MailBindController._Mo = () => {
    ModelManager_1.ModelManager.MailBindModel?.GetIsBind() ||
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMailBindRedDot,
      );
  });
//# sourceMappingURL=MailBindController.js.map
