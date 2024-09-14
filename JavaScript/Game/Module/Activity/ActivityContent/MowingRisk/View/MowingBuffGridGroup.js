"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffGridItem = exports.MowingBuffGridGroup = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class MowingBuffGridGroup extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Tei = void 0),
      (this.T6a = () => new MowingBuffGridItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(1),
      this.T6a,
    );
  }
  OnBeforeDestroy() {
    this.Tei.UnBindLateUpdate();
  }
  Refresh(t, e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.GroupNameTextId),
      this.Tei.RefreshByData(t.BuffItemList);
  }
}
exports.MowingBuffGridGroup = MowingBuffGridGroup;
class MowingBuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.L6a = void 0),
      (this.mXa = void 0),
      (this.Ouo = void 0),
      (this.eTt = () => {
        (ModelManager_1.ModelManager.MowingRiskModel.CurrentChosenOverviewBuffId =
          this.L6a.BuffId),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingBasicBuffGridItemClick,
          );
      }),
      (this.DWa = () => !this.L6a.IsChosen);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[6, this.eTt]]);
  }
  async OnBeforeStartAsync() {
    var t = new UiPanelBase_1.UiPanelBase(),
      e = new MowingBuffLevelPanel(),
      i = t.CreateByResourceIdAsync("UiItem_ItemLock", this.GetItem(4), !0),
      s = e.CreateByResourceIdAsync("UiItem_ItemState", this.GetItem(4), !0);
    await Promise.all([i, s]),
      t.SetUiActive(!1),
      e.SetUiActive(!1),
      (this.mXa = t),
      (this.Ouo = e),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnStart() {
    this.GetExtendToggle(6).CanExecuteChange.Bind(this.DWa);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(6).CanExecuteChange.Unbind();
  }
  Refresh(t, e, i) {
    (this.L6a = t), this.SetSpriteByPath(t.QualityPath, this.GetSprite(0), !1);
    var s = this.GetTexture(1);
    s?.SetUIActive(void 0 !== t.IconPath),
      t.IconPath && this.SetTextureByPath(t.IconPath, s),
      this.GetText(2)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.NameTextId),
      this.GetSprite(3).SetUIActive(t.IsShowBackground),
      this.GetItem(5).SetUIActive(!1),
      this.GetExtendToggle(6).SetToggleStateForce(t.IsChosen ? 1 : 0),
      this.GetItem(4).SetUIActive(!0),
      this.mXa?.SetUiActive(!t.IsUnlock),
      this.Ouo?.SetUiActive(void 0 !== t.LevelContent),
      this.Ouo?.RefreshByLevelContent(t.LevelContent);
  }
}
exports.MowingBuffGridItem = MowingBuffGridItem;
class MowingBuffLevelPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetSprite(0)?.SetUIActive(!1),
      this.GetSprite(5)?.SetUIActive(!1),
      this.GetItem(3)?.SetUIActive(!1);
  }
  RefreshByLevelContent(t) {
    var e = this.GetItem(1);
    void 0 === t
      ? e?.SetUIActive(!1)
      : (e?.SetUIActive(!0), this.GetText(2)?.SetText(t));
  }
}
//# sourceMappingURL=MowingBuffGridGroup.js.map
