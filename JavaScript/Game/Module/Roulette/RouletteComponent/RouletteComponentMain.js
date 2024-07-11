"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteComponentMainFunction =
    exports.RouletteComponentMainExplore =
    exports.RouletteComponentMain =
      void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteComponent_1 = require("./RouletteComponent");
class RouletteComponentMain extends RouletteComponent_1.RouletteComponentBase {
  IsCurrentEquippedId(e) {
    switch (e.GridType) {
      case 0:
        var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
        if (t !== 0 && e.Id === t) return !0;
        break;
      case 2:
        return ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn;
    }
    return !1;
  }
  JudgeGridStateByData(e, t) {
    return void 0 !== e && e !== 0 ? 1 : 3;
  }
  SetCurrentToggleState(e) {
    this.GetCurrentGrid()?.SetGridToggleState(e),
      e && AudioSystem_1.AudioSystem.PostEvent("play_ui_float_spl_roulette");
  }
  RefreshCurrentShowName() {
    const e = this.InputControllerType === 2;
    const t = this.GetCurrentGrid()?.Data?.Name;
    t
      ? (this.SetNameVisible(!0), this.RefreshName(t))
      : (this.SetNameVisible(e),
        e && this.RefreshName(RouletteDefine_1.ROULETTE_TEXT_EMPTY));
  }
  RefreshTips() {
    const e = this.InputControllerType === 2;
    var t = this.IsEmptyChoose;
    const i = this.GetCurrentGrid()?.Data.State !== 1;
    var t = this.GetRefreshTips(t || i);
    this.RefreshTipsByText(t, !e);
  }
  GetRefreshTips(e) {}
}
class RouletteComponentMainExplore extends (exports.RouletteComponentMain =
  RouletteComponentMain) {
  RefreshCurrentGridIndex(e) {
    this.AreaIndex = e;
    e = this.AreaIndexToGridIndex.get(this.AreaIndex);
    void 0 !== e
      ? (this.CurrentGridIndex = e)
      : this.InputControllerType === 1
        ? this.Dgo()
        : (this.CurrentGridIndex = -1);
  }
  Dgo() {
    let e, t, i;
    this.CurrentEquipGridIndex !== this.CurrentGridIndex &&
      ((e = this.RouletteGridList[this.CurrentEquipGridIndex]),
      (i = (t = this.RouletteGridList[this.CurrentGridIndex]).Data).Id !== 0 ||
        i.GridType === 2) &&
      (e?.SetGridEquipped(!1),
      t?.SetGridEquipped(!0),
      (this.CurrentEquipGridIndex = this.CurrentGridIndex));
  }
  GetRouletteInfoMap() {
    return RouletteComponent_1.exploreRouletteMap;
  }
  JudgeGridStateByData(e, t) {
    return t === 2 || (void 0 !== e && e !== 0) ? 1 : 3;
  }
  RefreshRouletteItem() {
    this.GetItem(10).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!0),
      this.SetTipsActive(!1);
  }
  GetRefreshTips(e) {
    let t = void 0;
    switch (this.InputControllerType) {
      case 2:
        t = e
          ? "Text_ProbeToolFunctionNotice3_Text"
          : "Text_ExploreToolsSwitchMobile_Text";
        break;
      case 0:
        t = e ? void 0 : "Text_ExploreToolsSwitchPC_Text";
        break;
      case 1:
        var i = this.GetCurrentGrid()?.Data.State !== 1;
        var i =
          void 0 !== this.CurrentGridIndex &&
          this.CurrentGridIndex !== -1 &&
          !i;
        t = i ? "Text_ExploreToolsSwitchPC_Text" : void 0;
    }
    return this.SetTipsActive(void 0 !== t), t;
  }
  OnEmitCurrentGridSelectOn(e) {
    ModelManager_1.ModelManager.PlatformModel?.IsInGamepad() && e
      ? this.CurrentGridIndex !== -1 &&
        this.RouletteGridList[this.CurrentEquipGridIndex]?.SelectOnGrid(!0)
      : this.GetCurrentGrid()?.SelectOnGrid(!0);
  }
}
exports.RouletteComponentMainExplore = RouletteComponentMainExplore;
class RouletteComponentMainFunction extends RouletteComponentMain {
  GetRouletteInfoMap() {
    return RouletteComponent_1.functionRouletteMap;
  }
  RefreshRouletteItem() {
    this.GetItem(10).SetUIActive(!0),
      this.GetItem(11).SetUIActive(!0),
      this.GetItem(12).SetUIActive(!1),
      this.SetTipsActive(!0);
  }
  GetRefreshTips(e) {
    const t = e ? void 0 : "Text_FuncToolsSwitchPC_Text";
    return this.SetTipsActive(void 0 !== t), t;
  }
}
exports.RouletteComponentMainFunction = RouletteComponentMainFunction;
// # sourceMappingURL=RouletteComponentMain.js.map
