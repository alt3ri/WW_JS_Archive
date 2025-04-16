"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityIconItem =
    exports.EntityInfoItem =
    exports.PhotographEntityPanel =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController");
class PhotographEntityPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.MKi = void 0),
      (this.EKi = void 0),
      (this.SKi = new Map()),
      (this.La1 = new Map()),
      (this.yKi = new Map()),
      (this.qxt = (t, i, e) => {
        var s = new EntityInfoItem();
        return (
          s.SetRootActor(i.GetOwner(), !0),
          s.InitSpr(),
          s.Refresh(t),
          { Key: e, Value: s }
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
    (this.MKi = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(1),
      this.qxt,
    )),
      (this.EKi = this.GetItem(5)),
      PhotographController_1.PhotographController.CloseBlackScreen();
  }
  OnBeforeDestroy() {
    this.MKi && (this.MKi.ClearChildren(), (this.MKi = void 0)),
      this.La1.clear(),
      this.SKi.clear(),
      this.yKi.clear(),
      (this.EKi = void 0);
  }
  Refresh(i) {
    this.SKi.clear();
    for (let t = 0; t < i.length; t++) this.SKi.set(i[t].Text, t);
    this.MKi.RebuildLayoutByDataNew(i);
  }
  SetInfoPanelVisible(t) {
    this.GetVerticalLayout(1).RootUIComp.SetUIActive(t);
  }
  UpdateIcons(t, i) {
    t.length <= 0 &&
      this.yKi.forEach((t) => {
        this.Move(t, new UE.Vector2D(0, 0), !0, !1, !1, i);
      });
    for (const h of t) {
      var e, s;
      this.yKi.has(h.Id)
        ? ((e = this.yKi.get(h.Id)),
          this.Move(
            e,
            h.Vector,
            h.NotShow,
            h.IsOptional,
            h.IsOptionalFinished,
            i,
          ))
        : ((e = new EntityIconItem(
            LguiUtil_1.LguiUtil.CopyItem(this.EKi, this.GetItem(0)),
          )).CreateByActorAsync(e.GetItsItem().GetOwner()),
          e
            ? (e.SetUiActive(!0),
              e.InitSpr(),
              this.yKi.set(h.Id, e),
              this.La1.has(i)
                ? (s = this.La1.get(i)) &&
                  !s.includes(e) &&
                  (s.push(e), this.La1.set(i, s))
                : ((s = new Array()).push(e), this.La1.set(i, s)),
              this.Move(e, h.Vector, !0, h.IsOptional, h.IsOptionalFinished, i))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Photo", 45, "tempUiItem为空", ["名称：", h.Id]));
    }
  }
  Move(t, i, e, s, h, o) {
    var r = t.GetItsItem();
    r.SetUIActive(!0),
      r.SetAnchorOffset(new UE.Vector2D(i.X, i.Y)),
      h || e
        ? t.UpdateNowIcon(0)
        : s
          ? t.UpdateNowIcon(2)
          : t.UpdateNowIcon(
              PhotographController_1.PhotographController.PhotoMissionFinishMap.get(
                o.TakePlace.RangeEntity,
              )
                ? 2
                : 1,
            );
  }
  GetInfoItemByDesc(t) {
    t = this.SKi.get(t);
    if (void 0 !== t) return this.MKi.GetLayoutItemByIndex(t);
  }
}
exports.PhotographEntityPanel = PhotographEntityPanel;
class EntityInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(), (this.UiSequencePlayer = void 0), (this.EDr = !1);
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
      (this.EDr = !1);
  }
  Refresh(t) {
    var i = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.Text);
    i
      ? t.IsOptionFinished
        ? this.SetTextLine(t.Text)
        : this.GetText(2).SetText(i)
      : this.RefreshFinishState(t.IsFinish);
  }
  RefreshFinishState(t) {
    t && !this.EDr
      ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
        this.UiSequencePlayer.PlayLevelSequenceByName("Complete"),
        (this.EDr = !0))
      : !t &&
        this.EDr &&
        (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
        this.UiSequencePlayer.PlayLevelSequenceByName("Fail"),
        (this.EDr = !1));
  }
  SetTextLine(t) {
    t = PublicUtil_1.PublicUtil.GetConfigTextByKey(t);
    t &&
      (this.GetText(2).SetText("<s>" + t + "</s>"),
      this.UiSequencePlayer.StopCurrentSequence(!1, !0),
      this.UiSequencePlayer.PlayLevelSequenceByName("Complete"),
      this.UiSequencePlayer.StopCurrentSequence(!1, !0),
      (this.EDr = !0));
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
        0 === this.ItsColor
          ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("NtoG"),
            (this.ItsColor = 2))
          : 1 === this.ItsColor &&
            (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("YtoG"),
            (this.ItsColor = 2));
        break;
      case 1:
        0 === this.ItsColor
          ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("NtoY"),
            (this.ItsColor = 1))
          : 2 === this.ItsColor &&
            (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("GtoY"),
            (this.ItsColor = 1));
        break;
      case 0:
        2 === this.ItsColor
          ? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("GtoN"),
            (this.ItsColor = 0))
          : 1 === this.ItsColor &&
            (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
            this.UiSequencePlayer.PlayLevelSequenceByName("YtoN"),
            (this.ItsColor = 0));
    }
  }
}
exports.EntityIconItem = EntityIconItem;
//# sourceMappingURL=PhotographEntityPanel.js.map
