"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteComponentMainFunction =
    exports.RouletteComponentMainExplore =
    exports.RouletteComponentMain =
      void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RouletteDefine_1 = require("../Data/RouletteDefine"),
  RouletteGridForbiddenSettings_1 = require("../RouletteGrid/RouletteGridForbiddenSettings"),
  RouletteComponent_1 = require("./RouletteComponent");
class RouletteComponentMain extends RouletteComponent_1.RouletteComponentBase {
  constructor() {
    super(...arguments), (this.jMa = !0);
  }
  OnStart() {
    var e;
    super.OnStart(),
      Info_1.Info.IsInGamepad() &&
        ((e =
          ModelManager_1.ModelManager.RouletteModel.GetRouletteSelectConfig()),
        (this.jMa = 1 === e));
  }
  GamepadReturnEmptyGrid() {
    var e, t, o;
    this.CurrentEquipGridIndex !== this.CurrentGridIndex &&
      ((e = this.RouletteGridList[this.CurrentEquipGridIndex]),
      0 === (o = (t = this.RouletteGridList[this.CurrentGridIndex]).Data).State
        ? (RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsForbiddenState(
            o.GridType,
            o.Id,
          ),
          (this.CurrentGridIndex = -1))
        : (0 === o.Id && 2 !== o.GridType) ||
          (e?.SetGridEquipped(!1),
          t?.SetGridEquipped(!0),
          (this.CurrentEquipGridIndex = this.CurrentGridIndex),
          this.CloseRouletteMain(),
          this.jMa) ||
          this.GetCurrentGrid()?.SelectOnGrid(!0)),
      (this.IsEmptyChoose = !0);
  }
  OnEmitCurrentGridSelectOn() {
    this.jMa && this.GetCurrentGrid()?.SelectOnGrid(!0);
  }
  IsCurrentEquippedId(e) {
    switch (e.GridType) {
      case 0:
        var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
        if (0 !== t && e.Id === t) return !0;
        break;
      case 2:
        return ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn;
    }
    return !1;
  }
  JudgeGridStateByData(e, t) {
    return void 0 !== e && 0 !== e ? 1 : 3;
  }
  SetCurrentToggleState(e) {
    this.GetCurrentGrid()?.SetGridToggleState(e),
      e && AudioSystem_1.AudioSystem.PostEvent("play_ui_float_spl_roulette");
  }
  RefreshCurrentShowName() {
    var e = Info_1.Info.IsInTouch(),
      t = this.GetCurrentGrid()?.Data?.Name;
    t
      ? (this.SetNameVisible(!0), this.RefreshName(t))
      : (this.SetNameVisible(e),
        e && this.RefreshName(RouletteDefine_1.ROULETTE_TEXT_EMPTY));
  }
  RefreshTips() {
    var e = Info_1.Info.IsInTouch(),
      t = this.IsEmptyChoose,
      o = 1 !== this.GetCurrentGrid()?.Data.State,
      t = this.GetRefreshTips(t || o);
    this.RefreshTipsByText(t, !e);
  }
  GetRefreshTips(e) {}
  CloseRouletteMain() {
    UiManager_1.UiManager.CloseView("PhantomExploreView");
  }
}
class RouletteComponentMainExplore extends (exports.RouletteComponentMain =
  RouletteComponentMain) {
  GetRouletteInfoMap() {
    return RouletteComponent_1.exploreRouletteMap;
  }
  JudgeGridStateByData(e, t) {
    return 2 === t || (void 0 !== e && 0 !== e) ? 1 : 3;
  }
  RefreshRouletteItem() {
    this.GetItem(10).SetUIActive(!1),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!0),
      this.SetTipsActive(!1);
  }
  GetRefreshTips(e) {
    let t = void 0;
    return (
      Info_1.Info.IsInTouch()
        ? (t = e
            ? "Text_ProbeToolFunctionNotice3_Text"
            : "Text_ExploreToolsSwitchMobile_Text")
        : Info_1.Info.IsInKeyBoard()
          ? (t = e ? void 0 : "Text_ExploreToolsSwitchPC_Text")
          : Info_1.Info.IsInGamepad() &&
            ((e = 1 !== this.GetCurrentGrid()?.Data.State),
            (e =
              void 0 !== this.CurrentGridIndex &&
              -1 !== this.CurrentGridIndex &&
              !e),
            (t = e ? "Text_ExploreToolsSwitchPC_Text" : void 0)),
      this.SetTipsActive(void 0 !== t),
      t
    );
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
    let t = e ? void 0 : "Text_FuncToolsSwitchPC_Text";
    return this.SetTipsActive(void 0 !== t), t;
  }
}
exports.RouletteComponentMainFunction = RouletteComponentMainFunction;
//# sourceMappingURL=RouletteComponentMain.js.map
