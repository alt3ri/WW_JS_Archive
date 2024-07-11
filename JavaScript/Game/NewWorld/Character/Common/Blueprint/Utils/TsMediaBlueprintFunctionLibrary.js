"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem");
class TsMediaBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static GetAffectedByP1orP3(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    return !t || t.IsP1;
  }
  static PostAkEventByTs(t, e, i, n, s, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    t && ((s = (0, puerts_1.$unref)(s)), t.PostAkEvent(e, i, n, s, r));
  }
  static PostAkEventByTsWithoutData(t, e, i, n, s, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    return t ? t.PostAkEvent(e, i, n, (0, puerts_1.$unref)(s), r) : -1;
  }
  static SetDebug(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    t && t.SetDebug(e);
  }
  static GetAkComponentBySocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    if (t)
      return t.GetAkComponentBySocketName(
        FNameUtil_1.FNameUtil.GetDynamicFName(e),
      );
  }
  static SetFootSwitch(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    t && (t.FootSwitch = e);
  }
  static GetFootSwitch(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    return t ? t.FootSwitch : "";
  }
  static GetWaterDepth(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 41);
    return t ? t.WaterDepth : 0;
  }
  static PostRoleAudioEvent(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 41)?.PostAudioEvent(e);
  }
  static EmitFootOnTheGroundEvent() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
    );
  }
}
exports.default = TsMediaBlueprintFunctionLibrary;
//# sourceMappingURL=TsMediaBlueprintFunctionLibrary.js.map
