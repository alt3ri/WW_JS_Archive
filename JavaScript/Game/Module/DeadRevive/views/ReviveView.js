"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReviveView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  TrainingView_1 = require("../../TrainingDegree/TrainingView"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DeadReviveController_1 = require("../DeadReviveController"),
  TIME_SECOND = 1e3,
  AUTO_REVIVE_TIME = 60;
class ReviveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.HFt = 0),
      (this.jFt = 0),
      (this.WFt = -1),
      (this.KFt = 0),
      (this.QFt = !1),
      (this.XFt = void 0),
      (this.$Ft = void 0),
      (this.YFt = void 0),
      (this.JFt = void 0),
      (this.zFt = void 0),
      (this.ZFt = !1),
      (this.e3t = void 0),
      (this.t3t = !1),
      (this.i3t = () => {
        0 === this.WFt
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "CannotRevive",
            )
          : this.ZFt
            ? DeadReviveController_1.DeadReviveController.ReviveRequest(!1)
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
      }),
      (this.o3t = () => {
        this.CloseMe(),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }),
      (this.r3t = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(98);
        i.SetTextArgs(this.JFt, this.zFt),
          i.FunctionMap.set(2, () => {
            this.ZFt
              ? DeadReviveController_1.DeadReviveController.ReviveRequest(!0)
              : Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIHorizontalLayout],
      [8, UE.UIButtonComponent],
      [9, UE.UIText],
      [10, UE.UITexture],
      [11, UE.UIText],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [2, this.i3t],
        [3, this.o3t],
        [8, this.r3t],
      ]);
  }
  OnStart() {
    (this.XFt = this.GetText(4)), (this.$Ft = this.GetText(9));
    var i = this.GetItem(0),
      e = this.GetItem(1),
      t = this.GetButton(3),
      s = this.GetButton(2),
      s =
        ((this.YFt = s
          .GetOwner()
          .GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
        (this.t3t =
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()),
        this.t3t
          ? ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            (this.GetButton(2).GetRootComponent().SetUIActive(!1),
            LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "ExitInstance"),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(6),
              "MatchInstanceDead",
            ))
          : (s
              .GetRootComponent()
              .SetAnchorOffset(t.GetRootComponent().GetAnchorOffset()),
            t.GetRootComponent().SetUIActive(!1),
            this.n3t()),
        ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig);
    s && (this.WFt = s.ReviveTimes),
      e.SetUIActive(!0),
      i.SetUIActive(!1),
      (this.jFt = ModelManager_1.ModelManager.DeadReviveModel.ReviveLimitTime);
    let r = !(this.ZFt = !1);
    0 < this.jFt
      ? (this.XFt.SetText(this.jFt.toString() + "s"),
        this.YFt.SetInteractable(!1))
      : this.jFt <= 0
        ? ((r = !1),
          (this.ZFt = !0),
          (this.KFt = AUTO_REVIVE_TIME),
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
            this.$Ft.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.$Ft,
            "ReviveItemTips",
            this.KFt,
          ))
        : (LguiUtil_1.LguiUtil.SetLocalText(this.XFt, "ReachReviveCount"),
          this.YFt.SetInteractable(!1)),
      this.XFt.SetUIActive(r);
    this.GetText(5).ShowTextNew(
      ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveTitle ??
        "",
    );
    t = this.GetText(6);
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      t.ShowTextNew(
        ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
          ?.ReviveContent ?? "",
      ),
      (this.e3t = new TrainingView_1.TrainingView()),
      this.e3t.Show(this.GetHorizontalLayout(7));
  }
  n3t() {
    let i = -1;
    var e,
      t,
      s,
      r,
      o = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig,
      o =
        (o && (i = o.UseItemId),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i));
    o <= 0 ||
      ((e = this.GetButton(8)).GetRootComponent().SetUIActive(!0),
      (r = this.GetTexture(10)),
      (t = this.GetText(11)),
      (s = ModelManager_1.ModelManager.BuffItemModel),
      this.SetItemIcon(r, i),
      (this.JFt = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i)),
      (r =
        ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
          i,
        )) < TimeUtil_1.TimeUtil.Minute
        ? (this.zFt =
            r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))
        : ((this.zFt =
            Math.floor(r / TimeUtil_1.TimeUtil.Minute) +
            ConfigManager_1.ConfigManager.TextConfig.GetTextById("MinuteText")),
          0 < (r = r % TimeUtil_1.TimeUtil.Minute) &&
            (this.zFt +=
              r +
              ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))),
      0 < s.GetBuffItemRemainCdTime(i)
        ? (LguiUtil_1.LguiUtil.SetLocalText(t, "ReviveItemCd"),
          e
            .GetOwner()
            .GetComponentByClass(UE.UIInteractionGroup.StaticClass())
            .SetInteractable(!1))
        : t.SetText(o.toString()));
  }
  OnTick(i) {
    ((this.ZFt || this.jFt < 0) && this.QFt) ||
      ((this.HFt += i),
      this.HFt >= TIME_SECOND && ((this.HFt = 0), this.s3t(), this.a3t()));
  }
  s3t() {
    this.t3t ||
      this.QFt ||
      (this.KFt <= 0
        ? ((this.QFt = !0),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
          this.i3t())
        : (--this.KFt,
          LguiUtil_1.LguiUtil.SetLocalText(
            this.$Ft,
            "ReviveItemTips",
            this.KFt,
          )));
  }
  a3t() {
    this.jFt <= 0
      ? ((this.ZFt = !0),
        this.XFt.SetUIActive(!1),
        this.YFt.SetInteractable(!0))
      : (--this.jFt, this.XFt.SetText(this.jFt.toString() + "s"));
  }
  OnBeforeDestroy() {
    this.e3t && this.e3t.Clear(),
      (this.e3t = void 0),
      (this.XFt = void 0),
      (this.$Ft = void 0),
      (this.YFt = void 0),
      (this.JFt = void 0),
      (this.zFt = void 0),
      (this.WFt = -1),
      (this.HFt = 0),
      (this.jFt = 0),
      (this.KFt = 0),
      (this.ZFt = !1),
      (this.t3t = !1),
      (this.QFt = !1);
  }
}
exports.ReviveView = ReviveView;
//# sourceMappingURL=ReviveView.js.map
