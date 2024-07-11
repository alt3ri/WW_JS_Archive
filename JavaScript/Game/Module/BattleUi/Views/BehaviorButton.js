"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorButton = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputController_1 = require("../../../Input/InputController"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  BattleUiNiagaraItem_1 = require("./BattleUiNiagaraItem"),
  CommonKeyItem_1 = require("./KeyItem/CommonKeyItem");
class BehaviorButton extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.tit = void 0),
      (this.Mit = ""),
      (this.frt = void 0),
      (this.prt = void 0),
      (this.ActionName = ""),
      (this.BehaviorType = 101),
      (this.Qtt = void 0),
      (this.vrt = void 0),
      (this.Mrt = void 0),
      (this.qit = 1),
      (this.Git = 1),
      (this.Ert = () => {
        var t;
        0 !== this.qit &&
          ((t = this.tit?.InputAction) && this.Srt(t, 1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton,
            !0,
            this.BehaviorType,
          ));
      }),
      (this.yrt = () => {
        var t = this.tit?.InputAction;
        t && this.Srt(t, 2),
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
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([3, UE.UIItem]);
  }
  Initialize(t) {
    super.Initialize(), this.Ore();
    var i = this.GetSprite(1);
    (this.prt = i
      .GetOwner()
      .GetComponentByClass(UE.UISpriteTransition.StaticClass())),
      (this.vrt = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(
        this.GetUiNiagara(2),
      ));
  }
  async InitializeAsync(t) {
    var i;
    Info_1.Info.IsInTouch() ||
      ((i = this.GetItem(3)),
      (this.Qtt = new CommonKeyItem_1.CommonKeyItem()),
      await this.Qtt.CreateThenShowByActorAsync(i.GetOwner())),
      this.RefreshBehaviorButton(t.InputActionType, t.ActionName);
  }
  OnBeforeDestroy() {
    (this.tit = void 0),
      (this.Qtt = void 0),
      this.vrt.Stop(),
      (this.vrt = void 0),
      this.frt &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.frt),
        (this.frt = void 0)),
      this.kre(),
      (this.Mrt = void 0);
  }
  Ore() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Bind(this.Ert), t.OnPointUpCallBack.Bind(this.yrt);
  }
  kre() {
    var t = this.GetButton(0);
    t.OnPointDownCallBack.Unbind(), t.OnPointUpCallBack.Unbind();
  }
  UpdateAlpha() {
    (this.Git = this.RootItem.GetAlpha()),
      this.Git > this.qit
        ? this.RootItem.SetAlpha(this.qit)
        : (this.qit = this.Git);
  }
  Refresh(t) {
    (this.tit = t), this.RefreshVisible();
  }
  RefreshBehaviorButton(t, i) {
    (this.BehaviorType = t), (this.ActionName = i), this.Qtt?.RefreshAction(i);
  }
  Srt(t, i) {
    this.OnInputAction(), InputController_1.InputController.InputAction(t, i);
  }
  OnInputAction() {
    0 !== this.qit && this.vrt?.Play();
  }
  SetBehaviorToggleState(t) {
    this.tit &&
      ((this.tit.State = t), (t = this.tit.SkillIconPathList[t]), this.Irt(t));
  }
  Irt(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t) && this.Mit !== t) {
      this.frt && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.frt);
      const e = this.GetSprite(1);
      let i = !0;
      (this.frt = ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.LGUISpriteData_BaseObject,
        (t) => {
          (i = !1),
            (this.frt = void 0),
            e &&
              t &&
              (e.SetSprite(t, !1),
              e.bIsUIActive || e.SetUIActive(!0),
              this.prt) &&
              this.prt.SetAllTransitionSprite(t);
        },
      )),
        (this.Mit = t),
        i || (this.frt = void 0);
    }
  }
  RefreshVisible() {
    var t;
    this.RootItem?.IsValid() &&
      (t = this.Lrt()) !== this.RootItem.bIsUIActive &&
      (t ? (this.Show(), this.RefreshEnable(!0)) : this.Hide());
  }
  Lrt() {
    return (
      !(
        !this.tit ||
        (102 === this.BehaviorType &&
          !ModelManager_1.ModelManager.FunctionModel.IsOpen(10031))
      ) && this.tit.IsVisible
    );
  }
  RefreshEnable(t) {}
  SetVisibleByExploreMode(t, i = !1) {
    let e = !1;
    t ? ((this.qit = this.Git), (e = !0)) : (this.qit = 0),
      this.RootItem &&
        (this.RootItem.SetRaycastTarget(e),
        i
          ? (this.Mrt
              ? this.Mrt.Stop()
              : (this.Mrt = this.RootActor.GetComponentByClass(
                  UE.LGUIPlayTweenComponent.StaticClass(),
                )),
            ((t = this.Mrt.GetPlayTween()).from = this.RootItem.GetAlpha()),
            (t.to = this.qit),
            this.Mrt.Play())
          : (this.Mrt && this.Mrt.Stop(), this.RootItem.SetAlpha(this.qit)));
  }
}
exports.BehaviorButton = BehaviorButton;
//# sourceMappingURL=BehaviorButton.js.map
