"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueTokenInfoGrid = exports.WeeklyRogueTokenGrid = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  WeeklyRogueGridComponent_1 = require("./WeeklyRogueGridComponent");
class WeeklyRogueTokenGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
  OnRefresh(e, t, i) {
    this.Data = e;
    var o,
      n =
        ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(
          e.v9n,
        );
    n &&
      ((n = {
        Type: 4,
        Data: e,
        IconPath: n.BuffIcon,
        QualityId: n.Quality,
        QualityType: "MediumItemGridQualitySpritePath",
        IsDisable: !!e.BN_ && e.BN_.O2s,
      }),
      this.Apply(n),
      e.BN_) &&
      ((n = this.RefreshComponent(
        WeeklyRogueGridComponent_1.WeeklyRougeShopDiscountTag,
        !0,
        e.BN_,
      )),
      (o = e.BN_.qN_ !== e.BN_.kN_),
      this.SetComponentVisible(n, o),
      (n = this.RefreshComponent(
        WeeklyRogueGridComponent_1.WeeklyRogueShopDiscount,
        !0,
        e.BN_,
      )),
      this.SetComponentVisible(n, !0));
  }
  OnExtendToggleStateChanged(e) {
    1 === e && this.OnSelected(!0);
  }
  OnSelected(e) {
    this.SetSelected(!0),
      (ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = this.Data),
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WeeklyRogueShopSelect,
          this.GridIndex,
          this.Data,
        ),
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
        this.GetItemGridExtendToggle().RootUIComp,
      );
  }
  OnDeselected(e) {
    this.SetSelected(!1),
      (ModelManager_1.ModelManager.WeeklyRogueModel.SelectEntry = void 0);
  }
}
exports.WeeklyRogueTokenGrid = WeeklyRogueTokenGrid;
class WeeklyRogueTokenInfoGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Data = 0), (this.OnSelectedChange = void 0);
  }
  OnRefresh(e, t, i) {
    this.Data = e;
    var o =
      ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
    o &&
      ((e = {
        Type: 4,
        Data: e,
        IconPath: o.BuffIcon,
        QualityId: o.Quality,
        QualityType: "MediumItemGridQualitySpritePath",
        BottomTextId: o.BuffName,
      }),
      this.Apply(e));
  }
  OnExtendToggleStateChanged(e) {
    1 === e && this.OnSelectedChange?.(this.GridIndex, this.Data);
  }
  OnSelected(e) {
    this.SetSelected(!0),
      e && this.OnSelectedChange?.(this.GridIndex, this.Data);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.WeeklyRogueTokenInfoGrid = WeeklyRogueTokenInfoGrid;
//# sourceMappingURL=WeeklyRogueTokenGrid.js.map
