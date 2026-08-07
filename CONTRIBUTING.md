# Contributing

It's just typings, not that hard... However, I use a few things to make it a bit easier:

For making the typings,
I mostly use [TypeScript's playground](https://typescriptlang.org/play) with the ".d.ts view" for creating them.
Just export the class you want to make typings for,
adjust the code so there's as little `any`s as possible.
It'll infer the basic parts so you don't have to specify.
Don't bother with errors unless fixing them can help TypeScript's inference give you better types.
If needed, you can import other things from here too via its NPM package name.
Any NPM package with typings can be imported from there.

## Useful bundle versions

- [Code splitting enabled (3.43.33)]
- [Pre-code splitting (3.43.30)]
- [Top-level names removed (3.44.27)]
- [Before top-level names removed (3.44.22)]

[Code splitting enabled (3.43.33)]: https://raw.githubusercontent.com/MinibloxCheaters2/miniblox-bundle-tracker/7973f16ef9a3994ee43b01f2584ceefe8edd342a/bundle-remapped.js
[Pre-code splitting (3.43.30)]: https://raw.githubusercontent.com/MinibloxCheaters2/miniblox-bundle-tracker/77a2b17b2271d9f270c2dd3c902ca47f9c38c660/bundle-remapped.js
[Top-level names removed (3.44.27)]: https://raw.githubusercontent.com/MinibloxCheaters2/miniblox-bundle-tracker/f5ced7da774261d875b3fee64d994abb8d8677f9/bundle-remapped.js
[Before top-level names removed (3.44.22)]: https://raw.githubusercontent.com/MinibloxCheaters2/miniblox-bundle-tracker/974b96023208ce4ec8a6018e27f7fd8ebf4d35e4/bundle-remapped.js
