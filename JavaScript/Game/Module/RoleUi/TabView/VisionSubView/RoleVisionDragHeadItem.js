"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionDragHeadItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
  RoleVisionCommonItem_1 = require("./RoleVisionCommonItem");
class RoleVisionDragHeadItem extends RoleVisionCommonItem_1.RoleVisionCommonItem {
  constructor() {
    super(...arguments),
      (this.ClickFunction = void 0),
      (this.bxt = void 0),
      (this.wCo = !1),
      (this.BCo = 0),
      (this.SPe = void 0),
      (this.bCo = ""),
      (this.qCo = void 0),
      (this.Lke = () => !1);
  }
  GetPlusItem() {
    return this.GetItem(6);
  }
  GetVisionTextureComponent() {
    return this.GetTexture(2);
  }
  GetVisionQualitySprite() {
    return this.GetSprite(3);
  }
  GetVisionCostText() {
    return this.GetText(5);
  }
  GetVisionCostItem() {
    return this.GetItem(4);
  }
  GetDragComponent() {
    return this.GetDraggable(1);
  }
  GetSelectToggle() {
    return this.GetExtendToggle(0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIDraggableComponent],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickVision]]);
  }
  async OnBeforeStartAsync() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(7),
    )),
      await this.bxt.Init();
  }
  SetAniLightState(t) {
    this.GetItem(11).SetUIActive(t);
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetItem(8).SetUIActive(!1);
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.Lke());
  }
  OnSetClickCallBack(t) {
    this.ClickFunction = t;
  }
  OnDragBegin() {
    this.bxt.GetRootItem().SetUIActive(!1),
      this.GetItem(4).SetUIActive(!1),
      this.GCo(!0);
  }
  OnDragEnd() {
    this.bxt.GetRootItem().SetUIActive(!0), this.GCo(!1);
  }
  OnUpdateItem(t) {
    var i;
    t &&
      (this.GetText(5).SetText(t.GetCost().toString()),
      (i = t.GetFetterGroupConfig()),
      this.bxt.Update(i)),
      this.NCo(),
      this.OCo(t),
      this.kCo(t),
      this.Ovt(),
      this.K8e(t),
      this.GCo(void 0 === t),
      this.GetItem(12)?.SetUIActive(!1);
  }
  GCo(t) {
    this.GetItem(10)?.SetUIActive(t), this.GetItem(13)?.SetUIActive(t);
  }
  kCo(t) {
    this.GetItem(9).SetUIActive(void 0 !== t);
  }
  NCo() {
    !this.AnimationState && this.CurrentData
      ? (this.GetItem(4).SetUIActive(!0),
        this.bxt.GetRootItem().SetUIActive(!0))
      : (this.bxt.GetRootItem().SetUIActive(!1),
        this.GetItem(4).SetUIActive(!1));
  }
  OnScrollToScrollViewEvent() {
    this.GetItem(12)?.SetUIActive(!0), this.GCo(!1);
  }
  OnRemoveFromScrollViewEvent() {
    this.GetItem(12)?.SetUIActive(!1), this.GCo(!0);
  }
  OnChangeAnimationState() {
    this.NCo();
  }
  OnItemOverlay() {
    this.PlaySequence("HighLight");
  }
  OnItemUnOverlay() {
    this.PlaySequence("Normal");
  }
  OnPlaySequence(t) {
    this.bCo !== t && ((this.bCo = t), this.SPe.PlaySequencePurely(t));
  }
  K8e(t) {
    var i;
    ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
      this.RoleId,
    ).IsTrialRole()
      ? this.GetItem(8)?.SetUIActive(!1)
      : !this.wCo && this.NeedRedDot && void 0 === t
        ? ((this.wCo = !0),
          RedDotController_1.RedDotController.BindRedDot(
            "VisionOneKeyEquip",
            this.GetItem(8),
            void 0,
            this.RoleId,
          ),
          (this.BCo = 0))
        : !this.wCo &&
          this.NeedRedDot &&
          t &&
          ((this.wCo = !0),
          (i = t.GetIncrId()),
          RedDotController_1.RedDotController.BindRedDot(
            "IdentifyTab",
            this.GetItem(8),
            void 0,
            i,
          ),
          (this.BCo = 1),
          (this.qCo = t));
  }
  Ovt() {
    this.wCo &&
      ((this.wCo = !1),
      0 === this.BCo
        ? RedDotController_1.RedDotController.UnBindGivenUi(
            "VisionOneKeyEquip",
            this.GetItem(8),
            this.RoleId,
          )
        : RedDotController_1.RedDotController.UnBindGivenUi(
            "IdentifyTab",
            this.GetItem(8),
            this.qCo?.GetIncrId(),
          ));
  }
  OCo(t) {
    void 0 !== t
      ? ((t = t.GetQuality()),
        (t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
            t,
          )),
        this.SetSpriteByPath(t, this.GetSprite(3), !1))
      : ((t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(
            0,
          )),
        this.SetSpriteByPath(t, this.GetSprite(3), !1));
  }
  OnResetPosition() {
    this.GetDragComponent()?.RootUIComp.SetAsLastHierarchy(),
      "HighLight" === this.bCo
        ? (this.PlaySequence("Normal"), this.SPe.StopCurrentSequence(!1, !0))
        : (this.bCo = "Normal"),
      (this.AnimationState = !1),
      this.NCo();
  }
  OnBeforeClearComponent() {
    this.Ovt();
  }
}
exports.RoleVisionDragHeadItem = RoleVisionDragHeadItem;
//# sourceMappingURL=RoleVisionDragHeadItem.js.map
