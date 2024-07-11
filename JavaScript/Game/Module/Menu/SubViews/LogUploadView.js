"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogUploadView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LogController_1 = require("../../../World/Controller/LogController");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LogUpload_1 = require("../../LogUpload/LogUpload");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LogUploadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cwi = !1),
      (this.mwi = 0),
      (this.dwi = 0),
      (this.Cwi = void 0),
      (this.gwi = void 0),
      (this.fwi = void 0),
      (this.$Ut = void 0),
      (this.UploadDelegate = void 0),
      (this.pwi = void 0),
      (this.vwi = 1),
      (this.Mwi = (t) => {
        this.cwi = t === 1;
      }),
      (this.Swi = () => {
        this.vwi === 2 &&
          LogController_1.LogController.RequestOutputDebugInfo(),
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
            this.vwi,
          );
      }),
      (this.dIt = () => {
        switch (this.Ewi) {
          case 0:
            if (!this.cwi)
              return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "LogUploadConfirmTip",
              );
            if (!this.ywi())
              return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "LogUploadLimited",
              );
            (this.Ewi = 1), this.Iwi();
            break;
          case 1:
            this.Twi() && (this.Ewi = 0);
            break;
          case 2:
            this.mIt();
            break;
          case 3:
            (this.Ewi = 1), this.Iwi();
        }
      }),
      (this.mIt = () => {
        (this.Ewi === 1 && !this.Twi()) || this.CloseMe();
      }),
      (this.UploadEventCallBack = (t, i) => {
        let e;
        this.Ewi === 1 &&
          ((this.pwi = t),
          this.pwi === 5 || this.pwi === 4
            ? this.Lwi()
            : this.dwi === i ||
              (this.pwi !== 1 && this.pwi !== 2) ||
              ((t =
                Math.round(
                  i * MathCommon_1.MathCommon.ProgressTotalValue,
                ).toString() + "%"),
              (e =
                this.pwi === 1
                  ? "Text_LogCompressing_Text"
                  : "Text_LogUploading_Text"),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.Cwi, e, t),
              this.gwi.SetFillAmount(i),
              (this.dwi = i)));
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
      (this.BtnBindInfo = [[6, this.Mwi]]);
  }
  OnStart() {
    this.OpenParam && (this.vwi = this.OpenParam),
      (this.Cwi = this.GetText(0)),
      (this.gwi = this.GetSprite(2)),
      (this.fwi = new ButtonItem_1.ButtonItem(this.GetItem(3))),
      this.fwi.SetFunction(this.Swi),
      this.fwi.SetShowText("Text_LogUploadService_Text"),
      this.fwi.SetActive(!1),
      this.fwi.BindRedDot("CustomerService"),
      (this.$Ut = new ButtonItem_1.ButtonItem(this.GetItem(4))),
      this.$Ut.SetFunction(this.dIt),
      (this.Ewi = 0),
      this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
        this.mIt();
      });
  }
  OnBeforeDestroy() {
    this.Dwi(),
      (this.Cwi = void 0),
      (this.gwi = void 0),
      this.fwi?.UnBindRedDot(),
      this.fwi?.Destroy();
  }
  Rwi(t) {
    t &&
    ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()
      ? this.fwi.SetActive(!0)
      : this.fwi.SetActive(!1);
  }
  Dwi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback(),
      this.UploadDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack),
        (this.UploadDelegate = void 0));
  }
  set Ewi(t) {
    this.mwi = t;
    const i = this.GetExtendToggle(6);
    const e = this.GetItem(1);
    const o = this.GetSprite(5);
    switch (this.mwi) {
      case 0:
        this.Rwi(!0),
          this.$Ut.SetShowText("Text_LogUpload_Text"),
          this.Cwi.ShowTextNew("Text_LogUploadConfirm_Text"),
          this.Cwi.SetUIActive(!0);
        var s =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState1",
          );
        this.SetSpriteByPath(s, o, !1),
          i.RootUIComp.SetUIActive(!0),
          e.SetUIActive(!1);
        break;
      case 1:
        this.Rwi(!1),
          this.$Ut.SetShowText("Text_LogUploadCancel_Text"),
          this.Cwi.SetText("");
        s =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState2",
          );
        this.SetSpriteByPath(s, o, !1),
          i.RootUIComp.SetUIActive(!1),
          e.SetUIActive(!0);
        break;
      case 2:
        this.Rwi(!0),
          this.$Ut.SetShowText("Text_LogUploadYes_Text"),
          this.Cwi.ShowTextNew("Text_LogUploadSuccess_Text");
        s =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState3",
          );
        this.SetSpriteByPath(s, o, !1),
          i.RootUIComp.SetUIActive(!1),
          e.SetUIActive(!1);
        break;
      case 3:
        this.Rwi(!0), this.$Ut.SetShowText("Text_LogUploadRetry_Text");
        var s = UE.KuroTencentCOSLibrary.GetAllFileNumNeedToSend();
        var r = s - UE.KuroTencentCOSLibrary.GetSendedFileNum();
        var r =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.Cwi,
            "Text_LogUploadFail_Text",
            r,
            s,
          ),
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_UploadState1",
          ));
        this.SetSpriteByPath(r, o, !1),
          i.RootUIComp.SetUIActive(!1),
          e.SetUIActive(!1);
    }
  }
  get Ewi() {
    return this.mwi;
  }
  ywi() {
    const t = CommonParamById_1.configCommonParamById.GetIntConfig(
      "LogUploadTimeInterval",
    );
    const i = TimeUtil_1.TimeUtil.GetServerTime();
    const e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp,
    );
    return void 0 === e || t < i - e;
  }
  Iwi() {
    (this.dwi = 0),
      this.gwi.SetFillAmount(0),
      this.Dwi(),
      this.UploadDelegate ||
        (this.UploadDelegate = (0, puerts_1.toManualReleaseDelegate)(
          this.UploadEventCallBack,
        )),
      this.vwi === 2 && LogController_1.LogController.RequestOutputDebugInfo(),
      LogUpload_1.LogUpload.SendLog(this.UploadDelegate);
  }
  Twi() {
    return this.pwi === 1
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
  Lwi() {
    this.Dwi();
    let t = this.pwi === 5;
    (this.Ewi = t ? 2 : 3),
      t &&
        ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp,
          t,
        ));
  }
}
exports.LogUploadView = LogUploadView;
// # sourceMappingURL=LogUploadView.js.map
