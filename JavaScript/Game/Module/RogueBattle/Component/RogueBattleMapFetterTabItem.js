"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapFetterTabItem =
    exports.RogueBattleMapFetterTabChildItem =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleMapFetterTabChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.J01 = 0),
      (this.CanExecuteChangeFunction = void 0),
      (this.CanExecuteChange = () =>
        !this.CanExecuteChangeFunction ||
        this.CanExecuteChangeFunction(
          this.J01,
          this.GetExtendToggle(0).GetToggleState(),
        )),
      (this.kqe = () => {
        (ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond =
          this.J01),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueResMapSummaryBondUpdate,
            this.J01,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.CanExecuteChange);
  }
  SetSelected(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
  Refresh(t, e, i) {
    (this.J01 = t),
      this.SetSelected(
        t ===
          ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond,
      );
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t),
      s =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name),
        ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(t));
    s && 0 < s.F6n
      ? (this.GetText(2).SetUIActive(!0),
        this.GetText(2).SetText("Lv." + s.F6n))
      : this.GetText(2).SetUIActive(!1);
  }
}
exports.RogueBattleMapFetterTabChildItem = RogueBattleMapFetterTabChildItem;
class RogueBattleMapFetterTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Z01 = void 0),
      (this.eGe = void 0),
      (this.pC1 = void 0),
      (this.kqe = () => {
        (this.Z01.IsSelected = !this.Z01.IsSelected),
          this.eGe?.SetActive(this.Z01.IsSelected);
      }),
      (this.sGe = () => {
        var t = new RogueBattleMapFetterTabChildItem();
        return (t.CanExecuteChangeFunction = this.CanExecuteChangeFunction), t;
      }),
      (this.vC1 = (t) => {
        var e = this.pC1;
        (this.pC1 = this.Z01.Config.includes(t) ? t : void 0),
          void 0 !== e &&
            this.eGe
              .GetLayoutItemByIndex(this.Z01.Config.indexOf(e))
              ?.SetSelected(!1),
          this.pC1 &&
            (this.eGe.SelectGridProxy(this.Z01.Config.indexOf(t)),
            this.eGe.GetSelectedProxy()?.SetSelected(!0));
      }),
      (this.CanExecuteChangeFunction = (t, e) => 1 !== e || this.pC1 !== t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.sGe,
    )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RogueResMapSummaryBondUpdate,
        this.vC1,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryBondUpdate,
      this.vC1,
    );
  }
  Refresh(t, e, i) {
    (this.Z01 = t),
      this.eGe.RefreshByData(t.Config, () => {
        this.eGe.BindLateUpdate(() => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueResMapSummaryFettersSubTabUpdate,
          ),
            this.eGe.UnBindLateUpdate();
        });
      }),
      this.eGe?.SetActive(t.IsSelected),
      this.Y11(t.IsSelected);
    (t = t.Config[0]),
      (t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)),
      (t =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondTypeById(
          t.Rarity,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.SynergyTypeName);
  }
  Y11(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
}
exports.RogueBattleMapFetterTabItem = RogueBattleMapFetterTabItem;
//# sourceMappingURL=RogueBattleMapFetterTabItem.js.map
