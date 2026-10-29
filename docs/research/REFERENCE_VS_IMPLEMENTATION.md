# Reference vs implementation — deliberate differences

| Area | Reference | Ours | Why |
|---|---|---|---|
| Hero stats | 4 numeric stats | 4 non-numeric pillars | No verified client numbers |
| Hero font min | 82 px | 56 px | Our 8-character words must fit 320–390 px screens without overflow |
| Portrait | Dark, low-key photo | Bright studio portrait masked into the dark page | Only client photos allowed; no destructive edits |
| Testimonials | Real names & quotes | Placeholder slots | No fabricated social proof |
| Course URLs | UUIDs | Slugs | Readability & SEO |
| /about | 404 (anchor only) | Dedicated page + gallery | Showcase client photos & story |
| Auth path | /signin | /login, /register (+ /signin redirect) | Brief requirement |
| Client-rendered lists | Empty HTML until JS | Prerendered with typed adapters & empty states | SEO, resilience |
| Collaboration form | Inline on homepage | Pitch card → /collaborations | Keeps homepage lighter; one form implementation |
| Chat | AI assistant | Help panel → FAQ | Assistant not in scope/approved |
| Socials counter | Animated follower count | Static tiles | No verified figure |

Visual-parity status: see `docs/qa/PAGE_MATRIX.md` and screenshots; **no pixel-parity claim is made.**
