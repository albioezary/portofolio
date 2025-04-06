document.addEventListener("DOMContentLoaded", () => {
  const menuCheckbox = document.getElementById("menuCheckbox");
  const menu = document.getElementById("menu");
  const menuToggle = document.querySelector(".switch");
  const navLinks = document.querySelectorAll("#menu a");

  function openMenu() {
    menu.classList.remove("hidden");
  
    // Tambahkan animasi jatuh ke menu (background)
    menu.classList.add("menu-slide-down");

    // Reset animasi dulu
    document.querySelectorAll(".menu-text > div").forEach((el) => {
      el.style.animation = "none";
      el.offsetHeight; // trigger reflow
      el.style.animation = "";
    });

    setTimeout(() => {
      menu.classList.add("show");
    }, 10);
  }

  function closeMenu() {
    const menuText = document.querySelector(".menu-text");

    // Tambahkan class hide-menu untuk trigger animasi keluar
    menuText.classList.add("hide-menu");

    // Hide background (delay cukup lama biar animasi selesai)
    menu.classList.remove("show");

    setTimeout(() => {
      menu.classList.add("hidden");
      menuText.classList.remove("hide-menu"); // reset animasi
    }, 300); // Lebih lama dari delay paling akhir (0.3s + 0.4s)
  }

  function toggleMenu(event) {
    event.stopPropagation();
    if (menuCheckbox.checked) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  menuCheckbox.addEventListener("change", toggleMenu);

  document.addEventListener("click", (event) => {
    if (
      menuCheckbox.checked &&
      !menu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      menuCheckbox.checked = false;
      closeMenu();
    }
  });

  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Smooth scrolling dan auto-close menu saat link diklik
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Scroll smooth ke section tujuan
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });

        // Tutup menu setelah klik
        menuCheckbox.checked = false;
        closeMenu();
      }
    });
  });
});

// animasi menu
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".menu-text a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      links.forEach((l) => {
        if (l !== link) {
          l.classList.add("faded");
          l.classList.remove("hovered");
        } else {
          l.classList.add("hovered");
        }
      });
    });

    link.addEventListener("mouseleave", () => {
      links.forEach((l) => {
        l.classList.remove("faded");
        l.classList.remove("hovered");
      });
    });
  });
});




//cursor anying
document.addEventListener("mousemove", (e) => {
  const inner = document.getElementById("cursor-inner");
  const outer = document.getElementById("cursor-outer");

  inner.style.left = `${e.clientX}px`;
  inner.style.top = `${e.clientY}px`;

  outer.style.left = `${e.clientX}px`;
  outer.style.top = `${e.clientY}px`;
});

document.addEventListener("DOMContentLoaded", () => {
  const cursorInner = document.getElementById("cursor-inner");
  const cursorOuter = document.getElementById("cursor-outer");

  let mouseX = 0;
  let mouseY = 0;
  let outerX = 0;
  let outerY = 0;

  // Dapat posisi mouse real-time
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorInner.style.top = `${mouseY}px`;
    cursorInner.style.left = `${mouseX}px`;
  });

  // Gerakkan outer cursor sedikit delay pakai interpolasi
  function animate() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;

    cursorOuter.style.top = `${outerY}px`;
    cursorOuter.style.left = `${outerX}px`;

    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener("mousemove", (e) => {
  const inner = document.getElementById("cursor-inner");
  const outer = document.getElementById("cursor-outer");

  const x = e.clientX;
  const y = e.clientY;

  inner.style.left = `${x}px`;
  inner.style.top = `${y}px`;
  outer.style.left = `${x}px`;
  outer.style.top = `${y}px`;

  const elem = document.elementFromPoint(x, y);
  if (elem) {
    const style = getComputedStyle(elem);
    const bgColor = style.backgroundColor;

    const rgb = bgColor.match(/\d+/g);
    if (rgb) {
      const r = parseInt(rgb[0]);
      const g = parseInt(rgb[1]);
      const b = parseInt(rgb[2]);

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      if (brightness < 128) {
        document.body.classList.add("cursor-invert");
      } else {
        document.body.classList.remove("cursor-invert");
      }
    }
  }
});


//loading screen
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm";

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const loadingBar = document.getElementById("loading-bar");
    const loadingPercent = document.getElementById("loading-percent");
    const mainContent = document.getElementById("main-content");

    let percent = 0;

    const fakeLoader = setInterval(() => {
        percent += Math.floor(Math.random() * 5) + 1;

        if (percent >= 100) {
            percent = 100;
            clearInterval(fakeLoader);

            // Fade out and start animation simultaneously
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onStart: () => {
                    initHomeAnimations(); // Start animations when loading fades out
                },
                onComplete: () => {
                    loadingScreen.style.display = "none";
                    mainContent.style.display = "block"; // Show main content
                    gsap.to(mainContent, { opacity: 1, duration: 0.5 }); // Fade in main content
                }
            });
        }

        loadingBar.style.width = `${percent}%`;
        loadingPercent.textContent = `${percent}%`;
    }, 50);
});

// Home GSAP animations
gsap.set(["#heroTitle", ".subtext", ".metaText", ".hero-project-btn"], {
    opacity: 0,
    y: 50
});

const initHomeAnimations = () => {
    const timeline = gsap.timeline();

    timeline
        .to("#heroTitle", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
        })
        .to(".subtext", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
        }, "-=0.8")
        .to(".metaText", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
        }, "-=0.6")
        .to(".hero-project-btn", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)",
          }, "-=0.5");
  };

 
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.registerPlugin(ScrollTrigger);

  const projectTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#projects",
      start: "top 85%",
      once: true
    }
  });

  projectTimeline
    .from("#projects h2", {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from("#projects span", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.5")
    .from(".project-img", {
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2
    
    }, "-=0.4")
    .from("#projects .project-item h3, #projects .project-item div", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=1")
    .from("#projects .projects-cta", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.8");

    // GSAP Animations for About Section
gsap.registerPlugin(ScrollTrigger);

gsap.from("#about-title", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#about-title",
    start: "top 90%",
  },
});

gsap.from("#about-photo", {
  x: -60,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#about-photo",
    start: "top 85%",
  },
});

gsap.from(".about-text", {
  y: 40,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 90%",
  },
});

gsap.from("#about-meta", {
  opacity: 0,
  y: 20,
  duration: 1,
  delay: 0.3,
  scrollTrigger: {
    trigger: "#about-meta",
    start: "top 90%",
  },
});


// Contact Section Animation
gsap.registerPlugin(ScrollTrigger);

const contactTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#contact",
    start: "top 80%",
    once: true,
  }
});

contactTimeline
  .from("#contact h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from("#contact span", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6")
  .from("#contact p, #contact .font-mono", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  }, "-=0.4")
  .from("#contact a[href^='mailto']", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.3");