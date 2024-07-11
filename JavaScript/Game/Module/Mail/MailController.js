"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
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
      this.dEi,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.dEi,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16233, this.CEi),
      Net_1.Net.Register(8446, this.gEi),
      Net_1.Net.Register(3827, this.fEi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16233),
      Net_1.Net.UnRegister(8446),
      Net_1.Net.UnRegister(3827);
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
    const o = new Protocol_1.Aki.Protocol.Gis();
    (o.Ekn = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestReadMail 未阅读邮件，申请阅读",
          ["mailId", e],
        ),
      Net_1.Net.Call(20891, Protocol_1.Aki.Protocol.Gis.create(o), (e) => {
        let o;
        e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                17261,
              )
            : (o = ModelManager_1.ModelManager.MailModel.GetMailInstanceById(
                e.Ekn,
              )) &&
              (ModelManager_1.ModelManager.MailModel.SetMailStatusByStatusCode(
                e.ckn,
                o,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Mail", 28, "邮件控制器：阅读选中，状态码", [
                  "response.State",
                  e.ckn,
                ]),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SelectedMail,
                e.Ekn,
                a,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchUnfinishedFlag,
              )));
      });
  }
  static RequestPickAttachment(e, a) {
    const o = new Protocol_1.Aki.Protocol.kis();
    const r =
      CommonParamById_1.configCommonParamById.GetIntConfig("mail_take_limit");
    (o.q6n = e.slice(0, r)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestPickAttachment 申请领取附件",
          ["attachmentIds", o.q6n],
        ),
      Net_1.Net.Call(15967, Protocol_1.Aki.Protocol.kis.create(o), (o) => {
        if (o)
          if (o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys) {
            let e = "";
            switch (ErrorCodeById_1.configErrorCodeById.GetConfig(o.lkn).Id) {
              case 10008:
              case 400012:
                e = "MailOverLimit";
                break;
              case 1e4:
                e = "MailOutOfDate";
            }
            e !== "" &&
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                e,
              );
          } else
            ModelManager_1.ModelManager.MailModel.SetLastPickedAttachments(
              o.qAs,
              a,
            );
      });
  }
  static RequestDeleteMail(e) {
    const o = new Protocol_1.Aki.Protocol.Fis();
    (o.q6n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Mail",
          28,
          "邮件控制器：RequestDeleteMail请求删除邮件",
          ["mailId", e],
        ),
      Net_1.Net.Call(25593, Protocol_1.Aki.Protocol.Fis.create(o), (e) => {
        if (e)
          if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              13564,
            );
          else if (e.GAs.length > 0) {
            for (const o of e.GAs)
              ModelManager_1.ModelManager.MailModel.DeleteMail(o);
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Mail", 28, "邮件控制器：删除邮件", [
                "邮件id",
                e.GAs,
              ]),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "MailDelete",
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.DeletingMail,
                e.GAs,
              );
          }
      });
  }
}
(exports.MailController = MailController),
  ((_a = MailController).CanOpenView = (e) =>
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10020)),
  (MailController.CEi = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Mail",
        28,
        "邮件控制器：OnMailInfosNotify [Mail]6100 Mails response, length: ",
        ["response.MailInfos.length", e.bAs.length],
      );
    for (const a of e.bAs) {
      ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "[MailError]MailBox is fulfilled");
      const o = new Protocol_1.Aki.Protocol.PNs(a);
      ModelManager_1.ModelManager.MailModel.AddMail(o, !1);
    }
    ModelManager_1.ModelManager.MailModel.ReloadMailList(),
      ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap(),
      _a.dEi();
  }),
  (MailController.gEi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Mail", 28, "[MailMessage]6100:MailDeleteNotify");
    const o = e.Ekn;
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
      e.V5n === Protocol_1.Aki.Protocol.DNs.Proto_PublicCancelled
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
  (MailController.fEi = (e) => {
    let o;
    void 0 !== e.BAs &&
      void 0 !== e.BAs &&
      (ModelManager_1.ModelManager.MailModel.GetMailListLength() >=
        ModelManager_1.ModelManager.MailModel.GetMailCapacity() &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Mail", 28, "邮件控制器：MailBox is fulfilled!"),
      (o = new Protocol_1.Aki.Protocol.PNs(e.BAs)),
      void 0 !==
      ModelManager_1.ModelManager.MailModel.GetMailInstanceById(o.Ekn)
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Mail", 28, "邮件控制器：This mail exist! id: ", [
            "newMailInfo.Id",
            o.Ekn,
          ])
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Mail",
              28,
              "邮件控制器：OnMailAddNotify New mail added, id: ",
              ["newMailInfo.Id", o.Ekn],
            ),
          e.V5n === Protocol_1.Aki.Protocol.UNs.Proto_BagFull &&
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "BagOverLimit",
            ),
          ModelManager_1.ModelManager.MailModel.AddMail(o),
          ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap(),
          _a.dEi(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.AddingNewMail,
          )));
  }),
  (MailController.dEi = () => {
    let e;
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
// # sourceMappingURL=MailController.js.map
