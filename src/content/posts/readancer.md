---
title: 'ReaDancer'
description: 'A little dancing character for REAPER.'
pubDate: 'Jul 21 2026'
githubRepo: 'julianZ99/ReaDancer'
---

ReaDancer drops a character into its own borderless floating window that dances in time with your REAPER project. It's <del>stolen from</del>  inspired by FL Studio's Fruity Dance, and it's compatible with Fruity Dance spritesheets, so there's plenty to choose from online.

Built in Lua on top of [ReaImGui](https://github.com/cfillion/reaimgui) and installable via ReaPack. Drag it around, scroll to resize, and pick a move from the right-click menu.

## What it can do

- **Follow sections**: name your regions/markers and assign each one a dance, so the arrangement drives the moves.
- **MIDI triggers**: drive it from MIDI notes like Fruity Dance's piano roll. Note 60 (middle C) plays the first move, each semitone up the next.
- **Speed**: how fast it dances, relative to the tempo.

Needs REAPER 7.0+ and the ReaImGui extension (both grabbable from ReaPack).
