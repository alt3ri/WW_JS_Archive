"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class MailController extends UiControllerBase_1.UiControllerBase {
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "MailBoxView",
      MailController.CanOpenView,
      "MailController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "EditFormationView",
      MailController.CanOpenView,
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.dyi,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.dyi,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(6777, this.Cyi),
      Net_1.Net.Register(21540, this.gyi),
      Net_1.Net.Register(27743, this.fyi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(6777),
      Net_1.Net.UnRegister(21540),
      Net_1.Net.UnRegister(27743);
  }
  static SelectedMail(e) {
    e &&
      (e.GetWasScanned()
        ? (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SelectedMail,
            e.Id,
            e.ConfigId,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SwitchUnfinishedFlag,
          ))
        : this.RequestReadMail(e.Id, e.ConfigId));
  }
  static RequestReadMail(e, a) {
    var o = new Protocol_1.Aki.Protocol.xss();
    (o.J4n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestReadMail 未阅读邮件，申请阅读",
          ["mailId", e],
        ),
      Net_1.Net.Call(27204, Protocol_1.Aki.Protocol.xss.create(o), (e) => {
        var o;
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                7969,
              )
            : (o = ModelManager_1.ModelManager.MailModel.GetMailInstanceById(
                e.J4n,
              )) &&
              ((o.ReadTime = MathUtils_1.MathUtils.LongToNumber(e.Kxs)),
              ModelManager_1.ModelManager.MailModel.SetMailStatusByStatusCode(
                e.F4n,
                o,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Mail", 28, "邮件控制器：阅读选中，状态码", [
                  "response.State",
                  e.F4n,
                ]),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SelectedMail,
                e.J4n,
                a,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchUnfinishedFlag,
              )));
      });
  }
  static RequestPickAttachment(e, a) {
    var o = new Protocol_1.Aki.Protocol.Bss(),
      t =
        CommonParamById_1.configCommonParamById.GetIntConfig("mail_take_limit");
    (o.C7n = e.slice(0, t)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestPickAttachment 申请领取附件",
          ["attachmentIds", o.C7n],
        ),
      Net_1.Net.Call(13851, Protocol_1.Aki.Protocol.Bss.create(o), (o) => {
        if (o)
          if (o.O4n !== Protocol_1.Aki.Protocol.O4n.NRs) {
            let e = "";
            switch (ErrorCodeById_1.configErrorCodeById.GetConfig(o.O4n).Id) {
              case 10008:
              case 400012:
                e = "MailOverLimit";
                break;
              case 1e4:
                e = "MailOutOfDate";
            }
            "" !== e &&
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                e,
              );
          } else
            ModelManager_1.ModelManager.MailModel.SetLastPickedAttachments(
              o.tbs,
              a,
            );
      });
  }
  static RequestDeleteMail(e) {
    var o = new Protocol_1.Aki.Protocol.Gss();
    (o.C7n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestDeleteMail请求删除邮件",
          ["mailId", e],
        ),
      Net_1.Net.Call(18032, Protocol_1.Aki.Protocol.Gss.create(o), (e) => {
        if (e)
          if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              25452,
            );
          else if (0 < e.ibs.length) {
            for (const o of e.ibs)
              ModelManager_1.ModelManager.MailModel.DeleteMail(o);
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Mail", 28, "邮件控制器：删除邮件", [
                "邮件id",
                e.ibs,
              ]),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MailDelete",
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DeletingMail,
                e.ibs,
              );
          }
      });
  }
}
(exports.MailController = MailController),
  ((_a = MailController).CanOpenView = (e) =>
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10020)),
  (MailController.Cyi = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Mail",
        28,
        "邮件控制器：OnMailInfosNotify [Mail]6100 Mails response, length: ",
        ["response.MailInfos.length", e.Zxs.length],
      );
    for (const a of e.Zxs) {
      ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "[MailError]MailBox is fulfilled");
      var o = new Protocol_1.Aki.Protocol.p6s(a);
      ModelManager_1.ModelManager.MailModel.AddMail(o, !1);
    }
    ModelManager_1.ModelManager.MailModel.ReloadMailList(),
      ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap(),
      _a.dyi();
  }),
  (MailController.gyi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Mail", 28, "[MailMessage]6100:MailDeleteNotify");
    var o = e.J4n;
    ModelManager_1.ModelManager.MailModel.DeleteMail(o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：OnMailDeleteNotify A mail was deleted, id: ",
          ["deletingMailId", o],
        ),
      UiManager_1.UiManager.IsViewShow("MailContentView") &&
        UiManager_1.UiManager.CloseView("MailContentView"),
      e.E9n === Protocol_1.Aki.Protocol.f6s.Proto_PublicCancelled
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "MailRecall",
          )
        : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "MailDelete",
          ),
      ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DeletingMailPassively,
      );
  }),
  (MailController.fyi = (e) => {
    var o;
    void 0 !== e.ebs &&
      void 0 !== e.ebs &&
      (ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "邮件控制器：MailBox is fulfilled!"),
      (o = new Protocol_1.Aki.Protocol.p6s(e.ebs)),
      void 0 !==
      ModelManager_1.ModelManager.MailModel.GetMailInstanceById(o.J4n)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Mail", 28, "邮件控制器：This mail exist! id: ", [
            "newMailInfo.Id",
            o.J4n,
          ])
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件控制器：OnMailAddNotify New mail added, id: ",
              ["newMailInfo.Id", o.J4n],
            ),
          e.E9n === Protocol_1.Aki.Protocol.M6s.Proto_BagFull &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "BagOverLimit",
            ),
          ModelManager_1.ModelManager.MailModel.AddMail(o),
          ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap(),
          _a.dyi(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.AddingNewMail,
          )));
  }),
  (MailController.dyi = () => {
    var e;
    ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
      ((e =
        Time_1.Time.NowSeconds -
          ModelManager_1.ModelManager.MailModel.LastTimeShowNewMailTipsTime >
        ConfigManager_1.ConfigManager.CommonConfig.GetNewMailGap()) &&
      ModelManager_1.ModelManager.MailModel.IfNeedShowNewMail()
        ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "NewMail",
          ),
          ModelManager_1.ModelManager.MailModel.SaveShowNewMailMap(),
          (ModelManager_1.ModelManager.MailModel.LastTimeShowNewMailTipsTime =
            Time_1.Time.NowSeconds))
        : !e &&
          ModelManager_1.ModelManager.MailModel.IfNeedShowNewMail() &&
          ModelManager_1.ModelManager.MailModel.SaveShowNewMailMap());
  });
//# sourceMappingURL=MailController.js.map
