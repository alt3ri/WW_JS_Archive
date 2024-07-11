"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementDetailView = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonSearchComponent_1 = require("../../Common/InputView/CommonSearchComponent");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const AchievementGroupDataItem_1 = require("./AchievementGroupDataItem");
const AchievementGroupSmallDynItem_1 = require("./AchievementGroupSmallDynItem");
const AchievementGroupSmallItem_1 = require("./AchievementGroupSmallItem");
const AchievementGroupTitleItem_1 = require("./AchievementGroupTitleItem");
const AchievementSearchItem_1 = require("./AchievementSearchItem");
class AchievementDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this._qe = void 0),
      (this.uqe = void 0),
      (this.cqe = void 0),
      (this.mqe = void 0),
      (this.dqe = void 0),
      (this.Cqe = []),
      (this.gqe = void 0),
      (this.fqe = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (e) => {
        var e = this.Cqe[e];
        const t =
          ((ModelManager_1.ModelManager.AchievementModel.CurrentSelectCategory =
            e),
          (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState =
            !1),
          ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
            e.GetId(),
          ));
        if (!(t.length <= 0)) {
          const n =
            ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup;
          var i = t.findIndex((e) => e === n);
          var i = i >= 0 ? t[i] : t[0];
          (ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup = i),
            this.GetText(10).SetText(e.GetAchievementCategoryProgress()),
            this.vqe(),
            this.Mqe(),
            this.Sqe(),
            this.Eqe();
        }
      }),
      (this.yqe = (e) => {
        e = this.Cqe[e];
        return new CommonTabData_1.CommonTabData(
          e.GetSprite(),
          new CommonTabTitleData_1.CommonTabTitleData(e.GetOrignalTitle()),
        );
      }),
      (this.Iqe = () => {
        this.Mqe();
      }),
      (this.Hbe = () => {
        ModelManager_1.ModelManager.AchievementModel.RefreshSearchResult(),
          this.Mqe();
      }),
      (this.Mbe = (e) => {
        (ModelManager_1.ModelManager.AchievementModel.CurrentSearchText = e),
          ModelManager_1.ModelManager.AchievementModel.RefreshSearchResult(),
          (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState =
            !StringUtils_1.StringUtils.IsEmpty(e)),
          this.Mqe(),
          this.Eqe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGetAchievementSearchTextChange,
          );
      }),
      (this.Tqe = () => {
        const e =
          ModelManager_1.ModelManager.AchievementModel.AchievementSearchState;
        (ModelManager_1.ModelManager.AchievementModel.AchievementSearchState =
          !1),
          (ModelManager_1.ModelManager.AchievementModel.CurrentSearchText =
            StringUtils_1.EMPTY_STRING),
          e !==
            ModelManager_1.ModelManager.AchievementModel
              .AchievementSearchState && (this.Mqe(), this.Sqe()),
          this.Eqe(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGetAchievementSearchTextChange,
          );
      }),
      (this.Lqe = (e, t, i) => {
        return new AchievementGroupSmallItem_1.AchievementGroupSmallItem();
      }),
      (this.Awe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIDynScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.mqe =
      new AchievementGroupSmallDynItem_1.AchievementGroupSmallDynItem()),
      (this.gqe = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(1),
        this.GetItem(6),
        this.mqe,
        this.Lqe,
      )),
      await this.gqe.Init(),
      (this.uqe = new AchievementGroupDataItem_1.AchievementGroupDataItem(
        this.GetItem(4),
      )),
      await this.uqe.Init(),
      (this._qe = new AchievementSearchItem_1.AchievementSearchItem(
        this.GetItem(5),
      )),
      await this._qe.Init(),
      (this.Cqe =
        ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryArray());
    const e = new CommonTabComponentData_1.CommonTabComponentData(
      this.fqe,
      this.pqe,
      this.yqe,
    );
    (this.lqe = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
      this.GetItem(0),
      e,
      this.Awe,
    )),
      await this.Dqe();
  }
  async Dqe() {
    const t = this.Cqe;
    const i = this.lqe.CreateTabItemDataByLength(t.length);
    for (let e = 0; e < t.length; e++)
      (i[e].RedDotName = "AchievementCategory"),
        (i[e].RedDotUid = t[e].GetId());
    await this.lqe.RefreshTabItemAsync(i, !1);
  }
  OnBeforeShow() {
    let e = ModelManager_1.ModelManager.AchievementModel.CurrentSelectCategory;
    void 0 === e ||
      (e =
        ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryIndex(
          e,
        )) < 0 ||
      this.lqe?.SelectToggleByIndex(e, !0);
  }
  OnStart() {
    (this.cqe = new AchievementGroupTitleItem_1.AchievementGroupTitleItem()),
      this.cqe.Initialize(this.GetItem(3)),
      (this.dqe = new CommonSearchComponent_1.CommonSearchComponent(
        this.GetItem(7),
        this.Mbe,
        this.Tqe,
      ));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAchievementGroupChange,
      this.Iqe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAchievementDataNotify,
        this.Hbe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAchievementGroupChange,
      this.Iqe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAchievementDataNotify,
        this.Hbe,
      );
  }
  OnBeforeDestroy() {
    this.lqe && (this.lqe.Destroy(), (this.lqe = void 0)),
      this.cqe && (this.cqe.Destroy(), (this.cqe = void 0)),
      this.uqe && (this.uqe.Destroy(), (this.uqe = void 0)),
      this._qe && (this._qe.Destroy(), (this._qe = void 0)),
      this.gqe && this.gqe.ClearChildren(),
      this.mqe && (this.mqe.ClearItem(), (this.mqe = void 0)),
      this.dqe.Destroy();
  }
  vqe() {
    this.dqe?.ResetSearch(!0);
  }
  Sqe() {
    var e = ModelManager_1.ModelManager.AchievementModel;
    var e = e.GetAchievementCategoryGroups(e.CurrentSelectCategory.GetId());
    this.gqe.RefreshByData(e);
  }
  Eqe() {
    const e =
      ModelManager_1.ModelManager.AchievementModel.AchievementSearchState;
    const t =
      ModelManager_1.ModelManager.AchievementModel.GetSearchResultIfNull();
    this.GetItem(2).SetUIActive(e && !t);
  }
  Mqe() {
    let e = ModelManager_1.ModelManager.AchievementModel.AchievementSearchState;
    this.cqe.SetActive(!e),
      this.uqe.SetActive(!e),
      this._qe.SetActive(e),
      this.GetUIDynScrollViewComponent(1).GetRootComponent().SetUIActive(!e),
      e
        ? ((e =
            ModelManager_1.ModelManager.AchievementModel.GetSearchResultIfNull()),
          this.GetItem(8)?.SetUIActive(!e),
          this.GetItem(9)?.SetUIActive(e),
          this._qe.Update())
        : (ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup
            ? (this.cqe.Update(
                ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup,
              ),
              this.uqe.Update(
                ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup,
              ))
            : this.cqe.SetActive(!1),
          this.GetItem(8)?.SetUIActive(!1),
          this.GetItem(9)?.SetUIActive(!1));
  }
}
exports.AchievementDetailView = AchievementDetailView;
// # sourceMappingURL=AchievementDetailView.js.map
