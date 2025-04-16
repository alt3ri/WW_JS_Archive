"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetworkDetectionView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LauncherLogUploadHandle_1 = require("../../../Launcher/LogUpload/LauncherLogUploadHandle"),
  LauncherNetworkDetectionController_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionController"),
  LauncherNetworkDetectionDefine_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionDefine"),
  LauncherNetworkDetectionModel_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionModel"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ButtonItem_1 = require("../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  NetworkDetectionItem_1 = require("./NetworkDetectionItem"),
  NetworkDetectionTips_1 = require("./NetworkDetectionTips");
class NetworkDetectionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.AZs = void 0),
      (this.Bic = []),
      (this.kic = void 0),
      (this.qic = 0),
      (this.E9i = void 0),
      (this.Oic = void 0),
      (this.Gic = void 0),
      (this.Fic = ""),
      (this.Nic = () => {
        var e = new NetworkDetectionItem_1.NetworkDetectionItem();
        return this.Bic.push(e), e;
      }),
      (this.Vic = () => {
        1 === this.qic || 3 === this.qic
          ? this.Gic.ShowTip("NetworkDetection_Ing")
          : UiManager_1.UiManager.OpenView("NetworkDetectionSelectServerView");
      }),
      (this.jic = () => {
        var e =
          ModelManager_1.ModelManager.NetworkDetectionModel
            .CurrentSelectServerData;
        void 0 === e
          ? this.GetText(1).SetText("")
          : this.GetText(1).SetText(e.name),
          this.l_i();
      }),
      (this.$Lc = () => {
        var e =
          ModelManager_1.ModelManager.NetworkDetectionModel
            .CurrentSelectServerData;
        void 0 !== e &&
          (LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.SetDetectionConfig(
            e,
          )
            ? this.jic()
            : ((ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData =
                void 0),
              this.Gic.ShowTip("NetworkDetection_Error")));
      }),
      (this.Cwn = () => {
        (1 !== this.qic && 3 !== this.qic) ||
        !ModelManager_1.ModelManager.NetworkDetectionModel.NeedInterruptDetectionDoubleCheckTips()
          ? this.CloseMe()
          : (this.Gic.ShowTip("NetworkDetection_tips"),
            ModelManager_1.ModelManager.NetworkDetectionModel.ConfirmInterruptDetection());
      }),
      (this.fwn = () => {
        switch (this.qic) {
          case 0:
            this.Hic();
            break;
          case 1:
            return;
          case 2:
            var e = this.AZs.GetDatas(),
              e =
                ModelManager_1.ModelManager.NetworkDetectionModel.GetFinalErrorCodeString(
                  e,
                ),
              e =
                this.Fic +
                `
` +
                e;
            UE.LGUIBPLibrary.ClipBoardCopy(e),
              this.Oic.Show(),
              this.Oic.SetTipsLocalText("NetworkDetection_Submiting"),
              this.kic.UploadLog(),
              (this.qic = 3);
        }
      }),
      (this.$ic = () => {
        (this.qic = 4),
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
            1,
          ),
          this.Oic.Hide(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Login",
              63,
              "网络检测->上传日志完成，打开联系客服",
            ),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIScrollViewComponent],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIVerticalLayout],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [2, this.Vic],
        [5, this.Cwn],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Oic = new NetworkDetectionTips_1.NetworkDetectionTips()),
      await this.Oic.CreateByResourceIdAsync("UiItem_ErrSubmit", this.RootItem),
      this.Oic.SetTextureIconActive(!0),
      (this.Gic = new NetworkDetectionTips_1.NetworkDetectionTips()),
      await this.Gic.CreateByResourceIdAsync("UiItem_ErrSubmit", this.RootItem),
      this.Gic.SetTextureIconActive(!1);
  }
  OnStart() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.Cwn();
    }),
      this.ChildPopView?.PopItem.SetMaskResponsibleState(!1),
      (this.E9i = new ButtonItem_1.ButtonItem(this.GetItem(6))),
      this.E9i.SetFunction(this.fwn),
      (this.AZs = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.Nic,
      ));
    var e = this.GetNetworkDetectionLayoutItemData();
    this.AZs.RefreshByData(e),
      (this.kic =
        new LauncherLogUploadHandle_1.NetworkDetectionLogUploadHandle()),
      (this.kic.LogUploadFinishCallBack = this.$ic);
  }
  OnBeforeShow() {
    (this.qic = 0),
      this.Wic(),
      this.jic(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConfirmNetworkDetectionItem,
        this.$Lc,
      );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnConfirmNetworkDetectionItem,
      this.$Lc,
    );
  }
  Wic() {
    var e =
        LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.IsGlobalPlayer(),
      t = Info_1.Info.IsPlayInEditor,
      t = e || t;
    this.GetItem(0).SetUIActive(t),
      this.E9i.SetEnableClick(!t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          63,
          "网络检测->Login阶段初始化",
          ["isGlobalPlayer", e],
          ["needSelectServer", t],
        ),
      t ||
        (0 <
        (e =
          ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion())
          ?.length
          ? ((ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData =
              e[0]),
            this.$Lc())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Login",
              63,
              "网络检测->初始化服务器数据失败，服务器列表为空",
              ["serverList", e],
            ));
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.NetworkDetectionModel.ResetInterruptDetectionCheckTime();
  }
  OnBeforeDestroy() {
    this.Oic?.Destroy(),
      this.Gic?.Destroy(),
      this.E9i.Destroy(),
      this.AZs && (this.AZs.ClearChildren(), (this.AZs = void 0)),
      this.kic.InterruptUploadLog();
  }
  GetNetworkDetectionLayoutItemData() {
    var e = [];
    for (const i of LauncherNetworkDetectionDefine_1.networkDetectionEntries) {
      var t = { EntryData: i, Proceed: !1 };
      e.push(t);
    }
    return e;
  }
  l_i() {
    var e =
      ModelManager_1.ModelManager.NetworkDetectionModel.CurrentSelectServerData;
    switch (
      (this.E9i.SetEnableClick(void 0 !== e && 1 !== this.qic), this.qic)
    ) {
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(8),
          "NetworkDetection_Start_Tips",
        ),
          this.E9i.SetLocalTextNew("NetworkDetection_Start");
        break;
      case 1:
        this.GetText(8).SetText(""),
          this.E9i.SetLocalTextNew("NetworkDetection_Ing");
        break;
      case 2:
        var t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
            "NetworkDetection_Trace_Id",
          ),
          i =
            LauncherNetworkDetectionModel_1.LauncherNetworkDetectionModel.GenerateTraceCode();
        (this.Fic = t + " " + i),
          this.GetText(8).SetText(this.Fic),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 63, "网络检测->开始检测", [
              "检测编码:(traceId)",
              i,
            ]),
          this.E9i.SetLocalTextNew("NetworkDetection_Submit");
        break;
      default:
        this.E9i.SetLocalTextNew("NetworkDetection_Start");
    }
  }
  async Hic() {
    (this.qic = 1), this.l_i();
    for (const e of this.Bic) {
      if (!this.IsShowOrShowing) return;
      await e.Proceed();
    }
    this.IsShowOrShowing && ((this.qic = 2), this.l_i());
  }
}
exports.NetworkDetectionView = NetworkDetectionView;
//# sourceMappingURL=NetworkDetectionView.js.map
