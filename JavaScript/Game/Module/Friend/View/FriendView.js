"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  FriendController_1 = require("../FriendController"),
  FriendItem_1 = require("./FriendItem");
class FriendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.C9t = void 0),
      (this.g9t = void 0),
      (this.f9t = void 0),
      (this.p9t = void 0),
      (this.v9t = void 0),
      (this.M9t = void 0),
      (this.E9t = void 0),
      (this.C8t = void 0),
      (this.S9t = []),
      (this.Ivt = void 0),
      (this.y9t = void 0),
      (this.I9t = () => {
        return new FriendItem_1.FriendItem(this.Info.Name);
      }),
      (this.CloseClick = () => {
        this.CloseMe();
      }),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        e = this.S9t[e];
        (ModelManager_1.ModelManager.FriendModel.FilterState = e.Id),
          this.u8t();
      }),
      (this.yqe = (e) => {
        e = this.S9t[e];
        let t = void 0;
        return (
          1 === e.Id
            ? (t =
                ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                  "FriendFriend",
                ))
            : 2 === e.Id
              ? (t =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "FriendApplicationList",
                  ))
              : 3 === e.Id &&
                (t =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "FriendRecentMultiplayerGame",
                  )),
          new CommonTabData_1.CommonTabData(
            e.IconPath,
            new CommonTabTitleData_1.CommonTabTitleData(t),
          )
        );
      }),
      (this.T9t = () => {
        var e = ModelManager_1.ModelManager.FriendModel.FilterState,
          t = new UiPopViewData_1.UiPopViewData();
        1 === e && UiManager_1.UiManager.OpenView("FriendSearchView", t);
      }),
      (this.L9t = () => {
        this.p9t.GetRootItem().SetRaycastTarget(!1),
          this.M9t &&
            TimerSystem_1.TimerSystem.Has(this.M9t) &&
            TimerSystem_1.TimerSystem.Remove(this.M9t),
          (this.M9t = TimerSystem_1.TimerSystem.Delay(() => {
            this.p9t.GetRootItem().SetRaycastTarget(!0);
          }, TimerSystem_1.MIN_TIME)),
          (this.C8t = []);
        for (const t of this.f9t) {
          var e =
            ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
              t.Id,
            );
          e && !e?.Debug && this.C8t.push(t.Id);
        }
        FriendController_1.FriendController.RequestFriendApplyHandle(
          this.C8t,
          Protocol_1.Aki.Protocol.A6s.Proto_Approve,
        );
      }),
      (this.D9t = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(59);
        this.v9t.GetRootItem().SetRaycastTarget(!1),
          this.E9t &&
            TimerSystem_1.TimerSystem.Has(this.E9t) &&
            TimerSystem_1.TimerSystem.Remove(this.E9t),
          (this.E9t = TimerSystem_1.TimerSystem.Delay(() => {
            this.v9t.GetRootItem().SetRaycastTarget(!0);
          }, TimerSystem_1.MIN_TIME)),
          (this.C8t = []),
          e.FunctionMap.set(2, () => {
            for (const e of this.f9t)
              ModelManager_1.ModelManager.FriendModel.GetFriendDataInApplicationById(
                e.Id,
              )?.Debug || this.C8t.push(e.Id);
            FriendController_1.FriendController.RequestFriendApplyHandle(
              this.C8t,
              Protocol_1.Aki.Protocol.A6s.Proto_Reject,
            );
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.R9t = () => {
        var e = ModelManager_1.ModelManager.FriendModel.FilterState,
          t = new UiPopViewData_1.UiPopViewData();
        1 === e && UiManager_1.UiManager.OpenView("FriendBlackListView", t);
      }),
      (this.U9t = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "CopiedMyUid",
        ),
          UE.LGUIBPLibrary.ClipBoardCopy(
            ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
          );
      }),
      (this.e9t = () => {
        this.u8t();
      }),
      (this.A9t = () => {
        2 === ModelManager_1.ModelManager.FriendModel.FilterState && this.u8t();
      }),
      (this.m9t = (t) => {
        for (let e = 0; e < this.C9t.length; e++)
          if (this.C9t[e].Id === t)
            return void this.g9t.UnsafeGetGridProxy(e)?.RefreshMute();
      }),
      (this.P9t = () => {
        (this.C9t = FriendController_1.FriendController.CreateFriendItemSt(
          ModelManager_1.ModelManager.FriendModel.GetRecentlyTeamIds(),
          0,
        )),
          this.bqe(this.C9t),
          this.x9t();
      }),
      (this.DDo = () => {
        var e =
          !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkFriendOnlyState();
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SaveSdkFriendOnlyState(
          e,
        ),
          this.u8t();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [8, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [9, UE.UIButtonComponent],
      [5, UE.UIText],
      [10, UE.UIExtendToggle],
      [11, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [9, this.U9t],
        [10, this.DDo],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateFriendViewShow,
      this.e9t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FriendApplicationListUpdate,
        this.A9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.m9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.m9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent,
        this.P9t,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateFriendViewShow,
      this.e9t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FriendApplicationListUpdate,
        this.A9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddMutePlayer,
        this.m9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveMutePlayer,
        this.m9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdateRecentlyTeamDataEvent,
        this.P9t,
      );
  }
  async OnBeforeStartAsync() {
    (this.y9t = this.GetLoopScrollViewComponent(2).RootUIComp),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(6))),
      (this.v9t = new ButtonItem_1.ButtonItem(this.GetItem(7)));
    var e = this.GetItem(3);
    (this.g9t = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      e.GetOwner(),
      this.I9t,
    )),
      this.Jxa(),
      await this.UDt();
  }
  OnBeforeShow() {
    this.u8t();
  }
  OnBeforeDestroy() {
    this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      (this.S9t = []),
      this.g9t && (this.g9t = void 0),
      ModelManager_1.ModelManager.FriendModel.Clear(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      ),
      ModelManager_1.ModelManager.FriendModel.ClearTestFriendData();
  }
  async UDt() {
    (this.S9t =
      ConfigManager_1.ConfigManager.FriendConfig.GetAllFilterConfigDuplicate()),
      this.S9t.sort((e, t) => e.Id - t.Id);
    var e = new CommonTabComponentData_1.CommonTabComponentData(
        this.R6e,
        this.pqe,
        this.yqe,
      ),
      t =
        ((this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            e,
            this.CloseClick,
          )),
        this.S9t.length),
      i = this.Ivt.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++)
      2 === this.S9t[e].Id && (i[e].RedDotName = "FriendNewApplication");
    await this.Ivt.RefreshTabItemAsync(i), this.Ivt.SelectToggleByIndex(0);
  }
  u8t() {
    var e = ModelManager_1.ModelManager.FriendModel;
    switch ((this.w9t(), e.FilterState)) {
      case 1:
        (this.C9t = FriendController_1.FriendController.CreateFriendItemSt(
          e.GetFriendSortedListIds(),
          0,
        )),
          this.bqe(this.C9t),
          this.p9t.SetEnableClick(!0),
          this.v9t.SetEnableClick(!0),
          this.x9t();
        break;
      case 2:
        (this.C9t = FriendController_1.FriendController.CreateFriendItemSt(
          e.GetFriendApplyListIds(),
          0,
        )),
          (this.f9t = this.C9t),
          this.bqe(this.C9t),
          this.p9t.SetEnableClick(0 < this.C9t.length),
          this.v9t.SetEnableClick(0 < this.C9t.length),
          ModelManager_1.ModelManager.FriendModel.MarkDirtyNewApplications(),
          this.x9t();
        break;
      case 3:
        this.y9t?.SetUIActive(!1),
          FriendController_1.FriendController.RequestFriendRecentlyTeam();
    }
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(8),
      "FriendMyUid",
      ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshFriendApplicationRedDot,
      );
  }
  B9t() {
    let e = !1;
    switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
      case 1:
        (e = !0),
          this.p9t.SetLocalText("FriendAddFriend"),
          this.p9t.SetFunction(this.T9t),
          this.v9t.SetLocalText("FriendBlackList"),
          this.v9t.SetFunction(this.R9t);
        break;
      case 2:
        (e = !0),
          this.p9t.SetLocalText("FriendAllAccept"),
          this.p9t.SetFunction(this.L9t),
          this.v9t.SetLocalText("FriendAllIgnore"),
          this.v9t.SetFunction(this.D9t);
    }
    this.p9t.SetActive(e), this.v9t.SetActive(e);
  }
  w9t() {
    let e = "FriendNotAvailableFriend";
    switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
      case 1:
        break;
      case 2:
        e = "FriendNotAvailableFriendApplication";
        break;
      case 3:
        e = "FriendNotAvailableRecentTeammate";
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), e), this.B9t();
  }
  x9t() {
    var e = ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(
        ModelManager_1.ModelManager.FriendModel.FilterState,
      ),
      t = this.GetText(1),
      i = this.C9t.length;
    let r = "FriendCount";
    switch (ModelManager_1.ModelManager.FriendModel.FilterState) {
      case 1:
        break;
      case 2:
        r = "FriendApplicationCount";
        break;
      case 3:
        r = "FriendMultiplayerCount";
    }
    LguiUtil_1.LguiUtil.SetLocalText(t, r, i, e),
      this.GetItem(4).SetUIActive(i <= 0);
  }
  bqe(e) {
    this.g9t && 0 < e.length
      ? (this.y9t?.SetUIActive(!0), this.g9t.ReloadData(e))
      : this.y9t?.SetUIActive(!1);
  }
  Jxa() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.SupportSwitchFriendShowType()
      ? (this.GetExtendToggle(10).RootUIComp.SetUIActive(!0),
        this.GetText(11).SetUIActive(!0),
        this.Zxa())
      : (this.GetExtendToggle(10).RootUIComp.SetUIActive(!1),
        this.GetText(11).SetUIActive(!1));
  }
  Zxa() {
    var e =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetSdkFriendOnlyState()
        ? 1
        : 0;
    this.GetExtendToggle(10).SetToggleState(e);
  }
}
exports.FriendView = FriendView;
//# sourceMappingURL=FriendView.js.map
