import urllib.request

urls = [
    '',
    'styles.css',
    'script.js',
    'assets/favicon.svg',
    'assets/rc-avatar.png',
    'assets/work/fincredible-2026.png',
    'assets/work/fincredible-2025.png',
    'assets/work/smooth-roads-campaign.png',
    'assets/work/epoch-fest-poster.png',
    'assets/work/daily-bugle-id.png'
]

print("Verifying server responses on http://localhost:8000/ ...")
all_ok = True
for u in urls:
    full_url = f"http://localhost:8000/{u}"
    try:
        req = urllib.request.urlopen(full_url)
        status = req.status
        content_len = len(req.read())
        print(f"  [OK {status}] {u or 'index.html':<35} ({content_len} bytes)")
    except Exception as e:
        print(f"  [FAIL] {u or 'index.html'}: {e}")
        all_ok = False

if all_ok:
    print("\nAll assets loaded successfully with HTTP 200!")
else:
    print("\nSome assets failed to load.")
