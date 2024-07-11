"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffTargetRoleItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const ANIMATION_LENGTH = 200;
const LOW_HP_PERCENT = 0.2;
class BuffTargetRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.kgt = void 0),
      (this.Fgt = -1),
      (this.Vgt = 0),
      (this.Hgt = -0),
      (this.jgt = !1),
      (this.Wgt = void 0),
      (this.Kgt = 0),
      (this.Qgt = void 0),
      (this.Xgt = void 0),
      (this.EPe = void 0),
      (this.$gt = void 0),
      (this.Ygt = !1),
      (this.Jgt = !1),
      (this.zgt = () => {
        this.Wgt && this.Wgt(this);
      }),
      (this.Zgt = (t, i, e) => {
        let s;
        i !== e &&
          this.kgt &&
          ((s = this.kgt.Entity.GetComponent(156).GetCurrentValue(
            EAttributeId.Tkn,
          )),
          this.kgt.SetCurrentAttribute(i),
          this.e0t(e, i, s));
      });
  }
  Initialize(t) {
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [7, UE.UIButtonComponent],
      [9, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [[7, this.zgt]]);
  }
  OnStart() {
    (this.Xgt = new MediumItemGrid_1.MediumItemGrid()),
      this.Xgt.Initialize(this.GetItem(0).GetOwner()),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.$gt = this.GetUiNiagara(9)),
      this.$gt.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.Xgt = void 0),
      (this.Xgt = void 0),
      this.EPe?.Clear(),
      this.ResetBuffTargetRoleItem(),
      this.t0t(),
      (this.$gt = void 0);
  }
  ResetBuffTargetRoleItem() {
    (this.kgt = void 0), (this.Ygt = !1), this.tXe();
  }
  Tick(t) {
    this.jgt &&
      (this.Hgt > ANIMATION_LENGTH
        ? this.i0t()
        : (this.o0t(), (this.Hgt += t)));
  }
  RefreshBuffTargetRoleItem(t) {
    var i = (this.kgt = t).RoleConfigId;
    const e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    const s = t.RoleLevel;
    const h = Math.floor(t.CurrentAttribute);
    var t = Math.floor(t.MaxAttribute);
    var i = {
      Type: 2,
      ItemConfigId: i,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [s],
      ElementId: e.ElementId,
    };
    this.Xgt.Apply(i),
      this.SetCurrentValueBarPercent(h / t),
      this.r0t(h, t),
      this.SetPreviewValueBarVisible(!1),
      this.SetAnimationValueBarVisible(!1),
      this.n0t(!1),
      this.SetSelected(!1),
      this.SetNoneRole(!1),
      this.eXe();
  }
  RemoveRole() {
    this.SetNoneRole(!0), this.tXe(), (this.kgt = void 0);
  }
  eXe() {
    this.kgt &&
      this.kgt.Entity.GetComponent(156).AddListener(
        EAttributeId.Proto_Life,
        this.Zgt,
        "Life.BuffTargetRoleItem",
      );
  }
  tXe() {
    this.kgt &&
      this.kgt.Entity.GetComponent(156).RemoveListener(
        EAttributeId.Proto_Life,
        this.Zgt,
      );
  }
  RefreshPreviewUseItem(t, i, e) {
    const s = Math.min(t + e, i);
    const h = Math.min(e, i - t);
    this.SetCurrentValueBarPercent(t / i),
      this.SetPreviewValueBarPercent(s / i),
      this.SetPreviewValueBarVisible(e > 0),
      this.SetAddValueText(Math.floor(h)),
      this.n0t(e > 0),
      this.SetPreviewValueText(Math.floor(s), Math.floor(i));
  }
  ResetPreviewUseItem() {
    const t = this.kgt.CurrentAttribute;
    const i = this.kgt.MaxAttribute;
    this.SetPreviewValueBarVisible(!1), this.n0t(!1), this.r0t(t, i);
  }
  SetCurrentValueBarPercent(t) {
    const i = this.GetSprite(4);
    i.SetChangeColor(t <= LOW_HP_PERCENT, i.changeColor), i.SetFillAmount(t);
  }
  SetPreviewValueBarPercent(t) {
    this.GetSprite(5).SetFillAmount(t);
  }
  SetPreviewValueBarVisible(t) {
    this.GetSprite(5).SetUIActive(t);
  }
  SetAnimationValueBarPercent(t) {
    this.GetSprite(3).SetFillAmount(t);
  }
  s0t(t) {
    const i = this.GetSprite(3);
    i.SetChangeColor(t <= LOW_HP_PERCENT, i.changeColor);
  }
  SetAnimationValueBarVisible(t) {
    this.GetSprite(3).SetUIActive(t);
  }
  SetAddValueText(t) {
    this.GetText(1).SetText("+" + t);
  }
  n0t(t) {
    this.GetText(1).SetUIActive(t);
  }
  r0t(t, i) {
    const e = this.GetText(2);
    t <= 0
      ? e.SetText(`<color=#ff0000ff>${Math.ceil(t)}</color>/` + Math.ceil(i))
      : e.SetText(Math.ceil(t) + "/" + Math.ceil(i));
  }
  SetPreviewValueText(t, i) {
    this.GetText(2).SetText(`<color=#00ff00ff>${t}</color>/` + i);
  }
  SetSelected(t) {
    t
      ? (this.Xgt.SetSelected(!0), this.EPe.PlayLevelSequenceByName("Selected"))
      : (this.ResetPreviewUseItem(),
        this.SetAnimationValueBarVisible(!1),
        this.Xgt.SetSelected(!1)),
      (this.Jgt = t);
  }
  IsSelected() {
    return this.Jgt;
  }
  SetNoneRole(t) {
    const i = this.GetItem(8);
    const e = this.GetItem(6);
    i.SetUIActive(t), e.SetUIActive(!t);
  }
  GetUseBuffItemRoleData() {
    return this.kgt;
  }
  BindOnClickedBuffTargetRoleItem(t) {
    this.Wgt = t;
  }
  a0t() {
    const t = () => {
      this.$gt.SetUIActive(!0), this.$gt.ActivateSystem(!0);
    };
    let i;
    this.Ygt
      ? t()
      : ((i =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "Niagara_BuffTreat",
          )),
        this.SetNiagaraSystemByPath(i, this.$gt, () => {
          (this.Ygt = !0), t();
        }));
  }
  t0t() {
    this.$gt.DeactivateSystem(), this.$gt.SetUIActive(!1);
  }
  e0t(t, i, e) {
    t !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          8,
          `播放属性进度条动画，currentAttribute：${t},targetAttribute:${i},maxAttribute:` +
            e,
        ),
      this.jgt || (this.Fgt = t),
      this.a0t(),
      (this.Vgt = i),
      (this.Kgt = e),
      (this.Hgt = 0),
      (this.jgt = !0),
      this.SetAnimationValueBarVisible(!0),
      this.s0t(this.Fgt / this.Kgt),
      this.ResetPreviewUseItem(),
      this.EPe.PlayLevelSequenceByName("Reply"));
  }
  i0t() {
    (this.jgt = !1), (this.Hgt = -1);
    const t = this.kgt.CurrentAttribute;
    const i = this.kgt.MaxAttribute;
    const e = this.kgt.GetAddAttribute();
    this.s0t(t / i),
      this.RefreshPreviewUseItem(t, i, e),
      this.SetAnimationValueBarVisible(!1),
      this.Qgt && this.Qgt();
  }
  BindOnUseItemAnimationFinished(t) {
    this.Qgt = t;
  }
  o0t() {
    const t = Math.min(this.Hgt / ANIMATION_LENGTH, 1);
    (this.Fgt = MathUtils_1.MathUtils.Lerp(this.Fgt, this.Vgt, t)),
      this.SetAnimationValueBarPercent(this.Fgt / this.Kgt);
  }
}
exports.BuffTargetRoleItem = BuffTargetRoleItem;
// # sourceMappingURL=BuffTargetRoleItem.js.map
