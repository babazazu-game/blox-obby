cd "/d/work/CLAUDE/GAME/Blox Obby"
B="In-game 3D screenshot, third-person camera behind a blocky Roblox-like avatar (cube head with simple face, box torso and limbs) jumping between floating platforms in an obby parkour course, other blocky players nearby, coins, a checkpoint flag. 16:9, no text, no logos."
node tools/codex_image.cjs gen art/styles/s1_classic.png "$B Style: classic Roblox — flat plastic studs-free bright primary colors, simple smooth shading, blue sky with soft clouds, clean low-poly."
node tools/codex_image.cjs gen art/styles/s2_candy.png "$B Style: candy pastel toy world — soft glossy pastel materials, pink/mint/lilac, ambient occlusion, dreamy warm light, platforms like candy and jelly."
node tools/codex_image.cjs gen art/styles/s3_neon.png "$B Style: neon night — dark purple sky, glowing emissive edges on platforms, cyan/magenta glow, lava glowing orange below, synthwave mood."
node tools/codex_image.cjs gen art/styles/s4_voxel.png "$B Style: chunky voxel diorama — textured blocks with grass/stone/wood, tilt-shift miniature look, warm sunset lighting, soft shadows."
echo DONE
