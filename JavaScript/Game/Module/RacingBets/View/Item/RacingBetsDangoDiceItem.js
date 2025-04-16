"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoDiceItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoDiceItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.yS1 = void 0),
      (this.UiLevelSequence = void 0),
      (this.SS1 = (e) => {
        this.yS1.Kz_ === e
          ? (this.GetItem(4).SetUIActive(!0),
            this.UiLevelSequence.PlaySequence("Select"))
          : (this.GetItem(4).SetUIActive(!1),
            this.UiLevelSequence.StopPrevSequence(!1, !0));
      }),
      (this.ny1 = () => {
        this.GetItem(4).SetUIActive(!1),
          this.UiLevelSequence.StopPrevSequence(!1, !0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
    ];
  }
  OnBeforeCreateImplement() {
    (this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiLevelSequence);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsDangoRoundStart,
      this.SS1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh,
        this.ny1,
      );
  }
  Refresh(e) {
    this.yS1 = e;
    var t = DangoManager_1.DangoManager.GetDangoData(e.Kz_),
      t =
        (this.SetTextureShowUntilLoaded(
          t.DangoConfig.IconSmall,
          this.GetTexture(3),
        ),
        ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoInfo(e.Kz_)),
      e = t.GetDiceIcon(e.D8n),
      t = t.GetDiceConfig();
    this.GetItem(4).SetUIActive(!1),
      this.SetTextureShowUntilLoaded(e, this.GetTexture(1)),
      this.SetTextureShowUntilLoaded(t.DiceBackgroundIcon, this.GetTexture(0));
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsDangoRoundStart,
      this.SS1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsDangoOrderRefresh,
        this.ny1,
      );
  }
}
exports.RacingBetsDangoDiceItem = RacingBetsDangoDiceItem;
//# sourceMappingURL=RacingBetsDangoDiceItem.js.map
