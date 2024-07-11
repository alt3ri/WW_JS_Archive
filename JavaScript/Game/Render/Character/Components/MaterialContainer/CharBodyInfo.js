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
      (this.Uhr = void 0);
  }
  Init(t, i, e, s, h) {
    (this.Uhr = h),
      (this.ActorName = t),
      (this.BodyName = i),
      (this.BodyType = RenderConfig_1.RenderConfig.GetBodyTypeByName(i)),
      (this.SkeletalComp = e),
      (this.SkeletalMesh = e.SkeletalMesh),
      (this.SpecifiedSlotList = new Array(4)),
      (this.SpecifiedSlotList[0] = new Array()),
      (this.SpecifiedSlotList[2] = new Array()),
      (this.SpecifiedSlotList[1] = new Array()),
      (this.SpecifiedSlotList[3] = new Array());
    var r = e.GetMaterialSlotNames(),
      a = r.Num();
    this.MaterialSlotList = new Array(a);
    for (let i = 0; i < a; i++) {
      var o =
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSkeletalMaterialInterface(
          e.SkeletalMesh,
          i,
        );
      if (
        ((this.MaterialSlotList[i] = new CharMaterialInfo_1.CharMaterialSlot()),
        o?.IsValid())
      ) {
        let t = void 0;
        if (
          (t =
            s && o instanceof UE.MaterialInstanceDynamic
              ? o
              : e.CreateDynamicMaterialInstance(i, o))?.IsValid()
        )
          switch (
            (this.MaterialSlotList[i].Init(i, r.Get(i).toString(), t),
            this.SpecifiedSlotList[0].push(i),
            this.MaterialSlotList[i].SlotType)
          ) {
            case 1:
            case 4:
              this.SpecifiedSlotList[2].push(i),
                this.SpecifiedSlotList[1].push(i);
              break;
            case 2:
              this.SpecifiedSlotList[3].push(i),
                this.SpecifiedSlotList[1].push(i);
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
    this.ActorName, this.BodyName;
    (this.Khr = void 0),
      (this.Qhr = void 0),
      (this.Yhr = void 0),
      (this.Xhr = void 0),
      (this.$hr = void 0);
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
    var i = this.Whr.length;
    t < i
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
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertBattleMaskCommon() {
    0 < this.Fhr && (--this.Fhr, (this.Ghr = !0)), this.UpdateBattleMask();
  }
  RevertBattleMask(t) {
    var i = this.Whr.length;
    t < i
      ? 0 < this.Whr[t] && (--this.Whr[t], (this.Ghr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertBattleMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
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
    var i = this.jhr.length;
    t < i
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
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertBattleCommon() {
    0 < this.khr && (--this.khr, (this.qhr = !0)), this.UpdateBattle();
  }
  RevertBattle(t) {
    var i = this.jhr.length;
    t < i
      ? 0 < this.jhr[t] && (--this.jhr[t], (this.qhr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertBattle索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
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
    var i = this.Vhr.length;
    t < i
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
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertAlphaTestCommon() {
    0 < this.Nhr && (--this.Nhr, (this.Bhr = !0)), this.UpdateAlphaTest();
  }
  RevertAlphaTest(t) {
    var i = this.Vhr.length;
    t < i
      ? 0 < this.Vhr[t] && (--this.Vhr[t], (this.Bhr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertAlphaTestMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
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
    var i = this.Hhr.length;
    t < i
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
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  RevertOutlineStencilTestCommon() {
    0 < this.Ohr && (--this.Ohr, (this.bhr = !0)),
      this.UpdateStencilOutlineTest();
  }
  RevertOutlineStencilTest(t) {
    var i = this.Hhr.length;
    t < i
      ? 0 < this.Hhr[t] && (--this.Hhr[t], (this.bhr = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "RevertOutlineStencilMask索引超过最大值",
          ["索引", t],
          ["最大值", i - 1],
          ["Actor", this.ActorName],
        );
  }
  SetColor(i, e, t) {
    var s = this.SpecifiedSlotList[t],
      h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetColor(i, e);
  }
  RevertColor(t, i) {
    var e = this.SpecifiedSlotList[i],
      s = e.length,
      h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[e[t]].RevertColor(h);
  }
  SetFloat(i, e, t) {
    var s = this.SpecifiedSlotList[t],
      h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetFloat(i, e);
  }
  RevertFloat(t, i) {
    var e = this.SpecifiedSlotList[i],
      s = e.length,
      h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[e[t]].RevertFloat(h);
  }
  SetTexture(i, e, t) {
    var s = this.SpecifiedSlotList[t],
      h = s.length;
    for (let t = 0; t < h; t++) this.MaterialSlotList[s[t]].SetTexture(i, e);
  }
  RevertTexture(t, i) {
    var e = this.SpecifiedSlotList[i],
      s = e.length,
      h = t.toString();
    for (let t = 0; t < s; t++) this.MaterialSlotList[e[t]].RevertTexture(h);
  }
  SetStarScarEnergy(i) {
    var e = this.MaterialSlotList.length;
    for (let t = 0; t < e; t++) this.MaterialSlotList[t].SetStarScarEnergy(i);
  }
  Update(t = void 0) {
    void 0 !== t &&
      this.SkeletalComp.IsValid() &&
      this.SkeletalComp.SetMeshShadingRate(t),
      this.zhr(),
      this.UpdateAlphaTest(),
      this.UpdateStencilOutlineTest(),
      this.UpdateBattle(),
      this.UpdateBattleMask();
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
    if (this.SkeletalComp && this.SkeletalComp.IsValid()) {
      var i = this.MaterialSlotList.length;
      for (let t = 0; t < i; t++) {
        var e = this.MaterialSlotList[t];
        e.UpdateMaterialParam(), e.SetSkeletalMeshMaterial(this.SkeletalComp);
      }
    }
  }
  UpdateBattleMask() {
    if (this.Ghr) {
      let t = (this.Ghr = !1),
        i = !1;
      var e = UE.NewArray(UE.BuiltinInt);
      if (0 < this.Fhr) (t = !0), (i = !1);
      else {
        var s = this.Whr.length;
        for (let t = 0; t < s; t++) 0 < this.Whr[t] && e.Add(t);
        (t = 0 < e.Num()), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseEnableBattleMask(t),
        this.SkeletalComp.SetUseEnableBattleMaskSectionMask(i, e));
    }
  }
  UpdateBattle() {
    if (this.qhr) {
      let t = (this.qhr = !1),
        i = !1;
      var e = UE.NewArray(UE.BuiltinInt);
      if (0 < this.khr) (t = !0), (i = !1);
      else {
        var s = this.jhr.length;
        for (let t = 0; t < s; t++) 0 < this.jhr[t] && e.Add(t);
        (t = 0 < e.Num()), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseEnableBattle(t),
        this.SkeletalComp.SetUseEnableBattleSectionMask(i, e));
    }
  }
  UpdateAlphaTest() {
    if (this.Bhr) {
      let t = (this.Bhr = !1),
        i = !1;
      var e = UE.NewArray(UE.BuiltinInt);
      if (0 < this.Nhr) (t = !0), (i = !1);
      else {
        var s = this.Vhr.length;
        for (let t = 0; t < s; t++) 0 < this.Vhr[t] && e.Add(t);
        (t = 0 < e.Num()), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseCustomAlphaTest(t),
        this.SkeletalComp.SetUseCustomAlphaTestSectionMask(i, e));
    }
  }
  UpdateStencilOutlineTest() {
    if (this.bhr) {
      let t = (this.bhr = !1),
        i = !1;
      var e = UE.NewArray(UE.BuiltinInt);
      if (0 < this.Ohr) (t = !0), (i = !1);
      else {
        var s = this.Hhr.length;
        for (let t = 0; t < s; t++) 0 < this.Hhr[t] && e.Add(t);
        (t = 0 < e.Num()), (i = t);
      }
      this.SkeletalComp?.IsValid() &&
        (this.SkeletalComp.SetUseOutlineStencilTest(t),
        this.SkeletalComp.SetUseOutlineStencilTestSectionMask(i, e));
    }
  }
}
exports.CharBodyInfo = CharBodyInfo;
//# sourceMappingURL=CharBodyInfo.js.map
