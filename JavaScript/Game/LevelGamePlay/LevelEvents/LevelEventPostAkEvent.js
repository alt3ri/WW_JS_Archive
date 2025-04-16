"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPostAkEvent = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GameAudioController_1 = require("../../Module/Audio/GameAudioController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPostAkEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      var t, n;
      if (e.EventConfig.Type === IAction_1.EPostAkEvent.Global) {
        const i = (0, AudioSystem_1.parseAudioEventPath)(e.EventConfig.AkEvent);
        if (
          ModelManager_1.ModelManager.MapModel.CurrentInWorld ||
          e.PersistWhenExitDungeon
        )
          AudioSystem_1.AudioSystem.PostEvent(i);
        else {
          const r = AudioSystem_1.AudioSystem.PostEvent(i, void 0, {
            CallbackHandler: (e, o) => {
              GameAudioController_1.GameAudioController.RemovePostAkEventHandle(
                r,
              ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Audio",
                    42,
                    "[PostAkEventAudio] 全局音频事件Handle移除记录",
                    ["Handle", r],
                    ["Event", i],
                  );
            },
            CallbackMask: 1,
          });
          ModelManager_1.ModelManager.MapModel.CurrentInWorld ||
            (GameAudioController_1.GameAudioController.AddPostAkEventHandle(r),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Audio",
                42,
                "[PostAkEventAudio] 全局音频事件Handle添加记录",
                ["Handle", r],
                ["Event", i],
              ));
        }
        void (
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 56, "[Game.Action] PostEvent", ["Event", i])
        );
      } else
        e.EventConfig.Type === IAction_1.EPostAkEvent.Target &&
          ((t = e.EventConfig.EntityId),
          (n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
            ? (n = n.Entity.GetComponent(1)?.Owner)?.IsValid()
              ? ((e = (0, AudioSystem_1.parseAudioEventPath)(
                  e.EventConfig.AkEvent,
                )),
                AudioSystem_1.AudioSystem.PostEvent(e, n),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Audio",
                    56,
                    "[Game.Action] PostEvent",
                    ["Event", e],
                    ["Actor", n],
                  ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Event",
                  33,
                  "未能获取到该实体对应的有效Actor",
                  ["entityId", t],
                )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 33, "实体不存在", ["entityId", t]));
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("Event", 33, "参数配置错误");
  }
}
exports.LevelEventPostAkEvent = LevelEventPostAkEvent;
//# sourceMappingURL=LevelEventPostAkEvent.js.map
