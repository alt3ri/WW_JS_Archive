"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResDownLoadView = void 0);
const UE = require("ue"),
  DownLoadTabById_1 = require("../../../Core/Define/ConfigQuery/DownLoadTabById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil");
class ResDownLoadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.LR1 = -1),
      (this.ub1 = 0),
      (this.mb1 = void 0),
      (this.ebl = void 0),
      (this.TDe = void 0),
      (this.ZT1 = (e) => {
        (this.ub1 = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
          this.LR1,
        ).GetDownLoadState()),
          this.fb1();
      }),
      (this.wwe = () => {
        2 === this.ub1 &&
          ((ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo =
            -1),
          VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
            this.LR1,
          ).CancelDownload());
      }),
      (this.Pwe = () => {
        var e;
        0 < ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo &&
        this.LR1 !==
          ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo
          ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              "DownLoadTips_WaitOtherDown",
            )
          : 0 === this.ub1
            ? ((e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace()),
              VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.LR1) <= 0
                ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                    "HaveDownLoadResTips",
                  )
                : e < VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.LR1)
                  ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                      "DownLoadTips_NotEnough",
                    )
                  : (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
                      this.LR1,
                    ).Update(this.LR1),
                    (ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo =
                      this.LR1)))
            : 1 === this.ub1
              ? (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
                  this.LR1,
                ).Pause(),
                ModelManager_1.ModelManager.QuestResourceModel.CalcPrepareResource(),
                (ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo =
                  -1))
              : 2 === this.ub1 &&
                (VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
                  this.LR1,
                ).Update(this.LR1),
                (ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo =
                  this.LR1));
      }),
      (this.kqe = (e, t, i) => {
        this.ebl?.SetToggleState(0),
          (this.ebl = i),
          (this.LR1 = t),
          this.gb1(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [12, UE.UIText],
      [9, UE.UIText],
      [11, UE.UIText],
      [13, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [8, this.wwe],
        [10, this.Pwe],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ResDownLoadStateRefresh,
      this.ZT1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ResDownLoadStateRefresh,
      this.ZT1,
    );
  }
  OnStart() {
    this.ChildPopView?.PopItem?.SetMaskResponsibleState(!1),
      (this.mb1 = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        () => {
          var e = new ResDownLoadViewTabItem();
          return (e.OnClickExtendToggleCallBack = this.kqe), e;
        },
      )),
      (this.ub1 = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
        this.LR1,
      ).GetDownLoadState()),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.fb1();
      }, TimeUtil_1.TimeUtil.InverseMillisecond)),
      this.GetButton(8).RootUIComp.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.QuestResourceModel?.CalcPrepareResource();
    var e = [];
    e.push(3),
      e.push(4),
      this.mb1.RefreshByData(e, () => {
        var e;
        (0 <
          ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo &&
        ((1 ===
          (e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()) &&
          3 ===
            ModelManager_1.ModelManager.ResDownLoadModel
              .CurrentDownLoadVideo) ||
          (0 === e &&
            4 ===
              ModelManager_1.ModelManager.ResDownLoadModel
                .CurrentDownLoadVideo))
          ? this.mb1.GetLayoutItemByIndex(1)
          : this.mb1.GetLayoutItemByIndex(0)
        ).SelectToggle();
      }),
      this.fb1();
  }
  fb1() {
    switch (this.ub1) {
      case 0:
        this.wR1();
        break;
      case 3:
        this.GetItem(13).SetUIActive(!0),
          this.GetButton(10).RootUIComp.SetUIActive(!1),
          this.GetText(4).SetUIActive(!1),
          this.GetItem(5).SetUIActive(!1);
        break;
      case 1:
        var e = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
          this.LR1,
        ).GetDownLoadProgress();
        e[2]
          ? (this.GetText(7).SetUIActive(!0),
            this.GetText(4).SetUIActive(!1),
            this.GetItem(5).SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(12),
              "DownLoadText_Downing",
            ),
            (t = Number(e[1]) / Number(e[2])),
            (i = HotFixManager_1.HotFixManager.ByteConverter(e[3]) + "/s "),
            (e =
              "(" +
              HotFixManager_1.HotFixManager.ByteConverter(e[1]) +
              "/" +
              HotFixManager_1.HotFixManager.ByteConverter(e[2]) +
              ") "),
            (t =
              (this.GetTexture(6).SetFillAmount(t),
              (100 * t).toFixed(2).replace(/\.?0+$/, "") + "%")),
            this.GetText(7).SetText(i + e + t),
            this.GetButton(10).RootUIComp.SetUIActive(!0),
            this.GetItem(13).SetUIActive(!1),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(11),
              "DownLoadButton_Pause",
            ))
          : this.GetTexture(6).SetFillAmount(0);
        break;
      case 2:
        this.GetText(4).SetUIActive(!1),
          this.GetItem(5).SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(12),
            "DownLoadText_Pause",
          ),
          this.GetButton(10).RootUIComp.SetUIActive(!0),
          this.GetItem(13).SetUIActive(!1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(9),
            "DownLoadButton_Cancel",
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(11),
            "DownLoadButton_Continue",
          );
        var t,
          i = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
            this.LR1,
          ).GetDownLoadProgress();
        i[2]
          ? ((e = Number(i[1]) / Number(i[2])),
            (t =
              "(" +
              HotFixManager_1.HotFixManager.ByteConverter(i[1]) +
              "/" +
              HotFixManager_1.HotFixManager.ByteConverter(i[2]) +
              ") "),
            this.GetTexture(6).SetFillAmount(e),
            (i = (100 * e).toFixed(2).replace(/\.?0+$/, "") + "%"),
            this.GetText(7).SetUIActive(!0),
            this.GetText(7).SetText(t + i))
          : this.GetText(7).SetUIActive(!1);
    }
  }
  wR1() {
    var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    e > VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.LR1)
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "DownLoadText_LeftSpace",
          `<color=#36cd33>${HotFixManager_1.HotFixManager.ByteConverter(e)}</color>`,
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "DownLoadText_LeftSpace",
          `<color=#c25757>${HotFixManager_1.HotFixManager.ByteConverter(e)}</color>`,
        ),
      this.GetText(4).SetUIActive(!0),
      this.GetItem(5).SetUIActive(!1),
      this.GetButton(10).RootUIComp.SetUIActive(!0),
      this.GetItem(13).SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(11),
        "DownLoadButton_Down",
      );
  }
  gb1(e) {
    e = DownLoadTabById_1.configDownLoadTabById.GetConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.ContentTitle),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Content),
      (this.ub1 = VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(
        this.LR1,
      ).GetDownLoadState()),
      0 === this.ub1 &&
        (VideoResUpdate_1.VideoResUpdate.GetIsResPakDownloading(this.LR1)
          ? ((ModelManager_1.ModelManager.ResDownLoadModel.CurrentDownLoadVideo =
              this.LR1),
            (this.ub1 = 2))
          : VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.LR1) ===
              VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(this.LR1) &&
            (this.ub1 = 3)),
      this.fb1();
  }
  OnBeforeHide() {
    1 === this.ub1 &&
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
        "DownLoadTips_Downing",
      );
  }
}
exports.ResDownLoadView = ResDownLoadView;
class ResDownLoadViewTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.vua = 0),
      (this.SIr = 0),
      (this.OnClickExtendToggleCallBack = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    const t = this.GetExtendToggle(0);
    t.OnStateChange.Add((e) => {
      1 === e &&
        this.OnClickExtendToggleCallBack &&
        this.OnClickExtendToggleCallBack(this.vua, this.SIr, t);
    });
  }
  Refresh(e) {
    this.vua = e;
    (e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
      3 === this.vua
        ? (this.SIr = 1 === e ? 4 : 3)
        : (this.SIr = 1 === e ? 3 : 4),
      (e = DownLoadTabById_1.configDownLoadTabById.GetConfig(this.vua)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      (e = VideoResUpdate_1.VideoResUpdate.GetVideoResSize(this.SIr));
    e === VideoResUpdate_1.VideoResUpdate.GetVideoResSavedSize(this.SIr)
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "HaveDownLoadRes")
      : this.GetText(2).SetText(HotFixManager_1.HotFixManager.ByteConverter(e));
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, !0);
  }
}
//# sourceMappingURL=ResDownLoadView.js.map
