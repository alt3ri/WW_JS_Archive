"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaTags = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  FormationDataController_1 = require("../Abilities/FormationDataController");
class AreaTags {
  constructor() {
    (this.nye = () => {
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.ChangeArea,
        this.Hje,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeArea,
          this.Hje,
        ),
        ModelManager_1.ModelManager.AreaModel?.AreaInfo &&
          this.Hje(
            void 0,
            ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId,
          );
    }),
      (this.uMe = () => {
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.ChangeArea,
          this.Hje,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.ChangeArea,
            this.Hje,
          ),
          ModelManager_1.ModelManager.AreaModel?.AreaInfo &&
            this.Hje(
              ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId,
              void 0,
            );
      }),
      (this.zYe = () => {
        ModelManager_1.ModelManager.AreaModel?.AreaInfo &&
          this.Hje(
            void 0,
            ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId,
          );
      }),
      (this.Hje = (e, t) => {
        var n = new Map();
        let r = t ?? 0;
        for (var a = new Set(); 0 !== r; ) {
          a.add(r);
          var o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
          if (o?.EnterAreaTags?.size)
            for (var [i, s] of o.EnterAreaTags) n.has(i) || n.set(i, s);
          r = o?.Father ?? 0;
        }
        for (r = e ?? 0; 0 !== r && !a.has(r); ) {
          var _ = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
          if (_?.LeaveAreaTags?.size)
            for (var [v, l] of _.LeaveAreaTags) n.has(v) || n.set(v, l);
          r = _?.Father ?? 0;
        }
        this.E3l(n);
      });
  }
  Init() {
    this.dde();
  }
  Destroy() {
    this.Cde();
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.zYe,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.zYe,
      );
  }
  E3l(e) {
    var t,
      n,
      r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      a = FormationDataController_1.FormationDataController.IsPlayerExist(r);
    for ([t, n] of e)
      0 === n
        ? a &&
          FormationDataController_1.FormationDataController.HasPlayerTag(
            r,
            t,
          ) &&
          FormationDataController_1.FormationDataController.RemovePlayerTag(
            r,
            t,
          )
        : 1 === n &&
          a &&
          !FormationDataController_1.FormationDataController.HasPlayerTag(
            r,
            t,
          ) &&
          FormationDataController_1.FormationDataController.AddPlayerTag(r, t);
  }
}
exports.AreaTags = AreaTags;
//# sourceMappingURL=AreaTags.js.map
