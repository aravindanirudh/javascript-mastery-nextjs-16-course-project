# PostHog post-wizard report

PostHog analytics is now initialized through Next.js client instrumentation using environment-based configuration. The integration retains default autocapture and session recording, enables exception capture, and adds targeted client-side tracking for browsing intent and featured-event selection. The `posthog-js` SDK was installed and the production build completed successfully.

| Event name | Description | File |
| --- | --- | --- |
| `explore_events_clicked` | Tracks when a visitor selects the call to action to browse featured events. | `components/ExploreBtn.tsx` |
| `event_selected` | Tracks when a visitor opens an event from the featured events list. | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/517467/dashboard/1866666)
- [Featured event selections (wizard)](https://us.posthog.com/project/517467/insights/DvLfZJdC)
- [Explore events CTA clicks (wizard)](https://us.posthog.com/project/517467/insights/SyhLTVe6)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names you added to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
