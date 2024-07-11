"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorButton = void 0);
const UE = require("ue");
const GamepadKeyByKeyName_1 = require("../../../../Core/Define/ConfigQuery/GamepadKeyByKeyName");
const PcKeyByKeyName_1 = require("../../../../Core/Define/ConfigQuery/PcKeyByKeyName");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputController_1 = require("../../../Input/InputController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const KeyUtil_1 = require("../../Util/KeyUtil");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
const BattleUiNiagaraItem_1 = require("./BattleUiNiagaraItem");
const CommonKeyItem_1 = require("./KeyItem/CommonKeyItem");
class BehaviorButton extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Vet = void 0),
      (this.htt = ""),
      (this.oot = void 0),
      (this.rot = void 0),
      (this.ZMe = ""),
      (this.BehaviorType = 101),
      (this.xet = void 0),
      (this.not = void 0),
      (this.sot = void 0),
      (this.ytt = 1),
      (this.Itt = 1),
      (this.aot = () => {
        let t;
        this.ytt !== 0 &&
          ((t = this.Vet?.InputAction) && this.hot(t, 1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
            !0,
            this.BehaviorType,
          ));
      }),
      (this.lot = () => {
        const t = this.Vet?.InputAction;
        t && this.hot(t, 2),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
            !1,
            this.BehaviorType,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UINiagara],
    ]),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        this.ComponentRegisterInfos.push([3, UE.UIItem]);
  }
  Initialize(t) {
    super.Initialize(), this.Ore();
    const e = this.GetSprite(1);
    (this.rot = e
      .GetOwner()
      .GetComponentByClass(UE.UISpriteTransition.StaticClass())),
      (this.not = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(
        this.GetUiNiagara(2),
      ));
  }
  async InitializeAsync(t) {
    let e;
    ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
      ((e = this.GetItem(3)),
      (this.xet = new CommonKeyItem_1.CommonKeyItem()),
      await this.xet.CreateThenShowByActorAsync(e.GetOwner())),
      this.RefreshBehaviorButton(t.InputActionType, t.ActionName);
  }
  OnBeforeDestroy() {
    (this.Vet = void 0),
      (this.xet = void 0),
      this.not.Stop(),
      (this.not = void 0),
      this.oot &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.oot),
        (this.oot = void 0)),
      this.kre(),
      (this.sot = void 0);
  }
  Ore() {
    const t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.aot), t.OnPointUpCallBack.Bind(this.lot);
  }
  kre() {
    const t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind(), t.OnPointUpCallBack.Unbind();
  }
  UpdateAlpha() {
    (this.Itt = this.RootItem.GetAlpha()),
      this.Itt > this.ytt
        ? this.RootItem.SetAlpha(this.ytt)
        : (this.ytt = this.Itt);
  }
  Refresh(t) {
    (this.Vet = t), this.RefreshVisible();
  }
  RefreshBehaviorButton(t, e) {
    (this.BehaviorType = t), (this.ZMe = e), this.xet?.RefreshAction(e);
  }
  hot(t, e) {
    this.OnInputAction(), InputController_1.InputController.InputAction(t, e);
  }
  OnInputAction() {
    this.ytt !== 0 && this.not?.Play();
  }
  SetBehaviorToggleState(t) {
    this.Vet &&
      ((this.Vet.State = t), (t = this.Vet.SkillIconPathList[t]), this._ot(t));
  }
  _ot(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t) && this.htt !== t) {
      this.oot && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.oot);
      const i = this.GetSprite(1);
      let e = !0;
      (this.oot = ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.LGUISpriteData_BaseObject,
        (t) => {
          (e = !1),
            (this.oot = void 0),
            i &&
              t &&
              (i.SetSprite(t, !1),
              i.bIsUIActive || i.SetUIActive(!0),
              this.rot) &&
              this.rot.SetAllTransitionSprite(t);
        },
      )),
        (this.htt = t),
        e || (this.oot = void 0);
    }
  }
  uot() {
    let t;
    if (this.ZMe)
      return (
        (t = ModelManager_1.ModelManager.PlatformModel),
        KeyUtil_1.KeyUtil.GetKeyName(this.ZMe, t.PlatformType)
      );
  }
  GetKeySpritePath() {
    let t;
    let e;
    const i = this.uot();
    if (i)
      return (t = ModelManager_1.ModelManager.PlatformModel).IsPc()
        ? (e = PcKeyByKeyName_1.configPcKeyByKeyName.GetConfig(i))
          ? e.KeyIconPath
          : void 0
        : t.IsGamepad() &&
            (e = GamepadKeyByKeyName_1.configGamepadKeyByKeyName.GetConfig(i))
          ? e.KeyIconPath
          : void 0;
  }
  RefreshVisible() {
    let t;
    this.RootItem?.IsValid() &&
      (t = this.cot()) !== this.RootItem.bIsUIActive &&
      (t ? (this.Show(), this.RefreshEnable(!0)) : this.Hide());
  }
  cot() {
    return (
      !(
        !this.Vet ||
        (this.BehaviorType === 102 &&
          !ModelManager_1.ModelManager.FunctionModel.IsOpen(10031))
      ) && this.Vet.IsVisible
    );
  }
  RefreshEnable(t) {}
  SetVisibleByExploreMode(t, e = !1) {
    let i = !1;
    t ? ((this.ytt = this.Itt), (i = !0)) : (this.ytt = 0),
      this.RootItem &&
        (this.RootItem.SetRaycastTarget(i),
        e
          ? (this.sot
              ? this.sot.Stop()
              : (this.sot = this.RootActor.GetComponentByClass(
                  UE.LGUIPlayTweenComponent.StaticClass(),
                )),
            ((t = this.sot.GetPlayTween()).from = this.RootItem.GetAlpha()),
            (t.to = this.ytt),
            this.sot.Play())
          : (this.sot && this.sot.Stop(), this.RootItem.SetAlpha(this.ytt)));
  }
}
exports.BehaviorButton = BehaviorButton;
// # sourceMappingURL=BehaviorButton.js.map
