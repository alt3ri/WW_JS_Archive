"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineHallView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const InstanceDungeonMatchingCountDown_1 = require("../../InstanceDungeon/InstanceDungeonMatchingCountDown");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const OnlineController_1 = require("../OnlineController");
const OnlineHallItem_1 = require("./OnlineHallItem");
const OnlineTeamItem_1 = require("./OnlineTeamItem");
class OnlineHallView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.bGi = void 0),
      (this.qGi = void 0),
      (this.ohi = void 0),
      (this.GGi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name)),
      (this.NGi = () => new OnlineTeamItem_1.OnlineTeamItem()),
      (this.OGi = (e) => {
        e === 1 &&
          (ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!0),
          this.kGi(
            ModelManager_1.ModelManager.OnlineModel.ShowCanJoin
              ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormFriend()
              : ModelManager_1.ModelManager.OnlineModel.FriendWorld,
          )),
          e === 0 &&
            (ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!1),
            this.kGi(
              ModelManager_1.ModelManager.OnlineModel.ShowCanJoin
                ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormStranger()
                : ModelManager_1.ModelManager.OnlineModel.StrangerWorld,
            ));
      }),
      (this.FGi = (e) => {
        e === 1 &&
          (ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!0),
          this.kGi(
            ModelManager_1.ModelManager.OnlineModel.ShowFriend
              ? ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormFriend()
              : ModelManager_1.ModelManager.OnlineModel.GetCanJoinFormStranger(),
          )),
          e === 0 &&
            (ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!1),
            this.kGi(
              ModelManager_1.ModelManager.OnlineModel.ShowFriend
                ? ModelManager_1.ModelManager.OnlineModel.FriendWorld
                : ModelManager_1.ModelManager.OnlineModel.StrangerWorld,
            ));
      }),
      (this.Opt = () => {
        this.CloseMe();
      }),
      (this.VGi = () => {
        UiManager_1.UiManager.OpenView("OnlineSettingView");
      }),
      (this.HGi = () => {
        UiManager_1.UiManager.OpenView(
          "OnlineWorldSearchView",
          void 0,
          (e, t) => {
            this.AddChildViewById(t);
          },
        );
      }),
      (this.jGi = () => {
        const e = this.GetText(8);
        const t =
          "PermissionsSetting_" +
          ModelManager_1.ModelManager.OnlineModel.CurrentPermissionsSetting;
        LguiUtil_1.LguiUtil.SetLocalText(e, t);
      }),
      (this.WGi = () => {
        this.kGi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld);
      }),
      (this.KGi = () => {
        this.QGi(ModelManager_1.ModelManager.OnlineModel.GetTeamList()),
          this.XGi();
      }),
      (this.G$e = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() ===
        0
          ? this.ohi?.PlayAnimation("Close")
          : ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() ===
              2 && this.ohi?.PlayAnimation("Finish");
      }),
      (this.N$e = () => {
        this.ohi?.PlayAnimation("Start"),
          this.ohi.SetMatchingTime(0),
          this.ohi.StartTimer();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIExtendToggle],
      [3, UE.UIExtendToggle],
      [4, UE.UIButtonComponent],
      [5, UE.UILoopScrollViewComponent],
      [6, UE.UIItem],
      [8, UE.UIText],
      [7, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.Opt],
        [1, this.VGi],
        [4, this.HGi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.ohi =
      new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
      await this.ohi.CreateByActorAsync(this.GetItem(12).GetOwner()),
      this.ohi.SetActive(!1);
  }
  OnStart() {
    this.XGi(),
      this.$Gi(),
      ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
        ? this.QGi(ModelManager_1.ModelManager.OnlineModel.GetTeamList())
        : OnlineController_1.OnlineController.RefreshWorldList() ||
          this.kGi(ModelManager_1.ModelManager.OnlineModel.StrangerWorld),
      ModelManager_1.ModelManager.OnlineModel.SetHallShowCanJoin(!1),
      ModelManager_1.ModelManager.OnlineModel.SetHallShowFriend(!1),
      this.jGi(),
      (ModelManager_1.ModelManager.FriendModel.ShowingView = this.Info.Name);
  }
  OnAfterShow() {
    this.ohi.BindOnStopTimer(
      () =>
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !==
        1,
    ),
      this.ohi.BindOnClickBtnCancelMatching(() => {
        this.ohi?.PlayAnimation("Close"),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
      }),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() ===
        1 && (this.ohi?.PlayAnimation("Start"), this.ohi.StartTimer());
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(2).OnStateChange.Remove(this.OGi),
      this.GetExtendToggle(3).OnStateChange.Remove(this.OGi),
      this.bGi && this.bGi.ClearGridProxies(),
      (this.bGi = void 0),
      this.qGi && this.qGi.ClearGridProxies(),
      (this.qGi = void 0),
      (this.ohi = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshPermissionsSetting,
      this.jGi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshWorldList,
        this.WGi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
        this.KGi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingChange,
        this.G$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.N$e,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshPermissionsSetting,
      this.jGi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshWorldList,
        this.WGi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
        this.KGi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingChange,
        this.G$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.N$e,
      );
  }
  XGi() {
    let e, t, i;
    ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
      ? ((e = this.GetItem(9)),
        (t = this.GetItem(10)),
        (i = this.GetText(11)),
        e.SetUIActive(!1),
        t.SetUIActive(!0),
        i.SetText(
          ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() +
            "/" +
            ModelManager_1.ModelManager.OnlineModel.TeamMaxSize,
        ))
      : (this.GetExtendToggle(2).OnStateChange.Add(this.OGi),
        this.GetExtendToggle(3).OnStateChange.Add(this.FGi));
  }
  $Gi() {
    let e;
    const t = this.GetLoopScrollViewComponent(5);
    ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
      ? ((e = this.GetItem(6).GetOwner()),
        (this.qGi = new LoopScrollView_1.LoopScrollView(t, e, this.NGi)))
      : ((e = this.GetItem(6).GetOwner()),
        (this.bGi = new LoopScrollView_1.LoopScrollView(t, e, this.GGi)));
  }
  kGi(e) {
    const t = this.GetItem(7);
    const i = this.GetLoopScrollViewComponent(5).RootUIComp;
    !e || e.length <= 0
      ? (t.SetUIActive(!0), i.SetUIActive(!1))
      : (i.SetUIActive(!0),
        t.SetUIActive(!1),
        this.bGi && this.bGi.ReloadData(e));
  }
  QGi(e) {
    const t = this.GetItem(7);
    e.length <= 0
      ? (t.SetUIActive(!0), this.qGi.ReloadData(e))
      : (t.SetUIActive(!1), this.qGi && this.qGi.ReloadData(e));
  }
}
exports.OnlineHallView = OnlineHallView;
// # sourceMappingURL=OnlineHallView.js.map
