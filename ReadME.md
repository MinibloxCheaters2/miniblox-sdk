# Minblox SDK

> [!WARNING]
> this is a tiny bit outdated and iffy here and there, but a lot of it is still accurate.
> if you find a method that doesn't exist at runtime, it's probably remapped by vector.
> you need to use some dumps or something in order to get the real names of functions.
> we're not going to use the unobfuscated name of every function for every new release
> just because that's actually how it is at runtime.
> just skid [my remap proxy](https://codeberg.org/Miniblox/VapeRewrite/src/branch/fix/unpatch/src/utils/helpers/remapProxy.ts) from Vape Rewrite and use that.

Mostly typings but there's enums and stuff here and there (nowhere).

## License

AGPL 3.0. Why? Screw your garbage ahh proprietary Miniblox cheeto, deobfed in 2 seconds by CatGPT.

## Why?

Well, it's simple:
- I wanted to make game cheeto for [Miniblox]
- So, I made [game cheat[^1]](https://codeberg.org/Miniblox/VapeRewrite) for [Miniblox]!
- I am nice, and I want to let others use the types from Vape Rewrite without having to copy them over to their project and probably also divert from Vape Rewrite's typings, causing them to never get the improvements that someone else may have made in newer versions, or keeping their improvements to themselves.
- So, this happens.

[^1]: I'm using real english here. It's called "hacks" in fake english. It's cheating, not hacking. Hacking means gaining unauthorized access to something, cheating means going 5% faster in block game by modifying client.

[Miniblox]: https://miniblox.io/

## How?

NPM package and repository that have the typings..?
