# Better Variants
This Mod overrides all variant spawns, to make other variant mods work seamlessly with each other.  
Currently, if two Mods add a Raptor Variant only one of them would spawn.  
With Better Variants installed all Raptor Variants will spawn.  
Weights can be configured individually per Dino and Mod.  

Now supports all Mods!  

## Configuration
Configuration is optional.  
By default, the variant mods default settings will be used.  
The following config options are available under the `[BetterVariants]` section in your `GameUserSettings.ini`:  

### Debug
This will enable debug logging for the mod.  
Usefully for troubleshooting and figuring out internal mod names and dino paths.  
Default: `False`  
```ini
[BetterVariants]
Debug=True
```   

### Debug Spawns
This will add spawn info to the debug log.  
Requires the Debug option to be enabled.  
Default: `False`  
```ini
[BetterVariants]
Debug=True
DebugSpawns=True
```

### Dino Weights
This will set the spawn weight of a dino variant.  
Key value list for full blueprint paths are required.  
Set weights between 0 and 1 (or even higher to reduce spawn rates of other variants).  
Separate multiple paths with a comma or semicolon.  
Default: ``
```ini
[BetterVariants]
DinoWeights="/Path/To/Dino/Variant1=0.5,/Path/To/Dino/Variant2=0.25"
```

### Variant Weights
Similar to Dino Weights, but for Variants.  
Matches Variants based on the beginning of their ingame names.  
Checks in the order of the list, so the first match will be used.  
The key `Base` can be used to set the weight for the base variant of a dino (the dino that matches the group).  
Optionally set the last value to `*` for a catch-all, but it is recommended to use Base instead.  
Default: ``  
```ini
[BetterVariants]
VariantWeights="Alpha Example=0.1,Alpha=0.05,Example=0.5,Base=0.5"
```

### Dino Blocks
This will block certain dino variants from spawning in the world at all.  
Full blueprint paths are required.  
Separate multiple paths with a comma or semicolon.  
Default: ``  
```ini
[BetterVariants]
DinoBlocks="/Path/To/Dino/Variant1,/Path/To/Dino/Variant2"
```

### Mod Blocks
Similar to Dino Blocks, but for mods.  
Requires internal mod names.  
Default: ``  
```ini
[BetterVariants]
ModBlocks="ModName1,ModName2"
```

### Start Delay
The delay in seconds before the mod starts to run.  
Do not change this unless you know what you are doing.  
Default: `0.5`  
```ini
[BetterVariants]
StartDelay=0.5
```

## Variant Breeding
If you want all variants to be breed-able as well, checkout my other mod [Variant Breeding](https://www.curseforge.com/ark-survival-ascended/mods/variant-breeding)  

## Support
Discord: https://discord.com/invite/K4a4DvZak5
