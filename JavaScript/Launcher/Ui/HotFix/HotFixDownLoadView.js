"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixDownLoadView = void 0);
const LauncherConfigLib_1 = require("../../Define/LauncherConfigLib"),
  VideoResUpdate_1 = require("../../DiffPatch/Update/VideoResUpdate"),
  HotPatchInputDefine_1 = require("../../PlayerInput/HotPatchInputDefine"),
  HotPatchInputManager_1 = require("../../PlayerInput/HotPatchInputManager"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LaunchComponentsAction_1 = require("../LaunchComponentsAction"),
  HotFixBtnUiItem_1 = require("./HotFixBtnUiItem"),
  HotFixLayout_1 = require("./HotFixLayout"),
  HotFixManager_1 = require("./HotFixManager");
class HotFixDownLoadView extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.db1 = -1),
      (this.bb1 = void 0),
      (this.ebl = void 0),
      (this.SetFreeSpaceTipsPopActiveCallBack = void 0),
      (this.kqe = (t, e) => {
        this.ebl?.SetToggleState(0), (this.ebl = e), this.gb1(t);
      }),
      (this.$ct = (t, e) => {
        0 !== t &&
          HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向 === e &&
          this.GetUiScrollViewWithScrollBar(12).SetVelocity(
            t * HotPatchInputDefine_1.SCROLLBAR_INTERVAL,
          );
      }),
      (this.Srt = (t, e) => {
        t &&
          (("手柄左边上键" !== e && "手柄左摇杆上" !== e) || this.dVc(),
          ("手柄左边下键" !== e && "手柄左摇杆下" !== e) || this.uVc());
      });
  }
  OnStart() {
    var t = this.AttachElement(9, HotFixBtnUiItem_1.HotFixBtnUiItem),
      t =
        (t.BindClickCallback(() => {
          LauncherLog_1.LauncherLog.Info(
            "HotFixDownLoadView ClickBtnCallback",
            ["this.SelectTabIndex", this.db1],
          ),
            (HotFixManager_1.HotFixManager.DownLoadType = this.db1);
          var t = Number(
              VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.db1),
            ),
            e =
              ((HotFixManager_1.HotFixManager.NeedDownLoadByte = t),
              VideoResUpdate_1.VideoResUpdate.GetFreeSpace());
          t <= e
            ? HotFixManager_1.HotFixManager.DownLoadViewChoseDoneCallBack?.()
            : this.SetFreeSpaceTipsPopActive(!0),
            this.SetActive(!1);
        }),
        t.SetText("Download_DownLoadBtnText"),
        this.GetLayout(1)),
      e = this.GetItem(0).GetOwner();
    (this.bb1 = new HotFixLayout_1.HotFixLayout(
      t,
      () => {
        var t = new HotFixDownLoadTabItem();
        return (t.OnClickExtendToggleCallBack = this.kqe), t;
      },
      e,
    )),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(11),
        "PrefabTextItem_1851234659_Text",
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAxis(
        HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向,
        this.$ct,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左摇杆上",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左摇杆下",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左边上键",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.RegisterInputAction(
        "手柄左边下键",
        this.Srt,
      );
  }
  OnBeforeDestroy() {
    HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAxis(
      HotPatchInputDefine_1.axisMappings.手柄右摇杆垂直方向,
      this.$ct,
    ),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
        "手柄左摇杆上",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
        "手柄左摇杆下",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
        "手柄左边上键",
        this.Srt,
      ),
      HotPatchInputManager_1.HotPatchInputManager.UnRegisterInputAction(
        "手柄左边下键",
        this.Srt,
      );
  }
  OnShow() {
    var e = [];
    for (let t = 1; t <= 2; t++) {
      var i = { TabId: t };
      e.push(i);
    }
    this.bb1.RefreshByData(e), this.bb1.GetLayoutItemByIndex(0).Select();
  }
  gb1(t) {
    this.db1 = t;
    (t = LauncherConfigLib_1.LauncherConfigLib.GetDownLoadTabConfig(t + "")),
      HotFixManager_1.HotFixManager.SetLocalText(
        this.GetText(2),
        t.ContentTitle,
      ),
      HotFixManager_1.HotFixManager.SetLocalText(this.GetText(3), t.Content),
      (t = VideoResUpdate_1.VideoResUpdate.GetFreeSpace());
    t > VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.db1)
      ? HotFixManager_1.HotFixManager.SetLocalText(
          this.GetText(4),
          "DownLoadText_LeftSpace",
          `<color=#36cd33>${HotFixManager_1.HotFixManager.ByteConverter(t)}</color>`,
        )
      : HotFixManager_1.HotFixManager.SetLocalText(
          this.GetText(4),
          "DownLoadText_LeftSpace",
          `<color=#c25757>${HotFixManager_1.HotFixManager.ByteConverter(t)}</color>`,
        );
  }
  SetFreeSpaceTipsPopActive(t) {
    this.SetFreeSpaceTipsPopActiveCallBack?.(t),
      LauncherLog_1.LauncherLog.Info(
        "SetHotFixDownLoadFreeSpaceTipsViewActive",
        ["value", t],
      );
  }
  dVc() {
    this.oL1(Math.max(0, this.db1 - 1 - 1));
  }
  uVc() {
    this.oL1(Math.min(1, this.db1 - 1 + 1));
  }
  oL1(t) {
    this.bb1.GetLayoutItemByIndex(t).Select();
  }
}
exports.HotFixDownLoadView = HotFixDownLoadView;
class HotFixDownLoadTabItem extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.vua = 0),
      (this.OnClickExtendToggleCallBack = void 0);
  }
  SetRootActor(t) {
    this.SetRootActorLaunchComponentsAction(t);
  }
  OnStart() {
    const e = this.GetExtendToggle(0);
    e.OnStateChange.Add((t) => {
      1 === t &&
        this.OnClickExtendToggleCallBack &&
        this.OnClickExtendToggleCallBack(this.vua, e);
    });
  }
  Refresh(t) {
    this.vua = t.TabId;
    (t = LauncherConfigLib_1.LauncherConfigLib.GetDownLoadTabConfig(
      this.vua + "",
    )),
      HotFixManager_1.HotFixManager.SetLocalText(this.GetText(1), t?.Title),
      (t = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.vua));
    this.GetText(2).SetText(HotFixManager_1.HotFixManager.ByteConverter(t)),
      LauncherLog_1.LauncherLog.Info("HotFixDownLoadTabItem", ["byte", t]);
  }
  Select() {
    this.GetExtendToggle(0).SetToggleState(1, !0);
  }
}
//# sourceMappingURL=HotFixDownLoadView.js.map
