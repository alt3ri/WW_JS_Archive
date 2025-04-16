"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogUploadView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  LauncherLogUpload_1 = require("../../../../Launcher/LogUpload/LauncherLogUpload"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LogController_1 = require("../../../World/Controller/LogController"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class LogUploadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cBi = !1),
      (this.mBi = 0),
      (this.dBi = 0),
      (this.CBi = void 0),
      (this.gBi = void 0),
      (this.fBi = void 0),
      (this.ZAt = void 0),
      (this.UploadDelegate = void 0),
      (this.pBi = void 0),
      (this.vBi = 1),
      (this.RefreshRedDot = () => {
        var t =
          ControllerHolder_1.ControllerHolder.KuroSdkController.GetCustomerServiceRedPointState();
        this.fBi?.SetRedDotVisible(t);
      }),
      (this.MBi = (t) => {
        this.cBi = 1 === t;
      }),
      (this.EBi = () => {
        2 === this.vBi &&
          LogController_1.LogController.RequestOutputDebugInfo(),
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
            this.vBi,
          );
      }),
      (this.Mke = () => {
        switch (this.SBi) {
          case 0:
            if (!this.cBi)
              return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "LogUploadConfirmTip",
              );
            if (!this.yBi())
              return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "LogUploadLimited",
              );
            (this.SBi = 1), this.IBi();
            break;
          case 1:
            this.TBi() && (this.SBi = 0);
            break;
          case 2:
            this.m2e();
            break;
          case 3:
            (this.SBi = 1), this.IBi();
        }
      }),
      (this.m2e = () => {
        (1 === this.SBi && !this.TBi()) || this.CloseMe();
      }),
      (this.UploadEventCallBack = (t, e) => {
        var i;
        1 === this.SBi &&
          ((this.pBi = t),
          5 === this.pBi || 4 === this.pBi
            ? this.LBi()
            : this.dBi === e ||
              (1 !== this.pBi && 2 !== this.pBi) ||
              ((t =
                Math.round(
                  e * MathCommon_1.MathCommon.ProgressTotalValue,
                ).toString() + "%"),
              (i =
                1 === this.pBi
                  ? "Text_LogCompressing_Text"
                  : "Text_LogUploading_Text"),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.CBi, i, t),
              this.gBi.SetFillAmount(e),
              (this.dBi = e)));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[6, this.MBi]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
      this.RefreshRedDot,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
      this.RefreshRedDot,
    );
  }
  OnStart() {
    this.OpenParam && (this.vBi = this.OpenParam),
      (this.CBi = this.GetText(0)),
      (this.gBi = this.GetSprite(2)),
      (this.fBi = new ButtonItem_1.ButtonItem(this.GetItem(3))),
      this.fBi.SetFunction(this.EBi),
      this.fBi.SetShowText("Text_LogUploadService_Text"),
      this.fBi.SetActive(!1),
      this.RefreshRedDot(),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetItem(4))),
      this.ZAt.SetFunction(this.Mke),
      (this.SBi = 0),
      this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
        this.m2e();
      });
  }
  OnBeforeDestroy() {
    this.DBi(), (this.CBi = void 0), (this.gBi = void 0), this.fBi?.Destroy();
  }
  RBi(t) {
    t &&
    ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()
      ? this.fBi.SetActive(!0)
      : this.fBi.SetActive(!1);
  }
  DBi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback(),
      this.UploadDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack),
        (this.UploadDelegate = void 0));
  }
  set SBi(t) {
    this.mBi = t;
    var e = this.GetExtendToggle(6),
      i = this.GetItem(1),
      o = this.GetSprite(5);
    switch (this.mBi) {
      case 0:
        this.RBi(!0),
          this.ZAt.SetShowText("Text_LogUpload_Text"),
          this.CBi.ShowTextNew("Text_LogUploadConfirm_Text"),
          this.CBi.SetUIActive(!0);
        var r =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState1",
          );
        this.SetSpriteByPath(r, o, !1),
          e.RootUIComp.SetUIActive(!0),
          i.SetUIActive(!1);
        break;
      case 1:
        this.RBi(!1),
          this.ZAt.SetShowText("Text_LogUploadCancel_Text"),
          this.CBi.SetText("");
        r =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState2",
          );
        this.SetSpriteByPath(r, o, !1),
          e.RootUIComp.SetUIActive(!1),
          i.SetUIActive(!0);
        break;
      case 2:
        this.RBi(!0),
          this.ZAt.SetShowText("Text_LogUploadYes_Text"),
          this.CBi.ShowTextNew("Text_LogUploadSuccess_Text");
        r =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState3",
          );
        this.SetSpriteByPath(r, o, !1),
          e.RootUIComp.SetUIActive(!1),
          i.SetUIActive(!1);
        break;
      case 3:
        this.RBi(!0), this.ZAt.SetShowText("Text_LogUploadRetry_Text");
        var r = UE.KuroTencentCOSLibrary.GetAllFileNumNeedToSend(),
          s = r - UE.KuroTencentCOSLibrary.GetSendedFileNum(),
          s =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.CBi,
              "Text_LogUploadFail_Text",
              s,
              r,
            ),
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_UploadState1",
            ));
        this.SetSpriteByPath(s, o, !1),
          e.RootUIComp.SetUIActive(!1),
          i.SetUIActive(!1);
    }
  }
  get SBi() {
    return this.mBi;
  }
  yBi() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig(
        "LogUploadTimeInterval",
      ),
      e = TimeUtil_1.TimeUtil.GetServerTime();
    let i = void 0;
    return (
      void 0 ===
        (i = Net_1.Net.IsServerConnected()
          ? LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.LastTimeUploadStamp,
            )
          : LocalStorage_1.LocalStorage.GetGlobal(
              LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp,
            )) ||
      e - i > t ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Log",
          37,
          "[LogUpload] 上传时间不合法",
          ["LastTimeStamp", i],
          ["CurrentTimeStamp", e],
        ),
      !1)
    );
  }
  IBi() {
    (this.dBi = 0),
      this.gBi.SetFillAmount(0),
      this.DBi(),
      this.UploadDelegate ||
        (this.UploadDelegate = (0, puerts_1.toManualReleaseDelegate)(
          this.UploadEventCallBack,
        )),
      2 === this.vBi && LogController_1.LogController.RequestOutputDebugInfo(),
      LauncherLogUpload_1.LauncherLogUpload.SendLog(this.UploadDelegate);
  }
  TBi() {
    return 1 === this.pBi
      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "LogUploadCompressingTip",
        ),
        !1)
      : !!UE.KuroTencentCOSLibrary.IsSending() &&
          (UE.KuroTencentCOSLibrary.InterruptSending(),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "LogUploadCancelTip",
          ),
          !0);
  }
  LBi() {
    this.DBi();
    var t = 5 === this.pBi,
      e = ((this.SBi = t ? 2 : 3), TimeUtil_1.TimeUtil.GetServerTime()),
      i = Net_1.Net.IsServerConnected();
    t &&
      (i
        ? LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.LastTimeUploadStamp,
            e,
          )
        : LocalStorage_1.LocalStorage.SetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp,
            e,
          )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Log",
          37,
          "[LogUpload] 上传结束",
          ["IsLogin", i],
          ["Success", t],
          ["TimeStamp", e],
        );
  }
}
exports.LogUploadView = LogUploadView;
//# sourceMappingURL=LogUploadView.js.map
