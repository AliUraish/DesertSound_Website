# Audio card design QA

- Source visual truth: `/var/folders/zq/nzcxk4dn5m54k_m7z9n1ysp80000gn/T/codex-clipboard-c903b884-7fc4-4800-a951-0dc329bb6e65.png`
- Implementation screenshot: `/Users/aliuraishmirani/desert_website/DesertSound-Website/Frontend/design-qa-implementation.png`
- Full-view side-by-side comparison: `/Users/aliuraishmirani/desert_website/DesertSound-Website/Frontend/design-qa-comparison.png`
- Focused side-by-side comparison: `/Users/aliuraishmirani/desert_website/DesertSound-Website/Frontend/design-qa-focused-comparison.png`
- Viewport: 1280 × 1000 CSS px at device scale factor 1
- Source pixels: 1352 × 970; the source card region is 1208 × 806 and landscape
- Implementation pixels: 1280 × 1000; the rendered card is 576 × 864 CSS px and portrait
- State: desktop audio systems page, Audiophile experience section in view

## Full-view comparison evidence

The supplied source shows the Audiophile image in landscape orientation. The implementation rotates that same image 90° counterclockwise and places it in a 2:3 portrait card while preserving the surrounding section, copy, palette, typography, radius, and shadow.

## Focused-region comparison evidence

The focused comparison shows the complete source image before and after rotation. In the implementation, the browser-rendered image and its wrapper both measure 576 × 864 CSS px. The image uses an 864 × 576 CSS layout box rotated to 576 × 864, so the full 3:2 source becomes a full 2:3 portrait image without crop, stretch, or internal whitespace. The FOCAL wordmark reads left to right after rotation.

At the 390 × 844 mobile breakpoint, the image and wrapper both measure approximately 311.2 × 466.8 CSS px, retain the 2:3 portrait ratio, and the document has no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: unchanged; outside the requested image-only scope.
- Spacing and layout rhythm: the image card is now 2:3 portrait and its edges align with the rotated image on every side.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: the original asset remains in use through `next/image`; the rotation is lossless in CSS and no crop or distortion is applied.
- Copy and content: unchanged.

## Findings

No actionable P0, P1, or P2 differences remain in the requested vertical image-card scope.

## Comparison history

- Earlier P1: the requested image card remained landscape.
- Fix: changed the wrapper to a 2:3 portrait ratio and rotated the original 3:2 image 90° counterclockwise, centered edge-to-edge.
- Post-fix evidence: desktop image and wrapper are both 576 × 864 px; mobile image and wrapper are both approximately 311.2 × 466.8 px.

## Implementation checklist

- [x] Make the image and card vertical.
- [x] Rotate the product upright with the FOCAL label readable.
- [x] Keep the entire image visible without distortion.
- [x] Preserve all surrounding page content and styling.
- [x] Verify TypeScript and lint checks.
- [x] Check desktop and mobile geometry and browser console errors.

## Follow-up polish

None needed for this scoped fix.

final result: passed
