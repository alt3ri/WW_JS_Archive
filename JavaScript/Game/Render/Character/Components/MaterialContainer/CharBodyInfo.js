"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharBodyInfo = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharMaterialInfo_1 = require("./CharMaterialInfo");
class CharBodyInfo {
  constructor() {
    (this.ActorName = ""),
      (this.BodyName = ""),
      (this.BodyType = void 0),
      (this.MaterialSlotList = void 0),
      (this.SpecifiedSlotList = void 0),
      (this.SkeletalComp = void 0),
      (this.SkeletalMesh = void 0),
      (this.whr = void 0),
      (this.Bhr = !1),
      (this.bhr = !1),
      (this.qhr = !1),
      (this.Ghr = !1),
      (this.Nhr = 0),
      (this.Ohr = 0),
      (this.khr = 0),
      (this.Fhr = 0),
      (this.Vhr = void 0),
      (this.Hhr = void 0),
      (this.jhr = void 0),
      (this.Whr = void 0),
      (this.Khr = void 0),
      (this.Qhr = void 0),
      (this.Xhr = void 0),
      (this.$hr = void 0),
      (this.Yhr = void 0),
      (this.Uhr = void 0),
      (this.LastUpdateCounter = 0);
  }
  Init(t, e, i, s, h) {
    (this.Uhr = h),
      (this.ActorName = t),
      (this.BodyName = e),
      (this.BodyType = RenderConfig_1.RenderConfig.GetBodyTypeByName(e)),
      (this.SkeletalComp = i),
      (this.SkeletalMesh = i.SkeletalMesh),
      (this.SpecifiedSlotList = new Array(4)),
      (this.SpecifiedSlotList[0] = new Array()),
      (this.SpecifiedSlotList[2] = new Array()),
      (this.SpecifiedSlotList[1] = new Array()),
      (this.SpecifiedSlotList[3] = new Array());
    var r = i.GetMaterialSlotNames(),
      a = r.Num();
    this.MaterialSlotList = new Array(a);
    for (let e = 0; e < a; e++) {
      var o =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSkeletalMaterialInterface(
          i.SkeletalMesh,
          e,
        );
      if (
        ((this.MaterialSlotList[e] = new CharMaterialInfo_1.CharMaterialSlot()),
        o?.IsValid())
      ) {
        let t = void 0;
        if (
          (t =
            s && o instanceof UE.MaterialInstanceDynamic
              ? o
              : i.CreateDynamicMaterialInstance(e, o))?.IsValid()
        )
          switch (
            (this.MaterialSlotList[e].Init(e, r.Get(e).toString(), t),
            this.SpecifiedSlotList[0].push(e),
            this.MaterialSlotList[e].SlotType)
          ) {
            case 1:
            case 4:
              this.SpecifiedSlotList[2].push(e),
                this.SpecifiedSlotList[1].push(e);
              break;
            case 2:
              this.SpecifiedSlotList[3].push(e),
                this.SpecifiedSlotList[1].push(e);
          }
        else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "RenderCharacter",
              41,
              "CharBodyInfo.Init: dynamicMaterial is not valid",
            );
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderCharacter",
            41,
            "CharBodyInfo.Init: originalMat is not valid",
          );
    }
    var n = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionCount(
      this.SkeletalMesh,
    );
    (this.whr = new Array(n)),
      (this.Vhr = new Array(n)),
      (this.Hhr = new Array(n)),
      (this.jhr = new Array(n)),
      (this.Whr = new Array(n));
    for (let t = 0; t < n; t++) {
      var l =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionMaterialIndex(
          this.SkeletalMesh,
          t,
        );
      (this.MaterialSlotList[l].SectionIndex = t),
        (this.whr[t] = l),
        (this.Vhr[t] = 0),
        (this.Hhr[t] = 0),
        (this.jhr[t] = 0),
        (this.Whr[t] = 0);
    }
    (this.Bhr = !0),
      (this.bhr = !0),
      (this.qhr = !0),
      (this.Ghr = !0),
      (this.Nhr = 0),
      (this.Ohr = 0),
      (this.khr = 0),
      (this.Fhr = 0);
    h = this.ActorName + "_" + this.BodyName;
    (this.Khr = Stats_1.Stat.Create(
      ["Render_CharBodyInfo_UpdateMaterial_", h].join(),
    )),
      (this.Qhr = Stats_1.Stat.Create(
        ["Render_CharBodyInfo_UpdateAlphaTest_", h].join(),
      )),
      (this.Yhr = Stats_1.Stat.Create(
        ["Render_CharBodyInfo_UpdateOutlineStencil_", h].join(),
      )),
      (this.Xhr = Stats_1.Stat.Create(
        ["Render_CharBodyInfo_UpdateBattle_", h].join(),
      )),
      (this.$hr = Stats_1.Stat.Create(
        ["Render_CharBodyInfo_UpdateBattleMask_", h].join(),
      ));
  }
  UseBattleMaskCommon() {
    ++this.Fhr,
      (this.Ghr = !0),
      this.Fhr >= RenderConfig_1.RenderConfig.RefErrorCount &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "Battle类型引用异常，检查UseBattleMask调用情况",
            ["Battle Mask Reference Count", this.Fhr],
            ["Actor", this.ActorName],
          ),
        this.Jhr());
  }
  UseBattleMask(t) {
    var e = this.Whr.length;
    t < e
      ? (++this.Whr[t],
        (this.Ghr = !0),
        this.Whr[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "BattleMask类型引用异常，检查UseBattleMask调用情况",
            ["Battle Mask Reference Count", this.Whr[t]],
            ["Actor", this.ActorName],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseBattleMask索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertBattleMaskCommon() {
    0 < this.Fhr && (--this.Fhr, (this.Ghr = !0)), this.UpdateBattleMask();
  }
  RevertBattleMask(t) {
    var e = this.Whr.length;
    t < e
      ? 0 < this.Whr[t] && (--this.Whr[t], (this.Ghr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertBattleMask索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  UseBattleCommon() {
    ++this.khr,
      (this.qhr = !0),
      this.khr >= RenderConfig_1.RenderConfig.RefErrorCount &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "Battle类型引用异常，检查UseBattleCommon调用情况",
            ["Battle Reference Count", this.khr],
            ["Actor", this.ActorName],
          ),
        this.Jhr());
  }
  UseBattle(t) {
    var e = this.jhr.length;
    t < e
      ? (++this.jhr[t],
        (this.qhr = !0),
        this.jhr[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "Battle类型引用异常，检查UseBattle调用情况",
              ["Battle Reference Count", this.jhr[t]],
              ["Actor", this.ActorName],
            ),
          this.Jhr()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseBattle索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertBattleCommon() {
    0 < this.khr && (--this.khr, (this.qhr = !0)), this.UpdateBattle();
  }
  RevertBattle(t) {
    var e = this.jhr.length;
    t < e
      ? 0 < this.jhr[t] && (--this.jhr[t], (this.qhr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertBattle索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  UseAlphaTestCommon() {
    ++this.Nhr,
      (this.Bhr = !0),
      this.Nhr >= RenderConfig_1.RenderConfig.RefErrorCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "AlphaTest类型引用异常，检查UseAlphaTest调用情况",
          ["AlphaTest Reference Count", this.Nhr],
          ["Actor", this.ActorName],
        );
  }
  UseAlphaTest(t) {
    var e = this.Vhr.length;
    t < e
      ? (++this.Vhr[t],
        (this.Bhr = !0),
        this.Vhr[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "AlphaTestMask类型引用异常，检查UseAlphaTest调用情况",
            ["AlphaTest Reference Count", this.Vhr[t]],
            ["Actor", this.ActorName],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseAlphaTestMask索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertAlphaTestCommon() {
    0 < this.Nhr && (--this.Nhr, (this.Bhr = !0)), this.UpdateAlphaTest();
  }
  RevertAlphaTest(t) {
    var e = this.Vhr.length;
    t < e
      ? 0 < this.Vhr[t] && (--this.Vhr[t], (this.Bhr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertAlphaTestMask索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  UseOutlineStencilTestCommon() {
    ++this.Ohr,
      (this.bhr = !0),
      this.Ohr >= RenderConfig_1.RenderConfig.RefErrorCount &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "StencilOutline类型引用异常，检查UseAlphaTest调用情况",
          ["StencilOutline Reference Count", this.Nhr],
          ["Actor", this.ActorName],
        );
  }
  UseOutlineStencilTest(t) {
    var e = this.Hhr.length;
    t < e
      ? (++this.Hhr[t],
        (this.bhr = !0),
        this.Hhr[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "StencilOutlineMask类型引用异常，检查UseStencilOutline调用情况",
            ["StencilOutline Reference Count", this.Hhr[t]],
            ["Actor", this.ActorName],
          ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "UseStencilOutlineMask索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertOutlineStencilTestCommon() {
    0 < this.Ohr && (--this.Ohr, (this.bhr = !0)),
      this.UpdateStencilOutlineTest();
  }
  RevertOutlineStencilTest(t) {
    var e = this.Hhr.length;
    t < e
      ? 0 < this.Hhr[t] && (--this.Hhr[t], (this.bhr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertOutlineStencilMask索引超过最大值",
          ["索引", t],
          ["最大值", e - 1],
          ["Actor", this.ActorName],
        );
  }
  SetColor(e, i, t) {
    var s = this.SpecifiedSlotList[t],
      h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetColor(e, i);
  }
  RevertColor(t, e) {
    var i = this.SpecifiedSlotList[e],
      s = i.length,
      h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[i[t]].RevertColor(h);
  }
  SetFloat(e, i, t) {
    var s = this.SpecifiedSlotList[t],
      h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetFloat(e, i);
  }
  RevertFloat(t, e) {
    var i = this.SpecifiedSlotList[e],
      s = i.length,
      h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[i[t]].RevertFloat(h);
  }
  SetTexture(e, i, t) {
    var s = this.SpecifiedSlotList[t],
      h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetTexture(e, i);
  }
  RevertTexture(t, e) {
    var i = this.SpecifiedSlotList[e],
      s = i.length,
      h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[i[t]].RevertTexture(h);
  }
  SetStarScarEnergy(e) {
    var i = this.MaterialSlotList.length;
    for (let t = 0; t < i; t++) this.MaterialSlotList[t].SetStarScarEnergy(e);
  }
  Update(t = void 0) {
    this.Khr.Start(),
      void 0 !== t &&
        this.SkeletalComp.IsValid() &&
        this.SkeletalComp.SetMeshShadingRate(t);
    t = this.zhr();
    return (
      this.Khr.Stop(),
      this.UpdateAlphaTest(),
      this.UpdateStencilOutlineTest(),
      this.UpdateBattle(),
      this.UpdateBattleMask(),
      t
    );
  }
  ResetAllState() {
    (this.Bhr = !0),
      (this.bhr = !0),
      (this.Nhr = 0),
      (this.Ohr = 0),
      this.Vhr.fill(0),
      this.Hhr.fill(0),
      this.jhr.fill(0),
      this.Whr.fill(0),
      this.Hhr.fill(0),
      this.UpdateAlphaTest(),
      this.UpdateStencilOutlineTest(),
      this.UpdateBattle(),
      this.UpdateBattleMask();
  }
  Jhr() {
    var t = this.Uhr.GetRenderingComponent().GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialController,
    );
    t && t.PrintCurrentInfo();
  }
  zhr() {
    if (!this.SkeletalComp || !this.SkeletalComp.IsValid()) return 0;
    let e = 0;
    var i = this.MaterialSlotList.length;
    for (let t = 0; t < i; t++) {
      var s = this.MaterialSlotList[t];
      (e += s.UpdateMaterialParam()),
        s.SetSkeletalMeshMaterial(this.SkeletalComp);
    }
    return e;
  }
  UpdateBattleMask() {
    if (this.Ghr) {
      (this.Ghr = !1), this.$hr.Start();
      let t = !1,
        e = !1;
      var i = UE.NewArray(UE.BuiltinInt);
      if (0 < this.Fhr) (t = !0), (e = !1);
      else {
        var s = this.Whr.length;
        for (let t = 0; t < s; t++) 0 < this.Whr[t] && i.Add(t);
        (t = 0 < i.Num()), (e = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseEnableBattleMask(t),
        this.SkeletalComp.SetUseEnableBattleMaskSectionMask(e, i)),
        this.$hr.Stop();
    }
  }
  UpdateBattle() {
    if (this.qhr) {
      (this.qhr = !1), this.Xhr.Start();
      let t = !1,
        e = !1;
      var i = UE.NewArray(UE.BuiltinInt);
      if (0 < this.khr) (t = !0), (e = !1);
      else {
        var s = this.jhr.length;
        for (let t = 0; t < s; t++) 0 < this.jhr[t] && i.Add(t);
        (t = 0 < i.Num()), (e = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseEnableBattle(t),
        this.SkeletalComp.SetUseEnableBattleSectionMask(e, i)),
        this.Xhr.Stop();
    }
  }
  UpdateAlphaTest() {
    if (this.Bhr) {
      (this.Bhr = !1), this.Qhr.Start();
      let t = !1,
        e = !1;
      var i = UE.NewArray(UE.BuiltinInt);
      if (0 < this.Nhr) (t = !0), (e = !1);
      else {
        var s = this.Vhr.length;
        for (let t = 0; t < s; t++) 0 < this.Vhr[t] && i.Add(t);
        (t = 0 < i.Num()), (e = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseCustomAlphaTest(t),
        this.SkeletalComp.SetUseCustomAlphaTestSectionMask(e, i)),
        this.Qhr.Stop();
    }
  }
  UpdateStencilOutlineTest() {
    if (this.bhr) {
      (this.bhr = !1), this.Yhr.Start();
      let t = !1,
        e = !1;
      var i = UE.NewArray(UE.BuiltinInt);
      if (0 < this.Ohr) (t = !0), (e = !1);
      else {
        var s = this.Hhr.length;
        for (let t = 0; t < s; t++) 0 < this.Hhr[t] && i.Add(t);
        (t = 0 < i.Num()), (e = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseOutlineStencilTest(t),
        this.SkeletalComp.SetUseOutlineStencilTestSectionMask(e, i)),
        this.Yhr.Stop();
    }
  }
}
exports.CharBodyInfo = CharBodyInfo;
//# sourceMappingURL=CharBodyInfo.js.map
