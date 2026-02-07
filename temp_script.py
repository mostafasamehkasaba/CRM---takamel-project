from pathlib import Path

path = Path(r"app/(dashboard)/(03-items)/items/new/page.tsx")
text = path.read_text(encoding="utf-8")
lines = text.splitlines()

pattern = '<select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">'
indices = [i for i, line in enumerate(lines) if line.strip() == pattern]

if len(indices) < 7:
    raise SystemExit(f"Expected at least 7 select blocks, found {len(indices)}")

def build_block(template, indent):
    child = indent + "  "
    out = []
    for level, text in template:
        prefix = indent if level == "indent" else child
        out.append(prefix + text)
    return out

common_class = 'className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"'

main_template = [
    ("indent", "<select"),
    ("child", "value={form.mainCategoryId}"),
    ("child", "onChange={(event) => {"),
    ("child", "  const nextMain = event.target.value;"),
    ("child", "  const nextSub = categories.filter((category) => String(category.parentId) === String(nextMain));"),
    ("child", "  setForm((prev) => ({"),
    ("child", "    ...prev,"),
    ("child", "    mainCategoryId: nextMain,"),
    ("child", "    subCategoryId: nextSub[0] ? String(nextSub[0].id) : \"\","),
    ("child", "  }));"),
    ("child", "}}"),
    ("child", "disabled={isLoading}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{mainCategories.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ ÊÕäíİÇÊ</option>"),
    ("child", ") : ("),
    ("child", "  mainCategories.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

sub_template = [
    ("indent", "<select"),
    ("child", "value={form.subCategoryId}"),
    ("child", "onChange={(event) => setForm((prev) => ({ ...prev, subCategoryId: event.target.value }))}"),
    ("child", "disabled={isLoading || subCategories.length === 0}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{subCategories.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ İÆÇÊ İÑÚíÉ</option>"),
    ("child", ") : ("),
    ("child", "  subCategories.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

unit_template = [
    ("indent", "<select"),
    ("child", "value={form.unitId}"),
    ("child", "onChange={(event) => setForm((prev) => ({ ...prev, unitId: event.target.value }))}"),
    ("child", "disabled={isLoading}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{units.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ æÍÏÇÊ</option>"),
    ("child", ") : ("),
    ("child", "  units.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

sale_unit_template = [
    ("indent", "<select"),
    ("child", "value={form.saleUnitId}"),
    ("child", "onChange={(event) => setForm((prev) => ({ ...prev, saleUnitId: event.target.value }))}"),
    ("child", "disabled={isLoading}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{units.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ æÍÏÇÊ</option>"),
    ("child", ") : ("),
    ("child", "  units.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

purchase_unit_template = [
    ("indent", "<select"),
    ("child", "value={form.purchaseUnitId}"),
    ("child", "onChange={(event) => setForm((prev) => ({ ...prev, purchaseUnitId: event.target.value }))}"),
    ("child", "disabled={isLoading}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{units.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ æÍÏÇÊ</option>"),
    ("child", ") : ("),
    ("child", "  units.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

type_template = [
    ("indent", "<select"),
    ("child", "value={form.typeId}"),
    ("child", "onChange={(event) => setForm((prev) => ({ ...prev, typeId: event.target.value }))}"),
    ("child", "disabled={isLoading}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{types.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ ÃäæÇÚ</option>"),
    ("child", ") : ("),
    ("child", "  types.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

brand_template = [
    ("indent", "<select"),
    ("child", "value={form.brandId}"),
    ("child", "onChange={(event) => setForm((prev) => ({ ...prev, brandId: event.target.value }))}"),
    ("child", "disabled={isLoading}"),
    ("child", common_class),
    ("indent", ">"),
    ("child", "{brands.length === 0 ? ("),
    ("child", "  <option>áÇ ÊæÌÏ ãÇÑßÇÊ</option>"),
    ("child", ") : ("),
    ("child", "  brands.map((option) => ("),
    ("child", "    <option key={option.id} value={option.id}>"),
    ("child", "      {option.name}"),
    ("child", "    </option>"),
    ("child", "  ))"),
    ("child", ")}"),
    ("indent", "</select>"),
]

targets = {
    0: main_template,
    1: sub_template,
    2: unit_template,
    3: sale_unit_template,
    4: purchase_unit_template,
    5: type_template,
    6: brand_template,
}

for key in sorted(targets.keys(), key=lambda k: indices[k], reverse=True):
    i = indices[key]
    indent = lines[i].split("<")[0]
    new_block = build_block(targets[key], indent)
    lines[i:i+3] = new_block

new_text = "\n".join(lines)
if text.endswith("\n"):
    new_text += "\n"
path.write_text(new_text, encoding="utf-8")
