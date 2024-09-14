"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecutionPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  ExecutionItem_1 = require("./ExecutionItem"),
  Info_1 = require("../../../../../Core/Common/Info"),
  CLOSE_ANIM_TIME = 300,
  childType = 17;
class ExecutionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Hnt = void 0),
      (this.sDe = void 0),
      (this.lat = void 0),
      (this._at = void 0),
      (this.uat = void 0),
      (this.cat = void 0),
      (this.mat = !0),
      (this.dat = () => {
        (this._at = void 0), this.uat.SetResult(), (this.uat = void 0);
      }),
      (this.bMe = (t, i) => {
        1 === i && this.Cat();
      }),
      (this.Cat = () => {
        var t;
        this.sDe?.Valid
          ? (this.lat?.OnInputAction(),
            (t = this.sDe.Entity.GetComponent(106))?.IsPawnInteractive() &&
              t.InteractPawn())
          : (this.m$e(), (this.sDe = void 0), this.Hide());
      }),
      (this.gat = () => {
        (this.mat = this.cat.GetChildVisible(childType)),
          this.mat
            ? this.sDe?.Valid && !this.IsShowOrShowing && this.Show()
            : this.IsHideOrHiding || this.Hide();
      }),
      (this.zpe = () => {
        this.fat();
      });
  }
  Init(t) {
    (this.cat = ModelManager_1.ModelManager.BattleUiModel.ChildViewData),
      (this.mat = this.cat.GetChildVisible(childType)),
      this.Initialize(t);
  }
  async Initialize(t) {
    await this.CreateByResourceIdAsync("UiItem_FightSkillDeath", t, !0),
      this.sDe?.Valid && this.mat && this.Show();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  GetExecutionItem() {
    return this.IsShowOrShowing ? this.GetItem(0) : void 0;
  }
  async OnBeforeStartAsync() {
    await this.fet(), this.Ore();
  }
  async fet() {
    var t = new ExecutionItem_1.ExecutionItem(),
      i = this.GetItem(0).GetOwner();
    return (
      await t.NewByRootActorAsync(i),
      (this.lat = t).Init(this.Cat),
      t.RefreshKeyByActionName(InputMappingsDefine_1.actionMappings.通用交互),
      t.RefreshSkillIconByResId("SP_IconPutDeath"),
      !0
    );
  }
  OnStart() {
    this.Est(1), this.Est(2);
  }
  OnAfterShow() {
    this.Gnt(2), this.bnt(1);
  }
  async OnBeforeHideAsync() {
    this.Gnt(1),
      this.uat &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "重复调用隐藏"),
        this.uat.SetResult()),
      (this.uat = new CustomPromise_1.CustomPromise()),
      (this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME)),
      this.bnt(2),
      await this.uat.Promise;
  }
  OnBeforeDestroy() {
    this._at &&
      (TimerSystem_1.TimerSystem.Remove(this._at),
      (this._at = void 0),
      this.uat.SetResult()),
      this.lat?.Destroy(),
      (this.lat = void 0),
      this.kre();
  }
  Ore() {
    Info_1.Info.IsInTouch() ||
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.通用交互,
        this.bMe,
      ),
      this.cat.AddCallback(childType, this.gat);
  }
  kre() {
    Info_1.Info.IsInTouch() ||
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.通用交互,
        this.bMe,
      ),
      this.cat.RemoveCallback(childType, this.gat);
  }
  Est(t) {
    var i = [],
      e = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e.Num();
    for (let t = 0; t < s; t++) i.push(e.Get(t));
    this.Hnt || (this.Hnt = new Map()), this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) for (const i of t) i.Play();
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) for (const i of t) i.Stop();
  }
  ShowByEntity(t) {
    this.sDe?.Id !== t &&
      ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t))
        ? (this.m$e(), (this.sDe = t), this._o())
        : this.fat());
  }
  HideByEntity(t) {
    this.sDe?.Id === t && this.fat();
  }
  _o() {
    this.c$e(),
      !this.IsShowOrShowing && this.mat && this.Show(),
      ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(!0),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
        7,
        19,
        !1,
        !0,
      );
  }
  fat() {
    this.m$e(),
      (this.sDe = void 0),
      this.IsHideOrHiding || this.Hide(),
      ModelManager_1.ModelManager.BattleUiModel.SetExecutionInteractEnable(!1),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
        7,
        19,
        !0,
        !0,
      );
  }
  c$e() {
    this.sDe &&
      EventSystem_1.EventSystem.AddWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
  m$e() {
    this.sDe &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.sDe,
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
  }
}
exports.ExecutionPanel = ExecutionPanel;
//# sourceMappingURL=ExecutionPanel.js.map
