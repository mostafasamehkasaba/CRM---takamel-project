from pathlib import Path

path = Path(r"app/(dashboard)/(06-purchases)/purchases/new/page.tsx")
text = path.read_text(encoding="utf-8")

if "حالة الدفع" not in text:
    marker = '<div className="grid gap-4 lg:grid-cols-4">'
    start = text.find(marker)
    if start == -1:
        raise SystemExit("marker not found")
    idx = text.find('defaultValue={0}', start)
    if idx == -1:
        raise SystemExit("defaultValue marker not found")
    close = text.find('</label>', idx)
    if close == -1:
        raise SystemExit("label close not found")
    insert_pos = close + len('</label>')
    insert = '''
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرصيد</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">حالة الدفع</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>مدفوع</option>
                <option>معلقة</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">حالة عملية الشراء</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>تم الاستلام</option>
                <option>معلقة</option>
              </select>
            </label>
'''
    text = text[:insert_pos] + insert + text[insert_pos:]
    path.write_text(text, encoding="utf-8")
