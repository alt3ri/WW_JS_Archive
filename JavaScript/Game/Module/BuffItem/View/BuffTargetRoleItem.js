"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffTargetRoleItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
  ANIMATION_LENGTH = 200,
  LOW_HP_PERCENT = 0.2;
class BuffTargetRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.z0t = void 0),
      (this.Z0t = -1),
      (this.eft = 0),
      (this.tft = -0),
      (this.ift = !1),
      (this.oft = void 0),
      (this.rft = 0),
      (this.nft = void 0),
      (this.sft = void 0),
      (this.SPe = void 0),
      (this.aft = void 0),
      (this.hft = !1),
      (this.lft = !1),
      (this._ft = () => {
        this.oft && this.oft(this);
      }),
      (this.uft = (t, i, e) => {
        var s;
        i !== e &&
          this.z0t &&
          ((s = this.z0t.Entity.GetComponent(158).GetCurrentValue(
            EAttributeId.e5n,
          )),
          this.z0t.SetCurrentAttribute(i),
          this.cft(e, i, s));
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
      (this.BtnBindInfo = [[7, this._ft]]);
  }
  OnStart() {
    (this.sft = new MediumItemGrid_1.MediumItemGrid()),
      this.sft.Initialize(this.GetItem(0).GetOwner()),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.aft = this.GetUiNiagara(9)),
      this.aft.SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.sft = void 0),
      (this.sft = void 0),
      this.SPe?.Clear(),
      this.ResetBuffTargetRoleItem(),
      this.mft(),
      (this.aft = void 0);
  }
  ResetBuffTargetRoleItem() {
    (this.z0t = void 0), (this.hft = !1), this.m$e();
  }
  Tick(t) {
    this.ift &&
      (this.tft > ANIMATION_LENGTH
        ? this.dft()
        : (this.Cft(), (this.tft += t)));
  }
  RefreshBuffTargetRoleItem(t) {
    var i = (this.z0t = t).RoleConfigId,
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i),
      s = t.RoleLevel,
      h = Math.floor(t.CurrentAttribute),
      t = Math.floor(t.MaxAttribute),
      i = {
        Type: 2,
        ItemConfigId: i,
        BottomTextId: "Text_LevelShow_Text",
        BottomTextParameter: [s],
        ElementId: e.ElementId,
      };
    this.sft.Apply(i),
      this.SetCurrentValueBarPercent(h / t),
      this.gft(h, t),
      this.SetPreviewValueBarVisible(!1),
      this.SetAnimationValueBarVisible(!1),
      this.fft(!1),
      this.SetSelected(!1),
      this.SetNoneRole(!1),
      this.c$e();
  }
  RemoveRole() {
    this.SetNoneRole(!0), this.m$e(), (this.z0t = void 0);
  }
  c$e() {
    this.z0t &&
      this.z0t.Entity.GetComponent(158).AddListener(
        EAttributeId.Proto_Life,
        this.uft,
        "Life.BuffTargetRoleItem",
      );
  }
  m$e() {
    this.z0t &&
      this.z0t.Entity.GetComponent(158).RemoveListener(
        EAttributeId.Proto_Life,
        this.uft,
      );
  }
  RefreshPreviewUseItem(t, i, e) {
    var s = Math.min(t + e, i),
      h = Math.min(e, i - t);
    this.SetCurrentValueBarPercent(t / i),
      this.SetPreviewValueBarPercent(s / i),
      this.SetPreviewValueBarVisible(0 < e),
      this.SetAddValueText(Math.floor(h)),
      this.fft(0 < e),
      this.SetPreviewValueText(Math.floor(s), Math.floor(i));
  }
  ResetPreviewUseItem() {
    var t = this.z0t.CurrentAttribute,
      i = this.z0t.MaxAttribute;
    this.SetPreviewValueBarVisible(!1), this.fft(!1), this.gft(t, i);
  }
  SetCurrentValueBarPercent(t) {
    var i = this.GetSprite(4);
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
  pft(t) {
    var i = this.GetSprite(3);
    i.SetChangeColor(t <= LOW_HP_PERCENT, i.changeColor);
  }
  SetAnimationValueBarVisible(t) {
    this.GetSprite(3).SetUIActive(t);
  }
  SetAddValueText(t) {
    this.GetText(1).SetText("+" + t);
  }
  fft(t) {
    this.GetText(1).SetUIActive(t);
  }
  gft(t, i) {
    var e = this.GetText(2);
    t <= 0
      ? e.SetText(`<color=#ff0000ff>${Math.ceil(t)}</color>/` + Math.ceil(i))
      : e.SetText(Math.ceil(t) + "/" + Math.ceil(i));
  }
  SetPreviewValueText(t, i) {
    this.GetText(2).SetText(`<color=#00ff00ff>${t}</color>/` + i);
  }
  SetSelected(t) {
    t
      ? (this.sft.SetSelected(!0), this.SPe.PlayLevelSequenceByName("Selected"))
      : (this.ResetPreviewUseItem(),
        this.SetAnimationValueBarVisible(!1),
        this.sft.SetSelected(!1)),
      (this.lft = t);
  }
  IsSelected() {
    return this.lft;
  }
  SetNoneRole(t) {
    var i = this.GetItem(8),
      e = this.GetItem(6);
    i.SetUIActive(t), e.SetUIActive(!t);
  }
  GetUseBuffItemRoleData() {
    return this.z0t;
  }
  BindOnClickedBuffTargetRoleItem(t) {
    this.oft = t;
  }
  vft() {
    const t = () => {
      this.aft.SetUIActive(!0), this.aft.ActivateSystem(!0);
    };
    var i;
    this.hft
      ? t()
      : ((i =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "Niagara_BuffTreat",
          )),
        this.SetNiagaraSystemByPath(i, this.aft, () => {
          (this.hft = !0), t();
        }));
  }
  mft() {
    this.aft.DeactivateSystem(), this.aft.SetUIActive(!1);
  }
  cft(t, i, e) {
    t !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Test",
          8,
          `播放属性进度条动画，currentAttribute：${t},targetAttribute:${i},maxAttribute:` +
            e,
        ),
      this.ift || (this.Z0t = t),
      this.vft(),
      (this.eft = i),
      (this.rft = e),
      (this.tft = 0),
      (this.ift = !0),
      this.SetAnimationValueBarVisible(!0),
      this.pft(this.Z0t / this.rft),
      this.ResetPreviewUseItem(),
      this.SPe.PlayLevelSequenceByName("Reply"));
  }
  dft() {
    (this.ift = !1), (this.tft = -1);
    var t = this.z0t.CurrentAttribute,
      i = this.z0t.MaxAttribute,
      e = this.z0t.GetAddAttribute();
    this.pft(t / i),
      this.RefreshPreviewUseItem(t, i, e),
      this.SetAnimationValueBarVisible(!1),
      this.nft && this.nft();
  }
  BindOnUseItemAnimationFinished(t) {
    this.nft = t;
  }
  Cft() {
    var t = Math.min(this.tft / ANIMATION_LENGTH, 1);
    (this.Z0t = MathUtils_1.MathUtils.Lerp(this.Z0t, this.eft, t)),
      this.SetAnimationValueBarPercent(this.Z0t / this.rft);
  }
}
exports.BuffTargetRoleItem = BuffTargetRoleItem;
//# sourceMappingURL=BuffTargetRoleItem.js.map
