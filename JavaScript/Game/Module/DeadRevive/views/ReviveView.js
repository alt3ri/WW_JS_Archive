"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReviveView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ReviveById_1 = require("../../../../Core/Define/ConfigQuery/ReviveById"),
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
      (this.V2t = 0),
      (this.H2t = 0),
      (this.j2t = -1),
      (this.W2t = 0),
      (this.K2t = !1),
      (this.Q2t = void 0),
      (this.X2t = void 0),
      (this.$2t = void 0),
      (this.Y2t = void 0),
      (this.J2t = void 0),
      (this.z2t = !1),
      (this.Z2t = void 0),
      (this.eFt = !1),
      (this.tFt = () => {
        0 === this.j2t
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "CannotRevive",
            )
          : this.z2t
            ? DeadReviveController_1.DeadReviveController.ReviveRequest(
                !1,
                (i) => {
                  i && this.CloseMe();
                },
              )
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
      }),
      (this.iFt = () => {
        this.CloseMe(),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }),
      (this.oFt = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(98);
        i.SetTextArgs(this.Y2t, this.J2t),
          i.FunctionMap.set(2, () => {
            this.z2t
              ? DeadReviveController_1.DeadReviveController.ReviveRequest(
                  !0,
                  (i) => {
                    i && this.CloseMe();
                  },
                )
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
        [2, this.tFt],
        [3, this.iFt],
        [8, this.oFt],
      ]);
  }
  OnStart() {
    (this.Q2t = this.GetText(4)), (this.X2t = this.GetText(9));
    var i = this.GetItem(0),
      e = this.GetItem(1),
      t = this.GetButton(3),
      s = this.GetButton(2),
      s =
        ((this.$2t = s
          .GetOwner()
          .GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
        (this.eFt =
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()),
        this.eFt
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
            this.rFt()),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        ).ReviveId),
      t = ReviveById_1.configReviveById.GetConfig(s);
    t && (this.j2t = t.ReviveTimes),
      e.SetUIActive(!0),
      i.SetUIActive(!1),
      (this.H2t = ModelManager_1.ModelManager.DeadReviveModel.ReviveLimitTime);
    let r = !(this.z2t = !1);
    0 < this.H2t
      ? (this.Q2t.SetText(this.H2t.toString() + "s"),
        this.$2t.SetInteractable(!1))
      : this.H2t <= 0
        ? ((r = !1),
          (this.z2t = !0),
          (this.W2t = AUTO_REVIVE_TIME),
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
            this.X2t.SetUIActive(!0),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.X2t,
            "ReviveItemTips",
            this.W2t,
          ))
        : (LguiUtil_1.LguiUtil.SetLocalText(this.Q2t, "ReachReviveCount"),
          this.$2t.SetInteractable(!1)),
      this.Q2t.SetUIActive(r);
    this.GetText(5).ShowTextNew(
      ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveTitle ??
        "",
    );
    s = this.GetText(6);
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      s.ShowTextNew(
        ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
          ?.ReviveContent ?? "",
      ),
      (this.Z2t = new TrainingView_1.TrainingView()),
      this.Z2t.Show(this.GetHorizontalLayout(7));
  }
  rFt() {
    let i = -1;
    var e,
      t,
      s,
      r,
      o = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon,
      o = ReviveById_1.configReviveById.GetConfig(o.ReviveId),
      o =
        (o && (i = o.UseItemId),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i));
    o <= 0 ||
      ((e = this.GetButton(8)).GetRootComponent().SetUIActive(!0),
      (r = this.GetTexture(10)),
      (t = this.GetText(11)),
      (s = ModelManager_1.ModelManager.BuffItemModel),
      this.SetItemIcon(r, i),
      (this.Y2t = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i)),
      (r =
        ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
          i,
        )) < TimeUtil_1.TimeUtil.Minute
        ? (this.J2t =
            r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))
        : ((this.J2t =
            Math.floor(r / TimeUtil_1.TimeUtil.Minute) +
            ConfigManager_1.ConfigManager.TextConfig.GetTextById("MinuteText")),
          0 < (r = r % TimeUtil_1.TimeUtil.Minute) &&
            (this.J2t +=
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
    ((this.z2t || this.H2t < 0) && this.K2t) ||
      ((this.V2t += i),
      this.V2t >= TIME_SECOND && ((this.V2t = 0), this.nFt(), this.sFt()));
  }
  nFt() {
    this.eFt ||
      this.K2t ||
      (this.W2t <= 0
        ? ((this.K2t = !0),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
          this.tFt())
        : (--this.W2t,
          LguiUtil_1.LguiUtil.SetLocalText(
            this.X2t,
            "ReviveItemTips",
            this.W2t,
          )));
  }
  sFt() {
    this.H2t <= 0
      ? ((this.z2t = !0),
        this.Q2t.SetUIActive(!1),
        this.$2t.SetInteractable(!0))
      : (--this.H2t, this.Q2t.SetText(this.H2t.toString() + "s"));
  }
  OnBeforeDestroy() {
    this.Z2t && this.Z2t.Clear(),
      (this.Z2t = void 0),
      (this.Q2t = void 0),
      (this.X2t = void 0),
      (this.$2t = void 0),
      (this.Y2t = void 0),
      (this.J2t = void 0),
      (this.j2t = -1),
      (this.V2t = 0),
      (this.H2t = 0),
      (this.W2t = 0),
      (this.z2t = !1),
      (this.eFt = !1),
      (this.K2t = !1);
  }
}
exports.ReviveView = ReviveView;
//# sourceMappingURL=ReviveView.js.map
