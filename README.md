# Better Variants
This Mod overrides all variant spawns, to make other variant mods work seamlessly with each other.  
Currently, if two Mods add a Raptor Variant only one of them would spawn.  
With Better Variants installed all Raptor Variants will spawn.  
Weights can be configured individually per Dino and Mod.

Now supports all Mods!

## Configuration
The following config options are available under the `[BetterVariants]` section in your `GameUserSettings.ini`:

### Debug
This will enable debug logging for the mod.  
Usefully for troubleshooting and figuring out internal mod names and dino paths.  
```ini
[BetterVariants]
Debug=True
```   

### Dino Weights
This will set the spawn weight of a dino variant.
Key value list for full blueprint paths are required.
Set weights between 0 and 1 (or even higher to reduce spawn rates of other variants).
Separate multiple paths with a comma or semicolon.
```ini
[BetterVariants]
DinoWeights="/Path/To/Dino/Variant1=0.5,/Path/To/Dino/Variant2=0.25"
```

### Mod Weights
Similar to Dino Weights, but for mods.
Be careful using this, if mods add alphas or multiple versions all will be set to the same weight.
Use settings from the variant mod itself directly, if available.  
Requires internal mod names.  
For basename Dinos use `Game` as mod name.  
```ini
[BetterVariants]
ModWeights="ModName1=0.5,ModName2=0.25"
```

### Dino Blocks
This will block certain dino variants from spawning in the world at all.  
Full blueprint paths are required.  
Separate multiple paths with a comma or semicolon.
```ini
[BetterVariants]
DinoBlocks="/Path/To/Dino/Variant1,/Path/To/Dino/Variant2"
```

### Mod Blocks
Similar to Dino Blocks, but for mods.  
Requires internal mod names.  
```ini
[BetterVariants]
ModBlocks="ModName1,ModName2"
```

### Start Delay
The delay before the mod starts to run.  
Do not change this unless you know what you are doing.  
Default is 0.5 seconds.  
```ini
[BetterVariants]
StartDelay=0.5
```

## Variant Breeding
If you want all variants to be breed-able as well, checkout my other mod [Variant Breeding](https://www.curseforge.com/ark-survival-ascended/mods/variant-breeding)

## Support
Discord: https://discord.com/invite/K4a4DvZak5
