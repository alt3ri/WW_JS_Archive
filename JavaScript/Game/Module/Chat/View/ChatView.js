"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChatView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const FriendController_1 = require("../../Friend/FriendController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ChatController_1 = require("../ChatController");
const ChatDefine_1 = require("../ChatDefine");
const PrivateChatRoom_1 = require("../PrivateChatRoom");
const TeamChatRoom_1 = require("../TeamChatRoom");
const WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
const ChatContent_1 = require("./ChatContent");
const ChatTeamTipsContent_1 = require("./ChatTeamTipsContent");
const PrivateChatFriendItem_1 = require("./PrivateChatFriendItem");
class ChatView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.mSt = []),
      (this.dSt = !1),
      (this.XYe = void 0),
      (this.CSt = void 0),
      (this.gSt = void 0),
      (this.fSt = []),
      (this.ChatInputMaxNum = 0),
      (this.pSt = !1),
      (this.vSt = !1),
      (this.MSt = void 0),
      (this.gUn = new InputKeyDisplayData_1.InputKeyDisplayData()),
      (this.z9e = () => this.SSt()),
      (this.ESt = (t) => {}),
      (this.ySt = (t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Chat", 8, "当聊天文本提交时", ["content", t]),
          this.ISt(t, Protocol_1.Aki.Protocol.U3n.nMs);
      }),
      (this.TSt = () => {}),
      (this.LSt = (t) => !0),
      (this.DSt = (t) => (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ReachInputMaxNum",
          this.ChatInputMaxNum,
        ),
        !0
      )),
      (this.RSt = (t) => {
        let e;
        t.Y >= 0
          ? (this.dSt = !0)
          : this.dSt &&
            !ChatController_1.ChatController.IsInRequestHistory &&
            ((this.dSt = !1),
            (e = (t =
              ModelManager_1.ModelManager
                .ChatModel).GetJoinedChatRoom()) instanceof
              PrivateChatRoom_1.PrivateChatRoom) &&
            t.RequestPrivateRoomLocalHistory(e);
      }),
      (this.USt = (t, e) => {
        this.pSt &&
          e === 0 &&
          !(e = this.GetInputText(2)).IsInputActive() &&
          e.ActivateInputText();
      }),
      (this.ASt = (t) => {}),
      (this.PSt = (t) => {
        const e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
        const i =
          (this.xSt(e),
          ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom());
        i &&
          (this.wSt(i, e), i.GetUniqueId() === t.GetUniqueId()) &&
          (i instanceof PrivateChatRoom_1.PrivateChatRoom
            ? this.BSt(i)
            : this.bSt(i),
          this.qSt(!0));
      }),
      (this.GSt = (t, e) => {
        let i;
        let s = ModelManager_1.ModelManager.ChatModel;
        const r = s.GetJoinedChatRoom();
        r &&
          ((i = r.GetUniqueId()),
          (t = t.GetUniqueId()),
          (s = s.GetAllSortedChatRoom()),
          this.xSt(s),
          this.wSt(r, s),
          i === t) &&
          this.NSt(e, (t) => {
            this.qSt(!0), this.OSt(ChatDefine_1.CHAT_SCROLL_DELAY);
          });
      }),
      (this.fJe = () => {
        this.MSt.SetScrollProgress(1), (this.vSt = !1);
      }),
      (this.kSt = (t) => {
        let e;
        ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom().GetUniqueId() ===
          t.GetUniqueId() &&
          ((e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
          t instanceof PrivateChatRoom_1.PrivateChatRoom
            ? (this.BSt(t), this.wSt(t, e))
            : (t instanceof TeamChatRoom_1.TeamChatRoom ||
                t instanceof WorldTeamChatRoom_1.WorldChatRoom) &&
              (this.bSt(t), this.wSt(t, e)),
          this.qSt(!0));
      }),
      (this.FSt = (t) => {
        let e;
        t instanceof PrivateChatRoom_1.PrivateChatRoom &&
          ((this.vSt = !1),
          (e = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom())
            ? e.GetUniqueId() === t.GetUniqueId() && (this.VSt(t), this.qSt(!0))
            : ((e =
                ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
              this.xSt(e),
              this.HSt(t)));
      }),
      (this.jSt = (t) => {
        var e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom();
        var e = (this.xSt(e), this.WSt(e));
        e ? (e.ChatRoomType === 1 ? this.BSt(e) : this.bSt(e)) : this.qSt(!1);
      }),
      (this.j8e = (t) => {
        let e = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        if (e) {
          if (e instanceof PrivateChatRoom_1.PrivateChatRoom) {
            e = e.GetTargetPlayerId();
            if (!e)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Chat", 8, "私聊对象玩家Id不存在", [
                  "targetPlayerId",
                  e,
                ])
              );
          }
          this.ISt(t.toString(), Protocol_1.Aki.Protocol.U3n.Proto_Emoji);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Chat", 8, "当前没有加入任何一个聊天室");
      }),
      (this.KSt = () => {
        UiManager_1.UiManager.OpenView("SelectedFriendChatView");
      }),
      (this.QSt = () => {
        UiManager_1.UiManager.OpenView("ChatExpressionView");
      }),
      (this.XSt = () => {
        UiManager_1.UiManager.OpenView("QuickChatView");
      }),
      (this.$St = () => {
        const t = this.GetInputText(2).GetText();
        this.ISt(t, Protocol_1.Aki.Protocol.U3n.nMs);
      }),
      (this.YSt = () => {
        let t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        t &&
          this.GetButton(8)
            .GetOwner()
            .GetComponentByClass(UE.UIItem.StaticClass()) &&
          t instanceof PrivateChatRoom_1.PrivateChatRoom &&
          ((t = t.GetTargetPlayerId()),
          UiManager_1.UiManager.OpenView("ChatOption", t));
      }),
      (this.JSt = () => {
        UiManager_1.UiManager.CloseView("ChatView");
      }),
      (this.zSt = () => {
        let t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
        t &&
          t instanceof PrivateChatRoom_1.PrivateChatRoom &&
          ((t = t.GetTargetPlayerId()),
          ModelManager_1.ModelManager.FriendModel.ClearFriendSearchResults(),
          FriendController_1.FriendController.RequestSearchPlayerBasicInfo(t));
      }),
      (this.ZSt = (t) => {
        t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
        t && (this.eEt(t), this.x9e(t));
      }),
      (this.hSt = (t) => {
        var t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
        !t ||
          (t = this.fSt.indexOf(t)) < 0 ||
          this.gSt.UnsafeGetGridProxy(t)?.RefreshMuteItem();
      }),
      (this.KMt = (t) => {
        var t = ModelManager_1.ModelManager.ChatModel.GetPrivateChatRoom(t);
        !t ||
          (t = this.fSt.indexOf(t)) < 0 ||
          this.gSt.UnsafeGetGridProxy(t)?.RefreshPlayerTexture();
      }),
      (this.dKe = () => {
        this.fUn();
      }),
      (this.tEt = (t, e) => {
        const i = ModelManager_1.ModelManager.ChatModel;
        let s = void 0;
        switch (t) {
          case 1:
            if (!ModelManager_1.ModelManager.FriendModel.GetFriendById(e))
              return;
            (s = i.GetPrivateChatRoom(e)) instanceof
              PrivateChatRoom_1.PrivateChatRoom && this.HSt(s);
            break;
          case 2:
            (s = i.GetTeamChatRoom()), this.iEt();
            break;
          case 3:
            (s = i.GetWorldChatRoom()), this.oEt();
        }
        s && this.wSt(s, this.fSt),
          this.GetItem(11)
            .GetOwner()
            .GetComponentByClass(UE.UIInturnAnimController.StaticClass())
            .Play();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UITextInputComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [17, UE.UIItem],
      [7, UE.UIText],
      [6, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIScrollViewWithScrollbarComponent],
      [15, UE.UILoopScrollViewComponent],
      [16, UE.UIButtonComponent],
      [18, UE.UIText],
      [19, UE.UIItem],
      [20, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.KSt],
        [1, this.QSt],
        [3, this.XSt],
        [4, this.$St],
        [8, this.YSt],
        [9, this.JSt],
        [16, this.JSt],
      ]);
  }
  OnStart() {
    (this.MSt = this.GetScrollViewWithScrollbar(14)),
      (this.ChatInputMaxNum =
        CommonParamById_1.configCommonParamById.GetIntConfig("chat_character")),
      (this.GetInputText(2).MaxInput = this.ChatInputMaxNum),
      this.GetItem(10).SetUIActive(!1);
    var t = this.GetItem(10).GetOwner();
    var t =
      ((this.gSt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(15),
        t,
        this.z9e,
      )),
      ModelManager_1.ModelManager.ChatModel);
    const e = t.GetAllSortedChatRoom();
    this.xSt(e);
    let i = t.GetJoinedChatRoom();
    (i = i || this.WSt(e)) instanceof PrivateChatRoom_1.PrivateChatRoom
      ? this.BSt(i)
      : this.bSt(i),
      this.qSt(void 0 !== i),
      this.rEt(),
      this.fUn(),
      this.Ore();
  }
  OnBeforeDestroy() {
    this.nEt(),
      this.MJe(),
      this.sEt(),
      ModelManager_1.ModelManager.ChatModel.LeaveCurrentChatRoom(),
      this.kre(),
      this.gSt.ClearGridProxies(),
      (this.gSt = void 0),
      (this.fSt.length = 0),
      (this.vSt = !1),
      (this.MSt = void 0);
  }
  OnTick(t) {
    this.vSt && this.MSt.SetScrollProgress(1);
  }
  Ore() {
    const t = this.GetInputText(2);
    t.OnTextChange.Bind(this.ESt),
      t.OnTextSubmit.Bind(this.ySt),
      t.OnInputActivateDelegate.Bind(this.TSt),
      t.OnCheckTextInputDelegate.Bind(this.LSt),
      t.OnTextClip.Bind(this.DSt),
      this.MSt.OnScrollValueChange.Bind(this.RSt),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.激活聊天,
        this.USt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCreatePrivateChatRoom,
        this.ASt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnJoinChatRoom,
        this.kSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        this.FSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnOpenChatRoom,
        this.PSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddChatContent,
        this.GSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemovePrivateChatRoom,
        this.jSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClosePrivateChatRoom,
        this.jSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectExpression,
        this.j8e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SearchPlayerInfo,
        this.ZSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.hSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.hSt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        this.KMt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      );
  }
  kre() {
    const t = this.GetInputText(2);
    t.OnTextChange.Unbind(),
      t.OnTextSubmit.Unbind(),
      t.OnInputActivateDelegate.Unbind(),
      t.OnCheckTextInputDelegate.Unbind(),
      this.MSt.OnScrollValueChange.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.激活聊天,
        this.USt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCreatePrivateChatRoom,
        this.ASt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnJoinChatRoom,
        this.kSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddHistoryChatContentCompleted,
        this.FSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnOpenChatRoom,
        this.PSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddChatContent,
        this.GSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemovePrivateChatRoom,
        this.jSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClosePrivateChatRoom,
        this.jSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectExpression,
        this.j8e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SearchPlayerInfo,
        this.ZSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.hSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.hSt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChatPlayerInfoChanged,
        this.KMt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      );
  }
  OSt(t) {
    (this.vSt = !0),
      this.MJe(),
      (this.XYe = TimerSystem_1.TimerSystem.Delay(this.fJe, t));
  }
  MJe() {
    TimerSystem_1.TimerSystem.Has(this.XYe) &&
      TimerSystem_1.TimerSystem.Remove(this.XYe);
  }
  fUn() {
    const e = this.GetText(18);
    if (
      InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
        this.gUn,
        InputMappingsDefine_1.actionMappings.激活聊天,
      )
    ) {
      const i = this.gUn.GetDisplayKeyNameList();
      if (i) {
        let t = "";
        for (const r of i) {
          const s = InputSettings_1.InputSettings.GetKeyIconPath(r);
          t += `<texture=${s}>`;
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "SendChatText", t);
      } else
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          "PrefabTextItem_1493640674_Text",
        );
    } else
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PrefabTextItem_1493640674_Text");
  }
  ISt(t, e) {
    if (StringUtils_1.StringUtils.IsEmpty(t))
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "InputChatContent",
      );
    else if (t.length > this.ChatInputMaxNum)
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "ReachInputMaxNum",
        this.ChatInputMaxNum,
      );
    else {
      const i = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
      if (i) {
        let s = i.GetLastTimeStamp();
        if (
          TimeUtil_1.TimeUtil.GetServerTime() - s <
          i.ChatCd / TimeUtil_1.TimeUtil.InverseMillisecond
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "ChatCdText",
          );
        else {
          if (i instanceof PrivateChatRoom_1.PrivateChatRoom) {
            s = i.GetTargetPlayerId();
            if (!s)
              return void (
                Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Chat", 8, "私聊对象玩家Id不存在", [
                  "targetPlayerId",
                  s,
                ])
              );
            if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(s))
              return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "ChatRefuseText",
              );
            ChatController_1.ChatController.PrivateChatRequest(e, t, s);
          } else
            i instanceof TeamChatRoom_1.TeamChatRoom
              ? ChatController_1.ChatController.ChannelChatRequest(
                  e,
                  t,
                  Protocol_1.Aki.Protocol.kGs.Proto_MatchTeam,
                )
              : i instanceof WorldTeamChatRoom_1.WorldChatRoom &&
                ChatController_1.ChatController.ChannelChatRequest(
                  e,
                  t,
                  Protocol_1.Aki.Protocol.kGs.Proto_WorldTeam,
                );
          this.GetInputText(2).SetText("", !1);
        }
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Chat", 8, "当前没有加入任何一个聊天室");
    }
  }
  qSt(t) {
    const e = this.GetItem(12);
    const i = this.GetItem(13);
    e.SetUIActive(t), i.SetUIActive(!t), (this.pSt = t);
  }
  aEt(t) {
    this.GetButton(8).GetOwner().GetUIItem()?.SetUIActive(t);
  }
  BSt(t) {
    let e;
    t &&
      t.CanChat() &&
      ((e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
      this.eEt(t, !0),
      this.x9e(t),
      this.wSt(t, e),
      this.VSt(t),
      this.aEt(!0),
      this.qSt(!0));
  }
  bSt(t) {
    let e;
    t &&
      ((e = ModelManager_1.ModelManager.ChatModel.GetAllSortedChatRoom()),
      this.wSt(t, e),
      this.VSt(t),
      this.eEt(void 0, !1),
      this.x9e(void 0, !0),
      this.aEt(!1),
      this.qSt(!0));
  }
  VSt(t) {
    this.nEt();
    t = t.GetChatContentList();
    this.hEt(t);
  }
  hEt(e, i = 0) {
    const t = e[i];
    t
      ? this.NSt(t, (t) => {
          i >= e.length
            ? this.OSt(ChatDefine_1.FIRST_CHAT_SCROLL_DELAY)
            : this.hEt(e, i + 1);
        })
      : this.OSt(ChatDefine_1.FIRST_CHAT_SCROLL_DELAY);
  }
  NSt(t, e) {
    const i = this.GetItem(11);
    let s = void 0;
    return (
      (s =
        t.NoticeType === Protocol_1.Aki.Protocol.FGs.Proto_EnterTeam ||
        t.NoticeType === Protocol_1.Aki.Protocol.FGs.Proto_ExitTeam
          ? new ChatTeamTipsContent_1.ChatTeamTipsContent(
              ChatDefine_1.TEAM_CONTENT_RESOURCE_ID,
              i,
              t,
              e,
            )
          : t.IsOwnSend()
            ? new ChatContent_1.ChatContent(
                ChatDefine_1.OWN_CHAT_CONTENT_RESOURCE_ID,
                i,
                t,
                e,
              )
            : new ChatContent_1.ChatContent(
                ChatDefine_1.CHAT_CONTENT_RESOURCE_ID,
                i,
                t,
                e,
              )),
      this.mSt.push(s),
      s
    );
  }
  nEt() {
    for (const t of this.mSt) t.Destroy();
    this.mSt.length = 0;
  }
  wSt(t, e) {
    !t || (e = e.indexOf(t)) < 0 || this.gSt.SelectGridProxy(e);
  }
  eEt(t, e = !0) {
    const i = this.GetItem(5);
    const s = this.GetItem(17);
    e
      ? (i.SetUIActive(!1),
        s.SetUIActive(!1),
        !t ||
          (e = this.fSt.indexOf(t)) < 0 ||
          this.gSt.UnsafeGetGridProxy(e)?.RefreshIsOnline(t))
      : (i.SetUIActive(!1), s.SetUIActive(!1));
  }
  x9e(t, e = !1) {
    const i = this.GetText(7);
    const s = this.GetText(6);
    e
      ? (LguiUtil_1.LguiUtil.SetLocalText(i, "CurrentTeam"), s.SetUIActive(!1))
      : ((e = t.GetPlayerName()),
        (t = t.GetPlayerRemarks())
          ? (i.SetText(`(${e})`), s.SetText(t), s.SetUIActive(!0))
          : (i.SetText(e), s.SetUIActive(!1)));
  }
  rEt() {
    this.sEt();
    const t = ModelManager_1.ModelManager.ChatModel.GetJoinedChatRoom();
    t &&
      t instanceof PrivateChatRoom_1.PrivateChatRoom &&
      (this.CSt = TimerSystem_1.TimerSystem.Forever(
        this.zSt,
        ChatDefine_1.REFRESH_PLAYER_INFO_TIME_DOWN,
      ));
  }
  sEt() {
    TimerSystem_1.TimerSystem.Has(this.CSt) &&
      (TimerSystem_1.TimerSystem.Remove(this.CSt), (this.CSt = void 0));
  }
  xSt(t) {
    (this.fSt = t), this.gSt?.RefreshByData(t);
  }
  SSt() {
    const t = new PrivateChatFriendItem_1.ChatRoomItem();
    return t.BindOnClicked(this.tEt), t;
  }
  HSt(t) {
    let e;
    const i = ModelManager_1.ModelManager.ChatModel;
    const s = t.GetTargetPlayerId();
    !s ||
      !t.CanChat() ||
      ((e = i.GetJoinedChatRoom()) instanceof
        PrivateChatRoom_1.PrivateChatRoom &&
        e.GetTargetPlayerId() === s) ||
      i.JoinChatRoom(t);
  }
  iEt() {
    const t = ModelManager_1.ModelManager.ChatModel;
    const e = t.GetTeamChatRoom();
    e
      ? t.JoinChatRoom(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Chat", 5, "加入队伍聊天室失败，聊天室未初始化");
  }
  oEt() {
    const t = ModelManager_1.ModelManager.ChatModel;
    const e = t.GetWorldChatRoom();
    e
      ? t.JoinChatRoom(e)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Chat", 5, "加入世界聊天室失败，聊天室未初始化");
  }
  WSt(t) {
    for (const e of t)
      if (e instanceof PrivateChatRoom_1.PrivateChatRoom) {
        if (e.CanChat()) return this.HSt(e), e;
      } else {
        if (e instanceof TeamChatRoom_1.TeamChatRoom) return this.iEt(), e;
        if (e instanceof WorldTeamChatRoom_1.WorldChatRoom)
          return this.oEt(), e;
      }
  }
}
exports.ChatView = ChatView;
// # sourceMappingURL=ChatView.js.map
