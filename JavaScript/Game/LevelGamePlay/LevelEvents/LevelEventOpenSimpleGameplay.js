"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenSimpleGameplay = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
  UiManager_1 = require("../../Ui/UiManager"),
  FishingQteController_1 = require("../FishingQte/FishingQteController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralNetworks_1 = require("../LevelGeneralNetworks"),
  SignalDeviceController_1 = require("../SignalDeviceControl/SignalDeviceController");
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
    var t = e;
    if (t) {
      var r = i;
      if (r)
        switch (t.GameplayConfig.Type) {
          case "Cipher":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "CipherView",
            ),
              this.jDe(t.GameplayConfig.CipherId);
            break;
          case "SignalBreak":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "SignalDecodeView",
            ),
              UiManager_1.UiManager.OpenView(
                "SignalDecodeView",
                t.GameplayConfig.SignalBreakId,
              );
            break;
          case "SundialPuzzle":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "SundialControlView",
            ),
              UiManager_1.UiManager.OpenView("SundialControlView");
            break;
          case "SignalDevice":
            this.VDe = t.FinishSendSelfEvent;
            var n = EntitySystem_1.EntitySystem.Get(r.EntityId);
            (this.E0 = n.GetComponent(0).GetCreatureDataId()),
              TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
                "SignalDeviceView",
              ),
              SignalDeviceController_1.SignalDeviceController.OpenGameplay(
                t.GameplayConfig.Config,
                this.HDe,
              );
            break;
          case "SignalDevice2":
            this.VDe = t.FinishSendSelfEvent;
            n = EntitySystem_1.EntitySystem.Get(r.EntityId);
            (this.E0 = n.GetComponent(0).GetCreatureDataId()),
              TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
                "SignalDeviceChasingMoonView",
              ),
              SignalDeviceController_1.SignalDeviceController.OpenGameplayChasingMoon(
                t.GameplayConfig.Config,
                this.HDe,
              );
            break;
          case "MorseCode":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "SignalDecodeView",
            ),
              ControllerHolder_1.ControllerHolder.SignalDecodeController.Open(
                t.GameplayConfig.MorseCodeId,
              );
            break;
          case "RenjuChess":
            ControllerHolder_1.ControllerHolder.LevelPickInteractController.EnterPickInteractModel(
              t.GameplayConfig,
            );
            break;
          case "LifePoint":
            var n = {
                Config: t.GameplayConfig,
                EntityId: r.EntityId,
                Callback: this.HDe,
              },
              o =
                ((this.VDe = t.FinishSendSelfEvent),
                EntitySystem_1.EntitySystem.Get(r.EntityId));
            (this.E0 = o.GetComponent(0).GetCreatureDataId()),
              TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
                "LifePointView",
              ),
              UiManager_1.UiManager.OpenView("LifePointView", n);
            break;
          case "BrokenRock":
            6 !== i.Type
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Event",
                  29,
                  "大个布偶坚固岩石玩法开启失败：只能由行为中打开",
                )
              : ((this.VDe = t.FinishSendSelfEvent),
                TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
                  "BigStuffedDollView",
                ),
                ControllerHolder_1.ControllerHolder.BigStuffedDollController.Open(
                  t.GameplayConfig.Id,
                  i.TreeConfigId,
                  this.HDe,
                ));
            break;
          case "FishingRoulette":
            this.VDe = t.FinishSendSelfEvent;
            o = EntitySystem_1.EntitySystem.Get(r.EntityId);
            (this.E0 = o.GetComponent(0).GetCreatureDataId()),
              FishingQteController_1.FishingQteController.OpenGameplay(
                o,
                (e) => {
                  e &&
                    TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
                      "FishingQteView",
                    );
                },
              );
            break;
          case "DaolingAuthentication":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
              "LiuLiDaoLingView",
            ),
              UiManager_1.UiManager.OpenView("LiuLiDaoLingView");
        }
      else
        Log_1.Log.CheckError() && Log_1.Log.Error("Event", 29, "上下文不合法");
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Event", 29, "参数不合法");
  }
  jDe(e) {
    ControllerHolder_1.ControllerHolder.CipherController.OpenCipherView(e);
  }
}
exports.LevelEventOpenSimpleGameplay = LevelEventOpenSimpleGameplay;
//# sourceMappingURL=LevelEventOpenSimpleGameplay.js.map
