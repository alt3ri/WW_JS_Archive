"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExploreDetailView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  UiModel_1 = require("../../../Ui/UiModel"),
  HelpController_1 = require("../../Help/HelpController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ExploreProgressController_1 = require("../ExploreProgressController"),
  MapAreaRewardPanel_1 = require("./MapAreaRewardPanel"),
  MapExploreDetailItem_1 = require("./MapExploreDetailItem"),
  MapExplorePlayProgressPanel_1 = require("./MapExplorePlayProgressPanel");
class MapExploreDetailView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.YOl = void 0),
      (this.zOl = []),
      (this.JOl = 0),
      (this.ZOl = void 0),
      (this.ExploreScroll = void 0),
      (this.zJa = void 0),
      (this.eNl = void 0),
      (this.tNl = void 0),
      (this.wOl = () => {
        ExploreProgressController_1.ExploreProgressController.ReceiveAreaStageRewardAsyncRequest(
          this.YOl.GetStageRewardDataList()
            .filter((t) => 1 === t.State)
            .map((t) => t.Id),
        );
      }),
      (this.T8l = () => {
        var t = this.b8l(),
          t =
            (this.ExploreScroll?.ScrollToGridIndex(t),
            this.ExploreScroll?.DeselectCurrentGridProxy(!1),
            this.ExploreScroll?.SelectGridProxy(t),
            this.ExploreScroll?.UnsafeGetGridProxy(t));
        t &&
          UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
            t.GetBtnRootItem(),
            !0,
          );
      }),
      (this.iNl = () => {
        return new MapExploreDetailItem_1.MapExploreDetailItem();
      }),
      (this.rNl = () => {
        UiManager_1.UiManager.OpenView("MapAreaShowView", {
          CountryId: this.YOl.CountryId,
          AreaId: this.YOl.AreaId,
          OnClickArea: this.L8l,
        });
      }),
      (this.oNl = () => {
        UiManager_1.UiManager.OpenView(
          "MapExploreStoryView",
          { AreaData: this.YOl },
          this.Zjl,
        );
      }),
      (this.nNl = () => {
        var t = this.eNl?.GetPhantomSkillHelpId();
        t && HelpController_1.HelpController.OpenHelpById(t);
      }),
      (this.sNl = () => {
        this.eNl &&
          UiManager_1.UiManager.OpenView(
            "ExploreMissionView",
            this.eNl.AreaId,
            this.Zjl,
          );
      }),
      (this.aNl = () => {
        UiManager_1.UiManager.OpenView(
          "MapPlayPointDetailView",
          { ExploreAreaItemData: this.eNl },
          this.Zjl,
        );
      }),
      (this.Zjl = (t, i) => {
        t && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(i);
      }),
      (this.lNl = () => {
        UiManager_1.UiManager.IsViewShow("WorldMapView")
          ? this.eNl?.TrackPlayPoint()
          : ModelManager_1.ModelManager.ExploreProgressModel.SetTrackExploreAreaItemData(
              this.eNl,
            ),
          this.CloseMe();
      }),
      (this.hNl = () => {
        this.CloseMe();
      }),
      (this._Nl = () => {
        this.uNl(-1), this.PlaySequence("SwitchLeft");
      }),
      (this.cNl = () => {
        this.uNl(1), this.PlaySequence("SwitchRight");
      }),
      (this.L8l = (t) => {
        this.IsDestroyOrDestroying ||
          (UiManager_1.UiManager.CloseView("MapAreaShowView"),
          this.YOl?.AreaId !== t && this.dNl(t) && this.IsShow && this.CNl());
      }),
      (this.gNl = (t) => {
        this.ZOl?.UpdateRewardIds(t);
      }),
      (this.pNl = (t) => {
        this.YOl?.AreaId === t &&
          this.ZOl?.RefreshProgressBarDynamic(this.YOl.GetProgress());
      }),
      (this.fNl = (t) => {
        (this.eNl = t), this.vNl();
      }),
      (this.SNl = (t) => {
        this.YOl?.AreaId === t && this.vNl();
      }),
      (this.MNl = () => {
        this.yNl();
      }),
      (this.A8l = (t, i) => {
        this.YOl?.AreaId === t ? this.x8l(i) : this.R8l(t, i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UILoopScrollViewComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UITexture],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIButtonComponent],
      [16, UE.UIItem],
      [17, UE.UIButtonComponent],
      [18, UE.UIButtonComponent],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIText],
      [24, UE.UIItem],
      [25, UE.UIText],
      [26, UE.UISprite],
      [27, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this._Nl],
        [2, this.cNl],
        [4, this.oNl],
        [6, this.rNl],
        [15, this.nNl],
        [10, this.sNl],
        [17, this.aNl],
        [18, this.lNl],
      ]);
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam,
      i = t.AreaId;
    this.dNl(i) &&
      ((this.ZOl = new MapAreaRewardPanel_1.MapAreaRewardPanel()),
      await this.ZOl.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
      this.ZOl.InitCommonRewardPopup(this.RootItem),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.hNl),
      (this.tNl =
        new MapExplorePlayProgressPanel_1.MapExplorePlayProgressPanel()),
      await this.tNl.Init(this.GetItem(16)),
      t?.ExploreType &&
        (this.eNl = this.YOl.GetExploreAreaItemData(t.ExploreType)),
      this.InitExploreScroll());
  }
  OnStart() {
    this.GetText(25)?.SetText("0");
  }
  ENl() {
    this.ZOl?.ChangeParamData({
      InitValue: this.YOl.GetProgress(),
      MaxValue: this.YOl.MaxExploreProgress,
      RewardDataList: this.YOl.GetStageRewardDataList(),
      GetRewardCallback: this.wOl,
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnReceiveAreaStageRewardResponse,
      this.gNl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAreaExploreProgressUpdate,
        this.pNl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MapExploreDetailItemClick,
        this.fNl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AreaPlayPointUpdate,
        this.SNl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AreaStoryProgressSave,
        this.MNl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap,
        this.A8l,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnReceiveAreaStageRewardResponse,
      this.gNl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAreaExploreProgressUpdate,
        this.pNl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MapExploreDetailItemClick,
        this.fNl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AreaPlayPointUpdate,
        this.SNl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AreaStoryProgressSave,
        this.MNl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap,
        this.A8l,
      );
  }
  OnBeforeShow() {
    this.CNl() || this.CloseMe();
  }
  OnBeforeDestroy() {
    (this.ZOl = void 0), (this.zJa = void 0);
  }
  InitExploreScroll() {
    var t = this.GetLoopScrollViewComponent(3);
    this.ExploreScroll = new LoopScrollView_1.LoopScrollView(
      t,
      this.GetItem(20).GetOwner(),
      this.iNl,
    );
  }
  INl() {
    this.ExploreScroll?.RefreshByData(
      this.YOl.GetAllExploreAreaItemData(),
      !1,
      this.T8l,
      !0,
    );
  }
  b8l() {
    var t = this.YOl.GetAllExploreAreaItemData();
    let i = 0;
    return (
      -1 ===
        (i = this.eNl
          ? t.findIndex((t) => t.ExploreType === this.eNl.ExploreType)
          : i) && ((i = 0), (this.eNl = t[i])),
      i
    );
  }
  uNl(t) {
    var i = this.zOl.length,
      t = this.JOl + t;
    (t = MathUtils_1.MathUtils.Clamp(t, 0, i - 1)) !== this.JOl &&
      ((this.JOl = t), (this.YOl = this.zOl[t]), this.CNl());
  }
  CNl() {
    if (!this.YOl) return !1;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ExploreProgress",
        69,
        "UpdateAreaData",
        ["AreaId", this.YOl.AreaId],
        [
          "AreaName",
          ConfigManager_1.ConfigManager.TextConfig?.GetMultiTextByKey(
            this.YOl.GetNameId(),
          ),
        ],
      ),
      this.GetButton(1)?.RootUIComp.SetUIActive(0 < this.JOl),
      this.GetButton(2)?.RootUIComp.SetUIActive(this.JOl < this.zOl.length - 1),
      this.YOl.CheckUpdatePlayPointData(),
      this.TNl(),
      this.ENl(),
      this.INl();
    var t = this.YOl.GetProgress();
    return (
      this.GetSprite(26)?.SetFillAmount(t / 100), this.LNl(), this.yNl(), !0
    );
  }
  TNl() {
    this.GetText(5)?.ShowTextNew(this.YOl.GetNameId());
    var t = this.YOl.GetProgress(),
      i = t + "%",
      i = (this.GetText(8)?.SetText(i), this.GetText(25));
    i.SetChangeColor(0 < t, i.changeColor);
  }
  dNl(t) {
    var i =
      ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t);
    return i
      ? ((this.YOl = i),
        this.zOl.length <= 0 &&
          ((this.zOl =
            ModelManager_1.ModelManager.ExploreProgressModel.GetAllAreaDataListSortCountryState()),
          this.zOl.forEach((t) => {
            t.ClearFlagUpdatePlayPointData();
          })),
        (this.JOl = this.zOl.findIndex((t) => t.AreaId === this.YOl.AreaId)),
        !0)
      : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
          "Area Id Cannot Be Found: " + t,
        ),
        !1);
  }
  OnTick(t) {
    this.ZOl?.OnTickRefresh(t);
  }
  x8l(t, i = !0) {
    t &&
      t !== this.eNl.ExploreType &&
      (t = this.YOl.GetExploreAreaItemData(t)) &&
      ((this.eNl = t), i) &&
      this.T8l();
  }
  R8l(t, i) {
    this.dNl(t) && (this.x8l(i, !1), this.CNl());
  }
  vNl() {
    var t,
      i = !!this.eNl?.IsUnlocked();
    this.GetItem(21)?.SetUIActive(i),
      this.GetItem(22)?.SetUIActive(!i),
      i
        ? (this.SetTextureByPath(this.eNl.DescBg, this.GetTexture(11)),
          this.GetText(12)?.ShowTextNew(this.eNl.DescId),
          (i = this.eNl.IsCompleted()),
          (t = this.eNl.HasPhantomSkill()),
          this.GetItem(24)?.SetUIActive(i),
          this.GetItem(13)?.SetUIActive(!i && t),
          this.UNl(),
          (t = this.eNl.IsShowTrackBtn && !i),
          this.GetButton(18)?.RootUIComp.SetUIActive(t),
          (i = this.GetText(14)),
          (t = this.eNl.GetIsPhantomSkillUnlock()
            ? this.eNl.GetUnlockTextId()
            : this.eNl.GetLockTextId()) && i.ShowTextNew(t),
          i.SetUIActive(!!t),
          (i = 6 === this.eNl.ExploreType),
          this.GetButton(10).RootUIComp.SetUIActive(i))
        : (t = this.eNl?.GetLockDetailId()) && this.GetText(23)?.ShowTextNew(t);
  }
  UNl() {
    var t = this.eNl.IsShowProgressBar;
    this.GetItem(19)?.SetUIActive(t),
      t &&
        (this.tNl?.UpdateData(this.eNl.GetPlayProgressDataIgnoreHiddenList()),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateExploreProgressBar,
        ));
  }
  LNl() {
    for (const t of this.zOl)
      if (t.AreaId !== this.YOl.AreaId && t.HasCanTakeStageReward())
        return void this.GetItem(9)?.SetUIActive(!0);
    this.GetItem(9)?.SetUIActive(!1);
  }
  yNl() {
    var t = this.YOl.HasNewStoryUnlocked();
    this.GetItem(27)?.SetUIActive(t);
  }
  get IsShowProgressBar() {
    return this.eNl?.IsShowProgressBar;
  }
}
exports.MapExploreDetailView = MapExploreDetailView;
//# sourceMappingURL=MapExploreDetailView.js.map
