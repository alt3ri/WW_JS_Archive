"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenSimpleGameplay = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const SignalDecodeController_1 = require("../../Module/SignalDecode/SignalDecodeController");
const UiManager_1 = require("../../Ui/UiManager");
const CipherController_1 = require("../Cipher/CipherController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
const SignalDeviceController_1 = require("../SignalDeviceControl/SignalDeviceController");
class LevelEventOpenSimpleGameplay extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.VDe = void 0),
      (this.E0 = -1),
      (this.HDe = () => {
        this.VDe &&
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
            this.E0,
            this.VDe,
          );
      });
  }
  ExecuteNew(e, i) {
    const r = e;
    if (r) {
      const t = i;
      if (t)
        switch (r.GameplayConfig.Type) {
          case "Cipher":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "CipherView",
            ),
              this.jDe(r.GameplayConfig.CipherId);
            break;
          case "SignalBreak":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "SignalDecodeView",
            ),
              UiManager_1.UiManager.OpenView(
                "SignalDecodeView",
                r.GameplayConfig.SignalBreakId,
              );
            break;
          case "SundialPuzzle":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "SundialControlView",
            ),
              UiManager_1.UiManager.OpenView("SundialControlView");
            break;
          case "SignalDevice":
            this.VDe = r.FinishSendSelfEvent;
            var l = EntitySystem_1.EntitySystem.Get(t.EntityId);
            (this.E0 = l.GetComponent(0).GetCreatureDataId()),
              TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
                "SignalDeviceView",
              ),
              SignalDeviceController_1.SignalDeviceController.OpenGameplay(
                r.GameplayConfig.Config,
                this.HDe,
              );
            break;
          case "MorseCode":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "SignalDecodeView",
            ),
              SignalDecodeController_1.SignalDecodeController.Open(
                r.GameplayConfig.MorseCodeId,
              );
        }
      else
        Log_1.Log.CheckError() && Log_1.Log.Error("Event", 30, "上下文不合法");
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Event", 30, "参数不合法");
  }
  jDe(e) {
    CipherController_1.CipherController.OpenCipherView(e);
  }
}
exports.LevelEventOpenSimpleGameplay = LevelEventOpenSimpleGameplay;
// # sourceMappingURL=LevelEventOpenSimpleGameplay.js.map
