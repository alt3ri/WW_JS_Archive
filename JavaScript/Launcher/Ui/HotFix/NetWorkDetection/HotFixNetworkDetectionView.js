"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixNetworkDetectionView = void 0);
const UE = require("ue"),
  LauncherConfigLib_1 = require("../../../Define/LauncherConfigLib"),
  LauncherLogUploadHandle_1 = require("../../../LogUpload/LauncherLogUploadHandle"),
  LauncherNetworkDetectionController_1 = require("../../../NetworkDetection/LauncherNetworkDetectionController"),
  LauncherNetworkDetectionModel_1 = require("../../../NetworkDetection/LauncherNetworkDetectionModel"),
  HotPatchInputDefine_1 = require("../../../PlayerInput/HotPatchInputDefine"),
  HotPatchInputManager_1 = require("../../../PlayerInput/HotPatchInputManager"),
  LauncherLog_1 = require("../../../Util/LauncherLog"),
  LaunchComponentsAction_1 = require("../../LaunchComponentsAction"),
  HotFixButtonItem_1 = require("../HotFixButtonItem"),
  HotFixLayout_1 = require("../HotFixLayout"),
  HotFixManager_1 = require("../HotFixManager"),
  HotFixNetworkDetectionEntryItem_1 = require("./HotFixNetworkDetectionEntryItem"),
  HotFixNetworkDetectionModel_1 = require("./HotFixNetworkDetectionModel"),
  HotFixNetworkDetectionTips_1 = require("./HotFixNetworkDetectionTips"),
  HotFixNetworkDetectSelectView_1 = require("./SelectServer/HotFixNetworkDetectSelectView");
class HotFixNetworkDetectionView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.hrc = void 0),
      (this.lrc = []),
      (this.kic = void 0),
      (this.qic = 0),
      (this.E9i = void 0),
      (this.Fic = ""),
      (this._rc = void 0),
      (this.crc = void 0),
      (this.OnBackBtnClick = () => {
        1 === this.qic ? this.crc.ShowTip("NetworkDetection_Ing") : this.urc();
      }),
      (this.Vic = () => {
        1 === this.qic || 3 === this.qic
          ? this.crc.ShowTip("NetworkDetection_Ing")
          : this.drc(!0);
      }),
      (this.jic = () => {
        var t =
          HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
            .CurrentSelectServerData;
        void 0 === t
          ? this.GetText(4).SetText("")
          : (this.GetText(4).SetText(t.name),
            LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.SetDetectionConfig(
              t,
            )),
          this.l_i();
      }),
      (this.OnLeftBtnClick = () => {
        1 === this.qic ? this.crc.ShowTip("NetworkDetection_Ing") : this.urc();
      }),
      (this.fwn = () => {
        switch (this.qic) {
          case 0:
            this.Hic();
            break;
          case 1:
            return;
          case 2:
            var t = this.hrc.GetDataList(),
              t =
                HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.GetFinalErrorCodeString(
                  t,
                ),
              t =
                this.Fic +
                `
` +
                t;
            UE.LGUIBPLibrary.ClipBoardCopy(t),
              this.crc.SetTipsLocalText("NetworkDetection_Submiting"),
              this.mrc(!0),
              this.kic.UploadLog(),
              (this.qic = 3);
        }
      }),
      (this.$ic = () => {
        (this.qic = 4),
          this.mrc(!1),
          LauncherLog_1.LauncherLog.Debug(
            "网络检测->上传日志完成，热更阶段不打开客服界面",
          ),
          this.urc();
      }),
      (this.frc = () => {
        var t =
          HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
            .CurrentUiSelectSeverData;
        void 0 !== t &&
          (LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.SetDetectionConfig(
            t,
          )
            ? ((HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentSelectServerData =
                t),
              this.jic())
            : ((HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentSelectServerData =
                void 0),
              this.crc.ShowTip("NetworkDetection_Error")));
      }),
      (this.$ct = (t, e) => {
        0 !== t &&
          HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向 === e &&
          this.GetUiScrollViewWithScrollBar(6).SetVelocity(
            t * HotPatchInputDefine_1.SCROLLBAR_INTERVAL,
          );
      });
  }
  async LoadAsync(t) {
    await this.AttachElementAsyncFromPath(
      101,
      "/Game/Aki/UI/Module/HotFix/Prefab/UiView_ServerSelection.UiView_ServerSelection",
      HotFixNetworkDetectSelectView_1.HotFixNetworkDetectSelectView,
    ),
      this.drc(!1),
      (this.GetElement(101).OnSelectServerCallBack = this.frc),
      (this._rc = await this.AttachElementAsyncFromPath(
        102,
        "/Game/Aki/UI/Module/HotFix/Prefab/UiItem_ErrSubmit.UiItem_ErrSubmit",
        HotFixNetworkDetectionTips_1.HotFixNetworkDetectionTips,
      )),
      this._rc.SetActive(!1),
      this._rc.InitTickManager(t),
      (this.crc = await this.AttachElementAsyncFromPath(
        103,
        "/Game/Aki/UI/Module/HotFix/Prefab/UiItem_ErrSubmit.UiItem_ErrSubmit",
        HotFixNetworkDetectionTips_1.HotFixNetworkDetectionTips,
      )),
      this.crc.SetActive(!1),
      this.crc.InitTickManager(t);
  }
  OnStart() {
    this.GetButton(1).OnClickCallBack.Bind(this.OnBackBtnClick),
      this.GetButton(5).OnClickCallBack.Bind(this.Vic),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(2),
        "NetworkDetection_Title",
      ),
      (this.E9i = this.AttachElement(9, HotFixButtonItem_1.HotFixButtonItem)),
      this.E9i.BindClickCallback(this.fwn);
    var t = this.AttachElement(8, HotFixButtonItem_1.HotFixButtonItem),
      t =
        (t.SetLocalText("NetworkDetection_Cancel"),
        t.BindClickCallback(this.OnLeftBtnClick),
        this.GetLayout(10)),
      e = this.GetItem(7).GetOwner();
    (this.hrc = new HotFixLayout_1.HotFixLayout(
      t,
      () => {
        var t =
          new HotFixNetworkDetectionEntryItem_1.HotFixNetworkDetectionEntryItem();
        return this.lrc.push(t), t;
      },
      e,
    )),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAxis(
        HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向,
        this.$ct,
      );
  }
  OnShow() {
    this.qic = 0;
    var t =
      HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.GetNetworkDetectionLayoutItemData();
    this.hrc.RefreshByData(t),
      (this.kic =
        new LauncherLogUploadHandle_1.NetworkDetectionLogUploadHandle()),
      (this.kic.LogUploadFinishCallBack = this.$ic),
      this.Wic(),
      this.jic();
  }
  OnHide() {
    HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.ResetInterruptDetectionCheckTime();
  }
  OnBeforeDestroy() {
    this.kic?.InterruptUploadLog(),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAxis(
        HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向,
        this.$ct,
      );
  }
  Wic() {
    var t =
        LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.IsGlobalPlayer(),
      e = t;
    this.GetItem(3).SetUIActive(e),
      this.E9i.SetEnableClick(!e),
      LauncherLog_1.LauncherLog.Info(
        "网络检测->Launcher阶段初始化",
        ["isGlobalPlayer", t],
        ["needSelectServer", e],
      ),
      e ||
        (0 <
        (t =
          HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.GetLoginServersByClientRegion())
          ?.length
          ? (HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel.CurrentSelectServerData =
              t[0])
          : LauncherLog_1.LauncherLog.Error(
              "网络检测->初始化服务器数据失败，服务器列表为空",
              ["serverList", t],
            ));
  }
  drc(t) {
    this.GetElement(101).SetActive(t);
  }
  mrc(t) {
    this.GetElement(102).SetActive(t);
  }
  l_i() {
    var t =
      HotFixNetworkDetectionModel_1.HotFixNetworkDetectionModel
        .CurrentSelectServerData;
    switch (
      (this.GetButton(9).SetSelfInteractive(void 0 !== t && 1 !== this.qic),
      this.qic)
    ) {
      case 0:
        HotFixManager_1.HotFixManager.SetLocalText(
          this.GetText(11),
          "NetworkDetection_Start_Tips",
        ),
          this.E9i.SetLocalText("NetworkDetection_Start");
        break;
      case 1:
        this.GetText(11).SetText(""),
          this.E9i.SetLocalText("NetworkDetection_Ing");
        break;
      case 2:
        var e = LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
            "NetworkDetection_Trace_Id",
          ),
          i =
            LauncherNetworkDetectionModel_1.LauncherNetworkDetectionModel.GenerateTraceCode();
        (this.Fic = e + " " + i),
          this.GetText(11).SetText(this.Fic),
          LauncherLog_1.LauncherLog.Info("网络检测->检测完成", [
            "检测编码:(traceId)",
            i,
          ]),
          this.E9i.SetLocalText("NetworkDetection_Hotfix_Submit");
        break;
      default:
        this.E9i.SetLocalText("NetworkDetection_Start");
    }
  }
  urc() {
    this.SetActive(!1),
      this.mrc(!1),
      this.crc.SetActive(!1),
      this.kic.InterruptUploadLog();
  }
  async Hic() {
    (this.qic = 1), this.l_i();
    for (const t of this.lrc) {
      if (this.IsClear) return;
      await t.Proceed();
    }
    this.IsClear || ((this.qic = 2), this.l_i());
  }
}
exports.HotFixNetworkDetectionView = HotFixNetworkDetectionView;
//# sourceMappingURL=HotFixNetworkDetectionView.js.map
