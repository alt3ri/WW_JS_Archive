"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefensePhantomSkillInBattleItem =
    exports.TowerDefenseInBattleView =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BattleChildView_1 = require("../../BattleUi/Views/BattleChildView/BattleChildView"),
  BattleVisibleChildView_1 = require("../../BattleUi/Views/BattleChildView/BattleVisibleChildView"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TowerDefenceController_1 = require("../TowerDefenceController");
class TowerDefenseInBattleView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.EZs = void 0),
      (this.Hea = void 0),
      (this.qbi = 1),
      (this.eTt = (e) => {
        this.EZs?.SetActive(e), e && this.EZs?.Refresh();
      }),
      (this.Cke = () => {
        var e = this.GetExtendToggle(0);
        e &&
          (1 === e.GetToggleState()
            ? e.SetToggleState(0, !0)
            : e.SetToggleState(1, !0));
      }),
      (this.yZs = () => {
        var e = this.GetExtendToggle(0);
        e && 1 === e.GetToggleState() && e.SetToggleState(0, !0);
      }),
      (this.IZs = () => {
        this.TZs(), this.EZs?.Refresh(), this.jea();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  Initialize(e) {
    super.Initialize(e),
      this.InitChildType(4),
      this.SetVisible(1, !1),
      this.LZs();
  }
  Reset() {
    super.Reset(), this.DZs();
  }
  async OnBeforeStartAsync() {
    var e = new TowerDefenseInBattlePanel(),
      t = this.GetItem(3);
    await e.GetOrCreateAsync(t, "UiItem_HoverTipsD"),
      (this.EZs = e),
      (this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    this.GetSprite(2).SetUIActive(!0),
      this.Hea.PlayLevelSequenceByName("Start"),
      this.Hea.StopCurrentSequence(!1, !0);
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
      5,
      !1,
    );
  }
  StartShow() {
    this.SetVisible(1, !0),
      this.IZs(),
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
        5,
        !0,
      );
  }
  EndShow() {
    this.SetVisible(1, !1),
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(
        5,
        !1,
      );
  }
  LZs() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView,
      this.Cke,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify,
        this.IZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.yZs,
      );
  }
  DZs() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView,
      this.Cke,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify,
        this.IZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.yZs,
      );
  }
  TZs() {
    var e =
      TowerDefenceController_1.TowerDefenseController.GetLevelContentInBattle();
    this.GetText(1).SetText(e),
      this.GetSprite(2).SetFillAmount(
        TowerDefenceController_1.TowerDefenseController.GetProgressInBattle(),
      );
  }
  jea() {
    var e = TowerDefenceController_1.TowerDefenseController.GetLevelInBattle();
    e !== this.qbi &&
      ((this.qbi = e), this.Hea.PlayLevelSequenceByName("Start"));
  }
}
exports.TowerDefenseInBattleView = TowerDefenseInBattleView;
class TowerDefenseInBattlePanel extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments), (this.Hmt = !1), (this.xKt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(1),
      t = new TowerDefenseInBattleInfoItem();
    await t.CreateThenShowByActorAsync(e.GetOwner()), (this.xKt = t);
  }
  async GetOrCreateAsync(e, t) {
    this.Hmt || (await this.NewByResourceId(e, t), (this.Hmt = !0)),
      this.SetActive(!1);
  }
  Refresh() {
    this.xKt?.Refresh();
  }
}
class TowerDefenseInBattleInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.DOt = void 0), (this.AZs = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [4, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var e = new SmallItemGrid_1.SmallItemGrid();
    await e.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.DOt = e),
      (this.AZs = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillInBattleItem,
      ));
  }
  Refresh() {
    var e =
        TowerDefenceController_1.TowerDefenseController.BuildPhantomIconInBattleData(),
      e =
        (this.DOt?.Apply(e),
        this.DOt?.SetToggleInteractive(!1),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillInBattleLayoutData()),
      e =
        (this.AZs.RefreshByData(e),
        TowerDefenceController_1.TowerDefenseController.GetExpDataInBattle());
    void 0 === e
      ? this.GetText(0)?.SetUIActive(!1)
      : (this.GetText(0)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "TowerDefence_LV",
          e.Exp,
          0 === e.Threshold ? e.Exp : e.Threshold,
        )),
      this.GetText(4)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        TowerDefenceController_1.TowerDefenseController.BuildCurrentPhantomNameTextIdInBattle(),
      ),
      this.GetText(0)?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "PrefabTextItem_992018199_Text",
      );
  }
}
class TowerDefensePhantomSkillInBattleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
    ];
  }
  Refresh(e, t, i) {
    var s = UE.Color.FromHex(e.IsUnlock ? "adfb5aff" : "adadadff");
    this.GetText(1)?.SetColor(s),
      this.GetSprite(0).SetUIActive(e.IsUnlock),
      this.GetSprite(3).SetUIActive(!e.IsUnlock),
      e.DescriptionArgs
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            e.Description,
            ...e.DescriptionArgs,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Description);
  }
}
exports.TowerDefensePhantomSkillInBattleItem =
  TowerDefensePhantomSkillInBattleItem;
//# sourceMappingURL=TowerDefenceInBattleView.js.map
