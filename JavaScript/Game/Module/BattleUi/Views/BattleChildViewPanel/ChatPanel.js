"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ChatDefine_1 = require("../../../Chat/ChatDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ChatRowItem_1 = require("../ChatRowItem"),
  CommonKeyItem_1 = require("../KeyItem/CommonKeyItem"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ChatPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.oze = new Map()),
      (this.OJs = []),
      (this.rze = void 0),
      (this.nze = 0),
      (this.sze = void 0),
      (this.aze = !1),
      (this.hze = void 0),
      (this.SPe = void 0),
      (this.FGn = (e) => {
        2 === this.GetOperationType() &&
          this.gze().then(
            () => {
              this.oze.size <= 0
                ? this.Pze(!1)
                : (this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY),
                  (e &&
                    !ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) ||
                    this.uze());
            },
            () => {},
          );
      }),
      (this.XBo = () => {
        this.dze();
      }),
      (this.Eze = () => {
        Info_1.Info.IsInTouch() || (this.Sze(), this.yze());
      }),
      (this.Ize = () => {
        UiManager_1.UiManager.IsViewShow("ChatView") ||
          UiManager_1.UiManager.OpenView("ChatView");
      }),
      (this.bMe = (e, t) => {
        if (e === InputMappingsDefine_1.actionMappings.环境特性) {
          if (0 === t)
            switch (
              ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ??
              0
            ) {
              case 1:
                this.Tze();
                break;
              case 2:
                this.Lze();
                break;
              case 3:
                this.mXn();
                break;
              case 4:
                this.Dze();
                break;
              case 5:
                this.dXa();
            }
        } else
          e === InputMappingsDefine_1.actionMappings.组合主键 && this.Rze(t);
      }),
      (this.Uze = () => {
        this.fze();
      }),
      (this.Aze = () => {
        this.SPe.StopCurrentSequence(), this.SPe.PlaySequencePurely("Close");
      });
  }
  InitializeTemp() {
    this.nze =
      CommonParamById_1.configCommonParamById.GetIntConfig("ChatViewTimeDown");
    var e = this.GetOperationType();
    2 === e &&
      (this.gze().then(
        () => {
          !(this.oze.size <= 0) &&
          ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()
            ? (this.uze(), this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY))
            : this.Pze(!1);
        },
        () => {},
      ),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(3),
      ))),
      1 === e &&
        (RedDotController_1.RedDotController.BindRedDot(
          "ChatView",
          this.GetItem(1),
        ),
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.GetItem(2),
        ))),
      this.SPe.BindSequenceCloseEvent((e) => {
        "Close" === e && this.Pze(!1);
      });
  }
  Reset() {
    super.Reset(),
      this.xze(),
      this.wze(),
      1 === this.GetOperationType() &&
        RedDotController_1.RedDotController.UnBindRedDot("ChatView");
  }
  OnRegisterComponent() {
    var e = this.GetOperationType();
    2 === e
      ? ((this.ComponentRegisterInfos = [
          [0, UE.UIButtonComponent],
          [1, UE.UIScrollViewWithScrollbarComponent],
          [2, UE.UIItem],
          [3, UE.UIItem],
          [4, UE.UIItem],
          [5, UE.UIItem],
          [7, UE.UIItem],
          [8, UE.UIItem],
          [9, UE.UIText],
        ]),
        (this.BtnBindInfo = [[0, this.Ize]]))
      : 1 === e &&
        ((this.ComponentRegisterInfos = [
          [0, UE.UIButtonComponent],
          [1, UE.UIItem],
          [2, UE.UIItem],
        ]),
        (this.BtnBindInfo = [[0, this.Ize]]));
  }
  async InitializeAsync() {
    var e;
    await super.InitializeAsync(),
      Info_1.Info.IsInTouch() ||
        ((e = this.GetItem(8)),
        (this.hze = new CommonKeyItem_1.CommonKeyItem()),
        await this.hze.CreateThenShowByActorAsync(e.GetOwner()));
  }
  OnShowBattleChildViewPanel() {
    var e = Info_1.Info.OperationType;
    if (2 === e) {
      var t = ModelManager_1.ModelManager.FriendModel,
        i = [];
      for (const a of this.oze.values()) {
        var s,
          r,
          n = a.GetChatRowData();
        n &&
          ((s = n.UniqueId),
          (r = n.TargetPlayerId) && t.HasBlockedPlayer(r) && i.push(s),
          n.IsVisible || i.push(s));
      }
      for (const h of i) this.mze(h);
      this.oze.size <= 0
        ? (this.wze(), this.Pze(!1))
        : this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
      e = ModelManager_1.ModelManager.BattleUiModel.EnvironmentKeyData;
      e.SetEnvironmentKeyVisible(2, this.Bze()),
        e.SetEnvironmentKeyVisible(4, this.bze()),
        this.hze?.RefreshAction(InputMappingsDefine_1.actionMappings.功能菜单),
        this.yze(),
        this.dze(),
        this.SPe.StopCurrentSequence(),
        this.SPe.PlaySequencePurely("Start");
    }
  }
  dze() {
    var e = Info_1.Info.IsInGamepad();
    this.GetItem(5)?.SetUIActive(e), this.Sze();
  }
  Sze() {
    var e = Info_1.Info.IsInGamepad(),
      t =
        ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ??
        0;
    this.GetItem(7)?.SetUIActive(0 !== t && this.aze && e);
  }
  yze() {
    var e =
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurKeyText();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
  }
  AddEvents() {
    2 === this.GetOperationType() &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        this.FGn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
        this.Eze,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.环境特性,
          InputMappingsDefine_1.actionMappings.组合主键,
        ],
        this.bMe,
      ));
  }
  RemoveEvents() {
    2 === this.GetOperationType() &&
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        this.FGn,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnRefreshChatRowData,
          this.FGn,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.InputControllerChange,
          this.XBo,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
        this.Eze,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
          this.Eze,
        ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.环境特性,
          InputMappingsDefine_1.actionMappings.组合主键,
        ],
        this.bMe,
      ));
  }
  Rze(e) {
    (this.aze = 0 === e), this.Sze();
  }
  Lze() {
    !this.Bze() ||
      UiManager_1.UiManager.IsViewShow("TowerGuideView") ||
      UiManager_1.UiManager.OpenView("TowerGuideView");
  }
  Bze() {
    return ModelManager_1.ModelManager.TowerModel.CheckInTower();
  }
  mXn() {
    ControllerHolder_1.ControllerHolder.InstanceDungeonGuideController.StartReplayGuide();
  }
  Dze() {
    !this.bze() ||
      UiManager_1.UiManager.IsViewShow("RogueInfoView") ||
      RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
  }
  bze() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
  }
  Tze() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView,
    );
  }
  dXa() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView,
    );
  }
  async gze() {
    this.qze();
    var e,
      t = [];
    for (const i of ModelManager_1.ModelManager.ChatModel.GetChatRowDataList())
      i.IsVisible && ((e = this._ze(i)), t.push(e));
    await Promise.all(t);
  }
  async _ze(e) {
    var t = e.UniqueId;
    if (1 === e.ContentChatRoomType) {
      var i = e.TargetPlayerId;
      if (!i) return;
      var s = ModelManager_1.ModelManager.FriendModel,
        r = s.GetFriendById(i);
      if (!r) return;
      if (s.HasBlockedPlayer(i) || r.GetBlockBySdk()) return;
    }
    (s = this.GetItem(2)),
      (i = await this.NewDynamicChildViewByResourceId(
        s,
        "UiItem_ChatRowItem_Prefab",
        ChatRowItem_1.ChatRowItem,
        !0,
        e,
      ));
    this.oze.set(t, i), this.OJs.push(t);
  }
  DelayScroll(e) {
    this.xze(),
      2 === this.GetOperationType() &&
        (this.sze = TimerSystem_1.TimerSystem.Delay(this.Uze, e));
  }
  xze() {
    TimerSystem_1.TimerSystem.Has(this.sze) &&
      TimerSystem_1.TimerSystem.Remove(this.sze),
      (this.sze = void 0);
  }
  wze() {
    TimerSystem_1.TimerSystem.Has(this.rze) &&
      TimerSystem_1.TimerSystem.Remove(this.rze),
      (this.rze = void 0);
  }
  fze() {
    var e = this.NJs();
    e && this.GetScrollViewWithScrollbar(1)?.ScrollTo(e.GetRootItem());
  }
  mze(e) {
    var t = this.oze.get(e),
      t =
        (t?.GetRootActor()?.IsValid() && t.Destroy(),
        this.oze.delete(e),
        this.OJs.indexOf(e));
    0 <= t && this.OJs.splice(t, 1);
  }
  qze() {
    for (const e of this.oze.values())
      e?.GetRootActor()?.IsValid() && e.Destroy();
    this.oze.clear(), (this.OJs.length = 0);
  }
  NJs() {
    var e = this.OJs.length;
    if (!(e <= 0)) {
      e = this.OJs[e - 1];
      if (e) return this.oze.get(e);
    }
  }
  uze() {
    this.wze(),
      this.GetItem(3)?.bIsUIActive ||
        (this.SPe.StopCurrentSequence(), this.SPe.PlaySequencePurely("Start")),
      this.Pze(!0),
      (this.rze = TimerSystem_1.TimerSystem.Delay(this.Aze, this.nze));
  }
  Pze(e) {
    this.GetItem(3)?.SetUIActive(e),
      (ModelManager_1.ModelManager.BattleUiModel.ChatScrollViewVisible = e);
  }
  OnAfterDestroy() {
    super.OnAfterDestroy(),
      (ModelManager_1.ModelManager.BattleUiModel.ChatScrollViewVisible = !1);
  }
}
exports.ChatPanel = ChatPanel;
//# sourceMappingURL=ChatPanel.js.map
