"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkWhiteCatView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  DreamLinkController_1 = require("../DreamLinkController"),
  DreamLinkRoleSelectPanel_1 = require("./DreamLinkRoleSelectPanel"),
  DreamLinkBossInstanceItem_1 = require("./SubView/DreamLinkBossInstanceItem");
class DreamLinkWhiteCatView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.Otl = void 0),
      (this.Scl = void 0),
      (this.p4e = void 0),
      (this.vVt = void 0),
      (this.ANe = void 0),
      (this.Rml = void 0),
      (this.Uml = !1),
      (this.Ecl = 0),
      (this.$An = (i) => {
        "Start" === i
          ? this.GetSpine(3).SetAnimation(0, "start", !1)
          : "idle" === i && this.GetSpine(3).SetAnimation(0, "idle", !0);
      }),
      (this.Dwa = () => {
        this.Rml && (this.vVt.RefreshAllGridProxies(), this.Dml(this.Rml));
      }),
      (this.BNe = () => {
        this.p4e.SetRedDotVisible(this.ActivityBaseData.CheckHasBossReward());
      }),
      (this.Icl = () => {
        var i = new DreamLinkBossInstanceItem_1.DreamLinkBossInstanceItem();
        return (i.ToggleFunction = this.Tcl), i;
      }),
      (this.Tcl = (i, t) => {
        (this.Rml = i),
          this.Dml(i),
          this.Ecl !== t &&
            (this.vVt.DeselectCurrentGridProxy(!0),
            (this.Ecl = t),
            this.vVt.SelectGridProxy(this.Ecl));
      }),
      (this.OnBtnConfirmClick = () => {
        var i = this.Rml.GetBossRoleIdList();
        for (const s of i)
          if (0 === s)
            return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "DaMaoTips_NotEnough",
            );
        var t = this.Rml.InstId,
          e = { w6n: this.ActivityBaseData.Id, vDs: !1, FMl: this.Rml.TypeId };
        (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Qah =
          e),
          ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(
            t,
            i,
            0,
            0,
          );
      }),
      (this.OpenBossReward = () => {
        this.ActivityBaseData.SaveFirstCheckRedDotState(7),
          UiManager_1.UiManager.OpenView(
            "ActivityRewardPopUpView",
            this.ActivityBaseData.GetBossRewardData(),
          ),
          this.BNe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.SpineSkeletonAnimationComponent],
      [4, UE.SpineSkeletonAnimationComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UILoopScrollViewComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    this.ActivityBaseData =
      DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var i = [],
      t =
        ((this.Otl = new PopupCaptionItem_1.PopupCaptionItem()),
        this.Otl.SetCloseCallBack(() => {
          this.CloseMe();
        }),
        i.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
        (this.Scl = new DreamLinkRoleSelectPanel_1.DreamLinkRoleSelectPanel()),
        i.push(this.Scl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
        this.GetItem(2));
    (this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(void 0)),
      i.push(this.ANe.CreateThenShowByActorAsync(t.GetOwner())),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(7),
        this.GetItem(8).GetOwner(),
        this.Icl,
      )),
      (this.p4e = new ButtonItem_1.ButtonItem(this.GetItem(9))),
      this.p4e.SetFunction(this.OpenBossReward),
      await Promise.all(i),
      this.ANe.FunctionButton.SetFunction(this.OnBtnConfirmClick),
      this.ANe.SetLockConditionButtonVisible(!1),
      await this.v4e();
  }
  OnStart() {
    var i = 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender(),
      t = i ? "nvzhu" : "nanzhu";
    this.GetSpine(4).SetAnimation(0, t, !0),
      this.GetItem(5).SetUIActive(!i),
      this.GetItem(6).SetUIActive(i);
  }
  OnBeforeShow() {
    this.BNe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityCrossDayRefresh,
        this.Dwa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DreamLinkRewardRefresh,
        this.BNe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityCrossDayRefresh,
        this.Dwa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DreamLinkRewardRefresh,
        this.BNe,
      );
  }
  OnTick(i) {
    this.Uml && this.Aml();
  }
  Dml(i) {
    (this.Rml = i),
      (this.Uml = i.GetTickState()),
      this.Scl.SetActive(i.IsUnlock),
      this.ActivityBaseData.FixBossRoleId(i.InstId),
      this.Scl.RefreshInstId(i.InstId),
      this.ANe.FunctionButton.SetActive(i.IsUnlock),
      this.ANe.SetPanelConditionVisible(!i.IsUnlock),
      this.Aml();
    i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i.InstId);
    i &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.MapName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), i.DungeonDesc),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.MonsterTips));
  }
  Aml() {
    this.Rml && this.ANe.SetLockTextByText(this.Rml.GetUnlockText());
  }
  async v4e() {
    await this.vVt.RefreshByDataAsync(
      this.ActivityBaseData.GetAllBossInstData(),
      void 0,
      !0,
    ),
      this.vVt.SelectGridProxy(0, !0);
  }
}
exports.DreamLinkWhiteCatView = DreamLinkWhiteCatView;
//# sourceMappingURL=DreamLinkWhiteCatView.js.map
