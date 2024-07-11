"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CountDownFloatTips = void 0);
const UE = require("ue"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase"),
  ONE_HUNDRED = 100;
class CountDownFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  constructor() {
    super(...arguments),
      (this.uJt = -0),
      (this.cJt = ""),
      (this.mJt = ""),
      (this.dJt = ""),
      (this.Oct = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.PYt = (e, t) => {
        void 0 === (this.uJt = e) || e <= 0
          ? (this.GetUiNiagara(2).SetUIActive(!1),
            this.GetUiNiagara(3).SetUIActive(!1),
            t && this.SetExtraText((t = "00"), t, t),
            (ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
              !0),
            this.CloseMe((e) => {
              e &&
                (ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing =
                  !1);
            }))
          : (this.GetUiNiagara(2).SetUIActive(e <= 10),
            this.GetUiNiagara(3).SetUIActive(10 < e),
            (t = Math.floor(
              (e % TimeUtil_1.TimeUtil.Hour) / TimeUtil_1.TimeUtil.Minute,
            )),
            (this.mJt = (t < 10 ? "0" : "") + t),
            (t = Math.floor(e % TimeUtil_1.TimeUtil.Minute)),
            (this.dJt = (t < 10 ? "0" : "") + t),
            (t = Math.floor((e - Math.floor(e)) * ONE_HUNDRED)),
            (this.cJt = (t < 10 ? "0" : "") + t));
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, UE.UINiagara]),
      this.ComponentRegisterInfos.push([3, UE.UINiagara]),
      (this.Oct = UE.Color.FromHex("FFFFFFFF"));
  }
  OnStart() {
    super.OnStart(),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnAddEventListener() {
    super.OnAddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGamePlayCdChanged,
        this.PYt,
      );
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGamePlayCdChanged,
        this.PYt,
      );
  }
  OnTick(e) {
    this.mJt &&
      this.dJt &&
      this.cJt &&
      (this.uJt <= 10
        ? "Loop" !== this.LevelSequencePlayer.GetCurrentSequence() &&
          this.LevelSequencePlayer.PlayLevelSequenceByName("Loop")
        : ("Loop" === this.LevelSequencePlayer.GetCurrentSequence() &&
            this.LevelSequencePlayer.StopCurrentSequence(),
          this.MainText.SetColor(this.Oct),
          this.ExtraText.SetColor(this.Oct),
          this.MainText.SetUIItemScale(Vector_1.Vector.OneVector),
          this.ExtraText.SetUIItemScale(Vector_1.Vector.OneVector)),
      0 === this.uJt && (this.cJt = "00"),
      this.SetExtraText(this.mJt, this.dJt, this.cJt));
  }
}
exports.CountDownFloatTips = CountDownFloatTips;
//# sourceMappingURL=CountDownFloatTips.js.map
