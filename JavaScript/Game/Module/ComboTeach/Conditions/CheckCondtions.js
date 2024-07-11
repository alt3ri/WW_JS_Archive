"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckIsInJumpCondition =
    exports.CheckNotInSkillCondition =
    exports.CheckSkillExitNextAttrCondition =
    exports.CheckSkillIdFailCondition =
    exports.CheckSkillEnterNextAttrCondition =
    exports.CheckTagNotHaveCondition =
    exports.CheckBuffNotHaveCondition =
    exports.CheckTagAddCondition =
    exports.CheckBuffAddCondition =
    exports.CheckIsJumpCondition =
    exports.CheckEnergyCondition =
    exports.CheckSkillHitSuccessCondition =
    exports.CheckSkillIdSuccessCondition =
    exports.BaseCheckCondition =
      void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const energyAttrIds = [
  EAttributeId.Proto_Energy,
  EAttributeId.Proto_SpecialEnergy1,
  EAttributeId.Proto_SpecialEnergy2,
  EAttributeId.Proto_SpecialEnergy3,
  EAttributeId.Proto_SpecialEnergy4,
];
class BaseCheckCondition {
  constructor(t, e) {
    (this.ParamsArray = void 0),
      (this.OriginString = ""),
      (this.Type = 0),
      (this.OriginString = t) &&
        (this.ParamsArray = e ? t.slice(1, -1).split(",") : t.split("#"));
  }
  Check(t) {
    return !1;
  }
}
class CheckSkillIdSuccessCondition extends (exports.BaseCheckCondition =
  BaseCheckCondition) {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    return (
      !!this.ParamsArray &&
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId ===
        Number(this.ParamsArray[0]) &&
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillTime >=
        1e3 * Number(this.ParamsArray[1]) &&
      !ModelManager_1.ModelManager.ComboTeachingModel.IsEmit
    );
  }
}
exports.CheckSkillIdSuccessCondition = CheckSkillIdSuccessCondition;
class CheckSkillHitSuccessCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 0);
  }
  Check(t) {
    return (
      !!this.ParamsArray &&
      ModelManager_1.ModelManager.ComboTeachingModel.HitSkillId ===
        Number(this.ParamsArray[0])
    );
  }
}
exports.CheckSkillHitSuccessCondition = CheckSkillHitSuccessCondition;
class CheckEnergyCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    let e;
    return (
      !!this.ParamsArray &&
      ((e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      (e = EntitySystem_1.EntitySystem.Get(e)
        ?.GetComponent(156)
        .GetCurrentValue(energyAttrIds[Number(this.ParamsArray[0])])) >=
        Number(this.ParamsArray[1])) &&
      e <= Number(this.ParamsArray[2])
    );
  }
}
exports.CheckEnergyCondition = CheckEnergyCondition;
class CheckIsJumpCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    const e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    return EntitySystem_1.EntitySystem.Get(e)?.GetComponent(161)?.IsJump ?? !1;
  }
}
exports.CheckIsJumpCondition = CheckIsJumpCondition;
class CheckBuffAddCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    let e;
    return (
      !!this.ParamsArray &&
      ((e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      !!EntitySystem_1.EntitySystem.Get(e)
        ?.GetComponent(157)
        ?.GetBuffTotalStackById(BigInt(this.ParamsArray[0])))
    );
  }
}
exports.CheckBuffAddCondition = CheckBuffAddCondition;
class CheckTagAddCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    let e, o;
    return (
      !!this.ParamsArray &&
      ((e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      (e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(185)),
      (o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
        this.ParamsArray[0],
      )),
      !!e?.HasTag(o))
    );
  }
}
exports.CheckTagAddCondition = CheckTagAddCondition;
class CheckBuffNotHaveCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    let e;
    return (
      !!this.ParamsArray &&
      ((e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      !EntitySystem_1.EntitySystem.Get(e)
        ?.GetComponent(157)
        ?.GetBuffTotalStackById(BigInt(this.ParamsArray[0])))
    );
  }
}
exports.CheckBuffNotHaveCondition = CheckBuffNotHaveCondition;
class CheckTagNotHaveCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    let e;
    return (
      !!this.ParamsArray &&
      ((e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint()),
      !EntitySystem_1.EntitySystem.Get(e)
        ?.GetComponent(185)
        ?.HasTag(
          GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            this.ParamsArray[0],
          ),
        ))
    );
  }
}
exports.CheckTagNotHaveCondition = CheckTagNotHaveCondition;
class CheckSkillEnterNextAttrCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    return (
      !!this.ParamsArray &&
      !(
        ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId !==
          Number(this.ParamsArray[0]) ||
        !ModelManager_1.ModelManager.ComboTeachingModel.NextAttr ||
        ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr
      )
    );
  }
}
exports.CheckSkillEnterNextAttrCondition = CheckSkillEnterNextAttrCondition;
class CheckSkillIdFailCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 0);
  }
  Check(t) {
    return (
      !!this.ParamsArray &&
      !this.OriginString.includes(
        ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId.toString(),
      ) &&
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId !== 0
    );
  }
}
exports.CheckSkillIdFailCondition = CheckSkillIdFailCondition;
class CheckSkillExitNextAttrCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    return !(
      ModelManager_1.ModelManager.ComboTeachingModel.UseSkillId !==
        ModelManager_1.ModelManager.ComboTeachingModel.NextAttrSkillId ||
      ModelManager_1.ModelManager.ComboTeachingModel.NextAttr ||
      !ModelManager_1.ModelManager.ComboTeachingModel.PreNextAttr
    );
  }
}
exports.CheckSkillExitNextAttrCondition = CheckSkillExitNextAttrCondition;
class CheckNotInSkillCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    const e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    return !EntitySystem_1.EntitySystem.Get(e)
      ?.GetComponent(185)
      ?.HasTag(-1371021686);
  }
}
exports.CheckNotInSkillCondition = CheckNotInSkillCondition;
class CheckIsInJumpCondition extends BaseCheckCondition {
  constructor() {
    super(...arguments), (this.Type = 1);
  }
  Check(t) {
    var e = Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
    var e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(185);
    const o = ModelManager_1.ModelManager.ComboTeachingModel.BeforeJumpTime > 0;
    var e = e?.HasTag(-1898186757);
    return !o && (e ?? !1);
  }
}
exports.CheckIsInJumpCondition = CheckIsInJumpCondition;
// # sourceMappingURL=CheckCondtions.js.map
