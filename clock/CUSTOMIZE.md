# Clock Customization Guide

## How to Adjust Clock Appearance

### 1. Clock Size

**Analog-only mode:**
```css
.analog-clock {
    width: min(400px, 80vw);    /* Max 400px, or 80% of viewport width */
    height: min(400px, 80vw);
}
```

**Both mode (smaller clock):**
```css
.both-mode .analog-clock {
    width: min(300px, 60vw);    /* Max 300px, or 60% of viewport width */
    height: min(300px, 60vw);
}
```

---

### 2. Clock Marks (Tick Lines)

**Gap between clock edge and marks:**

The gap is controlled by `translateY` value. The marks are positioned at the center and moved outward.

```css
.mark {
    transform: translateY(-200px);  /* 400px clock: move to edge (200px from center) */
}

.both-mode .mark {
    transform: translateY(-150px);  /* 300px clock: 150px from center */
}
```

**Formula:** `translateY = -(clock-size ÷ 2) + desired-gap`

**To adjust the gap:**
- **Make gap larger** (marks more inward): Use smaller negative value
  ```css
  .mark {
      transform: translateY(-190px);  /* 10px gap instead of 0px */
  }
  ```
- **Make gap smaller** (marks closer to edge): Use larger negative value
  ```css
  .mark {
      transform: translateY(-205px);  /* Marks extend 5px beyond edge */
  }
  ```

⚠️ **Important:** When changing clock size, you MUST update the translateY value!
- 400px clock → `translateY(-200px)` (half of 400)
- 300px clock → `translateY(-150px)` (half of 300)
- 500px clock → `translateY(-250px)` (half of 500)

**Mark Size:**
```css
/* Analog mode */
.mark.hour-mark {
    height: 12px;   /* Length of hour tick */
    width: 3px;     /* Thickness */
}

.mark.minute-mark {
    height: 6px;    /* Length of minute tick */
    width: 2px;     /* Thickness (not specified = default) */
}

/* Both mode - smaller marks */
.both-mode .mark.hour-mark {
    height: 8px;
    width: 2px;
}

.both-mode .mark.minute-mark {
    height: 4px;
    width: 1.5px;
}
```

---

### 3. Number Position (Clock Digits)

In JavaScript `initClockMarks()` function:
```javascript
const radius = 42; // percentage from center (42% = close to edge)
```

- **Smaller value** (e.g., 35%) = numbers closer to center
- **Larger value** (e.g., 45%) = numbers closer to edge

Calculate position:
```javascript
const x = 50 + radius * Math.cos(angle);
const y = 50 + radius * Math.sin(angle);
```

---

### 4. Clock Hands

```css
.hour-hand {
    height: 25%;    /* 25% of clock radius */
}

.minute-hand {
    height: 35%;    /* 35% of clock radius */
}

.second-hand {
    height: 40%;    /* 40% of clock radius */
}
```

---

### 5. Digital Clock

```css
.digital-time {
    font-size: clamp(4rem, 15vw, 10rem);  /* Min 4rem, scales to 15vw, max 10rem */
}

.both-mode .digital-time {
    font-size: clamp(2rem, 8vw, 4rem);    /* Smaller in Both mode */
}
```

---

## Quick Reference Table

| Element | Analog Mode | Both Mode | Location |
|---------|-------------|-----------|----------|
| Clock size | 400px | 300px | CSS `.analog-clock` |
| Mark translateY | -200px | -150px | CSS `.mark { transform }` |
| Hour mark | 12px × 3px | 8px × 2px | CSS `.hour-mark` |
| Minute mark | 6px × 2px | 4px × 1.5px | CSS `.minute-mark` |
| Number radius | 42% | 42% | JS `const radius` |

---

## Common Adjustments

### Change gap between clock edge and marks:

Simply adjust the `translateY` value (no other changes needed!):

**Example - 8px gap from edge:**
```css
.mark {
    transform: translateY(-192px);  /* -200px + 8px = -192px */
}
.both-mode .mark {
    transform: translateY(-142px);  /* -150px + 8px = -142px */
}
```

**Example - marks extend 5px beyond edge:**
```css
.mark {
    transform: translateY(-205px);  /* -200px - 5px = -205px */
}
```

**Formula:** `translateY = -(clock-radius) + gap`
- Positive gap = marks inward
- Negative gap = marks extend outward

### Make clock bigger (500px):
1. Change `.analog-clock` size to `500px`
2. Update mark translateY: `-250px` (500÷2 = 250)
3. Update JavaScript: Re-apply transform when mode changes
4. Optionally adjust number radius to 40%

### Make marks longer:
```css
.mark.hour-mark { height: 18px; }  /* was 12px */
.mark.minute-mark { height: 10px; } /* was 6px */
```

### Move numbers closer to center:
```javascript
const radius = 35; // was 42
```

---

**Tip:** Always recalculate `transform-origin` when changing clock size!
