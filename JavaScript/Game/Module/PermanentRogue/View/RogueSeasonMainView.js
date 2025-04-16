"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueSeasonEntranceView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityManager_1 = require("../../Activity/ActivityManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../Help/HelpController"),
  MapRogueController_1 = require("../../MapRogue/MapRogueController"),
  PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController"),
  RogueResOutDefine_1 = require("../Define/RogueResOutDefine"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueSeasonEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Z5c = 0),
      (this.e6c = void 0),
      (this.t6c = void 0),
      (this.i6c = void 0),
      (this.r6c = void 0),
      (this.o6c = void 0),
      (this.DS1 = void 0),
      (this.dE1 = !1),
      (this._5e = () => {
        this.CloseMe();
      }),
      (this.n6c = () => {
        var e =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSeasonHelpId(
            this.Z5c,
          );
        e && HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.s6c = () => {
        UiManager_1.UiManager.OpenView("RogueIllustratedView");
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
          this.Z5c,
        ) ||
          (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheShopOpen(
            this.Z5c,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
            this.Z5c,
          ));
        var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(
            this.Z5c,
          ).ShopId,
          t = new PayShopViewData_1.PayShopViewData();
        (t.PayShopId = e),
          (t.ShowShopIdList = [e]),
          ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(
            t,
            () => {
              var e =
                ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(
                  this.Z5c,
                );
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshShopAccumulateCurrency,
                "Item_Cumulative_Acquisition",
                e[0] + "/" + e[1],
              );
            },
          );
      }),
      (this.a6c = () => {
        UiManager_1.UiManager.OpenView("RogueResSkillView", this.Z5c);
      }),
      (this.h6c = () => {
        UiManager_1.UiManager.OpenView("RogueResEndingView", this.Z5c);
      }),
      (this.rki = () => {
        var e;
        this.dE1 ||
          (((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
            310,
          )).IsEscViewTriggerCallBack = !1),
          e.FunctionMap.set(2, this.WT1),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ));
      }),
      (this.WT1 = () => {
        (this.dE1 = !0),
          MapRogueController_1.MapRogueController.RequestInstResultEnd().then(
            () => {
              this.GetItem(10)?.SetUIActive(!1),
                (this.dE1 = !1),
                (this.DS1 = 0);
            },
          );
      }),
      (this.l6c = () => {
        var e, t;
        this.dE1
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("RogueBattle", 77, "肉鸽进度请求中，未返回。")
          : this.DS1 && 0 < this.DS1
            ? (((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                306,
              )).IsEscViewTriggerCallBack = !1),
              t.FunctionMap.set(1, this.rki),
              t.FunctionMap.set(2, this.US1),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                t,
              ))
            : ((t = RogueResThemeById_1.configRogueResThemeById.GetConfig(
                this.Z5c,
              )),
              ((e = new RogueResOutDefine_1.RogueDungeonParam()).SeasonId =
                this.Z5c),
              (e.DungeonList = t.Insts),
              ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheDungeonNewest(
                this.Z5c,
              ) !==
                (t =
                  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(
                    this.Z5c,
                  )) &&
                (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheDungeonNewest(
                  this.Z5c,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
                  this.Z5c,
                ),
                ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCurrentSelectedInst(
                  t,
                )),
              UiManager_1.UiManager.OpenView("RogueDungeonEntryView", e));
      }),
      (this.Nu1 = () => {
        this.GetItem(15)?.SetUIActive(!1),
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailEndTime(
            this.Z5c,
          ) !==
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTrailOpen(
              this.Z5c,
            ) &&
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheTrailOpen(
              this.Z5c,
            ),
          UiManager_1.UiManager.OpenView("RogueResTrialView", this.Z5c);
      }),
      (this.US1 = () => {
        ActivityManager_1.ActivityManager.GetActivityController(
          Protocol_1.Aki.Protocol.uks.Proto_RogueRes,
        ).RequestEnterDungeon(this.DS1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UITexture],
      [14, UE.SpineSkeletonAnimationComponent],
      [15, UE.UIItem],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.n6c],
        [9, this.rki],
        [11, this.l6c],
        [12, this.Nu1],
      ]);
  }
  async OnBeforeStartAsync() {
    this.Z5c = this.OpenParam;
    var e = [];
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
      this.Z5c,
    ),
      (this.e6c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.e6c.SetOnClickCall(this.s6c),
      e.push(this.e6c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
      (this.t6c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.t6c?.SetOnClickCall(this.I5c),
      e.push(this.t6c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
      (this.i6c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.i6c?.SetOnClickCall(this.iyi),
      e.push(this.i6c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
      (this.r6c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.r6c?.SetOnClickCall(this.a6c),
      e.push(this.r6c.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
      (this.o6c = new RogueOutButtonItem_1.RogueButtonItemA()),
      this.o6c?.SetOnClickCall(this.h6c),
      e.push(this.o6c.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())),
      e.push(this.CheckDungeonProgress()),
      await Promise.all(e);
  }
  async CheckDungeonProgress() {
    var e = this.GetItem(10),
      t =
        (e?.SetUIActive(!1),
        await ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResLastInstInfo()),
      e =
        ((this.DS1 = t ? t.r6n : void 0),
        !this.DS1 || this.DS1 <= 0
          ? ((t =
              ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(
                this.Z5c,
              )),
            (t =
              RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
                t,
              )) &&
              !StringUtils_1.StringUtils.IsBlank(t.SpineMainF) &&
              (await this.SetSpineAssetByPath(
                t.SpineAtlasF,
                t.SpineMainF,
                this.GetSpine(14),
              )))
          : ((t =
              RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
                this.DS1,
              )),
            (t = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
              t.Title,
              t.Title,
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(8),
              "RogueRes_Challenge_Progress",
              t,
            ),
            e?.SetUIActive(!0),
            (t =
              RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
                this.DS1,
              )) &&
              !StringUtils_1.StringUtils.IsBlank(t.SpineMainF) &&
              (await this.SetSpineAssetByPath(
                t.SpineAtlasF,
                t.SpineMainF,
                this.GetSpine(14),
              ))),
        ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()),
      t = 0 === e ? "IdleF" : "IdleM";
    this.GetSpine(14)?.SetAnimation(0, t, !0);
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this._5e),
      this.lqe.SetTitleTextActive(!1),
      this.lqe.SetTitleIconVisible(!1),
      this.lqe.SetHelpBtnActive(!1);
    var e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTrailEndTime(
          this.Z5c,
        ),
      t =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheTrailOpen(
          this.Z5c,
        );
    this.GetItem(15)?.SetUIActive(e !== t);
  }
  OnBeforeShow() {
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Z5c);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name),
      this.ZGe(),
      this.K8e(),
      RedDotController_1.RedDotController.BindRedDot(
        "RogueResInst",
        this.GetItem(16),
        void 0,
        this.Z5c,
      );
  }
  async OnBeforeShowAsyncImplement() {
    var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Z5c),
      e =
        0 === ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()
          ? e.CoverF
          : e.CoverM;
    await this.SetTextureAsync(e, this.GetTexture(13));
  }
  OnBeforeHide() {
    this.W8e(),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "RogueResInst",
        this.GetItem(16),
      );
  }
  OnBeforeDestroy() {
    (this.lqe = void 0),
      (this.e6c = void 0),
      (this.t6c = void 0),
      (this.i6c = void 0),
      (this.r6c = void 0),
      (this.o6c = void 0);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  ZGe() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel,
      t = (this.e6c?.SetNum(""), e.GetTaskCount()),
      t = (this.t6c?.SetNum(t[0] + "/" + t[1]), e.GetShopCount(this.Z5c)),
      t = (this.i6c?.SetNum(t[0] + "/" + t[1]), e.GetSkillTreeLevel(this.Z5c)),
      t = (this.r6c?.SetNum("LV" + t), e.GetEndingCount(this.Z5c));
    this.o6c?.SetNum(t[0] + "/" + t[1]);
  }
  K8e() {
    this.e6c?.BindRedDot("RogueResIllustrated"),
      this.t6c?.BindRedDot("RogueResTask"),
      this.i6c?.BindRedDot("RogueResShop", this.Z5c),
      this.r6c?.BindRedDot("RogueResSkillTree", this.Z5c),
      this.o6c?.BindRedDot("RogueResEnding", this.Z5c);
  }
  W8e() {
    this.e6c?.UnBindRedDot(),
      this.t6c?.UnBindRedDot(),
      this.i6c?.UnBindRedDot(),
      this.o6c?.UnBindRedDot(),
      this.r6c?.UnBindRedDot();
  }
}
exports.RogueSeasonEntranceView = RogueSeasonEntranceView;
//# sourceMappingURL=RogueSeasonMainView.js.map
