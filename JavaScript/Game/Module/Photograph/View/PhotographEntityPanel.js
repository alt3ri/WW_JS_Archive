"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityIconItem =
    exports.EntityInfoItem =
    exports.PhotographEntityPanel =
      void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
class PhotographEntityPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.EWi = void 0),
      (this.yWi = void 0),
      (this.IWi = new Map()),
      (this.TWi = new Map()),
      (this.xPt = (t, e, i) => {
        const s = new EntityInfoItem();
        return (
          s.SetRootActor(e.GetOwner(), !0),
          s.InitSpr(),
          s.Refresh(t),
          { Key: i, Value: s }
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this.EWi = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(1),
      this.xPt,
    )),
      (this.yWi = this.GetItem(5)),
      PhotographController_1.PhotographController.CloseBlackScreen();
  }
  OnBeforeDestroy() {
    this.EWi && (this.EWi.ClearChildren(), (this.EWi = void 0)),
      this.IWi.clear(),
      this.TWi.clear(),
      (this.yWi = void 0);
  }
  Refresh(e) {
    this.IWi.clear();
    for (let t = 0; t < e.length; t++) this.IWi.set(e[t].Text, t);
    this.EWi.RebuildLayoutByDataNew(e);
  }
  SetInfoPanelVisible(t) {
    this.GetVerticalLayout(1).RootUIComp.SetUIActive(t);
  }
  UpdateIcons(t) {
    t.length <= 0 &&
      this.TWi.forEach((t) => {
        this.Move(t, new UE.Vector2D(0, 0), !0);
      });
    for (const i of t) {
      var e;
      this.TWi.has(i.Id)
        ? this.Move(this.TWi.get(i.Id), i.Vector, i.NotShow)
        : ((e = new EntityIconItem(
            LguiUtil_1.LguiUtil.CopyItem(this.yWi, this.GetItem(0)),
          )).CreateByActorAsync(e.GetItsItem().GetOwner()),
          e
            ? (e.SetUiActive(!0),
              e.InitSpr(),
              this.TWi.set(i.Id, e),
              this.Move(e, i.Vector, !0))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 46, "tempUiItem为空", ["名称：", i.Id]));
    }
  }
  Move(t, e, i) {
    const s = t.GetItsItem();
    s.SetUIActive(!0),
      s.SetAnchorOffset(new UE.Vector2D(e.X, e.Y)),
      i
        ? t.UpdateNowIcon(0)
        : t.UpdateNowIcon(
            PhotographController_1.PhotographController.IsLastChecked ? 2 : 1,
          );
  }
  GetInfoItemByDesc(t) {
    t = this.IWi.get(t);
    if (void 0 !== t) return this.EWi.GetLayoutItemByIndex(t);
  }
}
exports.PhotographEntityPanel = PhotographEntityPanel;
class EntityInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(), (this.UiSequencePlayer = void 0), (this.ILr = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  InitSpr() {
    this.UiSequencePlayer ||
      (this.UiSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      )),
      this.UiSequencePlayer.StopCurrentSequence(!1, !0),
      this.UiSequencePlayer.PlayLevelSequenceByName("Fail"),
      (this.ILr = !1);
  }
  Refresh(t) {
    const e = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.Text);
    e && this.GetText(2).SetText(e), this.RefreshFinishState(t.IsFinish);
  }
  RefreshFinishState(t) {
    t && !this.ILr
      ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
        this.UiSequencePlayer.PlayLevelSequenceByName("Complete"),
        (this.ILr = !0))
      : !t &&
        this.ILr &&
        (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
        this.UiSequencePlayer.PlayLevelSequenceByName("Fail"),
        (this.ILr = !1));
  }
}
exports.EntityInfoItem = EntityInfoItem;
class EntityIconItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.UiSequencePlayer = void 0),
      (this.Item = void 0),
      (this.ItsColor = 0),
      (this.Item = t),
      (this.UiSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        t,
      ));
  }
  GetItsItem() {
    return this.Item;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  InitSpr() {
    this.GetItem(0)?.SetUIActive(!1), this.GetItem(1)?.SetUIActive(!1);
  }
  UpdateNowIcon(t) {
    switch (t) {
      case 2:
        this.ItsColor === 0
          ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("NtoG"),
            (this.ItsColor = 2))
          : this.ItsColor === 1 &&
            (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("YtoG"),
            (this.ItsColor = 2));
        break;
      case 1:
        this.ItsColor === 0
          ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("NtoY"),
            (this.ItsColor = 1))
          : this.ItsColor === 2 &&
            (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("GtoY"),
            (this.ItsColor = 1));
        break;
      case 0:
        this.ItsColor === 2
          ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("GtoN"),
            (this.ItsColor = 0))
          : this.ItsColor === 1 &&
            (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("YtoN"),
            (this.ItsColor = 0));
    }
  }
}
exports.EntityIconItem = EntityIconItem;
// # sourceMappingURL=PhotographEntityPanel.js.map
