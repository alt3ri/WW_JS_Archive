"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckJigsawInfo = void 0);
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckJigsawInfo extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    if (!e) return !1;
    var r = e;
    let a = !1;
    switch (r.JigsawCondition.Type) {
      case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemPlaceIndex:
        a = this._ra(r.JigsawCondition);
        break;
      case ICondition_1.ECheckJigsawInfoType.CheckJigsawItemMove:
        a = this.ura(r.JigsawCondition);
    }
    return "Eq" === r.JigsawCondition.Compare ? a : !a;
  }
  _ra(e) {
    var r,
      a = e.FoundationEntityId,
      a =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          a,
        )?.Entity?.GetComponent(124);
    return (
      !!a &&
      ((r = e.ItemEntityId),
      !!(r =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          r,
        )?.Entity?.GetComponent(125))) &&
      !!a.GetAllItemOnBase().includes(r) &&
      ((a = a.GetPutItemIndex(r)),
      (r = e.PlaceIndex),
      a.Col === r.ColumnIndex) &&
      a.Row === r.RowIndex
    );
  }
  ura(e) {
    var e = e.ItemEntityId,
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    return (
      !!e?.Entity?.GetComponent(142) &&
      !!(e = e?.Entity?.GetComponent(116)) &&
      e.IsMoving
    );
  }
}
exports.LevelConditionCheckJigsawInfo = LevelConditionCheckJigsawInfo;
//# sourceMappingURL=LevelConditionsCheckJigsawInfo.js.map
