"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiReviveView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  OnlineModel_1 = require("../../Online/OnlineModel"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TIME_SECOND = 1e3,
  AUTO_REVIVE_TIME = 60;
class MultiReviveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.X1i = new Map()),
      (this.xUn = ""),
      (this.wUn = ""),
      (this.WFt = -1),
      (this.BUn = 0),
      (this.bUn = void 0),
      (this.qUn = void 0),
      (this.GUn = () => {
        0 === this.WFt
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "CannotRevive",
            )
          : this.NUn(!1);
      }),
      (this.OUn = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(98);
        e.SetTextArgs(this.xUn, this.wUn),
          e.FunctionMap.set(2, () => {
            this.NUn(!0);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.YNi = () => {
        var e;
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              108,
            )).FunctionMap.set(2, () => {
              InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ));
      }),
      (this.JNi = () => {
        var e, i;
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? ModelManager_1.ModelManager.OnlineModel.AllowInitiate
            ? ((e = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()),
              0 <
              (i = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime)
                ? e
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "NextInviteTime",
                      TimeUtil_1.TimeUtil.GetCoolDown(i),
                    )
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "NextSuggestTime",
                      TimeUtil_1.TimeUtil.GetCoolDown(i),
                    )
                : 2 !==
                      ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
                        ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
                      ) && e
                  ? ControllerHolder_1.ControllerHolder.OnlineController.InviteRechallengeRequest()
                  : ControllerHolder_1.ControllerHolder.OnlineController.ApplyRechallengeRequest(
                      Protocol_1.Aki.Protocol.o8s.Proto_Dead,
                    ))
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "CannotInvite",
              )
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NeedAllDeadToChallengeAgain",
            );
      }),
      (this.$1i = (e, i) => {
        e = this.X1i.get(e);
        e && this.Y1i(i, e);
      }),
      (this.t$s = () => {
        this.J1i();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UITexture],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.YNi],
        [2, this.JNi],
        [7, this.GUn],
        [9, this.OUn],
      ]);
  }
  OnAddEventListener() {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlayerChallengeStateChange,
        this.$1i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.t$s,
      ));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$1i,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlayerChallengeStateChange,
        this.$1i,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.t$s,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnTeamLivingStateChange,
          this.t$s,
        );
  }
  OnBeforeShow() {
    var e =
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    this.GetButton(1).RootUIComp.SetUIActive(e),
      this.GetButton(2).RootUIComp.SetUIActive(e),
      this.GetButton(7).RootUIComp.SetUIActive(!e),
      e
        ? (this.J1i(), this.ZNi())
        : (this.GetItem(3).SetUIActive(!1), this.kUn());
  }
  OnBeforeDestroy() {
    this.LWs();
  }
  LWs() {
    (this.WFt = -1),
      (this.BUn = 0),
      (this.qUn = void 0),
      (this.xUn = ""),
      (this.wUn = ""),
      this.bUn &&
        (TimerSystem_1.TimerSystem.Remove(this.bUn), (this.bUn = void 0)),
      this.X1i && this.X1i.clear();
  }
  kUn() {
    var e = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig;
    e && (this.WFt = e.ReviveTimes),
      (this.BUn = AUTO_REVIVE_TIME),
      (this.qUn = this.GetText(8)),
      LguiUtil_1.LguiUtil.SetLocalText(this.qUn, "ReviveItemTips", this.BUn),
      (this.bUn = TimerSystem_1.TimerSystem.Forever(() => {
        this.BUn <= 0
          ? (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
            this.GUn(),
            this.bUn &&
              (TimerSystem_1.TimerSystem.Remove(this.bUn), (this.bUn = void 0)))
          : (--this.BUn,
            LguiUtil_1.LguiUtil.SetLocalText(
              this.qUn,
              "ReviveItemTips",
              this.BUn,
            ));
      }, TIME_SECOND));
    let i = -1;
    var t,
      n,
      r,
      e = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig,
      e =
        (e && (i = e.UseItemId),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i));
    e <= 0 ||
      (this.GetButton(9).RootUIComp.SetUIActive(!0),
      (r = this.GetTexture(10)),
      (t = this.GetText(11)),
      (n = ModelManager_1.ModelManager.BuffItemModel),
      this.SetItemIcon(r, i),
      (this.xUn = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i)),
      (r =
        ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
          i,
        )) < TimeUtil_1.TimeUtil.Minute
        ? (this.wUn =
            r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))
        : ((this.wUn =
            Math.floor(r / TimeUtil_1.TimeUtil.Minute) +
            ConfigManager_1.ConfigManager.TextConfig.GetTextById("MinuteText")),
          0 < (r = r % TimeUtil_1.TimeUtil.Minute) &&
            (this.wUn +=
              r +
              ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second"))),
      0 < n.GetBuffItemRemainCdTime(i)
        ? (LguiUtil_1.LguiUtil.SetLocalText(t, "ReviveItemCd"),
          this.GetButton(9)
            .GetOwner()
            .GetComponentByClass(UE.UIInteractionGroup.StaticClass())
            .SetInteractable(!1))
        : t.SetText(e.toString()));
  }
  NUn(e) {
    ControllerHolder_1.ControllerHolder.DeadReviveController.ReviveRequest(
      e,
      (e) => {
        e && this.LWs();
      },
    );
  }
  J1i() {
    var e = this.GetText(0),
      i = this.GetItem(3),
      t = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    let n = !0;
    for (const _ of t)
      if (
        1 ===
        ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(
          _.GetPlayerId(),
          1,
        )
      ) {
        n = !1;
        break;
      }
    if (t.length <= 1 || !n) e.SetUIActive(!0), i.SetUIActive(!1);
    else {
      e.SetUIActive(!1), i.SetUIActive(!0);
      var r = this.GetSprite(4),
        o = this.GetSprite(5),
        s =
          (r.SetUIActive(!1),
          o.SetUIActive(!1),
          ModelManager_1.ModelManager.PlayerInfoModel.GetId());
      for (const h of t) {
        var l,
          a = h.GetPlayerId();
        a !== s &&
          ((l =
            ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
              a,
            )),
          r.bIsUIActive
            ? o.bIsUIActive ||
              (o.SetUIActive(!0), this.Y1i(l, o), this.X1i.set(a, o))
            : (r.SetUIActive(!0), this.Y1i(l, r), this.X1i.set(a, r)));
      }
    }
  }
  ZNi() {
    ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "ChallengeAgain")
      : LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(6),
          "SuggestChallengeAgain",
        );
  }
  Y1i(e, i) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      OnlineModel_1.onlineContinuingChallengeIcon[e],
    );
    StringUtils_1.StringUtils.IsEmpty(e) || this.SetSpriteByPath(e, i, !1);
  }
}
exports.MultiReviveView = MultiReviveView;
//# sourceMappingURL=MultiReviveView.js.map
