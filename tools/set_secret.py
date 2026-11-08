#!/usr/bin/env python3
"""Set the beta secret word in prototype/index.html.
Usage: python3 tools/set_secret.py <word>
Stores only a hash (FNV-1a 32-bit, matching wordHash() in the page). Case and surrounding spaces are ignored."""
import re, sys, pathlib

def fnv1a(word):
    h = 0x811c9dc5
    for ch in "godsplit:" + word.strip().lower():
        h ^= ord(ch)
        h = (h * 0x01000193) & 0xffffffff
    return f"{h:08x}"

if len(sys.argv) != 2:
    sys.exit(__doc__)
page = pathlib.Path(__file__).resolve().parent.parent / "prototype" / "index.html"
s = page.read_text(encoding="utf-8")
s, n = re.subn(r'const SECRET_HASH = "[^"]*";', f'const SECRET_HASH = "{fnv1a(sys.argv[1])}";', s)
if n != 1:
    sys.exit("SECRET_HASH line not found")
page.write_text(s, encoding="utf-8")
print("secret word set; hash", fnv1a(sys.argv[1]))
