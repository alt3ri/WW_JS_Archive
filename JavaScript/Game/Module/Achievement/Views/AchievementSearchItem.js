"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementSearchItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const AchievementSearchResultDynItem_1 = require("./AchievementSearchResultDynItem");
const AchievementSearchResultItem_1 = require("./AchievementSearchResultItem");
class AchievementSearchItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.xqe = void 0),
      (this.dGe = void 0),
      (this.CGe = !1),
      (this.gGe = ""),
      (this.wqe = void 0),
      (this.fGe = (e, t, i) => {
        return new AchievementSearchResultItem_1.AchievementSearchResultItem();
      }),
      (this.pGe = () => {
        ModelManager_1.ModelManager.AchievementModel.AchievementSearchState &&
          this.vGe();
      }),
      (this.Hbe = () => {
        ModelManager_1.ModelManager.AchievementModel.RefreshSearchResult(),
          this.Hqe();
      }),
      (this.wqe = e);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.dGe =
      new AchievementSearchResultDynItem_1.AchievementSearchResultDynItem()),
      (this.xqe = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        this.dGe,
        this.fGe,
      )),
      await this.xqe.Init();
  }
  OnStart() {
    this.GetUIDynScrollViewComponent(0)
      .GetRootComponent()
      .SetUIActive(this.CGe),
      this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetAchievementSearchTextChange,
      this.pGe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAchievementDataNotify,
        this.Hbe,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetAchievementSearchTextChange,
      this.pGe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAchievementDataNotify,
        this.Hbe,
      );
  }
  OnBeforeDestroy() {
    this.xqe && (this.xqe.ClearChildren(), (this.xqe = void 0)),
      this.dGe && (this.dGe.ClearItem(), (this.dGe = void 0)),
      this.RemoveEventListener();
  }
  Update() {
    this.vGe();
  }
  ResetSearchState() {
    this.gGe = "";
  }
  vGe() {
    const e = ModelManager_1.ModelManager.AchievementModel.CurrentSearchText;
    this.gGe !== e && this.Hqe();
  }
  Hqe() {
    let e;
    let t;
    const i = ModelManager_1.ModelManager.AchievementModel;
    i.AchievementSearchState &&
      ((t = i.CurrentSearchText),
      (e = i.GetSearchResult()),
      (this.gGe = t),
      (t = i.GetSearchResultIfNull()),
      this.GetUIDynScrollViewComponent(0).GetRootComponent().SetUIActive(!t),
      (this.CGe = !t),
      (t = i.GetSearchResultData(e)),
      (i.CurrentCacheSearchData = t),
      this.xqe.RefreshByData(t));
  }
}
exports.AchievementSearchItem = AchievementSearchItem;
// # sourceMappingURL=AchievementSearchItem.js.map
