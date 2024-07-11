"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.setPrefabText = exports.predefPrefabSetting = void 0);
const UE = require("ue");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConcertoResponseItem_1 = require("../../BattleUi/Views/ConcertoResponseItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
function setPrefabText(e, t) {
  const r = new StringBuilder_1.StringBuilder();
  const o = [];
  let i = [];
  const n = [];
  let a = 0;
  for (let e = 0; e < t.length; ) {
    let s = t.indexOf("[", e);
    if (s === -1) {
      r.Append(t.substring(e, t.length));
      break;
    }
    r.Append(t.substring(e, s));
    const l = t.indexOf("]", s);
    if (!(s < l)) {
      r.Append(t.substring(s + 1, t.length));
      break;
    }
    s = t.substring(s + 1, l).split(",");
    if (s.length > 0) {
      o.push({ PrefabKey: s[0], Args: s });
      const u = exports.predefPrefabSetting.get(s[0]);
      if (u) {
        const c = u.GetPrefabPathFunc(s);
        n.push(c.length), (i = i.concat(c)), (e = l + 1);
        for (let e = 0; e < c.length; e++)
          r.Append("<snidx="), r.Append(a), r.Append("/>"), a++;
      }
    }
  }
  LguiUtil_1.LguiUtil.LoadAndSetText(e, r.ToString(), i, (i) => {
    let a = 0;
    o.forEach((e, t, r) => {
      const o = exports.predefPrefabSetting.get(e.PrefabKey);
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
// # sourceMappingURL=GuidePrefabDefine.js.map
