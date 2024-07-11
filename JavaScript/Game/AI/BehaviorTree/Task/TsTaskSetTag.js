"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSetTag extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.GameplayTag = void 0),
      (this.ActorTag = ""),
      (this.TargetKey = ""),
      (this.IsCommonTag = !1),
      (this.IsAdd = !0),
      (this.SetToPlayer = !1),
      (this.IsInitTsVariables = !1),
      (this.TsGameplayTag = void 0),
      (this.TsActorTag = void 0),
      (this.TsTargetKey = ""),
      (this.TsIsCommonTag = !1),
      (this.TsIsAdd = !1),
      (this.TsSetToPlayer = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsGameplayTag = this.GameplayTag),
      (this.TsActorTag = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActorTag)),
      (this.TsTargetKey = this.TargetKey),
      (this.TsIsCommonTag = this.IsCommonTag),
      (this.TsIsAdd = this.IsAdd),
      (this.TsSetToPlayer = this.SetToPlayer));
  }
  ReceiveTickAI(t, s, i) {
    var e = t.AiController;
    if (e)
      if ((this.InitTsVariables(), this.TsGameplayTag || this.TsActorTag)) {
        let h;
        var e = e.CharActorComp;
        if (e?.Valid) {
          let s = e.Entity;
          if (this.TsSetToPlayer)
            s = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
          else if (this.TsTargetKey) {
            let t =
              BlackboardController_1.BlackboardController.GetIntValueByWorld(
                this.TsTargetKey,
              );
            (t =
              t ||
              BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                e.Entity.Id,
                this.TsTargetKey,
              )),
              (s = t ? EntitySystem_1.EntitySystem.Get(t) : void 0);
          }
          s
            ? (this.TsGameplayTag
                ? this.SetGameplayTag(s)
                : (e = s?.GetComponent(1)) &&
                  ((h = (e = e.Owner.Tags).FindIndex(this.TsActorTag)),
                  this.TsIsAdd && h < 0
                    ? e.Add(this.TsActorTag)
                    : h > -1 && e.RemoveAt(h)),
              this.FinishExecute(!0))
            : this.FinishExecute(!1);
        } else this.FinishExecute(!1);
      } else this.FinishExecute(!1);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  SetGameplayTag(t) {
    this.TsIsCommonTag &&
      (s = t.GetComponent(177)) &&
      ((i = this.TsGameplayTag.TagId),
      (e = s.HasTag(i)),
      this.TsIsAdd && !e ? s.AddTag(i) : !this.TsIsAdd && e && s.RemoveTag(i));
    let s;
    let i;
    var e = t.GetComponent(185);
    e &&
      ((s = this.TsGameplayTag.TagId),
      (i = e.HasTag(s)),
      this.TsIsAdd && !i ? e.AddTag(s) : !this.TsIsAdd && i && e.RemoveTag(s));
  }
}
exports.default = TsTaskSetTag;
// # sourceMappingURL=TsTaskSetTag.js.map
