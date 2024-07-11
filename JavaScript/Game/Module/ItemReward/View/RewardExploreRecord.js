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
      (this.Tra = void 0),
      (this.kzs = void 0),
      (this.Lra = (e) => {
        this.Lfi(e.toString());
      }),
      (this.fra = () => {
        this.Tra?.Kill(), (this.Tra = void 0);
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
    super.OnBeforeDestroy(), this.fra(), this.oaa();
  }
  Refresh(e) {
    var i = e.TitleTextId,
      t = !StringUtils_1.StringUtils.IsEmpty(i);
    t && this.Ubt(i),
      this.mfi(t),
      this.Dfi(e.IsNewRecord),
      void 0 !== e.RecordRollingTo
        ? this.Dra(e.RecordRollingTo)
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
        (this.kzs ||
          (this.kzs = new LevelSequencePlayer_1.LevelSequencePlayer(
            this.RootItem,
          )),
        this.kzs.PlayLevelSequenceByName("Start"));
  }
  Dra(e) {
    (this.Tra = UE.LTweenBPLibrary.IntTo(
      this.RootActor,
      (0, puerts_1.toManualReleaseDelegate)(this.Lra),
      0,
      e,
      ROLLING_DURATION,
      0,
      2,
    )),
      this.Tra.OnCompleteCallBack.Bind(this.fra);
  }
  oaa() {
    this.kzs?.StopCurrentSequence(), (this.kzs = void 0);
  }
}
exports.RewardExploreRecord = RewardExploreRecord;
//# sourceMappingURL=RewardExploreRecord.js.map
