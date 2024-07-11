"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatPanel = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../../Ui/UiManager");
const ChatDefine_1 = require("../../../Chat/ChatDefine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ChatRowItem_1 = require("../ChatRowItem");
const CommonKeyItem_1 = require("../KeyItem/CommonKeyItem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class ChatPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.WYe = new Map()),
      (this.H6s = []),
      (this.KYe = void 0),
      (this.QYe = 0),
      (this.XYe = void 0),
      (this.$Ye = !1),
      (this.YYe = void 0),
      (this.EPe = void 0),
      (this.jwn = (e) => {
        this.GetOperationType() === 2 &&
          this.rJe().then(
            () => {
              this.WYe.size <= 0
                ? this.vJe(!1)
                : (this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY),
                  (e &&
                    !ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()) ||
                    this.ZYe());
            },
            () => {},
          );
      }),
      (this.dKe = () => {
        this.iJe();
      }),
      (this.lJe = () => {
        ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
          (this._Je(), this.uJe());
      }),
      (this.cJe = () => {
        UiManager_1.UiManager.IsViewShow("ChatView") ||
          UiManager_1.UiManager.OpenView("ChatView");
      }),
      (this.bMe = (e, t) => {
        if (e === InputMappingsDefine_1.actionMappings.环境特性) {
          if (t === 0)
            switch (
              ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ??
              0
            ) {
              case 1:
                this.mJe();
                break;
              case 2:
                this.dJe();
                break;
              case 3:
                this.CJe();
            }
        } else
          e === InputMappingsDefine_1.actionMappings.组合主键 && this.gJe(t);
      }),
      (this.fJe = () => {
        this.nJe();
      }),
      (this.pJe = () => {
        this.EPe.StopCurrentSequence(), this.EPe.PlaySequencePurely("Close");
      });
  }
  InitializeTemp() {
    this.QYe =
      CommonParamById_1.configCommonParamById.GetIntConfig("ChatViewTimeDown");
    const e = this.GetOperationType();
    e === 2 &&
      (this.rJe().then(
        () => {
          !(this.WYe.size <= 0) &&
          ModelManager_1.ModelManager.ChatModel.HasOfflineMassage()
            ? (this.ZYe(), this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY))
            : this.vJe(!1);
        },
        () => {},
      ),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(3),
      ))),
      e === 1 &&
        (RedDotController_1.RedDotController.BindRedDot(
          "ChatView",
          this.GetItem(1),
        ),
        (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.GetItem(2),
        ))),
      this.EPe.BindSequenceCloseEvent((e) => {
        e === "Close" && this.vJe(!1);
      });
  }
  Reset() {
    super.Reset(),
      this.MJe(),
      this.SJe(),
      this.GetOperationType() === 1 &&
        RedDotController_1.RedDotController.UnBindRedDot("ChatView");
  }
  OnRegisterComponent() {
    const e = this.GetOperationType();
    e === 2
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
        (this.BtnBindInfo = [[0, this.cJe]]))
      : e === 1 &&
        ((this.ComponentRegisterInfos = [
          [0, UE.UIButtonComponent],
          [1, UE.UIItem],
          [2, UE.UIItem],
        ]),
        (this.BtnBindInfo = [[0, this.cJe]]));
  }
  async InitializeAsync() {
    let e;
    await super.InitializeAsync(),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        ((e = this.GetItem(8)),
        (this.YYe = new CommonKeyItem_1.CommonKeyItem()),
        await this.YYe.CreateThenShowByActorAsync(e.GetOwner()));
  }
  OnShowBattleChildViewPanel() {
    let e = ModelManager_1.ModelManager.PlatformModel.OperationType;
    if (e === 2) {
      const t = ModelManager_1.ModelManager.FriendModel;
      const i = [];
      for (const a of this.WYe.values()) {
        var s;
        var r;
        const n = a.GetChatRowData();
        n &&
          ((s = n.UniqueId),
          (r = n.TargetPlayerId) && t.HasBlockedPlayer(r) && i.push(s),
          n.IsVisible || i.push(s));
      }
      for (const h of i) this.tJe(h);
      this.WYe.size <= 0
        ? (this.SJe(), this.vJe(!1))
        : this.DelayScroll(ChatDefine_1.CHAT_SCROLL_DELAY);
      e = ModelManager_1.ModelManager.BattleUiModel.EnvironmentKeyData;
      e.SetEnvironmentKeyVisible(2, this.EJe()),
        e.SetEnvironmentKeyVisible(3, this.yJe()),
        this.YYe?.RefreshAction(InputMappingsDefine_1.actionMappings.功能菜单),
        this.uJe(),
        this.iJe(),
        this.EPe.StopCurrentSequence(),
        this.EPe.PlaySequencePurely("Start");
    }
  }
  iJe() {
    const e = ModelManager_1.ModelManager.PlatformModel.IsGamepad();
    this.GetItem(4)?.SetUIActive(!e),
      this.GetItem(5)?.SetUIActive(e),
      this._Je();
  }
  _Je() {
    const e = ModelManager_1.ModelManager.PlatformModel.IsGamepad();
    const t =
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurEnvironmentalKey() ??
      0;
    this.GetItem(7)?.SetUIActive(t !== 0 && this.$Ye && e);
  }
  uJe() {
    const e =
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.GetCurKeyText();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
  }
  AddEvents() {
    this.GetOperationType() === 2 &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        this.jwn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
        this.lJe,
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
    this.GetOperationType() === 2 &&
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnRefreshChatRowData,
        this.jwn,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnRefreshChatRowData,
          this.jwn,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnPlatformChanged,
          this.dKe,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
        this.lJe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
          this.lJe,
        ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.环境特性,
          InputMappingsDefine_1.actionMappings.组合主键,
        ],
        this.bMe,
      ));
  }
  gJe(e) {
    (this.$Ye = e === 0), this._Je();
  }
  dJe() {
    !this.EJe() ||
      UiManager_1.UiManager.IsViewShow("TowerGuideView") ||
      UiManager_1.UiManager.OpenView("TowerGuideView");
  }
  EJe() {
    return ModelManager_1.ModelManager.TowerModel.CheckInTower();
  }
  CJe() {
    !this.yJe() ||
      UiManager_1.UiManager.IsViewShow("RogueInfoView") ||
      RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
  }
  yJe() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
  }
  mJe() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleUiToggleSilentAreaInfoView,
    );
  }
  async rJe() {
    this.IJe();
    let e;
    const t = [];
    for (const i of ModelManager_1.ModelManager.ChatModel.GetChatRowDataList())
      i.IsVisible && ((e = this.zYe(i)), t.push(e));
    await Promise.all(t);
  }
  async zYe(e) {
    const t = e.UniqueId;
    if (e.ContentChatRoomType === 1) {
      var i = e.TargetPlayerId;
      if (!i) return;
      var s = ModelManager_1.ModelManager.FriendModel;
      if (!s.GetFriendById(i)) return;
      if (s.HasBlockedPlayer(i)) return;
    }
    (s = this.GetItem(2)),
      (i = await this.NewDynamicChildViewByResourceId(
        s,
        "UiItem_ChatRowItem_Prefab",
        ChatRowItem_1.ChatRowItem,
        !0,
        e,
      ));
    this.WYe.set(t, i), this.H6s.push(t);
  }
  DelayScroll(e) {
    this.MJe(),
      this.GetOperationType() === 2 &&
        (this.XYe = TimerSystem_1.TimerSystem.Delay(this.fJe, e));
  }
  MJe() {
    TimerSystem_1.TimerSystem.Has(this.XYe) &&
      TimerSystem_1.TimerSystem.Remove(this.XYe),
      (this.XYe = void 0);
  }
  SJe() {
    TimerSystem_1.TimerSystem.Has(this.KYe) &&
      TimerSystem_1.TimerSystem.Remove(this.KYe),
      (this.KYe = void 0);
  }
  nJe() {
    const e = this.j6s();
    e && this.GetScrollViewWithScrollbar(1)?.ScrollTo(e.GetRootItem());
  }
  tJe(e) {
    var t = this.WYe.get(e);
    var t =
      (t?.GetRootActor()?.IsValid() && t.Destroy(),
      this.WYe.delete(e),
      this.H6s.indexOf(e));
    t >= 0 && this.H6s.splice(t, 1);
  }
  IJe() {
    for (const e of this.WYe.values())
      e?.GetRootActor()?.IsValid() && e.Destroy();
    this.WYe.clear(), (this.H6s.length = 0);
  }
  j6s() {
    let e = this.H6s.length;
    if (!(e <= 0)) {
      e = this.H6s[e - 1];
      if (e) return this.WYe.get(e);
    }
  }
  ZYe() {
    this.SJe(),
      this.GetItem(3)?.bIsUIActive ||
        (this.EPe.StopCurrentSequence(), this.EPe.PlaySequencePurely("Start")),
      this.vJe(!0),
      (this.KYe = TimerSystem_1.TimerSystem.Delay(this.pJe, this.QYe));
  }
  vJe(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
}
exports.ChatPanel = ChatPanel;
// # sourceMappingURL=ChatPanel.js.map
