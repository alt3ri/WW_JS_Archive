"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResEndingSubView = void 0);
const UE = require("ue"),
  RogueResEndById_1 = require("../../../../Core/Define/ConfigQuery/RogueResEndById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueEndingCollectionItem_1 = require("./RogueEndingCollectionItem");
class RogueResEndingSubView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.Pn1 = void 0),
      (this.xn1 = 0),
      (this.aR1 = 0),
      (this.Dn1 = []),
      (this.qI1 = new Map()),
      (this.Un1 = new Map()),
      (this.$pt = void 0),
      (this._5e = () => {
        this.CloseMe();
      }),
      (this.N5c = () => {
        var i = this.Dn1.indexOf(this.xn1);
        0 !== i &&
          (1 === i
            ? this.GetButton(1)?.RootUIComp?.SetUIActive(!1)
            : this.GetButton(1)?.RootUIComp?.SetUIActive(!0),
          this.GetButton(2)?.RootUIComp?.SetUIActive(!0),
          (this.xn1 = this.Dn1[i - 1]),
          this.RefreshEnding(),
          this.$pt?.IsPlayingSequence("SwitchRight") &&
            this.$pt?.StopCurrentSequence(),
          this.$pt?.IsPlayingSequence("SwitchLeft")
            ? this.$pt?.ReplaySequenceByKey("SwitchLeft")
            : this.$pt?.PlayLevelSequenceByName("SwitchLeft"));
      }),
      (this.QOe = () => {
        var i = this.Dn1.indexOf(this.xn1);
        i !== this.Dn1.length - 1 &&
          ((i === this.Dn1.length - 2
            ? (this.GetButton(2)?.RootUIComp?.SetUIActive(!1),
              this.GetButton(1))
            : (this.GetButton(1)?.RootUIComp?.SetUIActive(!0),
              this.GetButton(2))
          )?.RootUIComp?.SetUIActive(!0),
          (this.xn1 = this.Dn1[i + 1]),
          this.RefreshEnding(),
          this.$pt?.IsPlayingSequence("SwitchLeft") &&
            this.$pt?.StopCurrentSequence(),
          this.$pt?.IsPlayingSequence("SwitchRight")
            ? this.$pt?.ReplaySequenceByKey("SwitchRight")
            : this.$pt?.PlayLevelSequenceByName("SwitchRight"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.N5c],
        [2, this.QOe],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetHelpBtnActive(!1),
      this.lqe.SetCloseCallBack(this._5e),
      (this.Pn1 = new RogueEndingCollectionItem_1.RogueEndingCollectionItem()),
      await this.Pn1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    this.xn1 = this.OpenParam;
    var i = RogueResEndById_1.configRogueResEndById.GetConfig(this.xn1),
      i =
        ((this.aR1 = i.SeasonId),
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(
          i.SeasonId,
        ));
    for (const t of i)
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(
        t,
      ) && this.Dn1.push(t);
    this.GetText(3)?.SetUIActive(!1),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeShow() {
    var i = this.Dn1.indexOf(this.xn1);
    for (let i = 0; i < this.Dn1.length; i++) {
      var t = this.Dn1[i];
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(
        t,
      ) &&
        !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(
          t,
        ) &&
        this.qI1.set(t, i);
    }
    0 === i && this.GetButton(1)?.RootUIComp?.SetUIActive(!1),
      i === this.Dn1.length - 1 &&
        this.GetButton(2)?.RootUIComp?.SetUIActive(!1),
      this.RefreshEnding();
  }
  OnBeforeDestroy() {
    (this.lqe = void 0),
      (this.Pn1 = void 0),
      (this.$pt = void 0),
      this.Un1.clear();
  }
  RefreshEnding() {
    var i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(
          this.xn1,
        ),
      t =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(
          this.aR1,
        ),
      t =
        (this.Un1.get(this.xn1) ||
          ((t = {
            ConfigId: this.xn1,
            Index: t.indexOf(this.xn1) + 1,
            IsSubView: !0,
            IsUnlock: i,
          }),
          this.Un1.set(this.xn1, t)),
        this.Pn1?.Refresh(this.Un1.get(this.xn1)),
        RogueResEndById_1.configRogueResEndById.GetConfig(this.xn1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Desc),
      i &&
        !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(
          this.xn1,
        ) &&
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheEndingOpen(
          this.xn1,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RogueResEndingSwitch,
        this.xn1,
      ),
      this.BNe();
  }
  BNe() {
    var i = this.xn1;
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(
      i,
    ) &&
      this.qI1.has(i) &&
      this.qI1.delete(i);
    let t = !1,
      e = !1;
    var s = this.Dn1.indexOf(i);
    for (const h of this.qI1) h[1] < s ? (t = !0) : h[1] > s && (e = !0);
    this.GetItem(6)?.SetUIActive(t), this.GetItem(7)?.SetUIActive(e);
  }
}
exports.RogueResEndingSubView = RogueResEndingSubView;
//# sourceMappingURL=RogueEndingCollectionSubView.js.map
