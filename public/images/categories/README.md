# Course Category Animated Icons

This directory contains animated GIF icons for each course category.

## Required GIF Files

Download and place the following animated GIF files in this directory:

### 1. `web-security.gif`
**Theme:** Web security, lock, shield, HTTPS
**Recommended sources:**
- [IconScout - Web Security Animations](https://iconscout.com/lottie-animations/cyber-security)
- [Icons8 - Cyber Security Animated](https://icons8.com/icons/set/cyber-security--animated)
- Search for: "animated lock icon", "web security shield animation"

**Specifications:**
- Dimensions: 128x128px minimum (256x256px recommended for retina)
- File size: < 500KB
- Animation: Subtle, 2-3 second loop
- Colors: Match cyber theme (green #00ff41, blue #00d9ff)

### 2. `network-security.gif`
**Theme:** Network nodes, globe, connectivity, firewall
**Recommended sources:**
- Search for: "animated network icon", "network security animation", "network nodes"

**Specifications:**
- Same as above

### 3. `cryptography.gif`
**Theme:** Encryption, keys, lock/unlock, cipher
**Recommended sources:**
- Search for: "encryption animation", "cryptography icon animated", "key lock animation"

**Specifications:**
- Same as above

### 4. `penetration-testing.gif`
**Theme:** Target, hacking, terminal, code scanning
**Recommended sources:**
- Search for: "hacking animation", "penetration testing icon", "target scan animation"

**Specifications:**
- Same as above

### 5. `malware-analysis.gif`
**Theme:** Virus, bug, scanner, detection
**Recommended sources:**
- Search for: "virus scan animation", "malware detection", "bug scanner animated"

**Specifications:**
- Same as above

### 6. `cloud-security.gif`
**Theme:** Cloud, server, cloud shield, AWS/Azure
**Recommended sources:**
- Search for: "cloud security animation", "cloud shield icon", "cloud server animated"

**Specifications:**
- Same as above

## Free Resources

### Recommended Platforms:
1. **IconScout** (https://iconscout.com/)
   - 11,000+ cyber security animations
   - Formats: GIF, Lottie JSON, MP4
   - Free and premium options

2. **Icons8** (https://icons8.com/icons/set/cyber-security--animated)
   - Cyber security animated icons
   - Formats: GIF, JSON, AEP
   - Free with attribution

3. **Flaticon** (https://www.flaticon.com/free-animated-icons/security)
   - 1,500+ security animated icons
   - Free for commercial use

4. **Freepik** (https://www.freepik.com/free-photos-vectors/cyber-security-gif)
   - Cyber security GIF graphics
   - Free with attribution

5. **Creattie** (https://creattie.com/lottie-animated-icons/collection/cyber-security-icons)
   - Cyber Security Icons collection
   - SVG, JSON, Lottie formats

## Alternative: Generate Custom GIFs

If you prefer custom animations matching your exact brand:

### Using Lottie Files:
1. Download Lottie JSON from IconScout/Creattie
2. Use [Lottie to GIF Converter](https://lottiefiles.com/tools/lottie-to-gif)
3. Customize colors (#00ff41 green, #00d9ff blue)
4. Export as GIF (128x128px or 256x256px)

### Using Figma + Plugins:
1. Design icon in Figma
2. Use "Figmotion" or "LottieFiles" plugin
3. Animate properties (rotation, scale, opacity)
4. Export as GIF

## Optimization

After downloading, optimize GIFs for web:
```bash
# Using ImageMagick (install: brew install imagemagick)
convert input.gif -coalesce -resize 256x256 -layers optimize output.gif

# Using gifsicle (install: brew install gifsicle)
gifsicle --optimize=3 --resize 256x256 input.gif -o output.gif
```

## Quick Start (Placeholder GIFs)

For development, you can use colored placeholder GIFs until final assets are ready:
```bash
# Generate solid color placeholders (requires ImageMagick)
convert -size 256x256 xc:#00ff41 web-security.gif
convert -size 256x256 xc:#00d9ff network-security.gif
convert -size 256x256 xc:#ffd700 cryptography.gif
convert -size 256x256 xc:#ff0033 penetration-testing.gif
convert -size 256x256 xc:#00ff41 malware-analysis.gif
convert -size 256x256 xc:#00d9ff cloud-security.gif
```
