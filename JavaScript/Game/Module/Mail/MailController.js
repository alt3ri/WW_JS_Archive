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
    Net_1.Net.Register(27328, this.Cyi),
      Net_1.Net.Register(19023, this.gyi),
      Net_1.Net.Register(23878, this.fyi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27328),
      Net_1.Net.UnRegister(19023),
      Net_1.Net.UnRegister(23878);
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
    var o = new Protocol_1.Aki.Protocol.Nss();
    (o.s5n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestReadMail 未阅读邮件，申请阅读",
          ["mailId", e],
        ),
      Net_1.Net.Call(24070, Protocol_1.Aki.Protocol.Nss.create(o), (e) => {
        var o;
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                25059,
              )
            : (o = ModelManager_1.ModelManager.MailModel.GetMailInstanceById(
                e.s5n,
              )) &&
              ((o.ReadTime = MathUtils_1.MathUtils.LongToNumber(e.ebs)),
              ModelManager_1.ModelManager.MailModel.SetMailStatusByStatusCode(
                e.Y4n,
                o,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Mail", 28, "邮件控制器：阅读选中，状态码", [
                  "response.State",
                  e.Y4n,
                ]),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SelectedMail,
                e.s5n,
                a,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchUnfinishedFlag,
              )));
      });
  }
  static RequestPickAttachment(e, a) {
    var o = new Protocol_1.Aki.Protocol.Vss(),
      r =
        CommonParamById_1.configCommonParamById.GetIntConfig("mail_take_limit");
    (o.I7n = e.slice(0, r)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestPickAttachment 申请领取附件",
          ["attachmentIds", o.I7n],
        ),
      Net_1.Net.Call(25674, Protocol_1.Aki.Protocol.Vss.create(o), (o) => {
        if (o)
          if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            let e = "";
            switch (ErrorCodeById_1.configErrorCodeById.GetConfig(o.Q4n).Id) {
              case 10008:
              case 400012:
                e = "MailOverLimit";
                break;
              case 1e4:
                e = "MailOutOfDate";
            }
            "" !== e
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  e,
                )
              : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  o.Q4n,
                  24642,
                );
          } else
            ModelManager_1.ModelManager.MailModel.SetLastPickedAttachments(
              o.lbs,
              a,
            );
      });
  }
  static RequestDeleteMail(e) {
    var o = new Protocol_1.Aki.Protocol.Hss();
    (o.I7n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestDeleteMail请求删除邮件",
          ["mailId", e],
        ),
      Net_1.Net.Call(16949, Protocol_1.Aki.Protocol.Hss.create(o), (e) => {
        if (e)
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              24081,
            );
          else if (0 < e._bs.length) {
            for (const o of e._bs)
              ModelManager_1.ModelManager.MailModel.DeleteMail(o);
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Mail", 28, "邮件控制器：删除邮件", [
                "邮件id",
                e._bs,
              ]),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MailDelete",
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DeletingMail,
                e._bs,
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
        ["response.MailInfos.length", e.sbs.length],
      );
    for (const a of e.sbs) {
      ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "[MailError]MailBox is fulfilled");
      var o = new Protocol_1.Aki.Protocol.L5s(a);
      ModelManager_1.ModelManager.MailModel.AddMail(o, !1);
    }
    ModelManager_1.ModelManager.MailModel.ReloadMailList(),
      ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap(),
      _a.dyi();
  }),
  (MailController.gyi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Mail", 28, "[MailMessage]6100:MailDeleteNotify");
    var o = e.s5n;
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
      e.x9n === Protocol_1.Aki.Protocol.I5s.Proto_PublicCancelled
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
    void 0 !== e.hbs &&
      void 0 !== e.hbs &&
      (ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "邮件控制器：MailBox is fulfilled!"),
      (o = new Protocol_1.Aki.Protocol.L5s(e.hbs)),
      void 0 !==
      ModelManager_1.ModelManager.MailModel.GetMailInstanceById(o.s5n)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Mail", 28, "邮件控制器：This mail exist! id: ", [
            "newMailInfo.Id",
            o.s5n,
          ])
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件控制器：OnMailAddNotify New mail added, id: ",
              ["newMailInfo.Id", o.s5n],
            ),
          e.x9n === Protocol_1.Aki.Protocol.R5s.Proto_BagFull &&
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
