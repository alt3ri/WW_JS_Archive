"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineInstanceDungeonDeathPanel = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
const OnlineModel_1 = require("../OnlineModel");
class OnlineInstanceDungeonDeathPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Xli = new Map()),
      (this.YGi = () => {
        let e;
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
      (this.JGi = () => {
        let e, n;
        ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? ModelManager_1.ModelManager.OnlineModel.AllowInitiate
            ? ((e = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()),
              (n =
                ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime) >
              0
                ? e
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "NextInviteTime",
                      TimeUtil_1.TimeUtil.GetCoolDown(n),
                    )
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "NextSuggestTime",
                      TimeUtil_1.TimeUtil.GetCoolDown(n),
                    )
                : ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
                      ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
                    ) !== 2 && e
                  ? OnlineController_1.OnlineController.InviteRechallengeRequest()
                  : OnlineController_1.OnlineController.ApplyRechallengeRequest(
                      Protocol_1.Aki.Protocol.h3s.Proto_Dead,
                    ))
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "CannotInvite",
              )
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "NeedAllDeadToChallengeAgain",
            );
      }),
      (this.$li = (e, n) => {
        e = this.Xli.get(e);
        e && this.Yli(n, e);
      }),
      (this.zGi = () => {
        this.Jli();
      }),
      this.CreateThenShowByResourceIdAsync(
        "UiView_OnlineDeath_Prefab",
        e,
      ).finally(() => {
        this.InitPanel();
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
    ]),
      (this.BtnBindInfo = [
        [1, this.YGi],
        [2, this.JGi],
      ]);
  }
  OnStart() {
    this.AddEventListener();
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
  InitPanel() {
    this.Jli(), this.ZGi();
  }
  ResetData() {
    this.Xli && this.Xli.clear();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$li,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnOtherPlayerDead,
        this.zGi,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$li,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnOtherPlayerDead,
        this.zGi,
      );
  }
  Jli() {
    const e = this.GetText(0);
    const n = this.GetItem(3);
    const t = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    let i = !0;
    for (const _ of t)
      if (
        !ModelManager_1.ModelManager.DeadReviveModel.IsPlayerDead(
          _.GetPlayerId(),
        )
      ) {
        i = !1;
        break;
      }
    if (t.length <= 1 || !i) e.SetUIActive(!0), n.SetUIActive(!1);
    else {
      e.SetUIActive(!1), n.SetUIActive(!0);
      const r = this.GetSprite(4);
      const l = this.GetSprite(5);
      const o =
        (r.SetUIActive(!1),
        l.SetUIActive(!1),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId());
      for (const g of t) {
        var a;
        const s = g.GetPlayerId();
        s !== o &&
          ((a =
            ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
              s,
            )),
          r.bIsUIActive
            ? l.bIsUIActive ||
              (l.SetUIActive(!0), this.Yli(a, l), this.Xli.set(s, l))
            : (r.SetUIActive(!0), this.Yli(a, r), this.Xli.set(s, r)));
      }
    }
  }
  ZGi() {
    ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "ChallengeAgain")
      : LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(6),
          "SuggestChallengeAgain",
        );
  }
  Yli(e, n) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      OnlineModel_1.onlineContinuingChallengeIcon[e],
    );
    StringUtils_1.StringUtils.IsEmpty(e) || this.SetSpriteByPath(e, n, !1);
  }
}
exports.OnlineInstanceDungeonDeathPanel = OnlineInstanceDungeonDeathPanel;
// # sourceMappingURL=OnlineInstanceDungeonDeathPanel.js.map
