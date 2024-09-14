"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineHallView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  InstanceDungeonMatchingCountDown_1 = require("../../InstanceDungeon/InstanceDungeonMatchingCountDown"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  OnlineController_1 = require("../OnlineController"),
  OnlineHallItem_1 = require("./OnlineHallItem"),
  OnlineTeamItem_1 = require("./OnlineTeamItem");
class OnlineHallView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.bNi = void 0),
      (this.qNi = void 0),
      (this.oli = void 0),
      (this.a9t = void 0),
      (this.GNi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name)),
      (this.NNi = () => new OnlineTeamItem_1.OnlineTeamItem()),
      (this.ONi = (e) => {
        (ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching = !1),
          this.GetInputText(12).SetText(""),
          this.h9t(),
          this.IWs(),
          1 === e &&
            (ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!0),
            this.kNi(
              ModelManager_1.ModelManager.OnlineModel.ShowCanJoin
                ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormFriend()
                : ModelManager_1.ModelManager.OnlineModel.FriendWorld,
            )),
          0 === e &&
            (ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!1),
            this.kNi(
              ModelManager_1.ModelManager.OnlineModel.ShowCanJoin
                ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormStranger()
                : ModelManager_1.ModelManager.OnlineModel.StrangerWorld,
            ));
      }),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this.VNi = () => {
        UiManager_1.UiManager.OpenView("OnlineSettingView");
      }),
      (this.jNi = () => {
        var e = this.GetText(7),
          t =
            "PermissionsSetting_" +
            ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
        LguiUtil_1.LguiUtil.SetLocalText(e, t);
      }),
      (this.WNi = () => {
        this.kNi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
      }),
      (this.KNi = () => {
        this.QNi(ModelManager_1.ModelManager.OnlineModel.GetTeamList()),
          this.XNi();
      }),
      (this.$Ye = () => {
        var e =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState();
        0 === e || 2 === e
          ? this.oli?.GetActive() && this.oli?.PlayAnimation("Close")
          : 1 === e &&
            (this.oli?.PlayAnimation("Start"),
            this.oli.SetMatchingTime(0),
            this.oli.StartTimer());
      }),
      (this.YYe = () => {
        this.oli?.PlayAnimation("Start"),
          this.oli.SetMatchingTime(0),
          this.oli.StartTimer();
      }),
      (this.h9t = () => {
        "" === this.GetInputText(12).GetText()
          ? this.a9t.RefreshSprite("SP_Paste")
          : this.a9t.RefreshSprite("SP_Clear");
      }),
      (this.aOi = () => {
        var e,
          t,
          i = this.GetInputText(12);
        "" === i.GetText()
          ? ((t = ((e = ""), puerts_1.$ref)("")),
            UE.LGUIBPLibrary.ClipBoardPaste(t),
            (e = (0, puerts_1.$unref)(t)),
            i.SetText(e))
          : i.SetText(""),
          this.h9t();
      }),
      (this.l9t = () => {
        var e;
        ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching
          ? ((ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching =
              !1),
            this.GetInputText(12).SetText(""),
            this.h9t(),
            this.IWs(),
            this.kNi(
              1 === this.GetExtendToggle(2).ToggleState
                ? ModelManager_1.ModelManager.OnlineModel.FriendWorld
                : ModelManager_1.ModelManager.OnlineModel.StrangerWorld,
            ))
          : 0 < (e = this.GetInputText(12).GetText()).length
            ? OnlineController_1.OnlineController.LobbyQueryPlayersRequest(
                Number(e),
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "OnlineUserIdIsNull",
              );
      }),
      (this.sOi = () => {
        var e = ModelManager_1.ModelManager.OnlineModel.SearchResult;
        e &&
          (this.kNi(e),
          (ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching =
            !0)),
          this.IWs();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIExtendToggle],
      [3, UE.UIButtonComponent],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [7, UE.UIText],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UITextInputComponent],
      [13, UE.UIItem],
      [14, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.Jvt],
        [1, this.VNi],
        [3, this.l9t],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.oli =
      new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
      await this.oli.CreateByActorAsync(this.GetItem(11).GetOwner()),
      this.oli.SetUiActive(!1);
  }
  OnStart() {
    this.XNi(),
      this.$Ni(),
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
        ? this.QNi(ModelManager_1.ModelManager.OnlineModel.GetTeamList())
        : OnlineController_1.OnlineController.RefreshWorldList() ||
          this.kNi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld),
      ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!1),
      ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!1),
      (ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching = !1),
      this.jNi(),
      (ModelManager_1.ModelManager.FriendModel.ShowingView = this.Info.Name),
      (this.a9t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(
        this.GetItem(13),
      )),
      this.a9t.BindCallback(this.aOi),
      this.GetInputText(12).OnTextChange.Bind(this.h9t),
      this.h9t(),
      this.IWs();
  }
  OnAfterShow() {
    this.oli.BindOnStopTimer(
      () =>
        1 !==
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
    ),
      this.oli.BindOnClickBtnCancelMatching(() => {
        this.oli?.PlayAnimation("Close"),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
      }),
      this.oli?.BindOnAfterCloseAnimation((e) => {
        "Close" === e && this.oli?.SetUiActive(!1);
      }),
      1 ===
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
        (this.oli?.PlayAnimation("Start"), this.oli.StartTimer());
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(2).OnStateChange.Remove(this.ONi),
      (this.bNi = void 0),
      (this.qNi = void 0),
      (this.oli = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshPermissionsSetting,
      this.jNi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshWorldList,
        this.WNi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
        this.KNi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingChange,
        this.$Ye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSearchWorld,
        this.sOi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshPermissionsSetting,
      this.jNi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshWorldList,
        this.WNi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
        this.KNi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingChange,
        this.$Ye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSearchWorld,
        this.sOi,
      );
  }
  XNi() {
    var e;
    ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
      ? (this.GetItem(8).SetUIActive(!1),
        this.Pza(),
        (e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()),
        this.GetButton(1)?.RootUIComp.SetUIActive(e))
      : this.GetExtendToggle(2).OnStateChange.Add(this.ONi);
  }
  async Pza() {
    var e = await this.wza(
        ModelManager_1.ModelManager.OnlineModel.GetTeamList(),
      ),
      t = this.GetItem(9),
      i = this.GetText(10);
    t.SetUIActive(!0),
      i.SetText(
        e.length + "/" + ModelManager_1.ModelManager.OnlineModel.TeamMaxSize,
      );
  }
  $Ni() {
    var e,
      t = this.GetLoopScrollViewComponent(4);
    ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
      ? ((e = this.GetItem(5).GetOwner()),
        (this.qNi = new LoopScrollView_1.LoopScrollView(t, e, this.NNi)))
      : ((e = this.GetItem(5).GetOwner()),
        (this.bNi = new LoopScrollView_1.LoopScrollView(t, e, this.GNi)));
  }
  async Pka(e) {
    var t = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    if (e) {
      var i = [];
      for (const n of e) n.GetIfCanShowInHallList(t) && i.push(n);
      return i;
    }
  }
  kNi(e) {
    this.wka(e);
  }
  async wka(e) {
    var e = await this.Pka(e),
      t = this.GetItem(6),
      i = this.GetLoopScrollViewComponent(4).RootUIComp;
    !e || e.length <= 0
      ? (t.SetUIActive(!0), i.SetUIActive(!1))
      : (i.SetUIActive(!0),
        t.SetUIActive(!1),
        this.bNi &&
          this.bNi.RefreshByData(
            e,
            !1,
            () => {
              var e = this.bNi.UnsafeGetGridProxy(0);
              e &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiComponent",
                  5,
                  "HallLoopScroll_Item_Alpha:" + e.GetRootItem().GetAlpha(),
                );
            },
            !0,
          ));
  }
  async wza(e) {
    var t = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap(),
      i = [];
    for (const n of e) n.GetIfCanShowInHallList(t) && i.push(n);
    return i;
  }
  async Bza(e) {
    e = await this.wza(e);
    this.GetItem(6).SetUIActive(e.length <= 0),
      this.qNi &&
        this.qNi.RefreshByData(
          e,
          !1,
          () => {
            var e = this.qNi.UnsafeGetGridProxy(0);
            e &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "UiComponent",
                5,
                "TeamLoopScroll_Item_Alpha:" + e.GetRootItem().GetAlpha(),
              );
          },
          !0,
        );
  }
  QNi(e) {
    this.Bza(e);
  }
  IWs() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(14),
      ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching
        ? "Online_ResetSearch"
        : "Online_Search",
    );
  }
}
exports.OnlineHallView = OnlineHallView;
//# sourceMappingURL=OnlineHallView.js.map
