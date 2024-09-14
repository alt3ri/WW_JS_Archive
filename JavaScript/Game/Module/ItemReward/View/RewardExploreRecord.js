"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreRecord = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ROLLING_DURATION = 2;
class RewardExploreRecord extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.asa = void 0),
      (this.Hea = void 0),
      (this.hsa = (e) => {
        this.Lfi(e.toString());
      }),
      (this.Zna = () => {
        this.asa?.Kill(), (this.asa = void 0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.Zna(), this.n1a();
  }
  Refresh(e) {
    var i = e.TitleTextId,
      t = !StringUtils_1.StringUtils.IsEmpty(i);
    t && this.Ubt(i),
      this.mfi(t),
      this.Dfi(e.IsNewRecord),
      void 0 !== e.RecordRollingTo
        ? this.lsa(e.RecordRollingTo)
        : this.Lfi(e.Record);
  }
  Ubt(e) {
    var i = this.GetText(0);
    StringUtils_1.StringUtils.IsEmpty(e) ||
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
  }
  mfi(e) {
    this.GetText(0).SetUIActive(e);
  }
  Lfi(e) {
    this.GetText(1).SetText(e);
  }
  Dfi(e) {
    this.GetItem(2).SetUIActive(e),
      e &&
        (this.Hea ||
          (this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(
            this.RootItem,
          )),
        this.Hea.PlayLevelSequenceByName("Start"));
  }
  lsa(e) {
    (this.asa = UE.LTweenBPLibrary.IntTo(
      this.RootActor,
      (0, puerts_1.toManualReleaseDelegate)(this.hsa),
      0,
      e,
      ROLLING_DURATION,
      0,
      2,
    )),
      this.asa.OnCompleteCallBack.Bind(this.Zna);
  }
  n1a() {
    this.Hea?.StopCurrentSequence(), (this.Hea = void 0);
  }
}
exports.RewardExploreRecord = RewardExploreRecord;
//# sourceMappingURL=RewardExploreRecord.js.map
