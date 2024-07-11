"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceSearchView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class InfluenceSearchView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CurrentCountryId = 0),
      (this.vUt = ""),
      (this.xqe = void 0),
      (this.Pni = () => {
        this.GetInputText(0).SetText("", !0);
      }),
      (this.gpt = () => {
        this.CloseMe();
      }),
      (this.sGe = (e, t, i) => {
        if (this.CurrentCountryId === e[0]) {
          const s = new InfluenceSearchGrid(t);
          return s.UpdateGrid(e[0], e[1]), { Key: i, Value: s };
        }
        if (e[1].length > 0) {
          const s = new InfluenceSearchGrid(t);
          return s.UpdateGrid(e[0], e[1]), { Key: i, Value: s };
        }
        t.SetUIActive(!1);
      }),
      (this.xni = (e) => {
        (this.vUt = e), this.RefreshSearchResult();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITextInputComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.Pni],
        [4, this.gpt],
      ]);
  }
  OnBeforeCreate() {
    this.CurrentCountryId = this.OpenParam;
  }
  OnStart() {
    (this.xqe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(2),
      this.sGe,
    )),
      this.GetInputText(0).OnTextChange.Bind(this.xni);
  }
  OnAfterShow() {
    this.RefreshSearchResult();
  }
  RefreshSearchResult() {
    let e = [];
    this.vUt
      ? (e =
          ModelManager_1.ModelManager.InfluenceReputationModel.GetUnLockCountry()).sort(
          (e, t) =>
            e === this.CurrentCountryId
              ? -1
              : t === this.CurrentCountryId
                ? 1
                : e - t,
        )
      : e.push(this.CurrentCountryId);
    const t =
      ModelManager_1.ModelManager.InfluenceReputationModel.FilterUnLockInfluenceList(
        e,
        this.vUt,
      );
    const i = t.HasResult;
    this.GetItem(3).SetUIActive(!i),
      this.xqe.SetActive(i),
      i && this.xqe.RefreshByData(t.InfluenceList);
  }
  OnBeforeDestroy() {
    this.xqe.ClearChildren(), (this.xqe = void 0);
  }
}
exports.InfluenceSearchView = InfluenceSearchView;
class InfluenceSearchGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.eGe = void 0),
      (this.z4t = 0),
      (this.sGe = (e, t, i) => {
        t = new InfluenceSearchItem(t);
        return t.UpdateItem(e, this.z4t), { Key: i, Value: t };
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(2),
      this.sGe,
      this.GetItem(3),
    );
  }
  UpdateGrid(e, t) {
    this.z4t = e;
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e);
    var e =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title),
      this.GetItem(1));
    const i = t.length > 0;
    e.SetUIActive(!i), this.eGe.RebuildLayoutByDataNew(t);
  }
  OnBeforeDestroy() {
    this.eGe.ClearChildren(), (this.eGe = void 0);
  }
}
class InfluenceSearchItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.z4t = 0),
      (this.Tni = 0),
      (this.j7e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SearchInfluence,
          this.Tni,
          this.z4t,
        ),
          UiManager_1.UiManager.CloseView("InfluenceSearchView");
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[7, this.j7e]]);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindRedDot("InfluenceReward");
  }
  UpdateItem(e, t) {
    (this.Tni = e), (this.z4t = t);
    var t =
      ModelManager_1.ModelManager.InfluenceReputationModel.GetInfluenceInstance(
        e,
      );
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(
      t.Id,
    );
    const i =
      (this.SetTextureByPath(e.Logo, this.GetTexture(0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
      this.GetText(2));
    e.ExtraDesc
      ? (i.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.ExtraDesc))
      : i.SetUIActive(!1),
      this.Rni(t.Relation),
      this.x6e(t.Id);
  }
  Rni(e) {
    this.GetItem(3).SetUIActive(e === 2),
      this.GetItem(4).SetUIActive(e === 3),
      this.GetItem(5).SetUIActive(e === 1);
  }
  x6e(e) {
    RedDotController_1.RedDotController.BindRedDot(
      "InfluenceReward",
      this.GetItem(6),
      void 0,
      e,
    );
  }
}
// # sourceMappingURL=InfluenceSearchView.js.map
