"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcIconComponentView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
class NpcIconComponentView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RootActorRotation = void 0),
      (this.jqi = void 0),
      (this.Wqi = !1),
      (this.Kqi = !1),
      (this.Qqi = !1),
      (this.Xqi = !1),
      (this.$qi = !1),
      (this.Yqi = !1),
      (this.Jqi = void 0),
      (this.zqi = void 0),
      (this.IconPath = ""),
      (this.Zqi = void 0),
      (this.eGi = new UE.Vector(1, 1, 1)),
      (this.tGi = 0),
      (this.iGi = void 0),
      (this.oGi = void 0),
      (this.rGi = void 0),
      (this.nGi = new UE.Vector(1, 1, 1)),
      (this.sGi = 0),
      (this.aGi = void 0),
      (this.ymt = 0),
      (this.CRi = void 0),
      (this.hGi = !1),
      (this.lGi = void 0),
      (this._Gi = !1),
      (this.uGi = void 0),
      (this.cGi = (t) => {
        this.uGi?.(), (this.uGi = void 0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  OnStart() {
    (this.RootActorRotation = this.RootActor.K2_GetActorRotation()),
      (this.jqi = new UE.Vector(0, 0, 0)),
      (this.iGi = this.GetItem(6)),
      (this.tGi = this.iGi.K2_GetComponentScale().X),
      (this.aGi = this.GetItem(2)),
      (this.sGi = this.aGi.K2_GetComponentScale().X),
      (this.Jqi = this.GetItem(5)),
      (this.zqi = this.GetTexture(4)),
      (this.rGi = this.GetItem(8)),
      (this.oGi = this.GetItem(10)),
      (this.$qi = this.zqi.bIsUIActive),
      (this.Qqi = this.iGi.bIsUIActive),
      (this.Kqi = this.RootItem.bIsUIActive),
      (this.Wqi = this.Jqi.bIsUIActive),
      this.mGi(),
      this.SetDialogueActive(!1),
      this.dGi();
  }
  mGi() {
    (this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.CRi.BindSequenceCloseEvent(this.cGi);
  }
  SetNpcName(t) {
    var i = this.GetText(0);
    StringUtils_1.StringUtils.IsEmpty(t)
      ? i.SetUIActive(!1)
      : (i.SetUIActive(!0), i.SetText(t));
  }
  SetNpcQuestIcon(t) {
    (this.IconPath = t),
      StringUtils_1.StringUtils.IsEmpty(t)
        ? this.dGi()
        : (this.SetTextureByPath(t, this.zqi), this.CGi(!0), (this.lGi = 1));
  }
  InitItemLocation(t, i) {
    (this.jqi = t),
      (this.jqi.Z = t.Z + i),
      this.RootActor.K2_SetActorLocation(this.jqi, !1, void 0, !1);
  }
  UpdateRotation(t, i) {
    t += 90;
    (this.RootActorRotation.Roll = i - 90),
      (this.RootActorRotation.Pitch = 0),
      (this.RootActorRotation.Yaw = t),
      this.RootItem.SetUIWorldRotation(this.RootActorRotation);
  }
  SetDialogueActive(t, i = !1) {
    t !== this.Yqi &&
      ((this.Yqi = t)
        ? (this.aGi.SetUIActive(!0),
          this.gGi("DialogueStart"),
          this.rGi.SetUIActive(i))
        : ((this.uGi = () => {
            this.aGi.SetUIActive(!1);
          }),
          this.gGi("DialogueClose") || this.uGi?.()));
  }
  GetDialogueActive() {
    return this.Yqi;
  }
  gGi(t) {
    return (
      this.CRi.GetCurrentSequence() === t
        ? this.CRi.ReplaySequenceByKey(t)
        : (this.CRi.StopCurrentSequence(!1, !0),
          this.CRi.PlayLevelSequenceByName(t)),
      !0
    );
  }
  SetDialogueText(t) {
    this.GetText(3).SetText(t);
  }
  SetHeadItemState(t) {
    this.Qqi !== t &&
      ((this.Qqi = t), this.iGi.SetUIActive(t), t) &&
      this.$qi &&
      !this.hGi &&
      0 === this.lGi &&
      (this.fGi(), (this.hGi = !1));
  }
  SetQuestTrackCellState(t) {
    this._Gi !== t && ((this._Gi = t), this.oGi.SetUIActive(t));
  }
  SetRootItemState(t) {
    this.Kqi !== t &&
      ((this.Kqi = t), this.SetActive(t && !UiLayer_1.UiLayer.IsForceHideUi()));
  }
  GetRootItemState() {
    return this.Kqi;
  }
  SetTrackEffectState(t) {
    this.Xqi !== t &&
      ((this.Xqi = t),
      EffectSystem_1.EffectSystem.SetEffectHidden(
        this.ymt,
        t,
        "NpcIconComponentView",
      ));
  }
  SetHeadInfoNameState(t) {
    this.Wqi !== t &&
      ((this.Wqi = t),
      this.Jqi.SetUIActive(t),
      this.aGi.SetUIActive(t && this.Yqi));
  }
  SetNpcQuestIconState(t) {
    this.CGi(t);
  }
  SetNpcSecondName() {
    var t,
      i = this.GetText(1);
    this.Zqi &&
    (t = ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcHeadInfo(this.Zqi))
      .SecondName
      ? (i.SetUIActive(!0), i.ShowTextNew(t.SecondName))
      : i.SetUIActive(!1);
  }
  dGi() {
    var t;
    this.Zqi &&
    (t = ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcHeadInfo(this.Zqi))
      .FunctionPath
      ? (this.CGi(!0),
        this.SetTextureByPath(t.FunctionPath, this.zqi),
        (this.lGi = 0))
      : this.CGi(!1);
  }
  SetNpcMessageId(t) {
    this.Zqi = t;
  }
  SetHeadWorldScale3D(t) {
    this.Qqi &&
      this.tGi !== t &&
      ((this.tGi = t),
      (this.eGi.X = t),
      (this.eGi.Y = t),
      (this.eGi.Z = t),
      this.iGi.SetWorldScale3D(this.eGi));
  }
  SetDialogWorldScale3D(t) {
    this.sGi !== t &&
      ((this.sGi = t),
      (this.nGi.X = t),
      (this.nGi.Y = t),
      (this.nGi.Z = t),
      this.aGi.SetWorldScale3D(this.nGi));
  }
  fGi() {
    this.CRi.PlayLevelSequenceByName("FirstStart");
  }
  CGi(t) {
    t !== this.$qi && ((this.$qi = t), this.zqi.SetUIActive(t));
  }
  OnBeforeDestroy() {
    EffectSystem_1.EffectSystem.IsValid(this.ymt) &&
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.ymt,
        "[NpcIconComponentView.OnBeforeDestroy]",
        !0,
      ),
      (this.ymt = 0)),
      this.CRi?.Clear();
  }
}
exports.NpcIconComponentView = NpcIconComponentView;
//# sourceMappingURL=NpcIconComponentView.js.map
