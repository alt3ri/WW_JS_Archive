"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapSummaryView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Time_1 = require("../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
class RogueBattleMapSummaryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.TabComponent = void 0),
      (this.TabViewComponent = void 0),
      (this.L6e = void 0),
      (this.TabDataList = []),
      (this.rmo = void 0),
      (this.dmo = void 0),
      (this.j0c = () => {
        this.CloseMe();
      }),
      (this.yqe = (e) => {
        e = this.TabDataList[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
        );
      }),
      (this.CanToggleChange = (e) => {
        var t;
        return (
          !!Info_1.Info.IsInGamepad() ||
          ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
            "panel_interval_time",
          )),
          !this.L6e) ||
          Time_1.Time.Now - this.L6e >= t
        );
      }),
      (this.R6e = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        this.L6e = Time_1.Time.Now;
        var t = this.TabDataList[e],
          i = t.ChildViewName,
          e =
            (this.sp1("RogueBattleMapSummaryTeamTabView" === i),
            this.My1("RogueBattleSummaryTokenTabView" === i),
            this.TabComponent.GetTabItemByIndex(e));
        this.TabViewComponent.ToggleCallBack(t, i, e), (this.rmo = i);
      }),
      (this.sp1 = (e) => {
        this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(e),
          this.GetItem(4)?.SetUIActive(!e);
      }),
      (this.My1 = (e) => {
        e
          ? ((e =
              0 ===
              ModelManager_1.ModelManager.RogueBattleModel.GetTokenData()
                .length),
            this.GetItem(2)?.SetUIActive(e),
            this.GetItem(5)?.SetUIActive(!e))
          : (this.GetItem(2)?.SetUIActive(!1),
            this.GetItem(5)?.SetUIActive(!1));
      }),
      (this.Sy1 = () => {
        for (let e = 0; e < this.TabDataList.length; e++)
          if (
            "RogueBattleMapSummaryFettersTabView" ===
            this.TabDataList[e].ChildViewName
          ) {
            this.TabComponent.SelectToggleByIndex(e);
            break;
          }
      }),
      (this.W0c = (e) => {
        ModelManager_1.ModelManager.RogueBattleModel.ChangeDescMode();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResMapSummaryTeamToBondUpdate,
      this.Sy1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryTeamToBondUpdate,
      this.Sy1,
    );
  }
  OnStart() {
    var e;
    (this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(!1),
      this.dmo?.Model?.CheckGetComponent(3)?.SetLoadingOpen(!1),
      this.InitTabComponent(),
      void 0 !== this.OpenParam
        ? ((e = this.OpenParam),
          (this.rmo = e.TabName),
          (ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond =
            e.FetterId ?? 0),
          e.FetterId &&
            0 < e.FetterId &&
            (ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping =
              !0))
        : (ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond = 0),
      this.InitExtendToggle();
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.Q0c();
  }
  OnBeforeDestroy() {
    this.TabComponent &&
      (this.TabComponent.Destroy(), (this.TabComponent = void 0));
  }
  OnHandleLoadScene() {
    this.dmo ||
      (this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
      this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
      "RogueBattleMapSummaryTeamTabView" === this.rmo &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain,
        );
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo),
      (this.dmo = void 0);
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.pqe,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(0),
        e,
        this.j0c,
      )),
      this.TabComponent.SetHelpButtonShowState(!1),
      (this.L6e = void 0),
      this.TabComponent.SetCanChange(this.CanToggleChange),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(1),
      ));
  }
  async Q0c() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
        "RogueBattleMapSummaryView",
      ),
      t = this.TabDataList.toString() !== e.toString(),
      e = ((this.TabDataList = e), this.TabDataList.length),
      e = this.TabComponent.CreateTabItemDataByLength(e);
    if ((await this.TabComponent.RefreshTabItemAsync(e, t), t)) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++)
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      this.TabComponent.SelectToggleByIndex(t, !0);
    }
  }
  InitExtendToggle() {
    var e = this.GetExtendToggle(3),
      t = 1 === ModelManager_1.ModelManager.RogueBattleModel.DescMode ? 1 : 0;
    e?.SetToggleState(t), e?.OnStateChange.Add(this.W0c);
  }
}
exports.RogueBattleMapSummaryView = RogueBattleMapSummaryView;
//# sourceMappingURL=RogueBattleMapSummaryView.js.map
