"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewPermanentRogue = void 0);
const UE = require("ue"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../Activity/View/SubView/ActivitySubViewGeneralInfo"),
  HelpController_1 = require("../../Help/HelpController"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class ActivitySubViewPermanentRogue extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.y5c = void 0),
      (this.S5c = void 0),
      (this.M5c = void 0),
      (this.i8c = 0),
      (this.E5c = () => {
        var e;
        this.ActivityBaseData.GetPreGuideQuestFinishState()
          ? ((e = RogueResThemeById_1.configRogueResThemeById.GetConfig(
              this.i8c,
            )),
            UiManager_1.UiManager.OpenView(e.ViewName, this.i8c))
          : ((e = this.ActivityBaseData.GetUnFinishPreGuideQuestId()),
            UiManager_1.UiManager.OpenView("QuestView", e));
      }),
      (this.I5c = () => {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTaskOpen() <=
          TimeUtil_1.TimeUtil.GetServerTime() &&
          (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTaskOpen(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PermanentRogueRewardUpdate,
          )),
          UiManager_1.UiManager.OpenView("RogueTaskView");
      }),
      (this.iyi = () => {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheShopOpen(
          this.i8c,
        ) ||
          (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheShopOpen(
            this.i8c,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
            this.i8c,
          ));
        var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(
            this.i8c,
          ).ShopId,
          t = new PayShopViewData_1.PayShopViewData();
        (t.PayShopId = e),
          (t.ShowShopIdList = [e]),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            t,
            () => {
              var e =
                ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(
                  this.i8c,
                );
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshShopAccumulateCurrency,
                "Item_Cumulative_Acquisition",
                e[0] + "/" + e[1],
              );
            },
          );
      }),
      (this.PS1 = () => {
        var e =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(
            this.i8c,
          );
        e && HelpController_1.HelpController.OpenHelpById(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.SpineSkeletonAnimationComponent],
    ]),
      (this.BtnBindInfo = [[1, this.PS1]]);
  }
  async OnBeforeStartAsync() {
    (this.y5c = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo()),
      this.y5c.SetData(this.ActivityBaseData),
      await this.y5c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.y5c?.SetClickFunc(this.E5c),
      (this.S5c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.S5c.SetOnClickCall(this.I5c),
      await this.S5c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      (this.M5c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.M5c.SetOnClickCall(this.iyi),
      await this.M5c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.y5c.SetBtnText("PrefabTextItem_632974650_Text");
  }
  OnRefreshView() {
    this.i8c =
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    var e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().CheckAllRedDot(),
      e =
        (this.y5c?.SetFunctionRedDotVisible(e),
        this.zao(),
        this.K8e(),
        this.wn1(),
        RogueResThemeById_1.configRogueResThemeById.GetConfig(this.i8c)),
      e =
        (this.y5c?.SetSubTitleTextById(e.Name),
        RogueResThemeById_1.configRogueResThemeById.GetConfig(this.i8c)),
      e =
        0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
          ? e.CoverF
          : e.CoverM;
    this.SetTextureByPath(e, this.GetTexture(7)),
      this.GetSpine(8).SetAnimation(0, "idle", !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.ActivityBaseData.Id,
      );
  }
  OnBeforeHide() {
    this.W8e();
  }
  OnBeforeDestroy() {
    (this.y5c = void 0), (this.S5c = void 0), (this.M5c = void 0);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  K8e() {
    this.S5c?.BindRedDot("RogueResTask"),
      this.M5c?.BindRedDot("RogueResShop", this.i8c);
  }
  W8e() {
    this.S5c?.UnBindRedDot(), this.M5c?.UnBindRedDot();
  }
  zao() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel,
      t = this.ActivityBaseData.IsUnLock(),
      i = this.ActivityBaseData.GetPreGuideQuestFinishState(),
      e =
        (t && i
          ? (this.S5c?.SetUiActive(!0),
            (i = e.GetTaskCount()),
            this.S5c?.SetNum(i[0] + "/" + i[1]),
            this.M5c?.SetUiActive(!0),
            (i = e.GetShopCount(this.i8c)),
            this.M5c?.SetNum(i[0] + "/" + i[1]))
          : (this.S5c?.SetUiActive(!1), this.M5c?.SetUiActive(!1)),
        this.y5c?.GetFunctional());
    t || e?.SetActivateTextByTextId(this.GetCurrentLockConditionText()),
      e?.SetActivatePanelConditionVisible(!t),
      e?.FunctionButton?.SetUiActive(t);
  }
  wn1() {
    var e = this.ActivityBaseData.IsUnLock(),
      t = this.ActivityBaseData.GetPreGuideQuestFinishState();
    e && t
      ? (this.GetItem(4)?.SetUIActive(!0),
        (e =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeonIndex(
            this.i8c,
          )),
        this.GetItem(6).SetUIActive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          "PrefabTextItem_2589264504_Text",
          e + 1,
        ))
      : this.GetItem(4)?.SetUIActive(!1);
  }
}
exports.ActivitySubViewPermanentRogue = ActivitySubViewPermanentRogue;
//# sourceMappingURL=PermanentRogueSubView.js.map
