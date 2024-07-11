"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditTeamModule = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView"),
  CharacterItem_1 = require("./Character/CharacterItem");
class EditTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.CharacterList = []),
      (this.OnClickEvent = void 0),
      (this.CanExecuteChange = void 0),
      (this.IsItemSelected = void 0),
      (this.Data = void 0),
      (this.RedDotState = !1),
      (this.Cke = (t) => {
        this.ECa(), this.OnClickEvent(this.Data.Id, 1 === t, this.GridIndex);
      }),
      (this.gke = () => {
        var t = this.GetExtendToggle(0).GetToggleState();
        return !this.CanExecuteChange || this.CanExecuteChange(this.Data.Id, t);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Cke]]);
  }
  async dke(t) {
    var i = new CharacterItem_1.CharacterItem();
    this.CharacterList.push(i),
      await i.CreateThenShowByActorAsync(t.GetOwner());
  }
  async OnBeforeStartAsync() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke),
      await Promise.all([
        this.dke(this.GetItem(5)),
        this.dke(this.GetItem(6)),
        this.dke(this.GetItem(7)),
      ]),
      this.GetItem(11).SetUIActive(!1);
  }
  Refresh(t, i, e) {
    (this.Data = t),
      this.GetItem(8).SetUIActive(!t.IsOwn),
      this.GetItem(10).SetUIActive(t.IsOwn),
      this.GetTexture(2).SetUIActive(!t.IsOwn),
      this.GetTexture(1).SetUIActive(t.IsOwn);
    var s = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        this.Data.Id,
      ),
      h = t.GetTeamDataUnLockState();
    if ((this.GetItem(12).SetUIActive(1 === h), t.IsOwn)) {
      var h = this.IsItemSelected?.(this.Data.Id) ?? i,
        r = (this.SetToggleState(h), t.GetCharacterDataList());
      for (let t = 0, i = r.length; t < i; t++)
        this.CharacterList[t].Refresh(r[t]);
      this.SetTextureByPath(s.Icon, this.GetTexture(1)),
        this.GetText(3).SetText(this.Data.Level.toString()),
        this.GetText(4).SetText(this.Data.Name),
        this.RefreshRedDot(this.Data.Id);
    } else
      this.SetToggleState(!1),
        (i = t.GetUnLockConditionDesc()),
        this.GetText(9).SetText(i),
        this.SetTextureByPath(s.Icon, this.GetTexture(2));
  }
  RefreshRedDot(t) {
    t = ModelManager_1.ModelManager.MoonChasingModel.CheckRoleIdRedDotState(t);
    this.RedDotState !== t &&
      ((this.RedDotState = t), this.GetItem(11).SetUIActive(this.RedDotState));
  }
  ECa() {
    this.RedDotState &&
      this.Data.IsOwn &&
      (ModelManager_1.ModelManager.MoonChasingModel.ReadRoleIdUnlockFlag(
        this.Data.Id,
      ),
      this.RefreshRedDot(this.Data.Id));
  }
  SetClickEvent(t) {
    this.OnClickEvent = t;
  }
  SetCanExecuteChange(t) {
    this.CanExecuteChange = t;
  }
  SetIsItemSelected(t) {
    this.IsItemSelected = t;
  }
  SetToggleState(t, i = !1) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, i);
  }
  OnSelected(t) {
    this.SetToggleState(!0, t);
  }
  OnDeselected(t) {
    this.SetToggleState(!1);
  }
}
class EditTeamModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LoopScroll = void 0),
      (this.OnClickEvent = void 0),
      (this.CanExecuteChange = void 0),
      (this.IsItemSelected = void 0),
      (this.DataList = []),
      (this.fke = () => {
        var t = new EditTeamItem();
        return (
          t.SetClickEvent(this.OnClickEvent),
          t.SetCanExecuteChange(this.CanExecuteChange),
          t.SetIsItemSelected(this.IsItemSelected),
          t
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.LoopScroll = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.fke,
      !0,
    )),
      await this.LoopScroll?.RefreshByDataAsync(this.DataList);
  }
  async RefreshEditTeamModule() {
    await this.LoopScroll?.RefreshByDataAsync(this.DataList);
  }
  SetClickEvent(t) {
    this.OnClickEvent = t;
  }
  SetCanExecuteChange(t) {
    this.CanExecuteChange = t;
  }
  SetIsItemSelected(t) {
    this.IsItemSelected = t;
  }
  SelectEditTeamItem(t, i = !1) {
    this.LoopScroll?.SelectGridProxy(t, i);
  }
  SetEditTeamDataList(t) {
    this.DataList = t;
  }
  GetDataLength() {
    return this.DataList.length;
  }
  GetSelectGridIndex() {
    var t = this.LoopScroll.GetSelectedGridIndex();
    return -1 === t ? 0 : t;
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (!(i.length < 1)) {
      var i = i[0];
      if ("Helper" !== i)
        return ("Delegation" !== i && "HelperFirst" !== i) ||
          void 0 === (i = this.LoopScroll?.GetGrid(0))
          ? void 0
          : [i, i];
      {
        let t = -1;
        for (var [e, s] of this.DataList.entries())
          if (1 === s.GetTeamDataUnLockState()) {
            t = e;
            break;
          }
        return t < 0
          ? void 0
          : void 0 === (i = this.LoopScroll?.GetGrid(t))
            ? void 0
            : (this.LoopScroll?.ScrollToGridIndex(t), [i, i]);
      }
    }
  }
  SetTitleItemActive(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
}
exports.EditTeamModule = EditTeamModule;
//# sourceMappingURL=EditTeamModule.js.map
