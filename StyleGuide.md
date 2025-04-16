# Simple Style Guide

## 1. Colors

*   **Primary Text:** `#333` (Dark Gray) [1]
*   **Primary Background:** `#fff` (White) [1]
*   **Primary Accent / Links:** `#c36` (Pink/Magenta) [1]
*   **Link Hover / Active:** `#336` (Dark Blue/Purple) [1]
*   **Default Border:** `#666` (Medium Gray - used on inputs) [1]
*   **Focus Border:** `#333` (Dark Gray - used on focused inputs) [1]
*   **Button Border / Hover Background:** `#c36` (Pink/Magenta) [1]
*   **Button Hover Text:** `#fff` (White) [1]
*   **Table Border:** `hsla(0, 0%, 50.2%, 0.5)` (Semi-transparent Medium Gray - Approx `#ccc` visually) [1]
*   **Table Odd Row Stripe:** `hsla(0, 0%, 50.2%, 0.07)` (Very Light Transparent Gray - Approx `#f2f2f2` visually) [1]
*   **Table Row Hover:** `hsla(0, 0%, 50.2%, 0.1)` (Light Transparent Gray - Approx `#e6e6e6` visually) [1]

## 2. Typography

*   **Body Font Family:** System Font Stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `Noto Sans`, `sans-serif`, Emoji fonts) [1]
*   **Code Font Family:** `monospace, monospace` [1]
*   **Base Font Size:** `1rem` (typically 16px) [1]
*   **Body Font Weight:** `400` (Regular) [1]
*   **Body Line Height:** `1.5` [1]
*   **Heading Font Weight:** `500` (Medium) [1]
*   **Heading Line Height:** `1.2` [1]
*   **Heading Font Sizes:** [1]
    *   `h1`: `2.5rem`
    *   `h2`: `2rem`
    *   `h3`: `1.75rem`
    *   `h4`: `1.5rem`
    *   `h5`: `1.25rem`
    *   `h6`: `1rem`
*   **Link Text Decoration:** `none` by default [1]. Underlined within `.page-content` and `.comments-area` [2].

## 3. Layout & Spacing

*   **Base Spacing Unit:** Primarily `rem` units observed. Common values include `0.5rem`, `0.9rem`, `1rem`, `1.25rem`. Consider `1rem` (16px) as the base multiplier [1].
*   **Paragraph Margin Bottom:** `0.9rem` [1]
*   **Heading Margins:** `margin-block-start: 0.5rem`, `margin-block-end: 1rem` [1]
*   **Container Max Widths (Breakpoints):** [2]
    *   `576px+`: `500px`
    *   `768px+`: `600px`
    *   `992px+`: `800px`
    *   `1200px+`: `1140px`
    *   *Note: `.alignwide` and `.alignfull` classes exist for breaking out of these containers.* [2]

## 4. Components

*   **Links (`a`):**
    *   Default: Color `#c36`, `text-decoration: none;` [1]
    *   Hover/Active: Color `#336` [1]
    *   Contextual Underline: Links within `.page-content`, `.comments-area` have `text-decoration: underline;` [2]
*   **Buttons (`button`, `[type=button]`, `[type=submit]`):** [1]
    *   Style: Outline by default
    *   Text Color: `#c36`
    *   Background: `transparent`
    *   Border: `1px solid #c36`
    *   Padding: `0.5rem 1rem`
    *   Border Radius: `3px`
    *   Transition: `all .3s`
    *   Hover/Focus: Text Color `#fff`, Background `#c36`, `text-decoration: none;`
*   **Forms (`input`, `select`, `textarea`):** [1]
    *   Width: `100%` (for text-like inputs)
    *   Border: `1px solid #666`
    *   Border Radius: `3px`
    *   Padding: `0.5rem 1rem`
    *   Transition: `all .3s`
    *   Focus: `border-color: #333;`
*   **Tables (`table`):** [1]
    *   Width: `100%`
    *   Cell Padding: `15px`
    *   Borders: `1px solid hsla(0,0%,50.2%,.5019607843)` (Semi-transparent Gray)
    *   Header (`th`) Font Weight: `700` (Bold)
    *   Striping: Odd rows have a light gray background (`hsla(0,0%,50.2%,.0705882353)`)
    *   Hover: Rows have a slightly darker light gray background (`hsla(0,0%,50.2%,.1019607843)`)

## 5. Borders & Radius

*   **Default Border Radius:** `3px` (used on buttons and form inputs) [1]
