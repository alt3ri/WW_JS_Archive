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
      (this.l9a = () => new MowingBuffGridItem());
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
      this.l9a,
      void 0,
    );
  }
  OnBeforeDestroy() {
    this.Tei.UnBindLateUpdate();
  }
  async RefreshAsync(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GroupNameTextId),
      await this.Tei.RefreshByDataAsync(e.BuffItemList);
  }
  GetBuffGridItemLayout() {
    return this.Tei;
  }
}
exports.MowingBuffGridGroup = MowingBuffGridGroup;
class MowingBuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this._9a = void 0),
      (this.BZa = void 0),
      (this.Ouo = void 0),
      (this.eTt = () => {
        (ModelManager_1.ModelManager.MowingRiskModel.CurrentChosenOverviewBuffId =
          this._9a.BuffId),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.MowingBasicBuffGridItemClick,
          );
      }),
      (this.$$a = () => !this._9a.IsChosen);
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
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[6, this.eTt]]);
  }
  async OnBeforeStartAsync() {
    var e = new UiPanelBase_1.UiPanelBase(),
      t = new MowingBuffLevelPanel(),
      i = e.CreateByResourceIdAsync("UiItem_ItemLock", this.GetItem(4), !0),
      s = t.CreateByResourceIdAsync("UiItem_ItemState", this.GetItem(4), !0);
    await Promise.all([i, s]),
      e.SetUiActive(!1),
      t.SetUiActive(!1),
      (this.BZa = e),
      (this.Ouo = t),
      this.GetText(2)?.SetUIActive(!1);
  }
  OnStart() {
    this.GetExtendToggle(6).CanExecuteChange.Bind(this.$$a);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(6).CanExecuteChange.Unbind();
  }
  Refresh(e, t, i) {
    (this._9a = e), this.SetSpriteByPath(e.QualityPath, this.GetSprite(0), !1);
    var s = this.GetTexture(1);
    s?.SetUIActive(void 0 !== e.IconPath),
      e.IconPath && this.SetTextureByPath(e.IconPath, s),
      this.GetText(2)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.NameTextId),
      this.GetSprite(3).SetUIActive(e.IsShowBackground),
      this.GetItem(5).SetUIActive(!1),
      this.GetExtendToggle(6).SetToggleStateForce(e.IsChosen ? 1 : 0),
      this.GetItem(4).SetUIActive(!0),
      this.BZa?.SetUiActive(!e.IsUnlock),
      this.Ouo?.SetUiActive(void 0 !== e.LevelContent),
      this.Ouo?.RefreshByLevelContent(e.LevelContent),
      this.GetItem(7).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1);
  }
  CheckNeedPlayUnlockSequence() {
    return !ModelManager_1.ModelManager.MowingRiskModel.HasBuffIdRecord(
      this._9a.BuffId,
    );
  }
  PlayUnlockEffect() {
    var e = ModelManager_1.ModelManager.MowingRiskModel,
      e =
        (e.RecordBuffId(this._9a.BuffId),
        e.GetBuffTypeByBuffId(this._9a.BuffId));
    let t = void 0;
    switch (e) {
      case 1:
        t = 7;
        break;
      case 2:
        t = 8;
        break;
      case 3:
        t = 9;
    }
    t && this.GetItem(t).SetUIActive(!0);
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
  RefreshByLevelContent(e) {
    var t = this.GetItem(1);
    void 0 === e
      ? t?.SetUIActive(!1)
      : (t?.SetUIActive(!0), this.GetText(2)?.SetText(e));
  }
}
//# sourceMappingURL=MowingBuffGridGroup.js.map
