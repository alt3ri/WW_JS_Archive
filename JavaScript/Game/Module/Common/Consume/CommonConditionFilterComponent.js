"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonConditionFilterComponent = void 0);
const UE = require("ue"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiNavigationView_1 = require("../../UiNavigation/UiNavigationView"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
  CommonConditionFilterItem_1 = require("./CommonConditionFilterItem");
class CommonConditionFilterComponent extends UiNavigationView_1.UiNavigationView {
  constructor(i, e) {
    super(),
      (this.ConditionFunction = e),
      (this.Layout = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.WIt = () => {
        UiLayer_1.UiLayer.SetShowMaskLayer(
          "CommonConditionFilterComponent",
          !0,
        ),
          this.LevelSequencePlayer.PlayLevelSequenceByName("hide");
      }),
      (this.KIt = (i) => {
        "hide" === i &&
          (this.SetActive(!1),
          UiLayer_1.UiLayer.SetShowMaskLayer(
            "CommonConditionFilterComponent",
            !1,
          ));
      }),
      (this.sGe = (i, e, t) => {
        e = new CommonConditionFilterItem_1.CommonConditionFilterItem(e, i);
        return e.SetToggleFunction(this.U4e), { Key: t, Value: e };
      }),
      (this.U4e = (i, e) => {
        this.ResetComponent(),
          this.SetActive(!1),
          this.ConditionFunction && this.ConditionFunction(i, e);
      }),
      this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
    ]),
      (this.BtnBindInfo = [[0, this.WIt]]);
  }
  OnStart() {
    (this.Layout = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(2),
      this.sGe,
    )),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.KIt);
  }
  RefreshQualityList(i) {
    this.Layout.RebuildLayoutByDataNew(i),
      this.Layout.GetLayoutItemByKey(0).SetToggleState(!0);
  }
  ResetComponent() {
    for (const i of this.Layout.GetLayoutItemMap().values())
      i.SetToggleState(!1, !1);
  }
  OnBeforeDestroy() {
    this.Layout && (this.Layout.ClearChildren(), (this.Layout = void 0));
  }
  UpdateComponent(i) {
    this.SetActive(!0);
    for (const e of this.Layout.GetLayoutItemMap().values())
      e.GetQualityInfo().Id === i && e.SetToggleState(!0, !1);
    this.LevelSequencePlayer.PlayLevelSequenceByName("show");
  }
}
exports.CommonConditionFilterComponent = CommonConditionFilterComponent;
//# sourceMappingURL=CommonConditionFilterComponent.js.map
