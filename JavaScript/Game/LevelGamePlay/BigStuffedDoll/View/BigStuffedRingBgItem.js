"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedRingBgItem = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  LguiUtil_1 = require("../../../Module/Util/LguiUtil"),
  BigStuffedDefine_1 = require("../BigStuffedDefine"),
  BigStuffedRingSubItem_1 = require("./BigStuffedRingSubItem");
class BigStuffedRingBgItem extends BigStuffedRingSubItem_1.BigStuffedRingSubItem {
  constructor(t, i, e) {
    super(t, i), (this.Ebl = void 0), (this.Type = 0), (this.Ebl = e);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, UE.UIItem], [3, UE.UITexture]);
  }
  OnStart() {
    super.OnStart(),
      this.TextureRing.SetTextureType(4),
      this.TextureRing.SetFillMethod(4),
      this.TextureRing.SetFillOrigin(2),
      this.TextureRing.SetFillDirectionFlip(!0),
      this.GetItem(2).SetUIActive(!1),
      this.xfl(this.TextureRing);
  }
  xfl(s) {
    var f = this.Ebl.GetValidAreas(),
      r = (this.Ebl.ClearValidAreas(), this.RingConfig.InvalidBox);
    let u = this.GetTexture(3);
    if (0 === r.length)
      s.SetFillAmount(1),
        u.SetFillAmount(1),
        this.Ebl.AddValidArea(
          1,
          BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT,
        );
    else {
      var o,
        g = [];
      for (const l of r)
        Array.isArray(l)
          ? (o = l) && g.push([o[0], o[1]])
          : (o = l) && g.push([o.ArrayInt[0], o.ArrayInt[1]]);
      g.sort((t, i) => t[0] - i[0]);
      let t = 1,
        i = -1;
      for (const U of g) {
        var h = U[0],
          n = U[1];
        t < h &&
          (this.Ebl.AddValidArea(t, h - 1), 1 === t) &&
          (i = f.length - 1),
          (t = Math.max(t, n + 1));
      }
      t <= BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT &&
        (-1 !== i
          ? ((s = f.splice(i)[0]),
            this.Ebl.AddValidArea(t, s.EndCellIndex),
            f.sort((t, i) => t.StartCellIndex - i.StartCellIndex))
          : this.Ebl.AddValidArea(
              t,
              BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT,
            ));
      let e = this.GetTexture(1);
      var _ = this.GetItem(2);
      for (let t = 0; t < f.length; t++) {
        var a = f[t].StartCellIndex,
          d = f[t].EndCellIndex,
          S =
            (0 !== t &&
              ((S = LguiUtil_1.LguiUtil.DuplicateActor(
                e.GetOwner(),
                this.RootItem,
              )),
              (e = S.GetComponentByClass(UE.UITexture.StaticClass())),
              (S = LguiUtil_1.LguiUtil.DuplicateActor(
                u.GetOwner(),
                this.RootItem,
              )),
              (u = S.GetComponentByClass(UE.UITexture.StaticClass()))),
            Math.max(a - 1, 0) * BigStuffedDefine_1.SINGLECELL_ANGLE),
          B = Rotator_1.Rotator.Create(0, -S, 0).ToUeRotator(),
          a =
            (e.SetUIRelativeRotation(B),
            (0, BigStuffedDefine_1.calculateCellSize)(a, d) /
              BigStuffedDefine_1.BIGSTUFFEDDOLL_RINGCELLCOUNT);
        e.SetFillAmount(a),
          u.SetUIRelativeRotation(B),
          u.SetFillAmount(a),
          0 !== r.length &&
            ((B = LguiUtil_1.LguiUtil.CopyItem(
              _,
              this.RootItem,
            )).SetUIRelativeRotation(
              Rotator_1.Rotator.Create(0, 0.5 - S, 0).ToUeRotator(),
            ),
            B.SetUIActive(!0),
            B.SetAsLastHierarchy()),
          0 !== r.length &&
            ((a = LguiUtil_1.LguiUtil.CopyItem(_, this.RootItem)),
            (B = d * BigStuffedDefine_1.SINGLECELL_ANGLE),
            a.SetUIRelativeRotation(
              Rotator_1.Rotator.Create(0, -B - 0.5, 0).ToUeRotator(),
            ),
            a.SetUIActive(!0),
            a.SetAsLastHierarchy());
      }
    }
  }
}
exports.BigStuffedRingBgItem = BigStuffedRingBgItem;
//# sourceMappingURL=BigStuffedRingBgItem.js.map
