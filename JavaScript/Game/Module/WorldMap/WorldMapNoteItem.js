"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapNoteItem = void 0);
const UE = require("ue"),
  MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine");
class WorldMapNoteItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.MCt = 0),
      (this.NTt = void 0),
      (this.Cxo = void 0),
      (this.eTt = () => {
        this.NTt(this.MCt);
      }),
      e.SetUIActive(!0),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.eTt]]);
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.Cxo?.Clear(), (this.Cxo = void 0);
  }
  UpdateNoteItem(e, t, s) {
    var i = this.GetSprite(0),
      e = MapNoteById_1.configMapNoteById.GetConfig(e),
      i = (this.SetSpriteByPath(e.Icon, i, !0), this.GetText(1)),
      r = e.Desc,
      i = (i.ShowTextNew(r), e.Style);
    this.GetItem(3).SetUIActive(0 === i),
      this.GetItem(6).SetUIActive(0 === i),
      this.GetItem(4).SetUIActive(1 === i),
      this.GetItem(5).SetUIActive(1 === i),
      (this.MCt = s),
      (this.NTt = t);
  }
  PlayStartToPause() {
    this.Cxo ||
      (this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Cxo.PlayLevelSequenceByName("Start"),
      this.Cxo.PauseSequence(),
      this.RootItem?.SetUIActive(!1);
  }
  async ResumeSequence(e) {
    this.Cxo &&
      (0 < e &&
        (await TimerSystem_1.TimerSystem.Wait(
          ExploreProgressDefine_1.RECOMMEND_PLAY_DELAY_TIME * e,
        )),
      this.RootItem?.SetUIActive(!0),
      this.Cxo?.ResumeSequence());
  }
}
exports.WorldMapNoteItem = WorldMapNoteItem;
//# sourceMappingURL=WorldMapNoteItem.js.map
