"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.setPrefabText = exports.predefPrefabSetting = void 0);
const UE = require("ue"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConcertoResponseItem_1 = require("../../BattleUi/Views/ConcertoResponseItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
function setPrefabText(e, t) {
  var r = new StringBuilder_1.StringBuilder();
  const o = [];
  let i = [];
  const n = [];
  let a = 0;
  for (let e = 0; e < t.length; ) {
    var s = t.indexOf("[", e);
    if (-1 === s) {
      r.Append(t.substring(e, t.length));
      break;
    }
    r.Append(t.substring(e, s));
    var l = t.indexOf("]", s);
    if (!(s < l)) {
      r.Append(t.substring(s + 1, t.length));
      break;
    }
    s = t.substring(s + 1, l).split(",");
    if (0 < s.length) {
      o.push({ PrefabKey: s[0], Args: s });
      var u = exports.predefPrefabSetting.get(s[0]);
      if (u) {
        var c = u.GetPrefabPathFunc(s);
        n.push(c.length), (i = i.concat(c)), (e = l + 1);
        for (let e = 0; e < c.length; e++)
          r.Append("<snidx="), r.Append(a), r.Append("/>"), a++;
      }
    }
  }
  LguiUtil_1.LguiUtil.LoadAndSetText(e, r.ToString(), i, (i) => {
    let a = 0;
    o.forEach((e, t, r) => {
      var o = exports.predefPrefabSetting.get(e.PrefabKey);
      o?.Callback && o.Callback(i.slice(a, a + n[t]), e.Args), (a += n[t]);
    });
  });
}
(exports.predefPrefabSetting = new Map([
  [
    "FightConcertoStateGuide",
    {
      GetPrefabPathFunc: () => {
        const r = [];
        return (
          ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
            !0,
          ).forEach((e, t) => {
            r.push(
              "/Game/Aki/UI/UIResources/UiFight/Prefabs/FightConcertoState.FightConcertoState",
            );
          }),
          r
        );
      },
      Callback: (o, e) => {
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0).forEach(
          (e, t) => {
            if (t < o.length) {
              const r = new ConcertoResponseItem_1.ConcertoResponseItem();
              r.CreateByActorAsync(o[t]).then(() => {
                r.Refresh(
                  ModelManager_1.ModelManager.BattleUiModel.GetRoleData(e.Id),
                ),
                  o[t]
                    .GetComponentByClass(UE.UIItem.StaticClass())
                    .SetUIActive(!0);
              });
            }
          },
        );
      },
    },
  ],
])),
  (exports.setPrefabText = setPrefabText);
//# sourceMappingURL=GuidePrefabDefine.js.map
