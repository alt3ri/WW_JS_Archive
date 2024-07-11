"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ExploreProgressController_1 = require("../../ExploreProgress/ExploreProgressController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ExploreLevelController_1 = require("../ExploreLevelController"),
  ExploreLevelItem_1 = require("./ExploreLevelItem"),
  PLAY_PROGRESS_BAR_TIME = 300;
class ExploreLevelView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.fVt = void 0),
      (this.RVt = void 0),
      (this.bOe = void 0),
      (this.UVt = void 0),
      (this.MHs = 0),
      (this.SHs = 0),
      (this.EHs = 0),
      (this.yHs = 0),
      (this.IHs = 0),
      (this.THs = 0),
      (this.LHs = 0),
      (this.DHs = !1),
      (this.AHs = !1),
      (this.lyt = () => {
        UiManager_1.UiManager.CloseView("ExploreLevelView");
      }),
      (this.AVt = () => {}),
      (this.PVt = () => {
        this.wVt();
        var e = this.fVt.GetExploreScore(),
          t = this.RVt.GetMaxExploreScore();
        t < 0 ? this.xVt() : this.UHs(this.MHs, this.SHs, e, t);
      }),
      (this.BVt = () => {
        (this.fVt =
          ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData()),
          (this.RVt = this.fVt.GetCurrentExploreLevelRewardData());
        var e = this.fVt.GetExploreScore(),
          t = this.RVt.GetMaxExploreScore();
        t < 0 ? this.xVt() : this.UHs(this.MHs, this.SHs, e, t);
      }),
      (this.FQe = (e, t) => {
        "ExploreLevelRewardView" === e && this.RHs(!0);
      }),
      (this.$Ge = (e, t) => {
        "ExploreLevelRewardView" === e && this.RHs(!1);
      }),
      (this.gVt = (e, t, i) => {
        var s = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
        return (
          s.Initialize(t.GetOwner()),
          s.RefreshByConfigId(e[0], e[1]),
          { Key: i, Value: s }
        );
      }),
      (this.qVt = () => {
        var e = new ExploreLevelItem_1.ExploreLevelItem();
        return e.BindOnClickedReceiveButton(this.CVt), e;
      }),
      (this.CVt = (e) => {
        var t = e.AreaId,
          i = e.Progress;
        ExploreLevelController_1.ExploreLevelController.ExploreScoreRewardRequest(
          t,
          i,
        ),
          ExploreLevelController_1.ExploreLevelController.CountryExploreScoreInfoRequest(
            e.CountryId,
            () => {
              e.GetIsReceived() ||
                ((this.MHs = this.fVt.GetExploreScore()),
                (this.SHs = this.RVt.GetMaxExploreScore()),
                this.xHs());
            },
          );
      }),
      (this.GVt = () => {
        UiManager_1.UiManager.OpenView(
          "ExploreLevelPreviewView",
          this.fVt,
          (e, t) => {
            e && this.AddChildViewById(t);
          },
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIText],
      [8, UE.UILoopScrollViewComponent],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [
        [6, this.GVt],
        [10, this.lyt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.fVt =
      ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData()),
      (this.RVt = this.fVt.GetCurrentExploreLevelRewardData()),
      await Promise.all([
        ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
        ExploreLevelController_1.ExploreLevelController.CountryExploreScoreInfoAsyncRequest(
          this.fVt.GetCountryId(),
        ),
      ]);
  }
  OnStart() {
    (this.bOe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(5),
      this.gVt,
    )),
      (this.UVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(8),
        this.GetItem(9).GetOwner(),
        this.qVt,
      )),
      this.bVt(),
      this.xVt(),
      this.wVt();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnExploreScoreRewardResponse,
      this.AVt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
        this.PVt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExploreLevelNotify,
        this.BVt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnExploreScoreRewardResponse,
      this.AVt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
        this.PVt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnExploreLevelNotify,
        this.BVt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnBeforeDestroy() {
    this.bOe.ClearChildren(),
      (this.bOe = void 0),
      this.UVt.ClearGridProxies(),
      (this.UVt = void 0),
      (this.fVt = void 0);
  }
  OnTick(e) {
    if (this.DHs && !this.AHs)
      if (this.IHs < this.EHs) {
        const t = MathUtils_1.MathUtils.Lerp(
          this.EHs,
          this.yHs,
          this.LHs / PLAY_PROGRESS_BAR_TIME,
        );
        this.PHs(t, this.yHs),
          t >= this.yHs && this.UHs(0, this.THs, this.IHs, this.THs),
          void (this.LHs += e);
      } else {
        const t = MathUtils_1.MathUtils.Lerp(
          this.EHs,
          this.IHs,
          this.LHs / PLAY_PROGRESS_BAR_TIME,
        );
        this.PHs(t, this.THs),
          this.LHs >= PLAY_PROGRESS_BAR_TIME
            ? (this.bVt(), this.xVt(), this.BHs())
            : (this.LHs += e);
      }
  }
  UHs(e, t, i, s) {
    (this.EHs = e),
      (this.yHs = t),
      (this.IHs = i),
      (this.THs = s),
      (this.LHs = 0),
      (this.DHs = !0);
  }
  RHs(e) {
    this.AHs = e;
  }
  BHs() {
    (this.DHs = !1), (this.LHs = 0);
  }
  xHs() {
    var e = this.GetUiNiagara(14);
    e.IsUIActiveSelf() ? e.ActivateSystem(!0) : e.SetUIActive(!0);
  }
  bVt() {
    this.Olt(), this.kVt(), this.FVt();
  }
  Olt() {
    var e = this.RVt.GetScoreNameId();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
  }
  kVt() {
    var e = this.RVt.GetScoreTexturePath(),
      t = this.GetTexture(1);
    this.SetTextureByPath(e, t);
  }
  xVt() {
    var e,
      t = this.RVt.GetMaxExploreScore();
    t <= 0
      ? this.GetItem(11)?.SetUIActive(!1)
      : ((e = this.fVt.GetExploreScore()),
        this.PHs(e, t),
        this.SetTextureByPath(
          ModelManager_1.ModelManager.ExploreLevelModel
            .ExploreScoreItemTexturePath,
          this.GetTexture(3),
        ),
        this.GetItem(11)?.SetUIActive(!0));
  }
  PHs(e, t) {
    (e = Math.floor(Math.min(t, e))), (t = Math.floor(t));
    this.GetSprite(2).SetFillAmount(e / t),
      this.GetText(4).SetText(e + "/" + t);
  }
  FVt() {
    var e = this.fVt.GetExploreLevelRewardData(this.RVt.GetExploreLevel() + 1);
    if (e) {
      var e = e.GetDropItemNumMap(),
        t = [];
      if (e) for (var [i, s] of e) t.push([i, s]);
      this.bOe.RefreshByData(t), this.GetItem(13).SetUIActive(!1);
    } else
      this.bOe.ClearChildren(),
        this.bOe.SetActive(!1),
        this.GetItem(13).SetUIActive(!0);
  }
  wVt() {
    var e = this.fVt.GetVisibleExploreScoreDataList();
    e.sort((e, t) => {
      var i = e.GetIsReceived() ? 1 : 0,
        s = t.GetIsReceived() ? 1 : 0;
      return i != s ||
        (i = e.CanReceive() ? -1 : 0) != (s = t.CanReceive() ? -1 : 0)
        ? i - s
        : (i = e.AreaId) !== (s = t.AreaId)
          ? i - s
          : (i = e.Progress) !== (s = t.Progress)
            ? i - s
            : 0;
    }),
      this.UVt.ReloadData(e);
  }
}
exports.ExploreLevelView = ExploreLevelView;
//# sourceMappingURL=ExploreLevelView.js.map
