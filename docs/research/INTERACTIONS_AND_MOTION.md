# Interactions & motion

| Pattern | Reference (evidence) | Ours |
|---|---|---|
| Hero entrance | h1/para/CTA `transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]` with 100/300/400 ms delays, `translate-y` (OBS S1) | Motion `fadeUp` 1 s, same easing, 0.1/0.3/0.4/0.55/0.7 s delays |
| Gradient headline shine | `shineFlow 8s linear infinite`, 400 % background (OBS) | `animate-shine` + `text-gradient-brand` |
| Ambient orbs | `orbFloat 20s`, `orbFloatReverse 25s` (OBS) | `animate-orb`, `animate-orb-reverse` |
| Portrait | blended into dark bg (S9) | Motion scale 1.06→1 + opacity; CSS mask gradients |
| Scroll reveals | INF from opacity/translate classes | `Reveal`/`Stagger` once-in-view |
| Socials counter | "0.00 M+" placeholder in SSR → animated count-up (INF) | Not implemented (no verified number) |
| Nav hover | INF | underline scale-x from left; active `aria-current` |
| Sticky header | INF (not verified) | transparent → blurred bar after 24 px scroll; height shrink |
| Mobile menu | N/A (not captured) | full-screen dialog, staggered links, focus trap, Escape, scroll lock, closes on navigate |
| FAQ | accordion (OBS content) | animated height disclosure |
| Chat bubble | AI assistant (OBS text "Ask anything") | help panel → FAQ, honest "not connected" |
| Cards | INF | lift `-translate-y-1`, border brighten, arrow nudge |
| Reduced motion | global CSS override (OBS) | same CSS + `MotionConfig reducedMotion="user"` + marquee `motion-reduce:animate-none` |
