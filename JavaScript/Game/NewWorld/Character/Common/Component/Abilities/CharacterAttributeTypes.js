"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.attrsAutoRecoverMaxMap =
    exports.attrsAutoRecoverSpeedMap =
    exports.attrsCurrentValueClamp =
    exports.attrsBaseValueClampMax =
    exports.attrsNotClampZero =
    exports.specialEnergyIds =
    exports.attributeIdsWithMax =
    exports.stateAttributeIds =
    exports.DIVIDED_TEN_THOUSAND =
    exports.PER_TEN_THOUSAND =
    exports.ATTRIBUTE_ID_MAX =
    exports.EAttributeId =
      void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
(exports.EAttributeId = EAttributeId),
  (exports.ATTRIBUTE_ID_MAX = Protocol_1.Aki.Protocol.Bks.EAttributeType_MAX),
  (exports.PER_TEN_THOUSAND = 1e4),
  (exports.DIVIDED_TEN_THOUSAND = 1e-4),
  (exports.stateAttributeIds = new Set([
    EAttributeId.Proto_Life,
    EAttributeId.Proto_Sheild,
    EAttributeId.Proto_Strength,
    EAttributeId.Proto_Tough,
    EAttributeId.Proto_Rage,
    EAttributeId.Proto_Hardness,
    EAttributeId.Proto_Energy,
    EAttributeId.Proto_SpecialEnergy1,
    EAttributeId.Proto_SpecialEnergy2,
    EAttributeId.Proto_SpecialEnergy3,
    EAttributeId.Proto_SpecialEnergy4,
    EAttributeId.Proto_StatusBuildUp1,
    EAttributeId.Proto_StatusBuildUp2,
    EAttributeId.Proto_StatusBuildUp3,
    EAttributeId.Proto_StatusBuildUp4,
    EAttributeId.Proto_StatusBuildUp5,
    EAttributeId.Proto_ElementEnergy,
  ])),
  (exports.attributeIdsWithMax = new Map([
    [EAttributeId.Proto_Life, EAttributeId.e5n],
    [EAttributeId.Proto_Strength, EAttributeId.Proto_StrengthMax],
    [EAttributeId.Proto_Tough, EAttributeId.Proto_ToughMax],
    [EAttributeId.Proto_Rage, EAttributeId.Proto_RageMax],
    [EAttributeId.Proto_Hardness, EAttributeId.Proto_HardnessMax],
    [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax],
    [EAttributeId.Proto_SpecialEnergy1, EAttributeId.Proto_SpecialEnergy1Max],
    [EAttributeId.Proto_SpecialEnergy2, EAttributeId.Proto_SpecialEnergy2Max],
    [EAttributeId.Proto_SpecialEnergy3, EAttributeId.Proto_SpecialEnergy3Max],
    [EAttributeId.Proto_SpecialEnergy4, EAttributeId.Proto_SpecialEnergy4Max],
    [EAttributeId.Proto_StatusBuildUp1, EAttributeId.Proto_StatusBuildUp1Max],
    [EAttributeId.Proto_StatusBuildUp2, EAttributeId.Proto_StatusBuildUp2Max],
    [EAttributeId.Proto_StatusBuildUp3, EAttributeId.Proto_StatusBuildUp3Max],
    [EAttributeId.Proto_StatusBuildUp4, EAttributeId.Proto_StatusBuildUp4Max],
    [EAttributeId.Proto_StatusBuildUp5, EAttributeId.Proto_StatusBuildUp5Max],
    [EAttributeId.Proto_ElementEnergy, EAttributeId.Proto_ElementEnergyMax],
  ])),
  (exports.specialEnergyIds = [
    EAttributeId.Proto_SpecialEnergy1,
    EAttributeId.Proto_SpecialEnergy2,
    EAttributeId.Proto_SpecialEnergy3,
    EAttributeId.Proto_SpecialEnergy4,
  ]),
  (exports.attrsNotClampZero = [
    EAttributeId.Proto_Crit,
    EAttributeId.Proto_DamageReduce,
    EAttributeId.Proto_DamageReducePhys,
    EAttributeId.Proto_DamageReduceElement1,
    EAttributeId.Proto_DamageReduceElement2,
    EAttributeId.Proto_DamageReduceElement3,
    EAttributeId.Proto_DamageReduceElement4,
    EAttributeId.Proto_DamageReduceElement5,
    EAttributeId.Proto_DamageReduceElement6,
    EAttributeId.Proto_DamageResistancePhys,
    EAttributeId.Proto_DamageResistanceElement1,
    EAttributeId.Proto_DamageResistanceElement2,
    EAttributeId.Proto_DamageResistanceElement3,
    EAttributeId.Proto_DamageResistanceElement4,
    EAttributeId.Proto_DamageResistanceElement5,
    EAttributeId.Proto_DamageResistanceElement6,
    EAttributeId.Proto_ParalysisTimeRecover,
  ]),
  (exports.attrsBaseValueClampMax = new Map([
    [EAttributeId.Proto_Life, EAttributeId.e5n],
    [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax],
    [EAttributeId.Proto_SpecialEnergy1, EAttributeId.Proto_SpecialEnergy1Max],
    [EAttributeId.Proto_SpecialEnergy2, EAttributeId.Proto_SpecialEnergy2Max],
    [EAttributeId.Proto_SpecialEnergy3, EAttributeId.Proto_SpecialEnergy3Max],
    [EAttributeId.Proto_SpecialEnergy4, EAttributeId.Proto_SpecialEnergy4Max],
    [EAttributeId.Proto_Strength, EAttributeId.Proto_StrengthMax],
    [EAttributeId.Proto_Rage, EAttributeId.Proto_RageMax],
    [EAttributeId.Proto_Hardness, EAttributeId.Proto_HardnessMax],
    [EAttributeId.Proto_Tough, EAttributeId.Proto_ToughMax],
    [EAttributeId.Proto_StatusBuildUp1, EAttributeId.Proto_StatusBuildUp1Max],
    [EAttributeId.Proto_StatusBuildUp2, EAttributeId.Proto_StatusBuildUp2Max],
    [EAttributeId.Proto_StatusBuildUp3, EAttributeId.Proto_StatusBuildUp3Max],
    [EAttributeId.Proto_StatusBuildUp4, EAttributeId.Proto_StatusBuildUp4Max],
    [EAttributeId.Proto_StatusBuildUp5, EAttributeId.Proto_StatusBuildUp5Max],
    [EAttributeId.Proto_ElementEnergy, EAttributeId.Proto_ElementEnergyMax],
  ]));
const ATTACK_SPEED_MAX = 2e4,
  REDUCE_MAX = 1e4;
(exports.attrsCurrentValueClamp = new Map([
  [EAttributeId.Proto_AutoAttackSpeed, ATTACK_SPEED_MAX],
  [EAttributeId.Proto_CastAttackSpeed, ATTACK_SPEED_MAX],
  [EAttributeId.Proto_DamageReduce, REDUCE_MAX],
  [EAttributeId.Proto_DamageReducePhys, REDUCE_MAX],
  [EAttributeId.Proto_DamageReduceElement1, REDUCE_MAX],
  [EAttributeId.Proto_DamageReduceElement2, REDUCE_MAX],
  [EAttributeId.Proto_DamageReduceElement3, REDUCE_MAX],
  [EAttributeId.Proto_DamageReduceElement4, REDUCE_MAX],
  [EAttributeId.Proto_DamageReduceElement5, REDUCE_MAX],
  [EAttributeId.Proto_DamageReduceElement6, REDUCE_MAX],
])),
  (exports.attrsAutoRecoverSpeedMap = new Map([
    [EAttributeId.Proto_Hardness, EAttributeId.Proto_HardnessRecover],
    [EAttributeId.Proto_Rage, EAttributeId.Proto_RageRecover],
    [EAttributeId.Proto_Tough, EAttributeId.Proto_ToughRecover],
    [EAttributeId.Proto_ParalysisTime, EAttributeId.Proto_ParalysisTimeRecover],
  ])),
  (exports.attrsAutoRecoverMaxMap = new Map([
    [EAttributeId.Proto_Hardness, EAttributeId.Proto_HardnessMax],
    [EAttributeId.Proto_Rage, EAttributeId.Proto_RageMax],
    [EAttributeId.Proto_Tough, EAttributeId.Proto_ToughMax],
    [EAttributeId.Proto_ParalysisTime, EAttributeId.Proto_ParalysisTimeMax],
  ]));
//# sourceMappingURL=CharacterAttributeTypes.js.map
