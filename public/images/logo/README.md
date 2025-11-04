# Logo Directory

## Instructions

Place your logo file in this directory with the following name:

**`logo.gif`**

## Current Files

You already have these GIF files in this directory:
- `darkrai.gif` - 291KB
- `possibleCharacter.gif` - 70KB

**To use one of these as your logo**, simply rename it:
```bash
# Example: To use darkrai.gif as your logo
mv darkrai.gif logo.gif
```

Or add a new `logo.gif` file if you prefer a different image.

## Specifications

- **File Type**: GIF (animated or static)
- **Recommended Size**: 200x200px or higher (square format works best)
- **File Name**: Must be exactly `logo.gif` (lowercase)
- **Format**: Transparent background recommended for best results

## Usage

The logo will appear in:
- ✅ Desktop header navigation (left side)
- ✅ Mobile menu header
- ✅ Hover effect: Scales up 10% on desktop

## Example File Path

```
/public/images/logo/logo.gif
```

## Notes

- The logo uses Next.js Image component with `unoptimized` prop to preserve GIF animation
- Logo automatically scales for different screen sizes:
  - Mobile: 40x40px
  - Desktop: 48x48px
- Includes smooth hover animation on desktop
- Has priority loading for optimal performance
