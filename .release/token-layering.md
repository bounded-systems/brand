---
bump: patch
---
token layering: values live only on the base/primitive layer. Add a primitive font-size scale (raw rem) and point the semantic type roles (size.text-*) at it via references, instead of holding raw rem on the roles. The resolver is now recursive so the layers compose (recipe → semantic → primitive). Output values are unchanged.
