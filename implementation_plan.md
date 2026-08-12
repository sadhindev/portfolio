# Portfolio Enhancement Plan

This plan outlines the implementation of all the suggested features to upgrade your portfolio website.

## User Review Required

Please review the proposed changes below. If everything looks good, click **Proceed** and I will start the implementation! 

> [!NOTE]
> For the "Download Resume" button, I will set up the button and link it to a placeholder file named `resume.pdf`. You will need to replace this file with your actual resume later.

## Proposed Changes

---

### UI & Features (`index.html`)

I will update the HTML to include new UI elements and sections.

#### [MODIFY] index.html
- **Navigation:** Add a Dark/Light mode toggle icon (moon/sun) to the navbar.
- **Hero Section:** Add a "Download Resume" button next to the existing CTA buttons.
- **New Section:** Add a "Testimonials" section between the Projects and Contact sections to showcase client feedback.

---

### Styling (`css/style.css`)

I will add the necessary styles for the new features, including a completely new color palette for the light mode.

#### [MODIFY] style.css
- **Variables:** Define a comprehensive set of CSS variables for light mode colors under a `.light-mode` class.
- **Components:** Style the new theme toggle button and the Testimonials section (using a grid or card layout similar to projects).
- **Animations:** Enhance hover states on `.glass-card`, `.btn`, and `.skill-tag` to make the design feel more premium and dynamic. Ensure smooth transitions for background and text colors when toggling themes.

---

### Logic (`js/main.js`)

I will add the JavaScript required to make the theme toggle functional and persistent.

#### [MODIFY] main.js
- **Theme Toggle:** Implement logic to switch between dark and light modes by toggling the `.light-mode` class on the `<body>` tag.
- **Local Storage:** Save the user's theme preference in `localStorage` so it remembers their choice on subsequent visits.
- **Icon Update:** Change the toggle icon between a sun (for dark mode) and a moon (for light mode).

## Verification Plan

### Manual Verification
1. I will verify that the Dark/Light mode toggle switches themes correctly and that the transition is smooth.
2. I will check that the new "Download Resume" button is positioned correctly.
3. I will ensure the new Testimonials section looks cohesive with the rest of the design and is responsive on mobile.
4. I will verify that `localStorage` remembers the theme preference upon page reload.
