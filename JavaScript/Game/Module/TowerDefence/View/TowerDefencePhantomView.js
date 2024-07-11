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
  TowerDefenceController_1 = require("../TowerDefenceController");
class TowerDefensePhantomView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qJs = void 0),
      (this.GJs = void 0),
      (this.p9t = void 0),
      (this.o1a = void 0),
      (this.OJs = void 0),
      (this.I5t = () => {
        this.CloseMe();
      }),
      (this.NJs = (e) => {
        TowerDefenceController_1.TowerDefenseController.SetCurrentTowerDefensePhantomIdInUiTemp(
          e,
        ),
          this.kJs(!1),
          this.FJs(),
          this.VJs();
      }),
      (this.HJs = () => {
        var e = this.OJs.RoleCfgId;
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
          e,
        ),
          this.CloseMe();
      }),
      (this.n1a = () => {
        this.CloseMe();
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
      this.NJs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DissolvePrewar,
        this.n1a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom,
      this.NJs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DissolvePrewar,
        this.n1a,
      );
  }
  async OnBeforeStartAsync() {
    var e = new TowerDefensePhantomLockItem();
    await e.CreateByActorAsync(this.GetItem(10).GetOwner()),
      e.SetText("TowerDefence_lock"),
      (this.o1a = e);
  }
  OnStart() {
    (this.OJs = this.OpenParam),
      TowerDefenceController_1.TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp(),
      this.GetItem(9).SetUIActive(!0),
      (this.qJs = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomIconItem,
      )),
      this.kJs(!0),
      (this.GJs = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(6),
        TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillItem,
      )),
      this.FJs(),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(8))),
      this.p9t.SetFunction(this.HJs),
      this.p9t.SetLocalTextNew("TowerDefence_confirm"),
      this.VJs(),
      TowerDefenceController_1.TowerDefenseController.SetPhantomViewOpened(!0);
  }
  OnBeforeDestroy() {
    this.OJs = void 0;
  }
  kJs(e) {
    e =
      TowerDefenceController_1.TowerDefenseController.BuildPhantomIconScrollData(
        e,
      );
    this.qJs.RefreshByData(e);
  }
  FJs() {
    var e =
      TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillLayoutData();
    this.GJs.RefreshByData(e);
  }
  VJs() {
    var e =
        TowerDefenceController_1.TowerDefenseController.BuildPhantomOtherData(),
      t = e.IsLocked;
    this.p9t.SetUiActive(!t),
      this.o1a.SetUiActive(t),
      this.SetSpriteByPath(e.TypeIconPath, this.GetSprite(4), !1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.TypeTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.NameTextId);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.qJs) {
      var t = this.qJs.GetGrid(0);
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
