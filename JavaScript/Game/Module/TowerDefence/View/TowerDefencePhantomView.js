"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefensePhantomLockItem = exports.TowerDefensePhantomView =
    void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  TowerDefenceController_1 = require("../TowerDefenceController"),
  TowerDefenceDefine_1 = require("../TowerDefenceDefine");
class TowerDefensePhantomView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.PZs = void 0),
      (this.wZs = void 0),
      (this.p9t = void 0),
      (this.nca = void 0),
      (this.BZs = void 0),
      (this.I5t = () => {
        this.CloseMe();
      }),
      (this.bZs = (e) => {
        TowerDefenceController_1.TowerDefenseController.SetCurrentTowerDefensePhantomIdInUiTemp(
          e,
        ),
          this.qZs(!1),
          this.GZs(),
          this.OZs();
      }),
      (this.NZs = () => {
        var e = this.BZs.RoleCfgId;
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
          e,
        ),
          this.CloseMe();
      }),
      (this.YYa = () => {
        var e = this.BZs.RoleCfgId;
        TowerDefenceController_1.TowerDefenseController.SetCurrentTowerDefensePhantomIdInUiTemp(
          TowerDefenceDefine_1.DEFAULT_ID,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
            e,
          ),
          this.CloseMe();
      }),
      (this.sca = () => {
        this.CloseMe();
      }),
      (this.oZa = () => {
        this.qZs(!1), this.OZs();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIText],
      [6, UE.UIVerticalLayout],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.I5t]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom,
      this.bZs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DissolvePrewar,
        this.sca,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefensePhantomChanged,
        this.oZa,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom,
      this.bZs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DissolvePrewar,
        this.sca,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefensePhantomChanged,
        this.oZa,
      );
  }
  async OnBeforeStartAsync() {
    var e = new TowerDefensePhantomLockItem();
    await e.CreateByActorAsync(this.GetItem(10).GetOwner()),
      e.SetText("TowerDefence_lock"),
      (this.nca = e);
  }
  OnStart() {
    (this.BZs = this.OpenParam),
      TowerDefenceController_1.TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp(),
      this.GetItem(9).SetUIActive(!0),
      (this.PZs = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomIconItem,
      )),
      this.qZs(!0),
      (this.wZs = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(6),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillItem,
      )),
      this.GZs(),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(8))),
      this.OZs(),
      TowerDefenceController_1.TowerDefenseController.SetPhantomViewOpened(!0);
  }
  OnBeforeDestroy() {
    this.BZs = void 0;
  }
  qZs(e) {
    var t =
      TowerDefenceController_1.TowerDefenseController.BuildPhantomIconScrollData();
    TowerDefenceController_1.TowerDefenseController.MarkPhantomIconScrollDataChosen(
      t,
      e,
      this.BZs.RoleCfgId,
    ),
      this.PZs.RefreshByData(t);
  }
  GZs() {
    var e =
      TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillLayoutData();
    this.wZs.RefreshByData(e);
  }
  M3e(e) {
    e
      ? (this.p9t.SetUiActive(!1),
        this.p9t.SetLocalTextNew("TowerDefence_lock"))
      : TowerDefenceController_1.TowerDefenseController.CheckCurrentPhantomIsOccupiedInUi()
        ? TowerDefenceController_1.TowerDefenseController.CheckSelfPhantomCancelAble(
            this.BZs.RoleCfgId,
          )
          ? (this.p9t.SetUiActive(!0),
            this.p9t.SetEnableClick(!0),
            this.p9t.SetLocalTextNew("Text_GoDownText_Text"),
            this.p9t.SetFunction(this.YYa))
          : (this.p9t.SetUiActive(!0),
            this.p9t.SetEnableClick(!1),
            this.p9t.SetLocalTextNew("PrefabTextItem_266690258_Text"))
        : (this.p9t.SetUiActive(!0),
          this.p9t.SetEnableClick(!0),
          this.p9t.SetFunction(this.NZs),
          this.p9t.SetLocalTextNew("TowerDefence_confirm"));
  }
  OZs() {
    var e =
        TowerDefenceController_1.TowerDefenseController.BuildPhantomOtherData(),
      t = e.IsLocked;
    this.p9t.SetUiActive(!t),
      this.M3e(t),
      this.nca.SetUiActive(t),
      this.SetSpriteByPath(e.TypeIconPath, this.GetSprite(4), !1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.TypeTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.NameTextId);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.PZs) {
      var t = this.PZs.GetGrid(0);
      if (t) return [t, t];
    }
  }
}
exports.TowerDefensePhantomView = TowerDefensePhantomView;
class TowerDefensePhantomLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
    ];
  }
  SetText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.TowerDefensePhantomLockItem = TowerDefensePhantomLockItem;
//# sourceMappingURL=TowerDefencePhantomView.js.map
